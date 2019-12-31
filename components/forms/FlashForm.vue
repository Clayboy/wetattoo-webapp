<template>
    <right-panel @close="close">
         <template v-slot:title>
            {{ flash !== null ? $t("Edition Flash") : $t("Nouveau Tattoo Flash") }}
        </template>
        <template v-slot:body>
            <form @submit.prevent="save">
                <div v-if="!flash" class="mb-3">
                    <img :src="filePreview" v-if="filePreview" alt="">

                    <div v-show="!filePreview" class="flex items-stretch justify-center">
                        <div class="relative w-1/2 mr-2">
                            <button class="w-full btn btn-primary-outline" @click.prevent>
                                <font-awesome-icon :icon="['fal', 'camera-retro']" class="text-lg"></font-awesome-icon>
                                <br />
                                Upload file
                            </button>
                            <input type="file"
                                ref="fileupload"
                                accept="image/*"
                                @change="updateFile"
                                class="absolute opacity-0 cursor-pointer w-24 w-full h-full inset-x-0 bottom-0 top-0"  />
                        </div>
                        <!-- <div class="relative w-1/2">
                            <button class="btn btn-primary-outline w-full" @click.prevent>
                                <font-awesome-icon :icon="['fal', 'image-polaroid']" class="text-lg"></font-awesome-icon>
                                <br />
                                Image du portfolio
                            </button>
                        </div> -->

                    </div>
                </div>
                <div class="mb-3" v-else>
                    <img :src="flash.media.url" />
                </div>
                <div class="field mb-2">
                    <label class="label mb-1 block" for="ref">
                        Ref.
                    </label>
                    <div class="control">
                        <input
                            type="text"
                            class="input"
                            :class="{'error' : form.errors.has('ref')}"
                            name="ref"
                            v-model="form.ref">
                        <div class="error-msg" v-if="form.errors.has('ref')" v-text="form.errors.get('ref')" />
                    </div>
                </div>
                <div class="field mb-2">
                    <label class="label mb-1 block" for="size_w">
                        Taille
                    </label>
                    <div class="control flex items-center">
                        <div class="flex items-center">
                            <input
                                type="number"
                                class="input"
                                :class="{'error' : form.errors.has('size_w')}"
                                name="size_w"
                                v-model="form.size_w">
                                <p class="ml-1">cm</p>
                        </div>
                        <div class="mx-2">X</div>
                        <div class="flex items-center">
                            <input
                                type="number"
                                class="input"
                                :class="{'error' : form.errors.has('size_h')}"
                                name="size_h"
                                v-model="form.size_h">
                            <p class="ml-1">cm</p>
                        </div>
                    </div>
                    <div class="error-msg" v-if="form.errors.has('size_w')" v-text="form.errors.get('size_w')" />
                    <div class="error-msg" v-if="form.errors.has('size_h')" v-text="form.errors.get('size_h')" />
                </div>
                <div class="field mb-2">
                    <label class="label mb-1 block flex items-center" for="expandable">
                        <input
                            type="checkbox"
                            class="mr-2"
                            id="expandable"
                            :class="{'error' : form.errors.has('expandable')}"
                            name="alterable"
                            v-model="form.expandable">
                        {{ $t('Le design peut être agrandi') }}
                    </label>
                </div>
                <div class="field mb-2">
                    <label class="label mb-1 block flex items-center" for="alterable">
                        <input
                            type="checkbox"
                            class="mr-2"
                            id="alterable"
                            :class="{'error' : form.errors.has('alterable')}"
                            name="alterable"
                            v-model="form.alterable">
                        {{ $t('Le design peut être modifié') }}
                    </label>
                </div>
                <div class="field mb-2">
                    <label class="label mb-1 block" for="price">
                        Prix de base
                    </label>
                        <div class="control flex items-stretch">
                        <input
                            type="text"
                            class="input mr-2 flex-grow"
                            :class="{'error' : form.errors.has('price')}"
                            name="price"
                            v-model="form.price">
                        <select
                            type="text"
                            class="input"
                            :class="{'error' : form.errors.has('currency')}"
                            name="price"
                            v-model="form.currency">
                            <option value="EUR">EUR</option>
                            <option value="USD">USD</option>
                            <option value="GBP">GBP</option>
                        </select>
                        <div class="error-msg" v-if="form.errors.has('price')" v-text="form.errors.get('price')" />
                    </div>
                </div>
                <div class="field mb-2">
                    <label class="label mb-1 block" for="duration">
                        Durée estimée
                    </label>
                    <div class="control flex items-stretch">
                        <input
                            type="number"
                            class="input mr-2"  
                            :class="{'error' : form.errors.has('duration')}"
                            name="duration"
                            v-model="duration_hours">
                        <p class="mr-2">h</p>
                        <select
                            type="text"
                            class="input mr-2"
                            :class="{'error' : form.errors.has('duration')}"
                            name="duration"
                            v-model="duration_minutes">
                            <option v-for="n in [0, 10, 20, 30, 40, 50]" :value="n" v-text="n" :key="`mn-${n}`" />
                        </select>
                        <p>mn</p>
                        <div class="error-msg" v-if="form.errors.has('duration')" v-text="form.errors.get('duration')" />
                    </div>
                </div>
                <div class="field mb-2">
                    <label class="label mb-1 block" for="zone">
                        {{ $t("Emplacement(s) conseillé(s)") }}
                    </label>
                    <div class="control">
                        <el-select
                            :class="{'error' : form.errors.has('best_location')}"
                            multiple
                            class="w-full"
                            :placeholder="$t('Choisissez parmi les zones du corps')"
                            name="zone"
                            v-model="form.best_location">
                            <el-option v-for="zone in tattooZones"
                                :lable="zone.label"
                                :value="zone.name"
                                :key="zone.name" />
                        </el-select>
                        <div class="error-msg" v-if="form.errors.has('best_location')" v-text="form.errors.get('best_location')" />
                    </div>
                </div>
                <div class="flex items-center justify-center mt-3">
                    <button class="text-gray-500 mr-3" @click="resetForm">{{ $t('Annuler') }}</button>
                    <button v-if="!form.id" class="button">{{ $t('Créer') }}</button>
                    <button v-else class="button">{{ $t('Modifier') }}</button>
                </div>
            </form>
        </template>
    </right-panel>
