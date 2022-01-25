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
  middleware: 'dosenAuth'
}
</script>

<style lang="css" scoped>
</style>
