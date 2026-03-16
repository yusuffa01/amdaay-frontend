import { useState, useEffect } from "react";
import { BrowserRouter, Routes, Route, Link, useLocation } from "react-router-dom";
import Swal from "sweetalert2";
import { Menu, X } from "lucide-react";
import Home from "./pages/menu/Home";
import TambahMenu from "./pages/menu/TambahMenu";
import Register from "./pages/auth/Register";
import Login from "./pages/auth/Login";
import LupaPassword from "./pages/auth/LupaPassword";
import EditMenu from "./pages/menu/EditMenu";
import ProtectedRoute from "./components/ProtectedRoute";
import ResetPassword from "./pages/auth/ResetPassword";
import Profile from "./pages/auth/Profile";
import AdminRoute from "./components/AdminRoute";
import DashboardAdmin from "./pages/auth/DashboardAdmin";
import NotFound from "./pages/NotFound";
import AboutUs from "./pages/AboutUs";
import Footer from "./components/Footer";
import ProductDetail from "./pages/menu/ProductDetail";

import FloatingCart from "./components/FloatingCart";
import CartModal from "./components/CartModal";

function ScrollToTop() {
  const { pathname } = useLocation();
  useEffect(() => { window.scrollTo(0, 0); }, [pathname]);
  return null;
}

