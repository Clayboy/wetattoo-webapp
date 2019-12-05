<template>

    <div class="container mx-auto md:mt-3" v-if="convention != null">

        <div class="text-right mb-1">
            <router-link class="text-blue-500" :to="{name : 'conventions.list'}">Retour aux conventions</router-link>
        </div>
        <div class="flex md:mb-4 bg-white shadow px-6 py-4">
            <div class="text-center mr-6 flex-shrink-0">
                <div class="flex items-end justify-center mb-1">
                    <div class="text-center">
                        <div class="uppercase text-base font-medium text-gray-500">{{ formatDate(convention.start_date, 'ddd') }}</div>
                        <div class="text-4xl font-medium leading-none">{{ formatDate(convention.start_date, 'DD') }}</div>

                    </div>
                    <div class="mx-2 mb-2">
                        <font-awesome-icon class="text-gray-500 fa-sm" :icon="['fas', 'arrow-right']"></font-awesome-icon>
                    </div>
                    <div class="text-center">
                        <div class="uppercase text-base font-medium text-gray-500">{{ formatDate(convention.end_date, 'ddd') }}</div>
                        <div class="text-4xl font-medium leading-none">{{ formatDate(convention.end_date, 'DD') }}</div>
                    </div>
                </div>
                <div class="uppercase text-base font-medium text-gray-500">{{ formatDate(convention.end_date, 'MMMM YYYY') }}</div>
            </div>
            <div class="md:flex-grow">
                <h1 class="text-4xl leading-none mb-4">
                    {{ convention.name }}
                </h1>
                <p class="text-sm text-gray-800">{{ convention.presentation }}</p>
            </div>
        </div>

        <div class="md:flex">

        <div class="md:w-1/4 md:mr-3 md:mb-3">
            <img class="w-full" :src="`${convention.image_url}`" alt="" />
        </div>

        <div class="md:w-3/4 bg-white shadow px-6 py-4">
            <div class="mb-6" v-if="convention.schedule">
                <h3 class="block-title">
                    {{ $t("Programme") }}
                </h3>
                <div class="marked-down" v-html="schedule"></div>
            </div>

            <div class="mb-6" v-if="convention.artists">
                <h3 class="block-title">{{ $t("Artistes") }}</h3>
                <p v-html="artists"></p>
            </div>

            <div class="mb-6" v-if="hasRates">
                <h3 class="block-title">{{ $t('Tickets') }}</h3>
                <div class="marked-down mb-3" v-html="rates"></div>

                <div class="truncate">
                    <a :href="convention.booking_url" class="text-blue-400">
                        {{ convention.booking_url }}
                    </a>
                </div>
            </div>
            <div class="mb-6">
                <h3 class="block-title">{{ $t('Infos pratiques') }}</h3>

                <div class="md:flex items-start">
                    <div class="md:w-1/3">
                        <img :src="map" class="w-full" />
                    </div>

                    <div class="md:w-2/3 ml-4">
                        <ul class="text-lg">
                            <li class="mb-4">
                                <address class="not-italic mt-0">
                                    <div class="font-semibold"  v-if="convention.venue">{{ convention.venue }}</div>
                                    <div v-text="convention.address_line_1 " />
                                    <div v-if="convention.address_line_2 " v-text="convention.address_line_2 " />
                                    <div>{{ convention.postal_code }}, <span v-if="convention.state && convention.country != 'FR'">{{convention.state}},</span> {{ convention.city }}</div>
                                    <div>{{ convention.country }}</div>
                                </address>
                            </li>
                            <li v-if="convention.website"  class="truncate mb-2">
                                <a :href="convention.website" target="_blank">
                                    <font-awesome-icon :icon="['fal', 'globe']" />
                                    <span class="ml-2 text-blue-400">{{ convention.website }}</span>
                                </a>
                            </li>
                            <li v-if="convention.facebook"  class="truncate mb-2">
                                <a :href="convention.facebook" target="_blank">
                                    <font-awesome-icon :icon="['fab', 'facebook']" />
                                    <span class="ml-2 text-blue-400">{{ convention.facebook }}</span>
                                </a>
                            </li>
                            <li v-if="convention.instagram"  class="truncate">
                                <a :href="`https://instagram.com/${convention.instagram}`" target="_blank">
                                    <font-awesome-icon :icon="['fab', 'instagram']" />
                                    <span class="ml-2 text-blue-400">@{{ convention.instagram }}</span>
                                </a>
                            </li>
                        </ul>
                    </div>
                </div>
            </div>
        </div>

        </div>
    </div>

</template>
<script>

    const md = require('markdown-it')();

    import moment from 'moment';

    const GoogleApiKey = "AIzaSyDqyLPxUWDf4AmmHD5P05zd-SNG3I9Xh0g";

    export default {
        nuxtI18n: false,

        computed: {

            convention(){
                return this.$store.state.conventions.current;
            },

            map(){
                if(this.convention.longitude){
                    return `https://maps.googleapis.com/maps/api/staticmap?center=${this.convention.latitude},${this.convention.longitude}&zoom=16&size=600x300&maptype=roadmap
    &markers=color:red%7C${this.convention.latitude},${this.convention.longitude}&key=${GoogleApiKey}`;
                }

                return '';
            },

            schedule(){
                return md.render(this.convention.schedule || '');
            },

            hasRates(){
                return this.convention.rates || this.convention.booking_url
            },
            rates(){
                return md.render(this.convention.rates || '');
            },
            artists(){
                return md.render(this.convention.artists || '');
            }
        },

        created(){
            this.$store.dispatch('conventions/find', this.$route.params.slug)
        },

        methods:{
            formatDate: (date, format) => moment(date).format(format),
        },

        metaInfo() {
            return {
                title : this.convention.name + " · " + this.$i18n.t("Agenda conventions"),
                meta : [
                    { 'property': 'og:title', 'content': this.convention.name  + " · " + this.$i18n.t("Agenda conventions") + " · WE Tattoo", 'vmid': 'og:title'},
                    { 'property': 'og:site_name', 'content': `WE Tattoo`, 'vmid': 'og:site_name'},
                    { 'property': 'og:description', 'content': this.$i18n.t("Découvrez les évènements tattoo & conventions près de chez vous grâce à WE Tattoo."), 'vmid': 'og:description'}
                ]
            }
        }
    }
</script>
