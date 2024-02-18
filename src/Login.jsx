import { useState } from "react";
import { Link } from "react-router-dom";

import { Card, TextField, Button } from "@mui/material";
export const Login = () => {
    const [name, setName] = useState("");
    const [room, setRoom] = useState("");

    return (
        <div className="login-container">

            <Card className="card-container">
                <h3>Welcome to GroupChat</h3>

                <TextField
                    className="text-field"
                    type="text"
                    placeholder="Name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                />
                <TextField
                    className="text-field"
                    type="text"
                    placeholder="Room Name"
                    value={room}
                    onChange={(e) => setRoom(e.target.value)}
                />
                <Link onClick={e => (!name || !room) ? e.preventDefault() : null}
                    to={`/chat?name=${name}&room=${room}`}>
                    <Button type="submit" variant="contained">Submit</Button>
                </Link>
            </Card>
        </div>
    );
};




