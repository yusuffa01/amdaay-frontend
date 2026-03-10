import { Link } from "react-router-dom";

const IgIconAsli = ({ size = 16 }) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <rect x="2" y="2" width="20" height="20" rx="5" fill="url(#ig_grad)" />
    <path
      d="M16.99 7.01C16.99 7.562 16.542 8.01 15.99 8.01C15.438 8.01 14.99 7.562 14.99 7.01C14.99 6.458 15.438 6.01 15.99 6.01C16.542 6.01 16.99 6.458 16.99 7.01Z"
      fill="white"
    />
    <path
      fillRule="evenodd"
      clipRule="evenodd"
      d="M12 16C14.209 16 16 14.209 16 12C16 9.791 14.209 8 12 8C9.791 8 8 9.791 8 12C8 14.209 9.791 16 12 16ZM12 14.5C13.381 14.5 14.5 12C14.5 10.619 13.381 9.5 12 9.5C10.619 9.5 9.5 10.619 9.5 12C9.5 13.381 10.619 14.5 12 14.5Z"
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
        id="ig_grad"
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

function MenuCard({ menu, isAdmin, tambahKeKeranjang, toggleStok, hapusMenu }) {
  const igLink = menu.link_ig || menu.Link_ig || menu.LinkIG || menu.LinkIg;

  return (
    <div className="bg-white rounded-[2rem] overflow-hidden shadow-sm border border-stone-100 hover:shadow-xl transition-all duration-500 group flex flex-col h-full">
      <div className="relative overflow-hidden">
        <Link to={`/produk/${menu.ID}`}>
          {/* Radar Pintar Gambar */}
          <img
            src={
              (menu.gambar || menu.Gambar)?.startsWith("http")
                ? menu.gambar || menu.Gambar
                : `https://amdaay-backend.onrender.com/uploads/${menu.gambar || menu.Gambar}`
            }
            alt={menu.nama || menu.Nama}
            className="w-full h-72 object-cover group-hover:scale-110 transition-transform duration-700 cursor-pointer"
          />
        </Link>

        {!(menu.tersedia || menu.Tersedia) && (
          <div className="absolute inset-0 bg-stone-900/40 backdrop-blur-[2px] flex items-center justify-center">
            <span className="bg-white text-stone-800 px-4 py-1 rounded-full text-xs font-bold tracking-widest uppercase">
              Habis Terjual
            </span>
          </div>
        )}
      </div>

      <div className="p-6 flex flex-col flex-grow">
        <div className="flex justify-between items-start mb-2">
          <div className="flex flex-col">
            <Link to={`/produk/${menu.ID}`}>
              <h3 className="text-xl font-serif font-bold text-stone-800 hover:text-stone-500 transition-colors cursor-pointer">
                {menu.nama || menu.Nama}
              </h3>
            </Link>

            {igLink && (
              <a
                href={igLink}
                target="_blank"
                rel="noreferrer"
                className="flex items-center gap-1.5 text-[10px] text-stone-500 hover:text-stone-800 transition-colors mt-2 font-bold uppercase tracking-widest"
              >
                <IgIconAsli size={14} /> Instagram
              </a>
            )}
          </div>

          <span className="text-stone-500 font-light">
            Rp {(menu.harga || menu.Harga).toLocaleString()}
          </span>
        </div>

        <div className="flex-grow"></div>

        <div className="mt-6 flex gap-2">
          <button
            onClick={() => tambahKeKeranjang(menu)}
            disabled={!(menu.tersedia || menu.Tersedia)}
            className={`flex-1 py-3 rounded-xl font-bold text-xs uppercase tracking-widest transition-all ${
              menu.tersedia || menu.Tersedia
                ? "bg-stone-800 text-white hover:bg-stone-700 active:scale-95"
                : "bg-stone-100 text-stone-300 cursor-not-allowed"
            }`}
          >
            {menu.tersedia || menu.Tersedia ? "Tambah ke Bag" : "Stok Kosong"}
          </button>

          {isAdmin && (
            <div className="flex gap-2">
              {/* TOMBOL TOGGLE (MATA) KEMBALI! */}
              <button
                onClick={() => toggleStok(menu.ID)}
                title={
                  menu.tersedia || menu.Tersedia
                    ? "Sembunyikan / Ubah ke Habis"
                    : "Tampilkan / Ubah ke Tersedia"
                }
                className={`p-3 rounded-xl transition-colors ${
                  menu.tersedia || menu.Tersedia
                    ? "bg-blue-50 hover:bg-blue-100 text-blue-600"
                    : "bg-stone-200 hover:bg-stone-300 text-stone-600"
                }`}
              >
                {menu.tersedia || menu.Tersedia ? "👁️" : "🙈"}
              </button>

              <Link
                to={`/edit-menu/${menu.ID}`}
                className="p-3 bg-stone-100 rounded-xl hover:bg-stone-200 transition-colors"
                title="Edit Produk"
              >
                ✏️
              </Link>
              <button
                onClick={() => hapusMenu(menu.ID, menu.nama)}
                className="p-3 bg-red-50 rounded-xl hover:bg-red-100 transition-colors"
                title="Hapus Produk"
              >
                🗑️
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default MenuCard;
