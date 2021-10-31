<template>
  <div>
    Laporan Kegiatan<br>
    {{ perkuliahan }}
    <b-button
      v-if="perkuliahan === null"
      @click="mulaiPerkuliahan"
      variant="primary"
      size="sm"
      title="Polling"
    >
      Mulai Perkuliahan
    </b-button>
    <div v-else>
      <!-- <b-navbar>
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
      </b-navbar> -->
      <b-table
        id="tableUser"
        :items="perkuliahan"
        :fields="thead"
        striped
        hover
        responsive
      >
        <template v-slot:cell(aksi)>
          <nuxt-link to="laporan/detail">
            <b-button
              variant="outline-primary"
              size="sm"
              title="Polling"
            >
              Detail
            </b-button>
          </nuxt-link>
        </template>
      </b-table>
      <!-- <b-navbar>
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
      </b-navbar> -->
    </div>
  </div>
</template>

<script>
export default {
  data () {
    return {
      perkuliahan: this.$store.state.asdos.perkuliahan.list[0].jadwal,
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
  async fetch ({ store, params }) {
    await store.dispatch('asdos/GET_PERKULIAHAN')
  },
  methods: {
    async setData () {
      await this.$store.dispatch('asdos/GET_PERKULIAHAN')
      this.perkuliahan = this.$store.state.asdos.perkuliahan.list
    },
    async mulaiPerkuliahan () {
      await this.$store.dispatch('asdos/MULAI_PERKULIAHAN')
    }
  }
}
</script>

<style lang="css" scoped>
</style>
