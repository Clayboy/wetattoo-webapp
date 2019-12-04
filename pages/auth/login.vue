<template>
    <div class="auth-body">
        <div class="auth-splash" :style="`background-image:url('${splashImage}')`">
        </div>

        <div class="auth-form">
            <h1 class="mb-3 text-center font-light text-2xl md:text-4xl">
                    {{ $t('Connexion') }}
            </h1>

            <login-form @logged="redirectAfterLogin"></login-form>
            <div class="text-center mt-10">
                <p class="text-grey-600 text-sm">
                    <p class="text-grey-600 text-sm">{{ $t("Vous n'avez pas de compte ?")}}
                        <nuxt-link class="no-underline text-blue-400 font-bold" to="/register">{{ $t("Créer un compte") }}</nuxt-link>.
                    </p>
                </p>
            </div>
        </div>
    </div>
</template>

<script>
import LoginForm from '~/components/forms/LoginForm'

export default {
    components : {
        LoginForm,
    },
    methods:{
        redirectAfterLogin(){
            // On redirige sur Home
            this.$router.push('/app/home');
        }
    },

    computed:{
        splashImage(){
            let index = Math.floor(Math.random() * 3) + 1;
            let type = Math.round(Math.random()) == 0 ? 'artist' : 'member';

            return `https://cdn.we-tattoo.com/assets/splashs/splash_${type}_${index}.jpg`;
        }
    }
}
</script>


<style lang="scss">
    .auth-splash{
        background-image:url('/images/owl-1281791_640.jpg');
    }

</style>

