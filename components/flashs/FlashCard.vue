<template>
    <div class="border border-gray-300">
        <div class="py-1 px-1 text-sm flex items-center justify-between border-b border-gray-300">
            <h3 class="font-semibold flex-grow truncate">{{ flash.ref }}</h3>
            <div class="flex-shrink-0">
                <slot name="actions" />
            </div>
        </div>
        <div class="pb-full w-full relative flex-shrink-0">
            <img :src="flash.media.url" v-if="flash.media" alt="" class="absolute w-full h-full top-0 object-contain" />
        </div>
        <div class="flex-grow flex justify-between py-1 text-xs text-gray-600 px-2">
            <p>
                <font-awesome-icon :icon="['far', 'expand']" class="mr-1"></font-awesome-icon> {{ flash.size_w }} x {{ flash.size_h }} cm
            </p>
            <p>
                <font-awesome-icon :icon="['far', 'stopwatch']" class="mr-1"></font-awesome-icon> {{ flash.duration | humanDuration }}
            </p>
            <!-- <p v-show="flash.expandable" >
                <font-awesome-icon :icon="['fal', 'check']" class="mr-1"></font-awesome-icon>{{ $t('taille modifiable') }}
            </p>
            <p v-show="flash.alterable" >
                <font-awesome-icon :icon="['fal', 'check']" class="mr-1"></font-awesome-icon>{{ $t('personnalisable') }}
            </p> -->
        </div>
        <div class="flex-grow flex justify-between py-1 text-sm text-gray-600 px-2">
            <p>
                {{ flash.price }} {{ flash.currency }}
            </p>
            <p>
                {{flash.view_count}}
                <font-awesome-icon :icon="['fas', 'eye']" class="ml-1"></font-awesome-icon>
            </p>
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