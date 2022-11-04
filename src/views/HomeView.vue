<template>
  <v-app>

    <v-container fluid grid-list-xl>
    <v-layout row wrap justify-center class="dashbord">
      <!-- Widgets-->
      <v-flex d-flex lg3 sm6 xs12 v-for="item in items" :key="item.title">
        <router-link :to="item.link">
        <widget :icon="item.icon" subTitle="1,287,687" :title="item.title" supTitle="22/05/2022" :color="item.color"/>
        </router-link>
      </v-flex>


      <!-- Widgets Ends -->
    </v-layout>
  </v-container>

  </v-app>
</template>

<script>
import Widget from "@/components/Widget";


export default {
  components:{Widget},
  data() {
    return {
      lorem: `Lorem ipsum dolor sit amet, mel at clita quando.`,
      items: [
        //{ title: 'Dashboard', icon: 'mdi-view-dashboard', color: '#00b297'},
        { title: 'Lieux à visiter', icon: 'mdi-image' , color: '#dc3545' , link :'/lieux-a-visiter'},
        { title: 'Gastronomie', icon: 'mdi-food-turkey', color: '#c42f87' , link :'/gastronomies'},
        { title: 'Evènements', icon: 'mdi-calendar-search', color: '#cab277' , link :'/evenements'},
        { title: 'Témoignages', icon: 'mdi-format-list-bulleted', color: '#555297' , link :'/temoignages'},
        { title: 'Actualités', icon: 'mdi-clipboard-list', color: '#0866C6' , link :'/actualites'},
        { title: 'Partages', icon: 'mdi-share-variant-outline', color: '#1f2650' , link :'/partages'},
      ],
    }
  },
  created() {
    this.$store.commit('SET_LAYOUT', 'app-layout')
  },
}
</script>

<style>

.dashbord a{
color:white!important;
  text-decoration: none;
}


</style>

