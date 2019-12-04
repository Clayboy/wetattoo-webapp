<template>
        <button :class="classes"
            @click="subscribe"
            v-text="isActive ? 'Following' : 'Follow'" />
</template>

<script>
    export default {

        props : [
            'active',
            'artist'
        ],

        data(){
            return {
                isActive : this.active,
            }
        },

        computed : {
            classes(){
                return ['btn', this.isActive ? 'btn-primary-outline' : ' btn-primary'];
            }
        },

        methods : {
            subscribe(){

                let requestTye = this.isActive ? 'delete' : 'post';

                axios[requestTye](`/artists/${this.artist.id}/subscriptions`)
                .then(response => {
                    this.isActive = !this.isActive ;

                    this.isActive ? this.$emit('subscribed') : this.$emit('unsubscribed');
                })
            }
        }

    }
</script>
