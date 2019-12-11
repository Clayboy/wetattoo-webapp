<template>
    <div class="z-20 onboarding bg-white shadow mb-4 rounded overflow-hidden">
        <el-steps :active="step"  direction="vertical" class="shadow bg-white rounded-b-none" simple>
            <el-step title="" icon="icon">
                <template v-slot:icon>
                    <font-awesome-icon :icon="['fal', 'user-check']" class="text-2xl"></font-awesome-icon>
                </template>
                <template v-slot:title="title">
                    <span class="hidden sm:block">{{ $t("Vérification") }}</span>
                </template>
            </el-step>
            <el-step title="" icon="icon">
                <template v-slot:icon>
                    <font-awesome-icon :icon="['fal', 'address-card']" class="text-2xl"></font-awesome-icon>
                </template>
                 <template v-slot:title="title">
                    <span class="hidden sm:block">{{ $t("Profil") }}</span>
                </template>
            </el-step>
            <el-step title="Travaillez" icon="icon">
                <template v-slot:icon>
                    <font-awesome-icon :icon="['fal', 'rocket']" class="text-2xl"></font-awesome-icon>
                </template>
                 <template v-slot:title="title">
                    <span class="hidden sm:block">{{ $t("Travaillez") }}</span>
                </template>
            </el-step>
        </el-steps>
        <div v-if="step == 0 " class="md:flex md:items-stretch">
            <div class="px-4 py-3 md:w-1/3 bg-indigo-800 text-white relative">
                <div>
                    <h3 class="text-xl mb-3">
                        {{ $t("Vérification du compte") }}
                    </h3>
                    <p class="mb-2">
                        {{ $t("Nous avons l'ambition d'offrir un service de qualité aux membres de la communauté WE Tattoo.") }}
                    </p>
                    <p>
                        {{ $t("Nous souhaitons donc nous assurer que les tatoueurs inscrits sur la plateforme sont des professionnels déclarés ayant suivi une formation aux conditions d'hygiène et de salubrité.") }}
                    </p>
                </div>
            </div>
            <div  class="md:w-2/3 px-4 py-3">
                <p class="mb-2">
                    {{ $t("Vous pouvez remplir ce formulaire plus tard, mais ces infos seront obligatoires pour publier votre profil.") }}
                </p>
                <verification-form @submited="nextStep">
                    <template v-slot:buttons>
                        <div class="text-right mt-4">
                            <a href="#" @click.prevent="nextStep" class="text-blue-500 text-sm mr-3">
                                {{ $t("Plus tard") }}
                            </a>
                            <button class="inline-block btn-small btn btn-primary">
                                {{ $t("Vérifier mon compte") }}
                            </button>
                        </div>
                    </template>
                </verification-form>
            </div>
        </div>
        <div v-if="step == 1" class="md:flex md:items-stretch">
            <div class="px-4 py-3 md:w-1/3 bg-indigo-800 text-white">
                <h3 class="text-xl mb-3">
                    {{ $t("Votre profil est complété à {percentage} %", {percentage :  profilePercentage}) }}
                </h3>
                <div class="w-full bg-indigo-900 relative mt-1 shadow rounded overflow-hidden h-2 mb-4">
                    <div class="absolute top-0 left-0 bg-gray-100 rounded h-2" :style="`width:${profilePercentage}%`"></div>
                </div>
                <p class="mb-2">
                    {{ $t("Complétez toutes les infos utiles pour vos futurs clients : adresse, horaires, styles...") }}
                </p>
                <p class="">
                    {{ $t("Connectez votre compte instagram votre portfolio s'alimentera automatiquement.") }}
                </p>
            </div>
            <div class="md:w-2/3 px-4 py-3 flex flex-col">
                <div class="flex-grow">
                    <ul class="ml-8">
                        <li class="mb-1">
                            <font-awesome-icon :icon="hasDescription ? ['fal', 'check-circle'] : ['fal', 'circle']" class="mr-1" :class="hasDescription ? 'text-green-700' : 'text-gray-700'"></font-awesome-icon>
                            {{ $t("Présentation : bio, photo, salon de résidence") }}
                        </li>
                        <li class="mb-1">
                            <font-awesome-icon :icon="hasStyles ? ['fal', 'check-circle'] : ['fal', 'circle']" class="mr-1" :class="hasStyles ? 'text-green-700' : 'text-gray-700'"></font-awesome-icon>
                            {{ $t("Votre/vos style(s) de tatouage") }}
                        </li>
                        <li class="mb-1">
                            <font-awesome-icon :icon="hasAddress ? ['fal', 'check-circle'] : ['fal', 'circle']" class="mr-1" :class="hasAddress ? 'text-green-700' : 'text-gray-700'"></font-awesome-icon>
                            {{ $t("L'adresse où vous trouver") }}
                        </li>
                        <li class="mb-1">
                            <font-awesome-icon :icon="hasPortfolio ? ['fal', 'check-circle'] : ['fal', 'circle']" class="mr-1" :class="hasPortfolio ? 'text-green-700' : 'text-gray-700'"></font-awesome-icon>
                            {{ $t("Votre portfolio") }}
                            <router-link v-if="!hasPortfolio" class="text-blue-500" :to="{name:'portfolio'}">
                                {{ $t("Connectez votre Instagram") }}
                            </router-link>
                        </li>
                    </ul>

                    <router-link v-if="profilePercentage != 100" class="btn btn-small btn-primary-outline ml-10 mt-4 inline-block" :to="{name:'profile.general'}">
                        {{ $t("Compléter mon profil") }}
                    </router-link>
                </div>
                <div class="text-right mt-4">
                    <a href="#" @click.prevent="nextStep" class="text-blue-500 text-sm mr-3">
                        {{ $t("Je le ferais plus tard") }}
                    </a>

                    <artist-publish-button
                        :reverse="true"
                        :inactive-label="$t('Publier mon profil')"
                        :artist-id="artistId"
                        :value="profile.published"
                        @update="nextStep"
                        class="inline-block btn-small btn btn-primary" />
                </div>
            </div>
        </div>
        <div v-if="step == 2" class="md:flex md:items-stretch">
           <div class="px-4 py-3 md:w-1/3 bg-indigo-800 text-white">
                <h3 class="text-xl mb-3">
                    {{ $t("Partagez votre profil ...") }}
                </h3>

                <a class="mx-auto mb-4 w-32 h-32 block" :href="`https://wetattoo.test/sharing/${profile.slug}`">
                    <img :src="`/sharing/${profile.slug}`" alt="" class="w-32 h-32" />
                </a>
                <p>
                    {{ $t("Invitez vos abonnés Instagram / Facebook à vous contacter via WE Tattoo ou consulter votre boutique de flashs.") }}
                </p>


            </div>
            <div class="md:w-2/3 px-4 py-3 flex flex-col">
                <div class="flex-grow">
                    <h3 class="text-xl mb-3">
                        {{ $t("... Commencez à travailler avec WE Tattoo") }}
                    </h3>

                    <div class="flex items-center justify-center">
                        <nuxt-link :to="{name : 'app-bookings'}" class="btn btn-primary-outline mx-3">
                            {{ $t('Gérez vos projets') }}
                        </nuxt-link>

                        <nuxt-link :to="{name : 'app-calendar'}" class="btn btn-primary-outline mx-3">
                            {{ $t('Organisez votre agenda') }}
                        </nuxt-link>
                    </div>
                </div>

                <div class="text-right mt-4">
                    <a href="#" @click.prevent="finishOnboarding" class="inline-block btn-small btn btn-primary">
                       {{ $t("J'ai tout compris, merci !") }}
                    </a>
                </div>
            </div>
        </div>
    </div>
