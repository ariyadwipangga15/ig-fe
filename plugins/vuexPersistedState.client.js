import createPersistedState from 'vuex-persistedstate'

export default ({ store }) => createPersistedState({ key: 'posSystem', paths: ['auth'] })(store)
