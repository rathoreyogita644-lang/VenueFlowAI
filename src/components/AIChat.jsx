import { useState } from 'react';
import { MessageCircle, Send } from 'lucide-react';

export function AIChat() {
  const [messages, setMessages] = useState([
    { role: 'ai', text: "Hi! Ask me about wait times, directions, or food! 😊" }
  ]);
  const [input, setInput] = useState('');

  const sendMessage = () => {
    if (!input.trim()) return;
    
    const userMsg = { role: 'user', text: input };
    setMessages([...messages, userMsg]);
    
    // AI Response (Gemini simulation)
    setTimeout(() => {
      const responses = {
        'food': "🎯 Gate 7 hot dogs: 4min wait, 180m away. Turn left!",
        'bathroom': "🚻 Restrooms at Gate 3: 2min wait, closest option.",
        'default': "I can help with navigation, wait times, or seat finding!"
      };
      
      const response = responses[input.toLowerCase().includes('food') ? 'food' : 
                       input.toLowerCase().includes('bathroom') ? 'bathroom' : 'default'];
      
      setMessages(msgs => [...msgs, { role: 'ai', text: response }]);
    }, 800);
    
    setInput('');
  };

  return (
    <div className="fixed bottom-6 left-6 right-6 max-w-md mx-auto bg-white/90 backdrop-blur-xl rounded-3xl shadow-2xl border max-h-96 overflow-hidden">
      <div className="p-6 pb-3">
        <div className="flex items-center mb-4">
          <MessageCircle className="w-6 h-6 mr-2 text-purple-600" />
          <h3 className="font-bold text-gray-800">AI Assistant</h3>
        </div>
        
        <div className="space-y-3 max-h-48 overflow-y-auto mb-4 pr-2">
          {messages.map((msg, i) => (
            <div key={i} className={`flex ${msg.role === 'ai' ? 'justify-start' : 'justify-end'}`}>
              <div className={`max-w-[80%] p-3 rounded-2xl ${
                msg.role === 'ai' 
                  ? 'bg-purple-100 text-purple-800' 
                  : 'bg-blue-500 text-white'
              }`}>
                {msg.text}
              </div>
            </div>
          ))}
        </div>
        
        <div className="flex gap-2">
          <input
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyPress={(e) => e.key === 'Enter' && sendMessage()}
            placeholder="Ask about food, directions..."
            className="flex-1 bg-gray-100 rounded-2xl px-4 py-3 text-gray-800 outline-none"
          />
          <button
            onClick={sendMessage}
            className="bg-purple-600 hover:bg-purple-700 p-3 rounded-2xl"
          >
            <Send className="w-5 h-5" />
          </button>
        </div>
      </div>
    </div>
  );
}
