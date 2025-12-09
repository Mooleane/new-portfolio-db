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

  const urlRegex = /^https?:\/\/.+\..+/

  const validate = () => {
    const newErrors = {}
    if (!title.trim()) newErrors.title = 'Title is required'
    if (!description.trim()) newErrors.description = 'Description is required'
    // tests expect technologies required (reject when missing)
    if (!technologies || technologies.length === 0) newErrors.technologies = 'At least one technology is required'

    if (imageUrl && !urlRegex.test(imageUrl)) newErrors.imageUrl = 'Please enter a valid URL'
    if (projectUrl && !urlRegex.test(projectUrl)) newErrors.projectUrl = 'Please enter a valid URL'
    if (githubUrl && !urlRegex.test(githubUrl)) newErrors.githubUrl = 'Please enter a valid URL'

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (!validate()) return
    setLoading(true)
    try {
      await onSubmit({
        title: title.trim(),
        description: description.trim(),
        imageUrl: imageUrl.trim(),
        projectUrl: projectUrl.trim(),
        githubUrl: githubUrl.trim(),
        technologies
      })

      // reset on success
      setTitle('')
      setDescription('')
      setImageUrl('')
      setProjectUrl('')
      setGithubUrl('')
      setTechnologies([])
      setErrors({})
    } catch (err) {
      console.error(err)
      // Optionally present a generic error to user
    } finally {
      setLoading(false)
    }
  }

  return (
    <form onSubmit={handleSubmit} aria-label="project-form" className="space-y-4">
      <h2>Add New Project</h2>

      <div>
        <label htmlFor="title">Project Title</label>
        <input
          id="title"
          aria-label="Project Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className={errors.title ? 'border-red-500' : ''}
        />
        {errors.title && <p>{errors.title}</p>}
      </div>

      <div>
        <label htmlFor="description">Description</label>
        <textarea
          id="description"
          aria-label="Description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          className={errors.description ? 'border-red-500' : ''}
        />
        {errors.description && <p>{errors.description}</p>}
      </div>

      <div>
        <label htmlFor="imageUrl">Image URL</label>
        <input
          id="imageUrl"
          aria-label="Image URL"
          value={imageUrl}
          onChange={(e) => setImageUrl(e.target.value)}
        />
        {errors.imageUrl && <p>{errors.imageUrl}</p>}
      </div>

      <div>
        <label htmlFor="projectUrl">Project URL</label>
        <input
          id="projectUrl"
          aria-label="Project URL"
          value={projectUrl}
          onChange={(e) => setProjectUrl(e.target.value)}
        />
        {errors.projectUrl && <p>{errors.projectUrl}</p>}
      </div>

      <div>
        <label htmlFor="githubUrl">GitHub URL</label>
        <input
          id="githubUrl"
          aria-label="GitHub URL"
          value={githubUrl}
          onChange={(e) => setGithubUrl(e.target.value)}
        />
        {errors.githubUrl && <p>{errors.githubUrl}</p>}
      </div>

      <div>
        <label htmlFor="technologies">Technologies</label>
        <TechnologyInput
          technologies={technologies}
          onChange={setTechnologies}
        />
        {errors.technologies && <p>{errors.technologies}</p>}
      </div>

      <div className="flex gap-2">
        <button
          type="submit"
          disabled={loading}
          aria-label="Create Project Button"
        >
          {loading ? 'Creating Project...' : 'Create Project'}
        </button>

        <button
          type="button"
          onClick={() => {
            // reset local state when cancel is clicked
            setTitle('')
            setDescription('')
            setImageUrl('')
            setProjectUrl('')
            setGithubUrl('')
            setTechnologies([])
            setErrors({})
            onCancel && onCancel()
          }}
          disabled={loading}
        >
          Cancel
        </button>
      </div>
    </form>
  )
}
