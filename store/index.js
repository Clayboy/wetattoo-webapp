export const state = () => ({
    locales: ['en', 'fr'],
    locale: 'fr'
  })
  
  export const mutations = {
    SET_LANG (state, locale) {
      if (state.locales.includes(locale)) {
        state.locale = locale
      }
    }
  }
  

  export const getters = {
    menu : (state) => {
        return [
            {label : ('Artistes'), route : {name : 'artists.list'}},
            {label : ('Conventions'), route : {name : 'conventions'}}
        ]
    },
  }