<template>

    <right-panel @close='close'>
        <template v-slot:title>
            <span v-html="title"></span>
        </template>
        <template v-slot:body>
            <div v-if="flash">
                <div class="w-2/3 mx-auto pb-2/3 relative">
                    <img :src="flash.media.url" class="absolute w-full h-full top-0 object-contain" />
                </div>
            </div>
            <form ref="bookingform" method="post" @submit.prevent="onSubmit">
                    <div class="mb-8">
                        <h3 class="text-xl font-light mb-3">
                            {{ $t("Votre projet") }}
                        </h3>
                        <div class="field mb-2">
                            <label class="label mb-1 block" for="zone">
                                {{ $t("Zone que vous souhaitez tatouer") }}
                            </label>
                            <div class="control">

                                <select class="input h-10"
                                    :class="{'error' : bookingRequest.errors.has('zone')}"
                                    name="zone"
                                    v-model="bookingRequest.zone">
                                    <option value="" class="text-gray-500">— {{ $t("Choisissez l'emplacement de votre futur tatouage")}} —</option>
                                    <option v-for="zone in zones"
                                        v-text="zone.label"
                                        :value="zone.name"
                                        :key="zone.name"></option>
                                </select>
                                <div class="error-msg" v-if="bookingRequest.errors.has('zone')" v-text="bookingRequest.errors.get('zone')" />
                            </div>
                        </div>
                        <div class="field mb-2">
                            <label class="label mb-1 block" for="size_l">
                                {{ $t("Taille de la zone à tatouer (en cm)") }}
                            </label>
                            <div class="control">
                                <div class="flex">
                                    <input
                                        type="text"
                                        class="input mr-3"
                                        :class="{'error' : bookingRequest.errors.has('size_l')}"
                                        name="size_l"
                                        :disabled="!sizeEditable"
                                        :placeholder="$i18n.t('Largeur approximative')"
                                        v-model="bookingRequest.size_l">
                                    <input
                                        type="text"
                                        class="input"
                                        :class="{'error' : bookingRequest.errors.has('size_h')}"
                                        name="size_l"
                                        :disabled="!sizeEditable"
                                        :placeholder="$i18n.t('Hauteur approximative')"
                                        v-model="bookingRequest.size_h">
                                </div>
                                <div class="error-msg" v-if="bookingRequest.errors.has('size_l')" v-text="bookingRequest.errors.get('size_l')" />
                            </div>
                        </div>
                        <div class="field mb-2">
                            <label class="label mb-1 block" for="style">
                                {{ $t("Style") }}
                            </label>
                            <div class="control">
                                <select  v-model="bookingRequest.style" class="input h-10" :class="{'error' : bookingRequest.errors.has('style')}">
                                    <option value="color">{{ $t("Couleur") }}</option>
                                    <option value="color">{{ $t("Noir & Gris") }}</option>
                                </select>
                                <div class="error-msg" v-if="bookingRequest.errors.has('style')" v-text="bookingRequest.errors.get('style')" />
                            </div>
                        </div>

                        <div class="field mb-2">
                            <label class="label mb-1 block" for="budget">
                                {{ $t("Budget") }}
                            </label>
                            <div class="control">
                                <input
                                    type="text"
                                    class="input"
                                    :class="{'error' : bookingRequest.errors.has('budget')}"
                                    name="budget"
                                    v-model="bookingRequest.budget">
                                <div class="error-msg" v-if="bookingRequest.errors.has('budget')" v-text="bookingRequest.errors.get('budget')" />
                            </div>
                        </div>

                        <div class="field mb-2">
                            <label class="label mb-1 block" for="title">
                                {{ $t('Motif à tatouer') }}
                            </label>
                            <div class="control">
                                <input
                                    type="text"
                                    class="input"
                                    :class="{'error' : bookingRequest.errors.has('title')}"
                                    name="title"
                                    :placeholder="$t('Ex: Ancre marine, Rose tattoo')"
                                    v-model="bookingRequest.title">
                                <div class="error-msg" v-if="bookingRequest.errors.has('title')" v-text="bookingRequest.errors.get('title')" />
                            </div>
                        </div>

                        <div class="field mb-2">
                            <label class="label mb-1 block" for="description">
                                {{ $t("Description") }}
                            </label>
                            <div class="control">
                                <textarea
                                    :class="{'error' : bookingRequest.errors.has('description')}"
                                    name="description"
                                    class="input h-32"
                                    :placeholder='$t("Décrivez votre projet avec le plus de détails possible.\nAjoutez des liens pour illustrer vos idées")'
                                    v-model="bookingRequest.description"></textarea>
                                <div class="error-msg" v-if="bookingRequest.errors.has('description')" v-text="bookingRequest.errors.get('description')" />
                            </div>
                        </div>
                    </div>

                    <div class="mb-8">
                        <h3 class="text-xl font-light mb-4">{{ $t("Vos disponibilités") }}</h3>
                        <div class="field mb-2">
                            <!-- <label class="label mb-1 block" for="description">
                                {{ $t("Période / Jours disponibles") }}
                            </label> -->
                            <div class="control">
                                <textarea
                                    :class="{'error' : bookingRequest.errors.has('availabilities')}"
                                    name="availabilities"
                                    class="input h-32"
                                    :placeholder="$t('Indiquez les jours dans la semaine où vous êtes disponible et à quelle période vous souhaitez tatouer')"
                                    v-model="bookingRequest.availabilities"></textarea>
                                <div class="error-msg" v-if="bookingRequest.errors.has('availabilities')" v-text="bookingRequest.errors.get('availabilities')" />
                            </div>
                        </div>
                    </div>

                    <div>
                        <h3 class="text-xl font-light mb-4">{{ $t("À propos de vous") }}</h3>

                        <div v-if="$auth.loggedIn">
                            <div class="field mb-2">
                                <label class="label mb-1 block" for="">
                                    {{ $t("Nom") }}
                                </label>
                                <div class="control">
                                    <input
                                        type="text"
                                        class="input"
                                        :disabled="true"
                                        :value="user.name" />
                                </div>
                            </div>
                            <div class="field mb-2">
                                <label class="label mb-1 block" for="">
                                    {{ $t("Adresse email") }}
                                </label>
                                <div class="control">
                                    <input
                                        type="text"
                                        class="input"
                                        :disabled="true"
                                        :value="user.email" />
                                </div>
                            </div>
                            <div class="field mb-2">
                                <label class="label mb-1 block" for="phone">
                                    {{ $t("Votre numéro de téléphone") }}
                                </label>
                                <div class="control">
                                    <input
                                        type="text"
                                        class="input"
                                        :class="{'error' : bookingRequest.errors.has('phone')}"
                                        name="phone"
                                        v-model="bookingRequest.phone">
                                    <div class="error-msg" v-if="bookingRequest.errors.has('phone')" v-text="bookingRequest.errors.get('phone')" />
                                </div>
                            </div>
                            <div class="field mb-2">
                                <label class="label mb-1 block" for="">
                                    <input
                                        type="checkbox"
                                        name=""
                                        v-model="bookingRequest.tattooed" />
                                        {{$t('Vous êtes déjà tatoué')}}
                                </label>
                            </div>
                        </div>
                        <div v-else>
                            <label class="label mb-1 block flex items-start" for="account_existing">
                                <input type="radio" value="existing"  name="account" class="mt-1 mr-2" id="account_existing" v-model="account">
                                <div>
                                    {{ $t("J'ai un compte We Tattoo, je me connecte") }}
                                </div>
                            </label>

                            <label class="label mb-1 block flex items-start" for="account_new">
                                <input type="radio" value="new"  name="account" class="mt-1 mr-2" id="account_new" v-model="account">
                                <div>
                                    {{ $t("Créer un compte WE Tattoo") }}
                                    <p class="text-xs text-gray-500">{{ $t("Conseillé pour un meilleur suivi de votre demande et pour suivre l'actualité de votre tatoueur") }}</p>
                                </div>
                            </label>

                            <label class="label mb-1 block flex items-start" for="account_none">
                                <input type="radio" value="none" name="account" class="mt-1 mr-2" id="account_none" v-model="account">
                                <div>
                                    {{ $t("Je ne créé pas de compte") }}
                                    <p class="text-xs text-gray-500">
                                        {{ $t("Et c'est bien dommage ! Le tatoueur vous contactera par téléphone ou email directement") }}
                                    </p>
                                </div>
                            </label>

                            <register-form
                                ref="registerForm"
                                v-if="account == 'new'"
                                type="member"
                                context="booking"
                                @registered="registered"
                                :display-submit="false" />
                            <login-form
                                :display-submit="false"
                                :display-lost-password="false"
                                ref="loginForm"
                                v-if="account == 'existing'"></login-form>


                            <div v-if="account == 'none'">
                                <div class="field mb-2">
                                    <label class="label mb-1 block" for="firstname">
                                        {{ $t("Prénom") }}
                                    </label>
                                    <div class="control">
                                        <input
                                            type="text"
                                            class="input"
                                            :class="{'error' : bookingRequest.errors.has('firstname')}"
                                            name="firstname"
                                            v-model="bookingRequest.firstname">
                                        <div class="error-msg" v-if="bookingRequest.errors.has('firstname')" v-text="bookingRequest.errors.get('firstname')" />
                                    </div>
                                </div>

                                <div class="field mb-2">
                                    <label class="label mb-1 block" for="lastname">
                                        {{ $t("Nom") }}
                                    </label>
                                    <div class="control">
                                        <input
                                            type="text"
                                            class="input"
                                            :class="{'error' : bookingRequest.errors.has('lastname')}"
                                            name="lastname"
                                            v-model="bookingRequest.lastname">
                                        <div class="error-msg" v-if="bookingRequest.errors.has('lastname')" v-text="bookingRequest.errors.get('lastname')" />
                                    </div>
                                </div>

                                <div class="field mb-2">
                                    <label class="label mb-1 block" for="email">
                                        {{ $t("Adresse email") }}
                                    </label>
                                    <div class="control">
                                        <input
                                            type="text"
                                            class="input"
                                            :class="{'error' : bookingRequest.errors.has('email')}"
                                            name="email"
                                            v-model="bookingRequest.email">
                                        <div class="error-msg" v-if="bookingRequest.errors.has('email')" v-text="bookingRequest.errors.get('email')" />
                                    </div>
                                </div>

                                <div class="field mb-2">
                                    <label class="label mb-1 block" for="phone">
                                        {{ $t("Téléphone") }}
                                    </label>
                                    <div class="control">
                                        <input
                                            type="text"
                                            class="input"
                                            :class="{'error' : bookingRequest.errors.has('phone')}"
                                            name="phone"
                                            v-model="bookingRequest.phone">
                                        <div class="error-msg" v-if="bookingRequest.errors.has('phone')" v-text="bookingRequest.errors.get('phone')" />
                                    </div>
                                </div>
                                <div class="field mb-2">
                                    <label class="label mb-1 block" for="">
                                        <input
                                            type="checkbox"
                                            name=""
                                            v-model="bookingRequest.tattooed" />
                                            {{$t('Vous êtes déjà tatoué')}}
                                    </label>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div class="text-center">

                        <recaptcha @error="onError" 
                            @success="onSuccess" 
                            @expired="onExpired" />

                        <button type="submit" class="btn btn-primary">
                            {{ $t("Envoyer votre demande") }}
                        </button>

                    </div>
                </form>
        </template>
    </right-panel>
