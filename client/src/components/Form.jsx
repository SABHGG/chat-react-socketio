import { useState, useEffect, useContext } from "react";
import { MyContext } from "./MyContext";
import io from "socket.io-client";

const socket = io("/");

const Form = () => {
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState([]);
  const handleSubmit = (e) => {
    e.preventDefault();
    const date = new Date();
    let time = date.getHours() + ":" + date.getMinutes();
    const newMessage = {
      body: message,
      from: "Me",
      time: time,
    };
    setMessages([...messages, newMessage]);
    socket.emit("message", newMessage);
  };

  useEffect(() => {
    socket.on("message", receiveMessage);

    return () => {
      socket.off("message", receiveMessage);
    };
  }, []);

  const receiveMessage = (message) =>
    setMessages((state) => [...state, message]);

  return (
    <footer>
      <form onSubmit={handleSubmit} className=" p-5 rounded-md">
        <div className="flex gap-2 ">
          <input
            type="text"
            placeholder="Escribe tu mensaje"
            className="border-2 border-zinc-500 p-2 rounded w-10/12 text-black"
            onChange={(e) => setMessage(e.target.value)}
          />{" "}
          <button className="border-2 border-zinc-500 p-1 rounded text-center w-1/11">
            Enviar
          </button>
        </div>
      </form>
    </footer>
  );
};

export default Form;
