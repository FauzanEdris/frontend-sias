<template>
  <div>
    <b-container class="py-4">
      <b-row>
        <b-col class="mb-3" md="4">
          <b-card>
            <!-- <div class="card-body"> -->
            <div class="d-flex flex-column align-items-center text-center">
              <img
                src="https://bootdey.com/img/Content/avatar/avatar7.png"
                alt="Admin"
                class="rounded-circle"
                width="150"
              >
              <div class="mt-3">
                <script />
                <h3>{{ $store.state.auth.user.nama }}</h3>
                <p class="text-secondary">
                  {{ $store.state.auth.user.id }}
                </p>
                <ChangepasswordComponent />
                <!-- <button class="btn btn-outline-primary">
                      Message
                    </button> -->
              </div>
            </div>
            <!-- </div> -->
          </b-card>
          <b-card class="mt-3">
            <b-list-group flush>
              <b-list-group-item
                class="
                  d-flex
                  justify-content-between
                  align-items-center
                  flex-wrap
                "
              >
                <h6 class="mb-0">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    stroke-width="2"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    class="feather feather-globe mr-2 icon-inline"
                  >
                    <circle cx="12" cy="12" r="10" />
                    <line x1="2" y1="12" x2="22" y2="12" />
                    <path
                      d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"
                    /></svg>Website
                </h6>
                <span class="text-secondary">https://bootdey.com</span>
              </b-list-group-item>
              <b-list-group-item
                class="
                  d-flex
                  justify-content-between
                  align-items-center
                  flex-wrap
                "
              >
                <h6 class="mb-0">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    stroke-width="2"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    class="feather feather-github mr-2 icon-inline"
                  >
                    <path
                      d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22"
                    /></svg>Github
                </h6>
                <span class="text-secondary">bootdey</span>
              </b-list-group-item>
              <b-list-group-item
                class="
                  d-flex
                  justify-content-between
                  align-items-center
                  flex-wrap
                "
              >
                <h6 class="mb-0">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    stroke-width="2"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    class="feather feather-twitter mr-2 icon-inline text-info"
                  >
                    <path
                      d="M23 3a10.9 10.9 0 0 1-3.14 1.53 4.48 4.48 0 0 0-7.86 3v1A10.66 10.66 0 0 1 3 4s-4 9 5 13a11.64 11.64 0 0 1-7 2c9 5 20 0 20-11.5a4.5 4.5 0 0 0-.08-.83A7.72 7.72 0 0 0 23 3z"
                    /></svg>Twitter
                </h6>
                <span class="text-secondary">@bootdey</span>
              </b-list-group-item>
              <b-list-group-item
                class="
                  d-flex
                  justify-content-between
                  align-items-center
                  flex-wrap
                "
              >
                <h6 class="mb-0">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    stroke-width="2"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    class="
                      feather feather-instagram
                      mr-2
                      icon-inline
                      text-danger
                    "
                  >
                    <rect
                      x="2"
                      y="2"
                      width="20"
                      height="20"
                      rx="5"
                      ry="5"
                    />
                    <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
                    <line x1="17.5" y1="6.5" x2="17.51" y2="6.5" /></svg>Instagram
                </h6>
                <span class="text-secondary">bootdey</span>
              </b-list-group-item>
              <b-list-group-item
                class="
                  d-flex
                  justify-content-between
                  align-items-center
                  flex-wrap
                "
              >
                <h6 class="mb-0">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    stroke-width="2"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    class="
                      feather feather-facebook
                      mr-2
                      icon-inline
                      text-primary
                    "
                  >
                    <path
                      d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"
                    /></svg>Facebook
                </h6>
                <span class="text-secondary">bootdey</span>
              </b-list-group-item>
            </b-list-group>
          </b-card>
        </b-col>
        <b-col class="col-md-8">
          <b-card class="mb-3">
            <!-- <div class="card-body"> -->
            <b-form-row>
              <b-col sm="3">
                <h6 class="mb-0">
                  Name
                </h6>
              </b-col>
              <b-col sm="9">
                <b-form-input
                  ref="name"
                  class="form-control"
                  :disabled="!isEditing"
                  :class="{ view: !isEditing }"
                  :value="user.name"
                />
              </b-col>
            </b-form-row>
            <hr>
            <b-form-row>
              <b-col sm="3">
                <h6 class="mb-0">
                  Email
                </h6>
              </b-col>
              <b-col sm="9">
                <b-form-input
                  ref="email"
                  class="form-control"
                  :disabled="!isEditing"
                  :class="{ view: !isEditing }"
                  :value="user.email"
                />
              </b-col>
            </b-form-row>
            <hr>
            <b-form-row>
              <b-col sm="3">
                <h6 class="mb-0">
                  No Telp/HP
                </h6>
              </b-col>
              <b-col sm="9">
                <b-form-input
                  ref="phone"
                  class="form-control"
                  :disabled="!isEditing"
                  :class="{ view: !isEditing }"
                  :value="user.phone"
                />
              </b-col>
            </b-form-row>
            <hr>
            <b-form-row>
              <b-col sm="3">
                <h6 class="mb-0">
                  Address
                </h6>
              </b-col>
              <b-col sm="9">
                <b-form-textarea
                  ref="address"
                  rows="3"
                  max-rows="6"
                  :disabled="!isEditing"
                  :class="{ view: !isEditing }"
                  :value="user.address"
                />
              </b-col>
            </b-form-row>
            <hr>
            <b-form-row>
              <b-col class="col-sm-12">
                <b-button
                  v-if="!isEditing"
                  variant="primary"
                  class="px-4"
                  value="Edit"
                  @click="isEditing = !isEditing"
                >
                  Edit
                </b-button>
                <b-button
                  v-if="isEditing"
                  type="submit"
                  variant="primary"
                  class="px-4"
                  value="save"
                  @click="save"
                >
                  Save
                </b-button>
                <b-button
                  v-if="isEditing"
                  variant="danger"
                  value="cancel"
                  @click="isEditing = false"
                >
                  Cancel
                </b-button>
              </b-col>
            </b-form-row>
            <!-- </div> -->
          </b-card>
        </b-col>
      </b-row>
    </b-container>
  </div>
</template>

<script>
// import password from './changepassword.vue'
export default {
  // components: { changepassword },
  data () {
    return {
      isEditing: false,
      user: {
        name: this.$store.state.auth.user.nama,
        email: this.$store.state.auth.user.email,
        phone: this.$store.state.auth.user.telp,
        address: this.$store.state.auth.user.alamat
      }
    }
  },
  methods: {
    save () {
      this.user.name = this.$refs.name.value
      this.user.email = this.$refs.email.value
      this.user.phone = this.$refs.phone.value
      this.user.address = this.$refs.address.value
      this.isEditing = !this.isEditing
    }
  }
}
</script>

<style lang="css" scoped>
</style>
