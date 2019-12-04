<template>
    <div class="mb-2">
        <label  v-if="label" class="block">
            {{ label }}
        </label>
        <input  type="text" :value="value" class="input" ref="places" />
    </div>
</template>


<script>

    import places from 'places.js';

    export default {
        props:{
            type:{
                type:String,
            },
            label:{
                type:String,
            },
            value:{
                type:String,
            }
        },
        data(){
            return {
                placesAutocomplete : null
            }
        },

        mounted(){
            this.initPlaces()
        },

        methods: {
            initPlaces(){

                this.placesAutocomplete = places({
                    container: this.$refs.places,
                    type: this.type,
                    templates: {
                        value : suggestion => suggestion.name
                    }
                })

                this.placesAutocomplete.on('change', e => {

                    this.$emit('input', {
                        city : e.suggestion.name,
                        country : e.suggestion.countryCode.toUpperCase(),
                    })
                });


                this.placesAutocomplete.on('clear', e => {
                    this.$emit('input', {})
                });
            },

        }
    }
</script>
