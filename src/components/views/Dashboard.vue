<template>
  <div id="dashboard">
    <section>
      <div class="col1">
        <div class="profile">
          <h5>{{ userProfile.name }}</h5>
          <p>{{ userProfile.title }}</p>
          <div class="create-post">
            <p>create a post</p>
            <form @submit.prevent>
              <textarea v-model.trim="post.content"/>
              <button
                :disabled="post.content == ''"
                class="button"
                @click="createPost">post</button>
            </form>
          </div>
        </div>
      </div>
      <div class="col2">
        <transition name="fade">
          <div
            v-if="hiddenPosts.length"
            class="hidden-posts"
            @click="showNewPosts">
            <p>
              Click to show <span class="new-posts">{{ hiddenPosts.length }}</span>
              new <span v-if="hiddenPosts.length > 1">posts</span><span v-else>post</span>
            </p>
          </div>
        </transition>
        <div v-if="posts.length">
          <div
            v-for="post in posts"
            :key="post.id"
            class="post">
            <h5>{{ post.userName }}</h5>
            <span>{{ post.createdOn | formatDate }}</span>
            <p>{{ post.content | trimLength }}</p>
            <ul>
              <li><a @click="openCommentModal(post)">comments {{ post.comments }}</a></li>
              <li><a @click="likePost(post.id, post.likes)">likes {{ post.likes }}</a></li>
              <li><a @click="viewPost(post)">view full post</a></li>
            </ul>
          </div>
        </div>
        <div v-else>
          <p class="no-results">There are currently no posts</p>
        </div>
      </div>
    </section>

    <!-- comment modal -->
    <transition name="fade">
      <div
        v-if="showCommentModal"
        class="c-modal">
        <div class="c-container">
          <a @click="closeCommentModal">X</a>
          <p>add a comment</p>
          <form @submit.prevent>
            <textarea v-model.trim="comment.content"/>
            <button
              :disabled="comment.content == ''"
              class="button"
              @click="addComment">add comment</button>
          </form>
        </div>
      </div>
    </transition>

    <!-- post modal -->
    <transition name="fade">
      <div
        v-if="showPostModal"
        class="p-modal">
        <div class="p-container">
          <a
            class="close"
            @click="closePostModal">X</a>
          <div class="post">
            <h5>{{ fullPost.userName }}</h5>
            <span>{{ fullPost.createdOn | formatDate }}</span>
            <p>{{ fullPost.content }}</p>
            <ul>
              <li><a>comments {{ fullPost.comments }}</a></li>
              <li><a>likes {{ fullPost.likes }}</a></li>
            </ul>
          </div>
          <div
            v-show="postComments.length"
            class="comments">
            <div
              v-for="(comment, index) in postComments"
              :key="index"
              class="comment">
              <p>{{ comment.userName }}</p>
              <span>{{ comment.createdOn | formatDate }}</span>
              <p>{{ comment.content }}</p>
            </div>
          </div>
        </div>
      </div>
    </transition>
  </div>
</template>

<script>
import { mapState } from 'vuex';
import moment from 'moment';

const fb = require('@/firebaseConfig');

export default {
  name: 'Dashboard',
  filters: {
    formatDate(val) {
      if (!val) { return '-'; }
      const date = val.toDate();
      return moment(date).fromNow();
    },
    trimLength(val) {
      if (val.length < 200) { return val; }
      return `${val.substring(0, 200)}...`;
    },
  },
  data() {
    return {
      post: {
        content: '',
      },
      comment: {
        postId: '',
        userId: '',
        content: '',
        postComments: 0,
      },
      showCommentModal: false,
      showPostModal: false,
      fullPost: {},
      postComments: [],
    };
  },
  computed: {
    ...mapState(['userProfile', 'currentUser', 'posts', 'hiddenPosts']),
  },
  methods: {
    createPost() {
      fb.postsCollection.add({
        createdOn: new Date(),
        content: this.post.content,
        userId: this.currentUser.uid,
        userName: this.userProfile.name,
        comments: 0,
        likes: 0,
      }).then(ref => {
        this.post.content = '';
      }).catch(err => {
        console.log(err);
      });
    },
    showNewPosts() {
      const updatedPostsArray = this.hiddenPosts.concat(this.posts);
      // clear hiddenPosts array and update posts array
      this.$store.commit('setHiddenPosts', null);
      this.$store.commit('setPosts', updatedPostsArray);
    },
    openCommentModal(post) {
      this.comment.postId = post.id;
      this.comment.userId = post.userId;
      this.comment.postComments = post.comments;
      this.showCommentModal = true;
    },
    closeCommentModal() {
      this.comment.postId = '';
      this.comment.userId = '';
      this.comment.content = '';
      this.showCommentModal = false;
    },
    addComment() {
      const { postId } = this.comment;
      const postComments = this.comment.postComments;

      fb.commentsCollection.add({
        createdOn: new Date(),
        content: this.comment.content,
        postId,
        userId: this.currentUser.uid,
        userName: this.userProfile.name,
      }).then(doc => {
        fb.postsCollection.doc(postId).update({
          comments: postComments + 1,
        }).then(() => {
          this.closeCommentModal();
        });
      }).catch(err => {
        console.log(err);
      });
    },
    likePost(postId, postLikes) {
      const docId = `${this.currentUser.uid}_${postId}`;

      fb.likesCollection.doc(docId).get().then(doc => {
        if (doc.exists) { return; }

        fb.likesCollection.doc(docId).set({
          postId,
          userId: this.currentUser.uid,
        }).then(() => {
          // update post likes
          fb.postsCollection.doc(postId).update({
            likes: postLikes + 1,
          });
        });
      }).catch(err => {
        console.log(err);
      });
    },
    viewPost(post) {
      fb.commentsCollection.where('postId', '==', post.id).get().then(docs => {
        const commentsArray = [];

        docs.forEach(doc => {
          const comment = doc.data();
          comment.id = doc.id;
          commentsArray.push(comment);
        });

        this.postComments = commentsArray;
        this.fullPost = post;
        this.showPostModal = true;
      }).catch(err => {
        console.log(err);
      });
    },
    closePostModal() {
      this.postComments = [];
      this.showPostModal = false;
    },
  },
};
</script>
