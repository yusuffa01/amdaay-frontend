function FloatingCart({ isAdmin, totalItem, totalHarga, bukaModal }) {
  
  if (isAdmin || totalItem === 0) return null;

  return (
    <div className="fixed bottom-6 left-1/2 -translate-x-1/2 w-full max-w-lg px-4 z-40">
      <div 
        onClick={bukaModal}
        className="bg-stone-600 text-white p-4 rounded-3xl shadow-2xl flex justify-between items-center border-4 border-white cursor-pointer hover:bg-stone-700 transition-all transform hover:-translate-y-1"
      >
        <div>
          <p className="text-xs opacity-80 uppercase font-black tracking-widest">Keranjang Belanja</p>
          <p className="text-lg font-bold">{totalItem} Pcs | Rp {totalHarga.toLocaleString('id-ID')}</p>
        </div>
        <div className="bg-white text-stone-600 px-6 py-3 rounded-2xl font-black flex items-center gap-2">
          <span>Lihat Nota</span>
          <span className="text-xl">🧾</span>
        </div>
      </div>
    </div>
  )
}

export default FloatingCart