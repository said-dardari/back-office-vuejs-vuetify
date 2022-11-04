<template>

  <v-app>
    <v-main class="container align-center px-1">
      <h2 class="font-weight-medium mb-2">
        <v-icon >mdi-arrow-right</v-icon>
        Partages
      </h2>
      <div>
        <v-alert
            v-model="alert"
            dismissible
            color="green"
            border="left"
            elevation="2"
            colored-border
            type="success"
        >
          <strong>{{ msgSuccess }}</strong>
        </v-alert>
      </div>

      <v-dialog v-model="dialog" max-width="500px">




        <template v-slot:activator="{ on }">
          <div class="d-flex">
            <v-btn color="primary" dark class="ml-auto ma-3" v-on="on">
              New
              <v-icon small>mdi-plus-circle-outline</v-icon>
            </v-btn>
          </div>
        </template>
        <v-card>
          <v-card-title>
            <span v-if="editedItem.id">Edit {{editedItem.id}}</span>
            <span v-else>Create</span>
          </v-card-title>
          <v-card-text>
            <v-row>
              <v-col cols="12" sm="12">
                <v-text-field v-model="editedItem.titre" label="Titre"></v-text-field>
              </v-col>
              <v-col cols="12" sm="12">
                <v-textarea v-model="editedItem.description" label="Description"></v-textarea>
              </v-col>

              <v-col cols="12" sm="12">
                <v-file-input
                    v-model="editedItem.image"
                    label="Image"
                    id="fileImage"
                    filled
                    prepend-icon="mdi-camera"
                ></v-file-input>
              </v-col>



            </v-row>
          </v-card-text>
          <v-card-actions>
            <v-spacer></v-spacer>

            <v-btn color="blue darken-1" text @click="showEditDialog()">Cancel</v-btn>
            <v-btn color="blue darken-1" text @click="saveItem(editedItem)">Save</v-btn>
          </v-card-actions>
        </v-card>
      </v-dialog>

      <v-card>
        <v-data-table
            :headers="headers"
            :items="items"
            mobile-breakpoint="800"
            class="elevation-0">
          <template v-slot:[`item.actions`]="{ item }">
            <div class="text-truncate">
              <v-icon
                  small
                  class="mr-2"
                  @click="showEditDialog(item)"
                  color="primary"
              >
                mdi-pencil
              </v-icon>
              <v-icon
                  small
                  @click="showDeleteDialog(item)"
                  color="pink"
              >
                mdi-delete
              </v-icon>
            </div>
          </template>
          <template v-slot:[`item.titre`]="{ item }">
            <div class="text-truncate" style="width: 180px">
              {{item.titre}}
            </div>
          </template>
          <template v-slot:[`item.description`]="{ item }">
            <div class="text-truncate" style="width: 380px">
              {{item.description}}
            </div>
          </template>

          <template v-slot:[`item.image`]="{ item }">
            <div class="text-truncate text-center justify-center" style="width: 380px">
              <v-img  :src="Url+item.image" :alt="item.titre" width="100px"></v-img>
            </div>
          </template>

        </v-data-table>
        <!-- delete dialog -->
        <v-dialog v-model="dialogDelete" max-width="500px">
          <v-card>
            <v-card-title>Delete</v-card-title>
            <v-card-text>Voulez-vous vraiment supprimer cet élément  <strong> `{{itemToDelete.titre}}` </strong> ?</v-card-text>
            <v-card-actions>
              <v-btn color="primary" text @click="dialogDelete = false">Close</v-btn>
              <v-btn color="primary" text @click="deleteItem()">Delete</v-btn>
            </v-card-actions>
          </v-card>
        </v-dialog>
        <!-- this dialog is used for both create and update -->
      </v-card>
    </v-main>
  </v-app>
</template>

<script>
import axios from "axios";
let table = '/partages';

let token = localStorage.getItem('token');
export default {
  name: "PartagesComponent",
  created() {
    this.$store.commit('SET_LAYOUT', 'app-layout')
  },
  data () {
    return {
      headers: [
        { text: 'Id', value: 'id' },
        { text: 'Titre', value: 'titre' },
        { text: 'Description', value: 'description' },
        { text: 'Image', value: 'image' , sortable: false, width:"100"},
        { text: 'Action', value: 'actions', sortable: false },
      ],
      items: [],
      apiUrl:process.env.VUE_APP_API_URL,
      dialog: false,
      editedItem: {},
      dialogDelete: false,
      itemToDelete: {},
      Url :process.env.VUE_APP_API_URL_STORAGE,
      snackbar: false,
      msgSuccess: [],
      alert: false,
    }
  },
  mounted() {
    this.loadItems()
  },
  methods: {
    showEditDialog(item) {
      this.editedItem = item||{}
      this.dialog = !this.dialog
    },
    loadItems() {
      this.items = []

      axios.get(this.apiUrl+table,
          { headers: { Authorization: "Bearer " + token }})
          .then((response) => {
            console.warn(response.data);
            this.items = response.data.map((item)=>{
              return {
                id: item.id,
                titre: item.titre,
                description: item.description,
                image: item.image,
                ...item.fields
              }
            })

          }).catch((error) => {
        console.log(error)
      })
    },
    saveItem(item) {
      /* this is used for both creating and updating API records
       the default method is POST for creating a new item */

      let method = "post"
      let url = this.apiUrl+table
      let id = item.id
      // airtable API needs the data to be placed in fields object
      let data = {
        fields: item
      }
      const object = new FormData ()
      object.append ('titre', data.fields.titre)
      object.append ('description', data.fields.description)
      var imagefile = document.querySelector('#fileImage');
      object.append("image", imagefile.files[0]);

      if (id) {
        // if the item has an id, we're updating an existing item
        method = "post"
        url = this.apiUrl+table+`/${id}`

        // must remove id from the data for airtable patch to work
        delete data.fields.id
      }

      // save the record
      axios[method](url,
          object,
          { headers: {
              Authorization: "Bearer " + token,
              //'Content-Type': 'multipart/form-data'
              'Content-Type': imagefile.type
            }
          }).then((response) => {
        if (response.data && response.data.id) {

          // add new item to state
          this.editedItem.id = response.data.id
          if (!id) {
            // add the new item to items state
            this.items.push(this.editedItem)
          }

          this.editedItem = {}
        }
        this.dialog = !this.dialog
        console.log('Le contenu a été enregistré')
        this.alert = true
        this.msgSuccess = 'Le contenu a été enregistré.'
        this.loadItems()
      }).catch((error) => {
        this.msgErreur = error;
        console.log(error.response)
      })
    },
    deleteItem() {
      console.log('deleteItem', this.itemToDelete)
      const index = this.items.indexOf(this.itemToDelete)

      axios.delete( this.apiUrl+table+`/${this.itemToDelete.id}`,
          { headers: {
              Authorization: "Bearer " + token,
              "Content-Type": "application/json"
            }
          }).then((response) => {
        this.items.splice(index, 1)
        this.dialogDelete = false
        this.alert = true
        this.msgSuccess = 'Le contenu a été supprimé.'
      })


      //this.items.splice(index, 1)
      //this.dialogDelete = false
    },
    showDeleteDialog(item) {
      this.itemToDelete = item
      this.dialogDelete = !this.dialogDelete
    },
  }
}
</script>

<style scoped>

</style>




