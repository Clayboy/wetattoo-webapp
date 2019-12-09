<template>
    <form method="post" class="flex items-start" @submit.prevent="save">
        <div class="field flex-grow mr-2 h-10 sm:h-24 border border-gray-400 rounded">
            <textarea
                type="text"
                class="px-2 bg-white w-full h-full"
                id="body"
                :class="{'error' : replyForm.errors.has('body')}"
                name="body"
                :placeholder="$t('Message...')"
                rows="1"
                :disabled="disabled"
                v-model="replyForm.body"></textarea></div>
        <button :disabled="disabled" class="button">
            <font-awesome-icon :icon="['fal', 'paper-plane']" class="text-xl"></font-awesome-icon>
        </button>
    </form>
</template>

<script>

    import Form from '@/utilities/Form'

    export default {
        props: {
            bookingid : {
                required: true,
            },
            disabled:{
                type:Boolean,
                default:false,
            }
        },

        data(){
            return {
                replyForm : new Form({
                    body : '',
                    booking_id : this.bookingid,
                })
            }
        },

        methods:{
            save(){
                this.replyForm.post(`bookings/${this.bookingid}/replies`)
                    .then((response) => {
                        this.replyForm.reset();
                        this.$emit('newreply', response.reply);
                    })
            }
        }
    }
</script>
