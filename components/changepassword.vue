<template>
  <div>
    <button v-b-modal.modalPassword class="btn btn-primary">
      Change Password
    </button>
    <b-modal
      id="modalPassword"
      ref="modal"
      title="Change Password"
      @show="resetModal"
      @hidden="resetModal"
      @ok="handleOk"
    >
      <form ref="form" @submit.stop.prevent="handleSubmit">
        <b-form-group
          label="Enter your Old Password"
          label-for="old_password"
          invalid-feedback="Password is required"
        >
          <b-form-input
            id="old_password"
            v-model="change_password.old_password"
            type="password"
            required
          />
        </b-form-group>
        <b-form-group
          label="Enter your New Password"
          label-for="new_password"
          invalid-feedback="Password is required"
        >
          <b-form-input
            id="new_password"
            v-model="change_password.new_password"
            type="password"
            required
          />
        </b-form-group>
        <b-form-group
          label="Re-type your New Password"
          label-for="confirm_password"
          invalid-feedback="Password is required"
          :state="state"
        >
          <b-form-input
            id="confirm_password"
            v-model="change_password.confirm_password"
            :state="state"
            type="password"
            required
          />
        </b-form-group>
      </form>
    </b-modal>
  </div>
</template>

<script>
export default {
  data () {
    return {
      change_password: {
        old_password: '',
        new_password: '',
        confirm_password: ''
      }
    }
  },
  computed: {
    state () {
      return this.change_password.confirm_password.length >= 8
    }
  },
  methods: {
    resetModal () {
      // do something
    },
    async handleOk () {
      // handle ok, do something
      await this.$store.dispatch('profile/UPDATE_PASSWORD', this.change_password)
      console.log(this.$store.state.profile.msg.status)
      if (this.$store.state.profile.msg.status === 'error') {
        // this.msg()
        return
      }
      // this.setData()
      this.$nextTick(() => {
        this.$bvModal.hide('modalPassword')
      })
      // this.alert = false
    }
  }
}
</script>

<style>
</style>
