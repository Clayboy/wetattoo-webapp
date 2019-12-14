<template>
<div v-cloak>
        <div v-if="artist && isCurrentUser" class="w-full flex items-center justify-between px-4 py-1 text-gray-200" style="background:rgba(0,0,0,0.6)">
            <p v-if="!artist.published">{{ $t("Votre profil n'est pas publié. Publiez-le pour le rendre visible") }}</p>
            <p v-if="artist.published">{{ $t("Votre profil est publié") }}</p>
            <artist-publish-button
                :artist-id="artist.id"
                :value="artist.published"
                @update="updateProp"
                class="btn-primary btn-small" />
        </div>
        <booking-form :artist-id="artist.id" 
            :artist-pseudo="artist.pseudo" 
            :flash="tattooFlash"
            v-if="artist && bookingForm" 
            @close="closeBookingForm" />

        <div class="md:flex items-start h-full md:px-6 md:pt-5 relative">

            <aside id="artist-details" class="relative w-full md:w-1/5 bg-white shadow-md z-10 md:mr-4"  v-if="artist">
                <div class="cover bg-home h-32 mb-16  shadow">
                    <div class="text-white flex justify-between px-4 pt-2">
                        <nuxt-link :to="{name : 'artists'}" v-if="!isCurrentUser">
                            <font-awesome-icon :icon="['far', 'chevron-left']" class="text-2xl"></font-awesome-icon>
                        </nuxt-link>
                        <p v-else></p>
                        <nuxt-link :to="{name: 'app-profile-edit-general'}" v-if="isCurrentUser" class="border bg-gray-900 border-gray-300 px-4 py-1 rounded">
                            {{$t('Editer')}}
                        </nuxt-link>
                    </div>
                    <avatar :img="artist.avatar_url" :size="32" class="shadow flex-shrink-0 flex-grow-0 mb-3 mx-auto border-2" />
                </div>
                <div class="px-4">
                    <div class="mb-4">
                        <h2 class="font-base text-2xl mb-2 leading-none truncate leading-none" >
                            {{ artist.pseudo }}
                        </h2>
                        <div class="flex items-center text-sm">
                            <p class="mr-4" v-html="$tc('{count} abonnés', artist.subscriptions_count)" />
                            <!-- <p v-html="$tc('{count}  flashs disponibles', artist.subscriptions_count)" /> -->
                        </div>
                    </div>

                    <div class="flex mb-1" v-if="artist.parlor">
                        <span class="w-6 text-gray-600 inline-block text-left mr-1">
                            <font-awesome-icon :icon="['fal', 'store-alt']"></font-awesome-icon>
                        </span>
                        <span v-text="artist.parlor" />
                    </div>
                    <div class="flex mb-1" v-if="location">
                        <span class="w-6 text-gray-600 inline-block text-left mr-1">
                            <font-awesome-icon class="mr-1" :icon="['fal', 'map-marker-alt']"></font-awesome-icon>
                        </span>
                        {{ location }}
                    </div>
                    <div class="py-1" v-if="artist.business_hours.length > 0">
                        <div class="flex items-center cursor-pointer select-none" v-if="currentWorkDay" @click="displayWorkHours = !displayWorkHours">
                            <span class="w-6 text-gray-600 inline-block text-left mr-1">
                                <font-awesome-icon :icon="['far', 'clock']"></font-awesome-icon>
                            </span>

                            <div v-text="currentlyOpen ? $t('Ouvert') : $t('Fermé')" :class="currentlyOpen ? 'text-green-700' : 'text-red-700'" class="w-16" />
                            <div v-if="!currentWorkDay.open" class="text-sm" v-text="$t('Fermé')" />
                            <div v-else class="text-sm">
                                <div v-if="currentWorkDay.pause_start !== null">
                                    <span class="mr-1">{{ currentWorkDay.start}} - {{ currentWorkDay.pause_start}},</span>
                                    <span>{{ currentWorkDay.pause_end}} - {{ currentWorkDay.end}}</span>
                                </div>
                                <div v-else>
                                    {{ currentWorkDay.start}} - {{ currentWorkDay.end }}
                                </div>
                            </div>
                            <svg :transform="displayWorkHours ? `rotate(180)` : ``" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" class="inline fill-current ml-1 h-4 w-4">
                                <path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z"></path>
                            </svg>
                        </div>
                        <ul class="text-sm pl-6" v-show="displayWorkHours">
                            <li class="flex items-center" :class="{'font-semibold' : workday.day == $moment().isoWeekday()}" v-for="workday in artist.business_hours" :key="`workday-${workday.day}`">
                                <div v-text="workday.day_label" class="w-24" />
                                <div v-if="!workday.open" v-text="$t('Fermé')" />
                                <div v-else>
                                    <div v-if="workday.pause_start !== null">
                                        <span class="mr-1">{{ workday.start}} - {{ workday.pause_start}},</span>
                                        <span>{{ workday.pause_end}} - {{ workday.end}}</span>
                                    </div>
                                    <div v-else>
                                        {{ workday.start}} - {{ workday.end }}
                                    </div>
                                </div>
                            </li>
                        </ul>
                    </div>
                    <div class="my-3">
                        {{ artist.bio }}
                    </div>
                    <div class="text-sm flex flex-wrap mt-3">
                        <span v-for="style in styles"
                            :key="`${artist.id}${style.name}`"
                            class="text-sm text-gray-500 border border-gray-300 mr-1 mb-1 px-1 rounded hover:bg-gray-100">
                            {{ style.label }}
                        </span>
                    </div>
                </div>

                <div v-if="!isCurrentUser" class="flex py-3 px-4 justify-center">
                    <subscribe-button class="w-1/2 mr-3"
                        :artist="artist"
                        :active="artist.isSubscribedTo"
                        @subscribed="artist.subscriptions_count++"
                        @unsubscribed="artist.subscriptions_count--">
                    </subscribe-button>
                    
                    <button @click.prevent="bookArtist"
                        class="w-1/2 btn btn-primary"
                        :disabled="!artist.bookable"
                        href="#"
                        v-text="artist.bookable ? $t('Réserver') : $t('Reservations fermées')">
                        {{ $t('Réserver') }}
                    </button>
                </div>

                <div class="border-gray-300 border-t px-4 pt-3 hidden sm:block" v-if="hasSocial">
                    <div class="flex mb-1" v-if="artist.instagram">
                        <span class="w-6 text-gray-600 inline-block text-left mr-1">
                            <font-awesome-icon :icon="['fab', 'instagram']" />
                        </span>
                        <a :href="`https://instagram.com/${artist.instagram.substring(1)}`" target="_blank">
                            {{ artist.instagram }}
                        </a>
                    </div>
                    <div class="flex mb-1" v-if="artist.facebook">
                        <span class="w-6 text-gray-600 inline-block text-left mr-1">
                            <font-awesome-icon :icon="['fab', 'facebook']" />
                        </span>
                        <a :href="artist.facebook" target="_blank">
                            {{ artist.facebook }}
                        </a>
                    </div>
                </div>
            </aside>

            <visible elementHidden="#artist-details"  v-if="artist">
                <div class="w-full fixed left-0 bg-white shadow flex items-center justify-between py-3 px-4" style="top:58px;">
                    <avatar :img="artist.avatar_url" :size="10" class="mr-2" />
                    <div class="flex-grow">
                        <h2 class="text-lg leading-none">{{ artist.pseudo }}</h2>
                        <div class="text-sm text-gray-500" v-if="location">
                            <font-awesome-icon class="mr-1" :icon="['fal', 'map-marker-alt']"></font-awesome-icon>
                            {{ location }}
                        </div>
                    </div>
                    <a  v-if="artist.bookable && !isCurrentUser"  @click="bookingForm = true" class="btn btn-small btn-primary" href="#">
                        {{ $t('Réserver') }}
                    </a>
                    <!-- <router-link class="btn btn-small btn-primary-outline" :to="{name : 'profile.general'}" v-if="isCurrentUser">
                        {{ $t('Editer') }}
                    </router-link> -->
                </div>
            </visible>

            <div class="md:flex-grow bg-white shadow-md pt-4">
                <div class=" flex items-center justify-center border-b-2 border-gray-200">
                    <ul class="flex" style="margin:-2px;">
                        <li class="mr-3">
                            <nuxt-link :to="{name : 'artists-slug', params : {slug : artist.slug}}"  class="nav-tab">
                                {{ $t("Portfolio") }}
                            </nuxt-link>
                        </li>
                        <li class="mr-3">
                            <nuxt-link :to="{name : 'artists-slug-events', params : {slug : artist.slug}}" class="nav-tab" href="#">
                                {{ $t("Guest & Conventions") }}
                            </nuxt-link>
                        </li>
                        <li class="mr-3">
                            <nuxt-link :to="{name : 'artists-slug-flashs', params : {slug : artist.slug}}" class="nav-tab" href="#">
                                {{ $t("Flashs") }}
                            </nuxt-link>
                        </li>
                    </ul>
                </div>

                <div class="px-4 py-3">
                    <nuxt-child :artist="artist"
                        @bookflash="bookFlash" />
                </div>
            </div>
        </div>
    </div>
