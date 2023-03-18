# genesis_learning_app

## Build Setup

```bash
# install dependencies
$ npm install

# serve with hot reload at localhost:3000
$ npm run dev

# build for production and launch server
$ npm run build
$ npm run start

# generate static project
$ npm run generate
```

For detailed explanation on how things work, check out the [documentation](https://nuxtjs.org).

## Description of the workflow

 1. The development of the application `genesis_learning_app` began to familiarize myself with the task, after reading it, and seeing the priorities, began to create a repository.
 2. Deployed the application template on Nuxt, use `npx nuxi init <project-name>`.
3. I added libraries necessary for the work, such as `vuetyfy` and `nuxt/axios`.
4. The next step is to describe `Vuex` methods for working with the API and getting the necessary information.
5. I encountered a problem with `CORS` security policies, I had to solve this problem with the help of `proxy` pads.
6. Then I began to create the visual and logical components of the `CoursesList` component.
7. Then I began to create the visual and logical components of the `Course` component.
8. Having trouble playing streaming video). Для решения єтой проблемы использовал библиотеку `Hls.js`
9. Then it was decided to put `<video>` into a separate component `VideoPlayer`, and to put the logic for playing and committing the process to `localStorage`, into it.
10. Next I added the video playback functionality on `hover`.
