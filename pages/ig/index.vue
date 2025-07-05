
<template>
    <div>
      <v-card
        v-for="(postItem, index) in post"
        :key="index"
        class="mb-6"
        elevation="2"
        rounded="lg"
      >
        <!-- Header -->
        <v-card-title class="d-flex justify-space-between">
          <div class="d-flex align-center">
            <v-avatar size="36" class="mr-3">
              <img src="/_nuxt/assets/avatar/boy.png" alt="avatar" />
            </v-avatar>
            <div>
              <small class="text-grey">{{ postItem.created_at }}</small>
            </div>
          </div>
          <v-btn icon>
            <v-icon>mdi-dots-horizontal</v-icon>
          </v-btn>
        </v-card-title>
  
        <!-- Image -->
        <v-img
          :src="`${postItem.path_image}`"
          height="400"
          class="rounded-0"
          cover
        ></v-img>
  
        <!-- Action -->
        <v-card-actions>
          <v-btn icon @click="toggleLike(postItem)">
            <v-icon :color="postItem.liked ? 'red' : ''">mdi-heart</v-icon>
          </v-btn>
          <v-btn icon>
            <v-icon>mdi-comment-outline</v-icon>
          </v-btn>
          <span class="ml-2">{{ postItem.likes || 0 }} suka</span>
        </v-card-actions>
  
        <v-card-text>
          <p class="mb-2">{{ postItem.deskripsi }}</p>
  
          <div
            v-for="(comment, i) in postItem.komentar || []"
            :key="i"
            class="mb-1"
          >
            <strong>{{ comment.user }}</strong>: {{ comment.text }}
          </div>
  
          <v-text-field
            v-model="commentInput"
            label="Tulis komentar..."
            dense
            hide-details
            append-icon="mdi-send"
            @click:append="submitComment(postItem)"
          />
        </v-card-text>
      </v-card>
    </div>
  </template>
  

<script>
export default {
  
  data() {
    return {
      commentInput: '',
      post :[]
    };
  },

  created() {
    this.getAllPost();
  },
  methods: {

    async getAllPost() {
  this.loading = true;

  try {
    const response = await this.$axios.$get('/ig');

    if (response.success === true) {
      this.post = response.data;  // Asumsinya API return { success: true, data: [...] }
      this.loading = false;
    } else {
      this.loading = false;
      this.swalAlert('Gagal memuat post', 'error', response.message);
    }
  } catch (error) {
    console.log('Get Post error:', error);
    this.loading = false;
    this.swalAlert('Kesalahan Server', 'error', 'Tidak dapat mengambil data post');
  }
},

    toggleLike(post) {
      post.liked = !post.liked;
      post.likes += post.liked ? 1 : -1;
      // TODO: Panggil API like/unlike
    },
    submitComment(post) {
      if (!this.commentInput) return;
      // TODO: Panggil API komentar
      post.komentar.push({
        user: 'Anda',
        text: this.commentInput
      });
      this.commentInput = '';
    }
  }
};
</script>
