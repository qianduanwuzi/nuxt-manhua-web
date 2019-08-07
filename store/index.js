export const state = () => ({
})

export const actions =  {
  nuxtServerInit ({ commit }, { req }) {
    console.log('6666----------------------')
    // console.log('6666',req.headers.cookie)
    //  console.log('6666',req.session)
    const token = req.headers.cookie
    // console.log('33333333----------', localStorage)
    // if (req.session.user) {
      commit( "token/SetToken",token)
    // }
  }
}

export const mutations = {
  increment (state) {
  }
}
