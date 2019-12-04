<template>
    <right-panel @close="close">
        <template v-slot:title>
            <a href="" @click.prevent="showCalendar = true" v-if="withCalendar" v-show="!showCalendar">
                <font-awesome-icon :icon="['far', 'chevron-left']" class="text-gray-500 mr-3"></font-awesome-icon>
            </a>
            <span v-text="appointment.id ? $t('Mise à jour du rendez-vous') : $t('Nouveau rendez-vous')"></span>
        </template>

        <template v-slot:body>
            <div v-if="withCalendar" v-show="showCalendar">
                <slot-finder class="mb-4">
                    <template v-slot:title>
                        {{ $t('Trouver un créneau disponible') }}
                    </template>
                </slot-finder>
                <the-calendar
                    :compact="true"
                    default-view="timeGridDay"
                    @select="setDayAndHour" />
            </div>

            <div v-if="!showCalendar">
                <div v-if="appointment.errors.message != ''"
                    v-html="appointment.errors.message"
                    class="bg-red-200 border border-red-700 text-red-700 px-2 py-1 text-sm rounded mb-3">
                </div>

                <form @submit.prevent="appointment.id ? update : save" @input="appointment.resetErrors()">
                    <div class="field mb-2">
                        <label class="label mb-1 block" for="start_date" v-text="$t('Titre')" />
                        <div class="control">
                            <input
                                type="text"
                                class="input"
                                :class="{'error' : appointment.errors.has('summary')}"
                                name="summary"
                                v-model="appointment.summary">
                            <div class="error-msg" v-if="appointment.errors.has('summary')" v-text="appointment.errors.get('summary')" />
                        </div>
                    </div>
                    <div class="field mb-2">
                        <label class="label mb-1 block" for="start_date" v-text="$t('Début')" />
                        <div class="control">
                            <datetime v-model="appointment.start"
                                class="input cursor-pointer"
                                id="start_date"
                                type="datetime"
                                :zone="user.timezone"
                                input-class="w-full  cursor-pointer"
                                :minute-step="15"
                                auto ></datetime>

                            <div class="error-msg" v-if="appointment.errors.has('start')" v-text="appointment.errors.get('start')" />
                        </div>
                        <div class="field mb-2">
                            <label class="label mb-1 block" v-text="$t('Se termine')" />
                            <div class="control">
                                <datetime v-model="appointment.end"
                                :min-datetime="appointment.start"
                                type="datetime"
                                class="input "
                                input-class="w-full cursor-pointer"
                                :value-zone="user.timezone"
                                :zone="user.timezone"
                                :minute-step="15"
                                auto></datetime>
                                <div class="error-msg" v-if="appointment.errors.has('end')" v-text="appointment.errors.get('end')" />
                            </div>
                        </div>
                    </div>
                    <div class="field mb-2">
                        <label class="label mb-1 block" for="description" v-text="$t('Description')" />
                        <div class="control">
                            <textarea
                                type="text"
                                class="input"
                                :class="{'error' : appointment.errors.has('description')}"
                                name="description"
                                :placeholder="$t('Détails relatifs au déroulement du rendez-vous')"
                                v-model="appointment.description"></textarea>
                            <div class="error-msg" v-if="appointment.errors.has('description')" v-text="appointment.errors.get('description')" />
                        </div>
                    </div>

                    <div class="attendees">
                        <h4 class="text-lg">
                            {{$t('Participants')}}
                        </h4>

                        <p class="text-gray-600 text-sm my-2">
                            {{ $t("Ajoutez des participants au rendez-vous, ils recevront une invitation & une notification la veille de la séance que vous planifiez.") }}
                            <br />
                            {{ $t("Si le rendez-vous est modifié ou annulé, les participants seront notifiés par email.") }}
                        </p>
                        <div class="flex">
                            <input type="email"
                                class="input"
                                :class="{'error' : attendeeEmailError}"
                                v-model="attendeeEmail"
                                @keydown="attendeeEmailError = false"
                                @keypress.enter.prevent="addAttendee"
                                :placeholder="$t(`Saisissez l'email du participant + Entrée`)" />
                            <button type="button" class="btn btn-primary-outline ml-1" @click="addAttendee">
                                <font-awesome-icon :icon="['fal', 'plus']"></font-awesome-icon>
                            </button>
                        </div>
                        <p class="text-red-700 text-sm" v-if="attendeeEmailError">
                            {{ $t("L'email saisi est invalide!") }}
                        </p>
                        <div v-for="(attendee, index) in appointment.attendees" :key="attendee.email" class="my-1 border border-gray-300 rounded px-2 py-1 flex items-center justify-between">
                            <p>
                                {{ attendee.email }}
                            </p>
                            <a href="#" @click.prevent="removeAttendee(index)">
                                <font-awesome-icon :icon="['fal', 'times']" class="text-gray-400"></font-awesome-icon>
                            </a>
                        </div>
                    </div>
                </form>
            </div>
        </template>

        <template v-if="!showCalendar" v-slot:footer>
            <button type="button"
                class="btn btn-primary"
                @click.prevent="appointment.id ? update() : save()"
                v-text="appointment.id ? $t('Mettre à jour le rendez-vous') : $t('Créer le rendez-vous')">
            </button>
        </template>
    </right-panel>
