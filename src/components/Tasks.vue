<template>
  <div>
    <v-container>
      <p class="display-3 font-weight-light text-center pa-4">ZADANIA</p>
      <v-row justify="center">
        <v-dialog
          v-if="this.$store.getters.userPosition == 'szef'"
          v-model="dialog"
          persistent
          max-width="600px"
        >
          <template v-slot:activator="{ on, attrs }">
            <v-btn v-bind="attrs" v-on="on"> Dodaj zadanie </v-btn>
          </template>
          <v-card>
            <v-card-title>
              <span class="text-h5">Nowe zadanie</span>
            </v-card-title>
            <v-card-text>
              <v-container>
                <v-col cols="12" sm="6">
                  <v-text-field
                    v-model="title"
                    :error-messages="titleErrors"
                    label="Tytuł*"
                    required
                    @input="$v.title.$touch()"
                    @blur="$v.title.$touch()"
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
                <v-select
                  v-model="selectStatus"
                  :items="statuses"
                  :error-messages="selectStatusErrors"
                  label="Status zadania"
                  data-vv-name="select"
                  required
                  @change="$v.selectStatus.$touch()"
                  @blur="$v.selectStatus.$touch()"
                ></v-select>
                <v-select
                  v-model="selectEmployee"
                  :items="getemployees.map((a) => a.last_name)"
                  :error-messages="selectEmployeeErrors"
                  label="Pracownik"
                  data-vv-name="select"
                  required
                  @change="$v.selectEmployee.$touch()"
                  @blur="$v.selectEmployee.$touch()"
                ></v-select>
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
        <v-col :cols="12">
          <v-simple-table>
            <template v-slot:default>
              <thead>
                <tr>
                  <th class="text-center">Nazwa</th>
                  <th class="text-center">Opis</th>
                  <th class="text-center">
                    <v-menu bottom offset-y>
                      <template v-slot:activator="{ on, attrs }">
                        <span v-bind="attrs" v-on="on" class="mdi mdi-filter">
                        </span>
                      </template>
                      <v-list>
                        <v-list-item
                          v-for="(employee, i) in getemployees.map(
                            (a) => a.last_name
                          )"
                          :key="i"
                          @click="
                            urlMaker(
                              'filter',
                              getemployees.find((x) => x.last_name === employee)
                                .id
                            )
                          "
                        >
                          <v-list-item-title>{{ employee }}</v-list-item-title>
                        </v-list-item>
                      </v-list> </v-menu
                    >Wykonawca<span
                      @click="$store.dispatch('getTasks')"
                      class="mdi mdi-filter-remove"
                    ></span>
                  </th>
                  <th class="text-center">
                    <span
                      @click="urlMaker('sort', true)"
                      class="mdi mdi-arrow-down"
                    ></span>
                    Data
                    <span
                      @click="urlMaker('sort', false)"
                      class="mdi mdi-arrow-up"
                    ></span>
                  </th>
                  <th class="text-center">Status</th>
                  <th v-if="$store.getters.userPosition == 'szef'"></th>
                  <th v-else-if="isLoggedIn"></th>
                </tr>
              </thead>
              <tbody>
                <tr v-for="task in gettasks" :key="task.id">
                  <td>{{ task.title }}</td>
                  <td>{{ task.description }}</td>
                  <td>
                    {{
                      getemployees.find((x) => x.id === task.employee).last_name
                    }}
                  </td>
                  <td>{{ task.date }}</td>
                  <td>{{ task.status }}</td>

                  <td v-if="$store.getters.userPosition == 'szef'">
                    <svg
                      @click="deleteTask(task.id)"
                      style="width: 24px; height: 24px"
                      viewBox="0 0 24 24"
                    >
                      <path
                        fill="currentColor"
                        d="M12,20C7.59,20 4,16.41 4,12C4,7.59 7.59,4 12,4C16.41,4 20,7.59 20,12C20,16.41 16.41,20 12,20M12,2C6.47,2 2,6.47 2,12C2,17.53 6.47,22 12,22C17.53,22 22,17.53 22,12C22,6.47 17.53,2 12,2M14.59,8L12,10.59L9.41,8L8,9.41L10.59,12L8,14.59L9.41,16L12,13.41L14.59,16L16,14.59L13.41,12L16,9.41L14.59,8Z"
                      />
                    </svg>
                  </td>
                  <td
                    v-if="
                      isLoggedIn && $store.getters.userId == task.employee
                    "
                  >
                    <v-menu bottom offset-y>
                      <template v-slot:activator="{ on, attrs }">
                        <svg
                          style="width: 24px; height: 24px"
                          viewBox="0 0 24 24"
                          v-bind="attrs"
                          v-on="on"
                        >
                          <path
                            fill="currentColor"
                            d="M20.71,7.04C21.1,6.65 21.1,6 20.71,5.63L18.37,3.29C18,2.9 17.35,2.9 16.96,3.29L15.12,5.12L18.87,8.87M3,17.25V21H6.75L17.81,9.93L14.06,6.18L3,17.25Z"
                          />
                        </svg>
                      </template>
                      <v-list>
                        <v-list-item
                          v-for="(status, i) in statuses"
                          :key="i"
                          @click="updateForm(task, status)"
                        >
                          <v-list-item-title>{{ status }}</v-list-item-title>
                        </v-list-item>
                      </v-list>
                    </v-menu>
                  </td>
                  <td v-else></td>
                </tr>
              </tbody>
            </template>
          </v-simple-table>
        </v-col>
      </v-row>
      <v-row class="fill-height pa-2" align="center" justify="center">
        <div class="display-2 white--text pb-10 hidden-sm-only">
          <v-img
            :src="require('../assets/img/home/logo.png')"
            height="140px"
            width="210"
          >
          </v-img>
        </div>
        <br />
      </v-row>
    </v-container>
  </div>
