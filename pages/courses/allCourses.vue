<template>
  <div>
    <Preloader v-if="isShowPreloader"/>
    <CourseList v-else/>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
export default {
  name: 'CoursesPage',
  async fetch ({ store }) {
    await store.dispatch('courses/getCourses')
  },
  computed: {
    ...mapGetters('courses', ['allCourses', 'isShowPreloader'])
  },
}
</script>
