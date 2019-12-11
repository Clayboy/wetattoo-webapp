<template>
    <right-panel @close="close">
        <template v-slot:title>
            {{$t("Nouveau projet") }}
        </template>
        <template v-slot:body>
            <form @submit.prevent="save">
                <div class="mb-8">
                    <h3 class="text-xl font-light mb-3">
                        {{ $t("Le projet") }}
                    </h3>
                    <div class="field mb-2">
                        <label class="label mb-1 block" for="zone">
                            {{ $t("Zone que vous souhaitez tatouer") }}
                        </label>
                        <div class="control">

                            <select class="input h-10"
                                :class="{'error' : bookingRequest.errors.has('zone')}"
                                name="zone"
                                v-model="bookingRequest.zone">
                                <option value="" class="text-gray-500">— {{ $t("Choisissez l'emplacement du tatouage")}} —</option>
                                <option v-for="zone in zones"
                                    v-text="zone.label"
                                    :value="zone.name"
                                    :key="zone.name"></option>
                            </select>
                            <div class="error-msg" v-if="bookingRequest.errors.has('zone')" v-text="bookingRequest.errors.get('zone')" />
                        </div>
                    </div>
                    <div class="field mb-2">
                        <label class="label mb-1 block" for="size_l">
                            {{ $t("Taille de la zone à tatouer (en cm)") }}
                        </label>
                        <div class="control">
                            <div class="flex">
                                <input
                                    type="text"
                                    class="input mr-3"
                                    :class="{'error' : bookingRequest.errors.has('size_l')}"
                                    name="size_l"
                                    placeholder="Largeur approximative"
                                    v-model="bookingRequest.size_l">
                                <input
                                    type="text"
                                    class="input"
                                    :class="{'error' : bookingRequest.errors.has('size_h')}"
                                    name="size_l"
                                    placeholder="Hauteur approximative"
                                    v-model="bookingRequest.size_h">
                            </div>
                            <div class="error-msg" v-if="bookingRequest.errors.has('size_l')" v-text="bookingRequest.errors.get('size_l')" />
                        </div>
                    </div>
                    <div class="field mb-2">
                        <label class="label mb-1 block" for="style">
                            {{ $t("Style") }}
                        </label>
                        <div class="control">
                            <select  v-model="bookingRequest.style" class="input h-8" :class="{'error' : bookingRequest.errors.has('style')}">
                                <option value="color">{{ $t("Couleur") }}</option>
                                <option value="color">{{ $t("Noir & Gris") }}</option>
                            </select>
                            <div class="error-msg" v-if="bookingRequest.errors.has('style')" v-text="bookingRequest.errors.get('style')" />
                        </div>
                    </div>

                    <div class="field mb-2">
                        <label class="label mb-1 block" for="budget">
                            {{ $t("Montant") }}
                        </label>
                        <div class="control">
                            <input
                                type="text"
                                class="input"
                                :class="{'error' : bookingRequest.errors.has('budget')}"
                                name="budget"
                                v-model="bookingRequest.budget">
                            <div class="error-msg" v-if="bookingRequest.errors.has('budget')" v-text="bookingRequest.errors.get('budget')" />
                        </div>
                    </div>

                    <div class="field mb-2">
                        <label class="label mb-1 block" for="title">
                            {{ $t('Motif à tatouer') }}
                        </label>
                        <div class="control">
                            <input
                                type="text"
                                class="input"
                                :class="{'error' : bookingRequest.errors.has('title')}"
                                name="title"
                                :placeholder="$t('Ex: Ancre marine, Rose tattoo')"
                                v-model="bookingRequest.title">
                            <div class="error-msg" v-if="bookingRequest.errors.has('title')" v-text="bookingRequest.errors.get('title')" />
                        </div>
                    </div>

                    <div class="field mb-2">
                        <label class="label mb-1 block" for="description">
                            {{ $t("Description") }}
                        </label>
                        <div class="control">
                            <textarea
                                :class="{'error' : bookingRequest.errors.has('description')}"
                                name="description"
                                class="input h-32"
                                :placeholder='$t("Décrivez votre projet avec le plus de détails possible.\nAjoutez des liens pour illustrer vos idées")'
                                v-model="bookingRequest.description"></textarea>
                            <div class="error-msg" v-if="bookingRequest.errors.has('description')" v-text="bookingRequest.errors.get('description')" />
                        </div>
                    </div>
                </div>

                <div>
                    <h3 class="text-xl font-light mb-4">{{ $t("Votre client") }}</h3>

                    <div v-if="account == 'none'">
                        <div class="field mb-2">
                            <label class="label mb-1 block" for="email">
                                {{ $t("Adresse email") }}
                            </label>
                            <div class="control">
                                <input
                                    type="text"
                                    class="input"
                                    :class="{'error' : bookingRequest.errors.has('email')}"
                                    name="email"
                                    v-model="bookingRequest.email">
                                <div class="error-msg" v-if="bookingRequest.errors.has('email')" v-text="bookingRequest.errors.get('email')" />
                            </div>
                        </div>

                        <div class="field mb-2">
                            <label class="label mb-1 block" for="">
                                <input
                                    type="checkbox"
                                    name=""
                                    v-model="bookingRequest.tattooed" />
                                    {{$t('Déjà tatoué')}}
                            </label>
                        </div>
                        <div class="field mb-2">
                            <label class="label mb-1 block" for="firstname">
                                {{ $t("Prénom") }}
                            </label>
                            <div class="control">
                                <input
                                    type="text"
                                    class="input"
                                    :class="{'error' : bookingRequest.errors.has('firstname')}"
                                    name="firstname"
                                    v-model="bookingRequest.firstname">
                                <div class="error-msg" v-if="bookingRequest.errors.has('firstname')" v-text="bookingRequest.errors.get('firstname')" />
                            </div>
                        </div>

                        <div class="field mb-2">
                            <label class="label mb-1 block" for="lastname">
                                {{ $t("Nom") }}
                            </label>
                            <div class="control">
                                <input
                                    type="text"
                                    class="input"
                                    :class="{'error' : bookingRequest.errors.has('lastname')}"
                                    name="lastname"
                                    v-model="bookingRequest.lastname">
                                <div class="error-msg" v-if="bookingRequest.errors.has('lastname')" v-text="bookingRequest.errors.get('lastname')" />
                            </div>
                        </div>

                        <div class="field mb-2">
                            <label class="label mb-1 block" for="phone">
                                {{ $t("Téléphone") }}
                            </label>
                            <div class="control">
                                <input
                                    type="text"
                                    class="input"
                                    :class="{'error' : bookingRequest.errors.has('phone')}"
                                    name="phone"
                                    v-model="bookingRequest.phone">
                                <div class="error-msg" v-if="bookingRequest.errors.has('phone')" v-text="bookingRequest.errors.get('phone')" />
                            </div>
                        </div>
                        <div class="field mb-2">
                                <label class="label mb-1 block" for="phone">
                                {{ $t("Disponibilités") }}
                            </label>
                            <div class="control">
                                <textarea
                                    :class="{'error' : bookingRequest.errors.has('availabilities')}"
                                    name="availabilities"
                                    class="input h-32"
                                    :placeholder="$t('Indiquez les jours dans la semaine, la période où le client est disponible afin de planifier plus rapidement un RDV')"
                                    v-model="bookingRequest.availabilities"></textarea>
                                <div class="error-msg" v-if="bookingRequest.errors.has('availabilities')" v-text="bookingRequest.errors.get('availabilities')" />
                            </div>
                        </div>
                    </div>
                </div>

                <div class="text-right">
                    <button class="button">
                        {{ $t("Créer le projet") }}
                    </button>
                </div>
            </form>
        </template>
    </right-panel>
