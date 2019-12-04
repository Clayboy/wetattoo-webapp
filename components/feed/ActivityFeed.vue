<template>
    <div>
        <div v-if="loaded && feed.length  == 0" class="text-gray-700 text-center text-2xl font-light">
            <icon-placeholder class="h-56 sm:rounded-t" />
            <div class="bg-white rounded-b p-4 text-center shadow">
                <div class="mb-6">
                    <p>
                        {{ $t("Explorez & suivez plus d'artistes") }}
                    </p>
                    <p class="text-base">{{ $t("Retrouvez ici l'activité des tatoueurs : guests, flashs & portfolio") }}</p>
                </div>
                <router-link class="btn btn-primary-outline" :to="{name : 'artists.list'}">
                    {{ $t("Parcourir les artistes") }}
                </router-link>
            </div>
        </div>

        <component :is="getComponent(activity.type)"
            v-for="activity in feed"
            :key="activity.id"
            :activity="activity" />

        <button @click="fetchFeed" class="btn btn-primary-outline block w-full" v-if="hasNextPage">
            {{ $t("Afficher plus d'actualités") }}
        </button>
    </div>
</template>

<script>
    import IconPlaceholder from '@/components/IconPlaceholder';
    import CreatedGuest from './cards/CreatedGuest'
    import CreatedMedia from './cards/CreatedMedia'

    export default {
       data(){
            return {
                feed : [],
                page : 0,
                hasNextPage : false,
                loaded : false,
                loading : false,
            }
        },
        created(){
            this.fetchFeed();
        },

        computed:{
            nextPage(){
                return this.page + 1;
            }
        },

        methods : {
            getComponent(type){
               return type.replace('_', '-');
            },

            fetchFeed() {
                this.loading = true;
                axios.get('/users/feed', {
                    params : {
                        page : this.nextPage
                    }
                })
                    .then(({data}) => {
                        this.feed = this.feed.concat(data.data);
                        this.loaded = true;
                        this.loading = false;
                        this.page = data.current_page;
                        this.hasNextPage = this.nextPage < data.last_page
                    })
            }
        },
        components: {
            CreatedGuest,
            CreatedMedia,
            IconPlaceholder
        }
    }
</script>
