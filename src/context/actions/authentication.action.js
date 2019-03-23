import jwt_decode from "jwt-decode";
export const SET_CURRENT_USER = "SET_CURRENT_USER";

export const loginUser = (user,dispatch) =>{ // action que recibe el usuario (clave y user) y un método dispatch
  fetch("http://178.128.227.48:3000/server/login", {//va a un api en donde busca el usuario y devuelve el token si es que está en la BD
    method: "POST",
    body: JSON.stringify(user),
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json"
    }
  })
    .then(res => res.json())
    .then(data => {
      if (data.ok === true) {
        const token = data.token;
        localStorage.setItem("jwt", token);//si está en la BD entonces guardo el token en el localStorage
        const decoded = jwt_decode(token);
        dispatch(setCurrentUser(decoded));//también lo decodifico, ya que en el token viene info del usuario codificado, para mostrar en los componentes
      } else {
        logoutUser(dispatch);//si no hay nada, entonces me aseguro de dejar vacía la sesión del usuario
      }
    })
    .catch(err => {
      //error de servidor
      logoutUser(dispatch);
    });

};

export const setCurrentUser = decoded => {//esta action se encarga de ir al reducer, ese reducer setea la info del usuario y si es que está logeado o no
  return {
    type: SET_CURRENT_USER,
    payload: decoded
  };
};

export const logoutUser = (dispatch) => {//action para desloguear al usuario, elimina el token y llama al reducer para setear todo a vacío
  localStorage.removeItem("jwt");
  dispatch(setCurrentUser({}));
  
};