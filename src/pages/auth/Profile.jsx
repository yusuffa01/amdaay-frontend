import { useState, useEffect } from "react";
import axios from "axios";
import Swal from "sweetalert2";
import { Eye, EyeOff } from "lucide-react";

function Profile() {
  const [nama, setNama] = useState("");
  const [email, setEmail] = useState("");

  const [passwordLama, setPasswordLama] = useState("");
  const [passwordBaru, setPasswordBaru] = useState("");
  const [konfirmasiPassword, setKonfirmasiPassword] = useState("");

  const [lihatPasswordLama, setLihatPasswordLama] = useState(false);
  const [lihatPasswordBaru, setLihatPasswordBaru] = useState(false);
  const [lihatKonfirmasi, setLihatKonfirmasi] = useState(false);

  const token = localStorage.getItem("token");
  const config = {
    headers: { Authorization: `Bearer ${token}` },
  };

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const tokenUser = localStorage.getItem("token");
        if (!tokenUser) return;

        const res = await axios.get(
          "https://amdaay-backend.onrender.com/api/profile",
          { headers: { Authorization: `Bearer ${tokenUser}` } }
        );

        // 📸 KAMERA PENGINTAI KITA:
        console.log("🔍 ISI PAKET DARI RENDER:", res.data);

        // Radar Pintar: Menangkap data entah dibungkus 'user', 'data', atau langsung
        const userData = res.data?.user || res.data?.data || res.data;

        // Memasukkan ke dalam kolom (mendukung huruf besar/kecil)
        if (userData) {
          setNama(userData.nama || userData.Nama || userData.Name || "");
          setEmail(userData.email || userData.Email || "");
        }

      } catch (err) {
        console.error("❌ ERROR PROFIL:", err.response?.data || err.message);
      }
    };
    
    fetchProfile();
  }, []);

  const handleUpdateProfile = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.put(
        "https://amdaay-backend.onrender.com/api/profile",
        { nama, email },
        config,
      );
      Swal.fire({
        icon: "success",
        title: "Profil Diperbarui!",
        text: res.data.pesan,
        confirmButtonColor: "#44403c",
      });
    } catch (err) {
      Swal.fire(
        "Gagal!",
        err.response?.data?.error || "Terjadi kesalahan",
        "error",
      );
    }
  };

  const handleUbahPassword = async (e) => {
    e.preventDefault();

    if (passwordBaru !== konfirmasiPassword) {
      Swal.fire({
        icon: "warning",
        title: "Oops...",
        text: "Password baru dan konfirmasi tidak cocok!",
        confirmButtonColor: "#44403c",
      });
      return;
    }

    try {
      const res = await axios.put(
        "https://amdaay-backend.onrender.com/api/profile/password",
        {
          password_lama: passwordLama,
          password_baru: passwordBaru,
        },
        config,
      );

      Swal.fire({
        icon: "success",
        title: "Berhasil!",
        text: res.data.pesan,
        confirmButtonColor: "#44403c",
      });

      setPasswordLama("");
      setPasswordBaru("");
      setKonfirmasiPassword("");
      setLihatPasswordLama(false);
      setLihatPasswordBaru(false);
      setLihatKonfirmasi(false);
    } catch (err) {
      Swal.fire(
        "Gagal!",
        err.response?.data?.error || "Password lama salah",
        "error",
      );
    }
  };

  return (
    <div className="min-h-screen bg-[#FDFBF7] py-16 px-4 font-sans pb-32">
      <div className="max-w-5xl mx-auto space-y-12">
        <div className="text-center">
          <span className="text-stone-400 text-[10px] uppercase tracking-[0.4em] font-bold">
            Member Area
          </span>
          <h1 className="text-4xl font-serif font-bold text-stone-800 mt-2 uppercase tracking-widest">
            Pengaturan Akun
          </h1>
          <div className="h-1 w-12 bg-stone-300 mx-auto mt-4 rounded-full"></div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
          <div className="bg-white p-8 md:p-10 rounded-[2.5rem] shadow-xl border border-stone-100 h-fit">
            <h2 className="text-2xl font-serif font-bold text-stone-800 mb-8 border-b border-stone-100 pb-4">
              Informasi Pribadi
            </h2>
            <form onSubmit={handleUpdateProfile} className="space-y-6">
              <div className="space-y-2">
                <label className="block text-stone-600 text-[10px] font-bold uppercase tracking-[0.2em] ml-1">
                  Nama Lengkap
                </label>
                <input
                  type="text"
                  value={nama}
                  onChange={(e) => setNama(e.target.value)}
                  className="w-full px-5 py-4 rounded-2xl border border-stone-200 focus:outline-none focus:ring-2 focus:ring-stone-800 bg-stone-50/50 focus:bg-white transition-all"
                  required
                />
              </div>

              <div className="space-y-2">
                <label className="block text-stone-600 text-[10px] font-bold uppercase tracking-[0.2em] ml-1">
                  Alamat Email
                </label>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full px-5 py-4 rounded-2xl border border-stone-200 focus:outline-none focus:ring-2 focus:ring-stone-800 bg-stone-50/50 focus:bg-white transition-all text-stone-500"
                  required
                  readOnly
                />
              </div>

              <button
                type="submit"
                className="w-full bg-stone-800 text-white font-bold py-5 rounded-2xl hover:bg-stone-900 transition-all shadow-lg active:scale-95 uppercase tracking-[0.3em] text-xs mt-4"
              >
                Simpan Perubahan ✨
              </button>
            </form>
          </div>

          <div className="bg-white p-8 md:p-10 rounded-[2.5rem] shadow-xl border border-stone-100">
            <h2 className="text-2xl font-serif font-bold text-stone-800 mb-8 border-b border-stone-100 pb-4">
              Keamanan Akun
            </h2>
            <form onSubmit={handleUbahPassword} className="space-y-6">
              <div className="space-y-2">
                <label className="block text-stone-600 text-[10px] font-bold uppercase tracking-[0.2em] ml-1">
                  Password Saat Ini
                </label>
                <div className="relative">
                  <input
                    type={lihatPasswordLama ? "text" : "password"}
                    value={passwordLama}
                    onChange={(e) => setPasswordLama(e.target.value)}
                    placeholder="Masukkan password lama"
                    className="w-full pl-5 pr-12 py-4 rounded-2xl border border-stone-200 focus:outline-none focus:ring-2 focus:ring-stone-800 bg-stone-50/50 focus:bg-white transition-all placeholder:text-stone-300"
                    required
                  />
                  <button
                    type="button"
                    onClick={() => setLihatPasswordLama(!lihatPasswordLama)}
                    className="absolute right-4 top-1/2 -translate-y-1/2 text-stone-400 hover:text-stone-800 transition-colors"
                  >
                    {lihatPasswordLama ? (
                      <EyeOff size={20} />
                    ) : (
                      <Eye size={20} />
                    )}
                  </button>
                </div>
              </div>

              <div className="space-y-2">
                <label className="block text-stone-600 text-[10px] font-bold uppercase tracking-[0.2em] ml-1">
                  Password Baru
                </label>
                <div className="relative">
                  <input
                    type={lihatPasswordBaru ? "text" : "password"}
                    value={passwordBaru}
                    onChange={(e) => setPasswordBaru(e.target.value)}
                    placeholder="Minimal 8 karakter"
                    className="w-full pl-5 pr-12 py-4 rounded-2xl border border-stone-200 focus:outline-none focus:ring-2 focus:ring-stone-800 bg-stone-50/50 focus:bg-white transition-all placeholder:text-stone-300"
                    required
                  />
                  <button
                    type="button"
                    onClick={() => setLihatPasswordBaru(!lihatPasswordBaru)}
                    className="absolute right-4 top-1/2 -translate-y-1/2 text-stone-400 hover:text-stone-800 transition-colors"
                  >
                    {lihatPasswordBaru ? (
                      <EyeOff size={20} />
                    ) : (
                      <Eye size={20} />
                    )}
                  </button>
                </div>
              </div>

              <div className="space-y-2">
                <label className="block text-stone-600 text-[10px] font-bold uppercase tracking-[0.2em] ml-1">
                  Ulangi Password Baru
                </label>
                <div className="relative">
                  <input
                    type={lihatKonfirmasi ? "text" : "password"}
                    value={konfirmasiPassword}
                    onChange={(e) => setKonfirmasiPassword(e.target.value)}
                    placeholder="Ketik ulang password baru"
                    className="w-full pl-5 pr-12 py-4 rounded-2xl border border-stone-200 focus:outline-none focus:ring-2 focus:ring-stone-800 bg-stone-50/50 focus:bg-white transition-all placeholder:text-stone-300"
                    required
                  />
                  <button
                    type="button"
                    onClick={() => setLihatKonfirmasi(!lihatKonfirmasi)}
                    className="absolute right-4 top-1/2 -translate-y-1/2 text-stone-400 hover:text-stone-800 transition-colors"
                  >
                    {lihatKonfirmasi ? <EyeOff size={20} /> : <Eye size={20} />}
                  </button>
                </div>
              </div>

              <button
                type="submit"
                className="w-full bg-stone-100 text-stone-800 font-bold py-5 rounded-2xl hover:bg-stone-200 transition-all shadow-sm active:scale-95 uppercase tracking-[0.3em] text-xs border border-stone-200 mt-4"
              >
                Update Keamanan 🔐
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Profile;
