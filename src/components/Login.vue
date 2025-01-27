<template>
  <div class="card2 flex justify-center">
    <!-- Login tugmasi -->
    <Button label="Login" icon="pi pi-user" @click="showDialog" />

    <!-- Login dialog oynasi -->
    <Dialog
      v-model:visible="visible"
      modal
      header="Sign In"
      :style="{ width: '25rem' }"
    >
      <template #container="{ closeCallback }">
        <div class="login-container">
          <svg
            width="35"
            height="40"
            viewBox="0 0 35 40"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            class="block mx-auto"
          >
            <path
              d="M25.87 18.05L23.16 17.45L25.27 20.46V29.78L32.49 23.76V13.53L29.18 14.73L25.87 18.04V18.05ZM25.27 35.49L29.18 31.58V27.67L25.27 30.98V35.49ZM20.16 17.14H20.03H20.17H20.16ZM30.1 5.19L34.89 4.81L33.08 12.33L24.1 15.67L30.08 5.2L30.1 5.19ZM5.72 14.74L2.41 13.54V23.77L9.63 29.79V20.47L11.74 17.46L9.03 18.06L5.72 14.75V14.74ZM9.63 30.98L5.72 27.67V31.58L9.63 35.49V30.98ZM4.8 5.2L10.78 15.67L1.81 12.33L0 4.81L4.79 5.19L4.8 5.2ZM24.37 21.05V34.59L22.56 37.29L20.46 39.4H14.44L12.34 37.29L10.53 34.59V21.05L12.42 18.23L17.45 26.8L22.48 18.23L24.37 21.05ZM22.85 0L22.57 0.69L17.45 13.08L12.33 0.69L12.05 0H22.85Z"
              fill="var(--p-primary-700)"
            />
          </svg>
          <div class="login-form">
            <div class="input-group">
              <label for="username" class="font-semibold text-primary-50"
                >Username</label
              >
              <InputText
                id="username"
                class="p-inputtext-sm"
                placeholder="Enter your username"
                v-model="form.username"
              />
            </div>
            <div class="input-group">
              <label for="password" class="font-semibold text-primary-50"
                >Password</label
              >
              <InputText
                id="password"
                type="password"
                class="p-inputtext-sm"
                placeholder="Enter your password"
                v-model="form.password"
              />
            </div>
            <div class="btns flex justify-end gap-2 mt-4">
              <Button
                label="Cancel"
                severity="secondary"
                @click="closeCallback"
              />
              <Button label="Sign-In" @click="handleLogin" />
              <!-- Foydalanuvchi nomini ko'rsatish -->
              <h1>{{ form.username }}</h1>
            </div>
          </div>
        </div>
      </template>
    </Dialog>
  </div>
</template>

<script setup>
import { ref } from "vue";
import InputText from "primevue/inputtext";
import Button from "primevue/button";
import Dialog from "primevue/dialog";

// Reaktiv o'zgaruvchilar
const visible = ref(false);
const form = ref({
  username: "",
  password: "",
});

// Login funksiyasi
function handleLogin() {
  console.log("Username:", form.value.username);
  console.log("Password:", form.value.password);
}

// Dialogni ko'rsatish funksiyasi
function showDialog() {
  visible.value = true;
}
</script>

<style scoped>
.login-container {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  background: linear-gradient(
    135deg,
    rgb(136, 136, 138) 0%,
    rgb(122, 121, 122) 100%
  );
  padding: 20px;
  border-radius: 15px;
}

.login-form {
  display: flex;
  flex-direction: column;
  gap: 1rem;
  width: 100%;
}

.input-group {
  display: flex;
  flex-direction: column;
}

.input-group label {
  font-size: 14px;
  color: var(--p-primary-50);
}

.input-group input {
  background: rgba(255, 255, 255, 0.2);
  color: var(--p-primary-50);
  border-radius: 8px;
  border: 1px solid rgba(255, 255, 255, 0.4);
  padding: 10px;
}

button {
  padding: 10px 20px;
  border-radius: 8px;
}

.btns {
  gap: 5px;
}
</style>
