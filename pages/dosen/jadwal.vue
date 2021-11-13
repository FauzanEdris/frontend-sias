<template>
  <div>
    Jadwal <br>
    <div v-if="listJadwal === null">
      <p>Tidak ada jadwal untuk ditampilkan.</p>
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
              :total-rows="cariJadwal.length"
              :per-page="perPage"
              aria-controls="tableUser"
              align="right"
            />
          </b-nav-form>
        </b-navbar-nav>
      </b-navbar>
      <b-table
        id="tableUser"
        :items="cariJadwal"
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
          <!-- {{ data.item }} -->
          <b-button
            v-if="data.item._id_asdos === null"
            v-b-modal.modalEdit
            variant="outline-warning"
            size="sm"
            title="Edit User"
            @click="editJadwal(data.item)"
          >
            Edit
          </b-button>
          <b-button v-else variant="outline-danger" size="sm" title="Delete User" @click="batal(data.item._id)">
            Batal
          </b-button>
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
            :total-rows="cariJadwal.length"
            :per-page="perPage"
            aria-controls="tableUser"
            align="right"
          />
        </b-nav-form>
      </b-navbar>
      <formEdit dispose />
    </div>
  </div>
</template>

<script>
import formEdit from '~/components/dosen/formEditJadwal'
export default {
  components: {
    formEdit
  },
  async fetch ({ store, params }) {
    await store.dispatch('dosen/GET_JADWAL')
    await store.dispatch('dosen/GET_ASDOS')
  },
  data () {
    return {
      id: this.$store.state.dosen.listJadwal.id,
      listJadwal: this.$store.state.dosen.listJadwal.list,
      rows: this.$store.state.dosen.totalJadwal,
      perPage: 5,
      currentPage: 1,
      thead: [
        {
          key: 'no',
          label: 'No.',
          sortable: true
        },
        {
          key: 'hari',
          label: 'Hari',
          sortable: true
        },
        {
          key: 'jam_kuliah',
          label: 'Jam Kuliah',
          sortable: true
        },
        {
          key: 'kode_mk',
          label: 'Kode MK',
          sortable: true
        },
        {
          key: 'nama_mk',
          label: 'Nama Matakuliah',
          sortable: true
        },
        {
          key: 'sks',
          label: 'SKS',
          sortable: true
        },
        {
          key: 'kelas',
          label: 'Kelas',
          sortable: true
        },
        {
          key: 'ruangan',
          label: 'Ruangan',
          sortable: true
        },
        {
          key: 'smt',
          label: 'Smt',
          sortable: true
        },
        {
          key: 'nama_dosen',
          label: 'Nama Dosen',
          sortable: true
        },
        {
          key: 'peserta',
          label: 'Peserta',
          sortable: true
        },
        {
          key: 'kurikulum',
          label: 'Kurikulum',
          sortable: true
        },
        {
          key: 'jml_pertemuan',
          label: 'Jml Pert.',
          sortable: true
        },
        {
          key: 'konsentrasi',
          label: 'Konsentrasi',
          sortable: true
        },
        {
          key: 'waktu_kelas',
          label: 'Waktu Kelas',
          sortable: true
        },
        {
          key: 'nama_asdos',
          label: 'Nama Asdos',
          sortable: true
        },
        {
          key: 'id_asdos',
          label: 'NIM / NIK Asdos',
          sortable: true
        },
        {
          key: 'status_asdos',
          label: 'Status Asdos',
          sortable: true
        },
        {
          key: 'email_asdos',
          label: 'Email Asdos',
          sortable: true
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
    cariJadwal () {
      return this.listJadwal.filter((list) => {
        return list.no.toLowerCase().includes(this.search.toLowerCase()) ||
         list.hari.toLowerCase().includes(this.search.toLowerCase()) ||
         list.jam_kuliah.toLowerCase().includes(this.search) ||
         list.kode_mk.toLowerCase().includes(this.search.toLowerCase()) ||
         list.nama_mk.toLowerCase().includes(this.search.toLowerCase()) ||
         list.sks.toLowerCase().includes(this.search.toLowerCase()) ||
         list.kelas.toLowerCase().includes(this.search.toLowerCase()) ||
         list.ruangan.toLowerCase().includes(this.search.toLowerCase()) ||
         list.smt.toLowerCase().includes(this.search.toLowerCase()) ||
         list.nama_dosen.toLowerCase().includes(this.search.toLowerCase()) ||
         list.peserta.toLowerCase().includes(this.search.toLowerCase()) ||
         list.kurikulum.toLowerCase().includes(this.search.toLowerCase()) ||
         list.jml_pertemuan.toLowerCase().includes(this.search.toLowerCase()) ||
         list.konsentrasi.toLowerCase().includes(this.search.toLowerCase()) ||
         list.waktu_kelas.toLowerCase().includes(this.search.toLowerCase()) ||
         list.nama_asdos.toLowerCase().includes(this.search.toLowerCase()) ||
         list.id_asdos.toLowerCase().includes(this.search.toLowerCase()) ||
        //  list.status_asdos.toLowerCase().includes(this.search.toLowerCase()) ||
         list.email_asdos.toLowerCase().includes(this.search.toLowerCase())
      })
    }
  },
  methods: {
    async setData () {
      await this.$store.dispatch('dosen/GET_JADWAL')
      this.id = this.$store.state.dosen.listJadwal.id
      this.listJadwal = this.$store.state.dosen.listJadwal.list
      this.rows = this.$store.state.dosen.totalJadwal
    },
    editJadwal (data) {
      this.$store.commit('dosen/EDIT_JADWAL', data)
    },
    async batal (data) {
      await this.$store.dispatch('dosen/BATAL_BOOKING', { id: this.$store.state.dosen.listJadwal.id, id_semester: data })
      this.setData()
    }
  }
}
</script>

<style lang="css" scoped>
</style>
