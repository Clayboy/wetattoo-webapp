<template>
    <div>
        <nuxt-link class="relative block md:flex md:items-center  px-4 py-2" :to="{name : 'app-bookings-id', params : {id : booking.id}}">
            <div class="flex-shrink-0 mr-2 flex items-center text-sm" v-if="status">
                <font-awesome-icon :icon="status.icon" class="mr-1" :class="status.class"></font-awesome-icon>
                <span class="visible md:hidden leading-none">{{ status.label }}</span>
            </div>
            <div class="font-medium mr-1 md:w-32 flex-shrink-0 truncate">
                {{ recipient }}
            </div>
            <div class="md:flex text-left items-baseline flex-grow flex-shrink truncate">
                <div>
                    <font-awesome-icon :icon="['fas', 'bolt']" class="text-yellow-500" v-if="booking.flash_id"></font-awesome-icon>
                    {{ booking.title }}
                </div>
                <div class="hidden md:block text-gray-500 mx-1">—</div>
                <div class="text-sm text-gray-600">{{ booking.description }}</div>
            </div>

            <div class="absolute top-0 right-0 pt-2 pr-2 md:p-0 md:relative flex items-center">
                <div class="flex-shrink-0 flex-grow-0 w-8 mx-1 text-right whitespace-no-wrap text-gray-500 text-xs">
                    <font-awesome-icon :icon="['fal', 'image-polaroid']" class="text-sm"></font-awesome-icon>
                    {{ booking.attachments_count }}
                </div>
                <div class="flex-shrink-0 flex-grow-0 w-8 mx-1 text-right whitespace-no-wrap text-gray-500 text-xs">
                    <font-awesome-icon :icon="['fal', 'comments-alt']"></font-awesome-icon>
                    {{ booking.replies_count }}
                </div>
                <div class="flex-shrink-0 ml-2 text-gray-600 text-xs w-12 text-right">{{ booking.updated_at | compact }}</div>
            </div>
        </nuxt-link>
    </div>
</template>

<script>

    import {bookingStatus} from '@/utilities/TattooVars';


    export default {
        props: {
            booking : {
                type: Object
            },
            usertype : {
                type: String,
                default : 'member'
            }
        },

        computed : {

            recipient(){
                if(this.usertype == 'member'){
                    return this.booking.artist.pseudo;
                }

                if(this.booking.requester){
                    return this.booking.requester.name;
                }else{
                    return this.booking.firstname+ " " +this.booking.lastname;
                }
            },

            status(){
                let index = _.findIndex(bookingStatus, {name : this.booking.status});

                if(index != -1){
                    return bookingStatus[index];
                }

                return false
            },
        }
    }
</script>
