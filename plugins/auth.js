export default function ({$auth, store}) {
    if (!$auth.loggedIn) {
      return
    }

    store.dispatch('agenda/init')
  }