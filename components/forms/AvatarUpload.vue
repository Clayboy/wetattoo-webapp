<template>
    <div class="relative group mt-2">
        <avatar :img="avatar" :email="user.email" :size="32" class="mx-auto" />
        <div class=" avatar-32 invisible group-hover:visible mx-auto absolute top-0" style="left:calc(50% - 4rem)">
            <button @click.prevent role="button" class="opacity-75 bg-indigo-800 absolute w-full inset-x-0 bottom-0 text-white pt-2 pb-4 px-2 text-center text-xs">
                <font-awesome-icon class="block text-sm mx-auto mb-1" :icon="['fal', 'camera']"></font-awesome-icon>
                {{ $t('Mettre à jour') }}
            </button>

            <input type="file"
                ref="input"
                accept="image/*"
                @change="updateAvatar"
                class="cursor-pointer absolute block opacity-0 w-24 w-full h-full inset-x-0 bottom-0"  />

        </div>

        <transition name="slim-fade">
            <div v-show="cropShow" class="crop-wrap">
                <SlimCropper ref="cropper" :src="avatarSrc" :cropper-options="{cropBoxResizable : false}"></SlimCropper>


                <div class="btn-box">
                    <button @click.prevent="hideCrop">
                        {{$t('Annuler')}}
                    </button>
                    <button @click.prevent="submitCrop">
                        <font-awesome-icon :icon="['fal', 'check']"></font-awesome-icon>
                    </button>
                </div>
            </div>
        </transition>
    </div>
</template>


<script>

    import Vue from 'vue'
    import { mapState } from 'vuex'

    const SlimCropper = Vue.component('SlimCropper', {template : `<div></div>`});

    if (process.browser) {
        const SlimCropper = require('vue-slim-cropper')
        console.log(SlimCropper);
        // import SlimCropper from 'vue-slim-cropper'
        Vue.use(SlimCropper)
    }

    console.log(SlimCropper)

    export default {
        components : {
            'SlimCropper' : SlimCropper
        },
        data(){
            return {
                avatar : this.$store.state.auth.user.avatar_url,
                avatarSrc : null,
                cropShow : false,

            }
        },

        computed:{
            ...mapState({
                user : state => state.auth.user
            })
        },
        methods : {
            hideCrop () {
                this.cropShow = false
                this.$refs.input.value = ''
            },

            updateAvatar(e){

                const files = e.target.files || e.dataTransfer.files
                if (!files.length) return

                let reader  = new FileReader();
                reader.readAsDataURL(e.target.files[0]);

                reader.onload = e => {
                    this.avatarSrc = e.target.result;
                    this.cropShow = true;
                }
            },

            async submitCrop () {

                const img = await this.$refs.cropper.getCroppedBlob();
                this.hideCrop();

                let data = new FormData();
                data.append('avatar', img);

                axios.post(`/users/${this.user.id}/avatar`, data)
                        .then(({data}) => {
                            this.$message({
                                message: this.$i18n.t('Votre image de profil est mise à jour.'),
                                type: 'success',
                                customClass: 'bg-teal-100 border-0 border-t-4 border-teal-500 rounded-none rounded-b text-teal-900 px-4 py-3 shadow-md'
                            })

                            this.$store.commit('auth/SET_USER_AVATAR', data.avatar);
                            this.avatar = data.avatar.url;

                            this.avatarSrc = null;
                        })
                        .catch((error) => {
                            if(error.response.status == 422){
                                this.$message({
                                    message: this.$i18n.t('Erreur') + ` : ${error.response.data.errors.avatar[0]}`,
                                    type: 'error',
                                    customClass: ''
                                })
                            }
                        });

            }
        }
    }
</script>

<style lang="scss">
.crop-wrap {
    z-index: 100;
    @apply fixed top-0 left-0 w-screen h-screen bg-gray-900;


  }

    .crop-wrap .btn-box {
      z-index:10000;
      height: 50px;
      background:rgba(60,54,107, .75);
      @apply absolute w-full top-0 px-4 flex justify-between;

    }

.crop-wrap .btn-box > button {
        width: 60px;
        height: 100%;
        font-size: 16px;
        color: #ffffff;
        text-align: center;
}

  .slim-fade-enter-active, .slim-fade-leave-active {
    transition: all 0.4s ease;
  }
  .slim-fade-enter, .slim-fade-leave-to {
    opacity: 0;
    transform-origin: top;
    transform: translateY(100%);
  }
</style>
