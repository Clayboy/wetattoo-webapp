<template>
    <div>
        <div class="container bg-page shadow-lg mx-auto -mt-6 lg:w-3/4 md:pb-4">
            <header class="bg-gray-800 text-gray-200">
                <h1 class="page-title flex-grow p-2 md:p-4">
                    {{ $t('Heureux de vous revoir, {name}', {name : user.name}) }}
                </h1>
            </header>

            <div class="mb-4">
                <icon-placeholder theme="dark" class="h-56"></icon-placeholder>

                <artist-onboarding class="relative mx-1 sm:mx-3 mb-6 -mt-2" v-if="!onboarded" @terminate="onboarded = true" />

                <div class="flex items-stretch -mt-2">
                    <div class="cursor-pointer bg-white px-4 py-4 rounded shadow text-center w-1/3 mx-1 sm:mx-3 z-10" @click.prevent="$router.push({name : 'app-bookings'})">
                        <font-awesome-icon :icon="['fal', 'paper-plane']" class="text-lg mb-1"></font-awesome-icon>
                        <p class="font-medium text-2xl sm:text-4xl">{{ statistics.requests }}</p>
                        <p class="text-sm sm:text-base">
                            {{ $tc('Demandes en attente', statistics.requests) }}
                        </p>
                    </div>
                    <div class="bg-white px-4 py-4 rounded shadow text-center w-1/3 mx-1 sm:mx-3 z-10">
                        <font-awesome-icon :icon="['fal', 'user']" class="text-lg mb-1"></font-awesome-icon>
                        <p class="font-medium text-2xl sm:text-4xl">{{ statistics.subscribers }}</p>
                        <p class="text-sm sm:text-base">
                            {{ $tc('Abonnés', statistics.subscribers) }}
                        </p>
                    </div>
                    <div class="bg-white px-4 py-4 rounded shadow text-center w-1/3 mx-1 sm:mx-3 z-10">
                        <font-awesome-icon :icon="['fal', 'eye']" class="text-lg mb-1"></font-awesome-icon>
                        <p class="font-medium text-2xl sm:text-4xl">{{ statistics.views }}</p>
                        <p class="text-sm sm:text-base">
                            {{ $tc('Visites', statistics.views) }}
                        </p>
                    </div>
                </div>
            </div>

            <div class="flex flex-col md:flex-row md:items-start">
                <div class="md:w-1/3 mx-1 sm:mx-3 order-2 md:order-1">
                    <div class="panel mb-4">
                        <div class="flex items-center justify-between my-1">
                            <p>
                                {{ profile.published ? $t("Votre profil est publié") : $t("Votre profil est dépublié") }}
                            </p>
                            <artist-publish-button :artist-id="profile.id" :value="profile.published" class="btn btn-small text-sm btn-primary-outline"></artist-publish-button>
                        </div>
                        <div class="flex items-center justify-between my-1">
                            <p>
                                {{ profile.bookable ? $t("Vos bookings sont ouverts") : $t("Vos bookings sont fermés") }}
                            </p>
                            <artist-booking-button :artist-id="profile.id" :value="profile.bookable" class="btn btn-small text-sm btn-primary-outline"></artist-booking-button>
                        </div>
                    </div>
                    <div class="panel">
                        <h3 class="title-2">
                            {{ $t("Diffusez votre page artiste") }}
                        </h3>

                        <div class="mb-4">
                            <h5 class="font-light text-lg mb-2">
                                {{ $t("Lien vers votre page artiste") }}
                            </h5>
                            <router-link class="text-blue-500" :to="{name:'artists-slug', params:{slug:profile.slug}}">
                                https://we-tattoo.com/artists/{{profile.slug}}
                            </router-link>

                            <p class="text-sm text-gray-700 mt-1">
                                {{ $t("Utilisez ce lien sur votre compte Instagram pour rediriger les visiteurs vers votre formulaire de réservation.") }}
                            </p>
                        </div>

                        <div>
                            <h5 class="font-light text-lg mb-2">
                                {{$t("Image à partager")}}
                            </h5>
                            <a class="text-blue-500" :href="`https://wetattoo.test/sharing/${profile.slug}`">
                                <img :src="`/sharing/${profile.slug}`" alt="" class="mx-auto w-1/2 h-1/2" />
                            </a>

                            <p class="text-sm text-gray-700 mt-1">
                                {{ $t("Invitez vos abonnés Instagram / Facebook à vous contacter via WE Tattoo ou consulter votre boutique de flashs.") }}
                            </p>
                        </div>

                    </div>
                </div>

                <div class="md:w-2/3 mx-1 sm:mx-3 order-1 md:order-2">
                    <div v-if="onboarded && !profile.portfolio" class="bg-blue-100 border border-blue-500 text-blue-500 rounded mb-2 p-2 flex items-start justify-between mx-2 sm:mx-auto">
                        <font-awesome-icon :icon="['far', 'info-circle']" class="text-xl mr-2"></font-awesome-icon>
                        <p class="mr-6 text-base flex-grow">
                            {{ $t("Connectez votre compte Instagram pour afficher vos réalisations sur votre fiche artiste") }}

                        </p>
                        <router-link class="flex-shrink-0 bg-blue-500 text-white rounded px-3 py-1 text-sm" :to="{name:'portfolio'}">
                            {{ $t('Connecter Instagram') }}
                        </router-link>
                    </div>

                    <div class="panel mb-4 ">
                        <div class="md:flex md:items-stretch mb-4">

                            <div class="md:w-1/2 mr-3">
                                <h3 class="title-2">
                                    {{ $t("Aujourd'hui") }}
                                </h3>
                                <div>
                                    <div class="my-2 border-indigo-700 border-l-4 shadow py-1 px-2" v-for="appointment in todayAppointments" :key="appointment.id">
                                        <h5 class="font-medium leading-tight">
                                            {{ appointment.start | date('LT') }} - {{ appointment.end | date('LT') }}
                                        </h5>
                                        <p class="text-sm">
                                            {{ appointment.summary }}
                                        </p>
                                    </div>
                                    <div class="text-center text-lg text-gray-500 py-4" v-if="todayAppointments.length == 0">
                                        <font-awesome-icon class="text-4xl" :icon="['fal', 'glass-citrus']"></font-awesome-icon>
                                        <br />
                                        {{ $t("Rien de prévu aujourd'hui") }}
                                    </div>
                                </div>
                            </div>
                            <div class="md:w-1/2 mr-3">
                                <h3 class="title-2">
                                    {{ $t("A venir") }}
                                </h3>
                                <div>
                                    <div class="my-2 border-indigo-700 border-l-4 shadow py-1 px-2" v-for="appointment in laterAppointments" :key="appointment.id">
                                        <h5 class="font-medium leading-tight">
                                            {{ appointment.start | date('DD MMM YYYY') }} {{ appointment.start | date('LT') }} - {{ appointment.end | date('LT') }}
                                        </h5>
                                        <p class="text-sm">
                                            {{ appointment.summary }}
                                        </p>
                                    </div>
                                    <div class="text-center text-lg text-gray-500 py-4" v-if="laterAppointments.length == 0">
                                        <font-awesome-icon class="text-4xl" :icon="['fal', 'glass-citrus']"></font-awesome-icon>
                                        <br />
                                        {{ $t("Rien de prévu dans les 5 jours") }}
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div>
                            <h3 class="title-2">
                                {{ $t("Trouver un créneau") }}
                            </h3>
                            <slot-finder></slot-finder>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <appointment-form v-if="appointmentForm" 
            @created="appendAppointment" 
            @close="appointmentForm = false" 
            :prefill="appointment"></appointment-form>
    </div>
