import { Navigate } from 'react-router-dom'
import Swal from 'sweetalert2'

const ProtectedRoute = ({ children }) => {
  const token = localStorage.getItem('token')

  if (!token) {
    Swal.fire({
      icon: 'error',
      title: 'Akses Ditolak',
      text: 'Silakan login sebagai Admin terlebih dahulu!',
      timer: 2000,
      showConfirmButton: false
    })
    return <Navigate to="/login" replace />
  }

  return children
}

export default ProtectedRoute