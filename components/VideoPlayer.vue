<template>
  <video ref="videoPlayer" class="videoPlayer" controls></video>
</template>

<script>
import Hls from "hls.js";

export default {
  name: "VideoPlayer",
  props: ['selectedLesson', 'lessonProgress'],
  watch: {
    selectedLesson () {
      this.playLesson()
    },
    lessonProgress () {
      this.playLesson()
    }
  },
  methods: {
    playLesson() {
      const video = this.$refs.videoPlayer

      if (Hls.isSupported()) {
        const hls = new Hls()
        hls.loadSource(this.selectedLesson.link)
        hls.attachMedia(video)
        hls.on(Hls.Events.MANIFEST_PARSED, () => {
          video.currentTime = this.selectedLesson.duration * this.lessonProgress / 100
          video.play()
        });
      } else if (video.canPlayType('application/vnd.apple.mpegurl')) {
        video.src = this.selectedLesson.link
        video.addEventListener('loadedmetadata', () => {
          video.play()
        })
      }
      video.addEventListener('timeupdate', () => {
        const progress = Math.floor((video.currentTime / video.duration) * 100)
        if (!Number.isNaN(progress)) {
          localStorage.setItem( this.selectedLesson.id, progress)
        }
      })
    },
  },
}
</script>

<style scoped>
 .videoPlayer {
   width: 100%;
 }
</style>
