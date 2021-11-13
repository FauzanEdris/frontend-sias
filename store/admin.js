export const state = () => ({
  user: [],
  totalUser: null,
  editUser: {},
  role: [{ value: null, text: 'Pilih Role' }, 'Admin', 'Operator', 'Dosen', 'Asdos', 'Akademik', 'Keuangan'],
  status: [{ value: null, text: 'Pilih Status' }, { value: true, text: 'Active' }, { value: false, text: 'Inactive' }],
  msg: null,
  id: null,
  form: {}
})

export const getters = {
  editUser: state => state.editUser
}

export const actions = {
  async GET_USER ({ commit, dispatch }) {
    try {
      const { data } = await this.$axios.get('/api/admin')
      commit('SET_USER', data)
    } catch (error) {
      dispatch('err', error, { root: true })
    }
  },
  async DELETE_USER ({ commit, dispatch }, req) {
    try {
      const { data } = await this.$axios.delete('/api/admin/' + req)
      commit('SET_MSG', data)
    } catch (error) {
      dispatch('err', error, { root: true })
    }
  },
  async UPDATE_USER ({ commit, dispatch }, req) {
    try {
      const { data } = await this.$axios.put('/api/admin/' + req.id, req)
      commit('SET_MSG', data)
    } catch (error) {
      dispatch('err', error, { root: true })
    }
  },
  async TAMBAH_USER ({ commit, dispatch }, req) {
    try {
      const { data } = await this.$axios.post('/api/admin', req)
      commit('SET_MSG', data)
    } catch (error) {
      dispatch('err', error, { root: true })
    }
  }
}

export const mutations = {
  SET_USER (state, data) {
    state.user = data.users
    state.totalUser = data.users.length
  },
  EDIT_USER (state, data) {
    state.editUser = data
  },
  SET_MSG (state, data) {
    state.msg = data
  },
  SET_ID (state, data) {
    state.id = data
  }
}
