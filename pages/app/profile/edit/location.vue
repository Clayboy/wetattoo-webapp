<template>
<div>
    <form @submit.prevent="saveAddress">
        <h3 class="title-3 flex items-center" v-if="address">
            Localisation
        </h3>
        <address-form v-if="address" :prefill="address" v-model="address"></address-form>
        <div class="flex justify-center mt-6">
            <button class="button">
                Enregistrer
            </button>
        </div>
    </form>
</div>
</template>


<script>

import Form from '@/utilities/Form'
import AddressForm from '@/components/forms/AddressForm';
import { mapGetters, mapState } from 'vuex';

export default {
    data(){
        return {
            endpoint : '',
            userid : this.$store.state.auth.user.id,
            avatar : this.$store.state.auth.user.avatar_url,
            email : this.$store.state.auth.user.email,
            hasAddress : false,
            published : false,
            address: false,
            profile: false,
        }
    },

    computed: {
        ...mapState({
            usertype : state => state.auth.user.profile_type
        }),
    },

    created(){

        this.endpoint = `/profiles/${this.usertype}/${this.$store.state.auth.user.profile_id}`;

        this.$axios.get(this.endpoint)
            .then(({data}) => {
                this.hasAddress = data.address != undefined;
                this.published = data.published;

                if(this.hasAddress){
                    this.address =  new Form(data.address);
                    delete data.address;
                }else{
                    this.address = new Form({
                        name : '',
                        name_more : '',
                        postcode : '',
                        city : '',
                        administrative : '',
                        country_code : '',
                        country : '',
                        lat:'',
                        lng:'',
                    })
                }

                this.profile =  new Form(data);
            });
    },
    methods : {
        saveAddress(){
            let promise = '';
            if(!this.hasAddress){
                promise = this.address.post(`/addresses`)

            }else{
                promise = this.address.put(`/addresses/${this.address.id}`)

            }

            promise.then(({data, status}) => {
                if(status == 201){
                    this.hasAddress = true;
                }

                this.$message({
                    message: 'Votre adresse mise à jour!',
                    type: 'success',
                    customClass: 'bg-teal-100 border-0 border-t-4 border-teal-500 rounded-none rounded-b text-teal-900 px-4 py-3 shadow-md'
                })
            }).catch(() => {
                this.$message({
                    message: 'Problème lors de la mise à jour de votre adresse',
                    type: 'warning',
                })
            })
        }
    },

    components : {
        // 'el-option' : Option,
        // 'el-select' : Select,
        AddressForm
    }
}
</script>
