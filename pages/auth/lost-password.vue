<template>
    <div class="auth-body">
        <div class="auth-splash" :style="`background-image:url('${splashImage}')`">
        </div>

        <div class="auth-form">
            <h1 class="mb-6 text-center font-light text-2xl">
                {{ $t('Mot de passe oublié ?') }}
            </h1>
            <form method="POST" @submit.prevent="resetpassword">
                <div class="field mb-6">
                    <label class="label text-sm mb-2 block" for="email">
                        {{ $t('Adresse email') }}
                    </label>

                    <div class="control">
                        <input id="email"
                            type="email"
                            class="input"
                            name="email"
                            v-model="email"
                            required>
                    </div>
                </div>

                <div class="text-right">
                    <button class="bg-indigo-800 hover:bg-indigo-900 text-white py-1 px-4 rounded">
                        {{ $t('Envoyer le lien de réinitalisation') }}
                    </button>
                </div>
            </form>
            <p class="text-center text-grey-600 text-sm mt-10">
                <router-link class="no-underline text-blue-400" :to="localePath('auth-login')">{{ $t("Retour à la connexion") }}</router-link>.
            </p>
        </div>
    </div>
</template>


<script>
    export default {
        data(){
            return {
                email : '',
            }
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
                this.$axios.post('/password/email', {
                    email : this.email
                }).then((response) => {
                    this.$message({
                        type:'success',
                        message : this.$i18n.t('Nous venons de vous envoyer en email avec un lien de réinitialisation de mot de passe !')
                    })

                    this.$router.push(this.localePath('auth-login'));
                });
            }
        }
    }
</script>
