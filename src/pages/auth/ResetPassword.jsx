import { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";
import Swal from "sweetalert2";

function ResetPassword() {
  const { token } = useParams();
  const [passwordBaru, setPasswordBaru] = useState("");
  const [detik, setDetik] = useState(null);
  const navigate = useNavigate();

  const handleReset = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post(
        "https://amdaay-backend.onrender.com/api/reset-password",
        {
          token: token,
          password_baru: passwordBaru,
        },
      );
      Swal.fire("Berhasil!", res.data.message, "success");
      localStorage.removeItem(`batasWaktu_${token}`);
      navigate("/login");
    } catch (err) {
      Swal.fire(
        "Gagal!",
        err.response?.data?.error || "Terjadi kesalahan jaringan",
        "error",
      );
    }
  };

  useEffect(() => {
    const kunciStorage = `batasWaktu_${token}`;
    let batasWaktuSimpanan = localStorage.getItem(kunciStorage);
    let targetWaktu;

    if (!batasWaktuSimpanan) {
      targetWaktu = Date.now() + 300 * 1000;
      localStorage.setItem(kunciStorage, targetWaktu.toString());
    } else {
      targetWaktu = Number(batasWaktuSimpanan);
    }

    const updateTimer = () => {
      const sekarang = Date.now();
      const sisa = Math.floor((targetWaktu - sekarang) / 1000);

      if (sisa <= 0) {
        setDetik(0);
        return false;
      } else {
        setDetik(sisa);
        return true;
      }
    };

    updateTimer();

    const intervalId = setInterval(() => {
      const masihBerlanjut = updateTimer();
      if (!masihBerlanjut) clearInterval(intervalId);
    }, 1000);

    return () => clearInterval(intervalId);
  }, [token]);

  const formatWaktu = (s) => {
    if (s === null) return "Loading...";
    const m = Math.floor(s / 60);
    const det = s % 60;
    return `${m}:${det < 10 ? "0" : ""}${det}`;
  };

  return (
    <div className="min-h-screen bg-[#FDFBF7] flex items-center justify-center p-4 font-sans">
      <div className="max-w-md w-full bg-white p-8 rounded-2xl shadow-xl border border-stone-100 text-center">
        <img
          src="/logoweb.jpg"
          alt="Logo"
          className="h-16 w-16 mx-auto mb-4 rounded-full object-cover border border-stone-200"
        />

        <h2 className="text-2xl font-serif font-bold text-stone-800 mb-2 uppercase tracking-tight">
          Atur Ulang Password
        </h2>
        <p className="text-stone-500 mb-6 text-sm">
          Demi keamanan akun Amdaay Anda, silakan masukkan password baru.
        </p>
        <div
          className={`mb-6 p-4 rounded-xl font-mono font-bold text-lg tracking-widest transition-all duration-500 border-2 ${
            detik > 0
              ? "bg-stone-50 text-stone-700 border-stone-200"
              : "bg-red-50 text-red-600 border-red-100"
          }`}
        >
          {detik === null
            ? "..."
            : detik > 0
              ? `⏳ ${formatWaktu(detik)}`
              : "❌ LINK KADALUWARSA"}
        </div>

        <form onSubmit={handleReset} className="space-y-4 text-left">
          <label className="text-xs font-bold text-stone-400 uppercase tracking-widest ml-1">
            Password Baru
          </label>
          <input
            type="password"
            placeholder="Min. 8 Karakter..."
            value={passwordBaru}
            onChange={(e) => setPasswordBaru(e.target.value)}
            className="w-full p-4 rounded-xl border-2 border-stone-100 outline-none focus:border-stone-800 transition-colors disabled:bg-stone-50 disabled:cursor-not-allowed"
            required
            disabled={detik === 0}
          />

          <button
            type="submit"
            disabled={detik === 0 || detik === null}
            className={`w-full font-bold py-4 rounded-xl transition-all shadow-lg uppercase tracking-widest text-sm ${
              detik > 0
                ? "bg-stone-800 text-white hover:bg-stone-700 active:scale-95"
                : "bg-stone-300 text-stone-500 cursor-not-allowed"
            }`}
          >
            {detik > 0 ? "Perbarui Password ✨" : "Link Sudah Tidak Berlaku"}
          </button>
        </form>

        <button
          onClick={() => navigate("/login")}
          className="mt-6 text-stone-400 text-xs hover:text-stone-800 transition-colors underline"
        >
          Kembali ke Halaman Login
        </button>
      </div>
    </div>
  );
}

export default ResetPassword;
