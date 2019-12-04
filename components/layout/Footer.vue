<template>
    <footer class="bg-gray-800 text-gray-500 pt-6">
        <div class="container mx-auto">
            <div class="md:flex justify-end">
                <!-- <div class="md:w-1/3 mb-6 px-10">
                    <h4 class="text-lg font-semibold mb-2 uppercase">Qui sommes nous ?</h4>
                    <ul>
                        <li>
                            <router-link to="/about/philosophy">Notre philosophie</router-link>
                        </li>
                        <li>
                            <router-link to="/about/team">L'equipe</router-link>
                        </li>
                        <li>
                            <router-link to="/about/contact">Contactez-nous</router-link>
                        </li>
                    </ul>
                </div> -->
                <div class="md:w-1/3 mb-6  px-10">
                    <h4 class="text-lg font-semibold mb-2 uppercase">
                        {{ $t("A propos") }}
                    </h4>
                    <ul>
                        <li v-for="(item, index) in about" :key="`about-${index}`">
                            <nuxt-link :to="item.route" v-text="item.label" />
                        </li>
                    </ul>
                </div>
                <div class="md:w-1/3 mb-6 px-10">
                    <h4 class="text-lg font-semibold mb-2 uppercase">Legal</h4>
                    <ul>
                        <li>
                            <nuxt-link :to="localePath('legal-terms')">Informations légales</nuxt-link>
                        </li>
                        <li>
                            <nuxt-link :to="localePath('legal-cgu')">Conditions générales d'utilisation</nuxt-link>
                        </li>
                    </ul>
                </div>
            </div>

            <div class="flex items-START justify-between text-xs border-t border-gray-700 pt-1 pb-2 px-2">
                <div>
                    Copyright &copy; 2019 We Tattoo
                    <br />
                    Made in France &bull; Tous droits réservés.
                </div>
                <ul class="flex flex-shrink-0 text-xl">
                    <li class="mr-3">
                        <a href="https://instagram.com/wetattooapp" class="">
                            <font-awesome-icon :icon="['fab', 'instagram']"></font-awesome-icon>
                        </a>
                    </li>
                    <li>
                        <a href="https://www.facebook.com/wetattooapp" class="">
                            <font-awesome-icon :icon="['fab', 'facebook']"></font-awesome-icon>
                        </a>
                    </li>
                </ul>
            </div>
        </div>
    </footer>
</template>


<script>
    import {mapState} from 'vuex';

    export default {
        computed:{

            ...mapState({
                locale : state => state.i18n.locale
            }),
            about(){
                return [
                    {
                        label : this.$i18n.t('Outils pour les tatoueurs'),
                        route : this.localePath('about-artists')
                    },
                    {
                        label : this.$i18n.t('Tarifs'),
                        route : this.localePath('about-pricing')
                    },
                ]
            }
        },
    }
</script>
