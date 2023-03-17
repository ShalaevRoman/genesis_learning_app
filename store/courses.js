export const state = () => ({
  isShowPreloader: false,
  title: 'Title',
  allCourses: '',
  selectedCourse: null,
  token: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIyODQxYmVjYS1jMjUxLTRjMGEtYTljYS1lODE5Mzc2NzEwZWYiLCJwbGF0Zm9ybSI6InN1YnNjcmlwdGlvbnMiLCJpYXQiOjE2Nzg3OTgyODcsImV4cCI6MTY3OTY5ODI4N30.mW3wHjb0qarUQTUbtdQ2Q7KX003SvCfe6BZDPZ9AvaQ"
})

export const mutations = {
  SET_TITLE (state, payload) {
    state.title = payload
  },
  SET_SELECTED_COURSE(state, payload) {
    state.selectedCourse = payload
  },
  SET_COURSES (state, payload) {
    state.allCourses = payload
  },
  SET_TOKEN (state, token) {
    state.token = token
  },
  CLEAR_TOKEN (state) {
    state.token = null
  },
  SET_STATE_PRELOADER (state, payload) {
    state.isShowPreloader = payload
  }
}

export const actions = {
  async getCourses({ commit, state }) {
    try {
      const response = await this.$axios.get('/api/core/preview-courses', {
        headers: {
          Authorization: `Bearer ${state.token}`
        }
      })
      const { courses } = response.data
      console.log(courses)
      commit('SET_COURSES', courses)
    } catch (error) {
      console.log(error)
    }
  },
  async getCourseById({ commit, state }, courseId) {
    try {
      const response = await this.$axios.$get(`/api/core/preview-courses/${courseId}`, {
        headers: {
          Authorization: `Bearer ${state.token}`
        }
      })
      commit('SET_SELECTED_COURSE', response)
    } catch (error) {
      console.log(error)
    }
  },
  async login({ commit }) {
    try {
      const response = await this.$axios.post('/auth/anonymous?platform=subscriptions/')
      const { token } = response.data
      commit('SET_TOKEN', token)
      localStorage.setItem('token', token)
    } catch (error) {
      commit('CLEAR_TOKEN')
      throw error;
    }
  },
  logout({ commit }) {
    commit('CLEAR_TOKEN')
    localStorage.removeItem('token')
  },
}

export const getters = {
  title: state => state.title,
  allCourses: state => state.allCourses,
  isShowPreloader: state => state.isShowPreloader,
  selectedCourse: state => state.selectedCourse
}
