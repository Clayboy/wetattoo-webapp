// On définit les types de mutations possibles

import Vue from 'vue';
import qs from 'qs';

const types = {
    SET_LIST_LOADED: 'SET_LIST_LOADED',
}

const fetchUrl = '/artists';

export const state = {
    listLoaded : false,
    baseUrl : '/artists',
    data : [],
    next_page_url : '/artists',
    prev_page_url : null,
    filters : {
        styles : [],
        city: '',
        country:''
    },
    pagination : {
        current_page : 0,
        per_page : 20,
        total : null,
    },
}

// On définit nos mutations
export const mutations = {
    UPDATE_PAGINATION (state, payload) {
        state.pagination = payload
    },
    UPDATE_CURRENT_PAGE (state, page) {
        Vue.set(state.pagination, 'current_page', page)
    },
    RESET_PAGINATION (state) {
        Vue.set(state.pagination, 'current_page', 0)
    },
    INCREMENT_PAGINATION (state, payload) {

        // if(payload > 0 && state.pagination.current_page < state.pagination){

        // }
        Vue.set(state.pagination, 'current_page', state.pagination.current_page + payload)
    },
    UPDATE_NEXT_PAGE (state, payload) {
        state.next_page_url = payload
    },
    UPDATE_PREV_PAGE (state, payload) {
        state.prev_page_url = payload
    },
    UPDATE_DATA (state, payload) {
        state.data = payload
    },

    UPDATE_FILTERS (state, filter){
        Vue.set(state.filters, filter.name, filter.value);
    },

    [types.SET_LIST_LOADED] (state, loaded) {
        state.listLoaded = loaded
    },
}

// On définit les getters qu'on pourra appeler dans les autres composants
// pour avoir des informations
export const getters = {
    artists : (state) => state.data,
    hasNextPage : (state) => state.next_page_url != null,
    hasPrevPage : (state) => state.prev_page_url != null,

    activeFilters : (state) => {

        let filters = {};

        for(let name in state.filters){
            if(state.filters[name].length){
                filters[name] = state.filters[name];
            }
        }

        return filters;
    },

    fetchQueryString : (state, getters) => {
        let params = {
            ...getters.activeFilters,
        };

        if(state.pagination.current_page != undefined){
            params.page = state.pagination.current_page;
        }

        return qs.stringify(params)
    },
}

export const actions = {
    // On prend le token en paramètre
    fetch({ commit, state, getters }, direction) {

        commit('INCREMENT_PAGINATION', direction == 'prev' ? -1 : 1);

        this.$axios.get(state.baseUrl+'?'+getters.fetchQueryString).then(({data}) => {

            commit('UPDATE_DATA', data.data);
            commit('UPDATE_PAGINATION', {
                current_page : data.current_page,
                per_page : data.per_page,
                total : data.total,
            })

            commit('UPDATE_PREV_PAGE', data.prev_page_url);
            commit('UPDATE_NEXT_PAGE', data.next_page_url);
        })
    },

    find({ commit, state, dispatch }, slug) {
        if(state.listLoaded){
            dispatch('findInList', slug);
        }else{
            axios.get(`/api/artists/${slug}`)
            .then(({data}) => {
                commit(types.SET_CURRENT_CONVENTION, data);
            })
        }
    },

    findInList({ commit, state}, slug){
        let current = state.conventions.find((conv) => conv.slug == slug);
        commit(types.SET_CURRENT_CONVENTION, current);
    }
}

