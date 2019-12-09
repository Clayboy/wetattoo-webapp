<template>
    <div>
        <form @submit.prevent="updatePassword">
            <h3 class="title-3">Modification mot de passe</h3>

            <div class="field mb-2">
                <label class="label mb-2 block" for="email">Mot de passe actuel</label>
                <div class="control">
                    <input
                        type="password"
                        class="input"
                        :class="{'error' : password.errors.has('password')}"
                        name="password"
                        v-model="password.password"
                        required>

                    <div class="error-msg" v-if="password.errors.has('password')" v-text="password.errors.get('password')" />
                </div>
            </div>
            <div class="field mb-2">
                <label class="label mb-2 block" for="email">
                    Nouveau mot de passe
                    <span class="muted">(min. 8 caractères)</span>
                </label>
                <div class="control">
                    <input
                        type="password"
                        class="input"
                        :class="{'error' : password.errors.has('new_password')}"
                        name="password"
                        v-model="password.new_password"
                        required>
                    <div class="error-msg" v-if="password.errors.has('new_password')" v-text="password.errors.get('new_password')" />

                </div>
            </div>
            <div class="field mb-2">
                <label class="label mb-2 block" for="email">Confirmez votre nouveau mot de passe</label>
                <div class="control">
                    <input
                        type="password"
                        class="input"
                        :class="{'error' : password.errors.has('new_password_confirmation')}"
                        name="password"
                        v-model="password.new_password_confirmation"
                        required>
                </div>
            </div>
            <div class="flex justify-center">
                <button class="button">Enregistrer</button>
            </div>
        </form>
    </div>
</template>
<script>

    import Form from '@/utilities/Form'

    export default {
        data(){
            return {
                password : new Form({
                    password : '',
                    new_password : '',
                    new_password_confirmation : '',
                }),
            }
        },

        methods:{
            updatePassword(){

                this.password.put('/password')
                    .then(() => {
                        this.$message({
                            message: 'Votre mot de passe est modifié',
                            type: 'success',
                            customClass: 'bg-teal-100 border-0 border-t-4 border-teal-500 rounded-none rounded-b text-teal-900 px-4 py-3 shadow-md'
                        })
                    })
                    .catch(() => {
                    })
            }
        }
    }
</script>
