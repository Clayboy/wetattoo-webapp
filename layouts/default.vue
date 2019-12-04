
<template>

    <div id="app" class="flex flex-col full-page h-screen">
        <app-header></app-header>
        <main class="flex-grow mb-6 sm:mb-0" style="padding-top:56px;">
            <nuxt />
        </main>
        <app-footer></app-footer>
    </div>
</template>


<script>

import AppHeader from '../components/layout/Header';
import AppFooter from '../components/layout/Footer';

export default {
    components:{
        AppHeader,
        AppFooter,
    }
}

</script>