</template>

<script>

import _ from 'lodash';
import {tattooStyles} from '~/utilities/TattooVars';
import Visible from '~/components/Visible';
import BookingForm from '~/components/bookings/BookingForm'
import SubscribeButton from '~/components/forms/SubscribeButton'
import ArtistPublishButton from '~/components/forms/ArtistPublishButton'

export default {
    async asyncData({ params, $axios }) {
        const artist = await $axios.$get(`/artists/${params.slug}`)
        return {artist : artist}
    },

    components:{
        Visible,
        BookingForm,
        SubscribeButton,
        ArtistPublishButton
    },

    data(){
        return {
            bookingForm : false,
            displayWorkHours : false,
            tattooFlash : null,
        }
    },

    mounted(){
        if(this.$route.hash == '#book' && this.artist.bookable){
            this.bookArtist();
        }
    },

    computed:{
        isCurrentUser(){
            return this.$auth.loggedIn && this.$auth.user.profile_type == 'artist' && this.$auth.user.profile_id == this.artist.id;
        },
        hasSocial(){
            return this.artist.facebook || this.artist.instagram || this.artist.website;
        },

        currentWorkDay(){
           let index = _.findIndex(this.artist.business_hours, {day : this.$moment().isoWeekday()});

           if(index != -1){
               return this.artist.business_hours[index];
           }

           return false;
        },

        currentlyOpen(){

            let workday = this.currentWorkDay;

           if(workday){

               if(!workday.open){
                   return false;
                }

                let openHour     = this.$moment().hours(workday.start.substr(0,2)).minutes(workday.start.substr(-2));
                let closeHour    = this.$moment().hours(workday.end.substr(0,2)).minutes(workday.end.substr(-2));

                if(workday.pause_start !== null){
                    let pauseStart = this.$moment().hours(workday.pause_start.substr(0,2)).minutes(workday.pause_start.substr(-2));
                    let pauseEnd   = this.$moment().hours(workday.pause_end.substr(0,2)).minutes(workday.pause_end.substr(-2));

                    return this.$moment().isBetween(openHour, pauseStart) || this.$moment().isBetween(pauseEnd, closeHour)
                }

                return this.$moment().isBetween(openHour, closeHour);
           }

           return false;
        },

        styles(){
            if(this.artist.preferred_styles == null){
                return [];
            }

            return tattooStyles.filter(style => this.artist.preferred_styles.indexOf(style.name) != -1)
        },
        serializedStyles(){

            let styles = [];

            Object.values(this.styles)
                .forEach(style => {
                    styles.push(style.label)
                })

            return styles.join(', ');
        },

        location(){
            if(this.artist.address != null){

                let location = [
                    this.artist.address.city
                ];
                if(this.artist.address.country_code == 'us'){
                    location.push(this.artist.address.administrative);
                }
                location.push(this.artist.address.country_code.toUpperCase());

                return location.join(', ');
            }

            return false;
        },
    },

    methods : {
        bookArtist(){
            if(!this.artist.bookable){

                this.$message({
                    type:'warning',
                    message : this.$i18n.t("Désolé, {artist} a fermé les réservations pour le moment", {artist : this.artist.pseudo}),
                    duration : 5000,
                })

                return false;
            }

            this.bookingForm = true;
        },
        updateProp(payload){
            Vue.set(this.artist, payload.prop, payload.value);
        },

        bookFlash(flash){
            this.tattooFlash = flash;
            this.bookingForm = true;
        },
        closeBookingForm(){
            this.bookingForm = false;
            this.tattooFlash = null;
        }
    },

    head() {
        return {
            title : this.artist.pseudo + (this.location ? " · " + this.$i18n.t("Tatoueur")  + " " + this.location : "") + (this.serializedStyles != "" ? " · " + this.serializedStyles : ""),
            meta: [
                { 'property': 'og:title', 'content': this.$i18n.t("Découvrez {artist} sur WE Tattoo", {artist : this.artist.pseudo}), 'vmid': 'og:title'},
                { 'property': 'og:site_name', 'content': `WE Tattoo`, 'vmid': 'og:site_name'},
                { 'property': 'og:image', 'content': `${this.artist.avatar_url}`, 'vmid': 'og:image'},
                { 'property': 'og:description', 'content': this.artist.bio, 'vmid': 'og:description'}
            ]
        } 
    }
}
</script>