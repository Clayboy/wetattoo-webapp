<template>
    <div class="auth-body">
        <div class="auth-splash" :style="`background-image:url('${splashImage}')`">
        </div>

        <div class="auth-form">
            <h1 class="mb-6 text-center font-light text-2xl">
                {{ $t('Réinitialiser votre mot de passe') }}
            </h1>
            <form method="POST" @submit.prevent="resetpassword">

                <div class="mb-3 text-red-700 text-sm" v-if="form.errors.message">
                    <font-awesome-icon class="mr-1" :icon="['fal', 'exclamation-triangle']"></font-awesome-icon>
                    {{ form.errors.message }}.
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

                <div class="mt-6 text-right">
                    <button class="bg-indigo-800 hover:bg-indigo-900 text-white py-1 px-4 rounded">
                        {{ $t('Réinitialiser le mot de passe') }}
                    </button>
                </div>
            </form>
        </div>
    </div>
</template>


<script>
    import Form from '@/utilities/Form';

    export default {
        validate ({ params }) {
            // Doit être un nombre
            return params.token.length > 0
        },
        data(){
            
            return {
                form : new Form({
                    token : null,
                    email: null,
                    password: null,
                    password_confirmation: null,
                }),

            }
        },
        created(){
            this.form.token = this.$route.params.token
        },
        computed:{
            splashImage(){
                let index = Math.floor(Math.random() * 3) + 1;
                let type = Math.round(Math.random()) == 0 ? 'artist' : 'member';

                return `https://cdn.we-tattoo.com/assets/splashs/splash_${type}_${index}.jpg`;
            }
        },
        methods:{
            resetpassword(){

                this.form.post("/password/reset")
                    .then(data => {
                        this.$message({
                            message : this.$i18n.t('Votre mot de passe est réinitialisé')
                        })
                        this.$router.push({name: 'login'})
                    });
            }
        }
    }
</script>
