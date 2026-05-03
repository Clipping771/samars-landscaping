import { Variants } from "framer-motion";

export const FADE_UP_ANIMATION_VARIANTS: Variants = {
  hidden: { opacity: 0, y: 40 },
  show: {
    opacity: 1,
    y: 0,
    transition: { type: "tween", ease: "easeOut", duration: 0.7 },
  },
};

export const STAGGER_CONTAINER: Variants = {
  hidden: {},
  show: {
    transition: {
      staggerChildren: 0.12,
    },
  },
};

export const HERO_STAGGER_CONTAINER: Variants = {
  hidden: {},
  show: {
    transition: {
      staggerChildren: 0.3,
    },
  },
};
