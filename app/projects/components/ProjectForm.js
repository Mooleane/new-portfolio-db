// TODO: Students will implement this component
// This is a learning exercise - students should build this form component from scratch
// The tests will guide the implementation requirements

// Component Requirements:
// 1. Create a form component that accepts { onSubmit, onCancel, isOpen } props
// 2. Manage form state for: title, description, imageUrl, projectUrl, githubUrl, technologies
// 3. Implement form validation:
//    - title: required
//    - description: required
//    - technologies: required (at least one)
//    - URLs: validate format if provided
// 4. Handle form submission and loading states
// 5. Display validation errors to user
// 6. Reset form after successful submission
// 7. Only render when isOpen is true
// 8. Include TechnologyInput component for managing technologies

// Learning Objectives:
// - React state management with useState
// - Form validation patterns
// - Conditional rendering
// - Event handling
// - Error state management
// - Component composition

// Hints:
// - Use 'use client' directive for client-side functionality
// - Import TechnologyInput from './TechnologyInput'
// - Use regex for URL validation: /^https?:\/\/.+\..+/
// - Handle async form submission with try/catch
// - Use loading state to prevent double submission

'use client'

import { useState } from 'react'
import TechnologyInput from './TechnologyInput'

export default function ProjectForm({ onSubmit, onCancel, isOpen }) {
  if (!isOpen) return null

  const [title, setTitle] = useState('')
  const [description, setDescription] = useState('')
  const [imageUrl, setImageUrl] = useState('')
  const [projectUrl, setProjectUrl] = useState('')
  const [githubUrl, setGithubUrl] = useState('')
  const [technologies, setTechnologies] = useState([])

  const [errors, setErrors] = useState({})
  const [loading, setLoading] = useState(false)

  const validate = () => {
    const newErrors = {}
    if (!title.trim()) newErrors.title = 'Title is required'
    if (!description.trim()) newErrors.description = 'Description is required'
    if (!technologies.length) newErrors.technologies = 'At least one technology is required'

    const urlRegex = /^https?:\/\/.+\..+/
    if (imageUrl && !urlRegex.test(imageUrl)) newErrors.imageUrl = 'Invalid URL'
    if (projectUrl && !urlRegex.test(projectUrl)) newErrors.projectUrl = 'Invalid URL'
    if (githubUrl && !urlRegex.test(githubUrl)) newErrors.githubUrl = 'Invalid URL'

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (!validate()) return
    setLoading(true)
    try {
      await onSubmit({ title, description, imageUrl, projectUrl, githubUrl, technologies })
      // reset form
      setTitle('')
      setDescription('')
      setImageUrl('')
      setProjectUrl('')
      setGithubUrl('')
      setTechnologies([])
      setErrors({})
    } catch (err) {
      console.error(err)
    } finally {
      setLoading(false)
    }
  }

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label>Title:</label>
        <input value={title} onChange={(e) => setTitle(e.target.value)} />
        {errors.title && <p>{errors.title}</p>}
      </div>

      <div>
        <label>Description:</label>
        <textarea value={description} onChange={(e) => setDescription(e.target.value)} />
        {errors.description && <p>{errors.description}</p>}
      </div>

      <div>
        <label>Image URL:</label>
        <input value={imageUrl} onChange={(e) => setImageUrl(e.target.value)} />
        {errors.imageUrl && <p>{errors.imageUrl}</p>}
      </div>

      <div>
        <label>Project URL:</label>
        <input value={projectUrl} onChange={(e) => setProjectUrl(e.target.value)} />
        {errors.projectUrl && <p>{errors.projectUrl}</p>}
      </div>

      <div>
        <label>GitHub URL:</label>
        <input value={githubUrl} onChange={(e) => setGithubUrl(e.target.value)} />
        {errors.githubUrl && <p>{errors.githubUrl}</p>}
      </div>

      <div>
        <label>Technologies:</label>
        <TechnologyInput
          technologies={technologies}
          setTechnologies={setTechnologies}
        />
        {errors.technologies && <p>{errors.technologies}</p>}
      </div>

      <button type="submit" disabled={loading}>{loading ? 'Submitting...' : 'Submit'}</button>
      <button type="button" onClick={onCancel} disabled={loading}>Cancel</button>
    </form>
  )
}
