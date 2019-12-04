<template>
    <div :class="appliedClass">
        <img  v-if="img" :src="img" alt="" />
        <img  v-else :src="gravatar" alt="" />
        <!-- <font-awesome-icon class="h-full w-full rounded-full bg-gray-200" :class="iconClass" v-else :icon="['fal', 'user']" /> -->
    </div>
</template>


<script>

    import MD5 from '@/utilities/md5';

    const placeholder_image = 'https://cdn.we-tattoo.com/assets/avatar_placeholder.png';

    export default {
        props:{
            img: {
                type:String,
                default:'',
            },
            email: {
                type:String,
                default:'',
                required:false,
            },
            size: {
                type:Number,
                default:0,
            }
        },

        computed:{
            appliedClass(){
                if(this.size > 0){
                    return `avatar-${this.size}`;
                }

                return 'avatar';
            },
            gravatar(){
                let size = this.size * 4;
                return 'https://gravatar.com/avatar/' + MD5(this.email) + `?s=${size}&d=${placeholder_image}`;
            },
            iconClass(){
                if(this.size >= 32){
                    return `text-6xl`;
                }

                return 'text-normal';
            }
        }
    }
</script>
