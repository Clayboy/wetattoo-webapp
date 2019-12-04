<template>
        <button
            class="btn"
            v-text="active ? activeCta : inactiveCta"
            @click="toggle">
        </button>
</template>

<script>


    export default {
        props : {
            activeCta:{
                type:String,
                required: false,
                default(){
                    return this.$i18n.t("Fermer")
                },
            },
            inactiveCta:{
                type:String,
                required: false,
                 default(){
                    return this.$i18n.t("Ouvrir")
                },
            },
            artistId:{
                type:Number,
                required:true,
            },
            value:{
                type:Boolean,
                required:false,
            }
        },

        data(){
            return {
                active : this.value
            }
        },

        computed:{
            endpoint(){
                return `/artists/${this.artistId}/bookable`
            }
        },
        methods:{
            toggle(){
                let action = this.active ? 'delete' : 'put';

                axios[action](this.endpoint)
                    .then((response) => {

                        this.active = !this.active

                        this.$message({
                            message: this.active ? this.$i18n.t("Vos bookings sont ouverts") : this.$i18n.t("Vos bookings sont fermés"),
                            type: 'success',
                            customClass: 'message-success'
                        })

                        this.$store.dispatch('auth/setProfileProp', {
                            prop : 'bookable',
                            value : this.active
                        });

                        this.$emit('update', {
                            prop : 'bookable',
                            value : this.active
                        });
                    })
                    .catch((error) => {
                        console.dir(error);
                        this.$message({
                            type : 'error',
                            message : error.response.data.message,
                            duration : 1500
                        });
                    })
            },
        },

    }
</script>
