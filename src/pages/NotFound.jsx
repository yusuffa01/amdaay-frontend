import { Link } from 'react-router-dom'

function NotFound() {
  return (
    <div className="min-h-screen bg-orange-50 flex flex-center flex-col items-center justify-center p-6 text-center">
      <h1 className="text-9xl font-black text-orange-200 absolute">404</h1>
      <div className="relative z-10">
        <span className="text-8xl">🥘</span>
        <h2 className="text-3xl font-bold text-gray-800 mt-4">Waduh, Masakannya Belum Matang!</h2>
        <p className="text-gray-600 mt-2 mb-8">Halaman yang Anda cari tidak ditemukan di dapur kami.</p>
        <Link 
          to="/" 
          className="bg-orange-500 text-white px-8 py-3 rounded-2xl font-bold shadow-lg hover:bg-orange-600 transition-all"
        >
          Kembali ke Meja Makan (Beranda)
        </Link>
      </div>
    </div>
  )
}

export default NotFound