<template>
    <div class="relative md:flex">
        <div class="md:w-1/4 md:mr-4 left-0 w-full md:relative">
            <ul class="sidenav">
                <li v-for="item in this.tabs" class="sidenav-item md:w-full" :key="item.name">
                    <a href="#" @click="setActiveTab(item.name)" class="sidenav-link" :class="{'nuxt-link-exact-active nuxt-link-active' : item.active}" :to="{name : item.route}">
                        <font-awesome-icon class="md:mr-3 text-lg" :icon="item.icon"></font-awesome-icon>
                        <div class="text-xs sm:text-base">
                            {{ item.label }}
                            <p class="hidden sm:block text-gray-500 text-xs">
                                {{ item.description }}
                            </p>
                        </div>
                    </a>
                </li>
            </ul>
        </div>
        <div class="md:w-3/4 bg-white shadow p-1 sm:p-4">
            <slot></slot>
        </div>
    </div>


</template>


<script>

    import Tab from '@/components/Tab.vue';


    export default {
        data(){
            return {
                tabs : this.$children
            }
        },
        computed:{
            activeTab(){
                return this.tabs.find(tab => tab.active);
            }
        },
        methods:{
            setActiveTab(name){
                this.tabs.forEach(tab => tab.active = tab.name == name)
            },
        },

        components:{
            Tab
        }
    }
</script>