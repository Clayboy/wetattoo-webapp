<template>

    <activity-card :activity="activity">
         <template v-slot:title>
            {{ $t('a ajouté un tattoo') }}
        </template>
        <template v-slot:content>
            <div class="bg-gray-900 w-full relative pb-full">
                <img :src="media.url" class="absolute w-full h-full top-0 object-contain"  />
            </div>
        </template>
    </activity-card>

</template>

<script>
    import activity from '@/components/feed/ActivityMixin'

    export default {
        mixins : [activity],

        computed : {
            media(){
                return this.activity.subject
            }
        }
    }

</script>
