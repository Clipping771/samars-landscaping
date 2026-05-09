export const SITE_CONTENT = {
  global: {
    brandName: "Samar's Landscaping",
    tagline: "Adelaide's most prestigious landscape design and construction studio.",
    phone: "+61 451 661 273",
    email: "design@samarslandscaping.com.au",
    address: "Adelaide, South Australia",
    abn: "ABN 12 345 678 901",
    socials: {
      instagram: "#",
      facebook: "#",
      houzz: "#",
    },
    navLinks: [
      { label: "Home", href: "/#home" },
      { label: "Services", href: "/#services" },
      { label: "Gallery", href: "/gallery" },
      { label: "Calculator", href: "/calculator" },
      { label: "Process", href: "/#process" },
      { label: "About", href: "/#about" },
      { label: "Contact", href: "/#contact" },
    ],
    serviceAreas: [
      "Adelaide Hills",
      "Burnside",
      "Unley",
      "Norwood",
      "Stirling",
      "Mitcham",
      "Glenelg",
      "Prospect",
    ],
  },
  hero: {
    eyebrow: "Adelaide's Premier Landscape Studio",
    headline: "Creating Timeless Outdoor Sanctuaries",
    subheading: "Crafting Timeless Gardens",
    primaryCTA: "Explore Our Work",
    secondaryCTA: "Watch Our Story",
  },
  trustBar: [
    { value: 15, suffix: "+", label: "Years of Excellence" },
    { value: 340, suffix: "+", label: "Projects Completed" },
    { value: 4.9, suffix: "★", label: "Client Rating", decimals: 1 },
  ],
  services: {
    heading: "Our Craft",
    items: [
      {
        id: "landscape-design",
        title: "Landscape Design",
        description:
          "Bespoke architectural garden designs tailored to your lifestyle and Adelaide's unique climate.",
        icon: "PenTool", // Represents design
      },
      {
        id: "garden-construction",
        title: "Garden Construction",
        description:
          "Masterful execution of hardscaping and softscaping by our licensed structural landscapers.",
        icon: "Hammer", // Represents construction
      },
      {
        id: "outdoor-living",
        title: "Outdoor Living Spaces",
        description:
          "Seamlessly extending your home with premium alfresco areas, kitchens, and fire pits.",
        icon: "Sofa", // Represents outdoor living
      },
      {
        id: "water-features",
        title: "Water Features",
        description:
          "Tranquil ponds, dynamic fountains, and elegant pool surroundings that breathe life into your garden.",
        icon: "Droplets", // Represents water
      },
      {
        id: "lighting-design",
        title: "Lighting Design",
        description:
          "Strategic architectural lighting that illuminates your sanctuary long after the sun sets.",
        icon: "Lightbulb", // Represents lighting
      },
      {
        id: "maintenance",
        title: "Maintenance Programs",
        description:
          "Dedicated horticultural care to ensure your investment matures gracefully over time.",
        icon: "Leaf", // Represents maintenance
      },
    ],
  },
  portfolio: {
    heading: "Our Portfolio",
    projects: [
      {
        id: "burnside-estate",
        name: "The Burnside Estate",
        suburb: "Burnside",
        description:
          "A complete transformation of a heritage estate, featuring manicured formal gardens and a contemporary stone patio.",
        beforeImage: "https://images.unsplash.com/photo-1558904541-efa843a96f09?auto=format&fit=crop&q=80&w=1200", // Placeholder (Needs specific search term)
        afterImage: "https://images.unsplash.com/photo-1558904541-efa843a96f09?auto=format&fit=crop&q=80&w=1200", // Will update these with actual unsplash URLs using specific terms later
        unsplashTerms: "luxury garden Adelaide"
      },
      {
        id: "stirling-retreat",
        name: "Stirling Hills Retreat",
        suburb: "Stirling",
        description:
          "Native landscaping blending seamlessly with the Adelaide Hills, integrating a stunning water feature.",
        beforeImage: "https://images.unsplash.com/photo-1558904541-efa843a96f09?auto=format&fit=crop&q=80&w=1200",
        afterImage: "https://images.unsplash.com/photo-1558904541-efa843a96f09?auto=format&fit=crop&q=80&w=1200",
        unsplashTerms: "Adelaide Hills landscape"
      },
      {
        id: "unley-modern",
        name: "Unley Modern Oasis",
        suburb: "Unley",
        description:
          "A sleek, minimalist outdoor living space with a custom pool surround and lush tropical accents.",
        beforeImage: "https://images.unsplash.com/photo-1558904541-efa843a96f09?auto=format&fit=crop&q=80&w=1200",
        afterImage: "https://images.unsplash.com/photo-1558904541-efa843a96f09?auto=format&fit=crop&q=80&w=1200",
        unsplashTerms: "outdoor living space pool"
      },
    ],
  },
  process: {
    heading: "The Journey",
    steps: [
      {
        number: "01",
        title: "Discovery Consultation",
        description:
          "We begin by understanding your vision, lifestyle requirements, and the unique characteristics of your property.",
        icon: "Compass",
      },
      {
        number: "02",
        title: "Design Concept",
        description:
          "Our architects craft detailed 3D concepts and material palettes to bring your bespoke sanctuary to life visually.",
        icon: "DraftingCompass",
      },
      {
        number: "03",
        title: "Material Selection",
        description:
          "We curate premium, ethically sourced stone, timber, and flora perfectly suited to the Adelaide climate.",
        icon: "Layers",
      },
      {
        number: "04",
        title: "Expert Construction",
        description:
          "Our licensed craftsmen meticulously execute the build, ensuring structural integrity and flawless finishes.",
        icon: "Wrench",
      },
      {
        number: "05",
        title: "Final Reveal & Handover",
        description:
          "We walk you through your new oasis, providing comprehensive care guides to nurture your garden's growth.",
        icon: "Key",
      },
    ],
  },
  testimonials: {
    heading: "What Our Clients Say",
    reviews: [
      {
        id: 1,
        quote:
          "Samar's Landscaping transformed our overgrown backyard into a breathtaking architectural retreat. Their attention to detail with the stone paving and plant selection was masterful.",
        author: "Eleanor & James T.",
        suburb: "Burnside",
        rating: 5,
      },
      {
        id: 2,
        quote:
          "From the initial design consultation to the final sweep, the professionalism was unmatched. They delivered a luxury outdoor space that exceeded our highest expectations.",
        author: "Marcus W.",
        suburb: "Unley",
        rating: 5,
      },
      {
        id: 3,
        quote:
          "Our hillside property presented numerous challenges, but their team engineered a terraced masterpiece. It's not just a garden; it's a sanctuary for our family.",
        author: "Sarah L.",
        suburb: "Stirling",
        rating: 5,
      },
      {
        id: 4,
        quote:
          "The water feature and ambient lighting design have completely changed how we entertain. We practically live outdoors now.",
        author: "David & Chloe M.",
        suburb: "Norwood",
        rating: 5,
      },
      {
        id: 5,
        quote:
          "True artisans. The craftsmanship in the bespoke timber decking and outdoor kitchen is world-class. Highly recommended for any premium property.",
        author: "Jonathan R.",
        suburb: "Mitcham",
        rating: 5,
      },
    ],
  },
  whyChooseUs: {
    heading: "Adelaide's Most Trusted Landscaping Studio",
    points: [
      "Licensed & Fully Insured",
      "15 Years Local Experience",
      "Premium Materials Only",
      "5-Year Workmanship Guarantee",
      "Dedicated Project Manager",
    ],
    images: [
      {
        src: "https://images.unsplash.com/photo-1584622650111-993a426fbf0a?auto=format&fit=crop&q=80&w=800",
        alt: "Manicured garden path",
        unsplashTerms: "manicured garden path"
      },
      {
        src: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&q=80&w=800",
        alt: "Lush green backyard",
        unsplashTerms: "lush green backyard"
      },
      {
        src: "https://images.unsplash.com/photo-1598228723793-52759bba239c?auto=format&fit=crop&q=80&w=800",
        alt: "Stone patio outdoor dining",
        unsplashTerms: "stone patio outdoor dining"
      },
    ],
  },
  contact: {
    heading: "Ready to Transform Your Outdoor Space?",
    subtext: "Schedule your complimentary consultation with our master designers today.",
    projectTypes: ["Garden Design", "Construction", "Renovation", "Maintenance"],
  },
};
