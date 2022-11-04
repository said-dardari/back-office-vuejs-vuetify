<template>
  <v-app id="inspire">
    <v-main>
      <v-container fluid fill-height>
        <v-layout align-center justify-center>
          <v-flex xs12 sm8 md4>
            <v-card class="elevation-12">
              <v-toolbar dark color="primary">
                <v-toolbar-title>Login form</v-toolbar-title>
                <v-spacer></v-spacer>


              </v-toolbar>
              <v-card-text>
                <v-form>
                  <v-alert
                           v-model="alert"
                           color="red"
                           dense
                           outlined
                           dismissible
                           prominent
                           text
                           type="error"
                  >   {{ message.message }}   </v-alert>
                  <v-text-field prepend-icon="mdi-account" name="login"  label="Login" type="text" v-model="form.email"></v-text-field>
                  <v-text-field id="password" prepend-icon="mdi-lock" name="password" label="Password" type="password" v-model="form.password"></v-text-field>
                </v-form>
              </v-card-text>
              <v-card-actions>
                <v-spacer></v-spacer>
                <v-btn color="primary" @click.prevent="login">Login</v-btn>
              </v-card-actions>
            </v-card>
          </v-flex>
        </v-layout>
      </v-container>
    </v-main>
  </v-app>
</template>

<script>
import User from "@/apis/User";

export default {
  name: "LoginComponent",
  data() {
    return {
      form: {
        email: "",
        password: "",
        device_name: "browser",
      },
      errors: [],
      message: [],
      drawer: null,
      alert:false,
    };
  },
  props: {
    source: String
  },
created() {
  this.$store.commit('SET_LAYOUT', 'simple-layout')
},
  methods: {
    login() {
      User.login(this.form)
          .then((response) => {
            this.$root.$emit("login", true);
            localStorage.setItem('token', response.data.token);
            this.$router.push({ name: "home" });
          })
          .catch(error => {
            if (error.response.status === 422) {
              this.errors = error.response.data.errors;
            } else if (error.response.status === 401) {
              this.message = error.response.data;
              this.alert = true;
            }
          });
    },

  }
};
</script>
<style scoped>
</style>