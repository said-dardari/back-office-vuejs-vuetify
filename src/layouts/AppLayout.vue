

<template>
  <v-app id="inspire">
    <v-navigation-drawer  v-model="drawer" app>
      <v-list-item>
        <v-list-item-content>
          <v-list-item-title class="text-h6">
            Msafar
          </v-list-item-title>
          <v-list-item-subtitle>
            Administration
          </v-list-item-subtitle>
        </v-list-item-content>
      </v-list-item>

      <v-divider></v-divider>

      <v-list>
      <v-list-group        
        v-for="item in items"
        :key="item.title"
        v-model="item.active"
        :prepend-icon="item.action"
        no-action
      >
        <template v-slot:activator>
          
          <v-list-item-icon>
            <v-icon>{{ item.icon }}</v-icon>
          </v-list-item-icon>

          <v-list-item-content>
            <v-list-item-title v-text="item.title"></v-list-item-title>
          </v-list-item-content>
        </template>

        <v-list-item
          v-for="child in item.items"
          :key="child.title"
          :to="item.to"
           link
        >
          <v-list-item-icon>
            <v-icon>{{ item.icon }}</v-icon>
          </v-list-item-icon>

          <v-list-item-content>
            <v-list-item-title v-text="child.title"></v-list-item-title>
          </v-list-item-content>
        </v-list-item>
      </v-list-group>
    </v-list>


<!--
      <v-list
          dense
          nav
      >      
        <v-list-item
            v-for="item in items"
            :key="item.title"
            :to="item.to"
            link
        >
          <v-list-item-icon>
            <v-icon>{{ item.icon }}</v-icon>
          </v-list-item-icon>

          <v-list-item-content>
            <v-list-item-title>{{ item.title }}</v-list-item-title>
          </v-list-item-content>
        </v-list-item>


        <v-list-item
            @click.prevent="logout"
            link
        >
          <v-list-item-icon>
            <v-icon>{{ 'mdi-logout' }}</v-icon>
          </v-list-item-icon>

          <v-list-item-content>
            <v-list-item-title>{{ 'Déconnexion' }}</v-list-item-title>
          </v-list-item-content>
        </v-list-item>


      </v-list>
      -->
    </v-navigation-drawer>

    <v-app-bar app>
      <v-app-bar-nav-icon @click="drawer = !drawer"></v-app-bar-nav-icon>

      <v-toolbar-title>Application</v-toolbar-title>
    </v-app-bar>

    <v-main>
      <router-view></router-view>
    </v-main>

    <v-footer color="black" app>
      <v-spacer></v-spacer>
      <span class="white--text">Msafar &copy; 2022</span>
      <v-spacer></v-spacer>
    </v-footer>
  </v-app>
</template>

<script>

import User from "@/apis/User";

export default {
  data: () => ({
    drawer: null,
    items: [

      { title: 'Dashboard', icon: 'mdi-view-dashboard', to:'/' },
      { title: 'Lieux à visiter', icon: 'mdi-image' , to:'/lieux-a-visiter'},
      { title: 'Gastronomie', icon: 'mdi-food-turkey', to:'/gastronomies' },
      { title: 'Evènements', icon: 'mdi-calendar-search', to:'/evenements' },
      { title: 'Témoignages', icon: 'mdi-format-list-bulleted', to:'/temoignages' },
      { title: 'Actualités', icon: 'mdi-clipboard-list', to:'/actualites' },
      { title: 'Partages', icon: 'mdi-share-variant-outline', to:'/partages' },
      {
          icon: 'mdi-silverware-fork-knife',
          active: true,
          items: [
            { title: 'Hotel', icon: 'mdi-view-dashboard', to:'/' },
            { title: 'Riad', icon: 'mdi-view-dashboard', to:'/' },
            { title: 'Maison d\'ôte', icon: 'mdi-view-dashboard', to:'/' },
            { title: 'Restaurant', icon: 'mdi-view-dashboard', to:'/' },
            { title: 'Activité Touristique', icon: 'mdi-view-dashboard', to:'/' },
            { title: 'Guide Touristique', icon: 'mdi-view-dashboard', to:'/' },
          ],
          title: 'Hébergement',
        }

    ],
    right: null,
  }),
  mounted() {
    console.log(process.env.VUE_APP_API_URL);
    this.$root.$on("login", () => {
      this.isLoggedIn = true;
    });
    this.isLoggedIn = !!localStorage.getItem('token');
  },
  methods: {
    logout() {
      User.logout().then(() => {
        localStorage.removeItem('token');
        this.isLoggedIn = false;
        this.$router.push({ name: "login" });
      });
    },

  }
}

//clipboard-list
</script>

