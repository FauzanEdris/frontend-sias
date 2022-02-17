<template>
  <div>
    <b-navbar
      toggleable="lg"
      class="navbar2"
    >
      <b-navbar-brand to="/">
        <b-img
          thumbnail
          rounded="circle"
          src="@/static/logo_stikom.png"
          width="50%"
          height="auto"
        />
      </b-navbar-brand>
      <b-navbar-toggle target="nav-collapse" />
      <b-collapse
        id="nav-collapse"
        is-nav
      >
        <b-navbar-nav>
          <template v-for="menu in checkRole()">
            <b-nav-item
              v-if="menu.link"
              :key="menu.link"
              :to="menu.link"
            >
              {{ menu.name }}
            </b-nav-item>
            <b-nav-item-dropdown
              v-if="menu.submenu"
              :key="menu.name"
              :text="menu.name"
              right
            >
              <b-dropdown-item
                v-for="submenu in menu.submenu"
                :key="submenu.link"
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
          <b-nav-item @click="logout">
            Logout
          </b-nav-item>
        </b-navbar-nav>
        <!-- <b-navbar-nav class="ml-auto">
          <b-nav-item-dropdown
            text="Profil"
            right
          >
            <b-dropdown-item href="#">
              Account
            </b-dropdown-item>
            <b-dropdown-item v-b-modal.modal-prevent-closing>
              Change password
            </b-dropdown-item>
            <b-dropdown-item @click="logout">
              Logout
            </b-dropdown-item>
          </b-nav-item-dropdown>
        </b-navbar-nav> -->
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
          { name: 'Beranda', link: '/admin' },
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
          },
          { name: 'Profil', link: '/admin/profile' }
        ],
        operator: [
          { name: 'Beranda', link: '/operator' },
          { name: 'Profil', link: '/operator/profile' },
          { name: 'Pendaftaran', link: '/operator/pendaftaran' },
          { name: 'Jadwal', link: '/operator/jadwal' }
        ],
        asdos: [
          { name: 'Beranda', link: '/asdos' },
          { name: 'Profil', link: '/asdos/profile' },
          { name: 'Jadwal', link: '/asdos/jadwal' },
          { name: 'Laporan Kegiatan', link: '/asdos/laporan' },
          { name: 'Poling Jadwal', link: '/asdos/polling' }
        ],
        akademik: [
          { name: 'Beranda', link: '/akademik' },
          { name: 'Profil', link: '/akademik/profile' },
          { name: 'Laporan Kegiatan', link: '/akademik/laporan' }
        ],
        dosen: [
          { name: 'Beranda', link: '/dosen' },
          { name: 'Profil', link: '/dosen/profile' },
          { name: 'Rekomendasi', link: '/dosen/rekomendasi' },
          { name: 'Jadwal', link: '/dosen/jadwal' }
        ],
        keuangan: [
          { name: 'Beranda', link: '/keuangan' },
          { name: 'Profil', link: '/keuangan/profile' },
          { name: 'Laporan Kegiatan', link: '/keuangan/laporan' }
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
      if (this.$store.state.auth === null) {
        return this.logout()
      }

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
