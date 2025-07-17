'use client';

import { motion, AnimatePresence } from 'framer-motion';
import { usePathname } from 'next/navigation';


const PageTransitionWrapper = ({ children, className }) => { 
  const pathname = usePathname();

  return (
    <AnimatePresence mode="wait">
      <motion.div
        className="content-wrapper" 
        key={pathname}
        initial={{ opacity: 0, y: 15 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7, ease: "easeInOut" }}
      >
        {children}
      </motion.div>
    </AnimatePresence>
  );
};

export default PageTransitionWrapper;