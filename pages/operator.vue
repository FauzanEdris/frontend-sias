<template>
  <div>
    <navbar />
    <div class="container-fluid">
      <nuxt-child />
    </div>
  </div>
</template>

<script>
const Cookie = process.client ? require('js-cookie') : undefined

export default {
  middleware: 'operatorAuth',
}
</script>

<style lang="css" scoped>
</style>
