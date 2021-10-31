<template>
  <div>
    <b-modal id="modalEdit" title="Edit User" @show="set" @hidden="reset">
      <!-- {{ this.$store.state.operator.editJadwal }} <br> -->
      <!-- {{ form }} -->
      <!-- {{ form.id_asdos }} -->
      <!-- {{ form.nama_asdos }} -->
      <p class="my-4">
        <b-form id="formEdit" ref="form">
          <b-form-group label="No. :" label-for="form-no">
            <b-form-input
              id="form-no"
              ref="no"
              v-model="form.no"
              type="text"
              placeholder="No."
              readonly
            />
          </b-form-group>
          <b-form-group label="Hari :" label-for="form-hari">
            <b-form-input
              id="form-hari"
              ref="hari"
              v-model="form.hari"
              type="text"
              placeholder="Hari"
            />
          </b-form-group>
          <b-form-group label="Jam Kuliah :" label-for="form-jam_kuliah">
            <b-form-input
              id="form-jam_kuliah"
              ref="jam_kuliah"
              v-model="form.jam_kuliah"
              type="text"
              placeholder="Jam Kuliah"
            />
          </b-form-group>
          <b-form-group label="Kode Matakuliah :" label-for="form-kode_mk">
            <b-form-input
              id="form-kode_mk"
              ref="kode_mk"
              v-model="form.kode_mk"
              type="text"
              placeholder="Kode Matakuliah"
            />
          </b-form-group>
          <b-form-group label="Nama Matakuliah :" label-for="form-nama_mk">
            <b-form-input
              id="form-nama_mk"
              ref="nama_mk"
              v-model="form.nama_mk"
              type="text"
              placeholder="Nama Matakuliah"
            />
          </b-form-group>
          <b-form-group label="SKS :" label-for="form-sks">
            <b-form-input
              id="form-sks"
              ref="sks"
              v-model="form.sks"
              type="text"
              placeholder="SKS"
            />
          </b-form-group>
          <b-form-group label="Kelas :" label-for="form-kelas">
            <b-form-input
              id="form-kelas"
              ref="kelas"
              v-model="form.kelas"
              type="text"
              placeholder="Kelas"
            />
          </b-form-group>
          <b-form-group label="Ruangan :" label-for="form-ruangan">
            <b-form-input
              id="form-ruangan"
              ref="ruangan"
              v-model="form.ruangan"
              type="text"
              placeholder="Ruangan"
            />
          </b-form-group>
          <b-form-group label="Semester :" label-for="form-smt">
            <b-form-input
              id="form-smt"
              ref="smt"
              v-model="form.smt"
              type="text"
              placeholder="Semester"
            />
          </b-form-group>
          <b-form-group label="Nama Dosen :" label-for="form-nama_dosen">
            <b-form-input
              id="form-nama_dosen"
              ref="nama_dosen"
              v-model="form.nama_dosen"
              type="text"
              placeholder="Nama Dosen"
            />
          </b-form-group>
          <b-form-group label="Peserta :" label-for="form-peserta">
            <b-form-input
              id="form-peserta"
              ref="peserta"
              v-model="form.peserta"
              type="text"
              placeholder="Peserta"
            />
          </b-form-group>
          <b-form-group label="Kurikulum :" label-for="form-kurikulum">
            <b-form-input
              id="form-kurikulum"
              ref="kurikulum"
              v-model="form.kurikulum"
              type="text"
              placeholder="Kurikulum"
            />
          </b-form-group>
          <b-form-group label="Jumlah Pertemuan :" label-for="form-jml_pertemuan">
            <b-form-input
              id="form-jml_pertemuan"
              ref="jml_pertemuan"
              v-model="form.jml_pertemuan"
              type="text"
              placeholder="Jumlah Pertemuan"
            />
          </b-form-group>
          <b-form-group label="Konsentrasi :" label-for="form-konsentrasi">
            <b-form-input
              id="form-konsentrasi"
              ref="konsentrasi"
              v-model="form.konsentrasi"
              type="text"
              placeholder="Konsentrasi"
            />
          </b-form-group>
          <b-form-group label="Waktu Kelas :" label-for="form-waktu_kelas">
            <b-form-input
              id="form-waktu_kelas"
              ref="waktu_kelas"
              v-model="form.waktu_kelas"
              type="text"
              placeholder="Waktu Kelas"
            />
          </b-form-group>
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
      id_asdos: this.$store.state.operator.asdos.id,
      nama_asdos: this.$store.state.operator.asdos.nama,
      form: {
        id: null,
        no: null,
        hari: null,
        jam_kuliah: null,
        kode_mk: null,
        nama_mk: null,
        sks: null,
        kelas: null,
        ruangan: null,
        smt: null,
        nama_dosen: null,
        peserta: null,
        kurikulum: null,
        jml_pertemuan: null,
        konsentrasi: null,
        waktu_kelas: null,
        nama_asdos: null,
        _id_asdos: null,
        id_asdos: null,
        status_asdos: null,
        email_asdos: null
      },
      check: {
        id: null,
        id_user: null,
        nama: null,
        role: null,
        status: null,
        email: null
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
      if (this.$store.state.operator.editJadwal !== null) {
        this.form.id = this.$store.state.operator.editJadwal._id
        this.form.no = this.$store.state.operator.editJadwal.no
        this.form.hari = this.$store.state.operator.editJadwal.hari
        this.form.jam_kuliah = this.$store.state.operator.editJadwal.jam_kuliah
        this.form.kode_mk = this.$store.state.operator.editJadwal.kode_mk
        this.form.nama_mk = this.$store.state.operator.editJadwal.nama_mk
        this.form.sks = this.$store.state.operator.editJadwal.sks
        this.form.kelas = this.$store.state.operator.editJadwal.kelas
        this.form.ruangan = this.$store.state.operator.editJadwal.ruangan
        this.form.smt = this.$store.state.operator.editJadwal.smt
        this.form.nama_dosen = this.$store.state.operator.editJadwal.nama_dosen
        this.form.peserta = this.$store.state.operator.editJadwal.peserta
        this.form.kurikulum = this.$store.state.operator.editJadwal.kurikulum
        this.form.jml_pertemuan = this.$store.state.operator.editJadwal.jml_pertemuan
        this.form.konsentrasi = this.$store.state.operator.editJadwal.konsentrasi
        this.form.waktu_kelas = this.$store.state.operator.editJadwal.waktu_kelas
        this.form.nama_asdos = this.$store.state.operator.editJadwal.nama_asdos
        this.form._id_asdos = this.$store.state.operator.editJadwal._id_asdos
        this.form.id_asdos = this.$store.state.operator.editJadwal.id_asdos
        this.form.status_asdos = this.$store.state.operator.editJadwal.status_asdos
        this.form.email_asdos = this.$store.state.operator.editJadwal.email_asdos
      }
    },
    async update () {
      await this.$store.dispatch('operator/UPDATE_JADWAL', { id: this.$store.state.operator.listJadwal.id, body: this.form })
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
        await this.$store.dispatch('operator/ID_ASDOS', data)
        if (this.$store.state.operator.preEditJadwal !== null) {
          this.form.nama_asdos = this.$store.state.operator.preEditJadwal.nama
          this.form._id_asdos = this.$store.state.operator.preEditJadwal._id
          this.form.id_asdos = this.$store.state.operator.preEditJadwal.id
          this.form.status_asdos = this.$store.state.operator.preEditJadwal.status
          this.form.email_asdos = this.$store.state.operator.preEditJadwal.email
        } else {
          this.setForm()
        }
      } else {
        this.setForm()
      }
    },
    async cariNamaAsdos (data) {
      if (data !== '') {
        await this.$store.dispatch('operator/NAMA_ASDOS', data)
        if (this.$store.state.operator.preEditJadwal !== null) {
          this.form.nama_asdos = this.$store.state.operator.preEditJadwal.nama
          this.form._id_asdos = this.$store.state.operator.preEditJadwal._id
          this.form.id_asdos = this.$store.state.operator.preEditJadwal.id
          this.form.status_asdos = this.$store.state.operator.preEditJadwal.status
          this.form.email_asdos = this.$store.state.operator.preEditJadwal.email_asdos
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
