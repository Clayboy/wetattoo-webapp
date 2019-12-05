<template>
    <div class="auth-body">
        <div class="auth-splash" :style="`background-image:url('${splashImage}')`">
            <div class="block p-5 sm:p-10 text-base lg:text-lg rounded sm:rounded-r-none lg:w-3/5" style="background-color:rgba(255,255,255,0.85)">
                <template v-if="type == 'artist'">
                    <h1 class="text-xl md:text-2xl mb-4 lg:mb-6">
                        {{ $t('Des outils simples pour gérer votre activité') }}
                        <br />
                        {{ $t('et vous concentrer sur votre art') }}
                    </h1>
                    <ul class="my-4 ml-5 list-disc">
                        <li class="mb-1" v-html="$t('artist.arg_1')"></li>
                        <li class="mb-1" v-html="$t('artist.arg_2')"></li>
                        <li class="mb-1" v-html="$t('artist.arg_3')"></li>
                        <li class="mb-1" v-html="$t('artist.arg_4')"></li>
                    </ul>
                </template>
                <template v-else>
                    <h1 class="text-xl md:text-2xl mb-6">{{ $t('Votre prochain tatouage commence ici !') }}</h1>
                    <ul class="my-4 ml-5 list-disc">
                        <li class="mb-1" v-html="$t('member.arg_1')"></li>
                        <li class="mb-1" v-html="$t('member.arg_2')"></li>
                        <li class="mb-1" v-html="$t('member.arg_3')"></li>
                        <li class="mb-1" v-html="$t('member.arg_4')"></li>
                    </ul>
                </template>
            </div>
        </div>

        <div class="auth-form">
            <nuxt-link v-if="type == 'member'" class="text-blue-500 absolute right-0 top-0 px-4 pt-2" :to="localePath({name: 'auth-register-type', params : { type : 'artist'}})">
                {{ $t("Vous êtes tatoueur ? C'est par ici >") }}
            </nuxt-link>

            <h1 class="mb-3 text-center font-light text-2xl md:text-4xl">
                {{ type == 'artist' ? $t("Créer un compte tatoueur") : $t('Créer un compte membre') }}
            </h1>

            <register-form :type="type" @registered="redirect"></register-form>

            <div class="text-center mt-10">
                <p class="text-grey-600 text-sm">
                    {{ $t('Vous avez déjà un compte ?') }}
                    <nuxt-link class="no-underline text-blue-400 font-bold" :to="localePath('auth-login')">
                        {{ $t('Connexion') }}
                    </nuxt-link>.
                </p>
            </div>
        </div>
    </div>
</template>

<script>
    import RegisterForm from '@/components/forms/RegisterForm'

    export default {
        components:{
            RegisterForm,
        },

        data(){
            return {
                type : this.$route.params.type ? this.$route.params.type : 'member'
            }
        },

        computed: {
            splashImage(){
                let index = Math.floor(Math.random() * 3) + 1;
                return `https://cdn.we-tattoo.com/assets/splashs/splash_${this.type}_${index}.jpg`;
            }
        },
        methods: {
            redirect() {
                this.$router.push({name : 'app-home'});
            }
        }
    }
</script>


<style lang="scss">
    .splash{
        background-position: top right;
        background-repeat: no-repeat;
        background-size: cover;
    }

    .splash-artist{
        background-image:url('/images/owl-1281791_640.jpg');
    }

    .splash-member{
        background-image:url('/images/arm-art-colors-2183131.jpg');
    }
</style>
