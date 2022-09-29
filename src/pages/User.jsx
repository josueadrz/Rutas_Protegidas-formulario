import { useState } from "react";
import { Navigate } from "react-router-dom";
import { isAuthenticated, uploadPhoto } from "../services/autoServices";

const Users = () => {
    const [userData, setUserData] = useState({
        name: "",
        age: 0,
        birth: "",
        peruvian: true,
        height: 0.0,
        photo_url: ""
    });

    const sendUserData = (e) => {
        e.preventDefault();
        console.log(userData);
    };

    const handleInputChange = (e) => {
        // Capturamos los valores que necesitamos(name y value)
        // const name = e.currentTarget.name;
        // const value = e.currentTarget.value;
        const { name, value } = e.currentTarget;

        // Modificar value según nuestra necesidad (string, number, float, boolean)
        if (name === "name" || name === "birth") {
            return setUserData({
                ...userData,
                [e.currentTarget.name]: value,
            });
        } else if (name === "age") {
            return setUserData({
                ...userData,
                [e.currentTarget.name]: parseInt(value),
            });
        } else if (name === "peruvian") {
            return setUserData({
                ...userData,
                [e.currentTarget.name]: !userData.peruvian,
            });
        } else {
            return setUserData({
                ...userData,
                [e.currentTarget.name]: parseFloat(value),
            });
        }
    };

    const handleFileChange = async (e) => {
        const file = e.currentTarget.files[0]
        const response = await uploadPhoto(file)

        if (response.status === 201) {
            console.log("La iamgen fue guardada correctamente")
            setUserData({
                ...userData,
                photo_url: response.json.url
            })
        }
    }

    if (!isAuthenticated()) {
        return <Navigate to="/" />;
    }

    return (
        <div className="App">
            <form onSubmit={sendUserData}>
                <h2>User data</h2>
                <div className="form_group">
                    <label>Name</label>
                    <input type="text" name="name" onChange={handleInputChange} />
                </div>
                <div className="form_group">
                    <label>Age</label>
                    <input
                        type="number"
                        min={0}
                        step={1}
                        name="age"
                        onChange={handleInputChange}
                    />
                </div>
                <div className="form_group">
                    <label>Birth</label>
                    <input
                        type={"datetime-local"}
                        name="birth"
                        onChange={handleInputChange}
                    />
                </div>
                <div className="form_group">
                    <label>Peruvian</label>
                    <input
                        type="checkbox"
                        name="peruvian"
                        checked={userData.peruvian}
                        onChange={handleInputChange}
                    />
                </div>
                <div className="form_group">
                    <label>Height</label>
                    <input
                        type="number"
                        min={0}
                        step={0.01}
                        name="height"
                        onChange={handleInputChange}
                    />
                </div>
                <div className="form_group">
                    <label>Photo</label>
                    <input
                        type="file"
                        name="photo"
                        onChange={handleFileChange}
                    />
                </div>
                <button type="submit">Submit data</button>
            </form>
        </div>
    );
};

export default Users;