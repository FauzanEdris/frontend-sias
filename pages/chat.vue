<template>
  <div>
    Jadwal <br>
    {{ a }} <br>
    {{ b }} <br>
    <input v-model="a" type="text">
    <button @click="method1()">
      Ayam
    </button> <br>
  </div>
</template>

<script>
export default {
  data () {
    return {
      a: 'b',
      b: 'c'
    }
  },
  mounted () {
    this.socket = this.$nuxtSocket({
      channel: '/'
    })
    /* Listen for events: */
    this.socket.on('someEvent', (msg, cb) => {
      /* Handle event */
      console.log(msg)
      this.b = msg
    })
  },
  methods: {
    method1 () {
      /* Emit events */
      this.socket.emit('method1', {
        hello: 'world',
        data: this.a
      }, (resp) => {
        /* Handle response, if any */
      })
    }
  }
}
</script>

<style lang="css" scoped>
</style>
