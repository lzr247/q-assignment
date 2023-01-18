<script setup>
  import { onMounted, ref, computed } from 'vue';
  import { useRouter } from 'vue-router';
  import { fetchData } from '../utils/fetchData';
  import Post from '../components/Post.vue';

  const router = useRouter();

  const posts = ref([]);
  const postsTemp = ref([]);
  const comments = ref([]);
  const users = ref([]);
  const searchInput = ref('');

  onMounted(async () => {
    users.value = await fetchData('https://jsonplaceholder.typicode.com/users');
    postsTemp.value = await fetchData('https://jsonplaceholder.typicode.com/posts');
    comments.value = await fetchData('https://jsonplaceholder.typicode.com/comments');

    // Connect users with posts and comments
    postsTemp.value.forEach((post) => {
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

    // Set up temporary so we don't trigger computed for changing posts until the end
    posts.value = postsTemp.value;
  })

  const filteredPosts = computed(() => {
    return posts.value.filter(post => post.userData.name.toLowerCase().includes(searchInput.value.toLowerCase()));
  })

  const toPost = (postId) => {
    router.push(`/post/${postId}`);
  }

</script>

<template>
  <div class="search-post">
    <h2>Search for the post/s from a certain user</h2>
    <input type="text" v-model="searchInput">
  </div>

  <div
    v-if="filteredPosts.length !== 0" 
    class="posts"
  >
    <Post 
      v-for="post in filteredPosts" 
      :key="post.id"
      @click="toPost(post.id)" 
      :postData="post" 
      :comments="post.comments" 
    />
  </div>
  <div v-else class="no-posts">
    No post match search input
  </div>
</template>

<style scoped>
  .search-post {
    border: 2px solid var(--color-primary);
    border-radius: 12px;
    padding: 14px 18px;
    background-color: var(--color-white);
    color:  var(--color-secondary);
    margin-bottom: 20px;
  }

  .search-post input[type=text] {
    width: 100%;
    padding: 12px 20px;
    margin: 8px 0;
    display: inline-block;
    border: 2px solid var(--color-tertiary);
    border-radius: 4px;
    box-sizing: border-box;
    font-size: 16px;
  }

  .search-post input:focus {
    outline: none;
    border: 2px solid var(--color-secondary);
  }
</style>