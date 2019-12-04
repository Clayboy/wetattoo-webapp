<template>
    <div class="text-base font-normal flex items-center">
        <label for="" class="flex-grow mr-3">
            {{ label }}
        </label>
        <el-switch
            v-model="active"
            active-color="#434190"
            inactive-color="#e2e8f0"
            @change="toggle"
            >
        </el-switch>
    </div>
</template>

<script>
    import {Switch} from 'element-ui';


    export default {
        props : {
            label:{
                type:String,
                required: true,
            },
            artistId:{
                type:Number,
                required:true,
            },
            property: {
                type: String,
                required: true,
            },
            value:{
                type:Boolean,
                required:false,
            }
        },

        data(){
            return {
                active : this.value
            }
        },

        computed:{
            endpoint(){
                return `/artists/${this.artistId}/${this.property}`
            }
        },
        methods:{
            toggle(){
                let action = this.active ? 'put' : 'delete';

                axios[action](this.endpoint)
                    .then((response) => {
                        this.$message({
                            message: 'Mise à jour effectuée',
                            type: 'success',
                            customClass: 'message-success'
                        })

                        this.$emit('update', {
                            prop : this.property,
                            value : this.active
                        });
                    })
            }
        },
        components:{
            'el-switch' : Switch
        }
    }
</script>
