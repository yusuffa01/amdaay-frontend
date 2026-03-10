function AboutUs() {
  return (
    <div className="min-h-screen bg-[#FDFBF7] font-sans">
      <div className="bg-stone-800 py-28 px-4 text-center text-white">
        <h1 className="text-5xl font-serif font-bold mb-4 tracking-widest uppercase">Cerita Amdaay.Scarf</h1>
        <div className="h-1 w-20 bg-stone-400 mx-auto mb-6"></div>
        <p className="text-xl opacity-90 font-light italic">Elegansi dalam setiap lipatan, keanggunan dalam setiap helai.</p>
      </div>

      <div className="max-w-5xl mx-auto py-20 px-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-16 items-center">
          <div className="relative group">
            <div className="absolute -inset-4 bg-stone-200 rounded-3xl -rotate-3 group-hover:rotate-0 transition-transform duration-500"></div>
            <div className="relative rounded-2xl overflow-hidden shadow-2xl bg-white aspect-[3/4] flex items-center justify-center text-8xl border border-stone-100">
               <img src="/logoweb.jpg" alt="Amdaay Concept" className="w-full h-full object-cover opacity-80" />
               <div className="absolute inset-0 bg-stone-900/10"></div>
               <span className="absolute bottom-6 text-stone-500 text-xs tracking-[0.3em] uppercase">The Collection</span>
            </div>
          </div>
          
          <div className="space-y-8">
            <h2 className="text-4xl font-serif font-bold text-stone-800 leading-tight">Mendefinisikan Ulang <br/> <span className="text-stone-500 italic">Modest Fashion</span></h2>
            
            <div className="space-y-4">
              <p className="text-stone-600 leading-relaxed text-lg">
                Amdaay.Scarf lahir dari keinginan untuk menghadirkan sentuhan gaya Arab yang elegan ke dalam keseharian muslimah modern di Indonesia. Berawal dari kecintaan terhadap tekstur kain yang mewah dan potongan yang bersahaja.
              </p>
              <p className="text-stone-600 leading-relaxed">
                Kami percaya bahwa berbusana syar'i bukan berarti membatasi ekspresi keindahan. Setiap koleksi kami dirancang untuk memberikan rasa percaya diri, kenyamanan maksimal, dan aura keanggunan yang abadi bagi pemakainya.
              </p>
            </div>

            <div className="pt-4">
               <p className="text-stone-400 text-sm tracking-widest uppercase border-l-4 border-stone-300 pl-4">
                 Since 2024 • Based in Lampung
               </p>
            </div>
          </div>
        </div>

        <div className="mt-32 grid grid-cols-1 md:grid-cols-3 gap-12 text-center">
          <div className="p-10 bg-white border border-stone-100 rounded-3xl shadow-sm hover:shadow-md transition-shadow">
            <span className="text-4xl">✨</span>
            <h3 className="font-serif font-bold mt-6 text-xl text-stone-800 tracking-wide uppercase">Premium Quality</h3>
            <p className="text-sm text-stone-500 mt-4 leading-relaxed italic">Hanya menggunakan kain pilihan dengan tekstur terbaik yang memberikan kesan mewah.</p>
          </div>
          
          <div className="p-10 bg-white border border-stone-100 rounded-3xl shadow-sm hover:shadow-md transition-shadow">
            <span className="text-4xl">🕌</span>
            <h3 className="font-serif font-bold mt-6 text-xl text-stone-800 tracking-wide uppercase">Arabian Style</h3>
            <p className="text-sm text-stone-500 mt-4 leading-relaxed italic">Sentuhan desain yang terinspirasi dari keanggunan gaya Timur Tengah yang abadi.</p>
          </div>
          
          <div className="p-10 bg-white border border-stone-100 rounded-3xl shadow-sm hover:shadow-md transition-shadow">
            <span className="text-4xl">🤍</span>
            <h3 className="font-serif font-bold mt-6 text-xl text-stone-800 tracking-wide uppercase">Crafted with Care</h3>
            <p className="text-sm text-stone-500 mt-4 leading-relaxed italic">Setiap jahitan dan lipatan dikerjakan dengan penuh ketelitian demi kepuasan pelanggan.</p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default AboutUs