export default {
  allNewses: (state) => state.newses,
  allEmployeesNewses: (state) => state.employeesNewses,
  allTasks: (state) => state.tasks,
  userId: (state) => state.userId,
  token: (state) => state.token,
  isAuthenticated: (state) => !!state.token,
  didAutoLogout: (state) => state.didAutoLogout,
  allEmployees: (state) => state.employees,
  userPosition: (state) => state.userPosition,
  allHorses: (state) => state.horses,
  error: (state) => state.error,
  success: (state) => state.success
};
