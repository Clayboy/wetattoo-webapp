<template>
    <div id="app" class="flex flex-col full-page">
        <home-header></home-header>
        <main>
            <div id="jumbo" class="sm:flex sm:items-center sm:justify-center shadow" style="margin-top:6.5rem">
                <video preload="auto" autoplay loop muted id="jumbo-video"
                    :poster="`https://cdn.we-tattoo.com/assets/homepage/homepageposter_${videonumber}.jpg`"
                    class="relative sm:absolute w-full left-0">
                    <source :src="`https://cdn.we-tattoo.com/assets/homepage/homepagevideo_${videonumber}.mp4`" type="video/mp4">
                    <source :src="`https://cdn.we-tattoo.com/assets/homepage/homepagevideo_${videonumber}.webm`" type="video/webm">
                </video>

                <div class="search-panel">
                    <h2 class="text-lg lg:text-2xl text-center">
                        {{ $t('Votre prochain tatouage commence ici') }}
                    </h2>
                    <h3 class="text-base lg:text-xl text-center mb-4">
                        {{
                            $t("Inspirez-vous. Contactez les artistes. Réservez.")
                        }}
                    </h3>

                    <form @submit.prevent="search">
                        <div class="md:flex">
                            <style-selector class="md:w-1/2 md:mr-3" v-model="filters.styles" label="" />
                            <place-selector class="md:w-1/2 text-gray-900" label="" type="city" :value="filters.city" @input="searchLocation($event)"></place-selector>
                        </div>
                        <div class="text-right">
                            <button class="button">{{ $t('Trouver un artiste') }}</button>
                        </div>
                    </form>
                </div>
            </div>
            <section>

                <div class="visible md:hidden shadow-md">
                    <div class="bg-white flex items-stretch justify-between">
                        <div v-for="arg in args"
                            :key="`tabtitle-${arg.name}`"
                            class="py-4 text-center cursor-pointer w-1/4"
                            :class="{'bg-gray-200' : currentTab == arg.name}"
                            @click="currentTab = arg.name">
                            <font-awesome-icon class="text-2xl text-indigo-800" :icon="arg.icon"></font-awesome-icon>
                            <h3 class="my-1 font-medium text-gray-700">
                                {{ arg.title }}
                            </h3>
                        </div>
                    </div>
                    <div>
                        <div class="bg-gray-200 text-gray-700 py-3 px-6">
                            <p v-for="arg in args"
                                v-show="currentTab == arg.name"
                                :key="`tabcontent-${arg.name}`">
                                {{ arg.description }}
                            </p>
                        </div>
                    </div>
                </div>

                <div class="hidden md:visible md:flex md:flex-wrap items-stretch shadow-md">
                    <div v-for="arg in args"
                        :key="`lg-${arg.name}`"
                        class="about-card about-card-light md:w-1/2 lg:w-1/4">
                        <font-awesome-icon class="block mx-auto text-4xl text-indigo-800 mb-2" :icon="arg.icon"></font-awesome-icon>
                        <h3>{{ arg.title }}</h3>
                        <p>
                            {{ arg.description }}
                        </p>
                    </div>
                </div>
            </section>

            <section class="py-12 bg-home">
                <div class="container mx-auto">
                    <h2 class="text-2xl sm:text-4xl mb-6 text-center text-white">
                        {{ $t('Nouveaux talents à découvrir sur WE Tattoo') }}
                    </h2>
                    <div class="flex flex-wrap items-stretch justify-center">
                        <div  v-for="artist in artists"
                            :key="`artist-${artist.id}`"
                            class="w-1/3 md:w-1/6 p-2">
                            <nuxt-link class="block bg-white shadow p-1 h-full" :to="{name : 'artists-slug', params : {slug : artist.slug}}">
                                <avatar :img="artist.avatar_url"></avatar>
                                <h5 class="text-lg text-center">{{ artist.pseudo }}</h5>
                            </nuxt-link>
                        </div>
                        <div class="w-1/3 md:w-1/6 p-2">
                            <div class="bg-white shadow p-1 h-full text-center font-medium py-4">
                                <font-awesome-icon :icon="['fal', 'bolt']" class="sm:my-6 text-4xl"></font-awesome-icon>
                                <br />
                                {{ $t('Vous êtes artiste ?' )}}

                                <nuxt-link class="inline-block bg-indigo-800 px-4 mt-3 py-2 rounded hover:bg-indigo-900 text-white font-normal" :to="localePath({name : 'auth-register-type', params : {type : 'artist'}})">
                                    {{ $t('Créez un compte!') }}
                                </nuxt-link>
                            </div>

                        </div>
                    </div>
                </div>
            </section>

            <section class="bg-gray-200 py-12 shadow-md">
                <div class="container mx-auto">
                    <h2 class="text-2xl mb-6 text-center">
                        {{ $t('Le service en ligne pour les professionnels et les futurs tatoués') }}
                    </h2>
                    <div class="md:flex md:items-stretch">
                        <div class="bg-white m-2 shadow px-6 py-4 md:w-1/3">
                            <h3 class="text-lg mb-3">
                                {{ $t('Tatoueurs') }}
                            </h3>
                            <p class="text-sm mb-2">
                                {{ $t('Votre page dédiée à la diffusion de votre art : portfolio, guests, formulaire de réservations et disponibilités.') }}
                            </p>
                            <p class="text-sm mb-2">
                                {{$t("Tous les outils pour simplifier votre activité et vous concentrer sur le tatouage : Prise de réservation en ligne, Gestion de vos projets, de votre agenda, de vos déplacements.")}}
                            </p>
                            <p class="text-center mt-3">
                                <nuxt-link class="border rounded border-indigo-800 text-indigo-800 px-4 py-1" :to="localePath('about-artists')">
                                    {{ $t("Découvrez les fonctionnalités") }}
                                </nuxt-link>
                            </p>
                        </div>
                        <div class="bg-white m-2 shadow px-6 py-4 md:w-1/3">
                            <h3 class="text-lg mb-3">
                                {{ $t("Clients") }}
                            </h3>
                            <p class="text-sm mb-2">
                                {{ $t("Besoin d'inspiration pour votre prochain tatouage? Explorez la galerie, les styles et tatoueurs.") }}
                            </p>
                            <p class="text-sm mb-2">
                                {{ $t('Prenez contact avec votre futur tatoueur avant de le rencontrer. Vous voyagez? Trouvez un tatoueur à destination et préparez votre projet!') }}
                            </p>
                        </div>
                        <div class="relative bg-white m-2 shadow px-6 py-4 md:w-1/3">
                            <h3 class="text-lg mb-3">
                                {{ $t('Managers') }}
                            </h3>
                            <p class="text-sm mb-2">
                                {{ $t("Vous gérez un salon? Voici l'outil pour centraliser toute la gestion des tatoueurs : présentation du parlor, des artistes, prise de RDV, gestion du planning et des dispos.") }}
                            </p>
                            <p class="text-sm mb-2">
                                {{ $t("Vous gérez plusieurs tatoueurs? Voici l'outil pour centraliser toutes les demandes et traiter plus facilement les demandes entrantes.") }}
                            </p>
                            <span class="rounded border-2 border-gray-700 text-indigo-800 absolute px-4 py-1 text-center" style="top:calc(50% - 1rem);left:5%;width:90%;overflow:hidden;transform: rotate(-5deg);z-index: 30;background: rgba(255,255,255,0.8);">{{ $t('BIENTÔT!') }}</span>
                        </div>
                    </div>
                </div>
            </section>

            <section class="py-10">
                <div class="container mx-auto">
                    <h2 class="text-2xl sm:text-4xl mb-6 text-center">
                        {{$t('Inspirez-vous!')}}
                    </h2>
                    <div class="flex flex-wrap items-stretch justify-center">
                        <div  v-for="media in medias"
                            :key="`media-${media.id}`"
                            class="w-1/3 md:w-1/6 p-1">
                            <nuxt-link class="media" :to="{name : 'artists-slug', params : {slug : media.artist.slug}}">
                                <img :src="media.url" :alt="media.caption" />

                                <div class="media-credit">
                                    <avatar :img="media.artist.avatar_url" :size="6" class="mr-2" />
                                    <h5>{{ media.artist.pseudo }}</h5>
                                </div>
                            </nuxt-link>
                        </div>
                    </div>
                </div>
            </section>

            <!-- <div class="container mx-auto">

            </div> -->
        </main>

        <app-footer></app-footer>
    </div>

