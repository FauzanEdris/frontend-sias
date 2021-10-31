export const state = () => ({
  msg: {
    status: null,
    msg: null
  },
  // form pendaftaran
  prePendaftaran: null,
  nama_dosen: '',
  status: false
})

export const actions = {
  async STATUS_PENDAFTARAN ({ commit, dispatch }) {
    try {
      const { data } = await this.$axios.get('/api/pendaftaran/status')
      commit('SET_STATUS', data)
    } catch (error) {
      dispatch('err', error, { root: true })
    }
  },
  async GET_DOSEN ({ commit, dispatch }) {
    try {
      const { data } = await this.$axios.get('/api/pendaftaran/dosen')
      commit('SET_DOSEN', data)
    } catch (error) {
      dispatch('err', error, { root: true })
    }
  },
  async DOSEN ({ commit, dispatch }, req) {
    try {
      const { data } = await this.$axios.get('/api/pendaftaran/' + req)
      commit('SET_FORM', data)
    } catch (error) {
      dispatch('err', error, { root: true })
    }
  },
  async DAFTAR ({ commit, dispatch }, req) {
    try {
      const metadata = {
        status: req.status,
        id: req.form.id,
        nama: req.form.nama,
        email: req.form.email,
        dosen: req.form.dosen,
        _id_dosen: req.form._id_dosen,
        id_dosen: req.form.id_dosen
      }
      const file = req.form.transkip
      await this.$axios.post('/api/pendaftaran', metadata)
        .then(async ({ data }) => {
          let msg = data
          const params = data.data
          if (data.status === 'ok') {
            const { data } = await this.$axios.post('/api/pendaftaran/' + params.id + '/' + params.id2, file)
            msg = data
          }
          commit('SET_MSG', msg)
        })
    } catch (error) {
      dispatch('err', error, { root: true })
    }
  }
}

export const mutations = {
  SET_MSG (state, data) {
    state.msg.status = data.status
    state.msg.msg = data.message
  },
  SET_STATUS (state, data) {
    state.status = data.data
  },
  SET_DOSEN (state, data) {
    state.nama_dosen = data.users.nama
  },
  SET_FORM (state, data) {
    if (data.data !== null) {
      state.prePendaftaran = data.data
    } else {
      state.prePendaftaran = ''
    }
  }
}
