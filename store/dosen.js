// const   = new Date().getFullYear()

export const state = () => ({
  totalCalon: null,
  listCalon: {
    id: null,
    list: null
  },
  msg: {
    status: null,
    msg: null
  },
  // Booking Asdos
  listJadwal: {
    id: null,
    list: null
  },
  totalJadwal: null,
  // form Edit Jadwal
  editJadwal: null,
  preEditJadwal: null,
  asdos: {
    id: '',
    nama: ''
  }
})

export const getters = {
  listCalon: (state, rootState) => {
    const list = state.listSemester
    return list
  }
}

export const actions = {
  // Rekomendasi Dosen
  async GET_CALON ({ commit, dispatch, rootState }) {
    try {
      const { data } = await this.$axios.post('/api/dosen/calon', { id: rootState.auth.user._id })
      commit('SET_CALON', data)
    } catch (error) {
      dispatch('err', error, { root: true })
    }
  },
  async TERIMA_ASDOS ({ commit, dispatch }, req) {
    try {
      const { data } = await this.$axios.put('/api/dosen/calon', { id: req })
      commit('SET_MSG', data)
    } catch (error) {
      dispatch('err', error, { root: true })
    }
  },
  async TOLAK_ASDOS ({ commit, dispatch }, req) {
    try {
      const { data } = await this.$axios.delete('/api/dosen/calon/' + req)
      commit('SET_MSG', data)
    } catch (error) {
      dispatch('err', error, { root: true })
    }
  },
  // Booking Asdos
  async GET_JADWAL ({ commit, dispatch }, req) {
    try {
      const { data } = await this.$axios.get('/api/dosen/jadwal')
      commit('SET_JADWAL', data)
      commit('SET_MSG', data)
    } catch (error) {
      dispatch('err', error, { root: true })
    }
  },
  async GET_ASDOS ({ commit, dispatch }) {
    try {
      const { data } = await this.$axios.get('/api/dosen/asdos')
      commit('SET_ASDOS', data)
    } catch (error) {
      dispatch('err', error, { root: true })
    }
  },
  async ID_ASDOS ({ commit, dispatch }, req) {
    try {
      const { data } = await this.$axios.get('/api/dosen/asdos/id=' + req)
      commit('SET_FORM', data)
    } catch (error) {
      dispatch('err', error, { root: true })
    }
  },
  async NAMA_ASDOS ({ commit, dispatch }, req) {
    try {
      const { data } = await this.$axios.get('/api/dosen/asdos/nama=' + req)
      commit('SET_FORM', data)
    } catch (error) {
      dispatch('err', error, { root: true })
    }
  },
  async UPDATE_JADWAL ({ commit, dispatch }, req) {
    try {
      const { data } = await this.$axios.put('/api/dosen/jadwal/' + req.id, req.body)
      commit('SET_MSG', data)
    } catch (error) {
      dispatch('err', error, { root: true })
    }
  },
  async BATAL_BOOKING ({ commit, dispatch }, req) {
    try {
      const { data } = await this.$axios.put('/api/dosen/jadwal/batal/' + req.id, { id: req.id_semester })
      commit('SET_MSG', data)
    } catch (error) {
      dispatch('err', error, { root: true })
    }
  }
}

export const mutations = {
  SET_CALON (state, data) {
    if (data.data !== null) {
      state.listCalon.list = data.data.asdos
      state.totalCalon = data.data.asdos.length
    } else {
      state.listCalon.list = null
      state.totalCalon = null
    }
  },
  SET_MSG (state, data) {
    state.msg.status = data.status
    state.msg.msg = data.message
  },
  SET_JADWAL (state, data) {
    if (data.data === null) {
      state.listJadwal.id = null
      state.listJadwal.list = null
      state.totalJadwal = null
      state.msg.msg = data.message
    } else {
      state.listJadwal.id = data.data[0]._id
      state.listJadwal.list = data.data[0].jadwal
      state.totalJadwal = data.data[0].jadwal.length
    }
  },
  EDIT_JADWAL (state, data) {
    state.editJadwal = data
  },
  SET_ID (state, data) {
    state.id = data
  },
  SET_ASDOS (state, data) {
    state.asdos.id = data.users.id
    state.asdos.nama = data.users.nama
  },
  SET_FORM (state, data) {
    if (data.data !== null) {
      state.preEditJadwal = data.data
    } else {
      state.preEditJadwal = { id: '', nama: '' }
    }
  }
}
