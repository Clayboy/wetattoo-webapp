<template>
    <div class="container mx-auto">
        <header class="sm:flex items-center mb-4">
            <h1 class="page-title flex-grow">
                Portfolio
            </h1>
            <div>
                <button v-if="account" class="btn btn-primary" @click="disconnectProvider">
                    Déconnecter Instagram
                </button>
            </div>
        </header>
        <div class="panel">
            <div class="pb-6" v-if="displayInstagramSplash">
                <div class="md:flex items-stretch justify-center">
                    <div @click="connectProvider('facebook')" class="mb-4 sm:m-4 border border-gray-500 md:w-1/3 p-4 text-center hover:bg-gray-200 cursor-pointer">
                        <div class="text-6xl mb-6">
                            <font-awesome-icon class="text-gray-700" :icon="['fab', 'facebook']"></font-awesome-icon>
                            +
                            <font-awesome-icon class="text-gray-700" :icon="['fab', 'instagram']"></font-awesome-icon>
                        </div>
                        <div class="text-base sm:text-xl">Vous avez une <strong>page Facebook</strong> avec votre compte <strong>Instagram</strong> lié</div>
                        <div class="text-xs sm:text-sm">
                            En vous connectant, vous pourrez vous connecter à We Tattoo avec votre compte Facebook
                        </div>

                    </div>
                    <div @click="connectProvider('instagram')" class="mb-4  sm:m-4 border border-gray-500 md:w-1/3 p-4 text-center hover:bg-gray-200 cursor-pointer">
                        <div class="text-6xl mb-6">
                            <font-awesome-icon class="text-gray-700" :icon="['fab', 'instagram']"></font-awesome-icon>
                        </div>
                        <div class="text-base sm:text-xl">Vous avez un compte Instagram personnel</div>
                        <div class="text-xs sm:text-sm">

                        </div>
                    </div>
                </div>
                <div class="text-center">
                    <button class="text-blue-400" @click="displayInstagramSplash = false">
                        Retour
                    </button>
                </div>
            </div>


            <div v-if="account" class="mb-8">
                Le portfolio affichera les posts du compte <a class="text-blue-500" :href="`https://instagram.com/${account.username}`">@{{ account.username }}</a>
            </div>
            <div class="md:w-2/3 mx-auto my-10 p-8 text-base sm:text-xl text-center text-gray-400" v-if="!account && !displayInstagramSplash">
                Connectez votre compte Instagram<br />
                Votre page tatoueur affichera automatiquement vos derniers posts.
                <br />
                <button v-if="account == null" class="btn btn-primary mt-10" @click="connectInstagramSplash">
                    Connecter un compte Instagram
                </button>
            </div>

            <ul class="flex flex-wrap -m-1">
                <li v-for="post in medias" :key="post.id" class="p-1 w-1/2 sm:1/3 md:w-1/5">
                    <a target="_blank" :href="post.permalink">
                        <img :src="post.url" alt="">
                    </a>
                </li>
            </ul>
        </div>
    </div>
</template>

<script>
    export default {
        middleware : 'auth-artist',
        layout:'member',
        data(){
            return {
                displayInstagramSplash : false,
                account : false,
                medias : [],
                portfolio : {},
            }
        },


        created(){
            if(this.$route.name == 'portfolio.provider_callback'){
               this.callbackProvider(this.$route.params.provider);
            }
        },

        mounted(){
            this.getPortfolio();
        },

        methods:{

            connectInstagramSplash(){
                this.displayInstagramSplash = true;
            },

            connectProvider(provider){
                this.$axios.get(`/login/${provider}`, {params : {
                        redirect: 'auth',
                    }})
                    .then(({data}) => {
                        window.location = data.redirect_url;
                    });
            },

            callbackProvider(provider){
                this.$axios.post(`/associate/${provider}/callback`, {
                    ...this.$route.query,
                    redirect: 'auth'
                })
                .then(() => {
                    axios.put(`/artists/${this.$store.state.auth.user.profile_id}/portfolio`, {
                        'provider' : provider
                    })
                    .then(({data}) => {

                        this.account = data.account;
                        this.medias = data.medias;
                        this.portfolio = data.portfolio;

                        this.$store.dispatch('auth/setProfileProp', {prop : 'portfolio', value : {...data.portfolio}});

                        this.$router.push('app-portfolio')

                    })

                });
            },

            disconnectProvider(){
                this.loading = true;
                this.$axios.delete(`/artists/${this.$store.state.auth.user.profile_id}/portfolio`)
                    .then((response) => {
                        this.account = null;
                        this.medias = [];

                        this.$store.dispatch('auth/setProfileProp', {prop : 'portfolio', value : null});
                    })
            },

            getPortfolio(){

                this.$axios.get(`/artists/${this.$store.state.auth.user.profile_id}/portfolio`)
                    .then(({data}) => {
                        this.account = data.account;
                        this.medias = data.medias;
                    })
                    .catch((error) => {

                        this.$message({
                            type:'error',
                            message : "Erreur lors de la connexion avec Instagram. Veuillez re-connecter le compte.",
                        })
                    });
            }
        },
        head(){
            return {
                title : this.$i18n.t("Portfolio")
            }
        }
    }
</script>
