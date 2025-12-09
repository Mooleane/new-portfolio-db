// TODO: Students will implement this component
// This is an advanced component building exercise

// Component Requirements:
// 1. Create a component that accepts { technologies, onChange, error } props
// 2. Allow users to type in a technology name and add it to the list
// 3. Provide quick-add buttons for common technologies
// 4. Display selected technologies as removable tags
// 5. Prevent duplicate technologies
// 6. Support both keyboard (Enter) and button (Add) interactions
// 7. Handle error states with visual feedback

// Learning Objectives:
// - Advanced React state management
// - Array manipulation patterns
// - User input handling
// - Conditional styling
// - Accessibility considerations
// - Component prop patterns

// Suggested Technologies for Quick-Add:
// ['JavaScript', 'TypeScript', 'React', 'Next.js', 'Node.js', 'Express',
//  'HTML', 'CSS', 'Tailwind CSS', 'Bootstrap', 'Python', 'Java',
//  'PostgreSQL', 'MongoDB', 'MySQL', 'Prisma', 'GraphQL', 'REST API',
//  'Git', 'Docker', 'AWS', 'Vercel', 'Figma', 'Photoshop']

// Implementation Hints:
// - Use 'use client' directive
// - Manage local input state with useState
// - Use filter() to remove technologies
// - Use includes() to check for duplicates
// - Handle keyPress event for Enter key
// - Style error states with conditional classes
'use client'

import React, { useState, useEffect } from 'react'

// The different technologies that can be quick-added.
const QUICK_TECHNOLOGIES = [
  'JavaScript', 'TypeScript', 'React', 'Next.js', 'Node.js', 'Express',
  'HTML', 'CSS', 'Tailwind CSS', 'Bootstrap', 'Python', 'Java',
  'PostgreSQL', 'MongoDB', 'MySQL', 'Prisma', 'GraphQL', 'REST API',
  'Git', 'Docker', 'AWS', 'Vercel', 'Figma', 'Photoshop'
]

export default function TechnologyInput({ technologies = [], onChange, error }) {
  // Local state for selected technologies (array)
  const [selectedTechs, setSelectedTechs] = useState(
    Array.isArray(technologies) ? technologies : []
  )

  // Local state for the input field value
  const [inputValue, setInputValue] = useState('')

  // Local error message (e.g., duplicate)
  const [localError, setLocalError] = useState('')

  // Trims an input.
  const normalize = (s) => String(s).trim()

  // Checks for duplicate strings and inputs.
  const isDuplicate = (tech) => {
    const lc = String(tech).toLowerCase()
    return selectedTechs.some((t) => String(t).toLowerCase() === lc)
  }

  // Adds a technology (from input or quick-add).
  const addTechnology = (raw) => {
    const tech = normalize(raw)
    if (!tech) return
    if (isDuplicate(tech)) {
      setLocalError('Technology already added')
      return
    }
    const next = [...selectedTechs, tech]
    setSelectedTechs(next)
    setInputValue('')
    setLocalError('')
    if (typeof onChange === 'function') onChange(next)
  }

  // Remove a technology by it's index.
  const removeTechnology = (index) => {
    const next = selectedTechs.filter((_, i) => i !== index)
    setSelectedTechs(next)
    if (typeof onChange === 'function') onChange(next)
  }

  // Allows user to press enter for inputs.
  const handleKeyDown = (e) => {
    if (e.key === 'Enter') {
      e.preventDefault()
      addTechnology(inputValue)
    }
  }

  // This prevents an infinite update loop if `technologies` prop is a new array
  // reference every render. We compare length and each item to decide.
  useEffect(() => {
    if (!Array.isArray(technologies)) return

    const propArr = technologies
    const stateArr = selectedTechs

    const arraysEqual = propArr.length === stateArr.length && propArr.every((val, idx) => String(val) === String(stateArr[idx]))

    // Only updates the local state if arrays are different.
    if (!arraysEqual) {
      setSelectedTechs(propArr)
    }
  }, [technologies])

  const showError = !!(error || localError)

  return (
    <div className="w-full max-w-lg">
      {/* Tags: selected technologies */}
      <div className="flex flex-wrap gap-2 mb-2" role="list" aria-label="Selected technologies">
        {selectedTechs.map((tech, i) => (
          <div
            key={String(tech) + '-' + i}
            role="listitem"
            className="flex items-center gap-2 px-2 py-1 rounded-full border text-sm"
          >
            <span>{tech}</span>
            <button
              type="button"
              aria-label={`Remove ${tech}`}
              onClick={() => removeTechnology(i)}
              className="text-xs px-1"
            >
              ×
            </button>
          </div>
        ))}
      </div>

      {/* Input + Add button */}
      <div className="flex gap-2 items-start">
        <input
          id="tech-input"
          aria-label="Add technology"
          value={inputValue}
          onChange={(e) => { setInputValue(e.target.value); setLocalError('') }}
          onKeyDown={handleKeyDown}
          placeholder="Type a technology"
          className={
            'flex-1 px-3 py-2 border rounded focus:outline-none ' +
            (showError ? 'border-red-500' : 'border-gray-300')
          }
        />
        <button
          type="button"
          onClick={() => addTechnology(inputValue)}
          className="px-3 py-2 rounded border"
        >
          Add
        </button>
      </div>

      {/* Error display */}
      <div className="min-h-[1.25rem] mt-1 text-sm">
        {localError ? (
          <div className="text-red-600" role="status">{localError}</div>
        ) : error ? (
          <div className="text-red-600" role="status">{String(error)}</div>
        ) : null}
      </div>

      {/* Quick-add buttons */}
      <div className="mt-3 flex flex-wrap gap-2">
        {QUICK_TECHNOLOGIES.map((tech) => (
          <button
            key={tech}
            type="button"
            onClick={() => addTechnology(tech)}
            className="text-sm px-2 py-1 rounded border"
            aria-pressed={isDuplicate(tech)}
          >
            {tech}
          </button>
        ))}
      </div>
    </div>
  )
}
