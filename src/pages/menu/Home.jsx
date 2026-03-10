import { useState, useEffect } from "react";
import axios from "axios";
import Swal from "sweetalert2";
import MenuCard from "../../components/MenuCard";

function Home({ tambahKeKeranjang }) {
  // Menerima prop dari App.jsx
  const [menus, setMenus] = useState([]);
  const [cari, setCari] = useState("");

  const token = localStorage.getItem("token");
  let isAdmin = false;
  if (token) {
    try {
      const payload = JSON.parse(atob(token.split(".")[1]));
      isAdmin = payload.role === "admin";
    } catch (e) {
      console.error("Token bermasalah", e);
    }
  }

  useEffect(() => {
    ambilDataMenu();
  }, []);

  const ambilDataMenu = async () => {
    try {
      const res = await axios.get(
        "https://amdaay-backend.onrender.com/api/menu",
      );
      setMenus(res.data.data);
    } catch (e) {
      console.error("Gagal mengambil menu:", e);
    }
  };

  const toggleStok = async (id) => {
    try {
      await axios.put(
        `https://amdaay-backend.onrender.com/api/menu/${id}/toggle`,
        {},
        {
          headers: { Authorization: `Bearer ${token}` },
        },
      );
      ambilDataMenu();
    } catch (error) {
      Swal.fire("Gagal!", "Tidak dapat mengubah status stok.", "error");
    }
  };

  const hapusMenu = async (id, nama) => {
    Swal.fire({
      title: "Hapus Koleksi?",
      text: `Yakin ingin menghapus ${nama}?`,
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#44403c",
      cancelButtonColor: "#d33",
      confirmButtonText: "Ya, Hapus!",
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          await axios.delete(
            `https://amdaay-backend.onrender.com/api/menu/${id}`,
            {
              headers: { Authorization: `Bearer ${token}` },
            },
          );
          Swal.fire("Terhapus!", "Produk berhasil dihapus.", "success");
          ambilDataMenu();
        } catch (error) {
          Swal.fire("Gagal!", "Akses ditolak.", "error");
        }
      }
    });
  };

  const menuTersaring = menus.filter((m) =>
    (m.nama || m.Nama || "").toLowerCase().includes(cari.toLowerCase()),
  );

  return (
    <div className="min-h-screen bg-[#FDFBF7] p-4 md:p-8 pb-32 font-sans relative">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-16">
          <img
            src="/logoweb.jpg"
            alt="Logo"
            className="h-24 w-24 mx-auto mb-6 rounded-full object-cover border-4 border-white shadow-md"
          />
          <h1 className="text-5xl md:text-6xl font-serif font-bold text-stone-800 mb-3 tracking-[0.2em] uppercase">
            Amdaay.Scarf
          </h1>
          <p className="font-sans text-stone-400 italic tracking-[0.3em] uppercase text-xs">
            Elegance in Every Fold
          </p>

          <div className="max-w-md mx-auto relative mt-10">
            <input
              type="text"
              placeholder="Cari koleksi busana..."
              value={cari}
              onChange={(e) => setCari(e.target.value)}
              className="w-full px-6 py-4 rounded-2xl border border-stone-200 outline-none focus:ring-2 focus:ring-stone-800 pl-12 bg-white shadow-sm transition-all"
            />
            <span className="absolute left-5 top-4.5 opacity-30">🔍</span>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10">
          {menuTersaring.map((menu) => (
            <div key={menu.ID} className="group relative">
              <MenuCard
                menu={menu}
                isAdmin={isAdmin}
                tambahKeKeranjang={tambahKeKeranjang}
                toggleStok={toggleStok}
                hapusMenu={hapusMenu}
              />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default Home;