</template>


<script>

    import Vue from 'vue'
    import ArtistOnboarding from '@/components/ArtistOnboarding'
    import ArtistPublishButton from '@/components/forms/ArtistPublishButton'
    import ArtistBookingButton from '@/components/forms/ArtistBookingButton'
    import IconPlaceholder from '@/components/IconPlaceholder';
    import SlotFinder from '@/components/calendar/SlotFinder'
    import AppointmentForm from '@/components/calendar/AppointmentForm'

    import { mapState } from 'vuex';

    import {Step, Steps} from 'element-ui';

    Vue.use(Steps);
    Vue.use(Step);


    export default {
        components : {
            ArtistOnboarding,
            ArtistPublishButton,
            ArtistBookingButton,
            IconPlaceholder,
            SlotFinder,
            AppointmentForm
        },
        data(){
            return {
                statistics : {
                    subscribers : '-',
                    requests : '-',
                    views : '-',
                },
                appointmentForm : false,
                lastPendingBookings : [],
                appointments : [],
                appointment : {},
                onboarded : true,
            }
        },
        computed: {

            ...mapState({
                user : state => state.auth.user,
                profile : state => state.auth.user.profile
            }),

            todayAppointments(){
                return this.appointments.filter(one => this.$moment(one.start).isBefore(this.$moment().endOf('day')));
            },

            laterAppointments(){
                return this.appointments.filter(one => this.$moment(one.start).isAfter(this.$moment().endOf('day')));
            }
        },
        created(){
            // this.fetchLastPendingBookings();
            this.getTodayAppointments();
            this.getStatistics();
            this.onboarded = this.user.onboarded_at !== null;

            this.$bus.$on("agenda:gotodate", (payload) => {
                this.appointmentForm = true;
                this.appointment = {
                    start : payload.date,
                    end : this.$moment(payload.date).add(payload.duration, 'hours'),
                }
            })
        },
        destroyed(){
            this.$bus.$off('agenda:gotodate');
        },
        methods:{
            fetchLastPendingBookings(){
                this.$axios.get(`/artists/${this.profile.id}/bookings`, {
                    params : {
                        per_page : 5,
                        page : 1,
                        status : 'pending'
                    }
                })
                    .then(({data}) => {
                        this.lastPendingBookings = data.data;
                    })
            },

            getTodayAppointments(){
                this.$axios.get(`/appointments`, {
                    params : {
                        start : this.$moment().startOf('day').format('YYYY-MM-DD LTS'),
                        end : this.$moment().add(5, "days").endOf("day").format('YYYY-MM-DD LTS'),
                    }
                })
                .then(({data}) => {
                        this.appointments = data;
                    })
            },

            appendAppointment(appointment){
                this.appointments.push(appointment);
            },

            getStatistics(){
                this.$axios.get(`/artists/${this.profile.id}/statistics`)
                    .then(({data}) => {
                        this.statistics.subscribers = data.subscribers;
                        this.statistics.views       = data.views;
                        this.statistics.requests    = data.requests;
                    })
            },

            updateProfile(payload){
                this.$store.dispatch('auth/setProfileProp', payload);
            }
        }
    }
</script>
