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
            <div class="flex items-stretch flex-wrap">
                <div v-for="(flash, index) in flashes" :key="flash.id" class="w-1/2 md:w-1/3 p-2" >
                    <tattoo-flash-card :flash="flash">
                        <template v-slot:actions>
                            <button class="btn btn-small btn-primary flex-grow mr-2" @click.prevent="editFlash(flash)">
                                Editer
                            </button>
                            <button class="btn btn-small btn-primary flex-grow mr-2">
                                Vendu
                            </button>
                            <button class="btn btn-small btn-primary-outline" @click.prevent="deleteFlash(index)">
                                <font-awesome-icon :icon="['fal', 'trash']"></font-awesome-icon>
                            </button>
                        </template>
                    </tattoo-flash-card>
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

    import FlashForm from '@/components/forms/FlashForm'
    import TattooFlashCard from '@/components/flashs/TattooFlashCard'
    import _ from 'lodash'

    export default {
        middleware : 'auth-artist',
        layout : 'member',
        components : {
            FlashForm,
            TattooFlashCard
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
