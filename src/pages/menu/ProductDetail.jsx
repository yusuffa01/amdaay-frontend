import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import {
  ShoppingBag,
  ChevronLeft,
  ChevronRight,
  MessageCircle,
  ShoppingCart,
} from "lucide-react";

const IgIconAsli = ({ size = 20 }) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <rect
      x="2"
      y="2"
      width="20"
      height="20"
      rx="5"
      fill="url(#ig_grad_detail)"
    />
    <path
      d="M16.99 7.01C16.99 7.562 16.542 8.01 15.99 8.01C15.438 8.01 14.99 7.562 14.99 7.01C14.99 6.458 15.438 6.01 15.99 6.01C16.542 6.01 16.99 6.458 16.99 7.01Z"
      fill="white"
    />
    <path
      fillRule="evenodd"
      clipRule="evenodd"
      d="M12 16C14.209 16 16 14.209 16 12C16 9.791 14.209 8 12 8C9.791 8 8 9.791 8 12C8 14.209 9.791 16 12 16ZM12 14.5C13.381 14.5 14.5 13.381 14.5 12C14.5 10.619 13.381 9.5 12 9.5C10.619 9.5 9.5 10.619 9.5 12C9.5 13.381 10.619 14.5 12 14.5Z"
      fill="white"
    />
    <path
      fillRule="evenodd"
      clipRule="evenodd"
      d="M12 2C6.477 2 2 6.477 2 12C2 17.523 6.477 22 12 22C17.523 22 22 17.523 22 12C22 6.477 17.523 2 12 2ZM4 12C4 7.582 7.582 4 12 4C16.418 4 20 7.582 20 12C20 16.418 16.418 20 12 20C7.582 20 4 16.418 4 12Z"
      fill="white"
    />
    <defs>
      <linearGradient
        id="ig_grad_detail"
        x1="2"
        y1="22"
        x2="22"
        y2="2"
        gradientUnits="userSpaceOnUse"
      >
        <stop stopColor="#FEE411" />
        <stop offset="0.1" stopColor="#FEDB16" />
        <stop offset="0.25" stopColor="#FE983D" />
        <stop offset="0.5" stopColor="#E5376C" />
        <stop offset="0.75" stopColor="#C028B9" />
        <stop offset="1" stopColor="#8728BA" />
      </linearGradient>
    </defs>
  </svg>
);

