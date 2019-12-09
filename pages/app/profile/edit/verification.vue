<template>
    <div>
        <h3 class="title-3">
            {{ $t("Vérification du compte") }}
        </h3>

        <div class="font-medium">
            {{ $t("Statut vérification") }}: <span v-t="profile.verified_label"></span> <span v-if="profile.verified_label == 'verification.valid'">{{ profile.verified_at }}</span>
        </div>

        <div class="my-3 border border-blue-400 rounded bg-blue-100 p-2 text-sm">
            <p class="mb-1">
                {{ $t("Nous avons l'ambition d'offrir un service de qualité aux membres de la communauté WE Tattoo.") }}
            </p>
            <p class="mb-1">
                {{ $t("Nous souhaitons donc nous assurer que les tatoueurs inscrits sur la plateforme sont des professionnels déclarés ayant suivi une formation aux conditions d'hygiène et de salubrité.") }}
            </p>
        </div>
        <verification-form></verification-form>
    </div>
</template>

<script>
    import { mapState } from 'vuex';

    import VerificationForm from '@/components/forms/VerificationForm'

    export default {
        computed: {
            ...mapState({
                artistId : state => state.auth.user.profile.id,
                profile : state => state.auth.user.profile
            })
        },

        created(){
            this.checkVerification();
        },

        methods : {
            checkVerification(){
                this.$axios.get(`/artists/${this.artistId}/verification`)
                    .then((response) => {
                        let user = JSON.parse(JSON.stringify(this.$store.state.auth.user));

                        user.profile.siret = response.data.siret;
                        user.profile.verified = response.data.verified;
                        user.profile.verified_label = response.data.verified_label;
                        user.profile.certificate_url = response.data.certificate_url;
                        this.$auth.$storage.setState('user', user);
                    })
            },
        },

        components: {
            VerificationForm
        }
    }
</script>
