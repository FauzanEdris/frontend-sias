<template>
  <div>
    <b-form id="formPendaftaran" ref="form" @submit.prevent="$parent.daftar({status: 'Staff', form})" autocomplete="off">
      <b-form-group invalid-feedback="Harap Isi NIK" label="NIK :" label-for="form-id_user">
        <b-form-input
          ref="id_user"
          v-model="form.id"
          type="number"
          placeholder="NIM"
          required
        />
      </b-form-group>
      <b-form-group invalid-feedback="Harap Isi Nama" label="Nama :" label-for="form-nama">
        <b-form-input
          ref="nama"
          v-model="form.nama"
          type="text"
          placeholder="Nama"
          required
        />
      </b-form-group>
      <b-form-group invalid-feedback="Harap Isi Rekomendasi Dosen" label="Dosen :" label-for="form-dosen">
        <b-form-input
          ref="dosen"
          @change="$parent.cariDosen($parent.form.dosen)"
          v-model="$parent.form.dosen"
          list="form-nama_dosen"
          type="text"
          placeholder="Dosen"
          required
        />
        <datalist id="form-nama_dosen">
          <option v-for="namaDosen in nama_dosen" v-bind:key="namaDosen">
            {{ namaDosen }}
          </option>
        </datalist>
      </b-form-group>
      <b-form-group invalid-feedback="Harap Isi Email" label="Email :" label-for="form-email">
        <b-form-input
          ref="email"
          v-model="form.email"
          type="email"
          placeholder="Email"
          required
        />
      </b-form-group>
      <b-form-group>
        <b-button type="submit" class="text-center">
          BEBEK
        </b-button>
      </b-form-group>
    </b-form>
  </div>
</template>

<script>
export default {
  data () {
    return {
      form: {
        id: null,
        nama: null,
        email: null
      },
      nama_dosen: this.$store.state.pendaftaran.nama_dosen
    }
  }
}
</script>

<style scoped>
</style>