function ProductDetail({ tambahKeKeranjang }) {
  const { id } = useParams();
  const navigate = useNavigate();
  const [produk, setProduk] = useState(null);
  const [fotoAktif, setFotoAktif] = useState(0);

  useEffect(() => {
    const fetchProduk = async () => {
      try {
        const res = await axios.get(
          `https://amdaay-backend.onrender.com/api/menu/${id}`,
        );
        setProduk(res.data.data);
      } catch (err) {
        console.error("Gagal mengambil detail produk");
      }
    };
    fetchProduk();
  }, [id]);

  if (!produk)
    return (
      <div className="min-h-screen bg-[#FDFBF7] flex items-center justify-center font-serif text-stone-500 italic">
        Membuka lemari koleksi...
      </div>
    );

  const handleOrderWA = () => {
    const pesan = `Halo Admin Amdaay, saya tertarik dengan produk ini:%0A%0A*${produk.nama || produk.Nama}*%0AHarga: Rp ${(produk.harga || produk.Harga).toLocaleString()}%0A%0AMohon info ketersediaan stoknya ya! ✨`;
    window.open(`https://wa.me/6289622000010?text=${pesan}`, "_blank");
  };

  const galeriFoto = produk.daftar_foto || [];
  const gambarTampil =
    galeriFoto.length > 0
      ? galeriFoto[fotoAktif]?.path
      : produk.gambar || produk.Gambar;

  const stokTersedia = produk.tersedia ?? produk.Tersedia ?? true;

  const igLink =
    produk.link_ig || produk.Link_ig || produk.LinkIG || produk.LinkIg;
  const shopeeLink =
    produk.link_shopee ||
    produk.Link_shopee ||
    produk.LinkShopee ||
    produk.LinkShopee;

  return (
    <div className="min-h-screen bg-[#FDFBF7] font-sans pb-32">
      <div className="p-4 flex items-center gap-4">
        <button
          onClick={() => navigate(-1)}
          className="p-2 bg-white rounded-full shadow-sm hover:bg-stone-100 transition-colors"
        >
          <ChevronLeft size={24} className="text-stone-800" />
        </button>
        <span className="font-serif font-bold text-stone-800 uppercase tracking-widest text-sm">
          Detail Koleksi
        </span>
      </div>

      <div className="max-w-6xl mx-auto px-4 grid grid-cols-1 md:grid-cols-2 gap-10 mt-4">
        <div className="space-y-4">
          <div className="relative aspect-[3/4] rounded-[2rem] overflow-hidden shadow-2xl bg-white border border-stone-100">
            <img
              src={
                gambarTampil?.startsWith("http")
                  ? gambarTampil
                  : `https://amdaay-backend.onrender.com/uploads/${gambarTampil}`
              }
              alt={produk.nama || produk.Nama}
              className="w-full h-full object-cover transition-all duration-700"
            />
            {galeriFoto.length > 1 && (
              <div className="absolute inset-0 flex items-center justify-between px-4">
                <button
                  onClick={() =>
                    setFotoAktif((prev) =>
                      prev === 0 ? galeriFoto.length - 1 : prev - 1,
                    )
                  }
                  className="p-2 bg-white/80 backdrop-blur-sm rounded-full text-stone-800 hover:scale-110 transition-transform"
                >
                  <ChevronLeft size={20} />
                </button>
                <button
                  onClick={() =>
                    setFotoAktif((prev) =>
                      prev === galeriFoto.length - 1 ? 0 : prev + 1,
                    )
                  }
                  className="p-2 bg-white/80 backdrop-blur-sm rounded-full text-stone-800 hover:scale-110 transition-transform"
                >
                  <ChevronRight size={20} />
                </button>
              </div>
            )}
          </div>
          {galeriFoto.length > 0 && (
            <div className="flex gap-3 overflow-x-auto py-2 no-scrollbar">
              {galeriFoto.map((foto, index) => (
                <button
                  key={index}
                  onClick={() => setFotoAktif(index)}
                  className={`min-w-[80px] h-20 rounded-xl overflow-hidden border-2 transition-all ${fotoAktif === index ? "border-stone-800 scale-105 shadow-md" : "border-transparent opacity-60 hover:opacity-100"}`}
                >
                  <img
                    src={
                      foto.path?.startsWith("http")
                        ? foto.path
                        : `https://amdaay-backend.onrender.com/uploads/${foto.path}`
                    }
                    className="w-full h-full object-cover"
                    alt="thumbnail"
                  />
                </button>
              ))}
            </div>
          )}
        </div>

        <div className="flex flex-col justify-center space-y-8">
          <div>
            <span className="text-stone-400 text-[10px] font-bold uppercase tracking-[0.4em]">
              Premium Modest Wear
            </span>
            <h1 className="text-4xl md:text-5xl font-serif font-bold text-stone-800 mt-2">
              {produk.nama || produk.Nama}
            </h1>
            <p className="text-2xl text-stone-600 mt-4 font-light">
              Rp {(produk.harga || produk.Harga).toLocaleString()}
            </p>
          </div>

          <div className="space-y-4">
            <h3 className="text-xs font-bold text-stone-400 uppercase tracking-[0.2em] border-b border-stone-200 pb-2">
              Deskripsi & Material
            </h3>
            <p className="text-stone-600 leading-relaxed whitespace-pre-line text-sm md:text-base">
              {produk.deskripsi ||
                produk.Deskripsi ||
                "Deskripsi belum tersedia."}
            </p>
          </div>

          <div className="flex flex-col gap-4 pt-6">
            <button
              onClick={() => tambahKeKeranjang(produk)}
              disabled={!stokTersedia}
              className={`w-full py-4 rounded-2xl font-bold uppercase tracking-widest text-sm flex items-center justify-center gap-3 transition-all shadow-xl active:scale-95 ${
                stokTersedia
                  ? "bg-stone-800 text-white hover:bg-stone-900"
                  : "bg-stone-200 text-stone-500 cursor-not-allowed"
              }`}
            >
              <ShoppingCart size={20} />
              {stokTersedia ? "Masukkan Keranjang" : "Stok Habis"}
            </button>

            <button
              onClick={handleOrderWA}
              className="w-full bg-stone-100 text-stone-800 border border-stone-200 py-4 rounded-2xl font-bold uppercase tracking-widest text-sm flex items-center justify-center gap-3 hover:bg-stone-200 transition-all shadow-sm active:scale-95"
            >
              <MessageCircle size={20} /> Tanya Admin via WA
            </button>

            {igLink && (
              <a
                href={igLink}
                target="_blank"
                rel="noreferrer"
                className="w-full bg-white border border-stone-200 text-stone-800 py-4 rounded-2xl font-bold uppercase tracking-widest text-sm flex items-center justify-center gap-3 hover:bg-stone-50 transition-all shadow-sm active:scale-95"
              >
                <IgIconAsli size={24} /> Lihat di Instagram
              </a>
            )}

            {shopeeLink && (
              <a
                href={shopeeLink}
                target="_blank"
                rel="noreferrer"
                className="w-full bg-orange-500 text-white py-4 rounded-2xl font-bold uppercase tracking-widest text-sm flex items-center justify-center gap-3 hover:bg-orange-600 transition-all shadow-lg active:scale-95"
              >
                <ShoppingBag size={20} /> Beli di Shopee
              </a>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default ProductDetail;
