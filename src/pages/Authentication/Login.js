import React, { useLayoutEffect, useContext, useState } from "react";
import AuthStateGlobal from "../../context/AuthStateGlobal";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import { loginUser } from "../../context/actions/authentication.action";

const Login = props => {
    const context = useContext(AuthStateGlobal); //recibo el context
    const [rut_usuario, setrutusuario] = useState(""); // este hook se usa para el estado del componente, es lo mismo que hacíamos cuando declarabamos un constructor y un state, esto recibe un estado inicial y devuelve el estado actual y una función para setear el estado, lo mismo que un setState
    const [clave_usuario, setclaveusuario] = useState("");

    useLayoutEffect(() => {
        // si está logueado no lo dejo ver este componente y lo saco al dashboard
        if (context.stateUser.isAuthenticated === true) {
            props.history.push("/");
        }
    });

    const handleSubmit = e => {
        //acá controlo el formulario
        const user = {
            rut_usuario,
            clave_usuario
        };
        loginUser(user, context.dispatch); // ejecuto el action loginUser pasándole el usuario, y el método dispatch que viene del provider y el hook useReducer
        e.preventDefault(); // no recargo
    };

    return (
        <Container>
            <Row>
                <Col md={4}>
                    <Form id="formulariousuarios" onSubmit={handleSubmit}>
                        <Form.Group>
                            <Form.Label>Usuario</Form.Label>
                            <Form.Control
                                onChange={e => setrutusuario(e.target.value)}
                                id="rut_usuario"
                                name="rut_usuario"
                                type="text"
                                placeholder="Ingrese su Usuario"
                            />
                        </Form.Group>

                        <Form.Group>
                            <Form.Label>Clave</Form.Label>
                            <Form.Control
                                onChange={e => setclaveusuario(e.target.value)}
                                id="clave_usuario"
                                name="clave_usuario"
                                type="password"
                                placeholder="Password"
                            />
                        </Form.Group>

                        <Button variant="primary" type="submit">
                            Entrar
                        </Button>
                    </Form>
                </Col>
            </Row>
        </Container>
    );
};

export default Login;
