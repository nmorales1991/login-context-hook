import React, { useReducer, useEffect,useState } from "react";
import authReducer from "./reducers/authentication.reducer";
import { setCurrentUser } from "./actions/authentication.action";
import AuthStateGlobal from "./AuthStateGlobal";
import jwt_decode from "jwt-decode";

const AuthState = props => {
    const [stateUser, dispatch] = useReducer(authReducer, {
        //useReducer recibe un reducer y un estado inicial. Y devuelve el estado actual y el método dispatch. El stateUser viene del return del reducer
        isAuthenticated: null,
        user: {}
    });
    const [showChild, setShowChild] = useState(false);

    useEffect(() => {
        //esto es como un componentdidmount pero con hooks. El hook use effect se ejecuta en cada render
        if (localStorage.jwt) {
            //reviso si hay un token en el localStorage
            const decoded = localStorage.jwt ? localStorage.jwt : "";
            dispatch(setCurrentUser(jwt_decode(decoded))); //si hay un token entonces lo decodifico y hago un dispatch del action setCurrentUser
            
        }
        setShowChild(true);
    }, []); // estas llaves cuadradas significa que este hook sólo se ejecutará al montarse y al desmontarse, y no dependen del state. Entonces esto se ejecutará sólo la primera vez que se ejecuta nuestra Aplicación (cuando se monta el componente). Si no estuvieran estas llaves entonces se ejecutaría siempre que hay un cambio
    if (!showChild) {
        return null;
    } else {
        return (
            //acá envuelvo mi mi aplicación para entregar el state a todos los componentes que quieran consumirla. Se deve poner la palabra Provider, para pasar el context a componentes hijos
            <AuthStateGlobal.Provider
                value={{
                    // acá envío lo que quiero que mis demás componentes quieren consumir, en este caso devuelvo la info del usuario más un booleano para ver si está logueado, y también paso el método dispatch para que mis demás componentes puedan ejecutar actions que llaman al reducer. Como es el caso del logout
                    stateUser,
                    dispatch
                }}
            >
                {props.children}
            </AuthStateGlobal.Provider>
        );
    }
};

export default AuthState;
