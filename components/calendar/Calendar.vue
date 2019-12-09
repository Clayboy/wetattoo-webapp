<template>
        <div :class="!compact ? 'md:flex md:items-start' : ''">

        <div class="bg-white shadow mb-3" style="min-width:260px;" :class="{'md:w-1/4 md:mr-4' : !compact}">

            <div v-if="$refs.fullCalendar">
                <div class="flex items-start justify-between px-4 py-2">
                    <div v-if="!compact" class="relative flex-grow mr-4">
                        <a href="" @click.prevent="viewOptions = !viewOptions">
                            {{ $refs.fullCalendar.getApi().view.title }}
                            <svg :transform="viewOptions ? `rotate(180)` : ``" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" class="inline fill-current h-4 w-4">
                                <path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z"></path>
                            </svg>
                        </a>
                        <transition name="fade">
                            <div v-if="viewOptions" class="absolute z-40 bg-white shadow w-full left-0 border border-gray-300">
                                <ul>
                                    <li v-for="view in views" :key="view.name">
                                        <a href="" class="px-2 pl-6 text-sm relative" @click.prevent="setFcView(view.name)">
                                            <font-awesome-icon :icon="['fal', 'check']" class="absolute text-gray-700" style="left:0.5rem;top:10%;" v-if="fcSettings.view == view.name"></font-awesome-icon>
                                            {{ view.label }}
                                        </a>
                                    </li>
                                </ul>
                            </div>
                        </transition>
                    </div>
                    <div v-if="compact" class="relative flex-grow mr-4">
                        <a href="" @click.prevent="displayCalendar = !displayCalendar">
                            {{ $refs.fullCalendar.getApi().view.title }}
                            <svg :transform="displayCalendar ? `rotate(180)` : ``" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" class="inline fill-current h-4 w-4">
                                <path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z"></path>
                            </svg>
                        </a>
                    </div>

                    <div class="flex items-center">
                        <a href="" class="leading-snug" @click.prevent="$refs.fullCalendar.getApi().prev()">
                            <font-awesome-icon :icon="['far','chevron-left']" class="text-sm"></font-awesome-icon>
                        </a>
                        <a href="" @click.prevent="$refs.fullCalendar.getApi().today()" class="w-2 h-2 rounded-full bg-gray-800 inline-block mx-2"></a>
                        <a href="" class="leading-snug" @click.prevent="$refs.fullCalendar.getApi().next()">
                            <font-awesome-icon :icon="['far','chevron-right']" class="text-sm"></font-awesome-icon>
                        </a>
                    </div>
                </div>
            </div>
            <no-ssr>
                <v-date-picker
                    v-show="displayCalendar"
                    class="border-0"
                    :attributes="attrs"
                    type="single"
                    v-model="currentDate"
                    tint-color="#553c9a"
                    :from-page.sync="fromPage"
                    :disabled-dates='{ weekdays: closedDays }'
                    is-inline
                    is-expanded
                    @input="setDate">
                        <template v-slot:header><div class="h-px">&nbsp;</div></template>
                </v-date-picker>
            </no-ssr>
        </div>

        <full-calendar
            :class="{'md:w-3/4' : !compact, 'compact-calendar' : compact}"
            ref="fullCalendar"
            :defaultView="defaultView"
            :header="false"
            :locale="fcSettings.locale"
            :locales="fcSettings.locales"
            :plugins="fcSettings.calendarPlugins"
            :weekends="fcSettings.calendarWeekends"
            :time-zone="fcSettings.timezone"
            :events="fetchAppointments"
            :business-hours="businessHours"
            :now-indicator="true"
            :select-mirror="true"
            :selectable="true"
            :all-day-slot="false"
            :event-overlap="false"
            :height="compact ? 'parent' : ''"
            event-background-color="#434190"
            event-border-color="#434190"
            min-time="7:00:00"
            max-time="24:00:00"
            :select-constraint="hasBusinessHours ? 'businessHours' : undefined"
            @datesRender="updateVCalendarView"
            @eventClick="eventInfos"
            @select="handleSelect" />
    </div>
