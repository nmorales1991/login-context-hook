import React, { useContext } from "react";
import Navbar from "react-bootstrap/Navbar";
import "../../styles/Header.css";
import { Link } from "react-router-dom";
import Button from "react-bootstrap/Button";
import AuthStateGlobal from "./../../context/AuthStateGlobal";//siempre que se consuma el contexto hay que importar la clase creadora
import { logoutUser } from "./../../context/actions/authentication.action";//importamos el action para desloguear

const Header = props => {
    const context = useContext(AuthStateGlobal);//se recibe el contexto
    const cerrarSesion = () => { //función que hace un dispatch del action logoutUser, el cual desloguea. este método dispatch viene del Provider, el cual nos entregó el hook useReducer, y así podemos disparar acciones que ejecutarán el reducer
        logoutUser(context.dispatch);
    };
    return (
        <Navbar sticky="top" className="header navbar-dark">
            <div className="d-none d-md-flex navbar-nav">
                <Link to="/" className="nav-link active">
                    Título
                </Link>
            </div>
            <div style={{ color: "#fff" }} className="flex-grow-1 user">
                {context.stateUser.isAuthenticated ? (//si hay algo en isAuthenticated (si no es nulo)
                    context.stateUser.isAuthenticated === true ? (//entonces veo si es true o false. Si es true muestro el botón para cerrar sesión
                        <Button onClick={cerrarSesion} variant="danger">
                            Salir
                        </Button>
                    ) : (//si es false no muestro nada. Esto lo había puesto porque necesitaba hacer algo más acá. Pero el if no entrará nunca acá, ya que si es false, se ejecutará el hook useEffect del Dashboard y redirigirá hacia el login
											""
                    )
                ) : (//si es null tampoco muestra nada
                    ""
                )}
            </div>
        </Navbar>
    );
};
export default Header;
