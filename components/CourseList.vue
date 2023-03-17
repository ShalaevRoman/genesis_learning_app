<template>
  <div>
    <v-container>
      <v-row>
        <v-col
          v-for="(course, index) in displayedCourses"
          :key="index"
          cols="12"
          md="6"
          lg="4"
        >
          <v-card class="mb-5" :to="`/courses/${course.id}`">
            <v-avatar
              v-if="course.status === 'launched'"
              class="mt-2 ml-2"
              color="white"
              size="xs"
            >
              <v-icon color="success">mdi-check-bold</v-icon>
            </v-avatar>
            <video
              ref="videoPlayer"
              :poster="`${course.previewImageLink}/cover.webp`"
              height="200"
              muted
              controls
              class="cursor-pointer"
              @mouseenter="playVideo(course.meta.courseVideoPreview.link)"
            >
<!--              @mouseout="stopVideo()"-->
            </video>
            <v-card-title class="pt-4 d-flex flex-column">
              <div class="headline font-weight-bold mb-2">
                {{ course.title }}
              </div>
              <div class="grey--text font-weight-light mb-3 skills-wrapper">
                <ul>
                  <li v-for="(skill, i) in course.meta.skills" :key="i">
                    {{ skill }}
                  </li>
                </ul>
              </div>
              <div class="rating-wrapper">
                <v-rating
                  v-model="course.rating"
                  background-color="grey lighten-3"
                  color="primary"
                  :readonly="true"
                  :size="24"
                ></v-rating>
                <div class="subtitle-2 font-weight-bold">
                  {{ course.lessonsCount }} lessons
                </div>
              </div>
            </v-card-title>
          </v-card>
        </v-col>
      </v-row>
      <v-pagination
        v-model="currentPage"
        :total-visible="5"
        :length="Math.ceil(allCourses.length / itemsPerPage)"
      ></v-pagination>
    </v-container>
  </div>
</template>

<script>
import Hls from "hls.js";

export default {
  data() {
    return {
      currentPage: 1,
      itemsPerPage: 10,
    };
  },
  computed: {
    allCourses() {
      return this.$store.state.courses.allCourses
    },
    displayedCourses() {
      const start = (this.currentPage - 1) * this.itemsPerPage;
      const end = start + this.itemsPerPage;
      return this.allCourses.slice(start, end);
    }
  },

  methods: {
    playVideo(link) {
      const video = this.$refs.videoPlayer

      if (Hls.isSupported()) {
        console.log('in')
        const hls = new Hls()
        hls.loadSource(link)
        hls.attachMedia(video)
        hls.on(Hls.Events.MANIFEST_PARSED, () => {
          video.play()
        })
      } else if (video.canPlayType('application/vnd.apple.mpegurl')) {
        console.log('else')
        video.src = link
        video.addEventListener('loadedmetadata', () => {
          video.play()
        })
      }
    },
    stopVideo() {
      const video = this.$refs.videoPlayer
      video.pause()
      video.currentTime = 0
    }
  },
};
</script>

<style lang="scss">
  .v-card {
    transition: all 0.3s ease;
    box-shadow: none;
    border-radius: 8px;
    overflow: hidden;
    .rating-wrapper,
    .skills-wrapper {
      width: 100%;
    }
  }
</style>
