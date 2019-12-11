<template>
    <div class="bg-white rounded mb-2 shadow overflow-hidden">
        <div class="activity_header flex items-start justify-between px-4 py-2">
            <div  class="flex items-start">
                <avatar :img="activity.artist.avatar_url" class="mr-2" :size="10"></avatar>
                <div>
                    <p>
                        <nuxt-link :to="{name : 'artists-slug', params : {slug : activity.artist.slug}}"  class="font-medium leading-tight">
                            {{ activity.artist.pseudo }}
                        </nuxt-link>
                        <span class="text-gray-500">
                            <slot name="title"></slot>
                        </span>
                    </p>
                    <span class="text-gray-500 text-xs">{{ activity.created_at | diffForHumans }}</span>
                </div>
            </div>
        </div>
        <div class="activity border border-gray-300 border-r-0 border-l-0">
            <slot name="content"></slot>
        </div>
        <!-- <div class="activity_footer px-4 py-2">
            <slot name="actions"></slot>
        </div> -->
    </div>

</template>

<script>

    export default {
        props : {
            activity : {
                type : Object,
                required:true
            }
        }
    }

</script>
