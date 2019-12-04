import AppointmentForm from '@/components/calendar/AppointmentForm';
import AppointmentOverview from '@/components/calendar/AppointmentOverview';

export default{
    components : {
        AppointmentForm,
        AppointmentOverview,
    },
    data(){
        return {
            displayAppointmentForm : false,
            displayAppointmentOverview : false,
            appointmentPrefill : {},
            appointment : {}
        }
    },
    methods: {
        editAppointment(payload){
            this.appointmentPrefill = payload;
            this.closeAppointmentOverview();
            this.displayAppointmentForm = true;
        },

        closeAppointmentForm(){
            this.appointmentPrefill = {};
            this.displayAppointmentForm = false;
        },

        showAppointment(payload){
            this.appointment = payload;
            this.displayAppointmentOverview = true;
            this.displayAppointmentForm = false;
        },

        closeAppointmentOverview(){
            this.appointment = {};
            this.displayAppointmentOverview = false;
        }
    }
}
