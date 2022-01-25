<template>
  <div>
    <navbar />
    <div class="container-fluid">
      <nuxt-child />
    </div>
  </div>
</template>

<script>
export default {
  middleware: 'adminAuth'
}
</script>

<style lang="css" scoped>
</style>
