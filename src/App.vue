<template>
  <Menubar :model="items">
    <template #end>
      <div v-if="isLoggedIn" class="user-info flex items-center gap-2">
        <i class="pi pi-user text-blue-500"></i>
        <span>{{ username }}</span>
        <Button label="Logout" severity="danger" @click="handleLogout" />
      </div>
      <Login v-else @login-success="updateUser" />
    </template>
  </Menubar>
  <router-view />
</template>

<script setup>
import { ref, onMounted } from "vue";
import { useRouter } from "vue-router";
import Menubar from "primevue/menubar";
import Button from "primevue/button";
import Login from "@/components/Login.vue";

// Reaktiv o‘zgaruvchilar
const router = useRouter();
const isLoggedIn = ref(false);
const username = ref("");

// Sahifa yuklanganda foydalanuvchi borligini tekshirish
onMounted(() => {
  const savedUsername = localStorage.getItem("username");
  if (savedUsername) {
    username.value = savedUsername;
    isLoggedIn.value = true;
  }
});

// Login muvaffaqiyatli bo‘lsa, username yangilash
function updateUser(user) {
  username.value = user;
  isLoggedIn.value = true;
}

// Logout funksiyasi
function handleLogout() {
  localStorage.removeItem("username");
  username.value = "";
  isLoggedIn.value = false;
}

// Menyular
const items = ref([
  { label: "Home", icon: "pi pi-home", command: () => router.push("/") },
  { label: "About", icon: "pi pi-lightbulb", command: () => router.push("/about") },
]);
</script>

<style scoped>
.user-info {
  display: flex;
  align-items: center;
  gap: 10px;
  font-weight: bold;
}
</style>
