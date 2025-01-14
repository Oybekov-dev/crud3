<template>
  <div class="card flex gap-4">
    <!-- Inputlar bo'limi -->
    <div class="flex flex-col gap-4">
      <InputText type="text" v-model="name" placeholder="Ismingizni kiriting" />
      <InputText type="email" v-model="email" placeholder="Emailingizni kiriting" />
      <InputText type="number" v-model="age" placeholder="Yoshingizni kiriting" />
      <Button label="Jo'natish" @click="clickSubmit" />
    </div>

    <!-- Jadval bo'limi -->
    <div class="flex-1">
      <DataTable :value="users" class="w-full">
        <Column field="id" header="ID" />
        <Column field="name" header="Ism" />
        <Column field="email" header="Email" />
        <Column field="age" header="Yosh" />
        <Column header="Amallar">
  <template>
    <Button label="Yangilash" class="p-button-warning"/>
    <Button label="O'chirish" class="p-button-danger"/>
  </template>
</Column>

      </DataTable>
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue';
import InputText from 'primevue/inputtext';
import Button from 'primevue/button';
import DataTable from 'primevue/datatable';
import Column from 'primevue/column';
import { useStore } from 'vuex';

// Vuex do'konidan foydalanish
const store = useStore();

// Reactive inputlar
const name = ref('');
const email = ref('');
const age = ref(null);
const editingUser = ref(null); // Hozirgi tahrirlanayotgan foydalanuvchi

// Vuex do'konidan foydalanuvchilarni olish
const users = computed(() => store.state.users);

// Formani yuborish funksiyasi
function clickSubmit() {
  if (name.value === '' || email.value === '' || age.value === null) {
    alert("Barcha inputlarni to'ldiring");
  } else {
    const newUser = {
      id: editingUser.value ? editingUser.value.id : users.value.length + 1,
      name: name.value,
      email: email.value,
      age: age.value
    };
    
    if (editingUser.value) {
      store.dispatch('updateUser', newUser);
      editingUser.value = null;
    } else {
      store.dispatch('addUser', newUser);
    }
    
    name.value = '';
    email.value = '';
    age.value = null;
  }
}

// Foydalanuvchini tahrirlash funksiyasi
function editUser(user) {
  name.value = user.name;
  email.value = user.email;
  age.value = user.age;
  editingUser.value = user;
}

function removeUser(userId) {
  store.dispatch('deleteUser', userId);
}

</script>

<style scoped>
.card {
  padding: 16px;
  background-color: #dbe2e2;
  border-radius: 8px;
}
.flex {
  display: flex;
}
.flex-col {
  flex-direction: column;
}
.gap-4 {
  gap: 16px;
}
.flex-1 {
  flex: 1;
}
.w-full {
  width: 100%;
}
</style>
