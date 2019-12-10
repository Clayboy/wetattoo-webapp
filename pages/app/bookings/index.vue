<template>
    <div class="container mx-auto">
        <project-form :artist-id="artistId" v-if="displayForm" @close="displayForm = false"></project-form>
        <header class="mb-4">
            <h1 class="page-title">
                {{ $t("Réservations") }} > {{ current.label }}
            </h1>
        </header>

        <div class="md:flex md:items-start relative">
            <visible class="fixed top-0 left-0 z-10 w-full md:w-48 md:ml-24" style="padding-top:56px;" element-hidden="#nav">
                <ul class="sidenav whitespace-no-wrap">
                    <li v-for="item in nav" class="sidenav-item" :key="item.name">
                        <nuxt-link :to="{name : 'app-bookings', query: {status : item.name}}" class="sidenav-link px-2 sm:px-3 text-sm sm:text-base">
                            {{ item.tabLabel }}
                        </nuxt-link>
                    </li>
                </ul>
            </visible>
            <div id="nav" class="md:w-1/5 md:mr-6 flex-grow-0 flex-shrink-0">
                <div class="h-10 mb-3 px-3 sm:px-0">
                    <button  v-if="usertype == 'artist'" class="button block w-full" @click="displayForm = true">
                        {{ $t('Nouveau projet') }}
                    </button>
                </div>
                <ul class="sidenav whitespace-no-wrap">
                    <li v-for="item in nav" class="sidenav-item" :key="item.name">
                        <nuxt-link :to="{name : 'app-bookings', query: {status : item.name}}" class="sidenav-link px-2 sm:px-3 text-sm sm:text-base">
                            {{ item.tabLabel }}
                        </nuxt-link>
                    </li>
                </ul>
            </div>
            <div class="md:w-4/5">
                <div class="hidden md:flex items-end justify-between h-10 mb-3">
                    <p></p>
                    <paginator :pagination="this.pagination" @gotopage="fetch"></paginator>
                </div>
                <div class="bg-white shadow">
                    <booking-item
                        v-for="booking in bookings"
                        :key="booking.id"
                        :booking="booking"
                        :usertype="usertype"
                        class="border-b border-gray-300">
                    </booking-item>
                    <div v-if="pagination.total === 0" class="text-center text-lg text-gray-600 py-10">
                        <font-awesome-icon :icon="['fal', 'glass-citrus']" class="text-6xl inline-block mb-3"></font-awesome-icon>
                        <p>
                            {{ $t("Pas de réservation à traiter") }}
                        </p>
                    </div>

                    <paginator class="md:hidden justify-end p-4" :pagination="this.pagination" @gotopage="fetch"></paginator>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    import Visible from '@/components/Visible';
    import BookingItem from '@/components/bookings/BookingItem';
    import ProjectForm from '@/components/bookings/ProjectForm';
    import Paginator from '@/components/Paginator';
    import {bookingStatus} from '@/utilities/TattooVars';
import { mapState } from 'vuex';

    export default {
        layout : 'member',
        components:{
            BookingItem,
            ProjectForm,
            Visible,
            Paginator
        },
        data(){
            return {
                status : 'pending',
                nav : [
                    {name : 'all', icon : false, label : this.$i18n.t('Tous'), tabLabel : this.$i18n.t('Tous'), class  : ''},
                    ...bookingStatus
                ],
                bookings : [],
                pagination : {
                    total : false,
                    current_page : false,
                    per_page : 20,
                    last_page : false,
                },
                displayForm : false,
            }
        },
        computed:{
            ...mapState({
                user : state => state.auth.user,
                usertype : state => state.auth.user.profile_type,
                artistId : state => state.auth.user.profile.id,
            }),
            current(){
                return this.nav.find(item => item.name == this.status)
            }
        },
        created(){
            if(this.$route.query.status != undefined){
                this.status = this.$route.query.status;
            }
            this.fetch();
        },
        watch:{
            '$route.query'(newval, oldval){
                
                if(oldval.status != undefined && newval.status !== oldval.status){
                    this.pagination.current_page = false;
                    this.pagination.total = false;
                    this.status = newval.status;
                    this.fetch();
                }
            }
        },
        methods : {
            fetch(page = 1){

                if(page === this.pagination.current_page){
                    return false;
                }

                let queryString = [
                    `per_page=${this.pagination.per_page}`
                ];

                if(this.status != 'all'){
                    queryString.push(`status=${this.status}`);
                }

                if(page > 1){
                    queryString.push(`page=${page}`);
                }

                let endpoint = this.usertype == 'artist' ? `/artists/${this.artistId}/bookings` : `/users/${this.user.id}/bookings`

                this.$axios.get(`${endpoint}?` + queryString.join('&'))
                    .then(({data}) => {

                        this.bookings = data.data;

                        // Pagination update
                        this.pagination.total = parseInt(data.total, 10)
                        this.pagination.current_page = parseInt(data.current_page, 10)
                        this.pagination.last_page = parseInt(data.last_page, 10)
                        this.pagination.per_page = parseInt(data.per_page, 10)

                        // UI Scroll top
                        // window.scrollTo(0,0);
                    })
            }
        },
        metaInfo(){
            return {
                title : this.$i18n.t("Bookings")
            }
        }

    }
</script>
