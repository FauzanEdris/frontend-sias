<template>
  <div>
    <b-modal id="modalEdit" title="Edit User">
      {{ form }}
      <p class="my-4">
        <b-form id="formEdit" ref="form">
          <b-form-group :state="check.id_user" invalid-feedback="Harap Isi NIM / NIK" label="NIM/NIK :" label-for="form-id_user">
            <b-form-input
              id="form-id_user"
              ref="id_user"
              v-model="form.id_user"
              :state="check.id_user"
              type="text"
              required
              readonly
              placeholder="NIM / NIK"
            />
          </b-form-group>
          <b-form-group :state="check.nama" invalid-feedback="Harap Isi Nama" label="Nama :" label-for="form-nama">
            <b-form-input
              ref="nama"
              v-model="form.nama"
              :state="check.nama"
              type="text"
              placeholder="Nama"
              required
            />
          </b-form-group>
          <b-form-group :state="check.role" invalid-feedback="Harap Pilih Role" label="Role :" label-for="form-role">
            <b-form-select
              id="form-role"
              ref="role"
              v-model="form.role"
              :state="check.role"
              :options="role"
              name="role"
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
          <b-form-group :state="check.email" invalid-feedback="Harap Isi Email" label="Email :" label-for="form-email">
            <b-form-input
              id="form-email"
              ref="email"
              v-model="form.email"
              :state="check.email"
              name="email"
              type="email"
              required
              placeholder="Email"
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
// import { mapActions } from 'vuex'

export default {
  data () {
    return {
      role: this.$store.state.admin.role,
      status: this.$store.state.admin.status,
      form: {
        // id: this.$store.state.admin.editUser.id,
        // id_user: this.$store.state.admin.editUser.id_user,
        nama: this.$store.state.admin.editUser.nama,
        role: this.$store.state.admin.editUser.role
        // status: this.$store.state.admin.editUser.status,
        // email: this.$store.state.admin.editUser.email
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
  // computed: {
  //   user () {
  //     return this.$store.state.admin.editUser
  //   }
  // // //   ...mapActions({
  // // //     user: '/admin/UPDATE_USER'
  // // //   })
  // // //   user: {
  // // //     get () {
  // // //       return this.$store.state.admin.editUser
  // // //     },
  // // //     set () {
  // // //       return this.$store.dispatch('/admin/UPDATE_USER', this.user)
  // // //     }
  // // //   }
  // },
  // asyncData () {
  //   return {
  //     form: {
  //       nama: true
  //     }
  //   }
  // },
  async created () {
    await this.set()
  },
  beforeDestroy () {
    return this.reset()
  },
  methods: {
    async set () {
      this.form.id = await this.$store.state.admin.editUser.id
      this.form.id_user = await this.$store.state.admin.editUser.id_user
      this.form.nama = await this.$store.state.admin.editUser.nama
      this.form.role = await this.$store.state.admin.editUser.role
      this.form.status = await this.$store.state.admin.editUser.status
      this.form.email = await this.$store.state.admin.editUser.email
    },
    update () {
      this.$store.commit('admin/UPDATE_USER', this.form.nama)
    },
    reset () {
      return {
        role: this.$store.state.admin.role,
        status: this.$store.state.admin.status,
        form: {
          id: null,
          id_user: null,
          nama: null,
          role: null,
          status: null,
          email: null
        }
      }
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
