<template>
    <div class="md:flex flex-col justify-center h-full">
        <div class="container justify-around mx-auto shadow bg-white py-6 md:py-20 md:px-10 w-full md:flex md:items-center">

            <div class="md:w-1/3">
                <img src="https://cdn.we-tattoo.com/assets/notfound.png" class="w-full" alt="">
            </div>
            <div class="md:w-2/3 text-gray-700 text-lg px-4">
                <p class="text-gray-200 text-6xl leading-none font-semibold">{{error.statusCode}} {{error.message}}</p>
                <p class="text-4xl mb-6">
                    {{ $t('Vous êtes égaré...') }}
                </p>
                <p class=" mb-6">{{ $t("... Mais c'est pas grave, on vous aide à retrouver votre chemin! Vous cherchez :") }}</p>

                <ul class="list-disc ml-10">
                    <li><nuxt-link class="text-blue-500" :to="localePath({name:'artists'})">{{ $t('Des artistes ?') }}</nuxt-link></li>
                    <li><nuxt-link class="text-blue-500" :to="localePath({name:'conventions'})">{{ $t('Des conventions ?') }}</nuxt-link></li>
                </ul>

            </div>
        </div>
    </div>

</template>

<script>
    export default {
        props: ['error'],
    }
</script>