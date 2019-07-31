export const state = () => ({
    title: ''
  })
  
  export const mutations = {
    SetTitle(state, newTitle) {
      state.title = newTitle
    }
  }
  
  export const getters = {
    get(state) {
      return state.title
    }
  }
  