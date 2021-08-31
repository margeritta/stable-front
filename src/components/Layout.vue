<template>
  <v-app id="inspire">
    <v-app-bar
      :clipped-left="$vuetify.breakpoint.lgAndUp"
      app
      color="brown darken-1"
      dark
    >
      <!--      <v-app-bar-nav-icon @click.stop="drawer = !drawer" />-->

      <v-toolbar-title style="width: 350px">
        <a href="/" class="white--text" style="text-decoration: none"
          ><svg style="width: 24px; height: 24px" viewBox="0 0 24 24">
            <path
              fill="currentColor"
              d="M10 3.5C10 2.67 10.67 2 11.5 2S13 2.67 13 3.5 12.33 5 11.5 5 10 4.33 10 3.5M22 8V11.5L20.97 11.85C20.8 13.06 19.76 14 18.5 14H18.42C18.28 14.68 17.95 15.29 17.5 15.78V22H15V17C14.92 17 14.84 17 14.75 17C14.54 17 14.33 16.97 14.13 16.94L9.69 16.2L8.57 18.21L9.32 22H6.78L6 18.25C5.97 17.95 6 17.65 6.16 17.39L7.18 15.58C6.2 15.03 5.53 14 5.5 12.81C5.46 12.96 5.44 13.18 5.47 13.5C5.5 13.94 5.61 14.59 5.54 15.31C5.5 16.03 5.17 16.77 4.75 17.26C4.32 17.75 3.85 18.09 3.35 18.35L2.65 17.65C2.84 17.18 3.03 16.76 3.07 16.37C3.13 16 3.06 15.7 2.95 15.43L2.42 14.3C2.21 13.79 1.95 13.05 2 12.18C2.03 11.33 2.5 10.22 3.39 9.61C4.29 9 5.26 8.91 6.05 9.08C6.55 9.18 7.06 9.42 7.5 9.76C7.87 9.59 8.3 9.5 8.75 9.5H9V8.11C9 7.11 9.68 6.19 10.66 6.03C11.92 5.82 13 6.79 13 8V9.5H14.5V9C14.5 6.79 16.29 5 18.5 5H22L21.11 6.34C21.65 6.7 22 7.31 22 8M20 11.2L18.96 9.54C18.83 9.33 18.5 9.42 18.5 9.67V13C19.33 13 20 12.33 20 11.5V11.2Z"
            /></svg
          >&nbsp;Stadnina Dworska</a
        >
      </v-toolbar-title>
      <v-spacer />
      <v-dialog
        v-model="dialog"
        v-if="this.$store.getters.userPosition == 'szef'"
        persistent
        max-width="600px"
      >
        <template v-slot:activator="{ on, attrs }">
          <v-btn class="mr-2" outlined v-bind="attrs" v-on="on">
            Zarejestruj pracownika
          </v-btn>
        </template>
        <v-card>
          <v-card-title>
            <span class="text-h5">Podaj dane pracownika</span>
          </v-card-title>
          <v-card-text>
            <v-container>
              <v-col cols="12" sm="6">
                <v-text-field
                  v-model="firstName"
                  label="Imię*"
                  required
                  @input="$v.firstName.$touch()"
                  @blur="$v.firstName.$touch()"
                  :error-messages="firstNameErrors"
                ></v-text-field>
                <v-text-field
                  v-model="lastName"
                  label="Nazwisko*"
                  required
                  @input="$v.lastName.$touch()"
                  @blur="$v.lastName.$touch()"
                  :error-messages="lastNameErrors"
                ></v-text-field>
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
                <v-text-field
                  v-model="phoneNumber"
                  label="Numer telefonu*"
                  required
                  @input="$v.phoneNumber.$touch()"
                  @blur="$v.phoneNumber.$touch()"
                  :error-messages="phoneNumberErrors"
                ></v-text-field>
                <v-text-field
                  v-model="email"
                  label="Adres e-mail*"
                  required
                  @input="$v.email.$touch()"
                  @blur="$v.email.$touch()"
                  :error-messages="emailErrors"
                ></v-text-field>
                <v-text-field
                  v-model="password"
                  label="Hasło*"
                  required
                  @input="$v.password.$touch()"
                  @blur="$v.password.$touch()"
                  :error-messages="passwordErrors"
                ></v-text-field>
                <v-select
                  v-model="selectPosition"
                  :items="positions"
                  :error-messages="selectPositionErrors"
                  label="Wybierz pozycję"
                  data-vv-name="select"
                  required
                  @change="$v.selectPosition.$touch()"
                  @blur="$v.selectPosition.$touch()"
                ></v-select>
              </v-col>
            </v-container>
            <small>*wymagane</small>
          </v-card-text>
          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn text @click="dialog = false"> Anuluj </v-btn>
            <v-btn text @click="submitForm"> Potwierdź </v-btn>
          </v-card-actions>
        </v-card>
      </v-dialog>
      <a href="/auth">
        <v-btn outlined v-if="isLoggedIn" @click="logout"> Wyloguj się </v-btn>
        <v-btn outlined v-if="!isLoggedIn"> Zaloguj się</v-btn>
      </a>
    </v-app-bar>
    <v-main>
      <template>
        <v-bottom-navigation
          :value="activeBtn"
          color="brown darken-1"
          horizontal
        >
          <router-link to="/">
            <v-btn><span>Strona Główna</span></v-btn>
          </router-link>
          <router-link to="/horses">
            <v-btn>Konie</v-btn>
          </router-link>
          <router-link to="/offer">
            <v-btn>Oferta</v-btn>
          </router-link>
          <router-link to="/news">
            <v-btn>Aktualności</v-btn>
          </router-link>
          <router-link v-if="isLoggedIn" to="/workersnews">
            <v-btn>Aktualności pracownicze</v-btn>
          </router-link>
          <router-link v-if="isLoggedIn" to="/tasks">
            <v-btn>Zadania</v-btn>
          </router-link>
          <router-link v-if="isLoggedIn" to="/calendar">
            <v-btn>Jazdy</v-btn>
          </router-link>
        </v-bottom-navigation>
        <Error></Error>
      </template>
    </v-main>
    <router-view />
  </v-app>
