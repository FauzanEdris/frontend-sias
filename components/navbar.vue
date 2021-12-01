<template>
  <div>
    <b-navbar toggleable="lg" class="navbar2">
      <b-navbar-brand :to="(checkRole())[0].link">
        <b-img
          thumbnail
          rounded="circle"
          src="@/static/logo_stikom.png"
          width="50%"
          height="auto"
        />
      </b-navbar-brand>
      <b-navbar-toggle target="nav-collapse" />
      <b-collapse id="nav-collapse" is-nav>
        <b-navbar-nav>
          <template v-for="menu in checkRole()">
            <b-nav-item v-if="menu.link" :key="menu" :to="menu.link">
              {{ menu.name }}
            </b-nav-item>
            <b-nav-item-dropdown
              v-if="menu.submenu"
              :key="menu"
              text="User"
              right
            >
              <b-dropdown-item
                v-for="submenu in menu.submenu"
                :key="submenu"
                :to="submenu.link"
              >
                {{ submenu.name }}
              </b-dropdown-item>
            </b-nav-item-dropdown>
          </template>
        </b-navbar-nav>
        <!-- <b-nav-form right>
          <b-form-input class="mr-sm-2" placeholder="Search" />
          <b-button variant="outline-success" class="my-2 my-sm-0" type="submit">
            Search
          </b-button>
        </b-nav-form> -->
        <b-navbar-nav class="ml-auto">
          <b-nav-item @click="logout"> Logout </b-nav-item>
        </b-navbar-nav>
      </b-collapse>
    </b-navbar>
  </div>
</template>

<script>
const Cookie = process.client ? require('js-cookie') : undefined

export default {
  middleware: 'adminAuth',
  data () {
    return {
      menus: {
        admin: [
          { name: 'Home', link: '/admin' },
          {
            name: 'User',
            submenu: [
              { name: 'Admin', link: '/admin/admin' },
              { name: 'Operator', link: '/admin/operator' },
              { name: 'Dosen', link: '/admin/dosen' },
              { name: 'Asisten Dosen', link: '/admin/asdos' },
              { name: 'bag. Akademik', link: '/admin/akademik' },
              { name: 'bag. Keuangan', link: '/admin/keuangan' }
            ]
          }
        ],
        operator: [
          { name: 'Home', link: '/operator' },
          { name: 'Profil', link: '/operator/profil' },
          { name: 'Pendaftaran', link: '/operator/pendaftaran' },
          { name: 'Jadwal', link: '/operator/jadwal' }
        ]
      }
    }
  },
  methods: {
    logout () {
      Cookie.remove('access')
      Cookie.remove('x')
      Cookie.remove('token')
      this.$store.commit('SET_AUTH', null)
      this.$router.push('/')
    },
    checkRole () {
      const userRole = this.$store.state.auth.user.role
      let dataMenu = []
      switch (userRole) {
        case 'Admin':
          dataMenu = this.menus.admin
          break
        case 'Operator':
          dataMenu = this.menus.operator
          break
        case 'Asdos':
          dataMenu = this.menus.asdos
          break
        case 'Dosen':
          dataMenu = this.menus.dosen
          break
        case 'Akademik':
          dataMenu = this.menus.akademik
          break
        case 'Keuangan':
          dataMenu = this.menus.keuangan
          break
      }

      return dataMenu
    }
  }
}
</script>

<style lang="css" scoped>
</style>