</template>


<script>


    
    let components = {};
    let calendarPlugins = {};

    if(process.browser) {
        const FullCalendar = require("@fullcalendar/vue").default;
        console.log(FullCalendar);
        components = {
            FullCalendar
        }

        const dayGridPlugin  = require("@fullcalendar/daygrid").default
        const timeGridPlugin  = require("@fullcalendar/timegrid").default
        const listPlugin  = require('@fullcalendar/list').default
        const interactionPlugin  = require("@fullcalendar/interaction").default
        const momentTimezonePlugin  = require('@fullcalendar/moment-timezone').default

        calendarPlugins = [
            // plugins must be defined in the JS
            dayGridPlugin,
            timeGridPlugin,
            interactionPlugin, // needed for dateClick
            momentTimezonePlugin,
            listPlugin
        ]
    }
    // import dayGridPlugin from "@fullcalendar/daygrid";
    // import timeGridPlugin from "@fullcalendar/timegrid";
    // import listPlugin from '@fullcalendar/list';
    // import interactionPlugin from "@fullcalendar/interaction";
    // import momentTimezonePlugin from '@fullcalendar/moment-timezone';

    import enLocale from '@fullcalendar/core/locales/en-gb';
    import frLocale from '@fullcalendar/core/locales/fr';

    // must manually include stylesheets for each plugin
    import "@fullcalendar/core/main.css";
    import "@fullcalendar/daygrid/main.css";
    import "@fullcalendar/timegrid/main.css";
    import "@fullcalendar/list/main.css";


    import { mapGetters, mapState } from 'vuex';
    import Vue from 'vue'



    const today = new Date();
    const todayComps = {
        year: today.getFullYear(),
        month: today.getMonth() + 1,
        day: today.getDate(),
    };

    export default {
        components : components,

        props:{
            compact: {
                type: Boolean,
                default:false,
            },
            defaultView: {
                type: String,
                default:'timeGridWeek',
            }
        },

        data(){
            return {
                displayCalendar : this.compact ? false : true,
                attrs: [
                    {
                        key: 'week',
                        dates: {
                            start:this.$moment().startOf('week').toDate(),
                            end: this.$moment().endOf('week').toDate(),
                        },
                        highlight: {
                            backgroundColor: "rgba(107,70,193, 0.1)",
                        },
                    },
                ],
                fromPage : todayComps,
                viewOptions : false,
                currentDate : new Date(),

                views : [
                    {name : 'timeGridWeek', label : 'Vue semaine'},
                    {name : 'timeGridDay', label : 'Vue jour'},
                    {name : 'listWeek', label : 'Vue liste'}
                ],

                fcSettings : {
                    view : this.defaultView,
                    timezone : this.$store.state.auth.user.timezone,
                    locale : this.$store.state.auth.user.locale,
                    locales : [
                        enLocale,
                        frLocale
                    ],
                    calendarPlugins : calendarPlugins,
                    calendarWeekends: true,
                    events : [],
                },
            };
        },

        computed : {

            ...mapGetters({
                'businessHours' : 'agenda/businessHours',
                "hasBusinessHours" : 'agenda/hasBusinessHours',
                'closedDays'    : 'agenda/closedDays'
            }),

            ...mapState({
                user            : state => state.auth.user
            }),
        },


        created(){
            this.$bus.$on('agenda:gotodate', (payload) => {
                this.$refs.fullCalendar.getApi().gotoDate(payload.date);
                this.highlightDay(payload.date);
            })

            this.$bus.$on('appointment:add', (payload) => {
                this.addEvent(payload);
            })
            this.$bus.$on('appointment:remove', (payload) => {
                this.removeEvent(payload);
            })
        },

        mounted(){
            this.highlightDay(this.currentDate);
        },

        methods : {

            fetchAppointments(infos, successCallback, failureCallback){

                this.$axios.get('/appointments', {
                        params : {
                            start : this.$moment(infos.start).format('YYYY-MM-DD'),
                            end : this.$moment(infos.end).format('YYYY-MM-DD'),
                        }
                    })
                    .then(({data}) => {
                         data.map(event => {
                            event.title = event.summary;
                            event.start = new Date(event.start);
                            event.end   = new Date(event.end);
                        });
                        successCallback(data);
                        this.$forceUpdate();
                    })

            },

            handleSelect(selected){

                let eventPrefill = {
                    summary: "New Event",
                    start: this.$moment(selected.startStr),
                    end: this.$moment(selected.endStr),
                    allDay: selected.allDay
                }

                this.$emit('select', eventPrefill);
            },

            addEvent(event){

                let calendarApi = this.$refs.fullCalendar.getApi();
                event.title = event.summary;

                if(event.id !== undefined){
                    this.removeEvent(event.id);
                }

                calendarApi.addEvent(event);
            },

            removeEvent(id){

                let calendarApi = this.$refs.fullCalendar.getApi();
                let foundEvent = calendarApi.getEventById(id);

                if(foundEvent){
                    foundEvent.remove();
                }
            },

            highlightDay(date){

                if(this.compact){
                    return;
                }

                this.addEvent({
                    id : 'selected',
                    summary : 'selected',
                    start : this.$moment(date).startOf('day').toDate(),
                    end : this.$moment(date).endOf('day').toDate(),
                    rendering : 'background',
                    backgroundColor : 'rgba(107,70,193, 0.2)'
                })
            },

            setDate(){

                if(this.currentDate){
                    this.$refs.fullCalendar.getApi().gotoDate(this.currentDate);
                    this.highlightDay(this.currentDate);
                }else{
                    this.removeEvent('selected');
                }
            },

            updateVCalendarView(event){

                let newPage = {
                    month : this.$moment(event.view.currentStart).format('M'),
                    year : this.$moment(event.view.currentStart).format('YYYY')
                };
                // if(this.fromPage.month != newPage.month || this.fromPage.year != newPage.year){
                //     Vue.set(this, 'fromPage', newPage);
                // }

                let index = _.findIndex(this.attrs, {key:'week'});

                this.attrs[index].dates = {
                    start : this.$moment(event.view.currentStart).toDate(),
                    end : this.$moment(event.view.currentEnd).subtract(1, 'seconds').toDate(),
                }
            },

            setFcView(view){
                this.fcSettings.view = view;
                this.$refs.fullCalendar.getApi().changeView(view);
                this.viewOptions = false;
            },

            eventInfos(eventClickInfo){
                this.currentEvent = {
                    id : eventClickInfo.event.id,
                    start : this.$moment(eventClickInfo.event.start),
                    end : this.$moment(eventClickInfo.event.end),
                    ...eventClickInfo.event.extendedProps
                }

                this.$emit('eventClicked', this.currentEvent);
            }
        }
    }

</script>


<style lang="scss">

    .fc-toolbar.fc-header-toolbar{
        @apply mb-3
    }

    .fc-toolbar h2{
        @apply text-xl
    }

    .fc-view-container{
        @apply bg-white;
    }


    .fc-button{
        @apply py-1 px-2
    }

    .fc-button-primary{
        @apply bg-white border border-indigo-800 text-indigo-800 text-sm;
    }

    .fc-button-primary:hover{
        @apply bg-indigo-800 text-white;
    }

    .fc-button-primary:disabled{
        @apply bg-gray-400 text-gray-100 border-gray-400;

    }

    .fc-button-primary:not(:disabled):active,
    .fc-button-primary:not(:disabled).fc-button-active{
        @apply bg-indigo-800 text-white;
    }

    .c-pane-container{
        border:0 !important;
        background-color:#FFF;
    }

    .fc-unthemed td.fc-today{
        background:rgba(107,70,193, 0.15);
    }

    .compact-calendar.fc-unthemed td.fc-today{
        background:#FFF !important;
    }

</style>
