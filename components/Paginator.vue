<template>
    <div class="pagination">
        <span class="pagination-infos">{{paginationItems}}</span>
        <a href="#" :class="{'disabled' : prevDisabled}" @click="gotoPrev" class="px-2 py-1 mr-1">
            <font-awesome-icon :icon="['far', 'chevron-left']" class="text-sm"></font-awesome-icon>
        </a>
        <a href="#" :class="{'disabled' : nextDisabled}" @click="gotoNext" class="px-2 py-1">
            <font-awesome-icon :icon="['far', 'chevron-right']" class="text-sm"></font-awesome-icon>
        </a>
    </div>
</template>

<script>
    export default {
        props : {
            pagination:{
                type:Object,
            }
        },

        computed:{
            nextDisabled(){
                return this.pagination.current_page == this.pagination.last_page;
            },
            nextPage(){
                return this.pagination.current_page < this.pagination.last_page ? this.pagination.current_page + 1 : this.pagination.current_page;
            },

            prevDisabled(){
                return this.pagination.current_page == 1;
            },

            prevPage(){
                return this.pagination.current_page > 1 ? this.pagination.current_page - 1 : this.pagination.current_page;
            },

            paginationItems(){

                if(this.pagination.total === false || this.pagination.total == 0){
                    return '';
                }

                let start = 1 + ((this.pagination.current_page - 1) * this.pagination.per_page);
                let end = start + this.pagination.per_page - 1;

                if(end > this.pagination.total){
                    end = this.pagination.total
                }

                return `${start} - ${end}  sur ${this.pagination.total}`;
            },
        },

        methods : {
            gotoPrev(){
                if(!this.prevDisabled){
                    this.$emit('gotopage', this.prevPage)
                }
            },
            gotoNext(){
                if(!this.nextDisabled){
                    this.$emit('gotopage', this.nextPage)
                }
            }
        }
    }
</script>


<style lang="scss" scoped>

    .pagination{
        @apply flex items-center;
    }

    .pagination-infos{
        @apply text-sm text-gray-600 mr-3;
    }

    .pagination a{
        @apply block leading-none border border-indigo-800 text-indigo-800  rounded bg-white;
    }

    .pagination a.disabled{
        @apply border-gray-300 text-gray-300;
    }
</style>

