<template>
  <div>
    Jadwal <br>
    {{ a }}
    <div v-if="listJadwal === null">
      <p>Tidak ada jadwal untuk ditampilkan.</p>
    </div>
    <div v-else>
      <b>Total SKS : {{ sks.sks }} SKS (12 Max) </b>
      <br>
      <b-button
        href="#tableJadwal"
        title="Klik Untuk Fokus ke Tabel"
      >
        Table Focus
      </b-button>
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
              aria-controls="tableJadwal"
              align="right"
            />
          </b-nav-form>
        </b-navbar-nav>
      </b-navbar>
      <b-table
        id="tableJadwal"
        :items="cariJadwal"
        :fields="thead"
        :per-page="perPage"
        :current-page="currentPage"
        sticky-header
        no-border-collapse
        striped
        hover
        responsive
        style="max-height: 100vh!important"
      >
        <!-- <template v-slot:cell(status_asdos)="data">
          <div v-if="data.item.status_asdos === true">
            <span class="text-success">&bull; Active</span>
          </div>
          <div v-if="data.item.status_asdos === false">
            <span class="text-danger">&bull; Inactive</span>
          </div>
        </template> -->
        <template #cell(aksi)="data">
          <b-button
            v-if="id_user === data.item._id_asdos"
            variant="outline-success"
            size="sm"
            title="Polling"
            @click="batal({id: data.item._id, sks: data.item.sks})"
          >
            Berhasil
          </b-button>
          <b-button
            v-else-if="data.item._id_asdos === null || data.item._id_asdos === ''"
            :disabled="sks.sks < 12 && (parseSks(data.item.sks)) <= 12 ? false : true"
            variant="outline-primary"
            size="sm"
            title="Polling"
            @click="polling({id: data.item._id, sks: data.item.sks})"
          >
            Pilih
            <!-- <br> {{ parseSks(data.item.sks) }} <br> {{ sks.sks }} -->
          </b-button>
          <b-button
            v-else
            variant="outline-danger"
            disabled
            size="sm"
            title="Polling"
          >
            Tidak Tersedia
          </b-button>
        </template>
      </b-table>
      <b-navbar>
        <b-nav-form>
          <b-input-group append="Data">
            <b-form-select
              v-model="perPage"
              :options="[5, 10, 25, 50, 100, {text: 'All', value: rows}]"
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
    </div>
  </div>
</template>

<script>
export default {
  data () {
    return {
      a: 'b',
      id_user: this.$store.state.auth.user._id,
      id: this.$store.state.asdos.listJadwal.id,
      listJadwal: this.$store.state.asdos.listJadwal.list,
      rows: this.$store.state.asdos.totalJadwal,
      perPage: 5,
      currentPage: 1,
      thead: [
        {
          key: 'no',
          label: 'No.',
          stickyColumn: true,
          isRowHeader: true,
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
        // {
        //   key: 'nama_asdos',
        //   label: 'Nama Asdos',
        //   sortable: true
        // },
        // {
        //   key: 'id_asdos',
        //   label: 'NIM / NIK Asdos',
        //   sortable: true
        // },
        // {
        //   key: 'status_asdos',
        //   label: 'Status Asdos',
        //   sortable: true
        // },
        // {
        //   key: 'email_asdos',
        //   label: 'Email Asdos',
        //   sortable: true
        // },
        {
          key: 'aksi',
          label: 'Aksi'
        }
      ],
      search: '',
      interval: null,
      max_sks: 12
    }
  },
  async fetch ({ store, context, params }) {
    await store.dispatch('asdos/GET_JADWAL')
  },
  computed: {
    sks () {
      const data = this.listJadwal
      let current = { sks: 0 }
      if (data !== null) {
        const sks = data.filter(data => data._id_asdos === this.id_user)
        if (sks.length !== 0) {
          current = sks.reduce(function (oldValue, currentValue) {
            if (parseFloat(currentValue.sks) === 1) {
              currentValue.sks = 2
            }
            return {
              sks: parseFloat(oldValue.sks) + parseFloat(currentValue.sks)
            }
          })
        } else {
          current = { sks: 0 }
        }
      }
      return current
    },
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
         list.waktu_kelas.toLowerCase().includes(this.search.toLowerCase())
        //  list.nama_asdos.toLowerCase().includes(this.search.toLowerCase()) ||
        //  list.id_asdos.toLowerCase().includes(this.search.toLowerCase()) ||
        // //  list.status_asdos.toLowerCase().includes(this.search.toLowerCase()) ||
        //  list.email_asdos.toLowerCase().includes(this.search.toLowerCase())
      })
    }
  },
  // beforeMount () {
  //   this.$socket.on('message', (msg) => {
  //     console.log(msg)
  //     this.$store.dispatch('asdos/GET_JADWAL')
  //   })
  // },
  mounted () { // eksekusi setelah template di render
    // this.$socket.close()
    // this.$socket.open()
    // this.refresh()
    if (this.listJadwal !== null) {
      this.socket = this.$nuxtSocket({
        // channel: '/'
        // reconnection: true
      })
      /* Listen for events: */
      this.socket.on('dataJadwal', (msg, cb) => {
        /* Handle event */
        // this.a = msg
        this.$store.commit('asdos/SET_JADWAL', msg)
        this.id = this.$store.state.asdos.listJadwal.id
        this.listJadwal = this.$store.state.asdos.listJadwal.list
        this.rows = this.$store.state.asdos.totalJadwal
      })
    }
  },
  beforeDestroy () {
    clearInterval(this.interval)
    // this.$socket.close()
  },
  methods: {
    async setData () {
      await this.$store.dispatch('asdos/GET_JADWAL')
      this.id = this.$store.state.asdos.listJadwal.id
      this.listJadwal = this.$store.state.asdos.listJadwal.list
      this.rows = this.$store.state.asdos.totalJadwal
    },
    async refresh () {
      this.interval = await setInterval(async () => {
        await this.$store.dispatch('asdos/GET_JADWAL')
        this.id = this.$store.state.asdos.listJadwal.id
        this.listJadwal = this.$store.state.asdos.listJadwal.list
        this.rows = this.$store.state.asdos.totalJadwal
      }, 1000)
    },
    async polling (req) {
      req.sks = parseFloat(this.sks.sks) + parseFloat(req.sks)
      await this.$store.dispatch('asdos/POLLING', { id_semester: this.id, id_jadwal: req.id, id_user: this.id_user, sks: req.sks })
      this.setData()
    },
    async batal (req) {
      req.sks = parseFloat(this.sks.sks) - parseFloat(req.sks)
      await this.$store.dispatch('asdos/POLLING', { id_semester: this.id, id_jadwal: req.id, id_user: null, sks: req.sks, id: this.$store.state.auth.user.id })
      this.setData()
    },
    parseSks (req) {
      // const a = parseFloat(req)
      return Number(req) + Number(this.sks.sks)
    }
  }
}
</script>

<style lang="css" scoped>
</style>
