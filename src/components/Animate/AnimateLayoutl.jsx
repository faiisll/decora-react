import React from 'react';
import {motion} from "motion/react"

const AnimateLayoutl = ({children}) => {
    
    const pageVariants = {
        initial: { opacity: 0, y: 20 },
        animate: { opacity: 1, y: 0 },
        exit: { opacity: 0, y: -20 }
      };
    return (
        <motion.div
        variants={pageVariants}
        initial="initial"
        animate="animate"
        exit="exit"
        transition={{ duration: 0.25, ease: 'easeInOut' }}>
            {children}
            
        </motion.div>
    );
}

export default AnimateLayoutl;
