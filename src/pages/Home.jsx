import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { signIn } from "../services/autoServices";
import "../styles.css";

const Home = () => {
    // Instanciamos el usenavigate
    const navigate = useNavigate();
    // Estado que contiene nuestras credenciales de usuario
    const [user, setUser] = useState({
        email: "",
        password: "",
    });
    // Función para ejecutar el evento onSubmit y consumir la API
    const sendSignInData = async (e) => {
        e.preventDefault();
        // Forma 1 de hacer un fetch (no debe haber un async delante de la funcion)
        // fetch("https://reqres.in/api/login", {
        //   method: "POST",
        //   headers: {
        //     "Content-Type": "application/json",
        //   },
        //   body: JSON.stringify(user),
        // })
        //   .then((response) => response.json())
        //   .then((data) => console.log(data));

        // Forma 2 de hacer un fetch (en la funcion authServices)
        const response = await signIn(user);

        if (response.status === 200) {
            localStorage.setItem("token", response.json.token)
            navigate("/users");
        } else {
            alert("Credenciales incorrectas")
        }
    };
    // Función controlada, para obtener valores de los input
    const handleInputChange = (e) => {
        setUser({
            ...user,
            [e.currentTarget.name]: e.currentTarget.value,
        });
    };

    return (
        <div className="App">
            <form onSubmit={sendSignInData}>
                <h2>Sign In</h2>
                <div className="form_group">
                    <label>Email</label>
                    <input type="email" name="email" onChange={handleInputChange} />
                </div>
                <div className="form_group">
                    <label>Password</label>
                    <input type="password" name="password" onChange={handleInputChange} />
                </div>
                <button type="submit">Sign In</button>
            </form>
        </div>
    );
};

export default Home;