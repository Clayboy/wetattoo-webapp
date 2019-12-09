// On définit les types de mutations possibles


export const types = {
    SET_BUSINESS_HOURS: 'SET_BUSINESS_HOURS',
}


export const state = () => ({
    businessHours : []
})

// On définit nos mutations
export const mutations = {
    SET_BUSINESS_HOURS (state, payload) {
        state.businessHours = payload
    },
}

// On définit les getters qu'on pourra appeler dans les autres composants
// pour avoir des informations
export const getters = {
    hasBusinessHours : (state) => state.businessHours.length > 0,
    businessHours : (state) => {

        let businessHours = [];

        if(!state.businessHours.length){
            return businessHours;
        }

        state.businessHours.forEach((dayDetail) => {

            if(dayDetail.open){
                let dayOfWeek = dayDetail.day;

                if(dayDetail.pause_start !== null){
                    let index = _.findIndex(businessHours, {startTime : dayDetail.start, endTime : dayDetail.pause_start});

                    if(index != -1){
                        businessHours[index].daysOfWeek.push(dayOfWeek);
                    }else{
                        businessHours.push({
                            daysOfWeek : [dayOfWeek],
                            startTime : dayDetail.start,
                            endTime : dayDetail.pause_start,
                        });
                    }

                    let indexAfternoon = _.findIndex(businessHours, {startTime : dayDetail.pause_end, endTime : dayDetail.end});

                    if(indexAfternoon != -1){
                        businessHours[indexAfternoon].daysOfWeek.push(dayOfWeek);
                    }else{
                        businessHours.push({
                            daysOfWeek : [dayOfWeek],
                            startTime : dayDetail.pause_end,
                            endTime : dayDetail.end,
                        });
                    }
                }else{
                    let index = _.findIndex(businessHours, {startTime : dayDetail.start, endTime : dayDetail.end});

                    if(index != -1){
                        businessHours[index].daysOfWeek.push(dayOfWeek);
                    }else{
                        businessHours.push({
                            daysOfWeek : [dayOfWeek],
                            startTime : dayDetail.start,
                            endTime : dayDetail.end,
                        });
                    }
                }
            }
        })

        return businessHours;
    },

    closedDays : (state) => {
        return Object.values(state.businessHours.filter((dayDetail) => !dayDetail.open)
            .map(dayDetail => dayDetail.day+1));
    }
}

export const actions = {

    init({ dispatch,commit, state, getters }){
        dispatch('getBusinessHours')
    },

    // On prend le token en paramètre
    getBusinessHours({ commit, state, getters }) {

        let user = this.$auth.user;

        this.$axios.get(`/businesshours/${user.profile_type}/${user.profile_id}`)
            .then(({data}) => {
                commit(types.SET_BUSINESS_HOURS, data.businessHours)
            })
    },
}
