<template>
    <div class="flex bg-white p-3 shadow hover:bg-gray-100 cursor-pointer">
        <avatar :img="artist.avatar_url" :size="32" class="flex-shrink-0 avatar-noradius -ml-2 -my-2 mr-3"></avatar>
        <div>
            <h4 class="font-base text-lg leading-none">{{ artist.pseudo }}</h4>
            <span v-if="location" class="text-gray-500 text-xs truncate">
                <font-awesome-icon class="mr-1" :icon="['fal', 'map-marker-alt']"></font-awesome-icon>
                {{ location }}
            </span>
            <div class="flex flex-wrap">
                <span v-for="style in styles"
                    :key="`${artist.id}${style.name}`"
                    class="text-xs text-gray-500 border border-gray-300 mr-1 mb-1 px-1 rounded hover:bg-gray-100">
                    {{ style.label }}
                </span>
            </div>
        </div>
    </div>
</template>

<script>
    import {tattooStyles} from '@/utilities/TattooVars';

    export default {
        props : {
            artist:{
                type: Object
            }
        },

        computed:{
            location(){
                if(this.artist.address == null){
                    return '';
                }
                return `${this.artist.address.city}, ${this.artist.address.country}`;
            },

            styles(){
                if(this.artist.preferred_styles == null){
                    return [];
                }

                return tattooStyles.filter(style => this.artist.preferred_styles.indexOf(style.name) != -1)
            }
        }
    }
</script>
