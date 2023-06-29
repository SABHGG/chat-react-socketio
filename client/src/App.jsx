import { useState, useEffect } from "react";
import io from "socket.io-client";

const socket = io("/");

const App = () => {
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
    socket.emit("message", message);
  };

  useEffect(() => {
    socket.on("message", receiveMessage);

    return () => {
      socket.off("message", receiveMessage);
    };
  }, []);

  const receiveMessage = (message) => setMessages((state) => [...state, message]);

  return (
    <main className="flex flex-col justify-around h-screen bg-zinc-900 text-white px-6 pt-6 m-auto antialiased">
      <header>
        <h1 className="text-2xl font-bold">Chat</h1>
      </header>
      <section className="h-4/5 w-auto max-h-[697px] overflow-y-auto w p-5 flex flex-col-reverse">
        {messages.map((message, index) => (
          <div
            key={index}
            className={`my-3 p-2 text-sm rounded-md w-fit ${
              message.from === "Me"
                ? "bg-emerald-800 ml-auto"
                : "bg-zinc-950 mr-auto"
            }`}
          >
            <div>
              <span
                className={`text-xs block ${
                  message.from === "Me" ? "text-sky-300" : "text-emerald-500"
                }`}
              >
                {message.from}
              </span>
              <div className="whitespace-normal">
                <span>{message.body}</span>
                <span>{message.time}</span>
              </div>
            </div>
          </div>
        ))}
      </section>
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
    </main>
  );
};

export default App;
