<template>
    <form method="POST" @submit.prevent.stop="submit">
        <div class="field mb-2">
            <label class="label mb-1 block" for="name">
                {{ type == 'artist' ? $t("Nom d'artiste") : $t('Pseudo') }}
            </label>
            <div class="control">
                <input
                    type="text"
                    class="input"
                    :class="{'error' : form.errors.has('name')}"
                    name="name"
                    v-model="form.name">
                <div class="error-msg" v-if="form.errors.has('name')" v-text="form.errors.get('name')" />
            </div>
        </div>
        <div class="field mb-2">
            <label class="label mb-1 block" for="email">
                {{ $t('Adresse email') }}
            </label>
            <div class="control">
                <input
                    type="text"
                    class="input"
                    :class="{'error' : form.errors.has('email')}"
                    name="email"
                    v-model="form.email">
                <div class="error-msg" v-if="form.errors.has('email')" v-text="form.errors.get('email')" />
            </div>
        </div>

        <div class="field mb-2">
            <label class="label mb-1 block" for="password">
                {{ $t('Mot de passe') }}
            </label>
            <div class="control">
                <input
                    type="password"
                    class="input"
                    :class="{'error' : form.errors.has('password')}"
                    name="password"
                    v-model="form.password">
                <div class="error-msg" v-if="form.errors.has('password')" v-text="form.errors.get('password')" />
            </div>
        </div>
        <div class="field mb-2">
            <label class="label mb-1 block" for="password_confirmation">
                {{ $t('Confirmez votre mot de passe') }}
            </label>
            <div class="control">
                <input
                    type="password"
                    class="input"
                    :class="{'error' : form.errors.has('password_confirmation')}"
                    name="password_confirmation"
                    v-model="form.password_confirmation">
                <div class="error-msg" v-if="form.errors.has('password_confirmation')" v-text="form.errors.get('password_confirmation')" />
            </div>
        </div>
        <div v-if="displaySubmit" class="text-right">
            <recaptcha @error="onError" 
                @success="onSuccess" 
                @expired="onExpired" />

            <button type="submit" class="bg-indigo-800 hover:bg-indigo-900 text-white py-1 px-4 rounded">
                {{ $t('Créer votre compte') }}
            </button>
        </div>
    </form>
</template>

<script>
    import Form from '@/utilities/Form'

    export default {
        props:{
            type : {
                type: String,
                required:true,
                validator: (value) => ['artist', 'member'].indexOf(value) !== -1
            },
            displaySubmit: {
                type: Boolean,
                required: false,
                default : true,
            },
        },
        data(){
            return {
                form : new Form({
                    timezone : this.$moment.tz.guess(),
                    name: '',
                    email: '',
                    password: '',
                    password_confirmation: '',
                    profile : this.type,
                    locale : this.$i18n.locale,
                    useCaptcha : this.displaySubmit, 
                    captcha : '',
                })
            }
        },
        async mounted() {
            if(this.form.useCaptcha){
                try{
                    await this.$recaptcha.init()
                }catch(e){
                    console.log(`RegisterForm`, e)
                }
            }
        },
        watch:{
            '$store.state.language.language'(newVal){
                this.form.locale = newVal;
            }
        },
        methods: {

            async submit() {

                if(this.form.useCaptcha){
                    try{
                        this.form.captcha = await this.$recaptcha.getResponse();
                    }catch (error) {	   
                        console.log('Login error:', error)	   
                    }	
                }

                return this.register();
            },

            async register(){
                try{

                    let response = await this.form.post('/auth/register');
                    await this.$auth.setUserToken(response.token)
                    this.$emit('registered', {user : response.user})
                    return response;

                }catch(error){
                    if(this.form.useCaptcha){
                        this.form.captcha = "";
                        this.$recaptcha.reset();
                    }
                }

                // return this.form.post('/auth/register')
                //     .then((data) => {
                //         this.$auth.setUserToken(data.token);
                //         this.$auth.fetchUser()
                //         this.$emit('registered', {user : data.user});
                //     })
                //     .catch((error) => {
                //         if(this.form.useCaptcha){
                //             this.form.captcha = "";
                //             this.$recaptcha.reset();
                //         }

                //     });
            },

            onError(error) {
                console.log('Error happened:', error)	     
            },

            onSuccess (token) {	  
                console.log('Succeeded:', token)	
            },	    
            onExpired() {
                console.log('Expired')	   
            }	
        }
    }
</script>
