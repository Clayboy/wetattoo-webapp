<template>
    <div class="mb-4">
        <div class="text-gray-600 text-sm">
            <div v-if="profilePercentage < 100">Votre profil est complété à {{ profilePercentage }} %</div>
            <div v-else>Well done, le profil a toutes les infos essentielles ! </div>
            <div class="w-full bg-gray-400 relative mt-1 rounded overflow-hidden"  style="height:4px;">
                <div class="absolute top-0 left-0 border-b-4 border-indigo-800 rounded" :style="`width:${profilePercentage}%`"></div>
            </div>
        </div>
        <p class="text-right text-sm mt-1">
            <router-link class="text-blue-500" :to="{name:'profile.general'}">Mettre à jour votre profil</router-link>
        </p>
    </div>
</template>

<script>
    export default {
        props:{
            profile: {
                type:Object,
            },
            user: {
                type:Object,
            },
        },
        computed: {
            hasAddress(){
                return this.profile.address != null;
            },
            hasSocialLinks(){
                return this.profile.instagram != '' || this.profile.facebook != '' || this.profile.website != '';
            },
            hasStyles(){
                return this.profile.preferred_styles != null && this.profile.preferred_styles.length;
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
                if(this.profile.portfolio != null){
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
        }
    }
</script>
