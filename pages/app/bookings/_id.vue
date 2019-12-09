<template>
    <div class="container mx-auto" v-if="booking">

        <appointment-form v-if="displayAppointmentForm"
            @close="closeAppointmentForm"
            @created="addAppointment"
            @updated="updateAppointment"
            :with-calendar="true"
            :prefill="appointmentPrefill" />

        <appointment-overview v-if="displayAppointmentOverview"
            :display-actions="usertype != 'member'"
            @close="closeAppointmentOverview"
            @edit="editAppointment"
            @deleted="deleteAppointment"
            :event="appointment" />

        <header class="flex items-center justify-between mb-4" id="booking-header">
            <h1 class="page-title flex-grow">
                <nuxt-link class="text-gray-500 mr-3" :to="{name: 'app-bookings', query : {status : booking.status}}">
                    <font-awesome-icon :icon="['far', 'chevron-left']"></font-awesome-icon>
                </nuxt-link>
                {{ booking.title }}
            </h1>
        </header>

        <visible element-hidden="#booking-header">
            <div class="fixed top-0 left-0 w-full bg-white shadow-md z-10" style="padding-top:57px;">
                <div class="container mx-auto p-2 flex items-center justify-between">
                    <h1 class="truncate text-lg">
                        <router-link class="text-gray-500 mr-3" :to="{name: usertype == 'member' ? 'bookings.list' : 'bo.projects', params : {status : 'pending'}}">
                            <font-awesome-icon :icon="['far', 'chevron-left']"></font-awesome-icon>
                        </router-link>
                        {{ booking.title }}
                    </h1>
                    <div v-if="this.usertype == 'artist' && status.name == 'pending'" class="flex-shrink-0">
                        <button @click="answer('accepted')"  :class="`text-${statusButtons.accepted.color} border-${statusButtons.accepted.color}`" class="bg-white border rounded mr-2 px-4 py-2">
                            <font-awesome-icon :icon="statusButtons.accepted.icon"></font-awesome-icon>
                        </button>
                        <button @click="answer('refused')"  :class="`text-${statusButtons.refused.color} border-${statusButtons.refused.color}`" class="bg-white border rounded px-4 py-2">
                            <font-awesome-icon :icon="statusButtons.refused.icon"></font-awesome-icon>
                        </button>
                    </div>
                    <div v-if="this.usertype == 'artist' && status.name == 'accepted'" class="flex-shrink-0">
                        <button @click="answer('completed')"  :class="`text-${statusButtons.completed.color} border-${statusButtons.completed.color}`" class="bg-white border rounded px-4 py-2">
                            <font-awesome-icon :icon="statusButtons.completed.icon"></font-awesome-icon>
                        </button>
                    </div>
                </div>
            </div>
        </visible>

        <div class="md:flex">
            <div class="md:w-1/3 md:order-last">
                <div class="mb-4 panel flex items-center justify-between">

                    <div class="flex items-center" :class="`text-${status.color}`">
                        <font-awesome-icon :icon="status.icon" class="mr-1"></font-awesome-icon>
                        {{ status.label }}
                    </div>

                    <div v-if="this.usertype == 'artist'" class="-mr-1">
                        <button @click="answer('accepted')"  v-if="status.name == 'pending' || status.name == 'refused'" :class="`text-${statusButtons.accepted.color} border-${statusButtons.accepted.color}`" class="bg-white border rounded mx-1 px-2 py-1">
                            <font-awesome-icon :icon="statusButtons.accepted.icon"></font-awesome-icon>
                            {{ $t('Accepter') }}
                        </button>
                        <button @click="answer('refused')"  v-if="status.name == 'pending' || status.name == 'accepted'" :class="`text-${statusButtons.refused.color} border-${statusButtons.refused.color}`" class="bg-white border rounded mx-1 px-2 py-1">
                            <font-awesome-icon :icon="statusButtons.refused.icon"></font-awesome-icon>
                            {{ $t('Refuser') }}
                        </button>
                        <button @click="answer('completed')"  v-if="status.name == 'accepted'" :class="`text-${statusButtons.completed.color} border-${statusButtons.completed.color}`" class="bg-white border rounded mx-1 px-2 py-1">
                            <font-awesome-icon :icon="statusButtons.completed.icon"></font-awesome-icon>
                            {{ $t('Terminer') }}
                        </button>
                    </div>
                </div>

                <div class="sm:mb-4">
                    <div class="panel">
                        <h3 class="title-2">{{ $t('Brief') }}</h3>
                        <ul class="mb-3">
                            <li class="border-b border-gray-200 py-1 flex items-center justify-between">
                                <div class="font-medium text-gray-700">{{ $t('Zone à tatouer') }}</div>
                                <div>{{ booking.zone_label }}</div>
                            </li>
                            <li class="border-b border-gray-200 py-1 flex items-center justify-between">
                                <div class="font-medium text-gray-700">{{ $t('Taille approximative') }}</div>
                                <div>{{ booking.size_l }} x {{ booking.size_l }} cm</div>
                            </li>
                            <li class="border-b border-gray-200 py-1 flex items-center justify-between">
                                <div class="font-medium text-gray-700">{{ $t('Style') }}</div>
                                <div>{{ booking.style }}</div>
                            </li>
                            <li class="py-1 flex items-center justify-between">
                                <div class="font-medium text-gray-700">{{ $t('Budget') }}</div>
                                <div>{{ booking.budget }}</div>
                            </li>
                        </ul>
                        <!-- <div>
                            <div class="font-medium text-gray-700 mb-2">{{ $t('Description') }}</div>
                            <div v-html="booking.description"></div>
                        </div> -->
                    </div>
                </div>
                <div class="sm:mb-4">
                    <div class="panel" v-if="usertype == 'artist'">
                        <h3 class="title-2">
                            {{ $t("Infos client") }}
                        </h3>
                        <ul>
                            <li class="border-b border-gray-200 py-1 flex items-center justify-between">
                                <div class="font-medium text-gray-700">{{ $t('Déjà tatoué') }}</div>
                                <div>{{ requester.tattooed }}</div>
                            </li>
                            <li class="border-b border-gray-200 py-1 flex items-center justify-between">
                                <div class="font-medium text-gray-700">{{ $t('Nom') }}</div>
                                <div>{{ requester.name }}</div>
                            </li>
                            <li class="border-b border-gray-200 py-1 flex items-center justify-between">
                                <div class="font-medium text-gray-700">{{ $t('Email') }}</div>
                                <div>{{ requester.email }}</div>
                            </li>
                            <li class="py-1 flex items-center justify-between">
                                <div class="font-medium text-gray-700">{{ $t('Téléphone') }}</div>
                                <div>{{ requester.phone }}</div>
                            </li>
                        </ul>
                    </div>
                    <div class="panel" v-if="usertype == 'member'">
                        <h3 class="title-2">
                            {{ $t("Infos tatoueur") }}
                        </h3>

                        <ul>
                            <li><span class="w-32 inline-block font-medium text-gray-700">Nom</span> {{ booking.artist.pseudo }}</li>
                        </ul>
                    </div>
                </div>

                <div class="mb-4 panel">
                    <div class="flex items-start justify-between">
                        <h3 class="title-2">
                            {{ $t("Rendez-vous") }}
                        </h3>
                        <button v-if="usertype != 'member'" @click="showAppointmentForm" class="btn btn-small btn-primary-outline">
                            {{ $t('Ajouter') }}
                        </button>
                    </div>
                    <div class="border-gray-300 bg-gray-200 px-3 py-2 text-sm my-1" :class="{'border-b pb-3' : status.name == 'accepted'}">
                        <div class="font-medium text-gray-700">{{ $t('Disponibilités') }}</div>
                        <div>{{ booking.availabilities }}</div>
                    </div>

                    <div v-if="!appointments && status.name == 'accepted'" class="text-gray-600 text-center text-lg p-4">
                        {{ $t('Pas de RDV planifiés pour le moment') }}
                        <br />
                    </div>
                    <div v-else>
                        <div class="my-2 border-indigo-700 border-l-4 shadow py-1 px-2" @click="showAppointment(appointment)" v-for="appointment in appointments" :key="appointment.id">
                            <h5 class="font-medium leading-tight">
                                {{ appointment.start | date('DD MMM YYYY') }}  {{ appointment.start | date('LT') }} - {{ appointment.end | date('LT') }}
                            </h5>
                            <p class="text-sm">
                                {{ appointment.summary }}
                            </p>
                        </div>
                    </div>
                </div>
            </div>
            <div class="md:w-2/3 md:mr-4" style="">
                <booking-timeline
                    class="mb-4"
                    :booking-id="booking.id"
                    :booking-status="status.name">

                    <conversation :owner="requester">
                        <div class="bg-white border-gray-400 border px-2 py-1 rounded-sm w-full relative" v-html="booking.description"></div>
                    </conversation>

                </booking-timeline>
            </div>
        </div>

    </div>
