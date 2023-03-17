<template>
  <v-app dark>
    <v-navigation-drawer
      v-model="drawer"
      fixed
      app
    >
      <v-list>
        <v-list-item
          v-for="(item, i) in items"
          :key="i"
          :to="item.to"
          router
          exact
        >
          <v-list-item-action>
            <v-icon>{{ item.icon }}</v-icon>
          </v-list-item-action>
          <v-list-item-content>
            <v-list-item-title v-text="item.title" />
          </v-list-item-content>
        </v-list-item>
      </v-list>
    </v-navigation-drawer>
    <v-app-bar
      fixed
      app
    >
      <v-app-bar-nav-icon @click.stop="drawer = !drawer" />
      <v-toolbar-title v-text="title" />
    </v-app-bar>
    <v-main>
      <v-container>
        <Nuxt />
      </v-container>
    </v-main>
    <v-footer
      app
    >
      <span>&copy; {{ new Date().getFullYear() }}</span>
    </v-footer>
  </v-app>
</template>

<script>
import {mapActions, mapGetters} from "vuex";

export default {
  name: 'DefaultLayout',
  data () {
    return {
      drawer: false,
      items: [
        {
          icon: 'mdi-apps',
          title: 'Main',
          to: '/'
        },
        {
          title: 'Course',
          to: '/courses/allCourses'
        }
      ],
      title: 'Genesis_learning_app'
    }
  },
  // async fetch() {
  //   await this.$store.dispatch('courses/getCourses')
  // },
  computed: {
    ...mapGetters('courses', ['allCourses', 'isShowPreloader'])
  },
  // beforeMount() {
  //   this.fetchCourses()
  // },
  methods: {
    ...mapActions('courses', ['fetchCourses'])
  }
}
</script>
