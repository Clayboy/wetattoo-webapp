<template>
    <div class="container mx-auto md:w-3/4 lg:w-2/3">
        <header class="flex items-center mb-4">
            <h1 class="page-title flex-grow leading-none">
                <div v-if="firstConnection">
                    {{ $t('Heureux de vous accueillir, {name}', {name : user.name}) }}
                </div>
                <div v-else>
                    {{ $t('Heureux de vous revoir, {name}', {name : user.name}) }}
                </div>
            </h1>
        </header>
        <div class="md:flex items-start justify-center">
            <activity-feed  class="md:w-2/3 md:mr-4"></activity-feed>
            <div class="md:w-1/3">
                <div  class="panel mb-4 text-lg">
                    {{ $t("Retrouvez bientôt ici l'actu tattoo près de chez vous et les alertes de vos tatoueurs favoris.") }}
                </div>
                <!-- <div  class="panel mb-4">
                    <h3 class="text-lg font-light">
                        Alerte créneau disponible
                    </h3>

                    [Conventions]
                </div>
                <div  class="panel mb-4">
                    <h3 class="text-lg font-light">
                        Près de chez vous
                    </h3>

                    [Conventions / Guests]
                </div>
                <div  class="panel mb-4">
                    <h3 class="text-lg font-light">
                        Suggestions
                    </h3>
                    [Artists]
                </div> -->
            </div>
        </div>
    </div>
</template>

<script>

    import ActivityFeed from '@/components/feed/ActivityFeed';
    import { mapState } from 'vuex';

    export default {

        data(){
            return {
            }
        },

        computed:{
            ...mapState({
                user : state => state.auth.user
            }),

            firstConnection(){
                return this.$route.query.welcome !== undefined
            }
        },

        components: {
            ActivityFeed
        }
    }
</script>
