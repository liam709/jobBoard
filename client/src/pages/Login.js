import { useState } from "react"
import axios from 'axios';
import { useCookies } from 'react-cookie';
import { useNavigate } from "react-router-dom";
import Form from "../components/Form";
import { Typography } from "@mui/material";

export default function Login() {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [cookie, setCookies] = useCookies(["access_token"])
    const navigate = useNavigate();

    const handleSubmit = async (event) => {
        event.preventDefault();
        try {
            const response = await axios.post("http://localhost:3001/login", {
                username,
                password
            })
            console.log('response', response)
            //Set jwt on login.
            setCookies("access_token", response.data.token);
            window.localStorage.setItem("userID", response.data.userID);
            //Clear fields on submit
            setUsername('');
            setPassword('')
            navigate("/listings")
        } catch (error) {
            //console.log(error)
            alert("Please log in with valid credentials!")
            setUsername('');
            setPassword('')
        }
    }
    //Using form component and passing in props.
    return (
        <>
            <Form
                username={username}
                setUsername={setUsername}
                password={password}
                onSubmit={handleSubmit}
                setPassword={setPassword}
                label="Login">
            </Form>
        </>

    )
}