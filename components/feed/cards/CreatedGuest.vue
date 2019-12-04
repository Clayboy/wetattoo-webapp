<template>

    <activity-card :activity="activity">

        <template v-slot:title>
            {{ $t('a ajouté un guest') }}
        </template>
        <template v-slot:content>

            <div class="flex items-center px-4">
                <div class="text-center">
                    <font-awesome-icon :icon="['fal', 'globe-stand']" class="block text-4xl"></font-awesome-icon>
                    GUEST
                </div>
                <guest-card :guest="activity.subject"></guest-card>
            </div>
        </template>
    </activity-card>

</template>

<script>
    import ActivityCard from '@/components/feed/ActivityCard'
    import GuestCard from '@/components/GuestCard'

    export default {
        props : {
            activity : {
                type : Object,
                required:true
            }
        },
        components : {
            ActivityCard,
            GuestCard
        },
    }

</script>
