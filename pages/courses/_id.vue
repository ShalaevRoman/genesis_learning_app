<template>
  <v-container fluid>
    <v-row>
      <v-col cols="12" md="7" lg="8">
        <v-card class="pa-4" :elevation="0">
          <VideoPlayer :selected-lesson="selectedLesson" :lesson-progress="lessonProgress"/>
          <v-card-title>{{ selectedCourse.title }}</v-card-title>
          <v-card-subtitle>{{ selectedCourse.description }}</v-card-subtitle>
          <v-card-text>
            <v-list dense>
              <v-subheader>Lessons</v-subheader>
              <v-divider></v-divider>
              <v-list-item-group>
                <v-list-item
                  v-for="(lesson) in selectedCourse.lessons"
                  :key="lesson.id"
                  :disabled="lesson.status === 'locked'"
                  @click="onSelectLesson(lesson)"
                >
                  <v-list-item-title>{{ lesson.title }}</v-list-item-title>
                  <v-list-item-action>
                    <v-icon
                      v-if="lesson.status === 'unlocked'"
                      :color="selectedLesson === lesson ? '#00E676' : 'gray'"
                    >
                      mdi-play-circle
                    </v-icon>
                    <v-icon v-else color="grey">
                      mdi-lock
                    </v-icon>
                  </v-list-item-action>
                </v-list-item>
              </v-list-item-group>
            </v-list>
          </v-card-text>
        </v-card>
      </v-col>
      <v-col cols="12" md="5" lg="4">
        <v-card class="pa-4 d-flex flex-column align-center" :elevation="0">
          <v-card-title>Progress</v-card-title>
          <v-card-text class="d-flex flex-column align-center">
            <v-progress-circular
              v-if="selectedLesson"
              :size="80"
              :width="10"
              :value="lessonProgress"
              color="primary"
              fill="#ffffff"
              indeterminate-width="10"
              rounded
              background-color="grey lighten-2"
            >
              {{ lessonProgress }}%
            </v-progress-circular>
            <v-card-subtitle v-if="selectedLesson" class="secondary--text">{{ selectedLesson.title }} </v-card-subtitle>
          </v-card-text>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
export default {
  data() {
    return {
      selectedLesson: null,
      lessonProgress: 0,
      // selectedVideoUrl: '',
      // lessonId: '',
      // duration: ''
    };
  },
  async fetch ({ params, store }) {
    await store.dispatch('courses/getCourseById', params.id)
  },
  computed: {
    selectedCourse() {
      return this.$store.state.courses.selectedCourse
    },
    availableLesson() {
      return this.selectedCourse.lessons.find(lesson => lesson.status === 'unlocked')
    },
  },
  mounted() {
    this.selectedLesson = this.availableLesson
    // this.selectedVideoUrl = this.availableLesson.link
    // this.lessonId = this.availableLesson.id
    this.getProgress()
  },
  methods: {
    onSelectLesson(lesson) {
      this.selectedLesson = lesson
      this.getProgress()
    },
    getProgress() {
      const lastProgress = localStorage.getItem(this.selectedLesson.id)
      this.lessonProgress = lastProgress ? parseInt(lastProgress) : 0
    }
  }
};
</script>

<style lang="scss" scoped>
</style>
