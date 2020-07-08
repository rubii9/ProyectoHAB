import axios from "axios";
import jwt from "jwt-decode";
//IMPORTANDO SWEETALERT
import Swal from "sweetalert2";

const ENDPOINT = "http://localhost:3001";
const AUTH_TOKEN_KEY = "authToken";
const ROLE = "role";

//FUNCION LOGIN
export function loginUser(email, password) {
  return new Promise(async (resolve, reject) => {
    try {
      let res = await axios({
        url: `${ENDPOINT}/users/login`, //URL DE LA AUTENTICACIÓN
        method: "POST", //MÉTODO DE LA AUTENTIFICACIÓN
        data: {
          email: email,
          password: password,
        }, // DATOS DE LA AUTENTIFICACIÓN
      });

      setAuthToken(res.data.data.token, res.data.data.tokenPayload);
      setIsAdmin(res.data.data.tokenPayload.role);
      resolve();
    } catch (err) {
      if (err.response) {
        Swal.fire({
          icon: "error",
          title: "Error",
          text: `${err.response.data.message}`,
          confirmButtonText: "Ok",
        });
      }

      console.log("Error en login: ", err);
    }
  });
}

//LOGOUT
export function clearLogin() {
  axios.defaults.headers.common["Authorization"] = "";
  localStorage.removeItem(AUTH_TOKEN_KEY);
  localStorage.removeItem("Usuario");
  localStorage.removeItem("userID");
  clearAdmin();
}

// ========================= TOKEN =====================

//GUARDAR TOKEN EN LOCALSTORAGE
export function setAuthToken(token, payload) {
  axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
  localStorage.setItem(AUTH_TOKEN_KEY, token);
  localStorage.setItem("userID", payload.id);
}

//COGER EL TOKEN
export function getAuthToken() {
  return localStorage.getItem(AUTH_TOKEN_KEY);
}

//CONSIGUIENDO FECHA DE CADUCIDAD DEL TOKEN
export function getTokenExpirationDate(encodedToken) {
  let token = jwt(encodedToken);
  //si no hay, no sigue
  if (!token.exp) {
    return null;
  }
  let date = new Date(0);
  date.setUTCSeconds(token.exp);
  return date;
}

//COMPROBANDO SI LA FECHA SIGUE VIGENTE O NO
export function isTokenExpired(token) {
  let expirationDate = getTokenExpirationDate(token);
  return expirationDate < new Date();
}

//COMPROBAR SI EL USER ESTÁ LOGEADO O NO
export function isLoggedIn() {
  let authToken = getAuthToken();
  return !!authToken && !isTokenExpired(authToken);
}

// ========================= ROL USUARIO =====================

//GUARDAR SI ES ADMIN EN LOCAL STORAGE
export function setIsAdmin(isAdmin) {
  localStorage.setItem(ROLE, isAdmin);
}

//BORRAR ROL DEL USER EN LOCAL STORAGE
export function clearAdmin() {
  return localStorage.removeItem(ROLE);
}

// RECUPERAR ROL DESDE LOCAL STORAGE
export function getIsAdmin() {
  return localStorage.getItem(ROLE);
}

//COMPROBAR ROL
export function checkAdmin() {
  let role = false;
  let isAdmin = getIsAdmin();
  if (isAdmin === "true") {
    role = true;
  } else {
    role = false;
  }
  return role;
}
