<template>
    <div class="">
        <!-- <div class="py-1 px-2 text-sm flex items-center justify-between border border-gray-300 border-b-0 rounded-t">
            {{ artist.pseudo }}
        </div> -->
        <div class="w-full pb-full relative">
            <img :src="flash.media.url" v-if="flash.media" alt="" class="absolute w-full h-full top-0 object-contain">

            <div class="rounded text-white text-sm absolute bottom-0 left-0 m-2 p-2" style="background:rgba(0,0,0,0.7)">
                {{ flash.price }} {{ flash.currency }}
            </div>
        </div>
        <div class="py-1 px-2 text-sm border border-gray-300 border-t-0 rounded-b">
            <div class="props flex items-center justify-between">
                <div>
                    <font-awesome-icon :icon="['far', 'expand']" class="mr-1"></font-awesome-icon> {{ flash.size_w }} x {{ flash.size_h }} cm
                    <!-- <span v-if="flash.expandable">agrandissable</span>
                    <span v-if="flash.alterable">design personnalisable</span> -->
                </div>
                <div>
                    <font-awesome-icon :icon="['far', 'stopwatch']" class="mr-1"></font-awesome-icon> {{ flash.duration | humanDuration }}
                </div>
            </div>
            <div class="flex items-center">
                <slot name="actions"></slot>
            </div>
        </div>


    </div>
</template>

<script>
export default {
    props : {
        flash : {
            type:Object,
            required:true
        }
    },

    computed:{
        artist(){
            return {
                pseudo : '',
            }
        }
    }
}
</script>