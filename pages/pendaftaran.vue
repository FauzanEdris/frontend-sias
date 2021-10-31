<template>
  <div class="container">
    <b-card class="card">
      <b-card-header header-tag="nav" is-nav>
        <b-img src="~/static/logo.png" class="image" fluid alt="Stikom Logo" />
        <b-nav card-header tabs fill>
          <b-nav-item to="/pendaftaran" exact exact-active-class="active">
            Mahasiswa
          </b-nav-item>
          <b-nav-item to="/pendaftaran/staff" exact exact-active-class="active">
            Staff
          </b-nav-item>
        </b-nav>
      </b-card-header>
      <b-card-body class="text-left">
        <nuxt-child />
      </b-card-body>
      <b-alert
        ref="alert"
        v-model="alert"
        :variant="$store.state.pendaftaran.msg.status === 'success' ? 'success' : 'danger'"
        dismissible
        fade
        @dismissed="alert=false"
      >
        {{ $store.state.pendaftaran.msg.msg }}
      </b-alert>
    </b-card>
  </div>
</template>

<script>
export default {
  middleware: 'pendaftaran',
  async fetch ({ store, params }) {
    await store.dispatch('pendaftaran/GET_DOSEN')
  },
  data () {
    return {
      form: {
        dosen: '',
        _id_dosen: null,
        id_dosen: null
      },
      alert: false,
      variant_alert: 'danger'
    }
  },
  methods: {
    async setForm () {
      this.form.dosen = await ''
      this.form._id_dosen = await ''
      this.form.id_dosen = await ''
    },
    async cariDosen (data) {
      if (data !== '') {
        await this.$store.dispatch('pendaftaran/DOSEN', data)
        if (this.$store.state.operator.prePendaftaran !== null) {
          this.form.dosen = await this.$store.state.pendaftaran.prePendaftaran.nama
          this.form._id_dosen = await this.$store.state.pendaftaran.prePendaftaran._id
          this.form.id_dosen = await this.$store.state.pendaftaran.prePendaftaran.id
        } else {
          await this.setForm()
        }
      } else {
        this.setForm()
      }
    },
    async daftar (data) {
      const file = await data.form.transkip
      const dataFile = new FormData()
      await dataFile.append('transkip', file)
      const req = {
        status: data.status,
        form: {
          id: data.form.id,
          nama: data.form.nama,
          transkip: dataFile,
          email: data.form.email,
          dosen: this.form.dosen,
          _id_dosen: this.form._id_dosen,
          id_dosen: this.form.id_dosen
        }
      }
      await this.$store.dispatch('pendaftaran/DAFTAR', req)
      this.alert = true
    }
  }
}
</script>

<style scoped>
.container {
  margin: 0% auto;
  min-height: 100vh;
  display: flex;
  width: 50%;
  justify-content: center;
  align-items: center;
  text-align: center;
}

.image {
  width: 30%;
  margin-bottom: 10px;
}

/* .card {
  width: 50%;
  border: 0px;
} */
</style>
