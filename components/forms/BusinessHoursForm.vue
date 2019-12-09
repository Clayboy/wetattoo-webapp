<template>
    <div>
        <h3 class="text-xl my-3">
            {{$t('Horaires de travail')}}
        </h3>

        <form @submit.prevent="save">
            <div v-if="form.errors.message != ''"
                v-html="form.errors.message"
                class="bg-red-200 border border-red-700 text-red-700 px-2 py-1 text-sm rounded mb-3" />
            <ul>
                <li class="py-1 border-b border-gray-200 flex items-start" v-for="(dayDetail, index) in form.businessHours" :key="dayDetail.day">

                    <div class="w-24 mr-6 flex-shrink-0" :class="{'flex-grow' : !dayDetail.open}">
                        <input type="checkbox"
                            :key="`openingday_${dayDetail.day}`"
                            :id="`openingday_${dayDetail.day}`"
                            v-model="dayDetail.open"
                            class="hidden">
                        <label class="flex items-center" :for="`openingday_${dayDetail.day}`">
                            <font-awesome-icon :icon="dayDetail.open ? ['fal', 'check-circle'] : ['fal', 'circle']"
                                :class="dayDetail.open ? 'text-indigo-800' : 'text-gray-400'"
                                class="text-xl inline mr-2" />
                            <span class="capitalize" >{{ dayDetail.day_label }}</span>
                        </label>
                    </div>

                    <div class="flex items-start flex-grow" v-if="dayDetail.open">
                        <div class="flex items-start flex-wrap" v-if="dayDetail.hasPause">
                            <div class="mb-1 border border-gray-300 whitespace-no-wrap rounded bg-white mr-2">
                                <select class="bg-white" v-model="dayDetail.start">
                                    <option v-for="hour in hours" v-text="hour" :key="'hours'+hour+'_start'" />
                                </select>
                                <select class="bg-white" v-model="dayDetail.pause_start">
                                    <option v-for="hour in hours" v-text="hour" :key="'hours'+hour+'_pause_start'" />
                                </select>
                            </div>
                            <div class="mb-1 border border-gray-300 whitespace-no-wrap rounded bg-white mr-2">
                                <select class="bg-white" v-model="dayDetail.pause_end">
                                    <option v-for="hour in hours" v-text="hour" :key="'hours'+hour+'_pause_end'" />
                                </select>
                                <select class="bg-white" v-model="dayDetail.end">
                                    <option v-for="hour in hours" v-text="hour" :key="'hours'+hour+'_end'" />
                                </select>
                            </div>
                            <a href="javascript:;"
                                v-if="dayDetail.open"
                                :key="`pauseSwitcher_${dayDetail.day}`"
                                class="border border-indigo-800 bg-white text-indigo-800 px-2 rounded text-lg"
                                @click.prevent="togglePause(index)"
                                v-html="dayDetail.hasPause ? '&times;' : '&plus;'">
                            </a>
                        </div>
                        <div  class="flex items-start" v-else>
                            <div class="mb-1 border border-gray-300 rounded bg-white mr-2">
                                <select class="bg-white" v-model="dayDetail.start">
                                    <option v-for="hour in hours" v-text="hour" :key="'hours'+hour+'_start'" />
                                </select>
                                <select class="bg-white" v-model="dayDetail.end">
                                    <option v-for="hour in hours" v-text="hour" :key="'hours'+hour+'_end'" />
                                </select>
                            </div>
                            <a href="javascript:;"
                                v-if="dayDetail.open"
                                :key="`pauseSwitcher_${dayDetail.day}`"
                                class="border border-indigo-800 bg-white text-indigo-800 px-2 rounded text-lg"
                                @click.prevent="togglePause(index)"
                                v-html="dayDetail.hasPause ? '&times;' : '&plus;'">
                            </a>
                        </div>
                    </div>
                </li>
            </ul>

            <div class="my-3 text-center">
                <button class="button">
                    {{$t('Enregistrer')}}
                </button>
            </div>
        </form>

    </div>
</template>
<script>
    import Vue from 'vue'
    import Form from '@/utilities/Form'
    import { mapState } from 'vuex';
    import { types } from '@/store/agenda';

    export default {
        data (){
            return {
                hours : [],
                form : new Form({
                    owner_id : '',
                    owner_type : '',
                    businessHours : [
                        {day: 0, day_label : '', open : true, hasPause : false, start : '09:00', pause_start : '', pause_end : '', end : '19:00'},
                        {day: 1, day_label : '', open : true, hasPause : false, start : '09:00', pause_start : '', pause_end : '', end : '19:00'},
                        {day: 2, day_label : '', open : true, hasPause : false, start : '09:00', pause_start : '', pause_end : '', end : '19:00'},
                        {day: 3, day_label : '', open : true, hasPause : false, start : '09:00', pause_start : '', pause_end : '', end : '19:00'},
                        {day: 4, day_label : '', open : true, hasPause : false, start : '09:00', pause_start : '', pause_end : '', end : '19:00'},
                        {day: 5, day_label : '', open : true, hasPause : false, start : '09:00', pause_start : '', pause_end : '', end : '19:00'},
                        {day: 6, day_label : '', open : false, hasPause : false, start : '09:00', pause_start : '', pause_end : '', end : '19:00'},
                    ]
                })
            }
        },

        computed:{
            ...mapState({
                businessHours   : state => state.agenda.businessHours,
                user            : state => state.auth.user
            }),

            update(){
                return this.businessHours.length > 0;
            }
        },

        beforeMount(){

            this.form.owner_id = this.user.profile_id;
            this.form.owner_type = this.user.profile_type;

            let date    = this.$moment().startOf('day');
            let endDate = this.$moment().endOf('day');

            while(date <= endDate){
                this.hours.push(date.format('HH:mm'));
                date.add(30, 'minutes');
            }


            this.businessHours
                .forEach((businessDay) => {

                    let bday = {...businessDay};
                    console.log(bday);
                    bday.hasPause = bday.pause_start !== null;

                    let index = _.findIndex(this.form.businessHours, {day : bday.day});

                    console.log(index);

                    if(index != -1){
                        Vue.set(this.form.businessHours, index, bday);
                    }
                })

            for(let i in this.form.businessHours){
                Vue.set(this.form.businessHours[i], "day_label", this.$moment().isoWeekday(this.form.businessHours[i].day).format('dddd'));
            }

            if(this.$moment().localeData().firstDayOfWeek() == 1){
                let index = _.findIndex(this.form.businessHours, {day : 0});
                let sunday = this.form.businessHours[index];

                this.form.businessHours.splice(index, 1);
                this.form.businessHours.push(sunday);
            }

            this.$forceUpdate();
        },

        methods : {

            newHours(){
                this.bhform.push({
                    days : [],
                    hasPause : false,
                    start : '09:00',
                    pause_start : '',
                    pause_end : '', end :
                    '19:00'
                })
            },

            removeDay(index){
                this.bhform.splice(index, 1);
            },

            togglePause(index){
                Vue.set(this.form.businessHours[index], 'hasPause', !this.form.businessHours[index].hasPause);
                this.$forceUpdate();
            },
            save(){

                let action = this.update ? 'patch' : 'post';

                this.form[action]('/businesshours')
                    .then(data => {
                        this.$store.commit(`agenda/${types.SET_BUSINESS_HOURS}`, data.businessHours)
                        this.$emit('close');
                        this.$emit('updated');
                    })
            }
        }
    }
</script>
