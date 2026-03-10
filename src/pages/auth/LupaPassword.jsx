import { useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

function LupaPassword() {
  const [email, setEmail] = useState("");
  const [pesan, setPesan] = useState("");
  const [status, setStatus] = useState("");

  const handleReset = async (e) => {
    e.preventDefault();
    setStatus("loading");
    setPesan("Memproses permintaan pemulihan...");

    try {
      const response = await axios.post(
        "https://amdaay-backend.onrender.com/api/lupa-password",
        {
          email: email,
        },
      );

      setStatus("sukses");
      setPesan(
        response.data.pesan || "Link pemulihan telah dikirim ke email Anda.",
      );
      setEmail("");
    } catch (error) {
      setStatus("gagal");
      setPesan(error.response?.data?.error || "Gagal terhubung ke server.");
    }
  };

  return (
    <div className="min-h-screen bg-[#FDFBF7] flex items-center justify-center p-4 font-sans pb-20">
      <div className="bg-white p-8 md:p-10 rounded-[2.5rem] shadow-2xl w-full max-w-md border border-stone-100">
        {/* Header Logo & Judul */}
        <div className="text-center mb-8">
          <img
            src="/logoweb.jpg"
            alt="Amdaay Logo"
            className="h-16 w-16 mx-auto mb-4 rounded-full object-cover border-2 border-stone-100 shadow-sm"
          />
          <h2 className="text-3xl font-serif font-bold text-stone-800 tracking-tight">
            Lupa Password?
          </h2>
          <p className="text-stone-400 text-[10px] tracking-[0.2em] uppercase mt-3 leading-relaxed">
            Masukkan email Anda dan kami akan mengirimkan instruksi pemulihan
            sandi.
          </p>
        </div>

        {/* Kotak Notifikasi */}
        {pesan && (
          <div
            className={`p-4 mb-6 rounded-2xl text-xs text-center font-bold tracking-wide uppercase transition-all ${
              status === "sukses"
                ? "bg-green-600 text-white shadow-lg"
                : status === "loading"
                  ? "bg-stone-100 text-stone-500"
                  : "bg-red-50 text-red-600 border border-red-100"
            }`}
          >
            {pesan}
          </div>
        )}

        <form onSubmit={handleReset} className="space-y-6">
          <div className="space-y-2">
            <label className="block text-stone-600 text-[10px] font-bold uppercase tracking-[0.2em] ml-1">
              Email Terdaftar
            </label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-5 py-4 rounded-2xl border border-stone-200 focus:outline-none focus:ring-2 focus:ring-stone-800 bg-stone-50/50 focus:bg-white transition-all placeholder:text-stone-300"
              placeholder="nama@email.com"
              required
            />
          </div>

          <button
            type="submit"
            disabled={status === "loading"}
            className="w-full bg-stone-800 hover:bg-stone-900 text-white font-bold py-5 rounded-2xl transition-all shadow-xl active:scale-95 uppercase tracking-[0.3em] text-xs disabled:opacity-70 disabled:cursor-not-allowed mt-2"
          >
            {status === "loading" ? "Memproses..." : "Kirim Link Reset ✨"}
          </button>
        </form>

        <div className="mt-8 pt-6 border-t border-stone-100 text-center">
          <p className="text-stone-500 text-[11px]">
            Ingat password Anda?{" "}
            <Link
              to="/login"
              className="text-stone-800 font-bold uppercase tracking-widest hover:underline ml-1"
            >
              Kembali ke Login
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}

export default LupaPassword;
