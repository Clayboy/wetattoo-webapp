<template>
    <div>

        <div class="bg-cover bg-no-repeat flex shadow-md" style="background-image:url(http://wetattoo.test/images/owl-1281791_640.jpg)">
            <div class="my-6 mx-4 md:mx-10 rounded w-full md:w-1/2 p-6" style="background:rgba(255,255,255,0.85)">
                <h1 class="text-xl md:text-2xl text-light leading-none mb-0 text-gray-500">
                    {{ $t('We Tattoo pour les tatoueurs') }}
                </h1>
                <h2 class="text-2xl md:text-4xl text-light leading-none mb-2">
                    {{ $t("Créez et tatouez, on s'occupe du reste!") }}
                </h2>

                <ul class="text-xl mb-10">
                    <li>{{ $t('Diffusez gratuitement votre art') }} <span class="block text-sm md:text-base text-gray-600 mb-3">{{ $t("Profil public, portfolio, catalogue de flashs") }}</span></li>
                    <li>{{ $t('Un seul outil pour centraliser votre activité')}} <span class="block text-sm md:text-base text-gray-600 mb-3">{{ $t("Projets, RDV, Arrhes, Agenda et déplacements") }}</span></li>
                    <li>{{ $t('Optimisez votre communication') }}<span class="block text-sm md:text-base text-gray-600 mb-3">{{ $t("Créneaux dispos, Ouverture des résas, Notifications abonnés") }}</span></li>
                </ul>
                <p class="text-center">
                    <nuxt-link class="button" :to="localePath({name : 'auth-register-type', params : {type : 'artist'}})">
                        {{ $t("Créez votre compte We Tattoo") }}
                    </nuxt-link>
                </p>
            </div>
        </div>

        <section class="py-10">
            <div class="container mx-auto">
                <h3 class="text-xl sm:text-4xl text-indigo-800 mb-6  px-4 md:px-10 text-center">{{ $t('Votre page artiste dédiée' )}}</h3>
                <div class="md:flex md:items-start">
                    <div class="md:w-1/2 md:order-last">
                        <img src="https://cdn.we-tattoo.com/assets/screens/profile_page.png" />
                    </div>
                    <div class="md:w-1/2 px-4 md:px-10">
                        <p class="mb-3">
                            {{ $t('Votre profil public avec toutes les infos utiles pour simplifier la mise en relation avec vos clients :')}}
                        </p>
                        <ul class="list-disc ml-5 py-3">
                            <li>{{ $t("Bio, styles de tattoo, localisation") }}</li>
                            <li>{{ $t("Le salon où vous tatouez, vos guests et conventions") }}</li>
                            <li>{{ $t("Votre portfolio s'alimente automatiquement avec votre compte Instagram") }}.</li>
                            <!-- <li>{{ $t("Ajoutez vos flashs disponibles, vos abonnés seront notifiés") }}.   </li> -->
                            <li>{{ $t("Indiquez vos créneaux disponibles") }} <span class="text-green-600 text-sm font-medium" v-text="$t('bientôt disponible')" /></li>
                            <li>{{ $t("Ouvrez les réservations grâce au formulaire sur mesure") }}</li>
                        </ul>
                        <p class="mb-3">
                            {{ $t("Personalisez l'adresse de votre profil public et diffusez-la sur les réseaux sociaux.")}}
                        </p>
                    </div>
                </div>
            </div>
        </section>

        <section class="bg-white py-10">
            <div class="container mx-auto">
                <h3 class="text-xl sm:text-4xl text-indigo-800 mb-6 px-4 md:px-10 text-center">
                    {{ $t('Tous vos projets au même endroit') }}
                </h3>
                <div class="md:flex md:items-start">
                    <div class="md:w-1/2">
                        <img src="https://cdn.we-tattoo.com/assets/screens/booking_page.png" />
                    </div>
                    <div class="md:w-1/2 px-4 md:px-10">

                        <p class="mb-3">
                            {{ $t("Ajoutez vos projets tattoo et / ou recevez des demandes depuis votre page publique :") }}
                        </p>
                        <ul class="list-disc ml-5 py-3">
                            <li>{{ $t("Un formulaire précis avec les informations essentielles.") }}</li>
                            <li>{{ $t("Acceptez ou refusez les demandes reçues en 1 clic.") }}</li>
                            <li>{{ $t("Un premier échange facilité avec vos clients : messages & images.") }}</li>
                            <li>{{ $t("Définissez le montant, les arrhes, le nombre de séances pour le projet.") }} <span class="text-green-600 text-sm font-medium" v-text="$t('bientôt disponible')" /></li>
                            <li>{{ $t("Trouvez un créneau et planifiez les séances, votre client sera notifié avant les RDV.") }} </li>
                            <li>{{ $t("Recevez les arrhes ou le paiement total par Paypal/Stripe.") }} <span class="text-green-600 text-sm font-medium"  v-text="$t('bientôt disponible')" /></li>
                        </ul>
                        <p class="mb-3">
                            {{ $t("Fini les boites email saturées, les contacts sur les différents réseaux sociaux : Gérez tous vos projets au même endroit.") }}
                        </p>
                        <p class="mb-3">
                            {{ $t("Construit avec des professionnels, le formulaire de réservation vous permet de recevoir des demandes précises (emplacement, taille, budget, pièces jointes...) et de gagner du temps dans les échanges avec vos clients.")}}
                        </p>
                        <p class="mb-3">
                            {{ $t("À chaque étape du projet, vous et votre client êtes notifiés pour améliorer l'expérience tattoo.")}}
                        </p>
                    </div>
                </div>
            </div>
        </section>

        <section  class="py-12 bg-home">
            <div class="container mx-auto md:flex">

                <div class="md:w-1/2 bg-white mx-4 my-2 shadow py-4 px-6">
                    <h3 class="text-xl mb-3">
                        {{$t('Espace membre pour les tatoué•e•s')}}
                    </h3>
                    <p class="mb-3">
                        {{$t("Les tatoués ou passionnés de tatouage ont aussi leur propre compte WE Tattoo où ils peuvent suivre l'actualité des tatoueurs et leurs demandes de tatouage.")}}
                    </p>
                    <p class="mb-3">
                        {{ $t("Ils sont notifiés de vos actions : guests, flashs, ouverture de réservations.") }}
                    </p>
                    <p class="mb-3">
                        {{$t("Les membres ont aussi la possibilité de créer des boards d'inspiration pour les aider à définir leur projet plus précisément.")}}
                    </p>
                </div>
                <div class="md:w-1/2 bg-white mx-4 my-2 shadow py-4 px-6">
                    <h3 class="text-xl mb-3">
                        {{ $t("WE Tattoo est adapté à tous les supports")}}
                    </h3>
                    <p class="mb-3">
                        {{ $t("Le service s'adapte à tous les formats d'écran pour que vous puissiez suivre vos projets partout où vous êtes :") }}
                    </p>
                    <ul class="ml-5 mb-3 list-disc">
                        <li>{{ $t("iPad quand vous créez.") }}</li>
                        <li>{{ $t("Téléphone quand vous bougez.") }}</li>
                        <li>{{ $t("Votre ordi à la maison ou au salon.") }}</li>
                    </ul>
                    <p class="mb-3">
                        {{$t("Dans les cartons : l'application sur Google Play & iOS!")}}
                    </p>
                </div>
            </div>
        </section>

        <section class="bg-white py-10">
            <div class="container mx-auto">
                <h3 class="text-xl sm:text-4xl text-indigo-800 mb-6  px-4 md:px-10 text-center">
                    {{$t("Optimisez votre agenda")}}
                </h3>
                <div class="md:flex md:items-start">
                    <div class="md:w-1/2 md:order-last">
                        <img src="https://cdn.we-tattoo.com/assets/screens/agenda_page.png" />
                    </div>
                    <div class="md:w-1/2 px-4 md:px-10">
                        <p class="mb-3">
                            {{$t("En déplacement ou à résidence, trouvez rapidement des créneaux disponibles pour vos clients.")}}
                        </p>
                        <ul class="list-disc ml-5 py-3">
                            <li>{{ $t("Un agenda adapté à vos horaires et déplacements")}}</li>
                            <li>{{ $t("Les séances sont liées à vos projets")}}</li>
                            <li>{{ $t("Vos clients sont notifiés la veille du Rendez-vous ou s'il est modifié")}}</li>
                            <!-- <li>{{ $t("Ouvrez les réservations uniquement pour vos créneaux disponibles")}}</li> -->
                            <li>{{ $t("Synchronisez votre agenda dans votre compte Google")}} <span class="text-green-600 text-sm font-medium" v-text="$t('bientôt disponible')" /></li>
                        </ul>
                    </div>
                </div>
            </div>
        </section>

        <section class="py-12 bg-home">
            <div  class="container mx-auto md:flex">
                <div class="md:w-1/2 bg-white mx-4 my-2 flex-grow-0 shadow py-4 px-6">
                    <h3 class="text-xl mb-3">
                        {{$t("Un service pour tous ...")}}
                    </h3>
                    <p class="mb-3">
                        {{ $t("Mon idée n'est pas simplement de créer un annuaire sans grande valeur ajoutée (ni pour les tatoueurs, ni pour le public), mais d'apporter un service complet à l'ensemble des acteurs du marché du tatouage :") }}
                    </p>
                    <p class="mb-3">
                        {{ $t("Guider les futurs tatoués dans leur quête du Graal.") }}
                    </p>
                    <p class="mb-3">
                        {{ $t("Apporter des outils pour simplifier la partie non-artistique de votre activité.") }}
                    </p>
                    <p class="mb-3">
                        {{ $t("Centraliser dans une même plateforme les outils nécessaire à la tenue d'un salon pour les managers.") }}
                    </p>
                </div>
                <div class="md:w-1/2 bg-white mx-4 my-2 shadow py-4 px-6">
                    <h3 class="text-xl mb-3">
                        {{ $t("... Imaginé par un passionné") }}
                    </h3>
                    <p class="mb-3">
                        {{ $t("Fort de 12 ans dans le web et mordu de tatouage, j'ai décidé de créer mon quotidien en combinant ces deux passions.") }}
                    </p>
                    <p class="mb-3">
                        {{ $t("La multiplication des réseaux sociaux permet de découvrir des artistes, mais  n'a pas facilité le moyen de trouver l'information juste ou la mise en contact avec les artistes.") }}
                    </p>
                    <p class="mb-3">
                        {{ $t("Toujours en quête de savoir et de découvertes, n'hésitez pas à me nourrir de votre expertise de la profession afin que nous construisions l'outil le plus efficace pour tous.") }}
                    </p>
                </div>
            </div>

        </section>

        <section class="bg-white py-12">
            <div class="container mx-auto">
                <h3 class="text-xl sm:text-4xl text-indigo-800 mb-6  px-4 md:px-10 text-center">
                    {{$t("Combien ça coute ?")}}
                </h3>
                <div class=" text-center">

                    <p class="mb-3 text-lg" v-html="$t('Votre profil public avec portfolio, gestion des guests est (et sera toujours) <strong>totalement gratuit</strong>.')" />

                    <p class="mb-3 text-lg">
                        {{ $t("WE Tattoo est encore en construction (bêta test).") }}<br />
                        <strong>
                          {{ $t("Pendant toute cette période, l'ensemble des services est totalement gratuit!") }}<br />
                        </strong>
                        {{ $t("Vous êtes libre de donner ce que vous voulez si vous souhaitez soutenir le projet.") }}

                    </p>

                    <div class="my-3">
                        <link href="https://fonts.googleapis.com/css?family=Cookie" rel="stylesheet" />
                        <a class="bmc-button" target="_blank" href="https://www.buymeacoffee.com/wetattoo">
                            <img src="https://cdn.buymeacoffee.com/buttons/bmc-new-btn-logo.svg" alt="Buy me a coffee">
                            <span style="margin-left:15px;font-size:28px !important;">Buy me a coffee</span>
                        </a>
                    </div>

                    <p class="mb-3 text-lg">
                        {{ $t("Dans le but de fournir un outil de qualité et innovant sur une infrastructure performante, ") }}
                        <br />
                        {{ $t("nous proposerons des abonnements mensuels (ou annuels) adaptés à vos besoins.") }}
                        <br />
                        {{ $t("Nous vous tiendrons informés des tarifs bientôt.") }}
                    </p>
                    <p class="text-center mt-20">
                        <nuxt-link class="text-white bg-indigo-800 text-lg px-6 py-3 rounded shadow inline-block mx-4" :to="localePath({name : 'auth-register-type', params : {type : 'artist'}})">
                            {{ $t("Créez votre compte We Tattoo maintenant !") }}
                        </nuxt-link>
                    </p>
                </div>
            </div>
        </section>
    </div>
