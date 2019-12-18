<template>
    <div class="shadow border border-gray-300 flex">
        <div class="pb-1/3 w-1/3 relative flex-shrink-0">
            <img :src="flash.media.url" v-if="flash.media" alt="" class="absolute w-full h-full top-0 object-contain" />

            <div class="rounded text-white text-xs absolute bottom-0 left-0 m-2 px-2 py-1 font-medium" style="background:rgba(0,0,0,0.7)">
                {{ flash.price }} {{ flash.currency }}
            </div>
        </div>
        <div class="flex-grow">
            <div class="py-1 px-2 text-sm flex items-center justify-between border-b border-gray-300">
                <h3 class="font-semibold flex-grow truncate">{{ flash.ref }}</h3>
                <div class="flex-shrink-0">
                    <slot name="actions" />
                </div>
            </div>
            <div class="py-1 px-2 text-sm">
                <div class="mb-3 flex items-center justify-between">
                    <div>
                        <font-awesome-icon :icon="['far', 'expand']" class="mr-1"></font-awesome-icon> {{ flash.size_w }} x {{ flash.size_h }} cm
                    </div>
                    <div>
                        <font-awesome-icon :icon="['far', 'stopwatch']" class="mr-1"></font-awesome-icon> {{ flash.duration | humanDuration }}
                    </div>
                </div>
                <div>
                    <p v-show="flash.expandable" >
                        <font-awesome-icon :icon="['fal', 'check']" class="mr-1"></font-awesome-icon>{{ $t('taille modifiable') }}</p>
                    <p v-show="flash.alterable" >
                        <font-awesome-icon :icon="['fal', 'check']" class="mr-1"></font-awesome-icon>{{ $t('personnalisable') }}</p>
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