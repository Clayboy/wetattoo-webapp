<template>
    <form method="POST" @submit.prevent="submit">
        <div class="field mb-2">
            <label class="label mb-1 block" for="name">
                {{ type == 'artist' ? $t("Nom d'artiste") : $t('Pseudo') }}
            </label>
            <div class="control">
                <input
                    type="text"
                    class="input"
                    :class="{'error' : form.errors.has('name')}"
                    name="name"
                    v-model="form.name">
                <div class="error-msg" v-if="form.errors.has('name')" v-text="form.errors.get('name')" />
            </div>
        </div>
        <div class="field mb-2">
            <label class="label mb-1 block" for="email">
                {{ $t('Adresse email') }}
            </label>
            <div class="control">
                <input
                    type="text"
                    class="input"
                    :class="{'error' : form.errors.has('email')}"
                    name="email"
                    v-model="form.email">
                <div class="error-msg" v-if="form.errors.has('email')" v-text="form.errors.get('email')" />
            </div>
        </div>

        <div class="field mb-2">
            <label class="label mb-1 block" for="password">
                {{ $t('Mot de passe') }}
            </label>
            <div class="control">
                <input
                    type="password"
                    class="input"
                    :class="{'error' : form.errors.has('password')}"
                    name="password"
                    v-model="form.password">
                <div class="error-msg" v-if="form.errors.has('password')" v-text="form.errors.get('password')" />
            </div>
        </div>
        <div class="field mb-2">
            <label class="label mb-1 block" for="password_confirmation">
                {{ $t('Confirmez votre mot de passe') }}
            </label>
            <div class="control">
                <input
                    type="password"
                    class="input"
                    :class="{'error' : form.errors.has('password_confirmation')}"
                    name="password_confirmation"
                    v-model="form.password_confirmation">
                <div class="error-msg" v-if="form.errors.has('password_confirmation')" v-text="form.errors.get('password_confirmation')" />
            </div>
        </div>
        <div v-if="displaySubmit" class="text-right">
            <button type="submit" class="bg-indigo-800 hover:bg-indigo-900 text-white py-1 px-4 rounded">
                {{ $t('Créer votre compte') }}
            </button>
        </div>
    </form>
</template>

<script>
    import Form from '@/utilities/Form'

    export default {
        props:{
            type : {
                type: String,
                required:true,
                validator: (value) => ['artist', 'member'].indexOf(value) !== -1
            },
            displaySubmit: {
                type: Boolean,
                required: false,
                default : true,
            }
        },
        data(){
            return {
                form : new Form({
                    timezone : this.$moment.tz.guess(),
                    name: '',
                    email: '',
                    password: '',
                    password_confirmation: '',
                    profile : this.type,
                    locale : this.$i18n.locale
                })
            }
        },
        watch:{
            '$store.state.language.language'(newVal){
                this.form.locale = newVal;
            }
        },
        methods: {
            submit() {
                return this.form.post('/auth/register')
                    .then((data) => {
                        this.$auth.setUserToken(data.token);
                        this.$auth.fetchUser()
                        this.$emit('registered', {user : data.user});
                    })
                    .catch((error) => {
                        // console.dir(error);
                        // alert(error.error);
                    });
            }
        }
    }
</script>
