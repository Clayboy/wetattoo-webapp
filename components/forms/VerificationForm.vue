<template>
    <form  enctype="multipart/form-data" @submit.prevent="save">
        <div class="field mb-2">
            <label class="label mb-1 block" for="siret">
                N° SIRET
            </label>
            <div class="control">
                <input
                    type="text"
                    class="input"
                    :class="{'error' : verification.errors.has('siret')}"
                    name="siret"
                    v-model="verification.siret">
                <div class="error-msg" v-if="verification.errors.has('siret')" v-text="verification.errors.get('siret')" />
            </div>
        </div>
        <div class="field mb-2">
            <label class="label mb-1 block" for="certificate">
                Récépissé ARS ou formation hygiène (document PDF ou photo jpeg ou png)
            </label>
            <div class="control">
                <input
                    type="file"
                    class="input"
                    ref="uploader"
                    :class="{'error' : verification.errors.has('certificate')}"
                    name="certificate"
                    @change="handleUpload" />
                <div class="error-msg" v-if="verification.errors.has('certificate')" v-text="verification.errors.get('certificate')" />
            </div>
        </div>

        <slot name="buttons">
            <p class="text-center">
                <button class="btn btn-primary">
                    {{$t('Soumettre')}}
                </button>
            </p>
        </slot>
    </form>
</template>

<script>
    import { mapState } from 'vuex';

    export default {
        data(){
            return {
                verification : new Form({
                    siret : '',
                    certificate : '',
                }),
            }
        },

        computed: {
            ...mapState({
                artistId : state => state.auth.profile.id,
                profile : state => state.auth.profile
            })
        },

        created(){
            this.verification.siret = this.profile.siret;
            this.verification.certificate = this.profile.certificate;
        },

        methods : {
            handleUpload(){
                this.verification.certificate = this.$refs.uploader.files[0];
            },
            save(){
                this.verification.setMultipart();

                this.verification.post(`/artists/${this.artistId}/verification`)
                    .then((data) => {
                        this.$store.dispatch('auth/setProfileProp', {prop : 'siret', value : data.siret});
                        this.$store.dispatch('auth/setProfileProp', {prop : 'verified', value : data.verified});
                        this.$store.dispatch('auth/setProfileProp', {prop : 'verified_label', value : data.verified_label});
                        this.$store.dispatch('auth/setProfileProp', {prop : 'certificate_url', value : data.certificate_url});

                        this.$emit('submited');
                    })

            }
        }
    }
</script>
