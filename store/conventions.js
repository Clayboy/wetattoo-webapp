import moment from 'moment'
import { reject } from 'q'

// On définit les types de mutations possibles
const types = {
    SET_CONVENTIONS: 'SET_CONVENTIONS',
    SET_LIST_LOADED: 'SET_LIST_LOADED',
    SET_CURRENT_CONVENTION: 'SET_CURRENT_CONVENTION',
}

export const state = () => {
    return {
        listLoaded : false,
        conventions: [],
        current: null,
    }
}

// On définit nos mutations
export const mutations = {
    [types.SET_LIST_LOADED] (state, loaded) {
        state.listLoaded = loaded
    },
    [types.SET_CONVENTIONS] (state, conventions) {
        state.conventions = conventions
    },
    [types.SET_CURRENT_CONVENTION] (state, convention) {
        state.current = convention
    },
}

// On définit les getters qu'on pourra appeler dans les autres composants
// pour avoir des informations
export const getters = {
    incoming : state => state.conventions.filter(one => moment(one.end_date).isAfter(moment()))
}

export const actions = {
    // On prend le token en paramètre
    async fetch({ commit, state }) {

        await this.$axios.get('/conventions')
            .then(({data}) => {
                commit(types.SET_CONVENTIONS, data.data);
                commit(types.SET_LIST_LOADED, true);

            })
    },

    find({ commit, state, dispatch }, slug) {
        if(state.listLoaded){
            dispatch('findInList', slug);
        }else{
            this.$axios.get(`/conventions/${slug}`)
                .then(({data}) => {
                    commit(types.SET_CURRENT_CONVENTION, data);
                })
                .catch((e) => {
                    console.log('ici');
                    error({ statusCode: 404, message: 'Convention not found' })
                })
        }
    },

    findInList({ commit, state}, slug){
        let current = state.conventions.find((conv) => conv.slug == slug);
        commit(types.SET_CURRENT_CONVENTION, current);
    }
}