</transition>

</template>
<script>

    import Form from '@/utilities/Form';
    import LoginForm from '@/components/forms/LoginForm'
    import RegisterForm from '@/components/forms/RegisterForm'
    import RightPanel from '@/components/layout/RightPanel';
    import {tattooZones} from '@/utilities/TattooVars';

    import BookingMixin from '@/utilities/BookingMixin';

    import {mapState, mapGetters, mapActions} from 'vuex';

    export default {
        mixins : [BookingMixin],
        components : {
            LoginForm,
            RegisterForm,
        },
        data(){
            return {
                account : 'new',
                step : 1,
            }
        },

        async mounted() {
            try{
                await this.$recaptcha.init()
            }catch(e){
                console.log(e);
            }
        },


        created(){
            if(this.$auth.loggedIn){
                this.bookingRequest.user_id = this.$auth.user.id
                this.bookingRequest.email = this.$auth.user.email
            }
        },

        computed:{

            ...mapState({
                user : state => state.auth.user
            }),

            title(){
                if(this.flash){
                    return this.$i18n.t('Réserver un flash à {artist}', {artist : `<span class="text-indigo-800">${this.artistPseudo}</span>`})
                }else{
                    return this.$i18n.t('Réserver un tatouage à {artist}', {artist : `<span class="text-indigo-800">${this.artistPseudo}</span>`})
                }
            },

            sizeEditable(){
                return this.flash == null || (this.flash != null && this.flash.expandable)
            }
        },

        methods : {

            registered(user){
                console.log(user);
            },

            async save(){
                if(this.bookingRequest.user_id){
                    this.saveBooking();
                }else{
                    if(this.account == 'existing'){

                        try{
                            let response = await this.$refs.loginForm.submit();
                            this.bookingRequest.email = this.user.email;
                            this.bookingRequest.user_id = this.user.id;
                            await this.saveBooking();
                        }catch(e){

                        }
                    }else if(this.account == 'new'){

                        try{
                            let response = await this.$refs.registerForm.submit();
                            this.bookingRequest.email = this.user.email;
                            this.bookingRequest.user_id = this.user.id;
                            await this.saveBooking();
                        }catch(e){

                        }

                        // this.$refs.registerForm.submit()
                        //     .then((data) => {
                        //         this.bookingRequest.email = this.user.email;
                        //         this.bookingRequest.user_id = this.user.id;
                        //         this.saveBooking();
                        //     })
                    }else{
                        this.saveBooking();
                    }
                }
            },

            async saveBooking(){
                try{
                    let response = await this.bookingRequest.post(this.$auth.loggedIn ? '/bookings' : '/bookings/anonymous');
                    this.$message({
                        message : this.$i18n.t("Merci! Votre demande a été transmise à {artist} !", {artist : this.artistPseudo}),
                        type: 'success'
                    });
                    this.close();
                }catch(e){
                    this.bookingRequest.gRecaptchaResponse = "";
                    this.$recaptcha.reset();
                }
            },

            
            async onSubmit() {	    
                try {	    
                    if(this.bookingRequest.gRecaptchaResponse == null || this.bookingRequest.gRecaptchaResponse == ""){
                        this.bookingRequest.gRecaptchaResponse = await this.$recaptcha.getResponse();
                    }
                    this.save();
                } catch (error) {	   
                    console.log('Login error:', error)	   
                }	     
                
            },	

            onError(error) {
                console.log('Error happened:', error)	     
            },

            onSuccess (token) {	  
                console.log('success');
                // this.setToken(token);
            },	    
            onExpired() {
                console.log('Expired')	   
            }	
        }
    }
</script>
