<template>
    <div v-if="displayable">
        <slot></slot>
    </div>
</template>

<script>

import inViewport from 'in-viewport';

export default {
    props:{
        elementHidden : {
            type: String,
            required:true,
        },
        reverse: {
            type:Boolean,
            default:false,
        }
    },

    data(){
        return {
            shouldDisplay: false,
        }
    },

    computed:{
        displayable(){
            if(this.reverse){
                return !this.shouldDisplay;
            }
            return this.shouldDisplay;
        }
    },

    mounted(){

        window.addEventListener('scroll', () => {
            this.shouldDisplay = ! inViewport(
                document.querySelector(this.elementHidden)
            );
        }, {passive : true})
    }
}
</script>
