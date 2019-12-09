<template>
    <div class="container mx-auto">
        <header class="flex items-center mb-4">
            <h1 class="page-title flex-grow">
                {{$t("Calendrier")}}
            </h1>
            <div>
                <slot-finder class="hidden md:inline-block"></slot-finder>

                <button class="btn btn-primary" @click="editAppointment({})">
                    {{$t("Nouveau rendez-vous")}}
                </button>
                <button class="btn btn-primary-outline" @click="settings = true">
                    {{$t("Réglages")}}

                </button>
            </div>
        </header>

        <right-panel v-if="settings" @close="settings = false">
            <template v-slot:title>
                {{$t('Paramètres de votre agenda')}}
            </template>
            <template v-slot:body>
                <business-hours-form
                    :prefill="businessHours"
                    @close="settings = false"></business-hours-form>
            </template>
        </right-panel>

        <calendar @select="editAppointment" @eventClicked="showAppointment" />

        <appointment-form
            v-if="displayAppointmentForm"
            @close="closeAppointmentForm"
            @created="addEvent"
            @updated="addEvent"
            :prefill="appointmentPrefill" />

        <appointment-overview v-if="displayAppointmentOverview"
            :event="appointment"
            @close="closeAppointmentOverview"
            @deleted="removeEvent"
            @edit="editAppointment" />
    </div>
</template>


<script>
    import Calendar from '@/components/calendar/Calendar';
    import BusinessHoursForm from '@/components/forms/BusinessHoursForm';
    import RightPanel from '@/components/layout/RightPanel';

    import enLocale from '@fullcalendar/core/locales/en-gb';
    import frLocale from '@fullcalendar/core/locales/fr';

    import SlotFinder from '@/components/calendar/SlotFinder'
    import { mapGetters, mapState } from 'vuex';

    import AppointmentMixin from '@/components/calendar/AppointmentMixin';

    export default {
        layout : 'member',
        mixins : [AppointmentMixin],
        components: {
            RightPanel,
            BusinessHoursForm,
            SlotFinder,
            Calendar
        },

        data(){
            return {
                settings : false,
            };
        },

        computed : {
            ...mapState({
                businessHours   : state => state.agenda.businessHours,
                user            : state => state.auth.user
            })
        },

        methods : {
            addEvent(event){
                this.$bus.$emit('appointment:add', event);
            },

            removeEvent(event){
                this.$bus.$emit('appointment:remove', event);
            }
        },

        metaInfo(){
            return {
                title : this.$i18n.t("Agenda") + " · " + this.$i18n.t("Rendez-vous")
            }
        }
    }

</script>
