<template>
  <div>
    Home <br>
    <div v-if="listCalon === null">
      <p>Tidak ada Pendaftar</p>
    </div>
    <div v-else>
      <b-navbar>
        <b-navbar-nav>
          <b-nav-form>
            <b-form-input
              v-model="search"
              class="mr-sm-2"
              type="search"
              debounce="500"
              placeholder="Cari Data"
              size="sm"
            />
          </b-nav-form>
        </b-navbar-nav>
        <b-navbar-nav class="ml-auto">
          <b-nav-form>
            <b-pagination
              v-model="currentPage"
              :total-rows="cariCalonAsdos.length"
              :per-page="perPage"
              aria-controls="tableUser"
              align="right"
            />
          </b-nav-form>
        </b-navbar-nav>
      </b-navbar>
      <b-table
        id="tableUser"
        :items="cariCalonAsdos"
        :fields="thead"
        :per-page="perPage"
        :current-page="currentPage"
        striped
        hover
        responsive
      >
        <template v-slot:cell(status_asdos)="data">
          <div v-if="data.item.status_asdos === true">
            <span class="text-success">&bull; Active</span>
          </div>
          <div v-if="data.item.status_asdos === false">
            <span class="text-danger">&bull; Inactive</span>
          </div>
        </template>
        <template v-slot:cell(aksi)="data">
          {{ data.item.status_acc }}
          <div v-if="data.item.status_acc === true">
            <b-badge variant="success">
              Pendaftaran Sudah di Terima
            </b-badge>
          </div>
          <div v-if="data.item.status_acc === false">
            <b-button variant="outline-success" size="sm" title="Terima Pendaftaran" @click="terima(data.item._id)">
              Terima
            </b-button>
            <b-button variant="outline-danger" size="sm" title="Tolak Pendaftaran" @click="tolak(data.item._id)">
              Tolak
            </b-button>
          </div>
        </template>
      </b-table>
      <b-navbar>
        <b-nav-form>
          <b-input-group append="Data">
            <b-form-select
              v-model="perPage"
              :options="[5, 10, 25, 50, 100, rows]"
            />
          </b-input-group>
        </b-nav-form>
        <b-nav-form class="ml-auto">
          <b-pagination
            v-model="currentPage"
            :total-rows="cariCalonAsdos.length"
            :per-page="perPage"
            aria-controls="tableUser"
            align="right"
          />
        </b-nav-form>
      </b-navbar>
    </div>
  </div>
</template>

<script>
export default {
  async fetch ({ store, params }) {
    await store.dispatch('dosen/GET_CALON')
  },
  data () {
    return {
      id: this.$store.state.dosen.listCalon.id,
      listCalon: this.$store.state.dosen.listCalon.list,
      rows: this.$store.state.dosen.totalCalon,
      perPage: 5,
      currentPage: 1,
      thead: [
        {
          key: '_id',
          label: 'NIM / NIK',
          sortable: true
        },
        {
          key: 'nama',
          label: 'Nama',
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
          key: 'dosen',
          label: 'Dosen Rekomendasi'
        },
        {
          key: 'aksi',
          label: 'Aksi'
        }
      ],
      search: ''
    }
  },
  computed: {
    cariCalonAsdos () {
      if (this.listCalon !== null) {
        return this.listCalon.filter((list) => {
          return (list._id.toLowerCase().includes(this.search.toLowerCase()) ||
          list.nama.toLowerCase().includes(this.search.toLowerCase()) ||
          list.status.toLowerCase().includes(this.search.toLowerCase()) ||
          list.email.toLowerCase().includes(this.search.toLowerCase())) &&
          list._id_dosen.toLowerCase().includes(this.$store.state.auth.user._id)
        })
      } else {
        return null
      }
    }
  },
  methods: {
    async setData () {
      await this.$store.dispatch('dosen/GET_CALON')
      this.id = this.$store.state.dosen.listCalon.id
      this.listCalon = this.$store.state.dosen.listCalon.list
      this.rows = this.$store.state.dosen.totalCalon
    },
    async terima (data) {
      await this.$store.dispatch('dosen/TERIMA_ASDOS', data)
      this.setData()
    },
    tolak (data) {
      this.$bvModal.msgBoxConfirm('Data Pendaftaran Asdos akan di Hapus. Calon Asdos perlu mendaftar ulang.', {
        title: 'Please Confirm',
        size: 'sm',
        buttonSize: 'sm',
        okVariant: 'danger',
        okTitle: 'Hapus',
        cancelTitle: 'Cancel',
        footerClass: 'p-2',
        hideHeaderClose: true,
        centered: true
      }).then(async (value) => {
        if (value === true) {
          await this.$store.dispatch('dosen/TOLAK_ASDOS', data)
          this.setData()
        }
      })
    }
  }
}
</script>

<style lang="css" scoped>
</style>
