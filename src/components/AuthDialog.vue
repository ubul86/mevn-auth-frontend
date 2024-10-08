<template>
  <v-dialog v-model="dialog" max-width="500" v-if="!isAuthenticated">
    <template v-slot:activator="{ props }">
      <v-btn color="primary" v-bind="props">
        Sign In / Register
      </v-btn>
    </template>

    <v-card>
      <v-card-title>
        <v-tabs v-model="activeTab" background-color="blue lighten-4" centered>
          <v-tab>Login</v-tab>
          <v-tab>Register</v-tab>
        </v-tabs>
      </v-card-title>

      <v-card-text>
        <v-tabs-items v-model="activeTab">
          <v-tab-item v-if="activeTab === 0">
            <LoginFormComponent @close-auth-popup="closeAuthPopup" />
          </v-tab-item>
          <v-tab-item v-if="activeTab === 1">
            <RegistrationFormComponent @close-auth-popup="closeAuthPopup" />
          </v-tab-item>
        </v-tabs-items>
      </v-card-text>

      <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn color="blue darken-1" text @click="dialog = false">Close</v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script>
import { ref, computed } from 'vue';
import { useAuthStore } from '../stores/authStore';
import LoginFormComponent from "./forms/LoginFormComponent.vue";
import RegistrationFormComponent from "./forms/RegistrationFormComponent.vue";

export default {
  components: {
    LoginFormComponent,
    RegistrationFormComponent,
  },
  setup() {
    const dialog = ref(false);
    const activeTab = ref(0);
    const authStore = useAuthStore();
    const isAuthenticated = computed(() => authStore.isAuthenticated);

    const closeAuthPopup = () => {
      dialog.value = false;
    };

    const logout = () => {
      authStore.logout();
    };

    return {
      dialog,
      activeTab,
      isAuthenticated,
      logout,
      closeAuthPopup,
    };
  },
};
</script>
