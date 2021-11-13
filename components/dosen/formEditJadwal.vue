<template>
  <div>
    <b-modal id="modalEdit" title="Edit User" @show="set" @hidden="reset">
      {{ form }}
      <p class="my-4">
        <b-form id="formEdit" ref="form">
          <b-form-group label="Nama Asdos :" label-for="form-nama_asdos">
            <b-form-input
              ref="nama_asdos"
              v-model="form.nama_asdos"
              list="form-nama_asdos"
              type="text"
              placeholder="Nama Asdos"
              @change="cariNamaAsdos(form.nama_asdos)"
            />
            <datalist id="form-nama_asdos">
              <option v-for="namaAsdos in nama_asdos" :key="namaAsdos">
                {{ namaAsdos }}
              </option>
            </datalist>
          </b-form-group>
          <b-form-group label="_id_asdos :" label-for="form-_id_asdos" hidden>
            <b-form-input
              id="form-_id_asdos"
              ref="_id_asdos"
              v-model="form._id_asdos"
              type="text"
              placeholder="NIM / NIK"
              hidden
              readonly
            />
          </b-form-group>
          <b-form-group label="NIM/NIK :" label-for="form-id_asdos">
            <b-form-input
              ref="id_asdos"
              v-model="form.id_asdos"
              list="form-id_asdos"
              type="text"
              placeholder="NIM/NIK"
              @change="cariIdAsdos(form.id_asdos)"
            />
            <datalist id="form-id_asdos">
              <option v-for="idAsdos in id_asdos" :key="idAsdos">
                {{ idAsdos }}
              </option>
            </datalist>
          </b-form-group>
          <b-form-group label="Status Asdos :" label-for="form-status_asdos">
            <b-form-checkbox
              id="form-status_asdos"
              ref="status_asdos"
              v-model="form.status_asdos"
              name="status_asdos"
              switch
              disabled
            >
              <div v-if="form.status_asdos === true">
                <span class="text-success">&bull; Active</span>
              </div>
              <div v-if="form.status_asdos === false">
                <span class="text-danger">&bull; Inactive</span>
              </div>
            </b-form-checkbox>
            <!-- form.status_asdos === true ? 'Active' : 'Inactive' -->
          </b-form-group>
          <b-form-group label="Email Asdos :" label-for="form-email_asdos">
            <b-form-input
              id="form-email_asdos"
              ref="email_asdos"
              v-model="form.email_asdos"
              type="text"
              placeholder="Email Asdos"
              readonly
            />
          </b-form-group>
        </b-form>
      </p>
      <template v-slot:modal-footer>
        <div class="w-100">
          <b-button
            form="formEdit"
            variant="primary"
            size="sm"
            class="float-right"
            @click="update"
          >
            Update
          </b-button>
          <b-button
            variant="sencond"
            size="sm"
            class="float-right"
            @click="$bvModal.hide('modalEdit')"
          >
            Cancel
          </b-button>
        </div>
      </template>
    </b-modal>
  </div>
</template>

<script>
export default {
  data () {
    return {
      id_asdos: this.$store.state.dosen.asdos.id,
      nama_asdos: this.$store.state.dosen.asdos.nama,
      form: {
        id: null,
        nama_asdos: null,
        _id_asdos: null,
        id_asdos: null,
        status_asdos: null,
        email_asdos: null,
        sks: null
      }
    }
  },
  async created () {
    await this.set()
  },
  beforeDestroy () {
    return this.reset()
  },
  methods: {
    set () {
      if (this.$store.state.dosen.editJadwal !== null) {
        this.form.id = this.$store.state.dosen.editJadwal._id
        this.form.nama_asdos = this.$store.state.dosen.editJadwal.nama_asdos
        this.form._id_asdos = this.$store.state.dosen.editJadwal._id_asdos
        this.form.id_asdos = this.$store.state.dosen.editJadwal.id_asdos
        this.form.status_asdos = this.$store.state.dosen.editJadwal.status_asdos
        this.form.email_asdos = this.$store.state.dosen.editJadwal.email_asdos
        this.form.sks = this.$store.state.dosen.editJadwal.sks
      }
    },
    async update () {
      await this.$store.dispatch('dosen/UPDATE_JADWAL', { id: this.$store.state.dosen.listJadwal.id, body: this.form })
      await this.$parent.setData()
      this.$nextTick(() => {
        this.$bvModal.hide('modalEdit')
      })
    },
    reset () {
      return {
        form: {
          id: null,
          id_user: null,
          nama: null,
          role: null,
          status: null,
          email: null
        }
      }
    },
    setForm () {
      this.form.nama_asdos = ''
      this.form._id_asdos = ''
      this.form.id_asdos = ''
      this.form.status_asdos = ''
      this.form.email_asdos = ''
    },
    async cariIdAsdos (data) {
      if (data !== '') {
        await this.$store.dispatch('dosen/ID_ASDOS', data)
        if (this.$store.state.dosen.preEditJadwal !== null) {
          this.form.nama_asdos = this.$store.state.dosen.preEditJadwal.nama
          this.form._id_asdos = this.$store.state.dosen.preEditJadwal._id
          this.form.id_asdos = this.$store.state.dosen.preEditJadwal.id
          this.form.status_asdos = this.$store.state.dosen.preEditJadwal.status
          this.form.email_asdos = this.$store.state.dosen.preEditJadwal.email
        } else {
          this.setForm()
        }
      } else {
        this.setForm()
      }
    },
    async cariNamaAsdos (data) {
      if (data !== '') {
        await this.$store.dispatch('dosen/NAMA_ASDOS', data)
        if (this.$store.state.dosen.preEditJadwal !== null) {
          this.form.nama_asdos = this.$store.state.dosen.preEditJadwal.nama
          this.form._id_asdos = this.$store.state.dosen.preEditJadwal._id
          this.form.id_asdos = this.$store.state.dosen.preEditJadwal.id
          this.form.status_asdos = this.$store.state.dosen.preEditJadwal.status
          this.form.email_asdos = this.$store.state.dosen.preEditJadwal.email
        } else {
          this.setForm()
        }
      } else {
        this.setForm()
      }
    }
  }
}
</script>

<style scoped>

</style>
