<template>
    <div>

        <div class="field mb-2">
            <label class="label mb-1 block" for="pseudo">
                <span v-if="type == 'address'">Adresse</span>
                <span v-if="type == 'city'">Ville</span>
            </label>
            <div class="control">
                <input
                    type="text"
                    class="input"
                    name="address-input"
                    id="address-input"
                    :class="{'error' : address.errors.has('name')}"
                    v-model="address.name">
            </div>
            <div class="error-msg" v-if="address.errors.has('name')" v-text="address.errors.get('name')" />
        </div>

        <div v-if="displayInputs">
            <div class="field mb-2">
                <div class="control">
                    <input
                        type="text"
                        class="input"
                        name="address-input"
                        v-model="address.name_more">
                </div>
            </div>

            <div class="md:flex">
                <div class="field mb-2 md:w-1/2 mr-3">
                    <label class="label mb-1 block" for="postcode">
                        Code postal
                    </label>
                    <div class="control">
                        <input
                            type="text"
                            class="input"
                            name="address[postcode]"
                            :class="{'error' : address.errors.has('postcode')}"
                            v-model="address.postcode">
                        <div class="error-msg" v-if="address.errors.has('postcode')" v-text="address.errors.get('postcode')" />

                    </div>
                </div>
                <div class="field mb-2 md:w-1/2">
                    <label class="label mb-1 block" for="city">
                        Ville
                    </label>
                    <div class="control">
                        <input
                            type="text"
                            class="input"
                            name="address[city]"
                            :class="{'error' : address.errors.has('city')}"
                            v-model="address.city">
                        <div class="error-msg" v-if="address.errors.has('city')" v-text="address.errors.get('city')" />
                    </div>
                </div>
            </div>
            <div class="md:flex">
                <div class="field mb-2 mr-3 md:w-1/2">
                    <label class="label mb-1 block" for="administrative">
                        Etat
                    </label>
                    <div class="control">
                        <input
                            type="text"
                            class="input"
                            name="address[administrative]"
                            v-model="address.administrative">
                    </div>
                </div>
                <div class="field mb-2 md:w-1/2">
                    <label class="label mb-1 block" for="country">
                        Pays
                    </label>
                    <div class="control">
                        <input
                            type="text"
                            class="input"
                            name="address[country]"
                            :class="{'error' : address.errors.has('country')}"
                            v-model="address.country">
                        <div class="error-msg" v-if="address.errors.has('country')" v-text="address.errors.get('country')" />
                    </div>
                </div>

            </div>
        </div>
        <input type="hidden" name="address[lat]" :value="address.lat">
        <input type="hidden" name="address[lng]" :value="address.lng">
        <input type="hidden" name="address[countryCode]" :value="address.country_code">
    </div>
</template>

<script>
    import places from 'places.js';
    import _ from 'lodash';

    export default{
        props:{
            prefill : {
                type : Object,
                required : false,
                default(){
                    return new Form({
                        name : '',
                        name_more : '',
                        postcode : '',
                        city : '',
                        administrative : '',
                        country_code : '',
                        country : '',
                        lat: '',
                        lng: '',
                    })
                }
            },
            type : {
                type:String,
                required:false,
                default:'address',
            },
            displayInputs : {
                type:Boolean,
                required:false,
                default:true,
            }
        },
        data(){
            return {
                placesAutocomplete : '',
                address : this.prefill
            }
        },

        computed : {
            lat(){
                if(this.address.latlng != undefined){
                    return this.address.latlng.lat;
                }
                return false;
            },
            lng(){

                if(this.address.latlng != undefined){
                    return this.address.latlng.lng;
                }
                return false;
            },
            countryCode(){

                return this.address.countryCode;
            }
        },

        methods:{
            resetAddress(){
                this.address = new Form({
                        name : '',
                        name_more : '',
                        postcode : '',
                        city : '',
                        administrative : '',
                        country_code : '',
                        country : '',
                        lat: '',
                        lng: '',
                    });
            }
        },

        mounted(){

            // if(this.prefill != null){
            //     this.address = this.prefill;
            // }

            this.placesAutocomplete = places({
                container: document.querySelector('#address-input'),
                type: this.type,
                templates: {
                    value : suggestion => suggestion.name
                }
            })

            this.placesAutocomplete.on('change', e => {

                this.address.setData(_.pick(e.suggestion, ['name', 'nameMore', 'city', 'administrative', 'latlng', 'country','postcode']));

                this.address.country_code = e.suggestion.countryCode;
                if(this.type == 'city'){
                    this.address.city = e.suggestion.name;
                }

                this.address.lat = e.suggestion.latlng.lat;
                this.address.lng = e.suggestion.latlng.lng;

                this.$emit('input', this.address);
            });

            this.placesAutocomplete.on('clear', e => this.resetAddress());
        },

    }

</script>
