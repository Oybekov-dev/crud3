import { createStore } from "vuex";

const store = createStore({
  state() {
    return {
      users: [],
    };
  },
  mutations: {
    addUser(state, user) {
      state.users.push({ ...user, id: Date.now() });
    },
    updateUser(state, updatedUser) {
      const index = state.users.findIndex((user) => user.id === updatedUser.id);
      if (index !== -1) {
        state.users[index] = updatedUser;
      }
    },
    deleteUser(state, userId) {
      state.users = state.users.filter((user) => user.id !== userId);
    },
  },
  actions: {
    addUser({ commit }, user) {
      commit("addUser", user);
    },
    updateUser({ commit }, updatedUser) {
      commit("updateUser", updatedUser);
    },
    deleteUser({ commit }, userId) {
      commit("deleteUser", userId);
    },
  },
});

export default store;