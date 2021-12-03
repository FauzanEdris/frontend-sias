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
          <b-nav-item-dropdown text="Profil" right>
            <b-dropdown-item href="#">
              Account
            </b-dropdown-item>
            <b-dropdown-item v-b-modal.modal-prevent-closing>
              Change password
            </b-dropdown-item>
            <b-dropdown-item @click="logout">
              Logout
            </b-dropdown-item>
            </b-dropdown-item>
          </b-nav-item-dropdown>
        </b-navbar-nav>
      </b-collapse>
    </b-navbar>
    <b-modal
      id="modal-prevent-closing"
      ref="modal"
      title="Change Password"
      @show="resetModal"
      @hidden="resetModal"
      @ok="handleOk"
    >
      <form ref="form" @submit.stop.prevent="handleSubmit">
        <b-form-group
          label="Enter your Old Password"
          label-for="password-input"
          invalid-feedback="Password is required"
          :state="passwordState"
        >
          <b-form-input
            id="old_password"
            v-model="old_password"
            type="password"
            :state="passwordState"
            required
          />
          <b-form-group
            label="Enter your New Password"
            label-for="password-input"
            invalid-feedback="Password is required"
            :state="passwordState1"
          >
            <b-form-input
              id="new_password1"
              v-model="new_password1"
              type="password"
              :state="passwordState1"
              required
            />
            <b-form-group
              label="Re-type your New Password"
              label-for="password-input"
              invalid-feedback="Password is required"
              :state="passwordState2"
            >
              <b-form-input
                id="new_password2"
                v-model="new_password2"
                type="password"
                :state="passwordState2"
                required
              />
            </b-form-group>
          </b-form-group>
        </b-form-group>
      </form>
    </b-modal>
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
        ],
        asdos: [
          { name: 'Home', link: '/asdos' },
          { name: 'Profil', link: '/asdos/profil' },
          { name: 'Jadwal', link: '/asdos/jadwal' },
          { name: 'Laporan Kegiatan', link: '/asdos/laporan' },
          { name: 'Poling Jadwal', link: '/asdos/polling' }
        ],
        dosen: [
          { name: 'Home', link: '/dosen' },
          { name: 'Profil', link: '/dosen/profil' },
          { name: 'Rekomendasi', link: '/dosen/rekomendasi' },
          { name: 'Jadwal', link: '/dosen/jadwal' }
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
