wa<template>
  <div>
    <b-navbar toggleable="lg" type="light" variant="light">
      <b-navbar-brand :to="keuangan">
        NavBar
      </b-navbar-brand>
      <b-navbar-toggle target="nav-collapse" />
      <b-collapse id="nav-collapse" is-nav>
        <b-navbar-nav>
          <b-nav-item to="/keuangan">
            Home
          </b-nav-item>
          <b-nav-item to="/keuangan/profil">
            Profil
          </b-nav-item>
          <b-nav-item to="/keuangan/absen">
            Absen
          </b-nav-item>
        </b-navbar-nav>
        <!-- <b-nav-form right>
          <b-form-input class="mr-sm-2" placeholder="Search" />
          <b-button variant="outline-success" class="my-2 my-sm-0" type="submit">
            Search
          </b-button>
        </b-nav-form> -->
      </b-collapse>
    </b-navbar>
    <div class="container-fluid">
      <nuxt-child />
    </div>
  </div>
</template>

<script>
export default {
}
</script>

<style lang="css" scoped>
</style>
