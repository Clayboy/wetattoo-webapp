<template>
    <div class="fixed top-0 left-0 w-screen h-screen flex items-center justify-center z-50" style="background-color:rgba(0,0,0,0.6)">
        <div class="bg-white rounded shadow-lg mx-5 sm:mx-0 md:w-1/2 lg:w-1/3 self-center p-4">
            <h2 class="text-xl text-center mb-6">
                {{ $t('Créez un compte et suivez les artistes') }}
            </h2>
            <p>
                {{ $t('Rejoignez gratuitement la communauté WE Tattoo :') }}
            </p>

            <ul class="mb-6 ml-8 list-disc">
                <li class="my-1">
                    {{ $t('Inspirez-vous en explorant le travail des tatoueurs.') }}
                </li>
                <li class="my-1">
                    {{ $t("Restez informés des actualités de vos tatoueurs préférés.") }}
                </li>
                <li class="my-1">
                    {{ $t('Contactez votre futur tatoueur et construisez votre projet.') }}
                </li>
                <li class="my-1">
                    {{ $t('Craquez pour un tattoo Flash !') }}
                </li>
            </ul>

            <p class="text-center mb-1">
                <router-link :to="{name:'register'}" class="btn btn-primary inline-block">
                    {{ $t('Créer un compte gratuit') }}
                </router-link>
            </p>
            <p class="text-center text-xs">
                {{ $t('Vous avez déjà un compte ?') }}

                <router-link :to="{name:'login'}" class="text-blue-500">
                    {{$t('Connexion')}}
                </router-link>.
            </p>
        </div>
    </div>
</template>
