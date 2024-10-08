<template>
  <v-app>
    <v-app-bar app>
        <v-toolbar-title>My App</v-toolbar-title>
        <v-spacer></v-spacer>
        <AuthDialog v-if="!isAuthenticated" />
        <v-btn v-if="isAuthenticated" @click="logout">
          Logout
        </v-btn>
    </v-app-bar>
    <v-main>
      <v-container>

      </v-container>
    </v-main>
  </v-app>
</template>

<script>
  import AuthDialog from './components/AuthDialog.vue';

  import { computed } from 'vue';
  import { useAuthStore } from './stores/authStore';

  export default {
    components: {
      AuthDialog
    },
    setup() {
      const authStore = useAuthStore();
      const isAuthenticated = computed(() => authStore.isAuthenticated);

      const logout = () => {
        authStore.logout();
      };

      return {
        isAuthenticated,
        logout,
      };
    },
  };

</script>

<style scoped>
  .logo {
    height: 6em;
    padding: 1.5em;
    will-change: filter;
    transition: filter 300ms;
  }
  .logo:hover {
    filter: drop-shadow(0 0 2em #646cffaa);
  }
  .logo.vue:hover {
    filter: drop-shadow(0 0 2em #42b883aa);
  }
</style>
