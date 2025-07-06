
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
            <v-avatar size="36" class="mr-2" style="min-width: 36px;">
  <img src="/_nuxt/assets/avatar/boy.png" alt="avatar" style="object-fit: cover;" />
</v-avatar>
            <div>
              <small class="text-grey">{{ user.nama }}</small>
            </div>
          </div>
          <v-menu offset-y>
                    <template #activator="{ on, attrs }">
                        <v-btn icon v-bind="attrs" v-on="on">
                        <v-icon>mdi-dots-horizontal</v-icon>
                        </v-btn>
                    </template>

                    <v-list>
                        <v-list-item @click="logout">
                        <v-list-item-title>Logout</v-list-item-title>
                        </v-list-item>
                    </v-list>
                    </v-menu>
        </v-card-title>
  
        <!-- Image -->
        <v-img
         v-if="postItem.is_post"
          :src="`${postItem.path_image}`"
          height="400"
          class="rounded-0"
          cover
        ></v-img>
  
        <!-- Action -->
        <v-card-actions>
          <v-btn icon @click="toggleLike(postItem)" v-if="postItem.is_like">
            <v-icon :color="postItem.likedByCurrentUser ? 'red' : ''">mdi-heart</v-icon>
          </v-btn>
          <v-btn icon v-if="postItem.is_komentar">
            <v-icon>mdi-comment-outline</v-icon>
          </v-btn>
          <span class="ml-2">{{ postItem.likes || 0 }} suka</span>
        </v-card-actions>
        <v-card-text v-if="postItem.is_post">
  <p class="mb-4">{{ postItem.deskripsi }}</p>

  <!-- Daftar Komentar -->
  <div
    v-for="(comment, i) in postItem.komentar || []"
    :key="i"
    class="d-flex align-start mb-3"
  >
    <!-- <v-avatar size="30" class="mr-2">
      <img src="/_nuxt/assets/avatar/boy.png" alt="avatar" />
    </v-avatar> -->
    <v-avatar size="36" class="mr-2" style="min-width: 36px;">
  <img src="/_nuxt/assets/avatar/boy.png" alt="avatar" style="object-fit: cover;" />
</v-avatar>
    <div class="rounded px-3 py-2" style="background-color: #f5f5f5; width: 100%;">
      <strong>{{ comment.nama_user }}</strong>
      <small class="text-grey text-caption">{{ comment.created_at }}</small>
      <div class="text-body-2">{{ comment.komentar }}</div>
    </div>
  </div>

  <!-- Input Komentar -->
  <v-text-field
    v-if="postItem.is_komentar"
    v-model="commentInput"
    placeholder="Tulis komentar..."
    dense
    hide-details
    append-icon="mdi-send"
    :readonly="!user"
    @click:append="submitComment(postItem)"
    @focus="checkLogin"
    class="mt-2"
    solo
    rounded
  />
</v-card-text>

      </v-card>
      <confirm-modal-dialog ref="confirm" />
    </div>
    
  </template>
  

<script>
import { mapGetters } from "vuex";
import ConfirmModalDialog from "@/components/custom/ConfirmModalDialog";
export default {
    components: {
    ConfirmModalDialog,
  },
  data() {
    return {
      commentInput: '',
      post :[],
      postKomentar :[]
    };
  },


  computed: {
    ...mapGetters({
      user: "auth/user",
    }),
},
  created() {
    this.getAllPost();
  },
  methods: {
    async logout() {
      if (
        await this.$refs.confirm.open(
          "Logout",
          "Apakah Anda yakin akan logout?"
        )
      ) {
        this.$store.dispatch('auth/logout')
      }
    },
async getAllPost() {
  this.loading = true;

  try {
    const response = await this.$axios.$get('/ig',{
        params: {
            user_id: this.user?.id
        }
    });

    if (response.success === true) {
      this.post = response.data;  
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

async toggleLike(post) {
  const namaUser = this.user?.nama;
  if (!namaUser) {
    this.$router.push('/'); // redirect kalau belum login
    return;
  }

  const sudahLike = post.likedByCurrentUser;

  // Update like count
  post.likes += sudahLike ? -1 : 1;
  post.likedByCurrentUser = !sudahLike;

  // Simpan ke backend
  await this.$axios.$post(`/postIg-like`, {
    post_ig_id: post.id,
    user_id: this.user.id 
  });
  this.getAllPost
},


  async submitComment(post) {
    // Validasi: jika belum login, redirect ke login
    if (!this.user || !this.user.id) {
      this.$router.push('/');
      return;
    }

    if (!this.commentInput) return;

    const komentarBaru = {
      post_ig_id: post.id,
      nama_user: this.user.nama || 'Anda', // Ganti sesuai field nama di user
      komentar: this.commentInput
    };

    try {
      await this.$axios.$post('/postIg-komentar', komentarBaru);
      this.commentInput = '';
      this.getAllPost()
    } catch (error) {
      console.error('Gagal kirim komentar:', error);
    }
  },
  checkLogin() {
  if (!this.user || !this.user.id) {
    this.$router.push('/');
  }
}
  }
};
</script>
