<template>
    <div class="flex items-stretch flex-wrap">
        <div v-for="flash in artist.flashes" :key="flash.id" class="w-1/2 lg:w-1/4 p-2" >
            <tattoo-flash-card @open="openOverview" :flash="flash">
            </tattoo-flash-card>
        </div>


        <flash-overview v-if="overview" 
            :flash="artist.flashes[currentFlash]" 
            @close="overview = false"
            @prev="prev" 
            @next="next">
        </flash-overview>
    </div>

</template>

<script>
    import TattooFlashCard from '@/components/flashs/TattooFlashCard'
    import FlashOverview from '@/components/flashs/FlashOverview'
    import Modal from '@/components/layout/Modal'

    export default {
        components:{
            TattooFlashCard,
            FlashOverview
        },
        data(){
            return {
                overview : false,
                currentFlash : 2
            }
        },
        props : {
            artist:{
                type:Object
            }
        },

        methods:{
            prev(){
                this.currentFlash > 0 ? this.currentFlash-- : null
            },
            next(){
                this.currentFlash < (this.artist.flashes.length - 1) ? this.currentFlash++ : null
            },

            openOverview(flash){

                let index = _.findIndex(this.artist.flashes, flash);
                this.currentFlash = index;
                this.overview = true;
            }
        }

    }
</script>