import ProfilePhoto from "../components/ProfilePhoto"

export default function About() {
  return (
    <div className="min-h-screen p-8">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-5xl font-bold mb-8 text-white">About Me</h1>
        
        <div className="mb-12">
          <ProfilePhoto />

          <p className="text-gray-500 mt-2 leading-relaxed">
            My name is Aaron and I am an internship Associate at Launchpad Philly. <br />In my free time, I like to draw and play video games. <br />I am currently learning how to create Next.js Projects.
          </p>

          <h2 className="text-3xl font-bold mb-8 mt-12 text-white">Technical Skills</h2>
          <div className="grid grid-cols-2 gap-6 mb-12">
            <div>
              <h3 className="font-bold text-white mb-2">Languages & Frameworks</h3>
              <p className="text-gray-500">JavaScript, React, Python, Next.js, HTML, CSS</p>
            </div>
            <div>
              <h3 className="font-bold text-white mb-2">Tools & Platforms</h3>
              <p className="text-gray-500">Figma, FigJam, Trello, Notion, Google Suite, ChatGPT, Claude</p>
            </div>
          </div>

          <h2 className="text-3xl font-bold mb-8 text-white">Education & Experience</h2>
          
          <div className="space-y-8">
            {/* Timeline Item 1 */}
            <div className="flex gap-6">
              <div className="flex flex-col items-center">
                <div className="w-4 h-4 bg-blue-600 rounded-full mt-2"></div>
                <div className="w-1 h-24 bg-gray-200"></div>
              </div>
              <div className="pb-8">
                <h3 className="text-xl font-bold text-white">Associate</h3>
                <p className="text-gray-500 font-semibold">Launchpad Philly, Philadelphia, PA • September 2025 – Current</p>
                <p className="text-gray-500 mt-2 leading-relaxed">
                  Developing an AI-powered React app to streamline career discovery in the competitive job market. Managing projects in Trello, drilling JavaScript and React fundamentals through coursework and hands-on implementation.
                </p>
              </div>
            </div>

            {/* Timeline Item 2 */}
            <div className="flex gap-6">
              <div className="flex flex-col items-center">
                <div className="w-4 h-4 bg-blue-600 rounded-full mt-2"></div>
                <div className="w-1 h-24 bg-gray-200"></div>
              </div>
              <div className="pb-8">
                <h3 className="text-xl font-bold text-white">Content Manager</h3>
                <p className="text-gray-500 font-semibold">Building 21, Philadelphia, PA • July 2025 – August 2025</p>
                <p className="text-gray-500 mt-2 leading-relaxed">
                  Managed 200+ grant entries and organized multi-stage tasks using Google Sheets and Notion. Configured PlayLab LLMs to automate LinkedIn posts and post-purchase customer emails.
                </p>
              </div>
            </div>

            {/* Timeline Item 3 */}
            <div className="flex gap-6">
              <div className="flex flex-col items-center">
                <div className="w-4 h-4 bg-blue-600 rounded-full mt-2"></div>
                <div className="w-1 h-24 bg-gray-200"></div>
              </div>
              <div className="pb-8">
                <h3 className="text-xl font-bold text-white">Student</h3>
                <p className="text-gray-500 font-semibold">Launchpad Philly, Philadelphia, PA • January 2024 – June 2025</p>
                <p className="text-gray-500 mt-2 leading-relaxed">
                  Completed 200 hours of Python training with PCEP-aligned API integration. Built coding projects highlighting creative expression and data security. Developed workplace competencies including collaboration and conflict resolution.
                </p>
              </div>
            </div>

            {/* Timeline Item 4 */}
            <div className="flex gap-6">
              <div className="flex flex-col items-center">
                <div className="w-4 h-4 bg-blue-600 rounded-full mt-2"></div>
              </div>
              <div>
                <h3 className="text-xl font-bold text-white">High School Diploma</h3>
                <p className="text-gray-500 font-semibold">Building 21, Philadelphia, PA • June 2025</p>
                <p className="text-gray-500 mt-2 leading-relaxed">
                  GPA: 3.85/4.0 | Dean&apos;s List
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
