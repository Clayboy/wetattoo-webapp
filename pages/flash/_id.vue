<template>
    <div class="container mx-auto" style="max-width:50%;">
        <div class="heading flex items-center justify-between mb-4  p-4">
            <div class="flex items-center">
                <div class="rounded-full bg-gray-600 w-10 h-10 mr-2 flex-shrink-0 overflow-hidden">
                    <avatar :img="flash.artist.avatar_url" :size="10"></avatar>
                </div>
                <div>
                    <h3 class="text-xl font-medium leading-tight">
                        {{ flash.ref }}
                    </h3>
                    <div class="text-sm">
                        Par <nuxt-link class="text-blue-500" :to="{name : 'artists-slug', params : {slug : flash.artist.slug}}">{{ flash.artist.pseudo }}</nuxt-link> | Follow
                    </div>
                </div>
            </div>
            <div>
                <button @click.prevent="book(flash)" class="btn btn-primary-outline">
                    Book
                </button>
                <button class="btn btn-primary-outline">
                    <font-awesome-icon :icon="['fal', 'star']" class="mr-2"></font-awesome-icon>
                    Interested
                </button>
            </div>
        </div>

        <div class="bg-gray-600 w-full pb-4/5 relative p-0 overflow-hidden">
            <img :src="flash.media.url" v-if="flash.media" alt="" class="absolute w-full h-full top-0 object-cover blurred" />
            <img :src="flash.media.url" v-if="flash.media" alt="" class="absolute w-full h-full top-0 object-contain shadow" />
        </div>
        <p>
            blablabla blablabla blabl abla bla blabla blabla bla blablabla blabl abla  
            blablabla blablabla blabl abla bla blabla blabla bla blablabla blabl abla  
            blablabla blablabla blabl abla bla blabla blabla bla blablabla blabl abla  
            blablabla blablabla blabl abla bla blabla blabla bla blablabla blabl abla  
            blablabla blablabla blabl abla bla blabla blabla bla blablabla blabl abla  
            blablabla blablabla blabl abla bla blabla blabla bla blablabla blabl abla  
            blablabla blablabla blabl abla bla blabla blabla bla blablabla blabl abla  
            blablabla blablabla blabl abla bla blabla blabla bla blablabla blabl abla  
            blablabla blablabla blabl abla bla blabla blabla bla blablabla blabl abla  
            blablabla blablabla blabl abla bla blabla blabla bla blablabla blabl abla  
            blablabla blablabla blabl abla bla blabla blabla bla blablabla blabl abla  
            blablabla blablabla blabl abla bla blabla blabla bla blablabla blabl abla  
            blablabla blablabla blabl abla bla blabla blabla bla blablabla blabl abla  
            blablabla blablabla blabl abla bla blabla blabla bla blablabla blabl abla  
            blablabla blablabla blabl abla bla blabla blabla bla blablabla blabl abla  
            blablabla blablabla blabl abla bla blabla blabla bla blablabla blabl abla  
            blablabla blablabla blabl abla bla blabla blabla bla blablabla blabl abla  
            blablabla blablabla blabl abla bla blabla blabla bla blablabla blabl abla  
            blablabla blablabla blabl abla bla blabla blabla bla blablabla blabl abla  
        </p>
    </div>
</template>


<script>

export default {
    async asyncData({$axios, params}){
        let response = await $axios.get(`/flashes/${params.id}`)

        return {
            flash : response.data
        }
    },

    methods:{
        book(flash){
            this.$bus.$emit('bookflash', flash);
        }
    }
}

</script>

<style lang="scss">
    .blurred{
        /* Add the blur effect */
        filter: blur(10px);
        -webkit-filter: blur(10px);
    }
    
    .nav-button:active{
        @apply outline-none;
    }
    
    .nav-button:focus{
        @apply outline-none;
    }
</style>