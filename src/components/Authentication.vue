<template>
  <div class="justify-start">
    <v-container class="pb-16">
      <p class="display-3 font-weight-light text-center pa-4">Zaloguj się</p>
      <v-card class="pb-5">
        <v-form ref="form" lazy-validation>
          <v-text-field
            class="pa-5"
            v-model="email"
            label="E-mail"
            required
            :error-messages="emailErrors"
            @input="$v.email.$touch()"
            @blur="$v.email.$touch()"
          ></v-text-field>
          <v-text-field
            class="pa-5"
            v-model="password"
            label="Password"
            required
            :error-messages="passwordErrors"
            @input="$v.password.$touch()"
            @blur="$v.password.$touch()"
          ></v-text-field>
          <!-- <p class="pa-5" v-if="!formIsValid">
            Please enter a valid email and password (must be at least 6
            characters long).
          </p> -->
          <v-card-actions>
            <v-btn @click="submitForm">Zaloguj</v-btn>
          </v-card-actions>
        </v-form>
        <v-spacer></v-spacer>
      </v-card>
      <v-card>
        <v-row class="fill-height pa-2" align="center" justify="center">
          <div class="display-2 white--text pa-5 hidden-sm-only">
            <v-img
              :src="require('../assets/img/home/logo.png')"
              height="140px"
              width="210"
            >
            </v-img>
          </div>
          <br />
        </v-row>
      </v-card>
      <v-spacer></v-spacer>
    </v-container>
  </div>
</template>

<script>
import { required, email } from 'vuelidate/lib/validators'
export default {
  data() {
    return {
      dialog: false,
      email: "",
      password: "",
      isLoading: false,
      error: null,
      first_name: "",
      last_name: "",
      born: "",
      phone_number: "",
    };
  },
  validations: {
    password: { required },
    email: { required, email },
  },
  computed: {
    isLoggedIn() {
      return this.$store.getters.isAuthenticated;
    },
    passwordErrors() {
      const errors = [];
      if (!this.$v.password.$dirty) return errors;
      !this.$v.password.required && errors.push("Name is required.");
      return errors;
    },
    emailErrors() {
      const errors = [];
      if (!this.$v.email.$dirty) return errors;
      !this.$v.email.email && errors.push("Must be valid e-mail");
      !this.$v.email.required && errors.push("E-mail is required");
      return errors;
    },
  },
  methods: {
    async submitForm() {
      this.$v.$touch();
      if (!this.$v.$invalid) {
        const actionPayload = {
          email: this.email,
          password: this.password,
        };

        try {
          await this.$store.dispatch("login", actionPayload);
        } catch (err) {
          console.log(err)
          this.error = err.msg || "Failed to authenticate, try later.";
        }
      } else {
        alert("Musisz podać właściwe dane!")
      }
      this.$router.push('/')
      this.email = "";
      this.password = "";
      this.isLoading = false;
    },
    async logout() {
      try {
        await this.$store.dispatch("logout");
      } catch (err) {
        this.error = err.message;
      }
    },
  },
};
</script>