<template>
  <div>
    <b-navbar toggleable="lg" type="light" variant="light">
      <b-navbar-brand to="/asdos">
        <b-img
          src="/favicon.ico"
          class="d-inline-block align-top"
          height="32"
          width="32"
          fluid
          alt="ITB STIKOM Bali"
        />
        <!-- ITB STIKOM Bali -->
      </b-navbar-brand>
      <b-navbar-toggle target="nav-collapse" />
      <b-collapse id="nav-collapse" is-nav>
        <b-navbar-nav>
          <b-nav-item to="/asdos">
            Home
          </b-nav-item>
          <b-nav-item to="/asdos/profil">
            Profil
          </b-nav-item>
          <b-nav-item to="/asdos/jadwal">
            Jadwal
          </b-nav-item>
          <b-nav-item to="/asdos/laporan">
            Laporan Kegiatan
          </b-nav-item>
          <b-nav-item to="/asdos/polling">
            Polling Jadwal
          </b-nav-item>
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
  middleware: 'asdosAuth',
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
