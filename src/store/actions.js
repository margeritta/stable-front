let timer;

export default {
  tryLogin(context) {
    const token = localStorage.getItem("token");
    const userId = localStorage.getItem("userId");
    const userPosition = localStorage.getItem("userPosition");
    const tokenExpiration = localStorage.getItem("tokenExpiration");

    const expiresIn = +tokenExpiration - new Date().getTime();

    if (expiresIn < 0) {
      return;
    }

    timer = setTimeout(function() {
      context.dispatch("autoLogout");
    }, expiresIn);

    if (token && userId && userPosition) {
      context.commit("SET_USER", {
        token: token,
        userId: userId,
        userPosition: userPosition,
      });
    }
  },
  logout(context) {
    localStorage.removeItem("token");
    localStorage.removeItem("userId");
    localStorage.removeItem("userPosition");
    localStorage.removeItem("tokenExpiration");

    clearTimeout(timer);

    context.commit("SET_USER", {
      token: null,
      userId: null,
      userPosition: null,
    });
  },
  autoLogout(context) {
    context.dispatch("logout");
    context.commit("setAutoLogout");
  },
  async login(context, payload) {
    const response = await fetch(
      "https://stable-rest-api.herokuapp.com/" + "login",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Access-Control-Allow-Origin": "*",
        },
        body: JSON.stringify({
          email: payload.email,
          password: payload.password,
        }),
      }
    );
    const responseData = await response.json();

    if (!response.ok) {
      context.commit(
        "SET_ERROR",
        response.status +
          " " +
          response.statusText +
          " Nie udało się zalogować. Spróbuj jeszcze raz!"
      );

      const error = new Error(
        responseData.message || "Failed to fetch requests."
      );
      throw error;
    }
    const expiresIn = +responseData.expires_in * 1000;
    const expirationDate = new Date().getTime() + expiresIn;
    localStorage.setItem("token", responseData.access_token);
    localStorage.setItem("userId", responseData.employee_id);
    localStorage.setItem("userPosition", responseData.user_position);
    localStorage.setItem("tokenExpiration", expirationDate);
    timer = setTimeout(function() {
      context.dispatch("autoLogout");
    }, expiresIn);

    context.commit("SET_USER", {
      token: responseData.access_token,
      userId: responseData.employee_id,
      userPosition: responseData.user_position,
    });
  },
  async addNews(context, payload) {
    const response = await fetch(payload.url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + context.rootState.token,
        "Access-Control-Allow-Origin": "*",
      },
      body: JSON.stringify({
        author: context.rootState.userId,
        date: new Date().toISOString().split("T")[0],
        description: payload.description,
        title: payload.title,
      }),
    });
    const responseData = await response.json();

    if (!response.ok) {
      context.commit(
        "SET_ERROR",
        response.status +
          " " +
          response.statusText +
          " Nie udało się dodać zasobu. Spróbuj jeszcze raz!"
      );

      const error = new Error(
        responseData.message || "Failed to fetch requests."
      );
      throw error;
    } else {
      context.commit("SET_SUCCESS", true);
    }
  },
  async addHorse(context, payload) {
    const response = await fetch(payload.url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + context.rootState.token,
        "Access-Control-Allow-Origin": "*",
      },
      body: JSON.stringify({
        name: payload.name,
        mother: payload.mother,
        father: payload.father,
        born: payload.born,
        owner: payload.owner,
        description: payload.description,
        horse_coat: payload.horseCoat,
        image_name: payload.imageName,
      }),
    });
    const responseData = await response.json();

    if (!response.ok) {
      context.commit(
        "SET_ERROR",
        response.status +
          " " +
          response.statusText +
          " Nie udało się pobrać zasobów. Spróbuj jeszcze raz!"
      );

      const error = new Error(
        responseData.message || "Failed to fetch requests."
      );
      throw error;
    } else {
      context.commit("SET_SUCCESS", true);
    }
  },
  async addEmployee(context, payload) {
    const response = await fetch(payload.url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + context.rootState.token,
        "Access-Control-Allow-Origin": "*",
      },
      body: JSON.stringify({
        first_name: payload.first_name,
        last_name: payload.last_name,
        phone_number: payload.phone_number,
        born: payload.born,
        email: payload.email,
        password: payload.password,
        position: payload.position,
      }),
    });
    const responseData = await response.json();

    if (!response.ok) {
      context.commit(
        "SET_ERROR",
        response.status +
          " " +
          response.statusText +
          " Nie udało się dodać zasobów. Spróbuj jeszcze raz!"
      );

      const error = new Error(
        responseData.message || "Failed to fetch requests."
      );
      throw error;
    } else {
      context.commit("SET_SUCCESS", true);
    }
  },
  async addTask(context, payload) {
    const response = await fetch(payload.url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + context.rootState.token,
        "Access-Control-Allow-Origin": "*",
      },
      body: JSON.stringify({
        employee: payload.employee,
        status: payload.status,
        description: payload.description,
        title: payload.title,
        date: new Date().toISOString().split("T")[0],
      }),
    });
    const responseData = await response.json();

    if (!response.ok) {
      context.commit(
        "SET_ERROR",
        response.status +
          " " +
          response.statusText +
          " Nie udało się pobrać zasobów. Spróbuj jeszcze raz!"
      );

      const error = new Error(
        responseData.message || "Failed to fetch requests."
      );
      throw error;
    } else {
      context.commit("SET_SUCCESS", true);
    }
  },
  async delete(context, payload) {
    const response = await fetch(
      payload.url + parseInt(payload.id) + "/delete",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + context.rootState.token,
          "Access-Control-Allow-Origin": "*",
        },
      }
    );
    const responseData = await response.json();

    if (!response.ok) {
      context.commit(
        "SET_ERROR",
        response.status +
          " " +
          response.statusText +
          " Nie udało się pobrać zasobów. Spróbuj jeszcze raz!"
      );

      const error = new Error(
        responseData.message || "Failed to fetch requests."
      );
      throw error;
    } else {
      context.commit("SET_SUCCESS", true);
    }
  },

  async getNewses(context) {
    const response = await fetch(
      "https://stable-rest-api.herokuapp.com/" + "newses",
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          "Access-Control-Allow-Origin": "*",
        },
      }
    );
    const responseData = await response.json();

    if (!response.ok) {
      context.commit(
        "SET_ERROR",
        response.status +
          " " +
          response.statusText +
          " Nie udało się pobrać zasobów. Spróbuj jeszcze raz!"
      );

      const error = new Error(
        responseData.message || "Failed to fetch requests."
      );
      throw error;
    }

    const results = [];

    for (const i in responseData) {
      const result = {
        id: responseData[i].id,
        date: responseData[i].date,
        title: responseData[i].title,
        description: responseData[i].description,
        author: responseData[i].author,
      };
      results.push(result);
    }
    context.commit("SET_NEWSES", results);
  },
  async getEmployeesNewses(context) {
    const response = await fetch(
      "https://stable-rest-api.herokuapp.com/" + "employees_newses",
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + context.rootState.token,
          "Access-Control-Allow-Origin": "*",
        },
      }
    );
    const responseData = await response.json();

    if (!response.ok) {
      context.commit(
        "SET_ERROR",
        response.status +
          " " +
          response.statusText +
          " Nie udało się pobrać zasobów. Spróbuj jeszcze raz!"
      );

      const error = new Error(
        responseData.message || "Failed to fetch requests."
      );
      throw error;
    }

    const results = [];

    for (const i in responseData) {
      const result = {
        id: responseData[i].id,
        date: responseData[i].date,
        title: responseData[i].title,
        description: responseData[i].description,
        author: responseData[i].author,
      };
      results.push(result);
    }
    context.commit("SET_EMPLOYEES_NEWSES", results);
  },
  async getEmployees(context) {
    const response = await fetch(
      "https://stable-rest-api.herokuapp.com/" + "employees",
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + context.rootState.token,
          "Access-Control-Allow-Origin": "*",
        },
      }
    );
    const responseData = await response.json();

    if (!response.ok) {
      context.commit(
        "SET_ERROR",
        response.status +
          " " +
          response.statusText +
          " Nie udało się pobrać zasobów. Spróbuj jeszcze raz!"
      );

      const error = new Error(
        responseData.message || "Failed to fetch requests."
      );
      throw error;
    }

    const results = [];

    for (const i in responseData) {
      const result = {
        id: responseData[i].id,
        first_name: responseData[i].first_name,
        last_name: responseData[i].last_name,
        email: responseData[i].email,
        position: responseData[i].position,
        phone_number: responseData[i].phone_number,
        born: responseData[i].born,
      };
      results.push(result);
    }
    context.commit("SET_EMPLOYEES", results);
  },
  async getTasks(context, payload) {
    let URL = "https://stable-rest-api.herokuapp.com/" + "tasks";
    if (payload != null) {
      URL += payload.url;
    }
    const response = await fetch(URL, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + context.rootState.token,
        "Access-Control-Allow-Origin": "*",
      },
    });
    const responseData = await response.json();

    if (!response.ok) {
      context.commit(
        "SET_ERROR",
        response.status +
          " " +
          response.statusText +
          " Nie udało się pobrać zasobów. Spróbuj jeszcze raz!"
      );

      const error = new Error(
        responseData.message || "Failed to fetch requests."
      );
      throw error;
    }

    const results = [];

    for (const i in responseData) {
      const result = {
        id: responseData[i].id,
        status: responseData[i].status,
        title: responseData[i].title,
        description: responseData[i].description,
        employee: responseData[i].employee,
        date: responseData[i].date,
      };
      results.push(result);
    }
    context.commit("SET_TASKS", results);
  },
  async getHorses(context) {
    const response = await fetch(
      "https://stable-rest-api.herokuapp.com/" + "horses",
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          "Access-Control-Allow-Origin": "*",
        },
      }
    );
    const responseData = await response.json();

    if (!response.ok) {
      context.commit(
        "SET_ERROR",
        response.status +
          " " +
          response.statusText +
          " Nie udało się pobrać zasobów. Spróbuj jeszcze raz!"
      );

      const error = new Error(
        responseData.message || "Failed to fetch requests."
      );
      throw error;
    }

    const results = [];

    for (const i in responseData) {
      const result = {
        id: responseData[i].id,
        name: responseData[i].name,
        father: responseData[i].father,
        mother: responseData[i].mother,
        description: responseData[i].description,
        image_name: responseData[i].image_name,
        born: responseData[i].born,
        horse_coat: responseData[i].horse_coat,
        owner: responseData[i].owner,
      };
      results.push(result);
    }
    context.commit("SET_HORSES", results);
  },
  showError: (context, errorMsg) => {
    context.commit("SET_ERROR", errorMsg);
  },
};
