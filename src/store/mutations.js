export default {
  SET_NEWSES(state, newses) {
    state.newses = newses;
  },
  SET_EMPLOYEES_NEWSES(state, employeesNewses) {
    state.employeesNewses = employeesNewses;
  },
  SET_TASKS(state, tasks) {
    state.tasks = tasks;
  },
  SET_USER(state, payload) {
    state.token = payload.token;
    state.userId = payload.userId;
    state.userPosition = payload.userPosition;
    state.didAutoLogout = false;
  },
  SET_EMPLOYEES(state, employees) {
    state.employees = employees
  },
  setAutoLogout(state) {
    state.didAutoLogout = true;
  },
  SET_HORSES(state, horses) {
    state.horses = horses
  },
  SET_ERROR: (state, error) => {
    state.error = error;
  },
  SET_SUCCESS: (state, success) => {
    state.success = success
  }
};
