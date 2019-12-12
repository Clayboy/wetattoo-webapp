<template>
    <div class="flex items-stretch flex-wrap">
        <div v-for="flash in artist.flashes" :key="flash.id" class="w-1/2 md:w-1/3 p-2" >
            <tattoo-flash-card :flash="flash" @click="editFlash(flash)">

                <template v-slot:actions>
                    <button class="btn btn-small btn-primary flex-grow mr-2" @click.prevent="$emit('bookflash', flash)">
                        Réserver
                    </button>
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