'use client'

import { useEffect } from 'react'
import { useTextSize } from './text-size-provider'

export function TextSizeManager() {
  const { textSize } = useTextSize()

  useEffect(() => {
    // Remove existing text size classes
    document.body.classList.remove('text-size-small', 'text-size-medium', 'text-size-large')

    // Add the current text size class
    document.body.classList.add(`text-size-${textSize}`)

    // Also update the html element for broader styling control
    document.documentElement.classList.remove('text-size-small', 'text-size-medium', 'text-size-large')
    document.documentElement.classList.add(`text-size-${textSize}`)
  }, [textSize])

  return null // This component doesn't render anything
}