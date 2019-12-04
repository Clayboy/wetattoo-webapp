<template>
    <div class="relative group">
        <div class="sm:mr-3 flex items-center sm:px-2 py-2">
            <avatar :img="$auth.user.avatar_url" class="rounded overflow-hidden" :email="$auth.user.email" :size="8" />
            <span class="text-gray-300 ml-3">
                {{ $auth.user.name }}
            </span>
            <svg class="hidden sm:block fill-current h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20">
                <path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z"/>
            </svg>

        </div>
        <div class="user-menu group-hover:visible">
            <ul>
                <li v-for="(item, index) in authMenu" :key="`usertopmenu-${index}`" class="my-1">
                    <router-link class="user-menu-item" :to="item.route" v-text="item.label" />
                </li>
            </ul>
            <hr class="hidden sm:block border-t mx-2 border-gray-200" />
            <a href="#" @click="$auth.logout()"  class="user-menu-item"  v-text="$i18n.t('Déconnexion')" />
        </div>
    </div>
</template>


<script>
import { mapGetters, mapState } from 'vuex';
export default {
    computed:{
        authMenu(){
            return [
                {label : this.$i18n.t('Accueil'), route : {name : 'home'}},
                // {label : this.$i18n.t('Profil'), route : {name : 'profile.general'}},
                {label : this.$i18n.t('Préférences'), route : {name : 'settings.account'}},
            ]
        },
    },
}
</script>


<style lang="scss" scoped>
    .user-menu{
        @apply p-1 p-2 w-full shadow;

        @screen sm {
            @apply absolute w-48 bg-white right-0 invisible
        }
    }

    .user-menu-item{
        @apply py-1 block text-gray-300 font-normal uppercase;

        @screen sm {
            @apply px-4  py-2 text-black capitalize;
        }
    }
    .user-menu-item:hover{
        @screen sm {
            @apply bg-gray-200;
        }
    }
</style>
