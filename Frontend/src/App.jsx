import { useState, useEffect} from "react";
import io from "socket.io-client";

const socket = io("https://socket-io-server-70vb.onrender.com"); 

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
    setMessage("");
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
    <main className="bg-zinc-700 h-screen flex items-center justify-center">
      <div className="flex flex-col w-[1000px] mx-4 my-4 bg-zinc-900 rounded-3xl antialiased">
        <header className="p-5">
          <h1 className="text-2xl text-white font-semibold text-center">
            Chat con <span className="text-emerald-500">Socket.io</span> y React
          </h1>
        </header>
        <section className="h-full w-auto overflow-y-auto p-5 flex flex-col-reverse">
          {messages
            .slice(0)
            .reverse()
            .map((message, index) => (
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
                    className={`text-xs inline-block rounded-lg p-0.5 ${
                      message.from === "Me"
                        ? "text-sky-300"
                        : "text-emerald-500"
                    }`}
                  >
                    {message.from}
                  </span>
                  <div className="whitespace-normal flex justify-between items-center">
                    <span className="text-sm mr-3 text-white">
                      {message.body}
                    </span>
                    <span className="text-xs text-gray-50">{message.time}</span>
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
                inputMode="text"
                required
                placeholder="Escribe tu mensaje"
                className="border-2 border-zinc-500 p-2 rounded text-black w-9/12"
                onChange={(e) => setMessage(e.target.value)}
                value={message}
              />{" "}
              <button className="border-2 text-white border-zinc-500 p-1 rounded text-center w-1/4">
                Enviar
              </button>
            </div>
          </form>
        </footer>
        <footer>
          <div className="flex justify-center items-center text-white gap-1 max-sm:mb-2 md:mb-2">
            hecho con <span>❤</span> por
            {
              <a
                href="https://github.com/SABHGG"
                target="_blank"
                className="text-emerald-500"
              >
                {"SABHGG"}
              </a>
            }
          </div>
        </footer>
      </div>
    </main>
  );
};

export default App;
