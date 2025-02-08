<template>
  <div class="card flex gap-4">
    <div class="flex-1">
      <DataTable :value="users" class="w-full">
        <template #header>
          <div class="flex align-items-center justify-content-between">
            <p><i class="pi pi-users"></i> Foydalanuvchilar</p>
            <Button icon="pi pi-user-plus" label="Qo'shish" @click="dialog_create_user = true" />
          </div>
        </template>
        <Column field="id" header="ID" />
        <Column field="name" header="Ism" />
        <Column field="email" header="Email" />
        <Column field="age" header="Yosh" />
        <Column header="Amallar">
          <template #body="{ data, index }">
            <Button icon="pi pi-user-edit" label="Yangilash" @click="editUser(data)" />
            <Button icon="pi pi-trash" label="O'chirish" severity="warn" @click="users.splice(index, 1)" />
          </template>
        </Column>
      </DataTable>
    </div>

    <Dialog v-model:visible="dialog_create_user" modal header="Ma'lumotlarni kiritish" :style="{ width: '25rem' }">
      <p class="p-text-secondary block mb-5">Ma'lumotlaringizni yangilang.</p>
      <div class="mb-3">
        <label for="username" class="font-semibold">Ismingiz</label>
        <InputText v-model="form.name" class="w-full mt-1" placeholder="Ismingizni kiriting" />
        <small v-if="v$.name.$error" class="text-red-500">Ism majburiy</small>
      </div>
      <div class="mb-3">
        <label for="email" class="font-semibold">Email</label>
        <InputText type="email" v-model="form.email" class="w-full mt-1" placeholder="Emailingizni kiriting" />
        <small v-if="v$.email.$error" class="text-red-500">
          {{ v$.email.$errors[0].$message }}
        </small>
      </div>
      <div class="mb-3">
        <label for="age" class="font-semibold">Yoshingiz</label>
        <InputNumber v-model="form.age" :min="1" :max="100" class="w-full mt-1" placeholder="Yoshingizni kiriting" />
        <small v-if="v$.age.$error" class="text-red-500">Yosh 1 dan 100 gacha bo'lishi kerak</small>
      </div>
      <div class="mb-3">
        <label for="password" class="font-semibold">Parol</label>
        <Password v-model="form.password" class="w-full mt-1" toggleMask />
        <small v-if="v$.password.$error" class="text-red-500">Parol kamida 6 ta belgi bo'lishi kerak</small>
      </div>
      <div class="flex justify-content-end gap-2">
        <Button icon="pi pi-key" type="button" label="Confirm" />
        <Button icon="pi pi-times" type="button" label="Bekor qilish" severity="secondary" @click="dialog_create_user = false" />
        <Button icon="pi pi-check" type="button" label="Saqlash" @click="save()" />
      </div>
    </Dialog>
  </div>
</template>

<script setup>
import { ref, computed } from "vue";
import { useStore } from "vuex";
import InputText from "primevue/inputtext";
import Button from "primevue/button";
import DataTable from "primevue/datatable";
import Column from "primevue/column";
import { Dialog, InputNumber } from "primevue";
import Password from 'primevue/password';

// ✅ Vuelidate-ni import qilish
import useVuelidate from "@vuelidate/core";
import { required, email, minLength, between } from "@vuelidate/validators";

// Vuex store
const store = useStore();

// Reactive inputlar
const form = ref({ name: "", email: "", age: null, password: "" });
const dialog_create_user = ref(false);

// Vuex-dan foydalanuvchilar ro'yxatini olish
const users = computed(() => store.state.users);

// ✅ Validatsiya qoidalarini belgilash
const rules = {
  name: { required },
  email: { required, email },
  age: { required, between: between(1, 100) },
  password: { required, minLength: minLength(6) }
};

// ✅ Vuelidate validatsiyasini chaqirish
const v$ = useVuelidate(rules, form);

// Foydalanuvchini tahrirlash
function editUser(user) {
  form.value = { ...user };
  dialog_create_user.value = true;
}

// Foydalanuvchini saqlash
const save = () => {
  v$.value.$validate(); // ✅ Validatsiyani ishga tushirish
  if (v$.value.$error) return; // ❌ Xatolik bo'lsa, funksiyani to'xtatish

  if (form.value.id) {
    store.dispatch("updateUser", form.value);
  } else {
    store.dispatch("addUser", form.value);
  }

  localStorage.setItem("password", form.value.password);
  dialog_create_user.value = false;
  form.value = { name: "", email: "", age: null, password: "" };
  v$.value.$reset(); // ✅ Validatsiyani tozalash
};
</script>
