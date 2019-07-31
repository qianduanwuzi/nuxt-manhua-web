export const state = () => ({
    timestamp: ''
  })
  
  export const mutations = {
    ShowLogin(state) {
      state.timestamp = new Date().getTime()
    }
  }
  
  export const getters = {
    get(state) {
      return state.timestamp
    }
  }
  