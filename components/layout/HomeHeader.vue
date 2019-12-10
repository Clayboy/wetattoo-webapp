<template>
    <header class="fixed top-0 z-50 w-full bg-gray-800 border-b border-gray-900 px-2 sm:px-3 shadow sm:shadow-none">
        <div class="relative flex items-center justify-between py-1 flex-wrap">
            <!-- Site menu -->
            <div class="w-1/3 sm:w-2/5 flex-grow">
                <ul class="hidden sm:flex items-center justify-end main-nav mt-2 sm:mt-auto text-right">
                    <li v-for="(item, index) in menu" :key="`large-menu-${index}`">
                        <router-link :to="item.route" v-text="item.label" />
                    </li>
                </ul>
            </div>

            <div class="w-1/3 sm:w-1/5 relative flex-shrink-0 text-center " style="height:6.5rem;">
                <h1 class="text-white leading-loose sm:leading-tight font-medium md:font-light text-2xl lg:text-4xl whitespace-no-wrap">
                    WE Tattoo
                </h1>
                <img src="/images/logo_600.png" alt="We Tattoo" class="home-logo rounded-full shadow" />
            </div>
            <div class="w-1/3 sm:w-2/5 flex-grow">
                <ul class="hidden sm:flex items-center justify-start main-nav text-left whitespace-no-wrap" v-if="!$auth.loggedIn">
                    <li v-if="connection">
                        <router-link :to="localePath('auth-login')">
                            {{ $t('Connexion') }}
                        </router-link>
                    </li>
                    <li v-if="register_member">
                        <router-link :to="localePath('auth-register-type')">
                            {{ $t('Accès tatoué') }}
                        </router-link>
                    </li>
                    <li v-if="register_tattooist">
                        <router-link :to="localePath({name : 'auth-register-type', params : {type : 'artist'}})">
                            {{ $t('Accès tatoueur') }}
                        </router-link>
                    </li>
                </ul>

                <div  v-if="$auth.loggedIn" class="hidden sm:flex items-center justify-start">
                    <user-notifications class="sm:mr-2"></user-notifications>
                    <user-top-menu></user-top-menu>
                </div>
            </div>
        </div>

        <!-- Small size defice burger -->
        <div class="block sm:hidden order-2 py-2 text-white text-lg"  style="position:absolute;top:0.5rem;right:1rem;">
            <button @click="toggle" class="px-3 py-2 border rounded hover:bg-gray-600">
                <svg class="fill-current h-5 w-5" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                <title>Menu</title>
                <path d="M0 3h20v2H0V3zm0 6h20v2H0V9zm0 6h20v2H0v-2z"/></svg>
            </button>
        </div>


        <div v-if="open" class="fixed left-0 h-full w-full z-30 py-6 px-4 block sm:hidden" style="top:6.5rem;height:calc(100% - 6rem);background:rgba(45,55,72,0.9)">
            <div  v-if="$auth.loggedIn" class="mb-8 pb-8 border-b border-gray-300">
                <!-- <notification-icon class="sm:mr-2"></notification-icon> -->
                <user-top-menu></user-top-menu>
            </div>

            <ul class="main-nav mt-2 sm:mt-auto">
                <li v-for="(item, index) in menu" class="my-1" :key="`small-menu-${index}`">
                    <router-link class="block" :to="item.route" v-text="item.label" />
                </li>
            </ul>

            <ul class="main-nav text-left whitespace-no-wrap mt-8 pt-8 border-t border-gray-300" v-if="!$auth.loggedIn">
                <li v-if="connection" class="mr-3 my-1">
                    <nuxt-link class="text-gray-600 hover:text-indigo-900" :to="localePath('auth-login')">
                        {{ $t('Connexion') }}
                    </nuxt-link>
                </li>
                <li v-if="register_member" class="mr-3 my-1">
                    <nuxt-link class="text-gray-600 hover:text-indigo-900" :to="localePath({name: 'auth-register-type'})">
                        {{ $t('Accès tatoué') }}
                    </nuxt-link>
                </li>
                <li v-if="register_tattooist" class="mr-3 my-1">
                    <nuxt-link class="text-gray-600 hover:text-indigo-900" :to="localePath({name: 'auth-register-type', params : {type : 'artist'}})">
                        {{ $t('Accès tatoueur') }}
                    </nuxt-link>
                </li>
            </ul>
        </div>

        <lang-switcher v-if="!$auth.loggedIn" class="hidden sm:block" style="position:absolute;top:0.5rem;right:0.5rem;"></lang-switcher>

    </header>
</template>


<script>
    import UserNotifications from '@/components/users/UserNotifications'
    import UserTopMenu from '@/components/users/UserTopMenu'
    import { mapGetters, mapState } from 'vuex'

    export default {

        data(){
            return {
                open:false,
                connection : true,
                register_member : true, //process.env.REGISTER_MEMBER,
                register_tattooist : true //process.env.REGISTER_ARTISTS,
            }
        },

        watch: {
            '$route' (to, from) {
                this.open = false;
            }
        },

        computed:{
            ...mapGetters({
                menu : 'menu',
            }),

            ...mapState({
                user: state => state.auth.user
            }),
        },

        methods:{
            toggle(){
                this.open = !this.open
            },
        },

        components:{
            UserNotifications,
            UserTopMenu,
        }
    }
</script>
