<template>
  <section id="settings">
    <div class="col1">
      <h3>Settings</h3>
      <p>Update your profile</p>

      <transition name="fade">
        <p
          v-if="showSuccess"
          class="success">profile updated</p>
      </transition>

      <form @submit.prevent>
        <label for="name">Name</label>
        <input
          id="name"
          v-model.trim="name"
          :placeholder="userProfile.name"
          type="text" >

        <label for="title">Job Title</label>
        <input
          id="title"
          v-model.trim="title"
          :placeholder="userProfile.title"
          type="text" >

        <button
          class="button"
          @click="updateProfile">Update Profile</button>
      </form>
    </div>
  </section>
</template>

<script>
import { mapState } from 'vuex';

export default {
  data() {
    return {
      name: '',
      title: '',
      showSuccess: false,
    };
  },
  computed: {
    ...mapState(['userProfile']),
  },
  methods: {
    updateProfile() {
      this.$store.dispatch('updateProfile', {
        name: this.name !== '' ? this.name : this.userProfile.name,
        title: this.title !== '' ? this.title : this.userProfile.title,
      });
      this.name = '';
      this.title = '';
      this.showSuccess = true;
      setTimeout(() => { this.showSuccess = false; }, 2000);
    },
  },
};
</script>
