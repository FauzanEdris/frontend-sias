<template>
  <div>
    <b-navbar>
      <b-navbar-nav>
        <b-nav-form>
          <b-button
            v-b-modal.modalTambah
            class="mr-2"
            variant="success"
            size="sm"
            title="Tambah User"
            @click="reset"
          >
            Tambah User
          </b-button>
          <b-form-input v-model="search" class="mr-sm-2" type="text" placeholder="Cari Data" size="sm" />
        </b-nav-form>
      </b-navbar-nav>
      <b-navbar-nav class="ml-auto">
        <!-- <b-nav-form>
          <b-pagination
            v-model="currentPage"
            :total-rows="userList.length"
            :per-page="perPage"
            aria-controls="tableUser"
            align="right"
          />
        </b-nav-form> -->
      </b-navbar-nav>
    </b-navbar>
    <b-table
      id="tableUser"
      :items="userList"
      :fields="thead"
      :per-page="perPage"
      :current-page="currentPage"
      striped
      hover
      responsive
    >
      <template v-slot:rows(role) />
      <template v-slot:cell(status)="data">
        <div v-if="data.item.status === true">
          <span class="text-success">&bull; Active</span>
        </div>
        <div v-if="data.item.status === false">
          <span class="text-danger">&bull; Inactive</span>
        </div>
      </template>
      <template v-slot:cell(aksi)="data">
        {{ data.item.id }}
        <b-button v-b-modal.modalEdit variant="outline-warning" size="sm" title="Edit User" @click="formEdit(data.item)">
          Edit
        </b-button>
        <b-button variant="outline-danger" size="sm" title="Delete User" @click="hapus(data.item.id)">
          Delete
        </b-button>
      </template>
    </b-table>
    <b-navbar>
      <b-nav-form>
        <b-input-group append="Data">
          <b-form-select
            v-model="perPage"
            :options="[5, 10, 25, 50, 100]"
          />
        </b-input-group>
      </b-nav-form>
      <b-nav-form class="ml-auto">
        <b-pagination
          v-model="currentPage"
          :total-rows="userList.length"
          :per-page="perPage"
          aria-controls="tableUser"
          align="right"
        />
      </b-nav-form>
    </b-navbar>
  </div>
</template>

<script>
export default {
  async fetch ({ store, params }) {
    await store.dispatch('admin/GET_USER')
  },
  data () {
    return {
      rows: this.$store.state.admin.totalUser,
      perPage: 5,
      currentPage: 1,
      thead: [
        {
          key: 'id_user',
          label: 'NIM / NIK',
          sortable: true
        },
        {
          key: 'nama',
          label: 'Nama',
          sortable: true
        },
        {
          key: 'role',
          label: 'Role',
          sortable: true
        },
        {
          key: 'status',
          label: 'Status',
          sortable: true
        },
        {
          key: 'email',
          label: 'Email',
          sortable: true
        },
        {
          key: 'aksi',
          label: 'Aksi'
        }
      ],
      user: this.$store.state.admin.user,
      interval: null,
      search: '',
      // Form
      role: this.$store.state.admin.role,
      status: this.$store.state.admin.status,
      form: {
        id: undefined,
        id_user: undefined,
        nama: undefined,
        role: undefined,
        status: undefined,
        email: undefined
      },
      check: {
        id: null,
        id_user: null,
        nama: null,
        role: null,
        status: null,
        email: null
      },
      alert: false
    }
  },
  computed: {
    userList () {
      return this.user.filter((user) => {
        return user.id_user.toLowerCase().includes(this.search.toLowerCase()) ||
         user.nama.toLowerCase().includes(this.search.toLowerCase()) ||
         user.role.toLowerCase().includes(this.search.toLowerCase()) ||
         user.email.toLowerCase().includes(this.search.toLowerCase())
      })
    }
  },
  mounted () { // eksekusi setelah template di render
    this.refresh()
  },
  beforeDestroy () {
    clearInterval(this.interval)
  },
  // created () { // eksekusi sebelum template di render
  //   this.refresh()
  // },
  methods: {
    async setData () {
      await this.$store.dispatch('admin/GET_USER')
      this.user = await this.$store.state.admin.user
      this.rows = await this.$store.state.admin.totalUser
    },
    async refresh () {
      this.interval = await setInterval(() => {
        this.$store.dispatch('admin/GET_USER')
        this.user = this.$store.state.admin.user
        this.rows = this.$store.state.admin.totalUser
      }, 3000)
    },
    reset () {
      this.form.id = null
      this.form.id_user = null
      this.form.nama = null
      this.form.role = null
      this.form.status = null
      this.form.email = null
      this.check.id = null
      this.check.id_user = null
      this.check.nama = null
      this.check.role = null
      this.check.status = null
      this.check.email = null
    },
    async formEdit (data) {
      // this.form = data
      await this.reset()
      this.form.id = data.id
      this.form.id_user = data.id_user
      this.form.nama = data.nama
      this.form.role = data.role
      this.form.status = data.status
      this.form.email = data.email
      // this.check.role = data.role
    },
    async update ({ dispatch }) {
      if (!this.checkFormValidity()) {
        return
      }
      await this.$store.dispatch('admin/UPDATE_USER', this.form)
      if (this.$store.state.admin.msg.status === 'error') {
        this.msg()
        return
      }
      this.setData()
      this.$nextTick(() => {
        this.$bvModal.hide('modalEdit')
      })
      this.alert = false
    },
    async tambah ({ dispatch }) {
      if (!this.checkFormValidity()) { return }
      await this.$store.dispatch('admin/TAMBAH_USER', this.form)
      if (this.$store.state.admin.msg.status === 'error') {
        this.msg()
        return
      }
      this.setData()
      this.$nextTick(() => {
        this.$bvModal.hide('modalTambah')
      })
      this.alert = false
    },
    hapus (data) {
      this.$bvModal.msgBoxConfirm('Apakah Anda Yakin Ingin Menghapus Data?', {
        title: 'Please Confirm',
        size: 'sm',
        buttonSize: 'sm',
        okVariant: 'danger',
        okTitle: 'Hapus',
        cancelTitle: 'Cancel',
        footerClass: 'p-2',
        hideHeaderClose: true,
        centered: true
      }).then((value) => {
        if (value === true) {
          this.$store.dispatch('admin/DELETE_USER', data)
          this.setData()
        }
      })
    },
    checkFormValidity () {
      const valid = this.$refs.form.checkValidity()
      this.check.id_user = this.$refs.id_user.checkValidity()
      this.check.nama = this.$refs.nama.checkValidity()
      if (this.form.role === null) {
        this.check.role = false
      } else {
        this.check.role = true
      }
      if (this.form.status === null) {
        this.check.status = false
      } else {
        this.check.status = true
      }
      this.check.email = this.$refs.email.checkValidity()
      return valid
    },
    msg () {
      this.alert = true
    }
  }
}
</script>

<style lang="css" scoped>
</style>
