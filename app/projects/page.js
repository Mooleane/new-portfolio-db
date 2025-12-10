"use client";

import React, { useCallback, useEffect, useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import ProjectForm from './components/ProjectForm'

export default function Projects() {
  // TODO: Students will implement the following:
  // 1. Convert this server component to a client component
  // 2. Add state management for projects, loading, and form visibility
  // 3. Implement API fetch functions to get projects from the database
  // 4. Add project creation functionality using the ProjectForm component
  // 5. Handle loading and error states

  const [showForm, setShowForm] = useState(false)
  const [projects, setProjects] = useState([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)

  const fetchProjects = useCallback(async () => {
    setLoading(true)
    setError(null)
    try {
      const res = await fetch('/api/projects')
      if (!res.ok) throw new Error(`Failed to fetch projects: ${res.status}`)
      const data = await res.json()
      setProjects(Array.isArray(data) ? data : [])
    } catch (err) {
      setError(err.message || 'Failed to load projects')
    } finally {
      setLoading(false)
    }
  }, [])

  useEffect(() => {
    fetchProjects()
  }, [fetchProjects])


  return (
    <div className="min-h-screen p-8">
      <div className="max-w-6xl mx-auto">
        {/* Header - students will add "Add New Project" button here */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-12 gap-4">
          <h1 className="text-5xl font-bold">My Projects</h1>
          <button
            onClick={() => setShowForm((prev) => !prev)}
            className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition-colors"
          >
            {showForm ? 'Cancel' : 'Add New Project'}
          </button>
        </div>

        {/* ProjectForm - wired to create projects */}
        {/* The form should be conditionally rendered based on showForm state */}
        {showForm && (
          <ProjectForm
            isOpen={showForm}
            onCancel={() => setShowForm(false)}
            onSubmit={async (values) => {
              setLoading(true)
              setError(null)
              try {
                const res = await fetch('/api/projects', {
                  method: 'POST',
                  headers: { 'Content-Type': 'application/json' },
                  body: JSON.stringify(values),
                })
                if (!res.ok) {
                  const text = await res.text()
                  throw new Error(text || `Create failed: ${res.status}`)
                }
                const created = await res.json()
                setProjects((prev) => [created, ...prev])
                setShowForm(false)
                return created
              } catch (err) {
                setError(err.message || 'Failed to create project')
                throw err
              } finally {
                setLoading(false)
              }
            }}
          />
        )}

        {/* Projects Grid */}
        {loading ? (
          <div className="text-center py-12">Loading projects...</div>
        ) : error ? (
          <div className="text-center py-12">
            <div className="text-red-600 font-medium mb-4">Error: {error}</div>
            <button
              onClick={fetchProjects}
              className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition-colors"
            >
              Retry
            </button>
          </div>
        ) : projects.length > 0 ? (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-8">
            {projects.map((project) => (
              <div key={project.id} className="bg-white rounded-lg shadow-lg overflow-hidden hover:shadow-xl transition-shadow">
                <div className="h-48 bg-gradient-to-r from-blue-400 to-blue-600 flex items-center justify-center">
                  {project.imageUrl ? (
                    <Image
                      src={project.imageUrl}
                      alt={project.title}
                      width={960}
                      height={540}
                      className="object-cover"
                    />
                  ) : (
                    <p className="text-white font-bold text-xl">No Image</p>
                  )}
                </div>
                <div className="p-6">
                  <h3 className="text-2xl text-blue-500 font-bold mb-2">{project.title}</h3>
                  <p className="text-gray-600 mb-4 line-clamp-3">{project.description}</p>
                  <div className="flex gap-2 mb-4 flex-wrap">
                    {project.technologies?.slice(0, 3).map((tech, index) => (
                      <span key={index} className="text-sm text-blue-500 bg-gray-200 px-3 py-1 rounded">
                        {tech}, 
                      </span>
                    ))}
                    {project.technologies?.length > 3 && (
                      <span className="text-sm text-gray-500 px-3 py-1">
                        +{project.technologies.length - 3} more
                      </span>
                    )}
                  </div>
                  <div className="flex gap-2">
                    <Link 
                      href={`/projects/${project.id}`}
                      className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition-colors"
                    >
                      View Details
                    </Link>
                    {project.projectUrl && (
                      <a
                        href={project.projectUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="bg-gray-200 text-gray-800 px-4 py-2 rounded hover:bg-gray-300 transition-colors"
                      >
                        Live Demo
                      </a>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          /* Empty State - Students will enhance this */
          <div className="text-center py-12">
            <div className="mb-8">
              <h2 className="text-2xl font-bold mb-4">No projects yet</h2>
              <p className="text-gray-600 mb-6">
                Get started by setting up your database and implementing the API routes!
              </p>
            </div>

            <div className="bg-blue-50 border-2 border-blue-200 rounded-lg p-6 max-w-md mx-auto">
              <h3 className="font-bold text-blue-900 mb-2">🚀 Getting Started:</h3>
              <ol className="text-blue-800 space-y-1 list-decimal list-inside text-left">
                <li>Set up your Neon database</li>
                <li>Implement the API routes</li>
                <li>Add project creation functionality</li>
                <li>Convert this page to use database data</li>
              </ol>
            </div>
          </div>
        )}

      </div>
    </div>
  );
}

// Learning Objectives for Students:
// 1. Understand server vs client components
// 2. Learn React state management patterns
// 3. Implement API integration
// 4. Handle async operations and error states
// 5. Build interactive user interfaces
// 6. Practice component composition
