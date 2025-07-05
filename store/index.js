export const state = () => ({
  loading: false,
  error: null,
});

export const getters = {};

export const mutations = {
  SET_LOADING(state, status) {
    state.loading = status;
  },
  SET_ERROR(state, err) {
    state.error = err;
  },
};

export const actions = {
  async nuxtServerInit({ dispatch }, { app, req, params, error, $config }) {
    if (!params.username) return;
    try {
      if (!app.$cookies.get($config.tokenKey)) {
        // const { access_token, expires_in } = await dispatch('setGuestToken', {
        // 	username: params.username,
        // 	ipAddress: req.connection.remoteAddress,
        // 	url: $config.BACKEND_API_URL,
        // 	apiSecret: $config.BACKEND_API_SECRET,
        // })
        // app.$cookies.set($config.tokenKey, access_token, {
        // 	path: '/',
        // 	expires: app.$moment().second(expires_in).toDate()
        // })
      }

    //   await Promise.all([
    //     dispatch("user/getProfile"),
    //     dispatch("reseller/getProfile", { username: params.username }),
    //   ]);
    } catch ({ response }) {
      return error({
        statusCode: response.data.status,
        message: response.data.message,
      });
    }
  },
};
