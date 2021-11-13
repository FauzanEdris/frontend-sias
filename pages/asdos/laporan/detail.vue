<template>
  <div>
    Detail Kegiatan<br>
    <!-- {{ $store.state.asdos.detail }}
    {{ perkuliahan }} -->
    <button @click="getData">
      aaa
    </button>
  </div>
</template>

<script>
import { createNamespacedHelpers } from 'vuex'
const { mapState, mapActions, mapMutations } = createNamespacedHelpers('asdos')

export default {
  // middleware: {},
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
      perkuliahan: state => state.perkuliahan.list[0].jadwal
    })
  },
  async fetch ({ store, params }) {
    await store.dispatch('asdos/GET_DETAIL_PERKULIAHAN')
  },
  methods: {
    ...mapActions({
      getData: 'GET_DETAIL_PERKULIAHAN',
      mulaiPerkuliahan: 'MULAI_PERKULIAHAN'
    }),
    ...mapMutations({
      detail: 'SET_DETAIL_ID'
    })
  }
}
</script>

<style lang="css" scoped>
</style>
