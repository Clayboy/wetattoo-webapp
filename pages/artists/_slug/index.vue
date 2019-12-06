<template>
    <div v-if="artist && artist.medias.length">
        <div class="flex flex-wrap">
            <div v-for="media in artist.medias" :key="media.id" class="w-1/2 md:w-1/3 lg:w-1/5 p-1">
                <img :src="media.url" />
            </div>
        </div>
    </div>
    <div v-else class="w-full text-xl text-center py-20 text-gray-500">
        <font-awesome-icon :icon="['fal', 'camera']" class="mb-3 text-4xl"></font-awesome-icon>
        <p class="mb-6">
            {{ $t("L'artiste n'a pas encore ajouté d'images à son portfolio") }}
        </p>
    </div>
</template>

<script>
    export default {
        props : {
            artist:{
                type:Object
            }
        },
        data(){
            return {

            }
        }
    }
</script>