</template>
<script>
import { required, maxLength } from "vuelidate/lib/validators";
export default {
  validations: {
    title: { required, maxLength: maxLength(512) },
    description: { required },
    selectStatus: { required },
    selectEmployee: { required },
  },
  data: () => ({
    selectedEmployeeFilter: null,
    sort: "?sort=",
    filter: "?filter=employee-",
    dialog2: false,
    dialog: false,
    description: "",
    title: "",
    selectStatus: null,
    selectEmployee: null,
    statuses: [
      "nowe",
      "zaakceptowane",
      "w realizacji",
      "zakończone",
      "odrzucone",
    ],
  }),
  methods: {
    urlMaker(param, ifAsc) {
      if (param == "sort") {
        if (ifAsc == true) {
          this.$store.dispatch("getTasks", { url: this.sort + "date" });
        } else if (ifAsc == false) {
          this.$store.dispatch("getTasks", { url: this.sort + "-date" });
        }
      }
      this.sort = "?sort=";
      if (param == "filter") {
        this.$store.dispatch("getTasks", {
          url: this.filter + ifAsc,
        });
      }
      this.filter = "?filter=employee-";
    },
    async updateForm(payload, status) {
      const actionPayload = {
        employee: payload.employee,
        description: payload.description,
        status: status,
        title: payload.title,
        date: new Date().toISOString().split("T")[0],
        url: this.$API_URL + "task/" + parseInt(payload.id) + '/update',
      };

      try {
        await this.$store.dispatch("addTask", actionPayload);
      } catch (err) {
        this.error = err.msg || "Failed to authenticate, try later.";
      }
      this.dialog2 = false;
      this.select = null;
    },
    async submitForm() {
      this.$v.$touch();
      if (!this.$v.$invalid) {
        const actionPayload = {
          employee: this.getemployees.filter(
            (e) => e.last_name === this.selectEmployee
          )[0].id,
          description: this.description,
          status: this.selectStatus,
          title: this.title,
          date: new Date().toISOString().split("T")[0],
          url:  this.$API_URL + "task/create",
        };

        try {
          //console.log(actionPayload.employee)
          await this.$store.dispatch("addTask", actionPayload);
        } catch (err) {
          this.error = err.msg || "Failed to authenticate, try later.";
        }
        this.dialog = false;
      } else {
        alert("Musisz podać prawidłowe dane!");
      }
      this.title = "";
      this.description = "";
      this.selectStatus = null;
      this.selectEmployee = null;
    },
    async deleteTask(taskid) {
      const actionPayload = {
        description: this.description,
        title: this.title,
        url:  this.$API_URL + "task/",
        id: taskid,
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
    isLoggedIn() {
      return this.$store.getters.isAuthenticated;
    },
    titleErrors() {
      const errors = [];
      if (!this.$v.title.$dirty) return errors;
      !this.$v.title.maxLength &&
        errors.push("Tytuł może mieć conajwyżej 512 znaków.");
      !this.$v.title.required && errors.push("Tytuł jest wymagany.");
      return errors;
    },
    descriptionErrors() {
      const errors = [];
      if (!this.$v.description.$dirty) return errors;
      !this.$v.description.required && errors.push("Tytuł jest wymagany.");
      return errors;
    },
    selectStatusErrors() {
      const errors = [];
      if (!this.$v.selectStatus.$dirty) return errors;
      !this.$v.selectStatus.required && errors.push("Status jest wymagany!");
      return errors;
    },
    selectEmployeeErrors() {
      const errors = [];
      if (!this.$v.selectEmployee.$dirty) return errors;
      !this.$v.selectEmployee.required &&
        errors.push("Pracownik jest wymagany!");
      return errors;
    },
    gettasks() {
      return this.$store.getters.allTasks;
    },
    getemployees() {
      return this.$store.getters.allEmployees;
    },
  },
  mounted() {
    this.$store.dispatch("getTasks");
    this.$store.dispatch("getEmployees");
  },
};
</script>

