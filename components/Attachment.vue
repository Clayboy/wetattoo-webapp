<template>
    <conversation :owner="data.owner">
        <div class="relative w-1/3 sm:w-1/4">
            <img :src="data.file_url" alt="" class="object-cover rounded h-full w-full" />

            <div class="flex justify-between text-xs">
                <p class="text-gray-500">
                    {{ data.created_at | diffForHumans }}
                </p>
                <div v-if="editable">
                    <a href="#" class="cursor-pointer text-blue-500" @click.prevent="remove">Supprimer</a>
                </div>
            </div>
        </div>
    </conversation>
</template>
<script>

    import Conversation from '@/components/Conversation';

    export default{
        components:{
            Conversation
        },
        props:{
            data : {
                type: Object,
                required:true,
            }
        },

        computed:{
            user(){
                return this.$store.state.auth.user
            },

            editable(){
                return this.user.id == this.data.user_id
            },
        },

        methods:{
            remove(){
                axios.delete(`/attachments/${this.data.id}`)
                    .then(() => this.$emit('removed'))
            }
        }
    }
</script>
