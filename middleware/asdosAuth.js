export default function ({ store, redirect }) {
  // If the user is not authenticated
  if (!store.state.auth || store.state.auth.user.role !== 'Asdos') {
    redirect('/')
  }
}
