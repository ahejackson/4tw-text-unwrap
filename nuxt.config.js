import pkg from './package'

/* Setup deployment to GitHub Pages */
// only add `router.base = '/<repository-name>/'` if `DEPLOY_ENV` is `GH_PAGES`
const routerBase =
  process.env.DEPLOY_ENV === 'GH_PAGES'
    ? {
        router: {
          base: '/4tw-text-unwrap/'
        }
      }
    : {}

export default {
  mode: 'spa',

  /*
   ** Headers of the page
   */
  head: {
    title: pkg.name,
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: pkg.description }
    ],
    link: [
      {
        rel: 'icon',
        type: 'image/x-icon',
        href:
          process.env.DEPLOY_ENV === 'GH_PAGES'
            ? routerBase.router.base + 'favicon.ico'
            : '/favicon.ico'
      }
    ]
  },

  /*
   ** Customize the progress-bar color
   */
  loading: { color: '#fff' },

  /*
   ** Global CSS
   */
  css: ['@/assets/main.scss'],

  /*
   ** Plugins to load before mounting the App
   */
  plugins: ['~/plugins/vue-clipboard2'],

  /*
   ** Nuxt.js modules
   */
  modules: [
    'nuxt-webfontloader',
    [
      'nuxt-fontawesome',
      {
        component: 'fa',
        imports: [
          //import whole set
          {
            set: '@fortawesome/free-solid-svg-icons',
            icons: [
              'faCog',
              'faDownload',
              'faCopy',
              'faFileUpload',
              'faTextWidth',
              'faAlignLeft'
            ]
          }
        ]
      }
    ]
  ],

  /*
   ** Build configuration
   */
  build: {
    /*
     ** You can extend webpack config here
     */
    extend(config, ctx) {}
  },

  /*
   ** Webfonts
   */
  webfontloader: {
    google: {
      families: ['Inconsolata:400,700', 'Noto+Sans:400,700']
    }
  },

  ...routerBase
}
