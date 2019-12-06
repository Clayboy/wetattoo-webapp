<template>
    <section class="py-12 h-full">
        <div class="container mx-auto">
            <h3 class="text-xl sm:text-4xl text-indigo-800 mb-6  px-4 md:px-10 text-center">
                {{$t("Combien ça coute ?")}}
            </h3>
            <div class=" text-center">

                <p class="mb-4 text-lg" v-html="$t('Votre profil public avec portfolio, gestion des guests est (et sera toujours) <strong>totalement gratuit</strong>.')" />

                <p class="mb-4 text-lg">
                    {{ $t("WE Tattoo est encore en construction (bêta test).") }}<br />
                    <strong>{{ $t("Pendant toute cette période, l'ensemble des services est totalement gratuit!") }}</strong><br />
                    {{ $t("Vous êtes libre de donner ce que vous voulez si vous souhaitez soutenir le projet.") }}

                </p>

                <div class="my-8">
                    <link href="https://fonts.googleapis.com/css?family=Cookie" rel="stylesheet" />
                    <a class="bmc-button" target="_blank" href="https://www.buymeacoffee.com/wetattoo">
                        <img src="https://cdn.buymeacoffee.com/buttons/bmc-new-btn-logo.svg" alt="Buy me a coffee">
                        <span style="margin-left:15px;font-size:28px !important;">Buy me a coffee</span>
                    </a>
                </div>

                <p class="mb-4 text-lg">
                    {{ $t("Dans le but de fournir un outil de qualité et innovant sur une infrastructure performante, ") }}
                    <br />
                    {{ $t("nous proposerons des abonnements mensuels (ou annuels) adaptés à vos besoins.") }}
                    <br />
                    {{ $t("Nous vous tiendrons informés des tarifs bientôt.") }}
                </p>
                <p class="text-center mt-20">
                    <nuxt-link class="text-white bg-indigo-800 text-lg px-6 py-3 rounded shadow" :to="localePath({name : 'auth-register-type', params : {type : 'artist'}})">
                        {{ $t("Créez votre compte We Tattoo maintenant !") }}
                    </nuxt-link>
                </p>
            </div>
        </div>
    </section>
</template>
