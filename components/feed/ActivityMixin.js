import ActivityCard from '@/components/feed/ActivityCard'

export default {
    props : {
        activity : {
            type : Object,
            required:true
        }
    },
    components : {
        ActivityCard
    },
}
