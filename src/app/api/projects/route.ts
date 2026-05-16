export const dynamic = 'force-dynamic';
export const maxDuration = 60; // Increase timeout to 60 seconds

import { NextResponse } from "next/server";
import dbConnect from "@/lib/mongoose";
import Project from "@/lib/models/Project";
import { v2 as cloudinary } from "cloudinary";

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

async function uploadImage(imageStr: string) {
  if (!imageStr) return "";
  // If it's already a URL, return it
  if (imageStr.startsWith("http")) return imageStr;
  
  try {
    const uploadResponse = await cloudinary.uploader.upload(imageStr, {
      folder: "samars-landscaping",
    });
    return uploadResponse.secure_url;
  } catch (error) {
    console.error("Cloudinary upload error:", error);
    return "";
  }
}

export async function GET() {
  try {
    await dbConnect();
    const projects = await Project.find({}).sort({ createdAt: -1 });
    
    // Map _id to id for frontend compatibility
    const formattedProjects = projects.map((p) => ({
      id: p._id.toString(),
      name: p.name,
      suburb: p.suburb,
      description: p.description,
      beforeImage: p.beforeImage,
      afterImage: p.afterImage,
      images: p.images || [],
      createdAt: p.createdAt,
    }));

    return NextResponse.json(formattedProjects);
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: "Failed to fetch projects" }, { status: 500 });
  }
}

export async function POST(req: Request) {
  try {
    await dbConnect();
    const body = await req.json();
    
    // Collect all unique base64 images to upload
    const uniqueBase64s = new Set<string>();
    if (body.beforeImage?.startsWith("data:")) uniqueBase64s.add(body.beforeImage);
    if (body.afterImage?.startsWith("data:")) uniqueBase64s.add(body.afterImage);
    (body.images || []).forEach((img: string) => {
      if (img?.startsWith("data:")) uniqueBase64s.add(img);
    });

    // Upload unique images and create a map
    const uploadMap = new Map<string, string>();
    await Promise.all(
      Array.from(uniqueBase64s).map(async (base64) => {
        const url = await uploadImage(base64);
        if (url) uploadMap.set(base64, url);
      })
    );

    // Resolve final URLs
    const beforeImageUrl = body.beforeImage?.startsWith("data:") 
      ? uploadMap.get(body.beforeImage) || "" 
      : body.beforeImage;
    
    const afterImageUrl = body.afterImage?.startsWith("data:") 
      ? uploadMap.get(body.afterImage) || "" 
      : body.afterImage;

    const finalImages = (body.images || []).map((img: string) => {
      if (img?.startsWith("data:")) return uploadMap.get(img) || "";
      return img;
    }).filter(Boolean);

    let project;
    
    // Check if it's an update
    if (body.id && body.id.length === 24) {
      project = await Project.findByIdAndUpdate(
        body.id,
        {
          name: body.name,
          suburb: body.suburb,
          description: body.description,
          beforeImage: beforeImageUrl,
          afterImage: afterImageUrl,
          images: finalImages,
        },
        { new: true }
      );
    } else {
      // Create new
      project = await Project.create({
        name: body.name,
        suburb: body.suburb,
        description: body.description,
        beforeImage: beforeImageUrl,
        afterImage: afterImageUrl,
        images: finalImages,
      });
    }

    return NextResponse.json({
      id: project._id.toString(),
      name: project.name,
      suburb: project.suburb,
      description: project.description,
      beforeImage: project.beforeImage,
      afterImage: project.afterImage,
      images: project.images,
      createdAt: project.createdAt,
    });
  } catch (error) {
    console.error("Failed to save project:", error);
    return NextResponse.json({ error: "Failed to save project" }, { status: 500 });
  }
}

export async function DELETE(req: Request) {
  try {
    await dbConnect();
    const { searchParams } = new URL(req.url);
    const id = searchParams.get("id");

    if (!id) return NextResponse.json({ error: "ID required" }, { status: 400 });

    await Project.findByIdAndDelete(id);
    return NextResponse.json({ success: true });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: "Failed to delete project" }, { status: 500 });
  }
}
