'use client'

import React, { createContext, useContext, useState, useEffect } from 'react'

type TextSize = 'small' | 'medium' | 'large'

interface TextSizeContextType {
  textSize: TextSize
  setTextSize: (size: TextSize) => void
}

const TextSizeContext = createContext<TextSizeContextType | undefined>(undefined)

export function useTextSize() {
  const context = useContext(TextSizeContext)
  if (context === undefined) {
    throw new Error('useTextSize must be used within a TextSizeProvider')
  }
  return context
}

interface TextSizeProviderProps {
  children: React.ReactNode
}

export function TextSizeProvider({ children }: TextSizeProviderProps) {
  const [textSize, setTextSize] = useState<TextSize>('medium')

  // Load saved text size from localStorage on mount
  useEffect(() => {
    const savedSize = localStorage.getItem('textSize') as TextSize
    if (savedSize && ['small', 'medium', 'large'].includes(savedSize)) {
      setTextSize(savedSize)
    }
  }, [])

  // Save text size to localStorage whenever it changes
  useEffect(() => {
    localStorage.setItem('textSize', textSize)
  }, [textSize])

  const value = {
    textSize,
    setTextSize,
  }

  return (
    <TextSizeContext.Provider value={value}>
      {children}
    </TextSizeContext.Provider>
  )
}