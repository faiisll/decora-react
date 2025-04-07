import React from 'react'
import {AnimatePresence, motion} from "motion/react"

export default function AnimatePageFade({children, ...props}) {
  return (
    <AnimatePresence>
      <motion.div
      {...props}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.3 }}
      >{children}</motion.div>

    </AnimatePresence>
  )
}