</template>


<script>
    import StyleSelector from "@/components/forms/StyleSelector";
    import HomeHeader from "@/components/layout/HomeHeader";
    import PlaceSelector from "@/components/forms/PlaceSelector";
    import AppFooter from "@/components/layout/Footer";
    import ArtistCard from "@/components/ArtistCard";

    export default {
        layout : 'empty',
        data(){
            return {
                videonumber : Math.floor(Math.random() * 2) + 1,
                currentTab : 'explore',
                filters :{
                    styles: [],
                    city:'',
                    country:'',
                },


            }
        },
        async asyncData({$axios}){
            let artistsResponse = await $axios.get('/artists', {params : {per_page : 5}});
            let mediasResponse = await $axios.get('/medias', {params : {per_page : 12}});


            return {
                artists : artistsResponse.data.data,
                medias : mediasResponse.data.data,
            }
        },

        computed:{
            args(){
                return [
                    {name : 'explore', icon : ['fal', 'compass'], title : this.$i18n.t('Explorez'), description : this.$i18n.t("Explorez les styles, les motifs pour votre prochain tatouage et trouvez l'artiste qui pourra le réaliser. Suivez l'actualité de vos artistes préférés.")},
                    {name : 'flashmarket', icon : ['fal', 'bolt'], title : this.$i18n.t('Flash Market'), description : this.$i18n.t("Tatoueurs, diffusez votre art gratuitement, créez votre catalogue de flash et recevez des demandes de réservation.") + " " + this.$i18n.t('bientôt disponible')},
                    {name : 'book', icon : ['fal', 'comment-alt-check'], title : this.$i18n.t('Réservez'), description : this.$i18n.t("Réservez un flash disponible sur la galerie des artistes ou prenez contact pour un premier échange sur votre projet tattoo.")},
                    {name : 'guestpot', icon : ['fal', 'globe-europe'], title : this.$i18n.t('Guestspots'), description : this.$i18n.t("Soyez notifiés de la venue d'artiste près de chez vous. Vous voyagez, préparez votre rendez-vous avant de partir.")},
                ]
            },

        },
        methods:{
            search(){
                this.$router.push({path : '/artists', query : this.filters})
            },

            searchLocation(payload){
                this.filters.city = payload.city;
                this.filters.country = payload.country;
            },

            
        },
        components:{
            StyleSelector,
            PlaceSelector,
            HomeHeader,
            AppFooter,
            ArtistCard
        }

    }
