

export const state = () => {
    return {
        displayForm : false,
        flash : null,
    }
}


export const mutations = {
    SET_DISPLAY(state, display) {
        state.displayForm = display
    },

    SET_FLASH(state, flash){
        state.flash = flash
    }
}

export const actions = {

    closeForm({commit}){
        commit('SET_DISPLAY', false);
        commit('SET_FLASH', null)
    },

    openForm({commit}, payload){
        commit('SET_DISPLAY', true);

        if(payload != undefined && payload.flash != undefined){
            commit('SET_FLASH', payload.flash)
        }
    }
}