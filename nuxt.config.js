const pkg = require('./package')

module.exports = {
  mode: 'universal',

  /*
  ** Headers of the page
  */
  head: {
    title: 'Wuxia manga,Xianxia manga,Xiuxian manga',
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'home-desc', name: 'description', content: 'Read manga online for free! Wuxian manga,Xiuxian manga,Xuanhuan manga ,manhua and more' }
    ],
    link: [
      { rel: 'icon', type: 'image/x-icon', href: '/pc.ico' }
    ]
  },

  /*
  ** Customize the progress-bar color
  */
  loading: { color: '#fff' },

  /*
  ** Global CSS
  */
  css: [
    'ant-design-vue/dist/antd.css',
    '@/assets/css/theme.less'
  ],

  /*
  ** Plugins to load before mounting the App
  */
  plugins: [
    { src: '~/plugins/antd-ui.js', ssr: true },
    // { src: '~/plugins/api.js', ssr: true },
     { src: '~/plugins/axios.plugin.js', ssr: true },
    // { src: '~/plugins/c_over_api_plugin.js', ssr: false }
    // { src: '~plugins/ga.js', ssr: false }
  ],

  /*
  ** Nuxt.js modules
  */
  modules: [
    '@nuxtjs/axios',
    '@nuxtjs/proxy'
  ],

  axios: {
    proxy: true,
    prefix: '/api',
    // credentials: true
    // See https://github.com/nuxt-community/axios-module#options
  },

  proxy: {
    '/api': {
      target: 'https://mangadrawer.com/',
      pathRewrite: {
        '^/api': 'api',
        changeOrigin: true
      }
    },
    '/images': {
      target: 'https://mangadrawer.com/',
      pathRewrite: {
        '^/images': 'images',
        changeOrigin: true
      }
    }
  },

  // router: {
  //   extendRoutes (routes, resolve) {
  //     routes.push({
  //       name: '',
  //       path: ':id',
  //       component: resolve(__dirname, 'pages/404.vue'),
  //       children: [
  //         {
  //           name: '',
  //           path: ':id',
  //           component: resolve(__dirname, 'pages/404.vue'),
  //           children: [
  //             {
  //               name: '',
  //               path: ':id',
  //               component: resolve(__dirname, 'pages/404.vue'),
  //             }
  //           ]
  //         }
  //       ]
  //     })
  //   }
  // },

  /*
  ** Build configuration
  */
  build: {
    /*
    ** You can extend webpack config here
    */
    extend(config, ctx) {

    }
  }
}
