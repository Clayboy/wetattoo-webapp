    const path = require('path')

require('dotenv').config()


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

    head: {
        title: 'Get Inspired . Get tattooed',
        titleTemplate: '%s - WE Tattoo',
        meta: [
          { charset: 'utf-8' },
          { name: 'viewport', content: 'width=device-width, initial-scale=1' },
          { 'property': 'og:site_name', 'content': `WE Tattoo`, 'vmid': 'og:site_name'},
          { 'property': 'og:image', 'content': `https://cdn.we-tattoo.com/assets/wetattoo_logo.png`, 'vmid': 'og:image'},

          // hid is used as unique identifier. Do not use `vmid` for it as it will not work
          { hid: 'description', name: 'description', content: 'WE Tattoo' }
        ]
    },

    modules: [
      '@nuxtjs/axios',
      '@nuxtjs/auth',
      'nuxt-i18n',
      '@nuxtjs/recaptcha',
      '@nuxtjs/svg',
      '@nuxtjs/sentry',
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
        }],

        ['nuxt-matomo', { matomoUrl: process.env.MATOMO_URL, siteId: process.env.MATOMO_SITE_ID }],

    ],
    
    recaptcha: {
    hideBadge: false, // Hide badge element (v3)
    language: 'fr',   // Recaptcha language (v2)
    siteKey: process.env.RECAPTCHA_V2_SITE_KEY,    // Site key for requests
    version: 2     // Version
    },
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
        // strategy: 'prefix_except_default',
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
            },
            'legal/terms' : false,
            'legal/cgu' : false,
            'app/' : false,
            'app/profile' : false,
            'app/profile/index' : false,
            'app/profile/subscriptions' : false,
            'app/profile/edit' : false,
            'app/settings' : false,
            'app/home' : false,
            'app/calendar' : false,
            'artists/index' : false,
            'artists/_slug' : false,
            'app/events/index' : false,
            'app/portfolio/index' : false,
            'app/bookings/index' : false,
            'app/bookings/_id' : false,
            'app/tattooflash' : false,
        },
        vueI18n: {
          fallbackLocale: 'fr',
          messages: {
            en: require('./locales/en.json'),
            fr: require('./locales/fr.json')
          },
          silentFallbackWarn: false,
          formatFallbackMessages: true,
          silentFallbackWarn : true,
          silentTranslationWarn : true,
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
        },
        plugins: [ { src: '~/plugins/axios', ssr: true }, '~/plugins/auth.js' ]
    },
    axios: {
        baseURL : process.env.API_URL,
        https : true
      // proxyHeaders: false
    },
    sentry: {
        dsn: 'https://99b35aecd09147029fac23f589727aba@sentry.io/1864211', // Enter your project's DSN here
    },
    plugins: [
        '~/plugins/global',
        '~/plugins/filters',
        '~/plugins/tattoo-vars',
        // '~/plugins/i18n',
        '~/plugins/axios',
        '~/plugins/bus',
        { src: '~/plugins/v-calendar', ssr: false },

      ]
  }