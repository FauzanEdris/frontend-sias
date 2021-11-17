<template>
  <div>
    Home <br>
    <!-- {{ listSemester }} <br> -->
    <!-- {{ this.$store.getters['operator/listSemester'] }} -->
    <b-navbar>
      <b-navbar-nav>
        <b-nav-form>
          <b-button
            v-b-modal.modalTambah
            class="mr-2"
            variant="success"
            size="sm"
            title="Tambah User"
          >
            Tambah User
          </b-button>
        </b-nav-form>
      </b-navbar-nav>
      <b-navbar-nav class="ml-auto">
        <b-nav-form>
          <b-pagination
            v-model="currentPage"
            :total-rows="rows"
            :per-page="perPage"
            aria-controls="tableUser"
            align="right"
          />
        </b-nav-form>
      </b-navbar-nav>
    </b-navbar>
    <b-table
      id="tableUser"
      :items="listSemester"
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
        <b-button variant="outline-warning" size="sm" title="Edit User" @click="data.toggleDetails">
          Edit
        </b-button>
        <b-button variant="outline-danger" size="sm" title="Delete User" @click="hapus(data.item.id)">
          Delete
        </b-button>
      </template>
      <template v-slot:row-details="data">
        <b-card>
          <b-row class="mb-2">
            <b-col sm="3" class="text-sm-right">
              <b>Status Semester:</b>
            </b-col>
            <b-col>
              <b-form-checkbox v-model="data.item.status" name="check-button" switch @change="statusSemester({ id: data.item.id, status: data.item.status })">
                <div v-if="data.item.status === true">
                  <span class="text-success">&bull; Active</span>
                </div>
                <div v-if="data.item.status === false">
                  <span class="text-danger">&bull; Inactive</span>
                </div>
              </b-form-checkbox>
            </b-col>
          </b-row>

          <b-row class="mb-2">
            <b-col sm="3" class="text-sm-right">
              <b>Status Jadwal:</b>
            </b-col>
            <b-col>
              <b-form-checkbox v-model="data.item.status_jadwal_asdos" :disabled="data.item.status === true ? false : true" name="check-button" switch @change="statusJadwalAsdos({ id: data.item.id, status: data.item.status_jadwal_asdos })">
                <div v-if="data.item.status_jadwal_asdos === true">
                  Asdos <span class="text-success">&bull; Active</span>
                </div>
                <div v-if="data.item.status_jadwal_asdos === false">
                  Asdos <span class="text-danger">&bull; Inactive</span>
                </div>
              </b-form-checkbox>
            </b-col>

            <b-col>
              <b-form-checkbox v-model="data.item.status_jadwal_dosen" :disabled="data.item.status === true ? false : true" name="check-button" switch @change="statusJadwalDosen({ id: data.item.id, status: data.item.status_jadwal_dosen })">
                <div v-if="data.item.status_jadwal_dosen === true">
                  Dosen <span class="text-success">&bull; Active</span>
                </div>
                <div v-if="data.item.status_jadwal_dosen === false">
                  Dosen <span class="text-danger">&bull; Inactive</span>
                </div>
              </b-form-checkbox>
            </b-col>
          </b-row>

          <b-row class="mb-2">
            <b-col sm="3" class="text-sm-right">
              <b>Upload Jadwal:</b>
            </b-col>
            <b-col>
              <b-form-file
                id="file"
                ref="file"
                :disabled="data.item.status === true ? false : true"
                class="mt-3"
                accept=".csv"
                plain
                @change="uploadJadwal"
              /> <br>
              <b-alert
                ref="alert"
                :show="alertTime"
                variant="success"
                dismissible
                fade
                @dismissed="alertTime=0"
              >
                {{ msg }}
              </b-alert>
            </b-col>
          </b-row>

          <b-row class="mb-2">
            <b-col sm="3" class="text-sm-right">
              <b>Status Pendaftaran:</b>
            </b-col>
            <b-col>
              <b-form-checkbox v-model="data.item.status_pendaftaran" :disabled="data.item.status === true ? false : true" name="check-button" switch @change="statusPendaftaran({ id: data.item.id, status: data.item.status_pendaftaran })">
                <div v-if="data.item.status_pendaftaran === true">
                  <span class="text-success">&bull; Active</span>
                </div>
                <div v-if="data.item.status_pendaftaran === false">
                  <span class="text-danger">&bull; Inactive</span>
                </div>
              </b-form-checkbox>
            </b-col>
          </b-row>

          <b-button size="sm" @click="data.toggleDetails">
            Hide Details
          </b-button>
        </b-card>
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
          :total-rows="rows"
          :per-page="perPage"
          aria-controls="tableUser"
          align="right"
        />
      </b-nav-form>
    </b-navbar>
    <!-- --
    FORM TAMBAH
    -- -->
    <formTambah dispose />
  </div>
</template>
<script>
import formTambah from '~/components/operator/formTambahSemester'
export default {
  components: {
    formTambah
  },
  async fetch ({ store, params }) {
    await store.dispatch('operator/GET_SEMESTER')
  },
  data () {
    return {
      showDetails: true,
      rows: this.$store.state.operator.totalSemester,
      perPage: 5,
      currentPage: 1,
      thead: [
        {
          key: 'tahun',
          label: 'Tahun',
          sortable: true
        },
        {
          key: 'semester',
          label: 'Semester',
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
      ],
      listSemester: this.$store.state.operator.listSemester,
      interval: null,
      search: '',
      alertTime: 0,
      alertStop: 5,
      msg: this.$store.state.operator.msg.msg
      // checked: this.$store.state.operator.listSemester.status
    }
  },
  methods: {
    async setData () {
      await this.$store.dispatch('operator/GET_SEMESTER')
      this.listSemester = await this.$store.state.operator.listSemester
      this.rows = await this.$store.state.operator.totalSemester
    },
    async setStatus () {
      await this.$store.dispatch('operator/GET_SEMESTER')
      this.listSemester = await this.$store.state.operator.listSemester
    },
    async statusSemester (req) {
      const data = {
        id: req.id,
        status: !req.status
      }
      await this.$store.dispatch('operator/STATUS_SEMESTER', data)
      this.setStatus()
    },
    async statusJadwalAsdos (req) {
      const data = {
        id: req.id,
        status: !req.status
      }
      await this.$store.dispatch('operator/STATUS_JADWAL_ASDOS', data)
      // this.setStatus()
    },
    async statusJadwalDosen (req) {
      const data = {
        id: req.id,
        status: !req.status
      }
      await this.$store.dispatch('operator/STATUS_JADWAL_DOSEN', data)
      // this.setStatus()
    },
    async statusPendaftaran (req) {
      const data = {
        id: req.id,
        status: !req.status
      }
      await this.$store.dispatch('operator/STATUS_PENDAFTARAN', data)
      // this.setStatus()
    },
    async uploadJadwal (e) {
      const file = await e.target.files[0]
      const data = new FormData()
      await data.append('jadwal', file)
      await this.$store.dispatch('operator/UPLOAD_JADWAL', data)
      this.msg = this.$store.state.operator.msg.msg
      this.alert()
      this.$refs.file.reset()
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
          this.$store.dispatch('operator/DELETE_SEMESTER', data)
          this.setData()
        }
      })
    },
    alert () {
      this.alertTime = this.alertStop
    },
    alertTimer (alertStop) {
      this.alertStop = alertStop
    }
  }
}
</script>

<style lang="css" scoped>
</style>
