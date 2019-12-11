export default function ({app, $auth, store}) {
    if (!$auth.loggedIn) {
      return
    }

    app.i18n.setLocale($auth.user.locale);
    store.dispatch('agenda/init')
  }