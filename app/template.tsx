"use client";

import { motion } from "framer-motion";

/**
 * Route-level page transition (PRD 6.1). A template re-mounts on every
 * navigation, so this fades/slides each page in. Only animates opacity +
 * transform to stay cheap.
 */
export default function Template({ children }: { children: React.ReactNode }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3, ease: "easeOut" }}
    >
      {children}
    </motion.div>
  );
}
