<template>
<div class="w-full">
        <section class="bg-home shadow py-4 md:py-8" style="margin-top:0px">
            <div class="container mx-auto">
                <header class="flex justify-between items-center px-3 md:px-0">
                    <h3 class="font-light text-2xl lg:text-4xl  text-white">
                        {{ $t('Conventions') }}
                    </h3>
                    <div class="relative flex items-center">
                        <a href="#" class="border flex items-center border-gray-400 px-3 py-2 leading-none rounded text-sm" :class="{'bg-indigo-100 text-indigo-800' : filterMode, 'bg-white text-gray-700' : !filterMode}" @click.prevent="filterMode = !filterMode">
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
                                {{ $t('Filtrer les conventions') }}

                                <a href="#" class="sm:hidden" @click.prevent="filterMode = false">
                                    <font-awesome-icon :icon="['fal', 'times']" class="text-2xl text-gray-400"></font-awesome-icon>
                                </a>
                            </h4>

                            <form @submit.prevent>
                                <country-select
                                    :label="$t('Pays')"
                                    @input="updatePlacesCountry"
                                    v-model="filters.country">
                                </country-select>

                                <div class="mb-2">
                                    <label class="block">
                                        {{ $t('Ville') }}
                                    </label>
                                    <input  type="text" class="input" ref="places" />
                                </div>
                            </form>
                        </div>
                    </div>
                </header>
            </div>
        </section>
    <div class="container mx-auto lg:mt-4">
        <div class="">
            <div v-for="categ in categorized" :key="categ.title" class="mb-6">
                <h2 class="text-2xl font-thin mb-2 border-b border-gray-400 capitalize">{{ categ.title }}</h2>
                <div class="flex items-stretch flex-wrap">
                    <div div v-for="conv in categ.conventions" :key="conv.id" class="lg:w-1/4 w-1/2 p-2">
                        <nuxt-link :to="{name:'conventions-slug', params: {slug : conv.slug}}" >
                            <convention-card :conv="conv"></convention-card>
                        </nuxt-link>
                    </div>
                </div>
            </div>

            <div v-if="categorized.length == 0" class="bg-white text-xl p-10 shadow text-center text-gray-500">
                <font-awesome-icon :icon="['fal', 'search']" class="text-4xl mb-3"></font-awesome-icon>
                <br />
                {{ $t('Aucune convention trouvée pour votre recherche') }}
            </div>
        </div>
    </div>
    </div>
</template>
<script>

    import moment from 'moment';
    import ConventionCard from '@/components/ConventionCard';
    import CountrySelect from '@/components/forms/CountrySelect';
    // import places from 'places.js';
    import _ from 'lodash';
import { mapState, mapGetters } from 'vuex';

    export default {

        data(){
            return {
                placesAutocomplete : null,
                filterMode : false,
                filters : {
                    country : '',
                    city : '',
                }
            }
        },

        computed: {
            conventions(){
                return this.$store.getters['conventions/incoming'];
            },
            
            nbActiveFilters(){
                let nbFilters = 0;

                if(this.filters.country != ''){
                    nbFilters++;
                }
                if(this.filters.city != ''){
                    nbFilters++;
                }

                return nbFilters;
            },

            filtered() {
                let filtered = this.conventions;

                for(let i in this.filters){
                    if(this.filters[i] != ""){
                        filtered = filtered.filter(conv => {
                            return conv[i] == this.filters[i]
                        })
                    }
                }
                return filtered;
            },

            categorized(){

                let byDates = [];

                this.filtered.forEach((conv) => {

                    let start = moment(conv.start_date);
                    let index = _.findIndex(byDates, {id : start.format('YYYYMM')})

                    if(index == -1){

                        byDates.push({
                            id : start.format('YYYYMM'),
                            title : start.format('MMMM YYYY'),
                            conventions : [],
                        });

                        index = byDates.length - 1
                    }

                    byDates[index].conventions.push(conv);
                })

                byDates.forEach((categ) => {
                    categ.conventions.sort((a, b) => {
                        let start_a = moment(a.start_date);
                        let start_b = moment(b.start_date);
                        return start_a.isAfter(start_b) ? 1 : -1;
                    })
                })

                return byDates.sort((a, b) => {
                    return (a.id >= b.id) ? 1 : -1;
                });

            }
        },

        async fetch({store}){
            if(!store.state.conventions.conventions.length){
                await store.dispatch('conventions/fetch');
            }
        },


        methods:{
            updatePlacesCountry(){
                if(this.filters.country != ''){
                    this.placesAutocomplete.configure({
                        countries : [this.filters.country]
                    });
                }else{
                    this.placesAutocomplete.configure({
                        countries : []
                    });
                }

                this.filterMode = false;
            },

            initPlaces(){

                this.placesAutocomplete = places({
                    container: this.$refs.places,
                    type: 'city',
                    templates: {
                        value : suggestion => suggestion.name
                    }
                })

                this.placesAutocomplete.on('change', e => {

                    this.filters.city = e.suggestion.name;
                    this.filters.country = e.suggestion.countryCode.toUpperCase();

                    this.filterMode = false;

                });

                this.placesAutocomplete.on('clear', e => {
                    this.filters.city = "";
                    this.filterMode = "";
                });
            },
        },

        components : {
            ConventionCard,
            CountrySelect,
        },

        metaInfo() {
            return {
                title : this.$i18n.t("Votre agenda conventions · Évènements tatouage"),
                meta : [
                    { 'property': 'og:title', 'content': this.$i18n.t("Agenda conventions") + " · " + this.$i18n.t("Évènements tatouage") + " · WE Tattoo", 'vmid': 'og:title'},
                    { 'property': 'og:site_name', 'content': `WE Tattoo`, 'vmid': 'og:site_name'},
                    { 'property': 'og:description', 'content': this.$i18n.t("Découvrez les évènements tattoo & conventions près de chez vous grâce à WE Tattoo."), 'vmid': 'og:description'}
                ]
            }
        }
    }
</script>
