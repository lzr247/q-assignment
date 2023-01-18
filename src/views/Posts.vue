<script setup>
  import { onMounted, ref, computed } from 'vue';
  import { useRouter } from 'vue-router';
  import { fetchData } from '../utils/fetchData';
  import Post from '../components/Post.vue';

  const router = useRouter();

  const posts = ref([]);
  const comments = ref([]);
  const users = ref([]);
  const searchInput = ref('');

  onMounted(async () => {
    users.value = await fetchData('https://jsonplaceholder.typicode.com/users');
    posts.value = await fetchData('https://jsonplaceholder.typicode.com/posts');
    comments.value = await fetchData('https://jsonplaceholder.typicode.com/comments');

    // Connect users with posts and comments
    posts.value.forEach((post) => {
      post.comments = [];

      users.value.forEach((user) => {
        if (user.id === post.userId) {
          post.userData = user;
        }
      })

      comments.value.forEach((comment) => {
        if (post.id === comment.postId) {
          post.comments.push(comment);
        }
      })
    })
  })

  const filteredPosts = computed(() => {
    // Ensure posts state exist
    if (!posts.userData) {
      return posts.value;
    }
    return posts.value.filter(post => post.userData.name.toLowerCase().includes(searchInput.value.toLowerCase()));
  })

  const toPost = (postId) => {
    router.push(`/post/${postId}`);
  }
</script>

<template>
  <input type="text" v-model="searchInput">
  <div v-if="filteredPosts.length !== 0" class="posts">
    <Post v-for="post in filteredPosts" @click="toPost(post.id)" :postData="post" :comments="post.comments" />
  </div>
  <div v-else class="no-posts">
    No post match search input
  </div>
</template>