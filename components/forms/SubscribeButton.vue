<template>
        <button :class="classes"
            @click.prevent.stop="subscribe"
            v-text="isActive ? 'Following' : 'Follow'" />
</template>

<script>
    export default {

        props : {
            active :  {
                type: Boolean,
            },
            artist : {
                type: Object,
                required: true,
            },
            activeClass : {
                type : Array | String,
                default : () => ['btn', 'btn-primary'],
            },
            inactiveClass : {
                type : Array | String,
                default : () => ['btn', 'btn-primary'],
            }
        },

        data(){
            return {
                isActive : this.active,
            }
        },

        computed : {
            classes(){
                return this.isActive ? this.activeClass :  this.inactiveClass;
            }
        },

        methods : {
            subscribe(){
                if(!this.$auth.loggedIn){
                    this.$bus.$emit('register:invite');
                    return
                }

                let requestTye = this.isActive ? 'delete' : 'post';

                this.$axios[requestTye](`/artists/${this.artist.id}/subscriptions`)
                    .then(response => {
                        this.isActive = !this.isActive ;
                        this.isActive ? this.$emit('subscribed') : this.$emit('unsubscribed');
                    })
            }
        }

    }
</script>
