<template>
  <div>
    Home
    {{ host }}
  </div>
</template>

<script>
export default {
  data () {
    return { host: 'a' }
  },
  asyncData ({ req, res }) {
    // Please check if you are on the server side before
    // using req and res
    if (process.server) {
      return { host: req.headers }
    }

    return {}
  }
}
</script>

<style lang="css" scoped>
</style>
