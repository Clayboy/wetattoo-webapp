<template>
    <div v-if="active">
        <slot></slot>
    </div>
</template>


<script>
export default {
    props:{
        name : {
            type : String,
            required: true,
        },
        label : {
            type : String,
            required: false,

        },
        description : {
            type : String,
            required: false,
        },
        icon : {
            type : Array,
            required: false,
            default(){
                return []
            }
        },
        selected:{
            default : false,
        }
    },
    data () {
        return {
            active : false,
        }
    },

    mounted () {
        this.active = this.selected;
    }
}
</script>