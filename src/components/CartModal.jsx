function CartModal({ 
  isOpen, 
  setIsOpen, 
  keranjang, 
  kurangiDariKeranjang, 
  tambahKeKeranjang, 
  totalHargaKeranjang, 
  kirimWhatsApp, 
  kosongkanKeranjang 
}) {

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-3xl shadow-2xl w-full max-w-md overflow-hidden animate-fade-in flex flex-col max-h-[90vh]">
        
        <div className="bg-stone-500 p-5 text-white flex justify-between items-center">
          <h2 className="text-xl font-black">🧾 Rincian Pesanan</h2>
          <button onClick={() => setIsOpen(false)} className="text-white hover:text-stone-200 font-bold text-2xl leading-none">&times;</button>
        </div>

        <div className="p-5 overflow-y-auto flex-grow bg-gray-50">
          {keranjang.map((item) => (
            <div key={item.ID} className="flex justify-between items-center bg-white p-4 rounded-xl mb-3 shadow-sm border border-gray-100">
              <div className="flex-1">
                <h3 className="font-bold text-gray-800 leading-tight">{item.nama || item.Nama}</h3>
                <p className="text-stone-600 font-semibold text-sm">Rp {(item.harga || item.Harga).toLocaleString('id-ID')}</p>
              </div>
              
              <div className="flex items-center gap-3 bg-gray-100 rounded-lg p-1">
                <button onClick={() => kurangiDariKeranjang(item.ID)} className="w-8 h-8 flex items-center justify-center bg-white rounded-md text-stone-600 font-black shadow-sm hover:bg-stone-50">-</button>
                <span className="font-bold w-4 text-center">{item.qty}</span>
                <button onClick={() => tambahKeKeranjang(item)} className="w-8 h-8 flex items-center justify-center bg-white rounded-md text-stone-600 font-black shadow-sm hover:bg-stone-50">+</button>
              </div>
            </div>
          ))}
        </div>

        <div className="p-6 bg-white border-t-2 border-dashed border-gray-200">
          <div className="flex justify-between items-center mb-6">
            <span className="text-gray-500 font-bold">Total Pembayaran</span>
            <span className="text-2xl font-black text-stone-600">Rp {totalHargaKeranjang.toLocaleString('id-ID')}</span>
          </div>

          <div className="space-y-3">
            <button 
              onClick={kirimWhatsApp} 
              disabled={keranjang.length === 0}
              className="w-full bg-green-500 hover:bg-green-600 text-white font-bold py-4 rounded-xl flex justify-center items-center gap-2 shadow-lg transition-all disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <span>Pesan via WhatsApp</span> 💬
            </button>
            
            <button 
              onClick={kosongkanKeranjang} 
              className="w-full bg-red-50 hover:bg-red-100 text-red-600 font-bold py-3 rounded-xl flex justify-center items-center transition-all"
            >
              🗑️ Kosongkan & Batal
            </button>
          </div>
        </div>

      </div>
    </div>
  )
}

export default CartModal