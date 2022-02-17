export default {
  server: {
    port: process.env.PORT || 80, // default: 3000
    host: '0.0.0.0' // default: localhost,
  },
  mode: 'universal',
  /*
  ** Headers of the page
  */
  head: {
    title: process.env.npm_package_name || '',
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: process.env.npm_package_description || '' }
    ],
    link: [
      { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }
      // { rel: 'png', type: 'image/x-png', href: '/icon_stikom.png' }
    ]
  },
  /*
  ** Customize the progress-bar color
  */
  loading: { color: '#87CEFA' },
  // #6495ED
  // #00BFFF
  /*
  ** Global CSS
  */
  css: [
    '@/static/assets/css/main.css'
  ],
  /*
  ** Plugins to load before mounting the App
  */
  plugins: [
    // { src: '~/plugins/socket.client.js' }
    { src: '~/plugins/filters.js' }
  ],
  /*
  ** Nuxt.js dev-modules
  */
  buildModules: [
    // Doc: https://github.com/nuxt-community/eslint-module
    '@nuxtjs/eslint-module'
  ],
  /*
  ** Nuxt.js modules
  */
  modules: [
    // Doc: https://bootstrap-vue.js.org
    'bootstrap-vue/nuxt',
    // Doc: https://github.com/js-cookie/js-cookie/tree/latest#readme
    'js-cookie',
    'cookieparser',
    'nuxt-socket-io',
    // Doc: https://axios.nuxtjs.org/usage
    '@nuxtjs/axios',
    '@nuxtjs/pwa'
  ],
  /*
  ** Axios module configuration
  ** See https://axios.nuxtjs.org/options
  */
  components: true,
  axios: {
    proxy: true
  },
  proxy: {
    '/api': process.env.HOST_SERVER || 'https://backend-sias.herokuapp.com/'

  },
  io: {
    // module options
    sockets: [{
      name: 'main',
      url: process.env.HOST_SERVER || 'https://backend-sias.herokuapp.com/'
    }]
  },
  /*
  ** Build configuration
  */
  bootstrapVue: {
    icons: true
  },
  build: {
    /*
    ** You can extend webpack config here
    */
    extend (config, ctx) {
    }
  }
}
