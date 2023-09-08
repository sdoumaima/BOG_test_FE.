import { createStore } from "vuex";

export default createStore({
  state: {
    users: [],
    posts: [],
    isLogin: false,
  },

  getters: {
    getUsers: (state) => state.users,
    getPosts: (state) => state.posts,
  },

  mutations: {
    SET_USERS(state, data) {
      state.users = data;
    },
    SET_POSTS(state, data) {
      state.posts = data;
    },
    SET_IS_LOGIN(state, value) {
      state.isLogin = value;
    },
  },

  actions: {
    async fetchUsers({ commit }) {
      try {
        const response = await fetch(
          "https://jsonplaceholder.typicode.com/users"
        );
        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }
        const data = await response.json();
        commit("SET_USERS", data);
      } catch (err) {
        console.error(err);
      }
    },

    async fetchPosts({ commit }) {
      try {
        const postResponse = await fetch(
          "https://jsonplaceholder.typicode.com/posts"
        );
        if (!postResponse.ok) {
          throw new Error(`HTTP error! Status: ${postResponse.status}`);
        }
        const postsData = await postResponse.json();

        const usersResponse = await fetch(
          "https://jsonplaceholder.typicode.com/users"
        );

        if (!usersResponse.ok) {
          throw new Error(`HTTP error! Status: ${usersResponse.status}`);
        }

        const usersData = await usersResponse.json();

        const postsWithOwners = postsData.map((post) => {
          const user = usersData.find((user) => user.id === post.userId);
          return { ...post, user };
        });

        commit("SET_POSTS", postsWithOwners);
      } catch (err) {
        console.error(err);
      }
    },
  },

  modules: {},
});
