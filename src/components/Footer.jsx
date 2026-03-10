import { Link } from 'react-router-dom'

function Footer() {
  const tahunIni = new Date().getFullYear()
  const nomorWA = "6289622000010" 

  return (
    <footer className="bg-stone-800 text-stone-50 py-12 font-sans mt-auto border-t-[6px] border-stone-500">
      <div className="max-w-5xl mx-auto px-6 grid grid-cols-1 md:grid-cols-3 gap-10">
        <div className="flex flex-col items-start">
          <div className="mb-4 p-1 bg-white rounded-full shadow-lg">
            <img 
              src="/logoweb.jpg" 
              alt="Amdaay Logo" 
              className="h-20 w-20 object-cover rounded-full" 
            />
          </div>
          <h3 className="text-2xl font-serif font-bold text-white mb-2">Amdaay.Scarf</h3>
          <p className="text-stone-300 text-sm leading-relaxed">
            Menghadirkan koleksi busana muslimah bergaya Arab yang elegan, modern, dan nyaman. 
            Tampil anggun dan syar'i setiap hari bersama Amdaay.Scarf.
          </p>
        </div>
        <div>
          <h4 className="text-xl font-bold text-white mb-4">Jelajahi</h4>
          <ul className="space-y-3 text-sm text-stone-200 font-medium">
            <li>
              <Link to="/" className="hover:text-white hover:translate-x-1 inline-block transition-transform flex items-center gap-2">
                <span>🧣</span> Katalog Koleksi
              </Link>
            </li>
            <li>
              <Link to="/about" className="hover:text-white hover:translate-x-1 inline-block transition-transform flex items-center gap-2">
                <span>📖</span> Tentang Kami
              </Link>
            </li>
            <li>
              <a href={`https://wa.me/${nomorWA}?text=Halo%20Admin%20Amdaay,%20saya%20ingin%20tanya%20seputar%20koleksi...`} target="_blank" rel="noreferrer" className="hover:text-white hover:translate-x-1 inline-block transition-transform flex items-center gap-2">
                <span>💬</span> Bantuan & Custom Order
              </a>
            </li>
          </ul>
        </div>
        <div>
          <h4 className="text-xl font-bold text-white mb-4">Temukan Kami</h4>
          <ul className="space-y-3 text-sm text-stone-200">
            <li className="flex items-center gap-3 text-sm">
              <span className="text-lg">📍</span> 
              <span>Cilegon, Banten</span>
            </li>
            <li className="flex items-center gap-3 text-sm">
              <span className="text-lg">📸</span> 
              <a href="https://instagram.com/amdaay.scarf" target="_blank" rel="noreferrer" className="hover:text-white hover:underline">
                @amdaay.scarf
              </a>
            </li>
          </ul>
        </div>

      </div>
      <div className="max-w-5xl mx-auto px-6 mt-12 pt-6 border-t border-stone-700/50 flex flex-col md:flex-row justify-between items-center gap-4 text-xs text-stone-400 font-medium uppercase tracking-widest">
        <p>&copy; {tahunIni} amdaay.scarf. All Rights Reserved.</p>
        <p>Handcrafted with ❤️ and made in indonesia.</p>
      </div>
    </footer>
  )
}

export default Footer