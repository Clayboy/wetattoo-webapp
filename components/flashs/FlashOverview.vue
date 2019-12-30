<template>
    <modal @close="close" @next="$emit('next')" @prev="$emit('prev')">
        <div class="heading flex items-center justify-between mb-4  p-4">
            <div class="flex items-center">
                <div class="rounded-full bg-gray-600 w-10 h-10 mr-2 overflow-hidden">
                    <avatar v-if="flashdata.artist" :img="flashdata.artist.avatar_url" :size="10"></avatar>
                </div>
                <div>
                    <h3 class="text-xl font-medium leading-tight">
                        {{ flashdata.ref }}
                    </h3>
                    <div class="text-sm">
                        {{ $t('Par') }} <nuxt-link v-if="flashdata.artist" :to="{name : 'artists-slug', params:{slug : flashdata.artist.slug}}">{{ flashdata.artist.pseudo }}</nuxt-link>
                        <span  v-if="flashdata.artist && !flashdata.artist.isSubscribedTo">
                            <subscribe-button
                                :artist="flashdata.artist"
                                :active="flashdata.artist.isSubscribedTo"
                                :active-class="['text-gray-700', 'font-medium']"
                                :inactive-class="['text-indigo-800', 'font-medium']">
                            </subscribe-button>
                        </span>
                    </div>
                </div>
            </div>
            <div>
                <button @click.prevent="book(flashdata)" v-if="!flashdata.booked" class="btn btn-small btn-primary-outline">
                    {{ $t('Réserver') }}
                </button>
                <div v-else class="text-indigo-800 font-medium text-lg">{{ $t("Réservé !") }}</div>
            </div>
        </div>

        <div class="bg-gray-600 w-full pb-4/5 relative p-0 overflow-hidden border-b border-t border-gray-200">
            <img :src="flashdata.media.url" v-if="flashdata.media" alt="" class="absolute w-full h-full top-0 object-cover blurred" />
            <img :src="flashdata.media.url" v-if="flashdata.media" alt="" class="absolute w-full h-full top-0 object-contain shadow" />
        </div>

        <div class="px-4 py-2 md:flex">

            <div class="md:w-1/3">
                <ul>
                    <li class="info">
                        <span class="mr-2 text-gray-500">
                            <font-awesome-icon :icon="['far', 'money-bill-wave']" class="mr-1 w-8" alt="Taille initiale"></font-awesome-icon>
                            <span class="text-sm">{{$t('Montant')}}</span>
                        </span>
                        <span style="color:#42b72a;">{{ flashdata.price }} {{ flashdata.currency }}</span> 
                    </li>
                    <li class="info">
                        <span class="mr-2 text-gray-500">
                            <font-awesome-icon :icon="['far', 'expand']" class="mr-1" alt="Taille initiale"></font-awesome-icon>
                            <span class="text-sm">{{$t('Taille')}}</span>
                        </span>
                        <span>{{ flashdata.size_w }} x {{ flashdata.size_w }} cm</span>
                    </li>
                    <li class="info">
                        <span class="mr-2 text-gray-500">
                            <font-awesome-icon :icon="['far', 'stopwatch']" class="mr-1" alt="Durée estimée du tatouage"></font-awesome-icon>
                            <span class="text-sm">{{$t('Durée')}}</span>
                        </span>
                        {{ flashdata.duration | humanDuration }}
                    </li>
                </ul>
                <ul class="mt-5">
                    <li class="">
                        <font-awesome-icon :icon="['far', 'eye']" class="mr-2 w-8"></font-awesome-icon>
                        {{ $tc('vues', flashdata.view_count) }}
                    </li>
                </ul>
            </div>
            <div class="md:w-2/3 md:ml-3 mt-3 pt-3 md:pt-0 md:mt-0 border-t md:border-t-0 md:border-l border-gray-300 md:pl-3 text-gray-800">
                <div class="mb-4" v-if="locations.length">
                    <h3 class="font-medium text-gray-700 mb-2">
                        {{ $t('Emplacements conseillés') }}
                    </h3>
                    <p>
                        <span v-for="(zone, k) in locations" :key="zone.name">
                            {{zone.label}}<span v-if="k < (locations.length - 1)">,</span>
                        </span>
                    </p>

                </div>
                <div class="mb-4">
                    <h3 class="font-medium text-gray-700 mb-3">
                        {{ $t('Personnalisation') }}
                    </h3>
                    <ul>
                        <li>
                            {{ flashdata.resizeable ? $t(`Le flash peut être redimensionné (le prix peut varier)`) : $t(`Taille non modifiable`) }}
                        </li>
                        <li>
                            {{ flashdata.alterable ? $t(`Le motif peut être adapté à vos envies (le prix peut varier)`) : $t(`Le motif ne peut pas être personnalisé`) }}
                        </li>
                    </ul>
                </div>
            </div>
        </div>
    </modal>
</template>

<script>

import Modal from '@/components/layout/Modal';
import SubscribeButton from '~/components/forms/SubscribeButton'

export default {
    props : {
        flash : {
            type : Object,
            required: true
        }
    },

    data(){
        return {
            flashdata : this.flash,
            zones : [],
        }
    },
    computed : {
        locations(){
            if(this.flashdata.best_location == null || !this.flashdata.best_location.length){
                return []
            }
            
            return this.zones.filter(zone => this.flashdata.best_location.indexOf(zone.name) != -1)
        }
    },
    watch:{
        flash(newVal){
            this.fetch(newVal);
        }
    },
    async created(){
        this.zones = await this.$store.dispatch('tattooZones')
        this.fetch(this.flash)
    },

    methods:{

        async fetch(flash){
            let response = await this.$axios.get(`/flashes/${this.flash.id}`)
            this.flashdata = response.data.tattooFlash;
        },
        close(){
            this.$emit('close')
        },

        book(flash){
            this.$bus.$emit('bookflash', this.flashdata);
            this.close();
        }
    },

    components:{
        Modal,
        SubscribeButton
    }
}

</script>

<style lang="scss">
    .blurred{
        /* Add the blur effect */
        filter: blur(10px);
        -webkit-filter: blur(10px);
    }
    
    .nav-button:active{
        @apply outline-none;
    }
    
    .nav-button:focus{
        @apply outline-none;
    }

    .info{
        @apply flex items-center justify-between mb-1  text-gray-800
    }
</style>