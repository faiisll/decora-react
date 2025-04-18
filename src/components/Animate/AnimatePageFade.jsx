import React from 'react'
import {AnimatePresence, motion} from "motion/react"
import { useLocation } from 'react-router'

export default function AnimatePageFade({children, ...props}) {
  const location = useLocation()
  return (
    <AnimatePresence mode='wait'>
      <motion.div
      {...props}
      key={location.pathname}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.3 }}
      >{children}</motion.div>

    </AnimatePresence>
  )
}
