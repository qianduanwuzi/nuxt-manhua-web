export const state = () => ({
    token: ''
  })
  
  export const mutations = {
    SetToken(state, token_val) {
        console.log('7', token_val)
      state.token = token_val
    }
  }
  
  export const getters = {
    get(state) {
      return state.token
    }
  }
  