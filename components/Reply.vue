<template>
    <conversation :owner="data.owner">
        <div class="bg-white border-gray-400 border px-2 py-1 rounded-sm w-full relative">
            <form v-if="editMode" @submit.prevent="save">
                <textarea class="input" name="body" id="body" rows="2" v-model="reply.body"></textarea>
                <div class="text-right">
                    <a class="text-blue-500 mr-1" href="#" @click.prevent="cancelEditing">Annuler</a>
                    <button class="button">Mettre à jour</button>
                </div>
            </form>
            <div v-else v-html="reply.body" class="whitespace-pre-line"></div>

            <div class="flex justify-between text-xs mt-2">
                <p class="text-gray-500 text-xs">
                    {{ data.created_at | diffForHumans }}
                </p>
                <div v-if="editable">
                    <a class="text-blue-500 mr-3"  href="#" @click.prevent="editMode = true">Editer</a>
                    <a class="text-blue-500"  href="#" @click.prevent="remove">Supprimer</a>
                </div>
            </div>
        </div>
    </conversation>
</template>

<script>

    import Form from "@/utilities/Form"
    import Conversation from '@/components/Conversation';

    export default {
        components: {
            Conversation
        },
        props : {
            data : {
                type: Object,
                required:true,
            }
        },

        data(){
            return {
                editMode : false,
                reply : new Form({
                    body : this.data.body
                })
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
            save(){
                this.reply.patch(`/replies/${this.data.id}`)
                    .then((response) => {
                        this.reply.body = response.reply.body;
                        this.editMode = false;
                    })
            },

            cancelEditing(){
                this.editMode = false;
                this.reply.body = this.data.body;
            },

            remove(){
                if(confirm(this.$i18n.t('Supprimer cette réponse ?'))){
                    this.$axios.delete(`/replies/${this.data.id}`)
                        .then(response => {
                            this.$emit('removed')
                        })
                }
            }
        }
    }
</script>
