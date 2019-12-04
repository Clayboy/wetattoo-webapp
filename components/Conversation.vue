<template>
    <div class="flex items-end"
        :class="{'flex-row-reverse' : user.id == owner.id}">
        <avatar :img="owner.avatar_url" :email="owner.email" :size="10" class="flex-shrink-0" :class="{'mr-2' : user.id != owner.id, 'ml-2' : user.id == owner.id}"></avatar>
        <slot></slot>
    </div>
</template>

<script>
    export default {
        props : {
            owner : {
                type: Object,
                required:true,
            }
        },

        computed:{
            user(){
                return this.$store.state.auth.user
            },
        },
    }
</script>
