<template>
    <div class="container mx-auto">
        <flash-form v-if="flashForm" 
            :flash="flash"
            @close="closeForm"
            @created="addFlash"
            @updated="updateFlash"
            ></flash-form>
        <header class="hidden sm:flex items-center mb-4">
            <h1 class="page-title flex-grow">
                Tattoo Flashes
            </h1>
            <div>
                <button class="btn btn-primary" @click="flashForm = true">
                    {{ $t("Ajouter un Flash") }}
                </button>
            </div>
        </header>

        
        <button class="bg-indigo-800 cursor-pointer text-white shadow-md focus:shadow focus:bg-indigo-900 hover:bg-indigo-900 pointer fixed p-3 leading-none w-12 h-12 text-center rounded-full sm:hidden z-50" style="bottom:63px;right:7px" @click="flashForm = true">
            <font-awesome-icon :icon="['far', 'plus']" class="text-xl shadow"></font-awesome-icon>
        </button>


        <tabs>
            <tab :icon="['fal', 'bolt']" name="forsale" label="flash en vente" :selected="true">

                <div class="border-b border-gray-400 sm:-mt-2 pb-2 mb-4 text-gray-600">
                    <div class="justify-between flex items-center">
                        <h3 class="">
                            {{availableFlashes.length}} Flashs en vente
                        </h3>
                        <h3 class="">
                            Gains potentiels : {{ totalForSale }} €
                        </h3>
                    </div>
                </div>
                <div class="flex items-stretch flex-wrap">
                    <div v-for="(flash, index) in availableFlashes" :key="flash.id" class="w-1/2 md:w-1/4 p-1 md:p-2">
                        <flash-card :flash="flash">
                            <template v-slot:actions>
                                <div class="flex items-center">
                                    <button class="hidden sm:block text-blue-500 hover:text-blue-700 mr-2" @click.prevent="editFlash(flash)">
                                        Editer
                                    </button>
                                    <option-menu :btn-class="['px-2']">
                                        <ul>
                                            <li class="block sm:hidden"><a href="#" @click.prevent="editFlash(flash)">Editer</a></li>
                                            <li><a href="#" @click.prevent="$store.dispatch('bookings/openForm', {flash : flash})">Créer un projet</a></li>
                                            <!-- <li><a href="#">Marquer comme vendu</a></li> -->
                                            <li><a href="#" @click.prevent="deleteFlash(index)">Supprimer</a></li>
                                        </ul>
                                    </option-menu>
                                </div>
                            </template>
                        </flash-card>
                    </div>
                </div>
                 <div v-if="!flashes" class="text-center py-6 text-gray-500 text-xl">
                    <font-awesome-icon :icon="['fal', 'bolt']" class="mb-3 text-4xl"></font-awesome-icon>
                    <p class="mb-6">
                        {{ $t("Vous n'avez pas encore de flashs à vendre") }}
                    </p>
                    <button class="rounded px-4 py-2 text-base font-normal border border-indigo-800 text-indigo-800">
                        {{ $t("Ajoutez votre premier Flash") }}
                    </button>
                </div>
            </tab>
            <tab :icon="['fas', 'bolt']" name="sold" label="flash vendus">
                <div class="border-b justify-between flex items-center border-gray-400 sm:-mt-2 pb-2 mb-4 text-gray-600">
                    <h3 class="">
                        {{bookedFlashes.length}} Flashs réservés
                    </h3>
                    <h3 class="">
                        Gains estimés : {{ totalSold }} €
                    </h3>
                </div>
                <div class="flex items-stretch flex-wrap">
                    <div v-for="(flash, index) in bookedFlashes" :key="flash.id" class="w-1/2 md:w-1/4 p-1 md:p-2">
                        <flash-card :flash="flash">
                            <template v-slot:actions>
                                <div class="flex items-center">
                                    <option-menu :btn-class="['px-2']">
                                        <ul>
                                            <li><a href="#" @click.prevent="deleteFlash(index)">Supprimer</a></li>
                                        </ul>
                                    </option-menu>
                                </div>
                            </template>
                        </flash-card>
                    </div>
                </div>
                <div v-if="!bookedFlashes" class="text-center py-6 text-gray-500 text-xl">
                    <font-awesome-icon :icon="['fal', 'bolt']" class="mb-3 text-4xl"></font-awesome-icon>
                    <p class="mb-6">
                        {{ $t("Vous n'avez pas encore vendu de flashs") }}
                    </p>
                </div>
            </tab>
        </tabs>

    </div>

</template>
<script>

    import OptionMenu from '@/components/OptionMenu'
    import FlashForm from '@/components/forms/FlashForm'
    import TattooFlashCard from '@/components/flashs/TattooFlashCard'
    import FlashCard from '@/components/flashs/FlashCard'
    import _ from 'lodash'

    import Tabs from '@/components/Tabs';
    import Tab from '@/components/Tab';

    export default {
        middleware : 'auth-artist',
        layout : 'member',
        components : {
            FlashForm,
            TattooFlashCard,
            OptionMenu,
            FlashCard,
            Tabs,
            Tab
        },

        data(){
            return {
                flashForm : false,
                flash : null,
            }
        },

        async asyncData({$axios, store}){
            let response = await $axios.get(`/artists/${store.$auth.user.profile.id}/flashes`);

            return {
                'flashes' : response.data,
            }
        },

        computed:{
            bookedFlashes(){
                return this.flashes.filter(flash => flash.booked)
            },
            availableFlashes(){
                return this.flashes.filter(flash => !flash.booked)
            },

            totalForSale(){
                return this.availableFlashes.reduce((accumulator, flash) => accumulator + parseFloat(flash.price, 10), 0);
            },
            totalSold(){
                return this.bookedFlashes.reduce((accumulator, flash) => accumulator + parseFloat(flash.price, 10), 0);
            }
        },

        methods : {

            addFlash(flash){
                this.flashes.push(flash)
            },

            editFlash(flash){
                this.flash = flash;
                this.flashForm = true;
            },

            updateFlash(flash){
                let index = _.findIndex(this.flashes, {id : flash.id});
                if(index != -1){
                    this.flashes.splice(index, 1, flash);
                }
            },

            deleteFlash(index){
                this.$confirm('Voulez-vous vraiment supprimer le tattoo flash ?', 'Suppression', {
                        confirmButtonText: 'Supprimer',
                        cancelButtonText: 'Annuler',
                        type: 'warning'
                    })
                    .then(() => {
                        this.$axios.delete(`/flashes/${this.flashes[index].id}`)
                            .then(res => {
                                this.flashes.splice(index, 1);
                            })
                    })
            },

            closeForm(){
                this.flashForm = false
                this.flash = null;
            }
        }
    }
</script>
