<template>
    <div class="block h-full flex flex-col bg-white border border-gray-300 rounded overflow-hidden">
        <div v-if="flash.artist" class="py-1 px-2 text-sm flex items-center justify-between border border-gray-300 border-b-0 rounded-t">
            {{ flash.artist.pseudo }}
        </div>
        <div class="w-full pb-full relative cursor-pointer" @click="$emit('open', flash)">
            <img :src="flash.media.url" v-if="flash.media" alt="" class="absolute w-full h-full top-0 object-contain">
        </div>
        <div class="py-1 px-2 text-sm  flex-grow">
            <div class="props flex items-start justify-between  flex-grow">
                <div>
                    <p>
                        <font-awesome-icon :icon="['far', 'expand']" class="mr-1"></font-awesome-icon> {{ flash.size_w }} x {{ flash.size_h }} cm 
                        <span class="text-xs ml-1 text-gray-500">{{ flash.expandable ? $t('modifiable') : $t('non modifiable') }}</span>
                    </p>
                    <p>
                        <font-awesome-icon :icon="['far', 'stopwatch']" class="mr-1"></font-awesome-icon> {{ flash.duration | humanDuration }}
                    </p>
                    <p v-if="flash.alterable">
                        <font-awesome-icon :icon="['fal', 'check']" class="mr-1"></font-awesome-icon>
                        {{ $t('Personnalisable')}}
                    </p>
                </div>
                <div class="font-medium">
                    {{ flash.price }} {{ flash.currency }}
                </div>
            </div>
        </div>
        <div class="px-2 pb-2">
            <div class="w-full flex justify-between items-center">
                <div v-if="!flash.booked">
                    <button class="btn btn-small btn-primary-outline mr-2" @click.prevent="$bus.$emit('bookflash', flash)">
                        Réserver
                    </button>
                </div>
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