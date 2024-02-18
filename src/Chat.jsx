import { useEffect, useState } from "react";
import "./App.css";
import io from "socket.io-client";
import { Button } from "@mui/material";
import SendIcon from "@mui/icons-material/Send";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
let socket;
const Chat = () => {
    const backendurl = "http://localhost:8000";
    const [name, setName] = useState("");
    const [room, setRoom] = useState("");
    const [message, setMessage] = useState([]);
    const [msg, setMsg] = useState("");
    const [activeUsers, setActiveUsers] = useState([]);

    useEffect(() => {
        const search = window.location.search;
        const params = new URLSearchParams(search);
        const name = params.get("name");
        const room = params.get("room");
        setName(name);
        setRoom(room);

        socket = io(backendurl);
        socket.emit("join", { name: name, room: room }, (error) => {
            if (error) {
                alert(error);
            }
        });

        return () => {
            socket.disconnect();
            socket.off();
        };
    }, []);

    useEffect(() => {
        socket.on("message", (msg) => {
            setMessage((premessage) => [...premessage, msg]);

            setTimeout(() => {
                var div = document.getElementById("chat_body");
                div.scrollTop = div.scrollHeight;
            }, 100);
        });
        socket.on("activeUsers", (users) => {
            setActiveUsers(users);
        });

    }, []);

    const sendMessage = () => {
        socket.emit("sendmsg", msg, () => setMsg(""));
        setTimeout(() => {
            var div = document.getElementById("chat_body");
            div.scrollTop = div.scrollHeight;
        }, 100);
    };
    const displaymsg = msg ? "flex" : "block";
    return (
        <div className="chat-container">
            <div className="dic-subcon">
                <p className="active-users">Active Users</p>
                <ul>
                    {activeUsers.map((each, index) => (
                        <div key={index}>
                            <p className="pelement-chat">
                                <AccountCircleIcon /> {each.name}
                            </p>

                        </div>
                    ))}
                </ul>
            </div>
            <div style={{ width: "400px" }}>
                <div>
                    <h3 className="chat-room">{room}</h3>
                </div>
                <div className="chat-con" id="chat_body">
                    {message.map((msg, index) => (
                        <div className="mesg-div" key={index}>
                            <div
                                style={{
                                    maxWidth: name === msg.user ? "300px" : "300px",
                                    background: name === msg.user ? "#0277bd" : "#e0e0e0",
                                    color: name === msg.user ? "#ffff" : "#263238",
                                    margin: name === msg.user ? "0px 0px 0px 90px" : "0px 10px",
                                }}
                            >
                                <div className="msg-chat">
                                    <p>{msg.text}</p>
                                    <p
                                        style={{
                                            fontSize: "10px",
                                            color: name === msg.user ? "#ffff" : "black",
                                        }}
                                    >
                                        {msg.user}
                                    </p>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>

                <div
                    style={{
                        display: displaymsg,
                        alignItems: "center",
                        justifyContent: "center",
                        flexDirection: "row",
                    }}
                >
                    <input
                        style={{
                            padding: "5px 0px 5px 5px",
                            width: msg ? "350px" : "390px",
                            backgroundColor: "#eeeeee",
                        }}
                        type="text"
                        onChange={(e) => setMsg(e.target.value)}
                        value={msg}
                        name="text_input"
                        placeholder="write your message here"
                    />
                    {msg && (
                        <Button onClick={sendMessage}>
                            <SendIcon />
                        </Button>
                    )}
                </div>
            </div>
        </div>
    );
};
export default Chat;
