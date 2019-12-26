<template>
    <div class="flex justify-center mx-auto items-center">
        <transition appear name="fade" mode="out-in" :duration="300">
            <div class="h-screen w-screen fixed top-0 left-0 justify-center flex items-start py-6 overflow-y-auto bg-overlay" style="z-index:100"  @click.prevent="$emit('close')">
                <button class="nav-button fixed right-0 top-0 text-gray-400 px-5 outline-none" @click.prevent="$emit('close')">
                    <font-awesome-icon :icon="['fal', 'times']" class="text-4xl"></font-awesome-icon>
                </button>
                <button class="nav-button fixed left-0 text-gray-400 px-5 outline-none" style="top: calc(50%)" @click.stop.prevent="$emit('prev')">
                    <font-awesome-icon :icon="['fal', 'chevron-left']" class="text-4xl"></font-awesome-icon>
                </button>
                <button class="nav-button fixed right-0 text-gray-400 px-5 outline-none" style="top: calc(50%)" @click.stop.prevent="$emit('next')">
                    <font-awesome-icon :icon="['fal', 'chevron-right']" class="text-4xl"></font-awesome-icon>
                </button>
                <div style="z-index:101;min-height:80%" class="bg-white w-full h-full sm:h-auto md:w-3/6 rounded overflow-hidden shadow-lg">
                    <slot></slot>
                </div>
            </div>
        </transition>
    </div>
</template>

<script>

export default {
    mounted(){
        document.body.classList.add('overflow-hidden');
    },

    destroyed(){
        document.body.classList.remove('overflow-hidden');
    },
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