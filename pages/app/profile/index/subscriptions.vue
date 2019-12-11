<template>
    <div>

        <div class="my-1 border-b border-gray-200 py-2 px-3 flex items-center" v-for="(one, index) in subscriptions" :key="index">
            <avatar :img="one.artist.avatar_url" :size="8" class="mr-3" />
            <div class="flex-grow font-medium">
                {{one.artist.pseudo}}
            </div>
            <subscribe-button class="btn-small"
                    :artist="one.artist"
                    :active="one.artist.isSubscribedTo" />
        </div>

    </div>
</template>

<script>
    import { mapState } from 'vuex'
    import SubscribeButton from '@/components/forms/SubscribeButton'


    export default {
        components : {
            SubscribeButton
        },
        data(){
            return {
                subscriptions : []
            }
        },
        created(){
            this.fetch()
        },
        computed: {
            ...mapState({
                user : state => state.auth.user
            })
        },
        methods : {
            fetch(){
                this.$axios.get(`/users/${this.user.id}/subscriptions`)
                    .then(({data}) => {
                        this.subscriptions = data.subscriptions
                    })
            }
        }
    }
</script>
