
export const state = () => ({
    test : 'test'
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
            {label : ('Artistes'), route : 'artists'},
            {label : ('Conventions'), route : 'conventions'}
        ]
    },
    // profile : state => state.user.profile,
    // usertype : state => state.user.profile_type
}

export const actions = {
    async tattooZones() {
        return  [
            { name : 'hand'       , label : this.$i18n.t('Main')},
            { name : 'forearm'    , label : this.$i18n.t('Avant-bras')},
            { name : 'upperarm'   , label : this.$i18n.t('Bras')},
            { name : 'shoulder'   , label : this.$i18n.t('Épaule')},
            { name : 'lowerleg'   , label : this.$i18n.t('Jambe')},
            { name : 'upperleg'   , label : this.$i18n.t('Cuisse')},
            { name : 'foot'       , label : this.$i18n.t('Pieds')},
            { name : 'rib'        , label : this.$i18n.t('Côtes')},
            { name : 'stomach'    , label : this.$i18n.t('Estomac')},
            { name : 'buttcheeks' , label : this.$i18n.t('Reins')},
            { name : 'back'       , label : this.$i18n.t('Dos')},
            { name : 'chest'      , label : this.$i18n.t('Poitrine')},
            { name : 'head'       , label : this.$i18n.t('Tête')},
            { name : 'neck'       , label : this.$i18n.t('Cou')},
        ]  
    },

    async tattooStyles() {
        return  [
            {name : 'neo-traditional',  label : this.$i18n.t('Néo-traditionnel')},
            {name : 'blackwork',        label : this.$i18n.t('Noir')},
            {name : 'black-gray',       label : this.$i18n.t('Noir et gris')},
            {name : 'dotwork',          label : this.$i18n.t('Dot work')},
            {name : 'watercolor',       label : this.$i18n.t('Aquarelle')},
            {name : 'realism',          label : this.$i18n.t('Réaliste')},
            {name : 'traditional',      label : this.$i18n.t('Traditionnel')},
            {name : 'new school',       label : this.$i18n.t('New School')},
            {name : 'japanese',         label : this.$i18n.t('Japonais')},
            {name : 'geometric',        label : this.$i18n.t('Géométrique')},
            {name : 'fineline',         label : this.$i18n.t('Linéaire')},
            {name : 'trash polka',      label : this.$i18n.t('Trash polka')},
            {name : 'tribal',           label : this.$i18n.t('Tribal')},
            {name : 'minimalism',       label : this.$i18n.t('Minimalisme')},
            {name : 'abstract',         label : this.$i18n.t('Abstrait')},
            {name : 'ornamental',       label : this.$i18n.t('Ornemental')},
            {name : 'sketch',           label : this.$i18n.t('Sketch')},
            {name : 'chicano',          label : this.$i18n.t('Chicano')},
            {name : 'hand-poked',       label : this.$i18n.t('Main levée')},
            {name : 'horror',           label : this.$i18n.t('Horreur')},
            {name : 'lettering',        label : this.$i18n.t('Lettrages')},
        ]  
    }
}