<template>
    <div class="field mb-2">
        <label v-if="label" class="label mb-1 block" for="parlor">
            {{ label }}
        </label>
        <div class="control">
            <el-select v-model="val" @change="updateValue" class="w-full" multiple :placeholder="$t('Sélectionnez vos styles de prédilection')">
                <el-option
                    v-for="item in tattooStyles"
                    :key="item.name"
                    :label="item.label"
                    :value="item.name">
                </el-option>
            </el-select>
        </div>
    </div>
</template>

<script>

    import {tattooStyles} from '@/utilities/TattooVars';
    import {Select, Option} from 'element-ui';

    export default {
        props:{
            value : {
                type: Array,
            },
            label:{
                type: String,
            },
        },
        components : {
            'el-option' : Option,
            'el-select' : Select,
        },
        
        data(){
            return {
                tattooStyles : [],
                val : this.value,
            }
        },

        async mounted(){
            this.tattooStyles = await this.$store.dispatch('tattooStyles')
        },

        methods: {
            updateValue() {
                this.$emit('input', this.val);
            }
        }
    }
</script>