</template>

<script>
    import RightPanel   from '@/components/layout/RightPanel';
    import TheCalendar  from '@/components/calendar/Calendar';
    import SlotFinder   from '@/components/calendar/SlotFinder';

    import { Datetime } from 'vue-datetime';
    import { Settings } from 'luxon'

    import { mapState } from 'vuex';

    export default {
        components : {
            RightPanel,
            TheCalendar,
            SlotFinder
        },
        props : {
            withCalendar : {
                type: Boolean,
                default : false,
            },
            prefill : {
                type : Object,
                required: false,
                default(){
                    return {}
                }
            },
        },
        data(){
            return {
                showCalendar : this.withCalendar,
                appointment : new Form({
                    id : false,
                    timezone : this.$store.state.auth.user.timezone,
                    artist_id : '',
                    summary : '',
                    description : '',
                    booking_id : '',
                    start : '',
                    end : '',
                    attendees : []
                }),
                attendeeEmail : '',
                attendeeEmailError: false

            }
        },

        computed:{
            ...mapState({
                user : state => state.auth.user
            })
        },

        created(){

            for(let i in this.prefill){
                this.appointment[i] = this.prefill[i];
            }

            let nextHour = this.$moment().add(1, 'hours').startOf('hours');

            this.appointment.start = this.prefill.start != undefined ? this.$moment(this.prefill.start).format() : nextHour.format();
            this.appointment.end = this.prefill.end != undefined ? this.$moment(this.prefill.end).format() : nextHour.add(1, 'hours').format();

            if(this.prefill.id != undefined){
                this.showCalendar = false;
            }

            // Settings.defaultLocale = "en";//this.$store.state.auth.user.locale;

        },

        mounted(){
            this.appointment.artist_id = this.user.profile_id;
        },

        methods:{
            close() {
                this.$emit('close')
            },

            setDayAndHour(payload){
                this.showCalendar = false;
                this.appointment.start  = payload.start.format();
                this.appointment.end    = payload.end.format();
            },

            save(){
                this.appointment.post('/appointments')
                    .then(data => {
                        this.$emit('created', data.appointment);
                        this.close();

                    });
            },

            update(){
                this.appointment.put(`/appointments/${this.appointment.id}`)
                    .then(data => {
                        this.$emit('updated', data.appointment);
                        this.close();
                    });
            },

            addAttendee($event){

                var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

                let email = String(this.attendeeEmail).toLowerCase();

                if(re.test(email)){
                    let index = _.findIndex(this.appointment.attendees, {email : email});

                    if(index == -1){
                        this.appointment.attendees.push({
                            email : this.attendeeEmail
                        });
                    }

                    this.attendeeEmail = '';

                }else{
                    this.attendeeEmailError = true;
                }
            },

            removeAttendee(index){
                this.appointment.attendees.splice(index, 1);
            }
        }
    }
</script>