</template>
<script>

    import Form from '@/utilities/Form'
    import RightPanel from '@/components/layout/RightPanel'

    export default {
        components : {
            RightPanel
        },
        props:{
            artistId : {
                type:Number,
                required:true,
            },
            artistPseudo : {
                type: String
            }
        },

        watch: {
            'bookingRequest.email': (val) => {

                let regExp = new RegExp('(@)([a-zA-Z0-9]+)(.)([a-zA-Z]+)', 'ig');

                if(regExp.test(val)){
                    axios.get('/users/search?email='+val)
                        .then(data => {
                            this.suggestions = data.users;
                        })
                }
            }
        },
        data(){
            return {
                suggestions : [],
                bookingRequest : new Form({
                    artist_id : this.artistId,
                    // user_id : false,
                    zone : '',
                    size_l : '',
                    size_h : '',
                    style : 'color',
                    title : '',
                    description : '',
                    availabilities : '',
                    budget : '',
                    status : 'accepted',

                    firstname : '',
                    lastname : '',
                    tattooed : false,
                    email : '',
                    phone : '',
                }),
                account : 'none',
                zones : [],
            }
        },
        async mounted() {
            this.zones = await this.$store.dispatch('tattooZones')
        },

        methods : {

            updateUser(user){
                this.bookingRequest.user_id = '';
            },
            save(){
                this.saveBooking();
            },

            saveBooking(){
                this.bookingRequest.post('/bookings')
                    .then(response => {

                        this.close();
                        this.$router.push({name : 'bookings.show', params : {bookingid : response.booking.id}});
                    })
            },

            close(){
                this.$emit('close');
            }
        }
    }
</script>
