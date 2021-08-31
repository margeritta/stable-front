<template>
  <div>
    <v-alert v-if="this.$store.getters.error" type="error">
      <div>
        {{ this.$store.getters.error }}
      </div>
      <v-btn outlined @click="dismiss()">Spróbuj ponownie</v-btn>
    </v-alert>
    <v-alert v-if="this.$store.getters.success" type="success">
      <div>
         Udało się! Odśwież stronę.
      </div>
      <v-btn outlined @click="reload()">Odśwież</v-btn>
    </v-alert>
  </div>
</template>

<script>
export default {
  name: "ErrorMessage",
  methods: {
    dismiss() {
      this.$store.state.error = null;
      this.$router.go()
    },
    reload() {
      this.$store.state.success = false;
      this.$router.go()
    }
  },
};
</script>