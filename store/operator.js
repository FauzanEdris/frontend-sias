const tahun = new Date().getFullYear()

export const state = () => ({
  listSemester: null,
  totalSemester: null,
  listJadwal: {
    id: null,
    list: null
  },
  totalJadwal: null,
  // form
  semester: [{ value: null, text: 'Pilih Semester ' }, 'Ganjil', 'Genap'],
  tahun: [{ value: null, text: 'Pilih Tahun' }, tahun + 1, tahun, tahun - 1, tahun - 2, tahun - 3],
  status: [{ value: null, text: 'Pilih Status' }, { value: true, text: 'Active' }, { value: false, text: 'Inactive' }],
  msg: {
    status: null,
    msg: null
  },
  // form Edit Jadwal
  editJadwal: null,
  preEditJadwal: null,
  asdos: {
    id: '',
    nama: ''
  }
})

export const getters = {
  listSemester: (state) => {
    const list = state.listSemester
    return list
  }
}

export const actions = {
  // Semester
  async GET_SEMESTER ({ commit, dispatch }) {
    try {
      const { data } = await this.$axios.get('/api/operator/semester')
      commit('SET_SEMESTER', data)
    } catch (error) {
      dispatch('err', error, { root: true })
    }
  },
  async TAMBAH_SEMESTER ({ commit, dispatch }, req) {
    try {
      const { data } = await this.$axios.post('/api/operator/semester', req)
      commit('SET_MSG', data)
    } catch (error) {
      dispatch('err', error, { root: true })
    }
  },
  async DELETE_SEMESTER ({ commit, dispatch }, req) {
    try {
      const { data } = await this.$axios.delete('/api/operator/semester/' + req)
      commit('SET_MSG', data)
    } catch (error) {
      dispatch('err', error, { root: true })
    }
  },
  async STATUS_SEMESTER ({ commit, dispatch }, req) {
    try {
      await this.$axios.post('/api/operator/semester/status', req)
      // const { data } = await this.$axios.get('/api/operator/semester')
      // commit('SET_SEMESTER', data)
    } catch (error) {
      dispatch('err', error, { root: true })
    }
  },
  async STATUS_JADWAL_ASDOS ({ commit, dispatch }, req) {
    try {
      await this.$axios.post('/api/operator/semester/statusjadwalasdos', req)
      // const { data } = await this.$axios.get('/api/operator/semester')
      // commit('SET_SEMESTER', data)
    } catch (error) {
      dispatch('err', error, { root: true })
    }
  },
  async STATUS_JADWAL_DOSEN ({ commit, dispatch }, req) {
    try {
      await this.$axios.post('/api/operator/semester/statusjadwaldosen', req)
      // const { data } = await this.$axios.get('/api/operator/semester')
      // commit('SET_SEMESTER', data)
    } catch (error) {
      dispatch('err', error, { root: true })
    }
  },
  async STATUS_PENDAFTARAN ({ commit, dispatch }, req) {
    try {
      await this.$axios.post('/api/operator/semester/statuspendaftaran', req)
      // const { data } = await this.$axios.get('/api/operator/semester')
      // commit('SET_SEMESTER', data)
    } catch (error) {
      dispatch('err', error, { root: true })
    }
  },

  // Jadwal
  async UPLOAD_JADWAL ({ commit, dispatch }, req) {
    try {
      const { data } = await this.$axios.post('/api/operator/jadwal', req)
      commit('SET_MSG', data)
    } catch (error) {
      dispatch('err', error, { root: true })
    }
  },
  async GET_JADWAL ({ commit, dispatch }, req) {
    try {
      const { data } = await this.$axios.get('/api/operator/jadwal')
      commit('SET_JADWAL', data)
      commit('SET_MSG', data)
    } catch (error) {
      dispatch('err', error, { root: true })
    }
  },
  async DOWNLOAD_EXCEL () {
    await location.replace('/api/operator/jadwal/export')
  },
  async HAPUS_JADWAL ({ commit, dispatch }, req) {
    try {
      const { data } = await this.$axios.delete('/api/operator/jadwal/' + req)
      commit('SET_MSG', data)
    } catch (error) {
      dispatch('err', error, { root: true })
    }
  },
  async GET_ASDOS ({ commit, dispatch }) {
    try {
      const { data } = await this.$axios.get('/api/operator/asdos')
      commit('SET_ASDOS', data)
    } catch (error) {
      dispatch('err', error, { root: true })
    }
  },
  async ID_ASDOS ({ commit, dispatch }, req) {
    try {
      const { data } = await this.$axios.get('/api/operator/asdos/id=' + req)
      commit('SET_FORM', data)
    } catch (error) {
      dispatch('err', error, { root: true })
    }
  },
  async NAMA_ASDOS ({ commit, dispatch }, req) {
    try {
      const { data } = await this.$axios.get('/api/operator/asdos/nama=' + req)
      commit('SET_FORM', data)
    } catch (error) {
      dispatch('err', error, { root: true })
    }
  },
  async UPDATE_JADWAL ({ commit, dispatch }, req) {
    try {
      const { data } = await this.$axios.put('/api/operator/jadwal/' + req.id, req.body)
      commit('SET_MSG', data)
    } catch (error) {
      dispatch('err', error, { root: true })
    }
  }
}

export const mutations = {
  SET_SEMESTER (state, data) {
    state.listSemester = data.semester
    state.totalSemester = data.semester.length
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
  SET_MSG (state, data) {
    state.msg.status = data.status
    state.msg.msg = data.message
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
