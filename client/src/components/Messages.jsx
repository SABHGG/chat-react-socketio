import { useState, useEffect} from "react";
import io from "socket.io-client";

const Messages = () => {
  return (
    <section className="h-4/5 p-5">
      {messages.map((message, index) => (
        <div
          key={index}
          className={`my-3 p-2 text-sm rounded-md flex flex-col-reverse w-fit overflow-hidden overflow-y-auto ${
            message.from === "Me"
              ? "bg-emerald-800 ml-auto"
              : "bg-zinc-950 mr-auto"
          }`}
        >
          <div className="w-auto justify-end">
            <span
              className={`text-xs block ${
                message.from === "Me" ? "text-sky-300" : "text-emerald-500"
              }`}
            >
              {message.from}
            </span>
            <div>
              <span>{message.body}</span>
              <span>{message.time}</span>
            </div>
          </div>
        </div>
      ))}
    </section>
  );
};

import { useState, useEffect, useContext } from "react";
import io from "socket.io-client";

const socket = io("/");

export const Form = () => {
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


export default Messages;
