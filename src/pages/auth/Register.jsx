import { useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { Eye, EyeOff } from "lucide-react";

function Register() {
  const [nama, setNama] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [lihatPassword, setLihatPassword] = useState(false);
  const [pesan, setPesan] = useState("");
  const [status, setStatus] = useState("");

  const handleRegister = async (e) => {
    e.preventDefault();
    setStatus("loading");
    setPesan("Sedang memproses pendaftaran...");

    try {
      const response = await axios.post(
        "https://amdaay-backend.onrender.com/api/register",
        {
          nama: nama,
          email: email,
          password: password,
        },
      );
      setStatus("sukses");
      setPesan(response.data.pesan);

      setNama("");
      setEmail("");
      setPassword("");
    } catch (error) {
      setStatus("gagal");
      setPesan(error.response?.data?.error || "Gagal terhubung ke server.");
    }
  };

  return (
    <div className="min-h-screen bg-[#FDFBF7] flex items-center justify-center p-4 font-sans pb-20">
      <div className="bg-white p-8 md:p-10 rounded-[2.5rem] shadow-2xl w-full max-w-md border border-stone-100">
        <div className="text-center mb-8">
          <img
            src="/logoweb.jpg"
            alt="Amdaay Logo"
            className="h-16 w-16 mx-auto mb-4 rounded-full object-cover border-2 border-stone-100 shadow-sm"
          />
          <h2 className="text-3xl font-serif font-bold text-stone-800 tracking-tight">
            Daftar Akun
          </h2>
          <p className="text-stone-400 text-[10px] tracking-[0.3em] uppercase mt-2">
            Bergabung dengan Amdaay
          </p>
        </div>

        {pesan && (
          <div
            className={`p-4 mb-6 rounded-2xl text-xs text-center font-bold tracking-wide uppercase transition-all ${
              status === "sukses"
                ? "bg-stone-800 text-white shadow-lg"
                : status === "loading"
                  ? "bg-stone-100 text-stone-500"
                  : "bg-red-50 text-red-600 border border-red-100"
            }`}
          >
            {pesan}
          </div>
        )}

        <form onSubmit={handleRegister} className="space-y-5">
          <div className="space-y-2">
            <label className="block text-stone-600 text-[10px] font-bold uppercase tracking-[0.2em] ml-1">
              Nama Lengkap
            </label>
            <input
              type="text"
              value={nama}
              onChange={(e) => setNama(e.target.value)}
              className="w-full px-5 py-4 rounded-2xl border border-stone-200 focus:outline-none focus:ring-2 focus:ring-stone-800 bg-stone-50/50 focus:bg-white transition-all placeholder:text-stone-300"
              placeholder="Contoh: Lisda Amanda"
              required
            />
          </div>
          <div className="space-y-2">
            <label className="block text-stone-600 text-[10px] font-bold uppercase tracking-[0.2em] ml-1">
              Email
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

          <div className="space-y-2">
            <label className="block text-stone-600 text-[10px] font-bold uppercase tracking-[0.2em] ml-1">
              Password
            </label>
            <div className="relative">
              <input
                type={lihatPassword ? "text" : "password"}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full pl-5 pr-12 py-4 rounded-2xl border border-stone-200 focus:outline-none focus:ring-2 focus:ring-stone-800 bg-stone-50/50 focus:bg-white transition-all placeholder:text-stone-300"
                placeholder="Minimal 8 karakter"
                required
              />
              <button
                type="button"
                onClick={() => setLihatPassword(!lihatPassword)}
                className="absolute right-4 top-1/2 -translate-y-1/2 text-stone-400 hover:text-stone-800 transition-colors"
                title={
                  lihatPassword ? "Sembunyikan Password" : "Lihat Password"
                }
              >
                {lihatPassword ? <EyeOff size={20} /> : <Eye size={20} />}
              </button>
            </div>
          </div>

          <button
            type="submit"
            disabled={status === "loading"}
            className="w-full bg-stone-800 hover:bg-stone-900 text-white font-bold py-5 rounded-2xl transition-all shadow-xl active:scale-95 uppercase tracking-[0.3em] text-xs disabled:opacity-70 disabled:cursor-not-allowed mt-4"
          >
            {status === "loading" ? "Memproses..." : "Daftar Sekarang ✨"}
          </button>
        </form>

        <div className="mt-8 pt-6 border-t border-stone-100 text-center">
          <p className="text-stone-500 text-[11px]">
            Sudah punya akun?{" "}
            <Link
              to="/login"
              className="text-stone-800 font-bold uppercase tracking-widest hover:underline ml-1"
            >
              Masuk di sini
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}

export default Register;
