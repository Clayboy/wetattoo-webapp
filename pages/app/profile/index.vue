<template>
    <div class="container mx-auto">
        <div class="absolute w-full bg-home left-0 h-32">

        </div>
        <aside class="relative bg-white"  v-if="user">
            <div class="cover bg-home h-32 mb-16 shadow">
                <div class="text-white flex justify-end px-4 pt-2">
                    <router-link :to="{name: 'profile.general'}" class="border bg-gray-900 border-gray-300 px-4 py-1 rounded">
                        {{$t('Editer')}}
                    </router-link>
                </div>
                <avatar :img="user.avatar_url" :size="32" class="shadow flex-shrink-0 flex-grow-0 mb-3 mx-auto md:ml-10 border-2" />
            </div>
            <div class="md:ml-48 md:-mt-10 px-4">
                <div class="mb-4">
                    <h2 class="font-base text-2xl mb-2 leading-none truncate leading-none" >
                        {{ user.name }}
                    </h2>
                </div>

                <div class="flex mb-1" v-if="location">
                    <span class="w-6 text-gray-600 inline-block text-left mr-1">
                        <font-awesome-icon class="mr-1" :icon="['fal', 'map-marker-alt']"></font-awesome-icon>
                    </span>
                    {{ location }}
                </div>
                <div class="my-3">
                    {{ user.bio }}
                </div>
                <div class="text-sm flex flex-wrap mt-3">
                    <span v-for="style in styles"
                        :key="`${user.id}${style.name}`"
                        class="text-sm text-gray-500 border border-gray-300 mr-1 mb-1 px-1 rounded hover:bg-gray-100">
                        {{ style.label }}
                    </span>
                </div>
            </div>
        </aside>

        <div class="bg-white pt-4">
            <div class="flex items-center justify-center border-b-2 border-gray-200">
                <ul class="flex">
                    <!-- <li class="mr-3">
                        <router-link :to="{name : 'profile.followings'}"  class="nav-tab">
                            {{ $t("Inspiration") }}
                        </router-link>
                    </li> -->
                    <li class="mr-3">
                        <router-link :to="{name : 'profile.subscriptions'}" class="nav-tab" href="#">
                            {{ $t("Abonnements") }}
                        </router-link>
                    </li>
                </ul>
            </div>

            <div class="sm:px-4 sm:py-3">
                <router-view :user="user"></router-view>
            </div>
        </div>
    </div>

</template>

<script>


import {tattooStyles} from '@/utilities/TattooVars';
import Visible from '@/components/Visible';
import BookingForm from '@/components/bookings/BookingForm'
import SubscribeButton from '@/components/forms/SubscribeButton'
import { mapState } from 'vuex';

export default {
    middleware : 'auth',
    components:{
        Visible,
        BookingForm,
        SubscribeButton
    },

    data(){
        return {
            artist : null,
            bookingForm : false,
            displayWorkHours : false,
        }
    },

    computed: {
        ...mapState({
            user : state => state.auth.user,
            profile : state => state.auth.user.profile,
        }),
        location(){
            if(this.user.address != null){

                let location = [
                    this.user.address.city
                ];
                if(this.user.address.country_code == 'us'){
                    location.push(this.user.address.administrative);
                }
                location.push(this.user.address.country_code.toUpperCase());

                return location.join(', ');
            }

            return false;
        },

        styles(){
            if(this.profile.preferred_styles == null){
                return [];
            }

            return tattooStyles.filter(style => this.profile.preferred_styles.indexOf(style.name) != -1)
        },
    },

    methods:{
    }
}
</script>
