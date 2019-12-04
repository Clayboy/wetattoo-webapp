<template>
    <div class="relative">
        <form @submit.prevent="uploadFile">
            <input type="file" class="cursor-pointer z-50 absolute block opacity-0 w-24 w-full h-full inset-x-0 bottom-0" accept="image/*" @change="updateFile" />
            <div class="cursor-pointer absolute block w-24 w-full h-full inset-x-0 bottom-0 bg-indigo-800 text-white text-center text-xs p-2">
                <slot>
                    <font-awesome-icon :icon="['fal', 'camera']" class="text-lg"></font-awesome-icon>
                    <p>Ajouter un fichier</p>
                </slot>
            </div>

            <div v-if="displayPreview" class="fixed top-0 left-0 w-full h-full z-50 flex items-center justify-center">
                <div class="fixed top-0 left-0 w-full h-full bg-gray-800 opacity-75"></div>
                <div class="panel z-50 w-2/3">
                    <img :src="result" alt="" class="w-auto">
                    <div class="text-right mt-2">
                        <a href="#" class="text-gray-700 mr-3" @click.prevent="reset">Annuler</a>
                        <button class="button">Ajouter</button>
                    </div>
                </div>
            </div>
        </form>
    </div>
</template>

<script>
    export default {
        props : {
            uploadUrl : {
                type : String,

            },
            withPreview : {
                type : Boolean,
            }
        },
        data(){
            return {
                file : null,
                result : null,
                displayPreview: false
            }
        },
        methods : {
            updateFile(e){

                if(!e.target.files.length) return;

                this.file = e.target.files[0];
                let reader  = new FileReader();

                reader.readAsDataURL(this.file);

                reader.onload = e => {
                    this.result = e.target.result;
                    this.displayPreview = true;
                }
            },

            uploadFile(){

                let data = new FormData();
                data.append('file', this.file);


                axios.post(this.uploadUrl, data)
                    .then((resData) => {

                        this.$emit('uploaded', resData.data)

                        this.reset();
                    });
            },

            reset(){
                this.displayPreview = false;

                this.file = null;
                this.result = null;
            }
        }
    }
</script>
