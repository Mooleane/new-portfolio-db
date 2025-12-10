import Image from 'next/image';
import Link from 'next/link';
import { notFound } from 'next/navigation';

export default async function ProjectDetail({ params }) {
  const { id } = params;

  const response = await fetch(`http://localhost:3000/api/projects/${id}`);
  
  if (!response.ok) {
    if (response.status === 404) {
      notFound();
    }
    throw new Error('Failed to fetch project');
  }
  
  const project = await response.json();

  if (!project) {
    return (
      <div className="min-h-screen p-10 bg-gray-900">
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="text-4xl font-extrabold mb-10 text-white">Project Not Implemented</h1>
          <div className="bg-blue-800 border border-blue-700 rounded-xl p-10 max-w-md mx-auto shadow">
            <h2 className="font-bold text-blue-100 mb-5 text-lg">🚀 To view project details:</h2>
            <ol className="text-blue-200 space-y-3 list-decimal list-inside text-left text-base">
              <li>Implement the GET /api/projects/[id] endpoint</li>
              <li>Create and seed your database with projects</li>
              <li>Update this page to fetch from the API</li>
            </ol>
          </div>
          <Link 
            href="/projects" 
            className="inline-block mt-10 bg-blue-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-blue-700 transition-colors"
          >
            ← Back to Projects
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen p-10 bg-gray-900">
      <div className="max-w-4xl mx-auto">
        <Link 
          href="/projects" 
          className="inline-flex items-center text-blue-400 hover:text-blue-200 mb-10 font-medium"
        >
          ← Back to Projects
        </Link>

        <div className="mb-10">
          <h1 className="text-5xl font-extrabold mb-6 text-white">{project.title}</h1>
          <div className="flex flex-wrap gap-3 mb-8">
            {project.technologies.map((tech, index) => (
              <span key={index} className="bg-blue-600 text-white px-5 py-2 rounded-full text-sm font-medium">
                {tech}
              </span>
            ))}
          </div>
        </div>

        {project.imageUrl && (
          <div className="h-56 md:h-72 w-full rounded-lg overflow-hidden bg-gradient-to-r from-blue-400 to-blue-600 mb-10 flex items-center justify-center shadow-lg">
            <Image
              src={project.imageUrl}
              alt={project.title}
              width={960}
              height={540}
              className="object-cover w-full h-full"
            />
          </div>
        )}

        <div className="grid md:grid-cols-3 gap-10">
          <div className="md:col-span-2">
            <h2 className="text-3xl font-bold mb-5 text-white">About This Project</h2>
            <p className="text-lg text-gray-200 leading-relaxed mb-8">
              {project.description}
            </p>
          </div>

          <div className="space-y-8">
            <div className="bg-gray-800 rounded-xl shadow-md p-6">
              <h3 className="text-xl font-bold mb-5 text-white">Project Links</h3>
              <div className="space-y-4">
                {project.projectUrl && (
                  <a
                    href={project.projectUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="block w-full bg-green-600 text-white text-center px-5 py-3 rounded-lg font-medium hover:bg-green-700 transition-colors"
                  >
                    View Live Project
                  </a>
                )}
                {project.githubUrl && (
                  <a
                    href={project.githubUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="block w-full bg-gray-700 text-white text-center px-5 py-3 rounded-lg font-medium hover:bg-gray-600 transition-colors"
                  >
                    View on GitHub
                  </a>
                )}
              </div>
            </div>

            <div className="bg-gray-800 rounded-xl shadow-md p-6">
              <h3 className="text-xl font-bold mb-5 text-white">Project Info</h3>
              <div className="space-y-2 text-sm text-gray-300">
                <p><strong>Created:</strong> {new Date(project.createdAt).toLocaleDateString()}</p>
                <p><strong>Last Updated:</strong> {new Date(project.updatedAt).toLocaleDateString()}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
