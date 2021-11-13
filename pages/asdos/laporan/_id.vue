<template>
  <div>
    Detail Kegiatan<br>
    <b-container fluid>
      <b-row class="text-left">
        <b-col md="6">
          <b-row class="mr-1">
            <b-col cols="3" class="mr-1">
              Kode MK
            </b-col>
            <b-col cols="1">
              :
            </b-col>
            <b-col>{{ cekData(perkuliahan.kode_mk) }}</b-col>
          </b-row>
        </b-col>
        <b-col md="6">
          <b-row class="mr-1">
            <b-col cols="3" class="mr-1">
              Nama MK
            </b-col>
            <b-col cols="1">
              :
            </b-col>
            <b-col>{{ cekData(perkuliahan.nama_mk) }}</b-col>
          </b-row>
        </b-col>
        <div class="w-100" />
        <b-col md="6">
          <b-row class="mr-1">
            <b-col cols="3" class="mr-1">
              Nama Dosen
            </b-col>
            <b-col cols="1">
              :
            </b-col>
            <b-col>{{ cekData(perkuliahan.nama_dosen) }}</b-col>
          </b-row>
        </b-col>
        <b-col md="6">
          <b-row class="mr-1">
            <b-col cols="3" class="mr-1">
              Nama Asdos
            </b-col>
            <b-col cols="1">
              :
            </b-col>
            <b-col>{{ cekData(perkuliahan.nama_asdos) }}</b-col>
          </b-row>
        </b-col>
        <div class="w-100" />
        <b-col md="6">
          <b-row class="mr-1">
            <b-col cols="3" class="mr-1">
              Kelas
            </b-col>
            <b-col cols="1">
              :
            </b-col>
            <b-col>{{ cekData(perkuliahan.kelas) }}</b-col>
          </b-row>
        </b-col>
        <b-col md="6">
          <b-row class="mr-1">
            <b-col cols="3" class="mr-1">
              Ruangan
            </b-col>
            <b-col cols="1">
              :
            </b-col>
            <b-col>{{ cekData(perkuliahan.ruangan) }}</b-col>
          </b-row>
        </b-col>
        <div class="w-100" />
        <b-col md="6">
          <b-row class="mr-1">
            <b-col cols="3" class="mr-1">
              Hari
            </b-col>
            <b-col cols="1">
              :
            </b-col>
            <b-col>{{ cekData(perkuliahan.hari) }}</b-col>
          </b-row>
        </b-col>
        <b-col md="6">
          <b-row class="mr-1">
            <b-col cols="3" class="mr-1">
              Jam Kuliah
            </b-col>
            <b-col cols="1">
              :
            </b-col>
            <b-col>{{ cekData(perkuliahan.jam_kuliah) }}</b-col>
          </b-row>
        </b-col>
        <div class="w-100" />
        <b-col md="6">
          <b-row class="mr-1">
            <b-col cols="3" class="mr-1">
              Semester
            </b-col>
            <b-col cols="1">
              :
            </b-col>
            <b-col>{{ cekData(perkuliahan.smt) }}</b-col>
          </b-row>
        </b-col>
        <b-col md="6">
          <b-row class="mr-1">
            <b-col cols="3" class="mr-1">
              SKS
            </b-col>
            <b-col cols="1">
              :
            </b-col>
            <b-col>{{ cekData(perkuliahan.sks) }}</b-col>
          </b-row>
        </b-col>
        <div class="w-100" />
        <b-col md="6">
          <b-row class="mr-1">
            <b-col cols="3" class="mr-1">
              Waktu Kelas
            </b-col>
            <b-col cols="1">
              :
            </b-col>
            <b-col>{{ cekData(perkuliahan.waktu_kelas) }}</b-col>
          </b-row>
        </b-col>
        <b-col md="6">
          <b-row class="mr-1">
            <b-col cols="3" class="mr-1">
              Kurikulum
            </b-col>
            <b-col cols="1">
              :
            </b-col>
            <b-col>{{ cekData(perkuliahan.kurikulum) }}</b-col>
          </b-row>
        </b-col>
        <div class="w-100" />
        <b-col md="6">
          <b-row class="mr-1">
            <b-col cols="3" class="mr-1">
              Peserta
            </b-col>
            <b-col cols="1">
              :
            </b-col>
            <b-col>{{ cekData(perkuliahan.peserta) }}</b-col>
          </b-row>
        </b-col>
        <b-col md="6">
          <b-row class="mr-1">
            <b-col cols="3" class="mr-1">
              Jml Pertemuan
            </b-col>
            <b-col cols="1">
              :
            </b-col>
            <b-col>{{ cekData(perkuliahan.jml_pertemuan) }}</b-col>
          </b-row>
        </b-col>
        <div class="w-100" />
        <b-col md="6">
          <b-row class="mr-1">
            <b-col cols="3" class="mr-1">
              Konsentrasi
            </b-col>
            <b-col cols="1">
              :
            </b-col>
            <b-col>{{ cekData(perkuliahan.konsentrasi) }}</b-col>
          </b-row>
        </b-col>
        <b-col md="6">
          <b-row class="mr-1">
            <b-col cols="3" class="mr-1">
              Email Asdos
            </b-col>
            <b-col cols="1">
              :
            </b-col>
            <b-col>{{ cekData(perkuliahan.email_asdos) }}</b-col>
          </b-row>
        </b-col>
      </b-row>
    </b-container>
    <b-button
      v-b-modal.modalTambah
      class="m-2"
      variant="success"
      size="sm"
      title="Tambah Laporan"
    >
      Tambah Laporan
    </b-button>
    <b-table
      id="tableUser"
      :items="perkuliahan.pertemuan"
      :fields="thead"
      striped
      hover
      responsive
      show-empty
    >
      <template v-slot:empty>
        <div class="text-center">
          <h4>Tidak Ada Laporan yang Tersedia.</h4>
        </div>
      </template>
      <template v-slot:cell(aksi)>
        <b-button
          variant="outline-primary"
          size="sm"
          title="Detail"
        >
          Detail
        </b-button>
      </template>
    </b-table>
    <formTambah dispose />
  </div>
