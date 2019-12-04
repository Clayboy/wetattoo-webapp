<template>
    <right-panel @close="$emit('close')">
        <template v-slot:title>
            {{ event.summary }}
        </template>
        <template v-slot:body>
            <div  class="flex items-baseline mb-6 text-lg">
                <font-awesome-icon :icon="['fal', 'calendar-alt']" class="mr-2"></font-awesome-icon>
                <div>
                    {{ event.start | date('LL') }}
                    <p>
                        {{ $t('De {start} à {end}', {start : $moment(event.start).format('LT'), end: $moment(event.end).format('LT')})}}
                    </p>
                </div>
            </div>

            <div class="mb-6" v-if="event.description">
                <h3 class="text-lg mb-3">
                    {{ $t("Détails") }}
                </h3>
                {{ event.description }}
            </div>

            <div class="mb-6" v-if="event.booking_id">
                <h3 class="text-lg mb-3">
                    {{ $t('Projet lié') }}
                </h3>
                <router-link class="text-blue-500" :to="{name : 'bookings.show', params : {bookingid : event.booking_id}}">
                    {{ event.booking.title }}
                </router-link>
            </div>

            <div class="mb-6" v-if="event.attendees.length">
                <h3 class="text-lg mb-3">
                    {{ $t('Participants') }}
                </h3>
                <ul>
                    <li v-for="attendee in event.attendees"
                        v-text="attendee.email"
                        :key="attendee.id"></li>
                </ul>
            </div>
        </template>
        <template v-if="displayActions" v-slot:footer>
            <a href="#" class="text-blue-500 mx-3" @click.prevent="cancel">
                {{ $t("Annuler le rendez-vous") }}
            </a>
            <button class="btn btn-primary mx-3" @click="edit">
                {{ $t('Editer') }}
            </button>
        </template>
    </right-panel>
</template>

<script>

    import RightPanel from '@/components/layout/RightPanel';

    export default {
        props:{
            event : {
                type:Object
            },
            displayActions : {
                type:Boolean,
                required : false,
                default : false,
            },
        },
        components:{
            RightPanel
        },

        methods : {
            cancel(){

                this.$confirm('Voulez-vous vraiment annuler ce rendez-vous ?', 'Annulation Rendez-vous', {
                        confirmButtonText: 'Ok',
                        cancelButtonText: 'Annuler',
                        type: 'warning'
                    })
                    .then(() => {
                        this.remove()
                    })
            },

            edit(){
                this.$emit('edit', this.event)
            },

            remove(){
                axios.delete(`/appointments/${this.event.id}`)
                    .then(() => {
                        this.$emit('deleted', this.event.id)
                        this.$emit('close')
                    });
            }
        }
    }
</script>
