export const state = () => ({
  isShowPreloader: false,
  allCourses: '',
  selectedCourse: null,
  token: ''
})

export const mutations = {
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
  }
}

export const actions = {
  async getCourses({ commit, state }) {
    try {
      const response = await this.$axios.get('/api/v1/core/preview-courses', {
        headers: {
          Authorization: `Bearer ${state.token}`
        }
      })
      const { courses } = response.data
      commit('SET_COURSES', courses)
    } catch (error) {
      if (error.response) {
        // Обробка помилки з API
      } else if (error.request) {
        // Обробка помилки мережі
      } else {
        // Інші помилки
      }
    }
  },
  async getCourseById({ commit, state }, courseId) {
    try {
      const response = await this.$axios.$get(`/api/v1/core/preview-courses/${courseId}`, {
        headers: {
          Authorization: `Bearer ${state.token}`
        }
      })
      commit('SET_SELECTED_COURSE', response)
    } catch (error) {
      if (error.response) {
        // Обробка помилки з API
      } else if (error.request) {
        // Обробка помилки мережі
      } else {
        // Інші помилки
      }
    }
  },
  async getToken({ commit }) {
    try {
      const tokenFromLocalStorage = localStorage.getItem('token')
      if (tokenFromLocalStorage) {
        commit('SET_TOKEN', tokenFromLocalStorage)
      } else {
        const response = await this.$axios.get('/api/v1/auth/anonymous?platform=subscriptions')
        const { token } = response.data
        commit('SET_TOKEN', token)
        localStorage.setItem('token', token)
      }
    } catch (error) {
      if (error.response) {
        // Обробка помилки з API
      } else if (error.request) {
        // Обробка помилки мережі
      } else {
        // Інші помилки
      }
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