</script>


<style lang="scss">

    #jumbo{

        @screen sm {
            max-height:420px;
            min-height:420px;
        }

        @apply overflow-hidden relative;
        @apply text-white;
    }

    #jumbo-video{
        top:0px;

        @screen lg {
            top:-35%;
        }
    }

    .about-card{
        @apply py-4 px-6 text-gray-700 bg-white;

        @screen sm {
            @apply py-6 px-12
        }
    }

    .about-card:hover{
        @apply bg-gray-200;
    }

    .about-card h3{
        @apply font-medium text-lg uppercase mb-3 text-center;

        @screen md{
            @apply text-lg
        }
    }

    .about-card p{
        @apply text-sm;
    }

    #logoSwitch{
        position:absolute;
        height:150px;
        top:0;
        left:0;
        content:' ';
        width:100%;

        @screen md{
            height:100px;
        }
    }

    .search-panel{
        @apply z-10 px-6 py-4 text-white bg-gray-800 shadow;

        @screen sm{
            @apply px-12 py-8 rounded-lg;
            background-color:rgba(45,55,72, 0.75);
        }

        @screen md{
            @apply w-1/2 mx-20;
        }
    }

    .media{
        @apply block p-1 h-full relative bg-white shadow;
    }

    .media .media-credit{
        transition:.3s;
        @apply absolute w-full bottom-0 left-0 opacity-0 flex items-center px-3 py-2 text-gray-700 bg-white;
    }

    .media:hover .media-credit{
        @apply opacity-100;
    }

</style>
