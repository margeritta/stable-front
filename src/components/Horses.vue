<template>
  <div>
    <v-container>
      <p class="display-3 font-weight-light text-center pa-4">Nasze konie</p>
      <v-row justify="center">
        <v-dialog
          v-if="this.$store.getters.userPosition == 'szef'"
          v-model="dialog"
          persistent
          max-width="600px"
        >
          <template v-slot:activator="{ on, attrs }">
            <v-btn v-bind="attrs" v-on="on"> Dodaj konia </v-btn>
          </template>
          <v-card>
            <v-card-title>
              <span class="text-h5">Nowy koń</span>
            </v-card-title>
            <v-card-text>
              <v-container>
                <v-col cols="12" sm="6">
                  <v-text-field
                    v-model="name"
                    label="Imię*"
                    required
                    @input="$v.name.$touch()"
                    @blur="$v.name.$touch()"
                    :error-messages="nameErrors"
                  ></v-text-field>
                </v-col>
                <v-col cols="12" sm="6">
                  <v-text-field
                    v-model="mother"
                    required
                    label="Imię matki"
                    @input="$v.mother.$touch()"
                    @blur="$v.mother.$touch()"
                    :error-messages="motherErrors"
                  ></v-text-field>
                </v-col>
                <v-col cols="12" sm="6">
                  <v-text-field
                    v-model="father"
                    required
                    label="Imię ojca"
                    @input="$v.father.$touch()"
                    @blur="$v.father.$touch()"
                    :error-messages="fatherErrors"
                  ></v-text-field>
                </v-col>
                <v-col cols="12" sm="6">
                  <div>
                    <v-menu
                      ref="menu"
                      v-model="menu"
                      :close-on-content-click="false"
                      transition="scale-transition"
                      offset-y
                      min-width="auto"
                    >
                      <template v-slot:activator="{ on, attrs }">
                        <v-text-field
                          v-model="date"
                          label="Data urodzenia"
                          prepend-icon="mdi-calendar"
                          readonly
                          v-bind="attrs"
                          v-on="on"
                        ></v-text-field>
                      </template>
                      <v-date-picker
                        v-model="date"
                         color="brown darken-1"
                        :active-picker.sync="activePicker"
                        :max="
                          new Date(
                            Date.now() - new Date().getTimezoneOffset() * 60000
                          )
                            .toISOString()
                            .substr(0, 10)
                        "
                        min="1950-01-01"
                        @change="save"
                      ></v-date-picker>
                    </v-menu>
                  </div>
                </v-col>
                <v-col cols="12" sm="6">
                  <v-text-field
                    v-model="owner"
                    required
                    label="Imię i  nazwisko właściciela"
                    @input="$v.owner.$touch()"
                    @blur="$v.owner.$touch()"
                    :error-messages="ownerErrors"
                  ></v-text-field>
                </v-col>
                <v-col cols="12" sm="6">
                  <v-text-field
                    v-model="horseCoat"
                    required
                    label="Maść konia"
                    @input="$v.horseCoat.$touch()"
                    @blur="$v.horseCoat.$touch()"
                    :error-messages="horseCoatErrors"
                  ></v-text-field
                ></v-col>
                <v-col>
                  <v-select
                    v-model="imageName"
                    :items="photos"
                    :error-messages="imageNameErrors"
                    label="Wybierz zdjęcie (jeśli chcesz inne, poproś administatora)"
                    data-vv-name="select"
                    required
                    @change="$v.imageName.$touch()"
                    @blur="$v.imageName.$touch()"
                  ></v-select>
                </v-col>
                <v-col>
                  <v-textarea
                    v-model="description"
                    solo
                    label="Opis konia"
                  ></v-textarea
                ></v-col>
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
          v-for="(horse, index) in gettershorses"
          v-bind:key="index"
        >
          <v-card class="mx-auto" max-width="400" outlined tile>
            <v-img
              class="white--text align-end"
              height="400px"
              :src="require('../assets/img/home/' + horse.image_name)"
            >
              <v-card-title>{{ horse.name }}</v-card-title>
            </v-img>

            <v-card-subtitle class="pb-0"
              >{{ horse.father }} x {{ horse.mother }}</v-card-subtitle
            >

            <v-card-text class="text--primary">
              <div>Maść: {{ horse.horse_coat }}</div>
              <div>Właściciel: {{ horse.owner }}</div>
              <div>{{ horse.description }}</div>
            </v-card-text>
            <v-card-actions v-if="$store.getters.userPosition == 'szef'">
              <v-btn @click="deleteHorse(horse.id)" color="brown" text>
                Usuń
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
    imageName: null,
    menu: false,
    date: null,
    activePicker: null,
    name: "",
    description: "",
    horseCoat: "",
    owner: "",
    mother: "",
    father: "",
    born: "",
    dialog: false,
    photos: [
      "siwa.jpg",
      "galermo.jpg",
      "gejsza.jpg",
      "bagoda.jpg",
      "perla.jpg",
      "mak.jpg",
    ],
  }),
  validations: {
    name: { required, maxLength: maxLength(128) },
    mother: { required, maxLength: maxLength(128) },
    father: { required, maxLength: maxLength(128) },
    owner: { required, maxLength: maxLength(128) },
    horseCoat: { required, maxLength: maxLength(64) },
    imageName: { required },
  },
  watch: {
    menu(val) {
      val && setTimeout(() => (this.activePicker = "YEAR"));
    },
  },
  methods: {
    save(date) {
      this.$refs.menu.save(date);
    },
    async deleteHorse(horseid) {
      const actionPayload = {
        description: this.description,
        title: this.title,
        url:  this.$API_URL + "horse/",
        id: horseid,
      };

      try {
        await this.$store.dispatch("delete", actionPayload);
      } catch (err) {
        this.error = err.msg || "Failed to authenticate, try later.";
      }
      this.dialog = false;
    },
    async submitForm() {
      this.$v.$touch();
      if (!this.$v.$invalid) {
        const actionPayload = {
          description: this.description,
          name: this.name,
          father: this.father,
          mother: this.mother,
          owner: this.owner,
          horseCoat: this.horseCoat,
          imageName: this.imageName,
          url:  this.$API_URL + "horse/create",
          born: this.date
        };

        try {
          await this.$store.dispatch("addHorse", actionPayload);
        } catch (err) {
          this.error = err.msg || "Failed to authenticate, try later.";
        }
        this.dialog = false;
      } else {
        alert("Musisz podać właściwe dane");
      }
      this.name = "";
      this.mother = "";
      this.father = "";
      this.owner = "";
      this.description = "";
      this.horseCoat = "";
      this.imageName = [];
      this.dialog = false;
      this.date = null;
    },
  },
  computed: {
    nameErrors() {
      const errors = [];
      if (!this.$v.name.$dirty) return errors;
      !this.$v.name.maxLength &&
        errors.push("Imię musi zawierać conajwyżej 128 znaków.");
      !this.$v.name.required && errors.push("Imię jest wymagane.");
      return errors;
    },
    motherErrors() {
      const errors = [];
      if (!this.$v.mother.$dirty) return errors;
      !this.$v.mother.maxLength &&
        errors.push("Imię matki musi zawierać conajwyżej 128 znaków.");
      !this.$v.mother.required &&
        errors.push("Imię matki jest wymagane. Wpisz NN jeśli nieznane");
      return errors;
    },
    fatherErrors() {
      const errors = [];
      if (!this.$v.father.$dirty) return errors;
      !this.$v.father.maxLength &&
        errors.push("Imię ojca musi zawierać conajwyżej 128 znaków.");
      !this.$v.father.required &&
        errors.push("Imię jest wymagane. Wpisz NN jeśli nieznane.");
      return errors;
    },
    horseCoatErrors() {
      const errors = [];
      if (!this.$v.horseCoat.$dirty) return errors;
      !this.$v.horseCoat.maxLength &&
        errors.push("Maść musi zawierać conajwyżej 64 znaków.");
      !this.$v.horseCoat.required && errors.push("Maść jest wymagana.");
      return errors;
    },
    ownerErrors() {
      const errors = [];
      if (!this.$v.owner.$dirty) return errors;
      !this.$v.owner.maxLength &&
        errors.push("Maść musi zawierać conajwyżej 128 znaków.");
      !this.$v.owner.required && errors.push("Maść jest wymagana.");
      return errors;
    },
    imageNameErrors() {
      const errors = [];
      if (!this.$v.imageName.$dirty) return errors;
      !this.$v.imageName.required &&
        errors.push(
          "Zdjęcie jest wymagane, nazwa musi być podana przez administratora strony."
        );
      return errors;
    },
    gettershorses() {
      return this.$store.getters.allHorses;
    },
    isLoggedIn() {
      return this.$store.getters.isAuthenticated;
    },
  },
  mounted() {
    this.$store.dispatch("getHorses");
  },
};
</script>