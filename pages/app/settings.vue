<template>
    <div class="container mx-auto">
        <header class="mb-4 px-3 sm:px-0">
            <h1 class="page-title">
                <!-- <span v-if="parentMenu">{{ parentMenu.meta.label }}</span> <span class="mx-1">></span> {{ $route.meta.label }} -->
            </h1>
        </header>

        <div class="relative md:flex">
            <div class="md:w-1/4 md:mr-4 left-0 w-full md:relative">
                <ul class="sidenav">
                    <li v-for="item in tabs" class="sidenav-item md:w-full" :class="flexClass" :key="item.name">
                        <nuxt-link class="sidenav-link" :to="{name : item.route}">
                            <font-awesome-icon class="md:mr-3 text-lg" :icon="['fal', item.icon]"></font-awesome-icon>
                            <div class="text-xs sm:text-base">
                                {{ item.label }}
                                <p class="hidden sm:block text-gray-500 text-xs">
                                    {{ item.description }}
                                </p>
                            </div>
                        </nuxt-link>
                    </li>
                </ul>
            </div>
            <div class="md:w-3/4 bg-white shadow p-4">
                <nuxt-child />
            </div>
        </div>
    </div>
</template>

<script>
    export default {
        middleware : 'auth',
        layout: 'member',
        data () {
            return {
                nestedRoutes: [],

                tabs : [
                    {
                        route : 'app-settings-account',
                        label : 'Compte',
                        icon : 'cog',
                        description : 'Vos informations de compte : nom, langue, email',
                    },
                    {
                        route : 'app-settings-security',
                        label : 'Sécurité',
                        icon : 'shield',
                        description : 'Gestion du mot de passe',
                    },
                    {
                        route : 'app-settings-billing',
                        label : 'Abonnement',
                        icon : 'credit-card',
                        description : 'votre offre et vos factures',
                    },

                ]
            }
        },
        created(){
            this.$router.options.routes.forEach((routeOption) => {
                if (routeOption.path.startsWith(this.$route.path)) {
                this.nestedRoutes.push({
                    name: routeOption.name,
                    path: routeOption.path,
                })
                }
            })
        },
        computed:{
            usertype(){
                return this.$store.$auth.user.profile_type
            },

            parentMenu(){
                let parentRoute = this.$route.matched[0];
                let parentMenu  = this.$router.options.routes.find((route) => route.name == parentRoute.name);
                return parentMenu;
            },

            submenu(){
                if(this.parentMenu && this.parentMenu.children != undefined){
                    return this.parentMenu.children;
                }

                return [];
            },

            flexClass(){
                return `w-1/${this.submenu.length}`
            }
        }
    }
</script>
