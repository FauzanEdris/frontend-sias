<template>
  <div>
    <b-navbar toggleable="lg" type="light" variant="light">
      <b-navbar-brand to="/admin">
        <b-img src="@/static/logo without text.png" width="50%" height="auto" />
      </b-navbar-brand>
      <b-navbar-toggle target="nav-collapse" />
      <b-collapse id="nav-collapse" is-nav>
        <b-navbar-nav>
          <b-nav-item to="/admin">
            Home
          </b-nav-item>
          <b-nav-item-dropdown text="User" right>
            <b-dropdown-item to="/admin/admin">
              Admin
            </b-dropdown-item>
            <b-dropdown-item to="/admin/operator">
              Operator
            </b-dropdown-item>
            <b-dropdown-item to="/admin/dosen">
              Dosen
            </b-dropdown-item>
            <b-dropdown-item to="/admin/asdos">
              Asisten Dosen
            </b-dropdown-item>
            <b-dropdown-item to="/admin/akademik">
              bag. Akademik
            </b-dropdown-item>
            <b-dropdown-item to="/admin/keuangan">
              bag. Keuangan
            </b-dropdown-item>
          </b-nav-item-dropdown>
        </b-navbar-nav>
        <!-- <b-nav-form right>
          <b-form-input class="mr-sm-2" placeholder="Search" />
          <b-button variant="outline-success" class="my-2 my-sm-0" type="submit">
            Search
          </b-button>
        </b-nav-form> -->
        <b-navbar-nav class="ml-auto">
          <b-nav-item @click="logout">
            Logout
          </b-nav-item>
        </b-navbar-nav>
      </b-collapse>
    </b-navbar>
    <div class="container-fluid">
      <nuxt-child />
    </div>
  </div>
</template>

<script>
const Cookie = process.client ? require('js-cookie') : undefined

export default {
  middleware: 'adminAuth',
  methods: {
    logout () {
      Cookie.remove('access')
      Cookie.remove('x')
      Cookie.remove('token')
      this.$store.commit('SET_AUTH', null)
      this.$router.push('/')
    }
  }
}
</script>

<style lang="css" scoped>
</style>
