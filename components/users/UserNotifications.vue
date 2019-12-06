<template>
    <div class="notifications">
        <button class="notifications-button" @click.prevent="toggleDisplay">
            <font-awesome-icon
                :icon="display ? ['fas', 'bell'] : ['fal', 'bell']"
                class="text-2xl hover:text-gray-300"
                :class="display ? 'text-white' : 'text-gray-300'">
            </font-awesome-icon>

            <span v-if="hasUnreadNotifications" class="absolute top-0 w-3 h-3 bg-indigo-800 rounded-full" style="right:5px;"></span>
        </button>

        <transition name="fade">

            <div v-if="display" class="notifications-panel">
                <div class="p-2 flex justify-between border-b border-gray-300">
                    <h4 class="font-medium">Notifications</h4>

                    <div>
                        <a href="#" class="text-xs text-blue-500 mr-2" @click.prevent="markAllAsRead">
                            {{ $t("Tout marquer comme lu") }}
                        </a>

                        <a href="#" @click.prevent="refresh">
                            <font-awesome-icon :icon="['fal', 'sync']" class="text-base"></font-awesome-icon>
                        </a>
                    </div>
                </div>
                <div class="notifications-list">
                    <div v-if="new_notifications.length">
                        <h4 class="text-sm uppercase px-2 py-1 text-gray-500 border-gray-300 border-b border-t bg-gray-200">
                            {{ $t('Nouveau') }}
                        </h4>
                        <ul>
                            <li v-for="notif in new_notifications"
                                :key="notif.id"
                                @click="markAsRead(notif)"
                                class="border-b border-gray-300 p-2 hover:bg-gray-200"
                                :class="{'bg-indigo-100' : !notif.read_at}">
                                <router-link :to="notif.data.link" class="flex items-center">
                                    <div>
                                        {{notif.data.message}}
                                        <p class="text-xs text-gray-500">{{ notif.created_at | diffForHumans }}</p>
                                    </div>
                                </router-link>
                            </li>
                        </ul>
                    </div>
                    <ul>
                        <h4  v-if="new_notifications.length" class="text-sm uppercase px-2 py-1 text-gray-500 border-gray-300 border-b border-t bg-gray-200">
                            {{ $t('Plus tôt') }}
                        </h4>

                        <li v-for="notif in notifications"
                            :key="notif.id"
                            @click="markAsRead(notif)"
                            class="border-b border-gray-300 p-2 hover:bg-gray-200"
                            :class="{'bg-indigo-100' : !notif.read_at}">
                            <router-link :to="notif.data.link" class="flex items-center">
                                <div>
                                    {{notif.data.message}}
                                    <p class="text-xs text-gray-500">{{ notif.created_at | diffForHumans }}</p>
                                </div>
                            </router-link>
                        </li>
                        <li class="text-center" v-if="next_page">
                            <a href="#" @click.prevent="fetch">voir plus</a>
                        </li>
                    </ul>

                </div>
            </div>
        </transition>
    </div>
</template>


<script>
    /**
     * @todo Fetch new notifications / store first notification load
     */

    import { mapState, mapGetters } from 'vuex';
    import moment from 'moment';

    export default {

        data(){
            return {
                new_notifications : [],
                notifications : [],
                new : [],
                next_page : '',
                unread_count : null,
                firstLoad : moment(),
                last_check : moment(),
                checker : null,
                display : false,
            }
        },
        computed: {
            // ...mapState({
            //     notifications : state => state.auth.notifications
            // }),

            hasUnreadNotifications(){
                return this.unread_count != null && this.unread_count > 0;
            }
        },

        created(){
            this.fetch();

            this.checker = setInterval(() => {
                this.checkNew()
            }, (60000 * 5));
        },

        beforeDestroy(){
            clearInterval(this.checker);
        },

        methods:{
            toggleDisplay(){
                this.display = !this.display;
            },

            fetch(){

                if(this.hasNotifications && this.next_page == null){
                    return ;
                }

                this.$axios.get(this.next_page ? this.next_page : '/notifications',
                    {
                        params : {
                            before : this.firstLoad.unix(),
                            useloader: false
                        }
                    })
                    .then(({data}) => {
                        this.notifications.push(...data.items);
                        this.next_page = data.next_page;
                        this.unread_count = data.unread_count;

                    })
            },

            checkNew(){

                // if(this.new_notifications.length){
                //     this.notifications =
                // }

                this.$axios.get('/notifications', {
                        params : {
                            after : this.last_check.unix(),
                            useloader: false
                        }
                    })
                    .then(({data}) => {
                        this.new_notifications = data.items;
                        this.unread_count = data.unread_count;
                    });
            },

            markAllAsRead(){
                this.$axios.delete('/notifications', {params:{useloader:false}})
                    .then(() => {
                        this.notifications.forEach((notif) => {
                            if(notif.read_at == null){
                                notif.read_at = moment().toString();
                            }
                        });
                        this.unread_count = 0;
                    })
            },

            markAsRead(notif){

                this.display = false;

                if(notif.read_at != null){
                    return;
                }
                this.$axios.delete(`/notifications/${notif.id}`, {params:{useloader:false}})
                    .then(() => {
                        notif.read_at = moment().toString();
                        let index = _.findIndex(this.notifications, notif);
                        this.notifications.splice(index, 1, notif);
                        this.unread_count--;
                    })
            },

            refresh(){
                this.notifications = [];
                this.next_page = '';
                this.fetch()
            }
        }
    }
</script>


<style lang="scss">

    .notifications{

        @screen sm{
            @apply relative;
        }
    }

    .notifications-button{
        @apply block relative px-2 outline-none;
    }

    .notifications-button:focus{
        @apply outline-none;
    }

    .notifications-panel{
        @apply fixed bg-white text-sm left-0 w-full z-50;

        height:calc(100vh - 57px);
        top:57px;

        @screen sm{
            width:350px;
            top:30px;
            left:auto;

            @apply absolute right-0 text-sm shadow-lg border border-gray-300 h-auto;
        }
    }

    .notifications-list{

        @apply overflow-y-auto;

        height:calc(100vh - 57px - 38px);

        @screen sm{
            height:75% !important;
            max-height:calc(100vh - 100px);
        }
    }
</style>