</template>

<script>
    import Form from '@/utilities/Form';
    import RightPanel from '@/components/layout/RightPanel'
    import {Select, Option} from 'element-ui'
    export default {
        components:{
            RightPanel,
            'el-select' : Select,
            'el-option' : Option
        },
        props:{
            flash : {
                type:Object,
                required:false,
            }
        },
        data(){
            return {
                form : new Form({
                    artist_id   : this.$auth.user.profile_id,
                    media_id    : 0,
                    file        : '',
                    ref         : '',
                    size_w      : '',
                    size_h      : '',
                    expandable  : true,
                    alterable   : false,
                    price       : 0,
                    currency    : 'EUR',
                    duration    : 60,
                    best_location  : [],
                }),
                tattooZones : this.$root.context.app.global.tattooZones,
                filePreview : '',
                // duration : {
                //     hours : 1,
                //     minutes : 0,
                // }
            }
        },

        created(){
            if(this.flash != undefined && this.flash.id != undefined){
                this.form = new Form({
                    id : this.flash.id,
                    artist_id   : this.flash.artist_id,
                    media_id    : this.flash.media_id,
                    ref         : this.flash.ref,
                    size_w      : this.flash.size_w,
                    size_h      : this.flash.size_h,
                    expandable  : this.flash.expandable,
                    alterable   : this.flash.alterable,
                    price       : this.flash.price,
                    currency    : this.flash.currency,
                    duration    : this.flash.duration,
                    best_location  : this.flash.best_location
                });
            }else{
                this.form.setMultipart();
            }
        },

        computed : {
            duration_hours: {
                get(){
                    return Math.floor(this.form.duration / 60);
                    
                    return {
                        hours : hours,
                        minutes : minutes,
                    }
                },
                set(newVal){
                    let value = newVal == '' ? 0 : parseInt(newVal, 10);

                    this.form.duration = value * 60 + parseInt(this.duration_minutes, 10);
                }
            },
            duration_minutes: {
                get(){
                    return this.form.duration % 60;
                },
                set(newVal){
                    let value = isNaN(newVal) ? 0 : parseInt(newVal, 10);
                    this.form.duration = parseInt(this.duration_hours, 10) * 60 + parseInt(value, 10);
                }
            },
        },
        methods:{

            updateFile(e){

                this.form.file = this.$refs.fileupload.files[0];

                const files = e.target.files || e.dataTransfer.files
                if (!files.length) return

                let reader  = new FileReader();
                reader.readAsDataURL(e.target.files[0]);

                reader.onload = e => {
                    this.filePreview = e.target.result;
                    // this.cropShow = true;
                }
            },
            save(){

                if(this.form.id != undefined){
                    this.form.patch(`/flashes/${this.flash.id}`)
                        .then((data) => {
                            this.$emit('updated', data.flash);

                            this.$message({
                                type : 'success',
                                message : this.$i18n.t('Le flash a été modifié')
                            })

                            this.resetForm();
                        })
                }else{
                    this.form.post('/flashes')
                        .then((data) => {
                            this.$emit('created', data.flash);
                            this.resetForm();
                        })
                }
            },
            resetForm(){
                this.form = new Form({
                    id : null,
                    artist_id   : this.$auth.user.profile_id,
                    media_id    : 0,
                    ref         : '',
                    size_w      : '',
                    size_h      : '',
                    expandable  : false,
                    alterable   : false,
                    price       : 0,
                    currency    : 'EUR',
                    duration    : 1,
                    best_location  : [],
                });

                this.close();
            },

            close(){
                this.$emit('close');
            }
        }
    }
</script>
