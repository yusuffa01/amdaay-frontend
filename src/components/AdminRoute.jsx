import { Navigate } from 'react-router-dom'
import Swal from 'sweetalert2'

const AdminRoute = ({ children }) => {
  const token = localStorage.getItem('token')

  if (!token) {
    return <Navigate to="/login" replace />
  }

  try {
    const payload = JSON.parse(atob(token.split('.')[1]))

    if (payload.role !== 'admin') {
      Swal.fire({
        icon: 'error',
        title: 'Akses Terlarang 🛑',
        text: 'Maaf, halaman ini khusus untuk Admin amdaay.scarf!',
        timer: 2500,
        showConfirmButton: false
      })
      return <Navigate to="/" replace /> 
    }

    return children 
    
  } catch (error) {
    localStorage.removeItem('token')
    return <Navigate to="/login" replace />
  }
}

export default AdminRoute