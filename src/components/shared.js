import { motion } from 'framer-motion'

export const reveal = {
  initial: { opacity: 0, y: 28 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, amount: 0.2 },
  transition: { duration: 0.7, ease: 'easeOut' },
}

export const MotionDiv = motion.div
export const MotionArticle = motion.article
export const MotionAside = motion.aside