<template>
  <div class="container">
    <b-form id="formLogin" ref="form" @submit.prevent="login">
      <b-form-group invalid-feedback="Harap Isi Username" label-for="form-id_user">
        <b-form-input
          ref="id_user"
          v-model="form.username"
          type="text"
          placeholder="Masukkan Username"
          required
        />
      </b-form-group>
      <b-form-group invalid-feedback="harap Isi Passowrd" label-for="form-password">
        <b-form-input
          ref="password"
          v-model="form.password"
          type="password"
          placeholder="Masukkan Password"
          required
        />
      </b-form-group>
      <b-form-group>
        <b-button type="submit">
          Login
        </b-button>
      </b-form-group>
    </b-form>
  </div>
</template>

<script>
const cookie = process.client ? require('js-cookie') : undefined

export default {
  middleware: 'notAuthenticated',
  data () {
    return {
      form: {
        username: null,
        password: null
      },
      msg: null
    }
  },
  methods: {
    async login () {
      const exp = new Date(new Date().getTime() + 60 * 60 * 1000)
      const res = await this.$store.dispatch('LOGIN', this.form)
      if (res.status === 'success') {
        // const role = res.data.role
        const token = await res.data.token.split('.')
        // cookie.set('x-access-token', 'Ayam ' + res.data.token + ' Bebek', { expires: exp })
        await cookie.set('token', 'Ayam ' + token[0] + ' Bebek', { expires: exp })
        await cookie.set('x', 'Ayam ' + token[2] + ' Bebek', { expires: exp })
        await cookie.set('access', 'Ayam ' + token[1] + ' Bebek', { expires: exp })
        await this.$store.dispatch('ME', token[2] + '.' + token[1] + '.' + token[0])
        // switch (role) {
        //   case 'Admin':
        //     this.msg = res.msg
        //     this.$router.push('/admin')
        //     break
        //   case 'Operator':
        //     return this.$router.push('/operator')
        //   case 'Dosen':
        //     return this.$router.push('/dosen')
        //   case 'Akademik':
        //     this.$router.push('/akademik')
        //     break
        //   case 'Keuangan':
        //     this.$router.push('/keuangan')
        //     break
        //   case 'Asdos':
        //     this.$router.replace('/asdos')
        //     break
        //   default:
        //     this.$router.push('/')
        //     break
        // }
      } else {
        this.msg = res.msg
      }
    }
    // redirect ({ res, role }) {
    //   switch (role) {
    //     case 'Admin':
    //       this.msg = res.msg
    //       this.$router.push('/admin')
    //       break
    //     case 'Operator':
    //       return this.$router.push('/operator')
    //     case 'Dosen':
    //       return this.$router.push('/dosen')
    //     case 'Akademik':
    //       this.$router.push('/akademik')
    //       break
    //     case 'Keuangan':
    //       this.$router.push('/keuangan')
    //       break
    //     case 'Asdos':
    //       this.$router.replace('/asdos')
    //       break
    //     default:
    //       this.$router.push('/')
    //       break
    //   }
    // }
  }
}
</script>

<style>
.container {
  margin: 0 auto;
  min-height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  text-align: center;
}

.title {
  font-family: 'Quicksand', 'Source Sans Pro', -apple-system, BlinkMacSystemFont,
    'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif;
  display: block;
  font-weight: 300;
  font-size: 100px;
  color: #35495e;
  letter-spacing: 1px;
}

.subtitle {
  font-weight: 300;
  font-size: 42px;
  color: #526488;
  word-spacing: 5px;
  padding-bottom: 15px;
}

.links {
  padding-top: 15px;
}
</style>
