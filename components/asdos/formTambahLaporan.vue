<template>
  <div>
    <b-modal id="modalTambah" title="Tambah Laporan" @show="reset" @hidden="reset">
      {{ form }}
      <p class="my-4">
        <b-form id="formTambah" ref="form">
          <b-form-group :state="check.ke" invalid-feedback="Harap Pilih Pertemuan" label="Pertemuan Ke :" label-for="form-ke">
            <b-form-select
              id="form-ke"
              v-model="form.ke"
              :options="$store.state.pertemuan"
              :state="check.ke"
              placeholder="Pilih Pertemuan"
              required
            >
              <template #first>
                <b-form-select-option :value="null" disabled>
                  Pilih Pertemuan
                </b-form-select-option>
              </template>
            </b-form-select>
          </b-form-group>
          <b-form-group :state="check.tgl" invalid-feedback="Harap Pilih Tanggal" label="Tanggal :" label-for="form-tanggal">
            <b-form-datepicker
              id="form-tanggal"
              ref="tanggal"
              v-model="form.tgl"
              :state="check.tgl"
              placeholder="Pilih Tanggal"
              locale="id"
              required
              show-decade-nav
            />
          </b-form-group>
          <b-form-group :state="check.materi" invalid-feedback="Harap Masukan Materi" label="Materi :" label-for="form-materi">
            <b-form-textarea
              ref="materi"
              v-model="form.materi"
              type="text"
              :state="check.materi"
              invalid-feedback="Harap Pilih materi"
              placeholder="Masukan Materi"
              required
              no-resize
            />
          </b-form-group>
        </b-form>
      </p>
      <template #modal-footer>
        <!-- <div class="w-100"> -->
        <b-button
          form="formTambah"
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
        <!-- </div> -->
      </template>
    </b-modal>
  </div>
</template>

<script>
import { mapActions } from 'vuex'

export default {
  data () {
    return {
      form: {
        ke: null,
        tgl: null,
        materi: null,
        jml_peserta: null
      },
      check: {
        ke: null,
        tgl: null,
        materi: null,
        jml_peserta: null
      }
    }
  },
  beforeDestroy () {
    // return (this.form = null)
  },
  methods: {
    ...mapActions({
      kirim: 'asdos/TAMBAH_LAPORAN'
    }),
    reset () {
      this.form.ke = null
      this.form.tgl = null
      this.form.materi = null
      this.check.ke = null
      this.check.tgl = null
      this.check.materi = null
    },
    async tambah () {
      if (!this.checkFormValidity()) { return }
      // await this.$store.dispatch('asdos/TAMBAH_LAPORAN', this.form)
      await this.kirim({ data: this.form, params: this.$route.params.id })
      this.$nextTick(() => {
        this.$bvModal.hide('modalTambah')
      })
    },
    checkFormValidity () {
      const valid = this.$refs.form.checkValidity()
      this.form.ke === (null && '') ? this.check.ke = false : this.check.ke = true
      this.form.tgl === null ? this.check.tgl = false : this.check.tgl = true
      this.form.materi === null || this.form.materi === '' ? this.check.materi = false : this.check.materi = true
      return valid
    }
  }
}
</script>

<style scoped>

</style>
