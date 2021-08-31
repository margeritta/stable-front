<template>
  <div>
    <v-container>
      <p class="display-3 font-weight-light text-center pa-4">
        Aktualności pracownicze
      </p>
      <v-row justify="center">
        <v-dialog
          v-if="isLoggedIn"
          v-model="dialog"
          persistent
          max-width="600px"
        >
          <template v-slot:activator="{ on, attrs }">
            <v-btn v-bind="attrs" v-on="on"> Dodaj aktualność </v-btn>
          </template>
          <v-card>
            <v-card-title>
              <span class="text-h5">Nowa aktualność</span>
            </v-card-title>
            <v-card-text>
              <v-container>
                <v-col cols="12" sm="6">
                  <v-text-field
                    v-model="title"
                    label="Tytuł*"
                    required
                    @input="$v.title.$touch()"
                    @blur="$v.title.$touch()"
                    :error-messages="titleErrors"
                  ></v-text-field>
                </v-col>
                <v-textarea
                  v-model="description"
                  solo
                  label="Opis"
                  @input="$v.description.$touch()"
                  @blur="$v.description.$touch()"
                  :error-messages="descriptionErrors"
                ></v-textarea>
              </v-container>
              <small>*wymagane</small>
            </v-card-text>
            <v-card-actions>
              <v-spacer></v-spacer>
              <v-btn text @click="dialog = false"> Close </v-btn>
              <v-btn text @click="submitForm"> Save </v-btn>
            </v-card-actions>
          </v-card>
        </v-dialog>
      </v-row>

      <div class="row">
        <div
          class="col-md-4 col-sm-4 col-xs-12"
          v-for="(n, index) in getNewses"
          v-bind:key="index"
        >
          <v-card class="mx-auto" max-width="400" outlined tile>
            <v-card-title>{{ n.title }}</v-card-title>
            <v-card-text class="text--primary">
              <div>{{ n.description }}</div>
            </v-card-text>
            <v-card-text>
              {{ n.date }} — <strong> {{ n.author }}</strong>
            </v-card-text>

            <v-card-actions v-if="isLoggedIn">
              <v-btn color="orange" @click="deleteNews(n.id)" text>
                usuń
              </v-btn>
            </v-card-actions>
          </v-card>
        </div>
      </div>
    </v-container>
  </div>
</template>

<script>
import { required, maxLength } from "vuelidate/lib/validators";

export default {
  data: () => ({
    dialog: false,
    title: "",
    description: "",
  }),
  validations: {
    title: { required, maxLength: maxLength(512) },
    description: { required },
  },
  methods: {
    async submitForm() {
      this.$v.$touch();
      if (!this.$v.$invalid) {
        const actionPayload = {
          description: this.description,
          title: this.title,
          url:  this.$API_URL + "employees_news/create",
        };

        try {
          await this.$store.dispatch("addNews", actionPayload);
        } catch (err) {
          this.error = err.msg || "Failed to authenticate, try later.";
        }
        this.dialog = false;
      } else {
        alert("Musisz podać poprawne dane!");
      }
      this.title = "";
      this.description = "";
    },
    async deleteNews(newsid) {
        const actionPayload = {
          description: this.description,
          title: this.title,
          url:  this.$API_URL + "employees_news/",
          id: newsid
        };

        try {
          await this.$store.dispatch("delete", actionPayload);
        } catch (err) {
          this.error = err.msg || "Failed to authenticate, try later.";
        }
        this.dialog = false;
    },
  },
  computed: {
    titleErrors() {
      const errors = [];
      if (!this.$v.title.$dirty) return errors;
      !this.$v.title.maxLength &&
        errors.push("Name must be at most 512 characters long");
      !this.$v.title.required && errors.push("Tytuł jest wymagany.");
      return errors;
    },
    descriptionErrors() {
      const errors = [];
      if (!this.$v.description.$dirty) return errors;
      !this.$v.description.required && errors.push("Treść jest wymagana.");
      return errors;
    },
    getNewses() {
      return this.$store.getters.allEmployeesNewses;
    },
    isLoggedIn() {
      return this.$store.getters.isAuthenticated;
    },
  },
  mounted() {
    this.$store.dispatch("getEmployeesNewses");
    //this.loadExperiences();
  },
};
</script>