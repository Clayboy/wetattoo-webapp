<template>
    <form method="POST" @submit.prevent="submit">
        <div class="mb-3 text-red-700 text-sm" v-if="error">
            <font-awesome-icon class="mr-1" :icon="['fal', 'exclamation-triangle']"></font-awesome-icon>
            {{ $t("Erreur de connexion : mauvais email ou mot de passe") }}.
        </div>

        <div class="field mb-6">
            <label class="label text-sm mb-2 block" for="email">
                {{ $t('Adresse email') }}
            </label>

            <div class="control">
                <input id="email"
                    type="email"
                    class="input"
                    name="email"
                    v-model="form.username"
                    required>
            </div>
        </div>
        <div class="field mb-6">
            <label class="label text-sm mb-2 block" for="password">
                {{ $t('Mot de passe') }}
            </label>

            <div class="control">
                <input id="password"
                    type="password"
                    class="input"
                    name="password"
                    v-model="form.password"
                    required>
            </div>
        </div>

        <div class="flex items-center justify-between">
            <router-link v-if="displayLostPassword" :to="localePath('auth-lost-password')" class="no-underline inline-block align-baseline text-sm text-blue-400 hover:text-blue-dark-600 float-right">
                {{ $t('Mot de passe oublié ?') }}
            </router-link>

            <button  v-if="displaySubmit" class="bg-indigo-800 hover:bg-indigo-900 text-white py-1 px-4 rounded">
            {{ $t('Connexion') }}
            </button>

        </div>
    </form>
</template>

<script>

    import Form from '@/utilities/Form'

    export default {
        props: {
            displayLostPassword : {
                type: Boolean,
                default : true,
            },
            displaySubmit : {
                type: Boolean,
                default : true,
            }
        },
        data() {
            return {
                form : new Form({
                    username: '',
                    password: '',
                }),
                error : false
            };
        },

        methods: {
            submit() {
                return this.$auth.loginWith('local', {
                    data : this.form.data()
                }).then(data => {
                    this.$emit('logged');
                })
                .catch(() => {
                    this.error = true
                })
            }
        }
    }
</script>
