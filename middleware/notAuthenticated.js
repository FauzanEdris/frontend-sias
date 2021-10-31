export default function ({ store, redirect }) {
  // If the user is authenticated redirect to home page
  if (store.state.auth) {
    const role = store.state.auth.user.role
    switch (role) {
      case 'Admin':
        redirect('/admin')
        break
      case 'Operator':
        redirect('/operator')
        break
      case 'Dosen':
        redirect('/dosen')
        break
      case 'Akademik':
        redirect('/akademik')
        break
      case 'Keuangan':
        redirect('/keuangan')
        break
      case 'Asdos':
        redirect('/asdos')
        break
      default:
        redirect('/b')
        break
    }
  }
}
