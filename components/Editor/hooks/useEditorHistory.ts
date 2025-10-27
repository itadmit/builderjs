import { useState, useCallback, useEffect } from 'react'
import { Widget } from '../types'

interface HistoryState {
  widgets: Widget[]
  timestamp: number
}

export function useEditorHistory(initialWidgets: Widget[]) {
  const [history, setHistory] = useState<HistoryState[]>([
    { widgets: initialWidgets, timestamp: Date.now() },
  ])
  const [currentIndex, setCurrentIndex] = useState(0)

  // Add to history when widgets change
  const addToHistory = useCallback((widgets: Widget[]) => {
    setHistory((prev) => {
      // Remove any future history if we're not at the end
      const newHistory = prev.slice(0, currentIndex + 1)
      // Add new state
      return [...newHistory, { widgets, timestamp: Date.now() }]
    })
    setCurrentIndex((prev) => prev + 1)
  }, [currentIndex])

  // Undo
  const undo = useCallback(() => {
    if (currentIndex > 0) {
      setCurrentIndex((prev) => prev - 1)
    }
  }, [currentIndex])

  // Redo
  const redo = useCallback(() => {
    if (currentIndex < history.length - 1) {
      setCurrentIndex((prev) => prev + 1)
    }
  }, [currentIndex, history.length])

  // Get current widgets
  const currentWidgets = history[currentIndex]?.widgets || initialWidgets

  // Can undo/redo
  const canUndo = currentIndex > 0
  const canRedo = currentIndex < history.length - 1

  // Keyboard shortcuts
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.ctrlKey || e.metaKey) && e.key === 'z') {
        e.preventDefault()
        if (e.shiftKey) {
          redo()
        } else {
          undo()
        }
      }
      if ((e.ctrlKey || e.metaKey) && e.key === 'y') {
        e.preventDefault()
        redo()
      }
    }

    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [undo, redo])

  return {
    currentWidgets,
    addToHistory,
    undo,
    redo,
    canUndo,
    canRedo,
  }
}

