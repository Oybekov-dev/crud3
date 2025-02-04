<template>
  <div class="card flex gap-4">
    <div class="flex-1">
      <!-- Foydalanuvchilar jadvali -->
      <DataTable :value="users" class="w-full">
        <template #header>
          <div class="flex align-items-center justify-content-between">
            <p><i class="pi pi-users"></i> Foydalanuvchilar</p>
            <Button icon="pi pi-user-plus" label="Qo'shish" @click="openDialog()" />
          </div>
        </template>

        <Column field="id" header="ID" />
        <Column field="name" header="Ism" />
        <Column field="email" header="Email" />
        <Column field="age" header="Yosh" />
        <Column header="Amallar">
          <template #body="{ data, index }">
            <Button icon="pi pi-user-edit" label="Yangilash" @click="editUser(data)" />
            <Button icon="pi pi-trash" label="O'chirish" severity="warn" @click="removeUser(index)" />
          </template>
        </Column>
      </DataTable>
    </div>

    <!-- Foydalanuvchi qo'shish/yangi qilish oynasi -->
    <Dialog v-model:visible="dialogVisible" modal header="Foydalanuvchi ma'lumotlari" :style="{ width: '25rem' }">
      <p class="p-text-secondary block mb-5">Iltimos, kerakli ma'lumotlarni kiriting.</p>

      <div class="mb-3">
        <label class="font-semibold">Ism</label>
        <InputText v-model="form.name" class="w-full mt-1" placeholder="Ismingizni kiriting" />
        <small v-if="v$.name.$error" class="text-red-500">⚠️ Ism majburiy va kamida 3 ta belgi bo‘lishi kerak!</small>
      </div>

      <div class="mb-3">
        <label class="font-semibold">Email</label>
        <InputText type="email" v-model="form.email" class="w-full mt-1" placeholder="Emailingizni kiriting" />
        <small v-if="v$.email.$error" class="text-red-500">⚠️ To‘g‘ri email kiriting!</small>
      </div>

      <div class="mb-3">
        <label class="font-semibold">Yosh</label>
        <InputNumber v-model="form.age" :min="1" :max="100" class="w-full mt-1" placeholder="Yoshingizni kiriting" />
        <small v-if="v$.age.$error" class="text-red-500">⚠️ Yosh majburiy!</small>
      </div>

      <div class="mb-3">
        <label class="font-semibold">Parol</label>
        <Password v-model="form.password" class="w-full mt-1" toggleMask />
        <small v-if="v$.password.$error" class="text-red-500">⚠️ Parol kamida 6 ta belgidan iborat bo‘lishi kerak!</small>
      </div>

      <div class="flex justify-content-end gap-2">
        <Button icon="pi pi-times" label="Bekor qilish" severity="secondary" @click="dialogVisible = false" />
        <Button icon="pi pi-check" label="Saqlash" @click="saveUser()" />
      </div>
    </Dialog>
  </div>
</template>

<script setup>
import { ref, computed } from "vue";
import { useStore } from "vuex";
import useVuelidate from "@vuelidate/core";
import { required, email, minLength, maxLength } from "@vuelidate/validators";
import InputText from "primevue/inputtext";
import Button from "primevue/button";
import DataTable from "primevue/datatable";
import Column from "primevue/column";
import { Dialog, InputNumber } from "primevue";
import Password from "primevue/password";

// Vuex do‘konidan foydalanish
const store = useStore();
const users = computed(() => store.state.users);

// Modal oynani boshqarish
const dialogVisible = ref(false);

// Foydalanuvchi formasi
const form = ref({
  name: "",
  email: "",
  age: null,
  password: "",
});

// Vuelidate uchun validatsiya qoidalari
const rules = {
  name: { required, minLength: minLength(3), maxLength: maxLength(20) },
  email: { required, email },
  age: { required },
  password: { required, minLength: minLength(6) },
};

// Vuelidate ishlatish
const v$ = useVuelidate(rules, form);

// **Foydalanuvchini qo‘shish dialogini ochish**
const openDialog = () => {
  form.value = { name: "", email: "", age: null, password: "" };
  dialogVisible.value = true;
};

// **Foydalanuvchini tahrirlash**
const editUser = (user) => {
  form.value = { ...user };
  dialogVisible.value = true;
};

// **Foydalanuvchini o‘chirish**
const removeUser = (index) => {
  store.dispatch("removeUser", index);
};

// **Foydalanuvchini saqlash**
const saveUser = () => {
  v$.value.$touch(); // Validatsiyani ishga tushiramiz

  if (v$.value.$invalid) {
    return;
  }

  if (form.value.id) {
    store.dispatch("updateUser", form.value);
  } else {
    store.dispatch("addUser", form.value);
  }

  localStorage.setItem("password", form.value.password);
  dialogVisible.value = false;
  form.value = { name: "", email: "", age: null, password: "" };
};
</script>
