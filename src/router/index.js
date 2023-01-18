import { createRouter, createWebHistory } from 'vue-router';
import Posts from '../views/Posts.vue';
import SinglePost from '../views/SinglePost.vue';

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      redirect: '/posts'
    },
    {
      path: '/posts',
      name: 'posts',
      component: Posts
    },
    {
      path: '/post/:id',
      name: 'single-post',
      component: SinglePost
    },
  ]
})

export default router;
