<template>
  <div>
    <v-form @submit.prevent="registration">
      <v-alert v-if="generalError" type="error" dismissible>
        {{ generalError }}
      </v-alert>
      <v-text-field
          v-model="user.name"
          label="Name"
          :error="!!errors.name"
          :error-messages="errors.name || []"
          required
      ></v-text-field>
      <v-text-field
          v-model="user.email"
          label="Email"
          :error="!!errors.email"
          :error-messages="errors.email || []"
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
        <v-btn color="primary" type="submit">Register</v-btn>
      </v-card-actions>
    </v-form>
  </div>
</template>

<script>
import {ref} from 'vue';
import {useAuthStore} from "../../stores/authStore.js";

export default {
  setup(_, { emit }) {
    const authStore = useAuthStore();
    const user = ref({name: "", email: "", password: ""});
    const generalError = ref(null);
    const errors = ref({});

    const registration = async () => {
      errors.value = {};
      generalError.value = null;

      try {
        await authStore.registration(user.value);
        emit("close-auth-popup");
      } catch (error) {
        generalError.value = error.message;
      }
    };

    return {
      user,
      generalError,
      errors,
      registration,
    };
  },
};
</script>
