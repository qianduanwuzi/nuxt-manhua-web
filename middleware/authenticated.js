/**
 * 废弃，目前auth验证在axios拦截器里
 *
 */
export default function ({ store, redirect, route }) {
  console.log('route------->', route)
  // cookie无
  // if (!store.state.auth) {
  //   return redirect('/login')
  // }
}
