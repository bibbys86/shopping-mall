<template>
  <v-app>
    <v-app-bar app color="primary" dark>
      <v-app-bar-title>Shopping Mall</v-app-bar-title>
      <v-spacer></v-spacer>
      <v-btn to="/" text>Home</v-btn>
      <v-btn to="/products" text>Products</v-btn>
      <v-btn to="/cart" text>Cart</v-btn>
      <v-btn to="/login" text v-if="!isLoggedIn">Login</v-btn>
      <v-btn to="/profile" text v-if="isLoggedIn">Profile</v-btn>
      <v-btn text v-if="isLoggedIn" @click="logout">Logout</v-btn>
    </v-app-bar>

    <v-main>
      <v-container fluid>
        <router-view></router-view>
      </v-container>
    </v-main>

    <v-footer app color="primary" dark>
      <v-row justify="center" no-gutters>
        <v-col class="text-center" cols="12">
          {{ new Date().getFullYear() }} — <strong>Shopping Mall</strong>
        </v-col>
      </v-row>
    </v-footer>
  </v-app>
</template>

<script>
export default {
  name: 'App',
  data: () => ({
    isLoggedIn: false
  }),
  methods: {
    logout() {
      // Implement logout logic
      this.isLoggedIn = false;
      this.$router.push('/login');
    }
  }
}
</script> 