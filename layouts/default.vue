
<template>

    <div id="app" class="flex flex-col full-page h-screen">
        <app-header></app-header>
        <main class="flex-grow mb-6 sm:mb-0" style="padding-top:56px;">
            <nuxt />
        </main>
        <app-footer></app-footer>
        <register-modal v-if="registerModal" @close="registerModal = false"></register-modal>

    </div>
</template>


<script>

import AppHeader from '../components/layout/Header';
import AppFooter from '../components/layout/Footer';

import RegisterModal from '@/components/layout/RegisterModal'

export default {
    components:{
        AppHeader,
        AppFooter,
        RegisterModal,
    },

    data(){
        return {
            registerModal : false
        }
    },

    created(){
        this.$bus.$on('register:invite', () => {
            this.showRegisterModal();
        })
    },

    watch : {
        $route(to, from){
            if(this.registerModal){
                this.registerModal = false;
            }
        }
    },

    methods : {
        showRegisterModal() {
            this.registerModal = true;
        }
    }
}

</script>