import { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";

function TambahMenu() {
  const [nama, setNama] = useState("");
  const [deskripsi, setDeskripsi] = useState("");
  const [harga, setHarga] = useState("");
  const [linkIG, setLinkIG] = useState("");
  const [linkShopee, setLinkShopee] = useState("");
  const [gambarFiles, setGambarFiles] = useState([]);
  const [previews, setPreviews] = useState([]);
  const [indexSampul, setIndexSampul] = useState(0);
  const [isDirty, setIsDirty] = useState(false);

  const navigate = useNavigate();

  useEffect(() => {
    const handleBeforeUnload = (e) => {
      if (isDirty) {
        e.preventDefault();
        e.returnValue = "Data belum disimpan, yakin ingin keluar?";
      }
    };
    window.addEventListener("beforeunload", handleBeforeUnload);
    return () => window.removeEventListener("beforeunload", handleBeforeUnload);
  }, [isDirty]);

  const handleGambarChange = (e) => {
    const selectedFiles = Array.from(e.target.files);
    if (selectedFiles.length > 0) {
      setGambarFiles(selectedFiles);
      setIsDirty(true);
      const previewUrls = selectedFiles.map((file) =>
        URL.createObjectURL(file),
      );
      setPreviews(previewUrls);
      setIndexSampul(0);
    }
  };

  const handleTambahMenu = async (e) => {
    e.preventDefault();
    if (gambarFiles.length === 0) {
      Swal.fire(
        "Peringatan",
        "Mohon pilih setidaknya satu foto produk.",
        "warning",
      );
      return;
    }

    Swal.showLoading();
    const token = localStorage.getItem("token");
    const formData = new FormData();
    formData.append("nama", nama);
    formData.append("deskripsi", deskripsi);
    formData.append("harga", harga);
    formData.append("link_ig", linkIG);
    formData.append("link_shopee", linkShopee);

    const sortedFiles = [...gambarFiles];
    const fileSampul = sortedFiles.splice(indexSampul, 1)[0];
    sortedFiles.unshift(fileSampul);

    sortedFiles.forEach((file) => {
      formData.append("gambar", file);
    });

    try {
      await axios.post(
        "https://amdaay-backend.onrender.com/api/menu",
        formData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      );

      setIsDirty(false);
      Swal.fire({
        icon: "success",
        title: "Koleksi Disimpan!",
        text: "Produk berhasil masuk etalase Amdaay.",
        timer: 1500,
        showConfirmButton: false,
      });
      setTimeout(() => navigate("/"), 1500);
    } catch (error) {
      Swal.fire(
        "Gagal!",
        error.response?.data?.error || "Terjadi kesalahan.",
        "error",
      );
    }
  };

  return (
    <div className="min-h-screen bg-[#FDFBF7] p-4 md:p-10 font-sans">
      <div className="max-w-4xl mx-auto bg-white p-6 md:p-12 rounded-[2.5rem] shadow-2xl border border-stone-100">
        <header className="text-center mb-10">
          <span className="text-stone-400 text-[10px] uppercase tracking-[0.4em] font-bold">
            New Collection
          </span>
          <h2 className="text-3xl md:text-4xl font-serif font-bold text-stone-800 mt-2 uppercase tracking-tight">
            Tambah ke Etalase
          </h2>
          <div className="h-1 w-12 bg-stone-200 mx-auto mt-4 rounded-full"></div>
        </header>

        <form
          onSubmit={handleTambahMenu}
          className="space-y-10"
          onChange={() => setIsDirty(true)}
        >
          <section className="space-y-4">
            <div className="flex justify-between items-end px-1">
              <label className="text-stone-700 text-xs font-black uppercase tracking-widest">
                Galeri Foto Produk
              </label>
              <span className="text-stone-400 text-[10px] italic">
                * Klik gambar untuk atur Sampul Utama
              </span>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-4">
              <label className="aspect-square flex flex-col items-center justify-center border-2 border-dashed border-stone-200 rounded-3xl bg-stone-50 hover:bg-stone-100 hover:border-stone-400 cursor-pointer transition-all group">
                <span className="text-3xl group-hover:scale-110 transition-transform">
                  📸
                </span>
                <span className="text-[10px] text-stone-500 font-bold mt-2 uppercase tracking-tighter">
                  Pilih Foto
                </span>
                <input
                  type="file"
                  multiple
                  onChange={handleGambarChange}
                  accept="image/*"
                  className="hidden"
                />
              </label>

              {previews.map((url, index) => (
                <div
                  key={index}
                  onClick={() => setIndexSampul(index)}
                  className={`relative aspect-square rounded-3xl overflow-hidden cursor-pointer transition-all duration-300 ${
                    indexSampul === index
                      ? "ring-4 ring-stone-800 ring-offset-2 scale-95 shadow-xl"
                      : "opacity-50 hover:opacity-100 border border-stone-100"
                  }`}
                >
                  <img
                    src={url}
                    alt={`Preview ${index}`}
                    className="w-full h-full object-cover"
                  />
                  {indexSampul === index && (
                    <div className="absolute inset-0 bg-stone-900/10 flex items-center justify-center">
                      <div className="bg-stone-800 text-white text-[8px] px-2 py-1 rounded-full font-bold tracking-widest uppercase">
                        Sampul
                      </div>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </section>

          <hr className="border-stone-100" />

          <section className="grid grid-cols-1 md:grid-cols-2 gap-x-10 gap-y-8">
            <div className="space-y-2">
              <label className="block text-stone-600 text-[10px] font-bold uppercase tracking-[0.2em] ml-1">
                Nama Produk
              </label>
              <input
                type="text"
                value={nama}
                onChange={(e) => {
                  setNama(e.target.value);
                  setIsDirty(true);
                }}
                className="w-full bg-stone-50/50 p-4 rounded-2xl border border-stone-200 focus:bg-white focus:ring-2 focus:ring-stone-800 outline-none transition-all placeholder:text-stone-300"
                placeholder="Contoh: Abaya Noor Silk"
                required
              />
            </div>

            <div className="space-y-2">
              <label className="block text-stone-600 text-[10px] font-bold uppercase tracking-[0.2em] ml-1">
                Harga Retail (Rp)
              </label>
              <input
                type="number"
                value={harga}
                onChange={(e) => {
                  setHarga(e.target.value);
                  setIsDirty(true);
                }}
                className="w-full bg-stone-50/50 p-4 rounded-2xl border border-stone-200 focus:bg-white focus:ring-2 focus:ring-stone-800 outline-none transition-all placeholder:text-stone-300"
                placeholder="0"
                required
              />
            </div>

            <div className="md:col-span-2 space-y-2">
              <label className="block text-stone-600 text-[10px] font-bold uppercase tracking-[0.2em] ml-1">
                Deskripsi & Material
              </label>
              <textarea
                value={deskripsi}
                onChange={(e) => {
                  setDeskripsi(e.target.value);
                  setIsDirty(true);
                }}
                className="w-full bg-stone-50/50 p-4 rounded-2xl border border-stone-200 focus:bg-white focus:ring-2 focus:ring-stone-800 outline-none h-32 transition-all placeholder:text-stone-300"
                placeholder="Jelaskan detail jahitan, jenis kain, dan ukuran..."
                required
              />
            </div>

            <div className="space-y-2">
              <label className="block text-stone-600 text-[10px] font-bold uppercase tracking-[0.2em] ml-1">
                Link Instagram
              </label>
              <input
                type="text"
                value={linkIG}
                onChange={(e) => {
                  setLinkIG(e.target.value);
                  setIsDirty(true);
                }}
                className="w-full bg-stone-50/50 p-4 rounded-2xl border border-stone-200 focus:bg-white focus:ring-2 focus:ring-stone-800 outline-none transition-all placeholder:text-stone-300"
                placeholder="https://..."
              />
            </div>

            <div className="space-y-2">
              <label className="block text-stone-600 text-[10px] font-bold uppercase tracking-[0.2em] ml-1">
                Link Shopee
              </label>
              <input
                type="text"
                value={linkShopee}
                onChange={(e) => {
                  setLinkShopee(e.target.value);
                  setIsDirty(true);
                }}
                className="w-full bg-stone-50/50 p-4 rounded-2xl border border-stone-200 focus:bg-white focus:ring-2 focus:ring-stone-800 outline-none transition-all placeholder:text-stone-300"
                placeholder="https://..."
              />
            </div>
          </section>

          <footer className="pt-6">
            <button
              type="submit"
              className="w-full bg-stone-800 hover:bg-stone-900 text-white font-bold py-5 rounded-3xl shadow-2xl transition-all active:scale-95 uppercase tracking-[0.3em] text-xs"
            >
              Simpan Koleksi ✨
            </button>
            <button
              type="button"
              onClick={() => navigate("/")}
              className="w-full text-stone-400 font-bold py-4 hover:text-stone-800 transition-all text-[10px] uppercase tracking-widest mt-2"
            >
              Batal & Kembali
            </button>
          </footer>
        </form>
      </div>
    </div>
  );
}

export default TambahMenu;
