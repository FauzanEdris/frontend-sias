export default function ({ store, redirect, alert }) {
  // If the user is not authenticated
  if (!store.state.pendaftaran.status || store.state.pendaftaran.status !== true) {
    redirect('/')
  }
}
