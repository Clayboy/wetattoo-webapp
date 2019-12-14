<template>
    <div class="relative">
        <button class="open-button"  :class="btnClass" @click.prevent="toggle">
            <font-awesome-icon :icon="['far', 'ellipsis-v']" class="text-xl"></font-awesome-icon>
        </button>
        <div ref="dropdown" class="submenu absolute w-48 bg-white right-0 z-50 shadow-md rounded overflow-hidden border border-gray-300" v-show="open">
            <slot></slot>
        </div>
    </div>
</template>

<script>
    export default {
        props : {
            btnClass : {
                type : [String, Array],
                required:false,
                default(){
                    return ['btn', 'btn-small', 'btn-primary-outline']
                }
            }
        },
        data(){
            return {
                open: false,
            }
        },
        methods:{
            toggle(){
                this.open = !this.open
            },

            close(){
                this.open = false;
            },

            clickOutside(e){
                // close dropdown when clicked outside
                if (!this.$el.contains(e.target)){
                    this.close()
                } 

                if(this.$refs.dropdown.contains(e.target) && e.target.tagName == 'A'){
                    this.close();
                }
            }
        },

        mounted(){
            window.addEventListener('click', this.clickOutside)
        },

        beforeDestroy(){
            window.removeEventListener('click', this.clickOutside)
        }
    }
</script>

<style lang="scss" scoped>
    .submenu ul li a{
        @apply block px-3 py-2 leading-none;
    }

    button.open-button{
        @apply outline-none;
    }

    button.open-button:active{
        @apply outline-none;
    }

    .submenu ul li a:hover {
        @apply bg-gray-200;
    }
</style>