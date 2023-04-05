<template>
    <v-app-bar color="deep-purple accent-4" :elevation="10" density="compact"  dark absolute>
        <v-badge inline  color="green" content="<-- Try">
        <v-app-bar-nav-icon variant="text" @click.stop="drawer = !drawer"></v-app-bar-nav-icon>
    </v-badge>
    
        <v-toolbar-title class="title">UNISEL TimeTable</v-toolbar-title>

        <v-spacer></v-spacer>
        <span class="mr-3">
            <v-btn variant="outlined" :color="toggleButtonColor" @click="toggleTheme">
                <i class="material-icons">{{ theme.global.current.value.dark ? 'wb_sunny' : 'nights_stay' }}</i>

            </v-btn>
        </span>


        <v-menu>
            <template v-slot:activator="{ props }">
                <v-btn color="white" v-bind="props" variant="outlined">
                    Contribute
                </v-btn>
            </template>
            <v-list>
                <a v-for="(item, index) in contributeItems" :key="index" :href="item.url">
                    <v-list-item :value="index">
                        <v-list-item-title class="text-center">{{ item.title }}</v-list-item-title>
                    </v-list-item>
                </a>
            </v-list>
        </v-menu>
    </v-app-bar>
    <v-navigation-drawer v-model="drawer" location="left" temporary>
        <v-list  nav>
      <v-list-item prepend-icon="mdi-view-dashboard" title="Home"  @click="$router.push('/')">
     
      </v-list-item>
      <v-list-item prepend-icon="mdi-vector-combine" title="Subjects MultiViewer" @click="$router.push('/multiviewer')">

      </v-list-item>
    </v-list>
    </v-navigation-drawer>
</template>

<script>
import { useTheme } from 'vuetify'
export default {
    setup() {
        const theme = useTheme()

        return {
            theme,
            toggleTheme: () => theme.global.name.value = theme.global.current.value.dark ? 'light' : 'dark'
        }
    },
    data() {
        return {
            drawer: false,
            contributeItems: [
                { title: 'API', url: 'https://github.com/vicevirus/UNISEL-TimeTable-REST-Scraper' },
                { title: 'Vue', url: 'https://github.com/vicevirus/UNISEL-TimeTable-Nuxt3' },
                { title: 'Nuxt (WIP)', url: 'https://github.com/vicevirus/UNISEL-TimeTable-Nuxt3' },

            ],
        }
    },
    computed: {
    toggleButtonColor() {
      return this.theme.global.current.value.dark ? 'yellow darken-3' : 'grey';
    }
  },
}

</script>