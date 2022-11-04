import Api from "./Api";

export default {
  register(form) {
    return Api().post("/register", form);
  },

  login(form) {
    return Api().post("/login", form);
  },

  async logout() {
    return Api().post("/logout");
  },

  auth() {
    return Api().get("/user");
  },
  updateprofil(user) {
    return Api().post(`/users/${user.id}`, user);
  },
  updatePassword(user){
    return Api().post(`/updatepassword/${user.id}`, user);
  }

  // async auth() {
  //   const token = localStorage.getItem("token");
  //   return Api.get("/user", {
  //     headers: {
  //       "Content-Type": "application/json",
  //       Authorization: "Bearer " + token,
  //     },
  //   });
  // },
};