function App() {
  // ===== KUMPULAN STATE (MEMORI REACT) HARUS DI SINI =====
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isAdmin, setIsAdmin] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false); // ✅ SUDAH DIPINDAH KE SINI

  const [keranjang, setKeranjang] = useState(() => {
    const simpanan = localStorage.getItem('keranjangAmdaay');
    return simpanan ? JSON.parse(simpanan) : [];
  });
  const [isModalKeranjangOpen, setIsModalKeranjangOpen] = useState(false);

  useEffect(() => {
    localStorage.setItem('keranjangAmdaay', JSON.stringify(keranjang));
    if (keranjang.length === 0 && isModalKeranjangOpen) {
      setIsModalKeranjangOpen(false);
    }
  }, [keranjang, isModalKeranjangOpen]);

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      setIsLoggedIn(true);
      try {
        const payload = JSON.parse(atob(token.split(".")[1]));
        if (payload.role === "admin") setIsAdmin(true);
      } catch (e) {
        console.error("Token bermasalah", e);
      }
    }
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("token");
    setIsLoggedIn(false);
    setIsAdmin(false);
    window.location.href = "/";
  };

  const tambahKeKeranjang = (menu) => {
    const itemAda = keranjang.find((item) => item.ID === menu.ID)
    if (itemAda) {
      setKeranjang(keranjang.map((item) =>
        item.ID === menu.ID ? { ...item, qty: item.qty + 1 } : item
      ))
    } else {
      setKeranjang([...keranjang, { ...menu, qty: 1 }])
    }
    Swal.fire({
      toast: true, position: 'top-end', icon: 'success',
      title: `${menu.nama || menu.Nama} masuk keranjang!`,
      showConfirmButton: false, timer: 1000
    })
  };

  const kurangiDariKeranjang = (id) => {
    const itemAda = keranjang.find((item) => item.ID === id)
    if (itemAda.qty === 1) {
      setKeranjang(keranjang.filter((item) => item.ID !== id))
    } else {
      setKeranjang(keranjang.map((item) =>
        item.ID === id ? { ...item, qty: item.qty - 1 } : item
      ))
    }
  };

  const kosongkanKeranjang = () => {
    Swal.fire({
      title: 'Kosongkan Keranjang?',
      icon: 'question',
      showCancelButton: true,
      confirmButtonColor: '#44403c',
      confirmButtonText: 'Ya, Hapus Semua',
    }).then((result) => {
      if (result.isConfirmed) {
        setKeranjang([]);
        setIsModalKeranjangOpen(false);
      }
    })
  };

  const totalItemDiKeranjang = keranjang.reduce((total, item) => total + item.qty, 0);
  const totalHargaKeranjang = keranjang.reduce((total, item) => total + ((item.harga || item.Harga) * item.qty), 0);

  const kirimWhatsApp = () => {
    if (keranjang.length === 0) return;
    const nomorWA = "6289622000010"
    let teks = `Halo Admin Amdaay.scarf, saya ingin order koleksi ini:%0A%0A`
    keranjang.forEach((item, index) => {
      teks += `${index + 1}. *${item.nama || item.Nama}* (x${item.qty})%0A`
    })
    teks += `%0A*Total Bayar: Rp ${totalHargaKeranjang.toLocaleString('id-ID')}*%0A%0AMohon info ongkirnya ya Admin `
    window.open(`https://wa.me/${nomorWA}?text=${teks}`, '_blank')
    setIsModalKeranjangOpen(false);
    // ❌ Kode yang salah tempat sudah dihapus dari sini
  };

  return (
    <BrowserRouter>
      <ScrollToTop />
      
      {/* NAVBAR */}
      <nav className="bg-stone-800 p-4 shadow-lg sticky top-0 z-40">
        <div className="max-w-6xl mx-auto flex justify-between items-center text-white">
          {/* Logo & Judul */}
          <Link to="/" className="flex items-center gap-3 group">
            <img src="/logoweb.jpg" alt="Logo" className="h-12 w-12 object-cover rounded-full border-2 border-stone-600" />
            <span className="text-xl font-serif font-bold text-white tracking-widest uppercase group-hover:text-stone-300 transition-colors">
              Amdaay.Scarf
            </span>
          </Link>

          {/* ===== MENU VERSI LAPTOP ===== */}
          <div className="hidden md:flex items-center space-x-6">
            <Link to="/" className="text-sm font-bold uppercase tracking-widest hover:text-stone-400 transition-colors">Koleksi</Link>
            <Link to="/about" className="text-sm font-bold uppercase tracking-widest hover:text-stone-400 transition-colors">Tentang</Link>

            {isLoggedIn ? (
              <div className="flex items-center gap-4 border-l border-stone-600 pl-6">
                {isAdmin && (
                  <>
                    <Link to="/tambah-menu" className="text-[10px] font-bold bg-white text-stone-800 px-3 py-1.5 rounded-full hover:bg-stone-200 transition-all uppercase tracking-tighter">
                      + Tambah Produk
                    </Link>
                    <Link to="/admin/dashboard" className="text-[10px] font-bold border border-stone-500 text-white px-3 py-1.5 rounded-full hover:bg-stone-700 transition-all uppercase tracking-tighter">
                      👑 Dashboard
                    </Link>
                  </>
                )}
                <Link to="/profile" className="text-xs font-bold hover:text-stone-400 transition-colors uppercase">Profil</Link>
                <button onClick={handleLogout} className="bg-red-900/50 text-red-200 text-[10px] px-3 py-1.5 rounded-full font-bold hover:bg-red-800 transition-all uppercase">
                  Logout
                </button>
              </div>
            ) : (
              <div className="flex items-center gap-4 border-l border-stone-600 pl-6">
                <Link to="/login" className="text-xs font-bold hover:text-stone-400 transition-colors uppercase">Masuk</Link>
                <Link to="/register" className="bg-white text-stone-800 px-4 py-2 rounded-full text-xs font-bold hover:bg-stone-200 transition-all uppercase">Daftar</Link>
              </div>
            )}
          </div>

          {/* ===== TOMBOL HAMBURGER VERSI HP ===== */}
          <button 
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)} 
            className="md:hidden text-white hover:text-stone-300 transition-colors focus:outline-none"
          >
            {isMobileMenuOpen ? <X size={28} /> : <Menu size={28} />}
          </button>
        </div>

        {/* ===== MENU DROPDOWN VERSI HP ===== */}
        {isMobileMenuOpen && (
          <div className="md:hidden mt-4 bg-stone-700 rounded-2xl p-5 flex flex-col space-y-4 border border-stone-600 shadow-xl animate-in fade-in slide-in-from-top-4">
            <Link to="/" onClick={() => setIsMobileMenuOpen(false)} className="text-sm font-bold uppercase tracking-widest hover:text-stone-300 border-b border-stone-600 pb-3">Koleksi</Link>
            <Link to="/about" onClick={() => setIsMobileMenuOpen(false)} className="text-sm font-bold uppercase tracking-widest hover:text-stone-300 border-b border-stone-600 pb-3">Tentang</Link>

            {isLoggedIn ? (
              <div className="flex flex-col space-y-3 pt-2">
                {isAdmin && (
                  <div className="flex flex-col gap-2 mb-2">
                    <Link to="/tambah-menu" onClick={() => setIsMobileMenuOpen(false)} className="text-xs font-bold bg-white text-stone-800 px-4 py-2.5 rounded-full text-center hover:bg-stone-200 transition-all uppercase tracking-tighter">
                      + Tambah Produk
                    </Link>
                    <Link to="/admin/dashboard" onClick={() => setIsMobileMenuOpen(false)} className="text-xs font-bold border border-stone-400 text-white px-4 py-2.5 rounded-full text-center hover:bg-stone-600 transition-all uppercase tracking-tighter">
                      👑 Dashboard
                    </Link>
                  </div>
                )}
                <Link to="/profile" onClick={() => setIsMobileMenuOpen(false)} className="text-sm font-bold hover:text-stone-300 uppercase">Profil</Link>
                <button 
                  onClick={() => { handleLogout(); setIsMobileMenuOpen(false); }} 
                  className="bg-red-900/50 text-red-200 text-xs px-4 py-3 mt-2 rounded-full font-bold hover:bg-red-800 transition-all uppercase w-full"
                >
                  Logout
                </button>
              </div>
            ) : (
              <div className="flex flex-col space-y-3 pt-2">
                <Link to="/login" onClick={() => setIsMobileMenuOpen(false)} className="text-sm font-bold text-center border border-stone-500 py-2.5 rounded-full hover:bg-stone-600 transition-colors uppercase">Masuk</Link>
                <Link to="/register" onClick={() => setIsMobileMenuOpen(false)} className="bg-white text-center text-stone-800 px-4 py-2.5 rounded-full text-sm font-bold hover:bg-stone-200 transition-all uppercase">Daftar</Link>
              </div>
            )}
          </div>
        )}
      </nav>

      <Routes>
        <Route path="/" element={<Home tambahKeKeranjang={tambahKeKeranjang} />} />
        <Route path="/produk/:id" element={<ProductDetail tambahKeKeranjang={tambahKeKeranjang} />} />
        
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login setIsLoggedIn={setIsLoggedIn} />} />
        <Route path="/lupa-password" element={<LupaPassword />} />
        <Route path="/reset-password/:token" element={<ResetPassword />} />
        <Route path="/profile" element={<ProtectedRoute><Profile /></ProtectedRoute>} />
        <Route path="/tambah-menu" element={<AdminRoute><TambahMenu /></AdminRoute>} />
        <Route path="/edit-menu/:id" element={<AdminRoute><EditMenu /></AdminRoute>} />
        <Route path="/admin/dashboard" element={<AdminRoute><DashboardAdmin /></AdminRoute>} />
        <Route path="/about" element={<AboutUs />} />
        <Route path="*" element={<NotFound />} />
      </Routes>

      <FloatingCart isAdmin={isAdmin} totalItem={totalItemDiKeranjang} totalHarga={totalHargaKeranjang} bukaModal={() => setIsModalKeranjangOpen(true)} />
      <CartModal isOpen={isModalKeranjangOpen} setIsOpen={setIsModalKeranjangOpen} keranjang={keranjang} kurangiDariKeranjang={kurangiDariKeranjang} tambahKeKeranjang={tambahKeKeranjang} totalHargaKeranjang={totalHargaKeranjang} kirimWhatsApp={kirimWhatsApp} kosongkanKeranjang={kosongkanKeranjang} />
      
      <Footer />
    </BrowserRouter>
  );
}

export default App;