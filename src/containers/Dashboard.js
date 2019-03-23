import React, { useEffect, useContext } from "react";
import { Header } from "../components/index.components";
import "../styles/Dashboard.css";
import AuthStateGlobal from "../context/AuthStateGlobal";//para consumir el context se debe importar el componente creador del contexto

const Dashboard = props => {
    const context = useContext(AuthStateGlobal);// y se usa el hook useContext

    useEffect(() => {//el hook useEffect se ejecuta cada vez que se hace render. Si se hace un dispatch se volverá a ejecutar, es en el caso del dispatch del logout. Si se ejecuta el dispatch que está en el Header entonces este hook volverá a ejecutarse y se dará cuenta que es false entonces se irá a /login. Es importante saber bien como usar el useEffect. Ir al provider AuthState.js y ver que el useEffect es diferente, lleva unas llaves cuadradas como segundo argumento.
        if (context.stateUser.isAuthenticated === false || context.stateUser.isAuthenticated === null) {//stateUser viene del Provider, en el value le pusimos así
						props.history.push("/login");//si el logueo es false, o null, entonces redirigue a login. Es para cuando intentan entrar directo al dashboard, algo parecido haremos en el componente login
        }
		});

    return (
        <div>
            <Header />{ /* este componente header no recibe props ni nada, pero está envuelto en el Provider con el contexto, así que puedo usar el contexto dentro de él sin hacer nada más, solo llamarlo. Acá está el logout */}
            <div className="container-fluid">
                <div className="flex-xl-nowrap row">
                   {context.stateUser.isAuthenticated===true? `${context.stateUser.user.usuariobd.nombre_usuario} ${context.stateUser.user.usuariobd.apaterno_usuario}`:''}
                </div>
            </div>
        </div>
    );
};

export default Dashboard;
