<template>
  <div>
    <v-form @submit.prevent="login">
      <v-alert v-if="generalError" type="error" dismissible>
        {{ generalError }}
      </v-alert>
      <v-text-field
          v-model="user.username"
          label="Username"
          :error="!!errors.username"
          :error-messages="errors.username || []"
          required
      ></v-text-field>
      <v-text-field
          v-model="user.password"
          label="Password"
          type="password"
          :error="!!errors.password"
          :error-messages="errors.password || []"
          required
      ></v-text-field>
      <v-card-actions>
        <v-btn color="primary" type="submit">Login</v-btn>
      </v-card-actions>
    </v-form>
  </div>
</template>

<script>
import { ref } from 'vue';
import { useAuthStore } from "../../stores/authStore.js";

export default {
  setup(_, { emit }) {
    const authStore = useAuthStore();
    const user = ref({ username: "", password: "" });
    const generalError = ref(null);
    const errors = ref({});

    const login = async () => {
      errors.value = {};
      generalError.value = null;

      try {
        await authStore.login(user.value);
        emit("close-auth-popup");
      } catch (error) {
        generalError.value = error.message;
      }
    };

    return {
      user,
      generalError,
      errors,
      login,
    };
  },
};
</script>