</template>

<script>
import { createNamespacedHelpers } from 'vuex'
import formTambah from '~/components/asdos/formTambahLaporan'
const { mapState, mapActions, mapMutations } = createNamespacedHelpers('asdos')

export default {
  // validate ({ params, store }) {
  //   // Check if `params.id` is an existing category
  //   return store.state.categories.some(category => category.id === params.id)
  // },
  components: {
    formTambah
  },
  async fetch ({ store, params }) {
    await store.dispatch('asdos/GET_DETAIL_PERKULIAHAN', params.id)
  },
  data () {
    return {
      // perkuliahan: this.$store.state.asdos.perkuliahan.list[0].jadwal,
      thead: [
        {
          key: 'ke',
          label: 'Pertemuan Ke',
          sortable: true
        },
        {
          key: 'tgl',
          label: 'Tanggal',
          sortable: true
        },
        {
          key: 'materi',
          label: 'Materi',
          sortable: true
        },
        {
          key: 'status',
          label: 'Status',
          sortable: true
        },
        {
          key: 'aksi',
          label: 'Aksi'
        }
      ]
    }
  },
  computed: {
    ...mapState({
      perkuliahan: state => state.detail
    })
  },
  methods: {
    ...mapActions({
      getData: 'GET_DETAIL_PERKULIAHAN',
      mulaiPerkuliahan: 'MULAI_PERKULIAHAN'
    }),
    ...mapMutations({
      detail: 'SET_DETAIL_ID'
    }),
    cekData (data) {
      return (data !== '') ? data : '-'
    }
  }
}
</script>

<style lang="css" scoped>
</style>
