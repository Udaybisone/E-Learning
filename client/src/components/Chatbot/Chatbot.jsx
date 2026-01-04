import { useEffect, useRef, useState } from "react";

export default function ChatBot() {
  const [open, setOpen] = useState(false);
  const [input, setInput] = useState("");
  const [typing, setTyping] = useState(false);
  const [messages, setMessages] = useState([
    {
      from: "bot",
      text: "👋 Hi! I’m SmartBot. I can help you discover courses and make purchases."
    }
  ]);
  const endRef = useRef(null);

  useEffect(() => {
    endRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, typing]);

  const sendMessage = () => {
    if (!input.trim()) return;

    setMessages(prev => [...prev, { from: "user", text: input }]);
    setInput("");
    setTyping(true);

    setTimeout(() => {
      setTyping(false);
      setMessages(prev => [
        ...prev,
        {
          from: "bot",
          text: "✨ Great choice! I can suggest the best courses based on your interest."
        }
      ]);
    }, 1200);
  };

  return (
    <>
      {/* Floating launcher */}
      {!open && (
        <button
          onClick={() => setOpen(true)}
          className="fixed bottom-6 right-6 w-16 h-16 rounded-full bg-gradient-to-br from-indigo-500 via-blue-500 to-cyan-400 shadow-[0_0_30px_rgba(99,102,241,0.7)] hover:scale-110 transition-all duration-300 flex items-center justify-center text-white text-2xl"
        >
          💬
        </button>
      )}

      {/* Chat container */}
      {open && (
        <div className="fixed bottom-6 right-6 w-[380px] h-[560px] rounded-3xl bg-gray-900/80 backdrop-blur-xl shadow-2xl border border-white/10 flex flex-col overflow-hidden animate-fadeIn">

          {/* Header */}
          <div className="px-5 py-4 bg-gradient-to-r from-indigo-600 via-blue-600 to-cyan-500 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-white text-indigo-600 font-bold flex items-center justify-center shadow">
                S
              </div>
              <div>
                <p className="text-white font-semibold leading-none">
                  SmartBot
                </p>
                <p className="text-xs text-blue-100">AI Course Assistant</p>
              </div>
            </div>

            <button
              onClick={() => setOpen(false)}
              className="text-white/80 hover:text-white text-lg"
            >
              ✕
            </button>
          </div>

          {/* Messages */}
          <div className="flex-1 px-5 py-4 space-y-4 overflow-y-auto scrollbar-thin scrollbar-thumb-white/10">

            {messages.map((msg, i) => (
              <div
                key={i}
                className={`flex ${
                  msg.from === "user" ? "justify-end" : "justify-start"
                }`}
              >
                <div
                  className={`relative max-w-[75%] px-4 py-3 text-sm leading-relaxed rounded-2xl ${
                    msg.from === "user"
                      ? "bg-gradient-to-br from-blue-600 to-indigo-600 text-white rounded-br-sm"
                      : "bg-gray-800/80 text-gray-100 rounded-bl-sm"
                  }`}
                >
                  {msg.text}
                </div>
              </div>
            ))}

            {/* Typing indicator */}
            {typing && (
              <div className="flex justify-start">
                <div className="bg-gray-800 px-4 py-3 rounded-2xl flex gap-1">
                  <span className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" />
                  <span className="w-2 h-2 bg-gray-400 rounded-full animate-bounce delay-100" />
                  <span className="w-2 h-2 bg-gray-400 rounded-full animate-bounce delay-200" />
                </div>
              </div>
            )}

            <div ref={endRef} />
          </div>

          {/* Input */}
          <div className="p-4 bg-gray-900/70 border-t border-white/10">
            <div className="flex items-center gap-3 bg-gray-800/80 rounded-2xl px-4 py-3 focus-within:ring-2 focus-within:ring-blue-500 transition">
              <input
                value={input}
                onChange={e => setInput(e.target.value)}
                onKeyDown={e => e.key === "Enter" && sendMessage()}
                placeholder="Ask about courses, prices, topics..."
                className="flex-1 bg-transparent text-white placeholder-gray-400 text-sm outline-none"
              />
              <button
                onClick={sendMessage}
                className="text-blue-400 hover:text-blue-500 text-xl transition"
              >
                ➤
              </button>
            </div>
          </div>

        </div>
      )}
    </>
  );
}
