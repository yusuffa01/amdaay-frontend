import { useState, useEffect } from "react";
import axios from "axios";
import Swal from "sweetalert2";

function DashboardAdmin() {
  const [users, setUsers] = useState([]);
  const token = localStorage.getItem("token");

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editData, setEditData] = useState({
    id: "",
    nama: "",
    role: "",
    password: "",
  });

  const fetchUsers = async () => {
    try {
      const res = await axios.get(
        "https://amdaay-backend.onrender.com/api/users",
        {
          headers: { Authorization: `Bearer ${token}` },
        },
      );
      setUsers(res.data.data);
    } catch (err) {
      console.error("Gagal mengambil data pengguna", err);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  const handleHapusUser = (id, nama) => {
    Swal.fire({
      title: "Hapus Pengguna?",
      text: `Yakin ingin menendang ${nama} dari aplikasi?`,
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#d33",
      cancelButtonColor: "#3085d6",
      confirmButtonText: "Ya, Hapus!",
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          const res = await axios.delete(
            `https://amdaay-backend.onrender.com/api/users/${id}`,
            {
              headers: { Authorization: `Bearer ${token}` },
            },
          );
          Swal.fire("Terhapus!", res.data.pesan, "success");
          fetchUsers();
        } catch (error) {
          Swal.fire(
            "Gagal!",
            error.response?.data?.error || "Terjadi kesalahan.",
            "error",
          );
        }
      }
    });
  };

  const bukaModalEdit = (user) => {
    setEditData({
      id: user.ID,
      nama: user.Nama || "",
      role: user.Role || "user",
      password: "",
    });
    setIsModalOpen(true);
  };

  const handleSimpanEdit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.put(
        `https://amdaay-backend.onrender.com/api/users/${editData.id}`,
        {
          nama: editData.nama,
          role: editData.role,
          password: editData.password,
        },
        {
          headers: { Authorization: `Bearer ${token}` },
        },
      );

      Swal.fire("Berhasil!", res.data.pesan, "success");
      setIsModalOpen(false);
      fetchUsers();
    } catch (err) {
      Swal.fire(
        "Gagal!",
        err.response?.data?.error || "Gagal menyimpan perubahan",
        "error",
      );
    }
  };

  return (
    <div className="min-h-screen bg-orange-50 p-8 font-sans relative">
      <div className="max-w-5xl mx-auto">
        <h1 className="text-4xl font-black text-orange-600 mb-2">
          👑 Dashboard Admin
        </h1>
        <p className="text-gray-500 mb-8">
          Pusat kendali pelanggan amdaay.scarf.
        </p>

        <div className="bg-white p-6 rounded-2xl shadow-xl border border-orange-100">
          <h2 className="text-2xl font-bold text-gray-800 mb-6 flex items-center gap-2">
            👥 Daftar Pelanggan
            <span className="bg-orange-100 text-orange-600 text-sm py-1 px-3 rounded-full">
              {users.length} Total
            </span>
          </h2>

          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-orange-50 text-orange-800 border-b-2 border-orange-200">
                  <th className="p-4 font-bold rounded-tl-xl">ID</th>
                  <th className="p-4 font-bold">Nama</th>
                  <th className="p-4 font-bold">Email</th>
                  <th className="p-4 font-bold">Role</th>
                  <th className="p-4 font-bold rounded-tr-xl text-center">
                    Aksi
                  </th>
                </tr>
              </thead>
              <tbody>
                {users.map((u, index) => (
                  <tr
                    key={u.ID}
                    className={`border-b border-gray-100 hover:bg-orange-50/50 transition-colors ${index % 2 === 0 ? "bg-white" : "bg-gray-50"}`}
                  >
                    <td className="p-4 font-mono text-gray-500">{u.ID}</td>
                    <td className="p-4 font-semibold text-gray-800">
                      {u.Nama}
                    </td>
                    <td className="p-4 text-gray-600">{u.Email}</td>
                    <td className="p-4">
                      <span
                        className={`px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider ${u.Role === "admin" ? "bg-purple-100 text-purple-700" : "bg-blue-100 text-blue-700"}`}
                      >
                        {u.Role}
                      </span>
                    </td>
                    <td className="p-4 text-center flex justify-center gap-2">
                      <button
                        onClick={() => bukaModalEdit(u)}
                        className="bg-yellow-100 text-yellow-700 px-4 py-2 rounded-lg font-bold hover:bg-yellow-500 hover:text-white transition-all"
                      >
                        ✏️ Edit
                      </button>
                      <button
                        onClick={() => handleHapusUser(u.ID, u.Nama)}
                        className="bg-red-100 text-red-600 px-4 py-2 rounded-lg font-bold hover:bg-red-500 hover:text-white transition-all"
                      >
                        🗑️ Hapus
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {isModalOpen && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-2xl shadow-2xl w-full max-w-md p-6 transform transition-all animate-fade-in">
            <h2 className="text-2xl font-bold text-gray-800 mb-4">
              Edit Pengguna
            </h2>

            <form onSubmit={handleSimpanEdit} className="space-y-4">
              <div>
                <label className="block text-sm font-bold text-gray-600 mb-1">
                  Nama Lengkap
                </label>
                <input
                  type="text"
                  value={editData.nama}
                  onChange={(e) =>
                    setEditData({ ...editData, nama: e.target.value })
                  }
                  className="w-full p-3 rounded-xl border-2 border-gray-200 outline-none focus:border-orange-500"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-bold text-gray-600 mb-1">
                  Role (Jabatan)
                </label>
                <select
                  value={editData.role}
                  onChange={(e) =>
                    setEditData({ ...editData, role: e.target.value })
                  }
                  className="w-full p-3 rounded-xl border-2 border-gray-200 outline-none focus:border-orange-500 bg-white"
                >
                  <option value="user">User (Pelanggan)</option>
                  <option value="admin">Admin (Pengelola)</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-bold text-gray-600 mb-1">
                  Password Baru{" "}
                  <span className="text-xs font-normal text-red-400">
                    (Kosongkan jika tidak diganti)
                  </span>
                </label>
                <input
                  type="text"
                  placeholder="Ketik sandi baru..."
                  value={editData.password}
                  onChange={(e) =>
                    setEditData({ ...editData, password: e.target.value })
                  }
                  className="w-full p-3 rounded-xl border-2 border-gray-200 outline-none focus:border-orange-500"
                />
              </div>

              <div className="flex gap-3 mt-6">
                <button
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  className="w-1/2 bg-gray-100 text-gray-600 font-bold py-3 rounded-xl hover:bg-gray-200 transition-all"
                >
                  Batal
                </button>
                <button
                  type="submit"
                  className="w-1/2 bg-orange-500 text-white font-bold py-3 rounded-xl hover:bg-orange-600 transition-all shadow-md"
                >
                  Simpan 💾
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}

export default DashboardAdmin;
