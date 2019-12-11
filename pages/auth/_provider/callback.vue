<template>
    <div>
        Loading...
    </div>
</template>
<script>
import { mapState } from 'vuex';
export default {
    computed: {
        ...mapState({
            artistId : state => state.auth.user.profile.id
        })
    },
    mounted(){
        let provider = this.$route.params.provider;

        this.$axios.post(`/associate/${provider}/callback`, {
                ...this.$route.query,
                redirect: 'auth'
            })
            .then(() => {
                this.$axios.put(`/artists/${this.artistId}/portfolio`, {
                    'provider' : provider
                })
                .then(({data}) => {

                    console.log(data);

                    this.account = data.account;
                    this.medias = data.medias;
                    this.portfolio = data.portfolio;

                    let user = JSON.parse(JSON.stringify(this.$auth.user));
                    user.profile.portfolio  = {...data.portfolio};
                    this.$auth.$storage.setState('user', user);

                    this.$router.push({name : 'app-portfolio'})

                })

            });
    }
}
</script>