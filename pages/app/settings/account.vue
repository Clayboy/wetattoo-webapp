<template>
    <form @submit.prevent="updateUser" class="mb-8">
        <h3 class="title-3">Informations personnelles</h3>
        <p class="text-sm mb-1">
            Vos informations personnelles ne sont pas partagées dans votre profil.
            Votre email vous sert à vous identifier sur <strong>We Tattoo</strong>
        </p>
        <div class="md:flex mb-8">
            <div class="md:mr-3 md:w-1/2">
                <div class="field mb-2">
                    <label class="label mb-1 block" for="email">
                        Email
                    </label>
                    <div class="control">
                        <input
                            type="text"
                            class="input"
                            name="email"
                            v-model="user.email"
                            disabled />
                    </div>
                </div>
                <div class="field mb-2">
                    <label class="label mb-1 block" for="email">
                        Nom
                    </label>
                    <div class="control">
                        <input
                            type="text"
                            class="input"
                            :class="{'error' : user.errors.has('name')}"
                            name="forename"
                            v-model="user.name"
                            required>
                        <div class="error-msg" v-if="user.errors.has('name')" v-text="user.errors.get('name')" />
                    </div>
                </div>

            </div>
            <div class="field mb-2 md:w-1/2">
                <div class="field mb-2">
                    <label class="label mb-1 block" for="email">
                        Langue de l'interface
                    </label>
                    <div class="control">
                        <select class="input" name="locale" v-model="user.locale">
                            <option value="fr">{{ $t('Français') }}</option>
                            <option value="en">{{ $t('Anglais') }}</option>
                        </select>
                    </div>
                </div>
                <div class="field mb-2">
                    <label class="label mb-1 block" for="email">
                        Zone
                    </label>
                    <div class="control">
                        <timezone-picker v-model="user.timezone"></timezone-picker>
                    </div>
                </div>
            </div>
        </div>
        <div class="flex justify-center">
            <button class="button">
                {{ $t('Enregistrer') }}
            </button>
        </div>
    </form>
</template>
<script>

    import Form from '@/utilities/Form'
    import TimezonePicker from '@/components/forms/TimezonePicker';
    import {mapState} from 'vuex'

    export default {
        components : {
            TimezonePicker
        },
        head : {
            title : 'Compte',
        },
        data(){
            return {
                user : new Form({
                    email : this.$store.state.auth.user.email,
                    name : this.$store.state.auth.user.name,
                    locale : this.$store.state.auth.user.locale,
                    timezone : this.$store.state.auth.user.timezone
                }),
            }
        },
        computed :{
            ...mapState({
                userId : state => state.auth.user.id,
                profile : state => state.auth.user.profile
            })
        },
        methods:{
            updateUser(){

                this.user.put(`/users/${this.userId}`)
                    .then((data) => {

                        let updatedUser = data;
                        updatedUser.profile = this.profile;
                        this.$auth.$storage.setState('user', updatedUser);

                        console.log(this.$auth.user.locale);
                        this.$i18n.setLocale(this.$auth.user.locale);

                        this.$message({
                            message: 'Vos informations personnelles ont été mise à jour.',
                            type: 'success',
                            customClass: 'bg-teal-100 border-0 border-t-4 border-teal-500 rounded-none rounded-b text-teal-900 px-4 py-3 shadow-md'
                        })
                    })
                    .catch((error) => {
                        this.$message({
                            message: 'Erreur de mise à jour de vos informations personnelles',
                            type: 'warning',
                            customClass: 'bg-teal-100 border-0 border-t-4 border-teal-500 rounded-none rounded-b text-teal-900 px-4 py-3 shadow-md'
                        })
                    })
            },
        }
    }
</script>