</template>

<script>
export default {
    head() {
        let description = this.$i18n.t("Vous êtes tatoueur ? Voici l'outil qui simplifie votre activité et la relation avec les clients") + " " + this.$i18n.t("Gérez vos réservations, Rendez-vous et Ahrres") + " " + this.$i18n.t("Diffusez votre actu et déplacements");
        return {
            title : this.$i18n.t("L'outil qui simplifie l'activité des professionnels du tatouage."),
            meta: [
                { hid: 'description', name: 'description', content: description},
                { hid: 'keywords', name: 'keywords', content: "tattoo, tatouage, tattoo art, ink, body art, tattoos, crm, ink, inkspiration, bookings, online bookings, tattoo booking, réservation tatouage, tatouages" },
                { 'property': 'og:title', 'content': "WE Tattoo : " + this.$i18n.t("L'outil qui simplifie l'activité des professionnels du tatouage."), 'vmid': 'og:title'},
                { 'property': 'og:site_name', 'content': `WE Tattoo`, 'vmid': 'og:site_name'},
                { 'property': 'og:image', 'content': `https://cdn.we-tattoo.com/assets/wetattoo_logo.png`, 'vmid': 'og:image'},
                { 'property': 'og:description', 'content': description, 'vmid': 'og:description'}
            ]
        } 
    },
}
</script>