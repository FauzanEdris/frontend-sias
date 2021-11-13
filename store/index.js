// const cookieparser = process.server ? require('cookieparser') : undefined
export const strict = false
export const state = () => ({
  role: [{ value: null, text: 'Pilih Role' }, 'Admin', 'Operator', 'Dosen', 'Asdos', 'Akademik', 'Keuangan'],
  status: [{ value: null, text: 'Pilih Status' }, { value: true, text: 'Active' }, { value: false, text: 'Inactive' }],
  msg: null,
  id: null,
  res: 'null',
  auth: null,
  pertemuan: [1, 2, 3, 4, 5, 6, 7, 'UTS', 8, 9, 10, 11, 12, 13, 14, 'UAS']
})

export const actions = {
  async nuxtServerInit ({ commit, dispatch }, { req }) {
    await dispatch('pendaftaran/STATUS_PENDAFTARAN')
    let auth = null
    if (req.headers.cookie) {
      // const parsed = cookieparser.parse(req.headers.cookie)
      try {
        // const token = parsed['x-access-token']
        const { data } = await this.$axios.post('/api/auths/me')
        auth = data.data
      } catch (err) {
        // No valid cookie found
        auth = null
      }
    }
    commit('SET_AUTH', auth)
  },
  async ME ({ commit }, req) {
    const { data } = await this.$axios.post('/api/auths/me')
    commit('SET_AUTH', data.data)
    switch (data.data.user.role) {
      case 'Admin':
        this.$router.push('/admin')
        break
      case 'Operator':
        return this.$router.push('/operator')
      case 'Dosen':
        return this.$router.push('/dosen')
      case 'Akademik':
        this.$router.push('/akademik')
        break
      case 'Keuangan':
        this.$router.push('/keuangan')
        break
      case 'Asdos':
        this.$router.replace('/asdos')
        break
      default:
        this.$router.push('/')
        break
    }
  },
  async LOGIN ({ commit, dispatch }, req) {
    const { data } = await this.$axios.post('/api/auths/authenticate', req)
    // commit('SET_AUTH', data.data)
    // dispatch('ME')
    return data
  },
  err ({ commit }, error) {
    try {
      if (error.response.status === 401) {
        commit('SET_AUTH', null)
        this.$router.push('/')
      }
    } catch (error) {
      return error
    }
  }
}

export const mutations = {
  SET_AUTH (state, data) {
    state.auth = data
  }
}
