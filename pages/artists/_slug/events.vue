<template>
    <div>
        <div v-if="artist && artist.guests" class="lg:flex flex-wrap lg:-px-4">
            <div class="lg:px-4 lg:w-1/2 pb-3"
                v-for="guest in artist.guests"
                :key="guest.id">
                <guest-card class="panel border border-gray-300" :guest="guest"></guest-card>
            </div>
        </div>
        <div v-if="artist && !artist.guests.length" class="w-full text-xl text-center py-20 text-gray-500">
            <font-awesome-icon :icon="['fal', 'globe-stand']" class="mb-3 text-4xl"></font-awesome-icon>
            <p class="mb-6">
                {{ $t("L'artiste n'a pas encore planifié de voyages pour le moment") }}
            </p>
        </div>
    </div>
</template>

<script>

    import GuestCard from '@/components/GuestCard';

    export default {
        components:{
            GuestCard,
        },
        props : {
            artist:{
                type:Object
            }
        },

    }
</script>
