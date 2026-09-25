
import Link from 'next/link';

export default function NotFound() {
  return (
    <div className="min-h-[70vh] bg-[#121318] text-white flex flex-col items-center justify-center p-4 text-center space-y-4">
      <h1 className="text-6xl font-black text-[#a3e635]">404</h1>
      <h2 className="text-2xl font-black uppercase tracking-wide">
        PAGE NOT FOUND
      </h2>
      <p className="text-gray-400 text-sm max-w-md">
        The lift or route you are looking for does not exist in our library.
      </p>
      <div className="pt-2">
        <Link
          href="/"
          className="inline-block bg-[#a3e635] text-black font-extrabold text-xs uppercase px-6 py-3 rounded-xl hover:bg-[#8ece25] transition-colors"
        >
          Back to Workouts
        </Link>
      </div>
    </div>
  );
}