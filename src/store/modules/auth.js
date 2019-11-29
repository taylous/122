
const state = {
  token: 'INPUT_FIREBASE_AUTH_TOKEN_FOR_PWA'
};

const getters = {
  isLoggedIn: state => !!state.token
};

const mutations = {
  setToken: (state, token) => {
    state.token = token;
  }
};

export default {
  state,
  getters,
  mutations
};
