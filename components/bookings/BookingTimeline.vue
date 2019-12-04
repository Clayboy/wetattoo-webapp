<template>
    <div>
        <div class="bg-white overflow-y-auto border border-gray-300 p-3">
            <slot></slot>
            <div v-for="(entry, index) in activity" :key="entry.id">
                <component
                    class="my-2"
                    v-if="isComponent(entry.subject_type) && entry.subject != null"
                    :is="entry.subject_type"
                    @removed="removeActivity(index)"
                    :data="entry.subject">
                </component>
                <div v-if="!isComponent(entry.subject_type)"
                    class="flex items-end text-gray-500 my-2"
                    :class="{'flex-row-reverse' : user.id == entry.user_id}">
                    <avatar :img="entry.user.avatar_url" :email="entry.user.email" :size="10" class="flex-shrink-0" :class="{'mr-3' : user.id != entry.user_id, 'ml-3' : user.id == entry.user_id}"></avatar>
                    <div class="text-right text-sm">
                        {{ eventDescription(entry.description) }}
                        <p class="text-xs m-0">
                            {{ entry.created_at | diffForHumans }}
                        </p>
                    </div>
                </div>
            </div>
        </div>

        <div class="fixed border-t border-gray-300 sm:border-0 sm:relative left-0 w-full bottom-0 sm:z-0 bg-white px-3 py-2 shadow flex items-start" style="z-index:100">
            <file-upload
                :upload-url="`/bookings/${bookingId}/attachments`"
                class="w-10 h-10 rounded mr-2 overflow-hidden"
                @uploaded="addAttachment">
                <font-awesome-icon :icon="['fal', 'camera']" class="text-2xl"></font-awesome-icon>
            </file-upload>
            <reply-form
                class="flex-grow"
                :disabled="!canReply"
                :bookingid="bookingId"
                @newreply="addReply">
            </reply-form>
        </div>
    </div>

</template>

<script>

    import FileUpload from '@/components/forms/FileUpload';
    import Attachment from '@/components/Attachment';
    import ReplyForm from '@/components/ReplyForm';
    import Reply from '@/components/Reply';
    import {bookingStatus} from '@/utilities/TattooVars';


    export default {
        props:{
            bookingId:{
                type : [Number, String],
                required:true,
            },
            bookingStatus:{
                type : String,
                required:true,
            }
        },

        data(){
            return {
                activity : [],
                events : [
                    {name:'created_booking', label : this.$i18n.t('Demande de réservation créée')},
                    {name:'accepted_booking', label : this.$i18n.t('Demande de réservation acceptée')},
                    {name:'refused_booking', label : this.$i18n.t('Demande de réservation refusée')},
                ]
            }
        },

        created(){
            this.fetchActivity();
        },

        computed: {

            canReply(){
                return this.usertype == 'artist' // Artist can always comment
                    || (this.usertype == 'member' && this.bookingStatus == 'accepted') // Member can reply since request is accepted
                    || (this.usertype == 'member' && this.bookingStatus == 'pending' && this.activity.length) // Member can reply if artist need more infos & initiated conversation
            },

            usertype(){
                return this.$store.getters['auth/usertype'];
            },
            user(){
                return this.$store.state.auth.user;
            },
        },

        methods:{
            eventDescription(event){
                let index = _.findIndex(this.events, {name : event});

                if(index != -1){
                    return this.events[index].label;
                }

                return '';
            },

            isComponent(type){
                return ['reply', 'attachment'].find(one => type == one);
            },

            fetchActivity(){
                axios.get('bookings/' + this.bookingId + '/activity')
                    .then(({data}) => this.activity = data);
            },

            removeActivity(index){
                this.activity.splice(index, 1);
            },

            addReply(reply){
                this.activity.push({
                    subject_id : reply.id,
                    subject_type : 'reply',
                    subject: reply
                })
            },

            addAttachment(data){
                this.activity.push({
                    subject_id : data.attachment.id,
                    subject_type : 'attachment',
                    subject: data.attachment,
                })
            }
        },

        components:{
            FileUpload,
            Attachment,
            ReplyForm,
            Reply
        },
    }
</script>
