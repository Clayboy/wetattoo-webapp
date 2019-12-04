<template>
    <div class="relative group border border-gray-700 rounded">
        <div ref="langswitcher" class="flex items-center justify-between p-1">
            <div>
                <!-- <inline-svg class="w-6" :name="current.flag" /> -->
            </div>
            <svg class="fill-current h-4 ml-1 text-gray-300" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20">
                <path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z"/>
            </svg>
        </div>
        <div class="items-center absolute right-0 p-1 bg-white p-2 invisible group-hover:visible w-32 shadow">
            <a v-for="lang in availableLocales"
                :href="`?lang=${lang.code}`"
                @click.prevent="setLocale(lang.code)"
                :key="lang.code">
                <!-- <inline-svg class="w-6 mr-2 flex-shrink-0" :name="lang.flag" /> -->
                <p>
                    {{ lang.label }}
                </p>
            </a>
        </div>
    </div>
</template>

<script type="text/javascript">

    import _ from 'lodash'
    import InlineSvg from '@/utilities/InlineSvg.js';
import { mapState } from 'vuex';

    const flags = {
        'fr' : require('@/assets/flags/fr.svg'),
        'en' : require('@/assets/flags/en.svg')
    }

    export default {
        components: {
            InlineSvg
        },

        computed: {
            availableLocales () {
                // console.log(this.$i18n.locales);
                return this.$i18n.locales
                    // .map(i => i.flag = flags[i.code])
            },
            current(){
                return this.availableLocales.find(i => i.code == this.locale)
            },
            
            ...mapState({
                locale : state => state.i18n.locale
            })
        },

        methods:{
            setLocale(lang){
                this.$i18n.setLocale(lang)
                this.$i18n.setLocaleCookie(lang)
                // loadAndSetLocale(lang)
                // this.$store.dispatch('i18n/setLocale', lang)
                // this.$store.dispatch('setLanguage', lang);
                this.$el.blur();
                this.$refs.langswitcher.blur();
            }
        }
    }
</script>
