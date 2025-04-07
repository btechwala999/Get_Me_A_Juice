import Link from 'next/link'

export default function NotFound() {
  return (
    <div className="flex flex-col items-center justify-center min-h-[70vh] text-white">
      <h2 className="text-3xl font-bold mb-4">User Not Found</h2>
      <p className="mb-6 text-gray-300">The user you&apos;re looking for doesn&apos;t exist or hasn&apos;t set up their profile yet.</p>
      <Link href="/" className="py-2 px-4 bg-blue-600 hover:bg-blue-700 rounded-md text-white transition-colors">
        Return Home
      </Link>
    </div>
  )
} 