</template>


<script>
    import FileUpload from '@/components/forms/FileUpload';
    import BookingTimeline from '@/components/bookings/BookingTimeline';
    import Conversation from '@/components/Conversation';
    import {bookingStatus} from '@/utilities/TattooVars';
    import Visible from '@/components/Visible';

    import AppointmentMixin from '@/components/calendar/AppointmentMixin';
    import _ from 'lodash'
    import { mapState } from 'vuex';

    export default {
        layout : 'member',
        mixins : [AppointmentMixin],
        components:{
            FileUpload,
            Conversation,
            BookingTimeline,
            Visible,
        },

        data(){
            return {
                statusSwitcher : false,
                bookingStatus : bookingStatus,
                booking : false,
            }
        },


        async asyncData({$axios, params}){
            let response    = await $axios.get('bookings/' + params.id)
            let booking     = response.data.data
            
            return {
                booking
            }
        },

        computed: {
            appointments(){
                return this.booking.appointments;
            },

            statusButtons(){

                let buttons = {};

                bookingStatus.forEach(button => {
                    buttons[button.name] = button;
                })

                return buttons;
            },

            status(){
                let index = _.findIndex(bookingStatus, {name : this.booking.status});

                if(index != -1){
                    return bookingStatus[index];
                }

                return false
            },

            ...mapState({
                user : state => state.auth.user,
                usertype : state => state.auth.user.profile_type,
            }),
            

            requester(){
                if(this.booking.requester){
                    return {
                        id : this.booking.requester.id,
                        avatar_url : this.booking.requester.avatar_url,
                        name : this.booking.requester.name,
                        email : this.booking.requester.email,
                        phone : this.booking.phone,
                        tattooed : this.booking.tattooed  ? this.$i18n.t('Oui') : this.$i18n.t('Non'),
                    }
                }else{
                    return {
                        id : '',
                        avatar_url : '',
                        name : this.booking.firstname + " " + this.booking.lastname,
                        email : this.booking.email,
                        phone : this.booking.phone,
                        tattooed : this.booking.tattooed ? this.$i18n.t('Oui') : this.$i18n.t('Non'),
                    }
                }
            }
        },

        methods : {

            updateStatus(){

            },

            answer(status){

                this.$axios.patch(`bookings/${this.booking.id}/status`, {status : status})
                    .then(() => {
                        this.booking.status = status;
                        const h = this.$createElement;

                        if(status == 'refused'){
                            this.$message({
                                type : 'success',
                                message : h('div', {class : 'text-sm text-green-700'}, [
                                    h('p', {class: 'font-medium'}, this.$i18n.t('Le refus a été notifié au membre par email.')),
                                    h('p', null, this.$i18n.t("Vous pouvez ajouter un commentaire pour le client afin de justifier votre refus.")),
                                ]),
                                duration : 5000
                            });
                        }else if(status == 'accepted'){
                            this.$message({
                                type : 'success',
                                message : h('div', {class : 'text-sm text-green-700'}, [
                                    h('p', {class: 'font-medium'}, this.$i18n.t('Bravo! Le membre a été notifié par email.')),
                                    h('p', null, this.$i18n.t("Utilisez les commentaires & PJ afin d'échanger et planifiez le premier RDV")),
                                ]),
                                duration : 5000
                            });
                        }else{
                            this.$message({
                                type : 'success',
                                message : this.$i18n.t("Le statut de la réservation a bien été mis à jour"),
                                duration : 5000
                            });
                        }
                    })
            },

            addAppointment(payload){
                this.booking.appointments.push(payload);
            },

            updateAppointment(payload){
                let index = _.findIndex(this.booking.appointments, {id: payload.id});

                if(index != -1){
                    this.booking.appointments.splice(index, 1, payload)
                }
            },

            showAppointmentForm(){
                this.appointmentPrefill = {
                    summary : this.booking ? this.booking.title : '',
                    booking_id : this.booking.id,
                    attendees : [
                        {email : this.requester.email, user_id : this.requester.id}
                    ]
                }
                this.displayAppointmentForm = true;
            },

            deleteAppointment(id){
                let index = _.findIndex(this.booking.appointments, {id: id});

                if(index != -1){
                    this.booking.appointments.splice(index, 1)
                }
            },
        },

        metaInfo(){
            return {
                title : this.$i18n.t("Bookings")  + (this.booking ? " · " + this.booking.title : '')
            }
        }
    }
</script>
