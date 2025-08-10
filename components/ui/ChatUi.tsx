import React, { useState, useRef, useEffect } from 'react';

type Message = {
  role: 'user' | 'assistant';
  content: string;
};

export default function ChatUi() {
  const [input, setInput] = useState('');
  const [chatLog, setChatLog] = useState<Message[]>([]);
  const [open, setOpen] = useState(false);
  const [isThinking, setIsThinking] = useState(false);
  const chatEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [chatLog, open, isThinking]);

  const handleSend = async () => {
    if (!input.trim()) return;
    const userMessage: Message = { role: 'user', content: input };
    setChatLog([...chatLog, userMessage]);
    setInput('');
    setIsThinking(true);
    try {
      const response = await fetch('https://openrouter.ai/api/v1/chat/completions', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${process.env.NEXT_PUBLIC_OPENROUTER_API_KEY}`,
          'Referer': 'https://softicoreit.com',
          'X-Title': 'Softicore IT',
        },
        body: JSON.stringify({
          model: 'openai/gpt-4o-mini',
          messages: [...chatLog, userMessage],
        }),
      });
      const data = await response.json();
      setIsThinking(false);
      if (response.ok) {
        const botMessage: Message = {
          role: 'assistant',
          content: data.choices[0].message.content
        };
        setChatLog(prev => [...prev, botMessage]);
      } else {
        console.error('API Error:', data);
      }
    } catch (error) {
      setIsThinking(false);
      console.error('Fetch error:', error);
    }
  };

  return (
    <>
      {/* Floating Chat Button */}
      {!open && (
        <button
          className=" bottom-6 right-6 z-50 bg-blue-600 hover:bg-blue-700 text-white rounded-full shadow-lg w-14 h-14 flex items-center justify-center text-2xl focus:outline-none focus:ring-2 focus:ring-blue-400"
          onClick={() => setOpen(true)}
          aria-label="Open chat"
        >
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-8 h-8">
            <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 12c0 4.556 4.694 8.25 10.125 8.25.982 0 1.94-.09 2.857-.26a.75.75 0 01.607.13l2.347 1.76a.75.75 0 001.2-.6v-2.13a.75.75 0 01.22-.53A7.5 7.5 0 0021.75 12c0-4.556-4.694-8.25-10.125-8.25S2.25 7.444 2.25 12z" />
          </svg>
        </button>
      )}
      {/* Chat Box */}
      {open && (
        <div className="fixed bottom-6 right-6 z-50 w-full max-w-md sm:w-[24rem] bg-white rounded-xl shadow-2xl flex flex-col h-[70vh] border border-gray-200 animate-fade-in">
          <div className="flex items-center justify-between px-6 py-4 border-b border-gray-200 bg-white rounded-t-xl">
            <h1 className="text-[18px] font-bold text-gray-800">Chat with Softicore IT Assistant</h1>
            <button
              className="ml-2 text-gray-400 hover:text-gray-700 focus:outline-none"
              onClick={() => setOpen(false)}
              aria-label="Close chat"
            >
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-6 h-6">
                <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>
          <div className="flex-1 overflow-y-auto px-4 py-2 space-y-2 bg-gray-50">
            {chatLog.length === 0 && (
              <div className="text-gray-400 text-center mt-10">Start the conversation...</div>
            )}
            {chatLog.map((msg, i) => (
              <div
                key={i}
                className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}
              >
                <div
                  className={`rounded-lg px-4 py-2 max-w-[80%] text-sm shadow
                    ${msg.role === 'user'
                      ? 'bg-blue-600 text-white rounded-br-none'
                      : 'bg-gray-200 text-gray-800 rounded-bl-none'}
                  `}
                  aria-label={msg.role === 'user' ? 'Your message' : 'Assistant message'}
                >
                  {msg.content}
                </div>
              </div>
            ))}
            {isThinking && (
              <div className="flex justify-start">
                <div className="rounded-lg px-4 py-2 max-w-[80%] text-sm shadow bg-gray-200 text-gray-800 rounded-bl-none flex items-center gap-2" aria-label="Assistant is thinking">
                  <span className="animate-pulse">Thinking...</span>
                  <svg className="w-4 h-4 text-gray-400 animate-spin" fill="none" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z"></path>
                  </svg>
                </div>
              </div>
            )}
            <div ref={chatEndRef} />
          </div>
          <form
            className="flex items-center gap-2 px-4 py-3 border-t border-gray-200 bg-white"
            onSubmit={e => {
              e.preventDefault();
              handleSend();
            }}
          >
            <input
              className="flex-1 rounded-lg border border-gray-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400 text-gray-800 bg-gray-50"
              value={input}
              onChange={e => setInput(e.target.value)}
              onKeyDown={e => {
                if (e.key === 'Enter' && !e.shiftKey) {
                  e.preventDefault();
                  handleSend();
                }
              }}
              placeholder="Type your message..."
              aria-label="Type your message"
              autoFocus
            />
            <button
              type="submit"
              className="bg-blue-600 hover:bg-blue-700 text-white font-semibold px-4 py-2 rounded-lg transition-colors disabled:opacity-50"
              disabled={!input.trim() || isThinking}
              aria-label="Send message"
            >
              Send
            </button>
          </form>
        </div>
      )}
    </>
  );
}
