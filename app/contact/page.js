"use client";
import Link from "next/link";

export default function Contact() {
  return (
    <div className="min-h-screen p-8">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-5xl font-bold mb-12">Get In Touch</h1>
        <div className="bg-white rounded-lg shadow-lg p-8 mb-8">
          <p className="text-xl text-gray-700 mb-8">
            I'd love to hear from you! Feel free to reach out through any of these channels.
          </p>
          <div className="space-y-6">
            <div className="flex items-center gap-4">
              <span className="text-3xl">:e-mail:</span>
              <div>
                <p className="font-bold text-gray-900">Email</p>
                <p className="text-gray-600">alope0091@launchpadphilly.org</p>
              </div>
            </div>
            <div className="flex items-center gap-4">
              <span className="text-3xl">:link:</span>
              <div>
                <p className="font-bold text-gray-900">LinkedIn</p>
                <Link
                  href="https://linkedin.com/in/aaron-lopez-41586a307"
                  target="_blank"
                  className="text-blue-500 hover:underline"
                >
                  linkedin.com/in/aaron-lopez-41586a307
                </Link>
              </div>
            </div>
            <div className="flex items-center gap-4">
              <span className="text-3xl">:computer:</span>
              <div>
                <p className="font-bold text-gray-900">GitHub</p>
                <Link
                  href="https://github.com/Mooleane"
                  target="_blank"
                  className="text-blue-500 hover:underline"
                >
                  github.com/Mooleane
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}