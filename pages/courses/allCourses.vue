<template>
  <div>
    <CoursesList />
  </div>
</template>

<script>
export default {
  name: 'CoursesPage',
  async fetch ({ store }) {
    if (!store.state.courses.token) {
      await store.dispatch('courses/getToken')
      await store.dispatch('courses/getCourses')
    } else {
      await store.dispatch('courses/getCourses')
    }
  }
}
</script>
