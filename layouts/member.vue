<template>
    <div id="app" class="bg-page">
        <app-header></app-header>
        <main class="pb-10" style="padding-top:56px;">
            <div class="sidebar flex text-2xl flex-col">
                <ul class="sidebar-mainmenu h-full hidden sm:block">
                    <li v-for="(item, index) in menu" :key="index" :class="item.class ? item.class : ''">
                        <nuxt-link v-if="item.routeName" :to="{name : item.routeName, params : item.params != undefined ? item.params : {}, query : item.query != undefined ? item.query : {}}">
                            <font-awesome-icon :icon="['fal', item.icon]"></font-awesome-icon>
                        </nuxt-link>
                    </li>
                    <li  class="hidden sm:block flex-grow"></li>
                    <li>
                        <nuxt-link :to="profilePage" class="text-center h-full block">
                            <avatar :img="user.avatar_url" :size="8"></avatar>
                        </nuxt-link>
                    </li>
                    <li class="hidden sm:block">
                        <nuxt-link :to="{name : 'app-settings-account'}">
                            <font-awesome-icon :icon="['fal', 'cog']"></font-awesome-icon>
                        </nuxt-link>
                    </li>
                    <li class="hidden sm:block">
                        <button class="text-center w-full block" @click.prevent="$auth.logout()">
                            <font-awesome-icon :icon="['fal', 'power-off']"></font-awesome-icon>
                        </button>
                    </li>
                </ul>

            </div>

            <div class="pb-6 member-content">
                <nuxt />
            </div>
            <template v-if="usertype == 'artist'">
                <project-form :artist-id="profile.id" v-if="bookingForm" :flash="bookingFlash" @close="$store.dispatch('bookings/closeForm')"></project-form>
            </template>
        </main>
    </div>
</template>

<script>

import AppHeader from '@/components/layout/Header';
import { mapState, mapGetters } from 'vuex';
import ProjectForm from '@/components/bookings/ProjectForm';

export default {
    components : {
        AppHeader,
        ProjectForm
    },

    data(){
        return {
            menus : {
                artist : [
                    {routeName : 'app-home',        icon : 'home'},
                    {routeName : 'app-portfolio',   icon : 'image-polaroid'},
                    {routeName : 'app-tattooflash', icon : 'bolt'},
                    // {routeName : 'app-events',      icon : 'globe-stand'},
                    {routeName : 'app-bookings',    query : {status:"pending"}, icon : 'paper-plane'},
                    {routeName : 'app-calendar',    icon : 'calendar-alt'},
                ],
                member : [
                    {routeName : 'app-home', icon : 'home'},
                    {routeName : 'artists', icon : 'compass'},
                    {routeName : 'app-bookings', query : {status:"pending"}, icon : 'paper-plane'},
                ]
            }
        }
    },

    computed:{

        ...mapState({
            bookingForm     : state => state.bookings.displayForm,
            bookingFlash    : state => state.bookings.flash,
            user            : state => state.auth.user,
            usertype        : state => state.auth.user.profile_type,
            profile         : state => state.auth.user.profile,
        }),

        menu(){
            if(this.menus[this.usertype] != undefined){
                return this.menus[this.usertype];
            }

            return [];
        },

        profilePage(){
            if(this.user.profile_type == 'artist'){
                return {name : 'artists-slug', params : {slug : this.user.profile.slug}};
            }else{
                return ({name : 'app-profile'});
            }
        }
    }
}
</script>


<style class="scss">

    .el-popover.sidebar-hover{
        @apply text-white bg-gray-800 py-1 px-3 text-base;
    }

    .el-popper.sidebar-hover[x-placement^=right] .popper__arrow,
    .el-popper.sidebar-hover[x-placement^=right] .popper__arrow:after{
        border-right-color:#2D3748;
    }

</style>
