export const state = () => ({
  msg: null
})

export const actions = {
  async UPDATE_PASSWORD ({ commit, dispatch }, req) {
    try {
      const { data } = await this.$axios.put('/api/profile/me/password/', req)
      commit('SET_MSG', data)
    } catch (error) {
      dispatch('err', error, { root: true })
    }
  }
}

export const mutations = {
  SET_MSG (state, data) {
    state.msg = data
  }
}
