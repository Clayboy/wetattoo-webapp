<template>
    <component :is="`${usertype}-dashboard`"></component>
</template>

<script>

    import ArtistDashboard from '@/components/dashboard/ArtistDashboard';
    import MemberDashboard from '@/components/dashboard/MemberDashboard';

    export default {
        middleware : 'auth',
        layout : 'member',

        components : {
            ArtistDashboard,
            MemberDashboard,
        },

        computed: {
            usertype(){
                return this.$store.state.auth.user.profile_type;
            },
        },

        head(){
            return {
                title : this.$i18n.t("Tableau de bord")
            }
        }
    }
</script>
