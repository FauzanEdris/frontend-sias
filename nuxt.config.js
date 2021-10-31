export default {
  server: {
    port: 8080, // default: 3000
    host: '0.0.0.0' // default: localhost,
  },
  mode: 'universal',
  // Global page headers (https://go.nuxtjs.dev/config-head)
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
  // Global CSS (https://go.nuxtjs.dev/config-css)
  css: [
  ],
  // Plugins to run before rendering page (https://go.nuxtjs.dev/config-plugins)
  plugins: [
    // { src: '~/plugins/socket.client.js' }
  ],

  // Auto import components (https://go.nuxtjs.dev/config-components)
  components: true,

  // Modules for dev and build (recommended) (https://go.nuxtjs.dev/config-modules)
  buildModules: [
    // https://go.nuxtjs.dev/eslint
    // Doc: https://github.com/nuxt-community/eslint-module
    '@nuxtjs/eslint-module'
  ],

  // Modules (https://go.nuxtjs.dev/config-modules)
  modules: [
    // Doc: https://bootstrap-vue.js.org
    // https://go.nuxtjs.dev/bootstrap
    'bootstrap-vue/nuxt',
    // Doc: https://github.com/js-cookie/js-cookie/tree/latest#readme
    'js-cookie',
    'cookieparser',
    'nuxt-socket-io',
    // https://go.nuxtjs.dev/axios
    // Doc: https://axios.nuxtjs.org/usage
    '@nuxtjs/axios',
    // https://go.nuxtjs.dev/pwa
    '@nuxtjs/pwa'
  ],
  /*
  ** Axios module configuration
  ** See https://axios.nuxtjs.org/options
  */
  // Axios module configuration (https://go.nuxtjs.dev/config-axios)
  axios: {
    proxy: true
  },
  proxy: {
    // '/api': 'http://192.168.217.1:3000'
    // '/api': 'http://192.168.43.131:3000/'
    '/api': 'http://localhost:3000'
    // '/api': 'http://10.164.236.241:3000'

  },
  io: {
    // module options
    sockets: [{
      name: 'main',
      // url: 'http://192.168.43.131:3000'
      url: 'http://localhost:3000'
      // url: 'http://10.164.236.241:3000'
    }]
  },
  // Build Configuration (https://go.nuxtjs.dev/config-build)
  build: {
    /*
    ** You can extend webpack config here
    */
    extend (config, ctx) {
    }
  }
}
