

export const state = () => {
    return {
        displayForm : false,
        formPrefill : {}
    }
}


export const mutations = {
    SET_DISPLAY(state, display) {
        state.displayForm = display
    },
    SET_PREFILL(state, prefill) {
        state.formPrefill = prefill
    },
}

export const actions = {

    closeForm({commit}){
        commit('SET_DISPLAY', false);
        commit('SET_PREFILL', {})
    },

    openForm({commit}, prefill){
        commit('SET_DISPLAY', true);

        if(prefill != undefined){
            commit('SET_PREFILL', prefill)
        }
    }
}