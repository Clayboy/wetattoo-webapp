<template>
    <modal @close="close" @next="$emit('next')" @prev="$emit('prev')">
        <div class="heading flex items-center justify-between mb-4  p-4">
            <div class="flex items-center">
                <div class="rounded-full bg-gray-600 w-10 h-10 mr-2 overflow-hidden">
                    <avatar v-if="flashdata.artist" :img="flashdata.artist.avatar_url" :size="10"></avatar>
                </div>
                <div>
                    <h3 class="text-xl font-medium leading-tight">
                        {{ flashdata.ref }}
                    </h3>
                    <div class="text-sm">
                        Par <nuxt-link v-if="flashdata.artist" :to="{name : 'artists-slug', params:{slug : flashdata.artist.slug}}">{{ flashdata.artist.pseudo }}</nuxt-link> | Follow
                    </div>
                </div>
            </div>
            <div>
                <button @click.prevent="book(flashdata)" class="btn btn-primary-outline">
                    Book
                </button>

                <!-- <button class="btn btn-primary-outline">
                    <font-awesome-icon :icon="['fal', 'star']" class="mr-2"></font-awesome-icon>
                    Interested
                </button> -->
            </div>
        </div>

        <div class="bg-gray-600 w-full pb-4/5 relative p-0 overflow-hidden">
            <img :src="flashdata.media.url" v-if="flashdata.media" alt="" class="absolute w-full h-full top-0 object-cover blurred" />
            <img :src="flashdata.media.url" v-if="flashdata.media" alt="" class="absolute w-full h-full top-0 object-contain shadow" />
        </div>

        <div class="px-4 py-2">
            Taille : {{ flashdata.size_w }} x {{ flashdata.size_w }} cm
            {{ flashdata.resizeable ? `Le flash peut être agrandit` : `Taille non modifiable` }}
            {{ flashdata.view_count }}
        </div>
        <p>
            blah blah blah blah blah blah blah blah blah blah blah blah blah blah blah blah blah blah blah blah blah blah blah blah 
        </p>
    </modal>
</template>

<script>

import Modal from '@/components/layout/Modal';

export default {
    props : {
        flash : {
            type : Object,
            required: true
        }
    },

    data(){
        return {
            flashdata : this.flash
        }
    },
    watch:{
        flash(newVal){
            this.fetch(newVal);
        }
    },
    async created(){
        this.fetch(this.flash)
    },
    mounted(){
        document.body.classList.add('overflow-hidden');
    },

    destroyed(){
        document.body.classList.remove('overflow-hidden');
    },

    methods:{

        async fetch(flash){
            console.log(this.$router);
            let response = await this.$axios.get(`/flashes/${this.flash.id}`)
            this.flashdata = response.data.tattooFlash;
        },
        close(){
            this.$emit('close')
        },

        book(flash){
            this.$bus.$emit('bookflash', this.flashdata);
            this.close();
        }
    },

    components:{
        Modal
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