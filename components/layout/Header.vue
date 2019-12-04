<template>
    <header class="fixed top-0 z-50 w-full bg-gray-800 border-b border-gray-900 px-3 shadow sm:shadow-none">
        <div class="flex items-center justify-between py-1 flex-no-wrap">
            <!-- Logo -->
            <a class="no-underline -my-1 flex items-center mr-10 flex-shrink-0 flex-grow sm:flex-grow-0" href="/" style="height:56px;">
                <img src="/images/logo_big.png" alt="We Tattoo" class="w-10 h-10 -mt-1 mr-2 md:mr-2"/>
                <div class="font-light text-2xl md:text-3xl text-white">
                    We Tattoo
                </div>
            </a>

            <!-- Small size defice burger -->
            <div class="block sm:hidden text-white">
                <button @click="toggle" class="px-3 py-2 border rounded hover:bg-gray-600">
                    <svg class="fill-current h-5 w-5" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                    <title>Menu</title>
                    <path d="M0 3h20v2H0V3zm0 6h20v2H0V9zm0 6h20v2H0v-2z"/></svg>
                </button>
            </div>

            <!-- Site menu -->
            <div class="hidden sm:w-auto sm:flex-grow sm:flex sm:items-center">
                <ul class="main-nav flex flex-wrap mt-2 sm:flex-no-wrap">
                    <li v-for="(item, index) in menu" :key="`large-${index}`">
                        <nuxt-link class="block" :to="item.route" v-text="item.label" />
                    </li>
                </ul>


                <div  v-if="$auth.loggedIn" class="ml-auto flex flex-shrink-0 items-center order-3 sm:order-last">
                    <user-notifications class="sm:mr-2 pt-1 mx-2"></user-notifications>
                    <user-top-menu></user-top-menu>
                </div>

                <!--  Unauthenticated menu (login) -->

                <ul class="hidden sm:flex main-nav ml-auto items-center order-last" v-if="!$auth.loggedIn">
                    <li v-if="connection">
                        <nuxt-link class="text-gray-600 hover:text-indigo-900" :to="localePath('auth-login')">
                            {{ $t('Connexion') }}
                        </nuxt-link>
                    </li>
                    <li v-if="register_member">
                        <router-link class="text-gray-600 hover:text-indigo-900" :to="{name: 'register'}">
                            {{ $t('Rejoindre la communauté') }}
                        </router-link>
                    </li>
                    <li v-if="register_tattooist">
                        <router-link class="text-gray-600 hover:text-indigo-900" :to="{name: 'register.artist'}">
                            {{ $t('Accès tatoueur') }}
                        </router-link>
                    </li>
                    <li>
                        <lang-switcher />
                    </li>
                </ul>
            </div>

            <!--  Authenticated identity -->
        </div>

        <div v-if="open" class="fixed sm:hidden left-0 h-full w-full z-30 py-6 px-4" style="top:56px;height:calc(100% - 56px);background:rgba(45,55,72,0.95)">
            <div  v-if="authenticated" class="mb-8 pb-8 border-b border-gray-300">
                <user-top-menu></user-top-menu>
            </div>

            <ul class="main-nav mt-2 sm:mt-auto">
                <li v-for="(item, index) in menu" class="my-1" :key="`small-menu-${index}`">
                    <router-link class="block" :to="item.route" v-text="item.label" />
                </li>
            </ul>

            <ul class="main-nav text-left whitespace-no-wrap mt-8 pt-8 border-t border-gray-300" v-if="!$auth.loggedIn">
                <li v-if="connection" class="mr-3 my-1">
                    <router-link class="text-gray-600 hover:text-indigo-900" :to="{name: 'login'}">
                        {{ $t('Connexion') }}
                    </router-link>
                </li>
                <li v-if="register_member" class="mr-3 my-1">
                    <router-link class="text-gray-600 hover:text-indigo-900" :to="{name: 'register'}">
                        {{ $t('Accès tatoué') }}
                    </router-link>
                </li>
                <li v-if="register_tattooist" class="mr-3 my-1">
                    <router-link class="text-gray-600 hover:text-indigo-900" :to="{name: 'register.artist'}">
                        {{ $t('Accès tatoueur') }}
                    </router-link>
                </li>
            </ul>
        </div>
    </header>
</template>


<script>

    import UserNotifications from '@/components/users//UserNotifications'
    import UserTopMenu from '@/components/users/UserTopMenu'
    import { mapGetters, mapState } from 'vuex'

    export default {

        data(){
            return {
                open:false,
                connection : true,
                register_member : true,
                register_tattooist : true,
            }
        },

        watch: {
            '$route' (to, from) {
                this.open = false;
            }
        },

        computed:{
            authenticated(){
                return this.$store.getters['auth/authenticated'];
            },

            ...mapGetters([
                'menu',
            ]),

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
