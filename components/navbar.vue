<template>
  <div>
    <b-navbar
      toggleable="lg"
      class="navbar2"
    >
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
    <b-modal
      id="modalPassword"
      ref="modal"
      title="Change Password"
      @show="resetModal"
      @hidden="resetModal"
      @ok="handleOk"
    >
      <form
        ref="form"
        @submit.stop.prevent="handleSubmit"
      >
        <b-form-group
          label="Enter your Old Password"
          label-for="old_password"
          invalid-feedback="Password is required"
        >
          <b-form-input
            id="old_password"
            v-model="change_password.old_password"
            type="password"
            required
          />
        </b-form-group>
        <b-form-group
          label="Enter your New Password"
          label-for="new_password"
          invalid-feedback="Password is required"
        >
          <b-form-input
            id="new_password"
            v-model="change_password.new_password"
            type="password"
            required
          />
        </b-form-group>
        <b-form-group
          label="Re-type your New Password"
          label-for="confirm_password"
          invalid-feedback="Password is required"
          :state="state"
        >
          <b-form-input
            id="confirm_password"
            v-model="change_password.confirm_password"
            :state="state"
            type="password"
            required
          />
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
          },
          { name: 'Profil', link: '/admin/profile' }
        ],
        operator: [
          { name: 'Home', link: '/operator' },
          { name: 'Profil', link: '/operator/profile' },
          { name: 'Pendaftaran', link: '/operator/pendaftaran' },
          { name: 'Jadwal', link: '/operator/jadwal' }
        ],
        asdos: [
          { name: 'Home', link: '/asdos' },
          { name: 'Profil', link: '/asdos/profile' },
          { name: 'Jadwal', link: '/asdos/jadwal' },
          { name: 'Laporan Kegiatan', link: '/asdos/laporan' },
          { name: 'Poling Jadwal', link: '/asdos/polling' }
        ],
        akademik: [
          { name: 'Home', link: '/akademik' },
          { name: 'Profil', link: '/akademik/profile' },
          { name: 'Jadwal', link: '/akademik/jadwal' },
          { name: 'Laporan Kegiatan', link: '/akademik/laporan' },
          { name: 'Poling Jadwal', link: '/akademik/polling' }
        ],
        dosen: [
          { name: 'Home', link: '/dosen' },
          { name: 'Profil', link: '/dosen/profile' },
          { name: 'Rekomendasi', link: '/dosen/rekomendasi' },
          { name: 'Jadwal', link: '/dosen/jadwal' }
        ]
      },
      change_password: {
        old_password: '',
        new_password: '',
        confirm_password: ''
      }
    }
  },
  computed: {
    state () {
      return this.change_password.confirm_password.length >= 8
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
    },
    resetModal () {
      // do something
    },
    async handleOk () {
      // handle ok, do something
      await this.$store.dispatch('profile/UPDATE_PASSWORD', this.change_password)
      console.log(this.$store.state.profile.msg.status)
      if (this.$store.state.profile.msg.status === 'error') {
        // this.msg()
        return
      }
      // this.setData()
      this.$nextTick(() => {
        this.$bvModal.hide('modalPassword')
      })
      // this.alert = false
    }
  }
}
</script>

<style lang="css" scoped>
</style>
