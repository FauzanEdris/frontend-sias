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
  },
  // Perkuliahan
  perkuliahan: {
    id: null,
    list: null
  },
  // laporan
  detail: null
})

export const getters = {
  listCalon: (state, rootState) => {
    const list = state.listSemester
    return list
  }
}

export const actions = {
  // // Rekomendasi Dosen
  // async GET_CALON ({ commit, dispatch, rootState }) {
  //   try {
  //     const { data } = await this.$axios.post('/api/dosen/calon', { id: rootState.auth.user._id })
  //     commit('SET_CALON', data)
  //   } catch (error) {
  //     dispatch('err', error, { root: true })
  //   }
  // },
  // async TERIMA_ASDOS ({ commit, dispatch }, req) {
  //   try {
  //     const { data } = await this.$axios.put('/api/dosen/calon', { id: req })
  //     commit('SET_MSG', data)
  //   } catch (error) {
  //     dispatch('err', error, { root: true })
  //   }
  // },
  // async TOLAK_ASDOS ({ commit, dispatch }, req) {
  //   try {
  //     const { data } = await this.$axios.delete('/api/dosen/calon/' + req)
  //     commit('SET_MSG', data)
  //   } catch (error) {
  //     dispatch('err', error, { root: true })
  //   }
  // },
  // Polling Jadwal
  async GET_JADWAL ({ commit, dispatch, rootState }, req) {
    try {
      const { data } = await this.$axios.get('/api/asdos/jadwal/' + rootState.auth.user.id)
      commit('SET_JADWAL', data)
      commit('SET_MSG', data)
    } catch (error) {
      dispatch('err', error, { root: true })
    }
  },
  async POLLING ({ commit, dispatch }, req) {
    try {
      const { data } = await this.$axios.put('/api/asdos/polling/' + req.id_semester, { id_jadwal: req.id_jadwal, id_user: req.id_user, sks: req.sks, id: req.id })
      commit('SET_MSG', data)
    } catch (error) {
      dispatch('err', error, { root: true })
    }
  },
  // Laporan Perkuliahan
  async GET_PERKULIAHAN ({ commit, dispatch, rootState }) {
    try {
      const { data } = await this.$axios.get('/api/asdos/perkuliahan/' + rootState.auth.user._id)
      commit('SET_PERKULIAHAN', data)
      commit('SET_MSG', data)
    } catch (error) {
      dispatch('err', error, { root: true })
    }
  },
  async MULAI_PERKULIAHAN ({ commit, dispatch, rootState }) {
    try {
      const { data } = await this.$axios.put('/api/asdos/perkuliahan/mulai/' + rootState.auth.user.id)
      if (data.status === 'success') {
        dispatch('GET_PERKULIAHAN')
      } else {
        commit('SET_PERKULIAHAN', data)
        commit('SET_MSG', data)
      }
    } catch (error) {
      dispatch('err', error, { root: true })
    }
  },
  // Detail Laporan Perkuliahan
  async GET_DETAIL_PERKULIAHAN ({ state, commit, dispatch, rootState }, req) {
    try {
      const { data } = await this.$axios.get('/api/asdos/perkuliahan/detail/' + req + '/' + rootState.auth.user._id)
      commit('SET_DETAIL', data)
      commit('SET_MSG', data)
      // await console.log(data)
    } catch (error) {
      dispatch('err', error, { root: true })
    }
  },
  async TAMBAH_LAPORAN ({ state, commit, dispatch, rootState }, req) {
    try {
      const { data } = await this.$axios.post('/api/asdos/perkuliahan/laporan/' + req.params + '/' + rootState.auth.user._id, req.data)
      commit('SET_PERTEMUAN', data)
      commit('SET_MSG', data)
      // await console.log(data)
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
  },
  // Perkuliahan
  SET_PERKULIAHAN (state, data) {
    if (data.data !== null) {
      state.perkuliahan.id = data.data[0]._id
      state.perkuliahan.list = data.data[0].jadwal
    } else {
      state.perkuliahan.list = null
    }
  },
  // Laporan
  SET_DETAIL (state, data) {
    if (data.data !== null) {
      state.detail = data.data[0].perkuliahan[0]
    } else {
      state.detail = null
    }
  },
  SET_PERTEMUAN (state, data) {
    console.log(data)
    if (data.data !== null) {
      if (state.detail === undefined) {
        console.log('a')
        state.detail.push({ pertemuan: data.data })
      } else {
        console.log('b')
        state.detail.pertemuan = data.data
      }
    } else {
      state.detail = null
    }
  }
}
