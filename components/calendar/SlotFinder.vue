<template>
    <div class="relative">
        <h4 class="text-lg text-gray-700"><slot name="title"></slot></h4>
        <form @submit.prevent="searchSlot">
            <div class="flex items-center bg-white rounded p-1 justify-between shadow">
                <div class="mr-2">
                    <label v-text="$t('A partir du')" />
                    <datetime type="date"
                    input-class="w-24 text-right cursor-pointer border-b border-gray-300 focus:border-indigo-800 outline-none"
                    class="inline"
                    :min-datetime="today"
                    v-model="slotform.start"
                    placeholder=""
                    auto />
                </div>
                <div class="mr-2">
                    <label  v-text="$t('Durée')" />
                    <input class="w-8 text-right border-b border-gray-300 focus:border-indigo-800 outline-none"
                        type="number"
                        step="1"
                        placeholder="Durée"
                        v-model="slotform.duration" />
                    <label for="" class="">
                        h.
                    </label>
                </div>
                <button class="btn btn-small btn-primary self-end">
                    <font-awesome-icon :icon="['fal', 'search']"></font-awesome-icon>
                </button>
            </div>
        </form>
        <div class="suggestions absolute w-full shadow-lg z-50 border border-gray-300 bg-white" v-if="display">
            <div class="flex justify-between text-sm text-gray-500 border-b border-gray-200 bg-gray-100 px-2 pt-1 leading-loose">
                <div>
                    {{ $tc("{count} Créneaux disponibles", slots.length) }}
                </div>
                <a href="" @click.prevent="display = false">
                    <font-awesome-icon :icon="['fal', 'times']" class="text-lg text-gray-500"></font-awesome-icon>
                </a>
            </div>
            <div class="h-56 px-2 overflow-y-auto">
                <div v-for="(dayDetail, index) in slotsByDay" :key="index" class="mb-3">
                    <h3 class="font-medium border-b border-gray-400 mb-1">{{ dayDetail.day.format('LL') }}</h3>
                    <ul class="flex items-start flex-wrap -mx-1">
                        <li  v-for="(slot, ind) in dayDetail.slots" :key="index+ind" class="m-1">
                            <a href="" class="rounded border border-indigo-800 bg-white text-indigo-800 px-2" @click.prevent="goto(slot.start)" >
                                <template v-if="slot.allDay">
                                    {{ $t("Toute la journée") }}
                                </template>
                                <template v-else>
                                    {{ slot.start.format('HH:mm') }} - {{ slot.end.format('HH:mm') }}
                                </template>
                            </a>
                        </li>
                    </ul>
                </div>

                <div v-if="appointmentCount == 0 && slots.length == 0" class="text-center text-sm mt-2 border-t border-gray-400 py-3">

                    <p>
                        {{ $t('Aucun rendez-vous à partir de cette date') }}
                    </p>

                    <button class="btn btn-primary-outline btn-small" @click.prevent="goto($moment(slotform.start))">
                        {{ $t("Créer un RDV à cette date") }}
                    </button>
                </div>

                <div v-if="freeFrom" class="text-center text-sm mt-2 border-t border-gray-400 py-3">

                    <p class="mb-2">
                        {{ $t("Tous les jours à partir du {date}", {date : $moment(freeFrom).format('ll LT') }) }}
                    </p>
                    <button class="btn btn-primary-outline btn-small" @click.prevent="goto(freeFrom)">
                        {{ $t('Afficher dans le calendrier') }}
                    </button>
                </div>
            </div>
        </div>
    </div>
</template>


<script>
    import Form from '@/utilities/Form'
    import { Datetime } from 'vue-datetime';

    export default {
        components : {
            Datetime,
        },
        data(){
            return {
                slotform : new Form({
                    start : this.$moment().format('YYYY-MM-DD'),
                    duration : 1,
                }),
                slots : [],
                display : false,
                today : this.$moment().format(),
                lastAppointment : {},
                appointmentCount : 0,
            }
        },

        watch: {
            slots(value) {
                if (this.slots.length > 0){
                    this.display = true;
                }
            },
        },

        computed : {
            user(){
                return this.$store.state.auth.user;
            },

            freeFrom(){
                if (this.lastAppointment.end != undefined){
                    return this.$moment(this.lastAppointment.end);
                }

                return false;
            },

            slotsByDay(){
                let slotsByDay = {};

                this.slots.forEach(slot => {

                    let key = slot.start.format('DDMMYYYY');

                    if(slotsByDay[key] == undefined){
                        slotsByDay[key] = {
                            day : slot.start,
                            slots : []
                        }
                    }

                    slotsByDay[key].slots.push(slot);
                })

                return Object.values(slotsByDay);
            },

        },

        methods : {
            searchSlot(){
                this.$axios.get(`/artists/${this.user.profile_id}/slots`, {
                    params : {
                        duration : this.slotform.duration,
                        start : this.slotform.start,
                    }
                })
                    .then(({data}) => {
                        this.slots = data.slots.map(slot => {
                            slot.start = this.$moment(slot.start);
                            slot.end = this.$moment(slot.end);
                            return slot;
                        });
                        this.lastAppointment = data.lastAppointment;
                        this.appointmentCount = data.appointmentCount;

                        this.display = true;
                    })
            },

            goto(date){
                this.$bus.$emit('agenda:gotodate', {date : date.toDate(), duration : this.slotform.duration});
                this.display = false;
            }
        }
    }
</script>
