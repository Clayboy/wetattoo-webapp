<template>
    <div class="flex items-stretch flex-wrap">
        <div v-for="flash in artist.flashes" :key="flash.id" class="w-1/2 md:w-1/4 p-2" >
            <tattoo-flash-card :flash="flash" @click="editFlash(flash)">
                <template class="flex items-end w-full" v-slot:actions>
                    <div class="w-full flex justify-between items-center">
                        <button class="btn btn-small btn-primary-outline mr-2" @click.prevent="$emit('bookflash', flash)">
                            Réserver
                        </button>
                        <font-awesome-icon :icon="['fal', 'heart']" class="text-lg"></font-awesome-icon>
                    </div>
                </template>
            </tattoo-flash-card>
        </div>
    </div>
</template>

<script>
    import TattooFlashCard from '@/components/flashs/TattooFlashCard'

    export default {
        components:{
            TattooFlashCard,
        },
        props : {
            artist:{
                type:Object
            }
        },

    }
</script>