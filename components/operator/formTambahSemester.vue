<template>
  <div>
    <b-modal id="modalTambah" title="Tambah Semester" @show="reset" @hidden="reset">
      <!-- {{ form }} -->
      <p class="my-4">
        <b-form id="formTambah" ref="form">
          <b-form-group :state="check.semester" invalid-feedback="Harap Pilih Semester" label="Semester :" label-for="form-semester">
            <b-form-select
              id="form-semester"
              ref="semester"
              v-model="form.semester"
              :state="check.semester"
              :options="semester"
              name="semester"
              required
            />
          </b-form-group>
          <b-form-group :state="check.tahun" invalid-feedback="Harap Tahun Ajar" label="Tahun :" label-for="form-tahun">
            <b-form-select
              id="form-tahun"
              ref="tahun"
              v-model="form.tahun"
              :state="check.tahun"
              :options="tahun"
              name="tahun"
              required
            />
          </b-form-group>
          <b-form-group :state="check.status" invalid-feedback="Harap Pilih Status" label="Status :" label-for="form-status">
            <b-form-select
              id="form-status"
              ref="status"
              v-model="form.status"
              :state="check.status"
              :options="status"
              name="status"
              required
            />
          </b-form-group>
        </b-form>
      </p>
      <template v-slot:modal-footer>
        <b-button
          variant="primary"
          size="sm"
          class="float-right"
          @click="tambah"
        >
          Tambah
        </b-button>
        <b-button
          size="sm"
          class="float-right"
          @click="$bvModal.hide('modalTambah')"
        >
          Batal
        </b-button>
      </template>
      <b-alert
        ref="alert"
        v-model="alert"
        variant="danger"
        dismissible
        fade
        @dismissed="alert=false"
      >
        Data Gagal di Input. Harap periksa kembali.
      </b-alert>
    </b-modal>
  </div>
</template>

<script>
// import { mapActions } from 'vuex'

export default {
  data () {
    return {
      form: {
        semester: null,
        tahun: null,
        status: null
      },
      check: {
        semester: null,
        tahun: null,
        status: null
      },
      search: '',
      // Form
      semester: this.$store.state.operator.semester,
      tahun: this.$store.state.operator.tahun,
      status: this.$store.state.operator.status,
      alert: false
    }
  },
  methods: {
    reset () {
      this.form.semester = null
      this.form.tahun = null
      this.form.status = null
      this.check.semester = null
      this.check.tahun = null
      this.check.status = null
    },
    async tambah ({ dispatch }) {
      if (!this.checkFormValidity()) { return }
      await this.$store.dispatch('operator/TAMBAH_SEMESTER', this.form)
      if (this.$store.state.operator.msg.status === 'error') {
        this.msg()
        return
      }
      this.$parent.setData()
      this.$nextTick(() => {
        this.$bvModal.hide('modalTambah')
      })
      this.alert = false
    },
    checkFormValidity () {
      const valid = this.$refs.form.checkValidity()
      this.form.semester === null ? this.check.semester = false : this.check.semester = true
      this.form.tahun === null ? this.check.tahun = false : this.check.tahun = true
      this.form.status === null ? this.check.status = false : this.check.status = true
      return valid
    },
    msg () {
      this.alert = true
    }
  }
  // asyncData ({ context }) {
  //   return { user: 'context.app.$store.state.admin.editUser' }
  // }
  // async fetch ({ store, params }) {
  //   await store.dispatch('admin/GET_STARS')
  // }
}
</script>

<style scoped>

</style>
