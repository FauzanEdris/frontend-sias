<template>
  <div>
    Laporan Kegiatan<br>
    <b-button
      v-if="perkuliahan === null"
      variant="primary"
      size="sm"
      title="Polling"
      @click="mulaiPerkuliahan"
    >
      Mulai Perkuliahan
    </b-button>
    <div v-else>
      <b-table
        id="tableUser"
        :items="perkuliahan"
        :fields="thead"
        striped
        hover
        responsive
      >
        <template v-slot:cell(aksi)="data">
          <!-- {{ data }} -->
          <!-- <nuxt-link to="laporan/detail"> -->
          <nuxt-link :to="{ name: 'asdos-laporan-id', params: { id: data.item._id } }">
            <b-button
              variant="outline-primary"
              size="sm"
              title="Detail"
            >
              Detail
            </b-button>
          </nuxt-link>
        </template>
      </b-table>
    </div>
  </div>
</template>

<script scoped>
import { createNamespacedHelpers } from 'vuex'
const { mapState, mapActions } = createNamespacedHelpers('asdos')

export default {
  async fetch ({ store, params }) {
    await store.dispatch('asdos/GET_PERKULIAHAN')
  },
  data () {
    return {
      // perkuliahan: this.$store.state.asdos.perkuliahan.list[0].jadwal,
      thead: [
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
          key: 'nama_dosen',
          label: 'Nama Dosen',
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
      perkuliahan: state => state.perkuliahan.list
    })
  },
  methods: {
    // setData () {
    //   // await this.$store.dispatch('asdos/GET_PERKULIAHAN')
    //   this.getData()
    //   this.perkuliahan = this.$store.state.asdos.perkuliahan.list
    // },
    // async mulaiPerkuliahan () {
    //   await this.$store.dispatch('asdos/MULAI_PERKULIAHAN')
    // },
    ...mapActions({
      // getData: 'asdos/GET_PERKULIAHAN',
      mulaiPerkuliahan: 'MULAI_PERKULIAHAN'
    })
  }
}
</script>

<style lang="css" scoped>
</style>
