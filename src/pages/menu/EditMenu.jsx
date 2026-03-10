import { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";
import Swal from "sweetalert2";

function EditMenu() {
  const [nama, setNama] = useState("");
  const [deskripsi, setDeskripsi] = useState("");
  const [harga, setHarga] = useState("");
  const [gambar, setGambar] = useState(null);
  const [preview, setPreview] = useState(null);
  const [gambarLama, setGambarLama] = useState("");
  const [linkIG, setLinkIG] = useState("");
  const [linkShopee, setLinkShopee] = useState("");

  const navigate = useNavigate();
  const { id } = useParams();
  const token = localStorage.getItem("token");

  useEffect(() => {
    axios
      .get(`https://amdaay-backend.onrender.com/api/menu/${id}`)
      .then((res) => {
        const d = res.data.data;
        setNama(d.nama || d.Nama);
        setDeskripsi(d.deskripsi || d.Deskripsi);
        setHarga(d.harga || d.Harga);
        setGambarLama(d.gambar || d.Gambar);
        setLinkIG(d.LinkIG || d.link_ig || "");
        setLinkShopee(d.LinkShopee || d.link_shopee || "");
      });
  }, [id]);

  const handleGambarChange = (e) => {
    const file = e.target.files[0];
    setGambar(file);
    setPreview(URL.createObjectURL(file));
  };

  const handleUpdate = async (e) => {
    e.preventDefault();
    Swal.showLoading();

    const formData = new FormData();
    formData.append("nama", nama);
    formData.append("deskripsi", deskripsi);
    formData.append("harga", harga);
    formData.append("link_ig", linkIG);
    formData.append("link_shopee", linkShopee);

    if (gambar) {
      formData.append("gambar", gambar);
    }

    try {
      await axios.post(
        `https://amdaay-backend.onrender.com/api/menu/${id}`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
            Authorization: `Bearer ${token}`,
          },
        },
      );

      Swal.fire({
        icon: "success",
        title: "Berhasil Update!",
        timer: 1000,
        showConfirmButton: false,
      });
      setTimeout(() => navigate("/"), 1000);
    } catch (err) {
      console.error(err.response?.data);
      Swal.fire(
        "Gagal!",
        err.response?.data?.error || "Terjadi kesalahan",
        "error",
      );
    }
  };

  return (
    <div className="min-h-screen bg-orange-50 p-8 font-sans">
      <div className="max-w-2xl mx-auto bg-white p-8 rounded-2xl shadow-xl border border-orange-100">
        <h2 className="text-3xl font-extrabold text-blue-600 mb-6">
          ✏️ Edit Menu
        </h2>

        <form onSubmit={handleUpdate} className="space-y-5">
          {/* Tampilan Gambar */}
          <div className="flex flex-col items-center p-4 bg-gray-50 rounded-xl border-2 border-dashed border-gray-200">
            {preview ? (
              <img
                src={preview}
                className="h-40 w-64 object-cover rounded-lg mb-3"
                alt="Baru"
              />
            ) : gambarLama ? (
              <img
                src={`https://amdaay-backend.onrender.com/uploads/${gambarLama}`}
                className="h-40 w-64 object-cover rounded-lg mb-3"
                alt="Lama"
              />
            ) : (
              <div className="text-4xl mb-2">📸</div>
            )}
            <label className="cursor-pointer bg-blue-600 text-white px-4 py-2 rounded-full text-xs font-bold hover:bg-blue-700 transition-all">
              Ganti Foto
              <input
                type="file"
                className="hidden"
                onChange={handleGambarChange}
              />
            </label>
          </div>

          <div>
            <label className="block text-gray-700 font-bold mb-2">Nama</label>
            <input
              type="text"
              value={nama}
              onChange={(e) => setNama(e.target.value)}
              className="w-full p-3 rounded-lg border outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>

          <div>
            <label className="block text-gray-700 font-bold mb-2">
              Deskripsi
            </label>
            <textarea
              value={deskripsi}
              onChange={(e) => setDeskripsi(e.target.value)}
              className="w-full p-3 rounded-lg border outline-none focus:ring-2 focus:ring-blue-500 h-24"
              required
            />
          </div>

          <div>
            <label className="block text-gray-700 font-bold mb-2">
              Harga (Rp)
            </label>
            <input
              type="number"
              value={harga}
              onChange={(e) => setHarga(e.target.value)}
              className="w-full p-3 rounded-lg border outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>

          <div>
            <label className="block text-gray-700 font-bold mb-2">
              Link Instagram (Opsional)
            </label>
            <input
              type="text"
              value={linkIG}
              onChange={(e) => setLinkIG(e.target.value)}
              placeholder="Contoh: https://instagram.com/..."
              className="w-full px-4 py-2 border rounded-lg"
            />
          </div>
          <div>
            <label className="block text-gray-700 font-bold mb-2">
              Link ShopeeFood (Opsional)
            </label>
            <input
              type="text"
              value={linkShopee}
              onChange={(e) => setLinkShopee(e.target.value)}
              placeholder="Contoh: https://shopee.co.id/..."
              className="w-full px-4 py-2 border rounded-lg"
            />
          </div>

          <div className="flex flex-col gap-2">
            <button
              type="submit"
              className="w-full bg-blue-600 text-white font-bold py-3 rounded-xl shadow-md hover:bg-blue-700 transition-all"
            >
              Simpan Perubahan
            </button>
            <button
              type="button"
              onClick={() => navigate("/")}
              className="w-full bg-gray-100 text-gray-600 font-bold py-3 rounded-xl hover:bg-gray-200 transition-all"
            >
              Batal
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default EditMenu;
