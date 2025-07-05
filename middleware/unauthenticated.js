
export default ({  app, redirect, $config: {tokenKey } }) => {
  if (app.$cookies.get(tokenKey)) {
    return redirect('/dashboard')
  }
}
