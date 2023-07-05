<template>
  <v-form ref="formRef" v-model="valid" lazy-validation>
    <v-card class="mx-auto" max-width="368">
      <v-card-title>{{ $t("logIn") }}</v-card-title>

      <v-card-text>
        <v-text-field
          v-model="email"
          variant="outlined"
          :rules="[(v) => !!v || 'Item is required']"
          :label="$t('email')"
          data-testid="email"
          required
        ></v-text-field>
        <v-text-field
          v-model="password"
          type="password"
          variant="outlined"
          :rules="[(v) => !!v || 'Item is required']"
          :label="$t('password')"
          data-testid="password"
          required
        ></v-text-field>
      </v-card-text>

      <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn
          color="primary"
          @click="submit"
          :loading="isSubmitting"
          :disabled="isSubmitting"
          data-testid="loginBtn"
          >{{ $t("logIn") }}</v-btn
        >
      </v-card-actions>
    </v-card>
  </v-form>
</template>

<script setup lang="ts">
import { useRouter } from "vue-router";
import { ref } from "vue";

const router = useRouter();
const formRef = ref();
const valid = ref(false);
const email = ref("");
const password = ref("");
const isSubmitting = ref(false);

function submit() {
  (formRef?.value as any).validate().then((val: any) => {
    if (val.valid) {
      isSubmitting.value = true;
      router.push({
        name: "Main",
      });
    }
  });
}
</script>
