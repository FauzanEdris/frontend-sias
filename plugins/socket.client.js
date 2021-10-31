import Vue from 'vue'
import VueSocketIO from 'vue-socket.io'

export default function () {
  Vue.use(new VueSocketIO({
    debug: false,
    connection: 'http://localhost:3000'
    // options: {
    //   path: '/api/asdos/jadwal'
    // }
  }))
}
