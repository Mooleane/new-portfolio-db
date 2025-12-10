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

const QUICK_TECHNOLOGIES = [
  'JavaScript', 'TypeScript', 'React', 'Next.js', 'Node.js', 'Express',
  'HTML', 'CSS', 'Tailwind CSS', 'Bootstrap', 'Python', 'Java',
  'PostgreSQL', 'MongoDB', 'MySQL', 'Prisma', 'GraphQL', 'REST API',
  'Git', 'Docker', 'AWS', 'Vercel', 'Figma', 'Photoshop'
]

export default function TechnologyInput({ technologies = [], onChange, error }) {
  const [selectedTechs, setSelectedTechs] = useState(
    Array.isArray(technologies) ? technologies : []
  )
  const [inputValue, setInputValue] = useState('')
  const [localError, setLocalError] = useState('')

  const normalize = (s) => String(s).trim()

  const isDuplicate = (tech) => {
    const lc = String(tech).toLowerCase()
    return selectedTechs.some((t) => String(t).toLowerCase() === lc)
  }

  const notifyChange = (next) => {
    setSelectedTechs(next)
    if (typeof onChange === 'function') onChange(next)
  }

  const addTechnology = (raw) => {
    const tech = normalize(raw)
    if (!tech) return
    if (isDuplicate(tech)) {
      setLocalError('Technology already added')
      return
    }
    const next = [...selectedTechs, tech]
    setInputValue('')
    setLocalError('')
    notifyChange(next)
  }

  const removeTechnology = (index) => {
    const next = selectedTechs.filter((_, i) => i !== index)
    setLocalError('')
    notifyChange(next)
  }

  const handleKeyDown = (e) => {
    if (e.key === 'Enter') {
      e.preventDefault()
      addTechnology(inputValue)
    }
  }

  // Sync prop -> state when `technologies` prop changes (shallow compare)
  useEffect(() => {
    if (!Array.isArray(technologies)) return
    const propArr = technologies
    const stateArr = selectedTechs
    const arraysEqual =
      propArr.length === stateArr.length &&
      propArr.every((val, idx) => String(val) === String(stateArr[idx]))
    if (!arraysEqual) {
      setSelectedTechs(propArr)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [technologies])

  const showError = !!(error || localError)

  return (
    <div className="w-full max-w-lg">
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

      <div className="min-h-[1.25rem] mt-1 text-sm">
        {localError ? (
          <div className="text-red-600" role="status">{localError}</div>
        ) : error ? (
          <div className="text-red-600" role="status">{String(error)}</div>
        ) : null}
      </div>

      <div className="mt-3 flex flex-wrap gap-2">
        {QUICK_TECHNOLOGIES.map((tech) => {
          const selected = isDuplicate(tech)
          return (
            <button
              key={tech}
              type="button"
              onClick={() => addTechnology(tech)}
              aria-label={tech}
              disabled={selected}
              className="text-sm px-2 py-1 rounded border"
              aria-pressed={selected}
            >
              {selected ? '✓' : tech}
            </button>
          )
        })}
      </div>
    </div>
  )
}
