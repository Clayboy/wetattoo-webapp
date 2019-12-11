<template>
    <div class="container mx-auto">
        <header class="flex items-center mb-4">
            <h1 class="page-title flex-grow">
                {{ $t("Déplacements") }}
            </h1>
            <div>
                <button class="button" @click="displayForm = true;">{{ $t("Ajouter un guest") }}</button>
            </div>
        </header>
        <guest-form
            :artist-id="this.artistId"
            :guest="guest"
            v-if="displayForm"
            @created="appendGuest"
            @updated="replaceGuest"
            @close="displayForm = false; guest = {}">
        </guest-form>

        <div class="panel">

            <div class="mb-3 text-right">
                <label class="mr-2" for="">{{ $t("Afficher les guests terminés") }}</label>
                <el-switch active-color="#434190" v-model="showPastGuests"></el-switch>
            </div>

            <guest-card
                v-for="guest in ascGuests"
                :guest="guest"
                class="mb-3"
                :key="guest.id">
                <div>
                    <button @click="edit(guest)" class="w-full text-indigo-800 hover:text-white hover:bg-indigo-800 block border border-indigo-800 rounded rounded px-2 mb-1 text-sm">Editer</button>
                    <button @click="destroy(guest)" class="w-full text-gray-500 hover:bg-gray-500 hover:text-white block border border-gray-500 rounded px-2  text-sm">Supprimer</button>
                </div>
            </guest-card>
        </div>
    </div>

</template>


<script>
    import Form from '@/utilities/Form'
    import GuestForm from '@/components/forms/GuestForm';
    import GuestCard from '@/components/GuestCard';
    import { mapState } from 'vuex';

    export default {
        middleware : 'auth-artist',
        layout : 'member',
        components:{
            GuestForm,
            GuestCard
        },
        data(){
            return {
                displayForm : false,
                guests : [],
                guest : {},
                showPastGuests : false,
                guestForm : new Form({
                    artist_id : this.artistId,
                    start_date: '',
                    end_date : '',
                    parlor : '',
                    city : '',
                    country : ''
                })
            }
        },

        created(){
            this.guestForm.originalData.artist_id = this.artistId;
            this.guestForm.artist_id = this.artistId;
            this.fetchGuests();
        },

        computed:{

            ...mapState({
                artistId : state => state.auth.user.profile.id
            }),

            filteredGuests(){

                if(!this.showPastGuests){
                    let today = this.$moment();
                    return this.guests.filter(guest => this.$moment(guest.end_date).isAfter(today));
                }

                return this.guests;
            },

            ascGuests(){
                return this.filteredGuests.sort((a, b) => {
                    return this.$moment(a.start_date).isBefore(this.$moment(b.start_date)) ? -1 : 1;
                })
            }
        },

        methods : {

            formatDate: (date, format) => this.$moment(date).format(format),

            fetchGuests(){
                this.$axios.get(`/artists/${this.artistId}/guests`)
                    .then(({data}) => this.guests = data.guests)
            },

            destroy(guest){
                if(confirm('Supprimer ce guest ?')){

                    this.$axios.delete(`/guests/${guest.id}`)
                        .then((response) => {
                            let index = _.findIndex(this.guests, guest);

                            if(index != -1){
                                this.guests.splice(index, 1);
                            }

                            this.$message({
                                message : 'Guest spot supprimé !',
                                type : 'success',
                            })

                        })
                        .catch(error => {
                            this.$message({
                                message : 'Erreur de suppression...',
                                type : 'warning',
                            })
                        })
                }
            },

            appendGuest(guest) {
                this.guests.push(guest)
            },

            replaceGuest(guest) {
                let index = _.findIndex(this.guests, {id : guest.id});
                if(index != -1){
                    this.guests.splice(index, 1, guest);
                }
            },

            edit(guest){
                // this.displayForm = false;
                this.guest = guest;
                this.displayForm = true;
            },
        },
        head(){
            return {
                title : this.$i18n.t("Guestpots")
            }
        }
    }
</script>
