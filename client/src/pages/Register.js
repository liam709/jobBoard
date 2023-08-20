import Form from "../components/Form";
import { useState } from "react"
import axios from 'axios';
import { useNavigate } from "react-router-dom";

export default function Register() {

    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();

    //Here we want to have axios send a post request to our API when clicking the submit button.
    const handleSubmit = async (event) => {
        event.preventDefault();
        try {
            await axios.post("http://localhost:3001/register", {
                username,
                password,
            });
            alert("Registration Completed! Now login.");
            setUsername('');
            setPassword('')
            navigate('/login')

        } catch (error) {
            console.error(error);
            alert("User already exists!")
            setUsername('');
            setPassword('')
        }
    };
    //Using from component and passing in props.
    return (
        {/* Pass the left side in as props.*/ },
        <Form
            username={username}
            setUsername={setUsername}
            password={password}
            setPassword={setPassword}
            onSubmit={handleSubmit}
            label="Register">
        </Form>


    )
}


