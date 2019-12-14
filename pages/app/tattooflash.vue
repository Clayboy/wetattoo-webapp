<template>
    <div class="container mx-auto">
        <flash-form v-if="flashForm" 
            :flash="flash"
            @close="closeForm"
            @created="addFlash"
            @updated="updateFlash"
            ></flash-form>
        <header class="flex items-center mb-4">
            <h1 class="page-title flex-grow">
                Tattoo Flashes
            </h1>
            <div>
                <button class="button" @click="flashForm = true">
                    {{ $t("Ajouter un Flash") }}
                </button>
            </div>
        </header>

        <div class="panel">
            <div class="md:flex items-stretch flex-wrap">
                <div v-for="(flash, index) in flashes" :key="flash.id" class="sm:w-1/2 md:w-1/3 p-2" >
                    <flash-card-h :flash="flash">
                        <template v-slot:actions>
                            <div class="flex items-center">
                                <button class="hidden sm:block text-blue-500 hover:text-blue-700 mr-2" @click.prevent="editFlash(flash)">
                                    Editer
                                </button>
                                <option-menu :btn-class="['px-2']">
                                    <ul>
                                        <li class="block sm:hidden"><a href="#" @click.prevent="editFlash(flash)">Editer</a></li>
                                        <li><a href="#">Marquer comme vendu</a></li>
                                        <li><a href="#" @click.prevent="deleteFlash(index)">Supprimer</a></li>
                                    </ul>
                                </option-menu>
                            </div>
                        </template>
                    </flash-card-h>
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
        </div>
    </div>

</template>
<script>

    import OptionMenu from '@/components/OptionMenu'
    import FlashForm from '@/components/forms/FlashForm'
    import TattooFlashCard from '@/components/flashs/TattooFlashCard'
    import FlashCardH from '@/components/flashs/FlashCardH'
    import _ from 'lodash'

    export default {
        middleware : 'auth-artist',
        layout : 'member',
        components : {
            FlashForm,
            TattooFlashCard,
            OptionMenu,
            FlashCardH
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
