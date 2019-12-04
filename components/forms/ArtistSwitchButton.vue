<template>
        <button
            class="btn"
            v-text="active ? activeLabel : inactiveLabel"
            @click="toggle">
        </button>
</template>

<script>


    export default {
        props : {
            activeLabel:{
                type:String,
                required: true,
            },
            inactiveLabel:{
                type:String,
                required: true,
            },
            artistId:{
                type:Number,
                required:true,
            },
            property: {
                type: String,
                required: true,
            },
            value:{
                type:Boolean,
                required:false,
            },
            reverse : {
                type: Boolean,
                default:false,

            }
        },

        data(){
            return {
                active : this.value
            }
        },

        computed:{
            endpoint(){
                return `/artists/${this.artistId}/${this.property}`
            }
        },
        methods:{
            toggle(){
                let action = this.active ? 'put' : 'delete';

                if(this.reverse){
                    action = this.active ? 'delete' : 'put';
                }

                axios[action](this.endpoint)
                    .then((response) => {
                        this.$message({
                            message: 'Mise à jour effectuée',
                            type: 'success',
                            customClass: 'message-success'
                        })

                        this.active = !this.active

                        this.$emit('update', {
                            prop : this.property,
                            value : this.active
                        });
                    })
            }
        },
    }
</script>