</template>
<script>
import { required, email, maxLength } from "vuelidate/lib/validators";
import Error from "./Error.vue";

export default {
  components: { Error },
  data() {
    return {
      menu: false,
      date: null,
      activePicker: null,
      selectPosition: null,
      dialog: false,
      email: "",
      password: "",
      isLoading: false,
      error: null,
      firstName: "",
      lastName: "",
      born: "",
      phoneNumber: "",
      positions: ["szef", "pracownik"],
      activeBtn: 1,
    };
  },
  validations: {
    password: { required, maxLength: maxLength(128) },
    email: { required, email, maxLength: maxLength(128) },
    firstName: { required, maxLength: maxLength(64) },
    lastName: { required, maxLength: maxLength(128) },
    phoneNumber: { required },
    selectPosition: { required },
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
    async submitForm() {
      this.$v.$touch();
      if (!this.$v.$invalid) {
        const actionPayload = {
          first_name: this.firstName,
          last_name: this.lastName,
          born: this.date,
          password: this.password,
          position: this.selectPosition,
          email: this.email,
          phone_number: this.phoneNumber,
          url:  this.$API_URL + "employee/create",
        };

        try {
          await this.$store.dispatch("addEmployee", actionPayload);
        } catch (err) {
          this.error = err.msg || "Failed to authenticate, try later.";
        }
        this.dialog = false;
      } else {
        alert("Musisz podać właściwe dane");
      }
      this.phoneNumber = "";
      this.firstName = ""
      this.lastName = "";
      this.email = "";
      this.selectPosition = []
      this.password = "";
      this.dialog = false;
    },
    async logout() {
      await this.$store.dispatch("logout");
    },
  },
  computed: {
    isLoggedIn() {
      return this.$store.getters.isAuthenticated;
    },
    firstNameErrors() {
      const errors = [];
      if (!this.$v.firstName.$dirty) return errors;
      !this.$v.firstName.maxLength &&
        errors.push("Imię musi zawierać conajwyżej 64 znaków");
      !this.$v.firstName.required && errors.push("Imię jest wymagane");
      return errors;
    },
    lastNameErrors() {
      const errors = [];
      if (!this.$v.lastName.$dirty) return errors;
      !this.$v.lastName.maxLength &&
        errors.push("Nazwisko musi zawierać conajwyżej 128 znaków");
      !this.$v.lastName.required && errors.push("Nazwisko jest wymagane.");
      return errors;
    },
    phoneNumberErrors() {
      const errors = [];
      if (!this.$v.phoneNumber.$dirty) return errors;
      !this.$v.phoneNumber.required &&
        errors.push("Numer telefonu jest wymagany.");
      return errors;
    },
    passwordErrors() {
      const errors = [];
      if (!this.$v.password.$dirty) return errors;
      !this.$v.password.maxLength &&
        errors.push("Hasło musi zawierać conajwyżej 64 znaków");
      !this.$v.password.required && errors.push("Hasło jest wymagane.");
      return errors;
    },
    emailErrors() {
      const errors = [];
      if (!this.$v.email.$dirty) return errors;
      !this.$v.email.maxLength &&
        errors.push("Email musi zawierać conajwyżej 64 znaków");
      !this.$v.email.email && errors.push("Email musi być poprawny.");
      !this.$v.email.required && errors.push("Email jest wymagany.");
      return errors;
    },
    selectPositionErrors() {
      const errors = [];
      if (!this.$v.selectPosition.$dirty) return errors;
      !this.$v.selectPosition.required &&
        errors.push("Stanowisko pracownika jest wymagane.");
      return errors;
    },
  },
};
</script>