</template>


<script>

    import VerificationForm from '@/components/forms/VerificationForm';
    import ArtistPublishButton from '@/components/forms/ArtistPublishButton';
    import { mapState } from 'vuex';

    export default {
        components : {
            VerificationForm,
            ArtistPublishButton
        },
        data(){
            return {
                step : 0,
            }
        },

        computed: {
            ...mapState({
                artistId : state => state.auth.user.profile.id,
                profile : state => state.auth.user.profile,
                user : state => state.auth.user
            }),

            hasAddress(){
                return this.profile.address != null;
            },
            hasDescription(){
                return this.profile.description != '' && this.user.avatar != '';
            },
            hasSocialLinks(){
                return this.profile.instagram != '' || this.profile.facebook != '' || this.profile.website != '';
            },
            hasStyles(){
                return this.profile.preferred_styles != null && this.profile.preferred_styles.length;
            },
            hasPortfolio(){
                return this.profile.portfolio != null;
            },
            profilePercentage(){
                let score = 0;
                let checks = 6;

                if(this.profile.description != ''){
                    score += 1
                }
                if(this.hasSocialLinks){
                    score += 1
                }
                if(this.hasPortfolio){
                    score += 1
                }
                if(this.hasStyles){
                    score += 1
                }
                if(this.user.avatar != ''){
                    score += 1
                }
                if(this.hasAddress){
                    score += 1
                }

                return Math.ceil((score * 100) / checks);
            }
        },

        created(){
            if(this.profile.verified_label != 'verified.none'){
                this.step = 1;
            }

            if(this.step == 1 && this.profile.published){
                this.step = 2;
            }
        },

        methods : {
            nextStep(){
                this.step++;
            },

            finishOnboarding(){
                this.$axios.patch('/users/onboarding')
                    .then(({data}) => {
                        let user = data.user;
                        user.profile = this.profile;
                        this.$auth.$storage.setState('user', user);
                        this.$emit('terminate')
                    })
            }
        }
    }
</script>
