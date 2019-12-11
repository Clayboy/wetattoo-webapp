<template>
    <right-panel @close="close">
         <template v-slot:title>
            {{ guest.id !== undefined ? $t("Edition Guestspot") : $t("Nouveau Guestspot") }}
        </template>
        <template v-slot:body>
            <form @submit.prevent="save">
                    <div class="field mb-2 mr-6">
                        <label class="label mb-1 block" for="start_date">
                            {{ $t("Date de début") }}
                        </label>
                        <div class="control">
                            <el-date-picker
                                v-model="guestForm.start_date"
                                type="date"
                                :class="{'error' : guestForm.errors.has('start_date')}"
                                placeholder="Sélectionnez une date"
                                format="dd/MM/yyyy"
                                value-format="yyyy-MM-dd"></el-date-picker>
                            <div class="error-msg" v-if="guestForm.errors.has('start_date')" v-text="guestForm.errors.get('start_date')" />
                        </div>
                    </div>
                    <div class="field mb-2 mr-6">
                        <label class="label mb-1 block" for="end_date">
                            {{ $t("Date de fin") }}
                        </label>
                        <div class="control">
                            <el-date-picker
                                v-model="guestForm.end_date"
                                type="date"
                                :class="{'error' : guestForm.errors.has('end_date')}"
                                placeholder="Sélectionnez une date"
                                format="dd/MM/yyyy"
                                value-format="yyyy-MM-dd"></el-date-picker>
                            <div class="error-msg" v-if="guestForm.errors.has('end_date')" v-text="guestForm.errors.get('end_date')" />
                        </div>
                    </div>
                    <div class="field mb-2">
                        <label class="label mb-1 block">
                            {{ $t("Disponibilité") }}
                        </label>
                        <div class="control">
                            <el-switch
                                v-model="guestForm.bookable"
                                active-color="#434190"
                                active-text="Créneaux disponibles">
                            </el-switch>
                        </div>
                    </div>
                <div class="field mb-2">
                    <label class="label mb-1 block" for="parlor">
                        {{ $t('Salon') }}
                    </label>
                    <div class="control">
                        <input
                            type="text"
                            class="input"
                            :class="{'error' : guestForm.errors.has('parlor')}"
                            name="parlor"
                            v-model="guestForm.parlor">
                        <div class="error-msg" v-if="guestForm.errors.has('parlor')" v-text="guestForm.errors.get('parlor')" />
                    </div>
                </div>
                <div>
                    <place-selector :label="$t('Ville')" type="city" :value="guestForm.city" @input="updateCity($event, 'location')"></place-selector>
                    <div class="error-msg" v-if="guestForm.errors.has('city')" v-text="guestForm.errors.get('city')" />
                </div>
                <div>
                    <country-select :label="$t('Pays')" v-model="guestForm.country"></country-select>
                    <div class="error-msg" v-if="guestForm.errors.has('country')" v-text="guestForm.errors.get('country')" />
                </div>

                <div class="flex items-center justify-center mt-3">
                    <button class="text-gray-500 mr-3" @click="resetForm">{{ $t('Annuler') }}</button>
                    <button v-if="!guestForm.id" class="button">{{ $t('Créer') }}</button>
                    <button v-else class="button">{{ $t('Modifier') }}</button>
                </div>
            </form>
        </template>
    </right-panel>
</template>

<script>
    import Form from '@/utilities/Form';
    import CountrySelect from '@/components/forms/CountrySelect';
    import PlaceSelector from '@/components/forms/PlaceSelector';
    import RightPanel from '@/components/layout/RightPanel'

    export default {
        components:{
            CountrySelect,
            PlaceSelector,
            RightPanel
        },
        props:{
            artistId : {
                type:Number,
                required:true,
            },
            guest : {
                type:Object,
                required:false,
            }
        },
        data(){
            return {
                guestForm : new Form({
                    artist_id : this.artistId,
                    start_date: '',
                    end_date : '',
                    parlor : '',
                    city : '',
                    country : '',
                    bookable:true,
                })
            }
        },

        created(){

            if(this.guest.id != undefined){
                this.guestForm = new Form(this.guest);
            }
        },

        watch: {
            guest(val, oldval){
                if(val.id != undefined && val.id != oldval.id){
                    this.guestForm = new Form(val);
                }
            }
        },

        methods:{

            updateCity(payload){
                this.guestForm.city = payload.city;
                this.guestForm.country = payload.country;
            },

            save(){

                if(this.guestForm.id != undefined){
                    this.guestForm.put(`/guests/${this.guestForm.id}`)
                        .then((data) => {
                            this.$emit('updated', data.guest);

                            this.$message({
                                type : 'success',
                                message : this.$i18n.t('Le guest au salon "{parlor}" a été modifié',  {parlor : data.guest.parlor})
                            })

                            this.resetForm();
                        })
                }else{
                    this.guestForm.post('/guests')
                        .then((data) => {
                            this.$emit('created', data.guest);
                            this.resetForm();
                        })
                }
            },
            resetForm(){
                this.guestForm = new Form({
                    artist_id : this.artistId,
                    start_date: '',
                    end_date : '',
                    parlor : '',
                    city : '',
                    country : ''
                });
                this.close();
            },

            close(){
                this.$emit('close');
            }
        }
    }
</script>
