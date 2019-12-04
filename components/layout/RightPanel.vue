<template>
    <div>
        <transition appear name="fade" mode="out-in" :duration="300">
            <div class="h-screen w-screen fixed z-50 top-0 left-0" style="background:rgba(0,0,0,.7)"  @click.prevent="close"></div>
        </transition>
        <transition appear name="slide" mode="out-in">
            <div class="fixed bg-white top-0 right-0 w-full md:w-1/2 lg:w-1/3 z-50 p-4 pb-16 sm:pb-4 h-screen overflow-y-auto shadow-lg flex flex-col">
                <header class="flex justify-between mb-6">
                    <h2 class="text-lg sm:text-2xl font-base">
                        <slot name="title"></slot>
                    </h2>

                    <button @click.prevent="close">
                        <font-awesome-icon :icon="['fal','times']" class="text-2xl sm:text-4xl text-gray-400"></font-awesome-icon>
                    </button>
                </header>
                <div class="flex-grow">
                    <slot name="body"></slot>
                </div>

                <footer class="flex items-center justify-end w-full">
                    <slot name="footer"></slot>
                </footer>
            </div>

        </transition>
    </div>
</template>


<script>
    export default {
        created(){

        },
        methods:{
            close(){
                this.$emit('close');
            }
        },

        created(){
            document.body.classList.add('overflow-hidden');
        },

        destroyed(){
            document.body.classList.remove('overflow-hidden');
        }
    }
</script>

<style lang="scss">
    .slide-enter-active {
        transition: all .3s ease;
    }
    .slide-leave-active {
        transition: all .8s cubic-bezier(1.0, 0.5, 0.8, 1.0);
    }
    .slide-enter, .slide-leave-to
        /* .slide-fade-leave-active below version 2.1.8 */ {
        transform: translateX(100%);
        // opacity: 0;
    }
</style>
