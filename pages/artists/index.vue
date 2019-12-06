<template>
    <div class="w-full">
        <section class="bg-home shadow py-4 md:py-8" style="margin-top:0px">
            <div class="container mx-auto">
                <header class="flex justify-between items-center px-3 md:px-0">
                    <h3 class="font-light text-2xl lg:text-4xl  text-white">
                        {{ $t('Artistes') }}
                    </h3>
                    <div class="relative flex items-center">
                        <div class="mr-3 text-gray-300 text-sm">{{ pagination.total }} {{ $tc('artiste', pagination.total) }}</div>
                        <a href="#" class="border flex items-center border-gray-400 px-3 py-2 leading-none rounded text-sm" :class="{'bg-indigo-100 text-indigo-800' : filterMode, 'bg-white text-gray-700' : !filterMode}" @click.prevent="toggleFilters">
                            <template v-if="nbActiveFilters == 0">
                                <font-awesome-icon class="mr-1" :icon="['fal', 'filter']"></font-awesome-icon>
                                {{ $t('Filtrer') }}
                            </template>
                            <template v-else>
                                <div class="bg-indigo-800 text-white text-center rounded-full text-xs leading-none w-5 h-5 mr-1 -my-1 p-1">{{ nbActiveFilters }}</div>
                                {{ $tc('Filtre', nbActiveFilters) }}
                            </template>
                        </a>

                        <div class="list-filterpane" v-show="filterMode">
                            <h4 class="text-xl mb-3 flex items-center justify-between">
                                {{ $t('Filtrer les artistes') }}

                                <a href="#" class="sm:hidden" @click.prevent="filterMode = false">
                                    <font-awesome-icon :icon="['fal', 'times']" class="text-2xl text-gray-400"></font-awesome-icon>
                                </a>
                            </h4>

                            <form @submit.prevent="applyFilter">
                                <style-selector :value="filters.styles" @input="updateFilter($event, 'styles')" :label="$t('Par style')" />

                                <place-selector :label="$t('Par ville')" type="city" :value="filters.city" @input="updateFilter($event, 'location')"></place-selector>
                                <country-select :label="$t('Par pays')" :value="filters.country" @input="updateFilter($event, 'country')"></country-select>

                                <div class="text-right">
                                    <button role="button" @click.prevent="resetFilters" class="text-gray-600 mr-3">
                                        {{ $t('Réinitialiser') }}
                                    </button>
                                    <button type="submit" class="button button-small">
                                        {{ $t('Filtrer') }}
                                    </button>
                                </div>
                            </form>
                        </div>
                    </div>
                </header>
            </div>
        </section>
        <div class="container mx-auto py-6">
            <div v-if="!artists.length && nbActiveFilters" class="bg-white shadow-lg w-full text-xl text-center py-20 text-gray-500">

                <font-awesome-icon :icon="['fal', 'search']" class="mb-3 text-4xl"></font-awesome-icon>
                <p class="mb-6">
                    {{ $t("Aucun artiste trouvé pour les filtres sélectionnés") }}
                </p>

                <a href="" @click.prevent="resetFilters" class="text-base border border-indigo-800 text-indigo-800 px-3 py-1 rounded">{{ $t("Réinitialiser les filtres") }}</a>
            </div>
            <div class="md:flex md:flex-wrap md:-mx-2 mb-3">
                <nuxt-link v-for="artist in artists"
                    :to="localePath({name : 'artists-slug', params:{slug : artist.slug}})"
                    :key="artist.slug"
                    class="md:w-1/2 lg:w-1/3 p-2 block cursor-pointer">
                    <artist-card :artist="artist" />
                </nuxt-link>
            </div>

            <div class="text-right">
                <a href="#" v-if="hasPrevPage" @click.prevent="fetch('prev')" class="button btn-small mr-3">
                    <<
                </a>
                <a href="#" v-if="hasNextPage" @click.prevent="fetch('next')" class="button btn-small">
                    >>
                </a>
            </div>
        </div>
    </div>
</template>

<script>
    import ArtistCard from "@/components/ArtistCard";
    import StyleSelector from "@/components/forms/StyleSelector";
    import PlaceSelector from "@/components/forms/PlaceSelector";
    import CountrySelect from "@/components/forms/CountrySelect";

    export default {
        data(){
            return {
                filterMode: false,
            }
        },

        created(){

            let filterNames = Object.keys(this.filters);


            for(let filter in this.$route.query){

                if(filterNames.indexOf(filter) != -1){
                    if(filter == 'styles' && typeof this.$route.query[filter] == 'string'){
                        this.$route.query[filter] = [this.$route.query[filter]];
                    }

                    this.updateFilter(this.$route.query[filter], filter);
                }
            }

            if(this.$route.query.page != undefined){
                this.$store.commit('artists/UPDATE_CURRENT_PAGE', (parseInt(this.$route.query.page, 10) - 1));
            }


            if(this.artists.length == 0){
                this.$store.dispatch('artists/fetch');
            }

        },

        computed:{
            queryString(){
                return this.$store.getters['artists/fetchQueryString'];
            },
            activeFilters(){
                return this.$store.getters['artists/activeFilters'];
            },
            nbActiveFilters(){
                return Object.values(this.activeFilters).length;
            },
            pagination(){
                return this.$store.state.artists.pagination;
            },
            current_page(){
                return this.$store.state.artists.pagination.current_page;
            },
            filters(){
                return this.$store.state.artists.filters;
            },
            artists(){
                return this.$store.getters['artists/artists'];
            },
            hasPrevPage(){
                return this.$store.getters['artists/hasPrevPage'];
            },
            hasNextPage(){
                return this.$store.getters['artists/hasNextPage'];
            }
        },

        methods: {

            toggleFilters(){
                this.filterMode = !this.filterMode;
            },

            fetch(direction){

                this.$store.dispatch('artists/fetch', direction)
                    .then(() => {

                        let newQuery = JSON.parse(JSON.stringify(this.activeFilters));

                        if(this.current_page > 1){
                            newQuery['page'] = this.current_page;
                        }

                        if(JSON.stringify(this.$route.query) != JSON.stringify(newQuery)){
                            this.$router.push({ query: newQuery });
                        }

                        window.scrollTo(0,0);
                    })
            },


            updateFilter($event, filter){

                if(filter == 'location'){
                    for (let name in $event){
                        this.$store.commit('artists/UPDATE_FILTERS', {
                            name : name,
                            value : $event[name]
                        });
                    }
                }else{
                    this.$store.commit('artists/UPDATE_FILTERS', {
                        name : filter,
                        value : $event
                    });
                }
            },

            resetFilters(){

                this.$store.commit('artists/RESET_PAGINATION')

                Object.keys(this.filters).forEach(name => {
                    this.$store.commit('artists/UPDATE_FILTERS', {
                        name : name,
                        value : name == 'styles' ? [] : ''
                    });
                })

                this.fetch('next');
                this.filterMode = false;
            },

            applyFilter(){
                this.$store.commit('artists/RESET_PAGINATION')
                this.filterMode = false;
                this.fetch('next');
            }
        },

        components:{
            ArtistCard,
            StyleSelector,
            PlaceSelector,
            CountrySelect
        },
        metaInfo() {
            return {
                title : this.$i18n.t('Parcourir les tatoueurs'),
                meta: [
                    { 'property': 'og:title', 'content': this.$i18n.t("Découvrez & suivez les tatoueurs") + " · WE Tattoo", 'vmid': 'og:title'},
                ]
            }
        }
    }
</script>

