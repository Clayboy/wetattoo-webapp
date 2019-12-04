const path = require('path')

module.exports = {
    build:{
        postcss: {
            plugins: {
              tailwindcss: path.resolve(__dirname, './tailwind.config.js')
            }
          }
    },

    css: [
        '~assets/scss/tailwind.scss', 
    ],


    
    modules: [
      '@nuxtjs/axios',
      '@nuxtjs/auth',
      'nuxt-i18n',
      ['nuxt-fontawesome', {
        component: 'font-awesome-icon', 
        imports: [
          //import whole set
          {
            set: '@fortawesome/pro-solid-svg-icons',
            icons: ['fas']
          },
          {
            set: '@fortawesome/pro-light-svg-icons',
            icons: ['fal']
          },
          {
            set: '@fortawesome/pro-regular-svg-icons',
            icons: ['far']
          },
          {
            set: '@fortawesome/free-brands-svg-icons',
            icons: ['fab']
          },
          {
            set: '@fortawesome/pro-duotone-svg-icons',
            icons: ['fad']
          },
        ]
        }]
    ],
    i18n: {
        locales: [
            {
                code: 'fr',
                label : 'français',
                iso: 'fr-FR',
            },
            {
                code: 'en',
                label : 'english',
                iso: 'en-US',
            },
        ],
        strategy: 'prefix_except_default',
        defaultLocale: 'fr',
        detectBrowserLanguage: {
            useCookie: true,
            cookieKey: 'i18n_redirected'
        },
        parsePages: false,
        pages: {
            'about/artists' : {
                en : '/about/artists',
                fr : '/a-propos/tatoueurs',
            }
        },
        vueI18n: {
          fallbackLocale: 'fr',
          messages: {
            en: require('./locales/en.json'),
            fr: require('./locales/fr.json')
          },
        }
    },

    auth: {
        login: '/login',
        logout: '/',
        strategies: {
          local: {
            endpoints: {
                login: {url: '/auth/login', method: 'post', propertyName: 'token'},
                logout: {url: '/auth/logout', method: 'post', },
                user: {url: '/user', method: 'get', propertyName: 'user'},
            },
            tokenRequired: true,
            tokenType: 'Bearer', // Case sensitive when dealing with Laravel backend.
          },
          redirect: {
            login: '/auth/login',
            logout: '/',
            callback: '/auth/login',
            home: '/app/home'
          }
        }
    },
    axios: {
        baseURL : 'https://wetattoo.test/api',
        https : true
      // proxyHeaders: false
    },
    plugins: [
        '~/plugins/global',
        // '~/plugins/i18n',
        '~/plugins/axios'
      ]
  }