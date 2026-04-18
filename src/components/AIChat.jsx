import React, { useState, useEffect, useRef } from 'react';
import { MessageCircle, Send, Mic, Phone, MapPin, Users, Clock } from 'lucide-react';

export function AIChat({ waitTimes, location }) {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef(null);

  // Initialize with welcome
  useEffect(() => {
    setMessages([{
      role: 'ai',
      text: `Welcome to Section ${location?.section || '112'}! 
Food: ${waitTimes.food}min | Restrooms: ${waitTimes.restroom}min | Entry: ${waitTimes.entry}min`,
      type: 'info',
      timestamp: new Date().toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'})
    }]);
  }, [location, waitTimes]);

  // Auto-scroll to bottom
  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const getAIResponse = (userInput, waitTimes) => {
    const input = userInput.toLowerCase().trim();

    // Food queries
    if (input.includes('food') || input.includes('hot dog') || input.includes('burger') || input.includes('eat')) {
      return `🍔 Food at Gate 7: ${waitTimes.food}min wait (180m).
Turn LEFT from Section 112. Skip Gate 3 (longer lines).`;
    }

    // Restroom queries
    if (input.includes('bathroom') || input.includes('restroom') || input.includes('toilet') || input.includes('washroom')) {
      return `🚻 Restrooms - Gate 3: ${waitTimes.restroom}min (90m).
Straight ahead, right side. Cleanest option.`;
    }

    // Drinks/Beer
    if (input.includes('beer') || input.includes('drink') || input.includes('concession')) {
      return `🍺 Beer - Section 12: ${waitTimes.concessions}min (220m).
Elevator to Level 2. Premium drinks available.`;
    }

    // Entry/Parking
    if (input.includes('gate') || input.includes('entry') || input.includes('ticket')) {
      return `🚪 Entry Gates: ${waitTimes.entry}min average.
Fastest: Gate 7 (mobile tickets). Avoid Gate 1.`;
    }

    if (input.includes('park') || input.includes('car') || input.includes('parking')) {
      return `🚗 Parking Lot B: 5min walk from Section 112.
Follow green P signs. Valet: $20 (Lot A).`;
    }

    // Seating/Section
    if (input.includes('seat') || input.includes('section') || input.includes('find')) {
      return `🎫 Section 112 confirmed.
Aisle 5, Rows 10-15. Half-time show visible!`;
    }

    // General help
    return `Live wait times:
🍔 Food: ${waitTimes.food}min
🚻 Restrooms: ${waitTimes.restroom}min  
🍺 Concessions: ${waitTimes.concessions}min
🚪 Entry: ${waitTimes.entry}min

Ask: "food", "bathroom", "beer", "parking", "seat"`;
  };

  const sendMessage = () => {
    if (!input.trim() || isTyping) return;

    const userMessage = {
      role: 'user',
      text: input.trim(),
      timestamp: new Date().toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'})
    };

    setMessages(prev => [...prev, userMessage]);
    setInput('');
    setIsTyping(true);

    // AI Response
    setTimeout(() => {
      const aiResponse = {
        role: 'ai',
        text: getAIResponse(input, waitTimes),
        type: 'response',
        timestamp: new Date().toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'})
      };
      
      setMessages(prev => [...prev, aiResponse]);
      setIsTyping(false);
    }, 800 + Math.random() * 400); // 0.8-1.2s realistic delay
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      sendMessage();
    }
  };

  const clearChat = () => {
    setMessages([{
      role: 'ai',
      text: `Chat cleared. Live data: Food ${waitTimes.food}min | Restrooms ${waitTimes.restroom}min`,
      type: 'info'
    }]);
  };

  return (
    <div style={{
      position: 'fixed',
      bottom: '20px',
      right: '20px',
      width: '360px',
      maxWidth: '90vw',
      height: '480px',
      zIndex: 1000,
      fontFamily: '-apple-system, BlinkMacSystemFont, sans-serif'
    }}>
      <div style={{
        background: 'rgba(255, 255, 255, 0.97)',
        backdropFilter: 'blur(25px)',
        borderRadius: '24px',
        boxShadow: '0 20px 50px rgba(0,0,0,0.25)',
        border: '1px solid rgba(255,255,255,0.35)',
        height: '100%',
        overflow: 'hidden',
        display: 'flex',
        flexDirection: 'column'
      }}>
        {/* Header */}
        <div style={{
          background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
          padding: '18px 24px',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          color: 'white',
          fontWeight: '700',
          fontSize: '1rem'
        }}>
          <div style={{display: 'flex', alignItems: 'center', gap: '10px'}}>
            <MessageCircle style={{width: '24px', height: '24px'}} />
            Stadium AI
          </div>
          <button 
            onClick={clearChat}
            style={{
              background: 'rgba(255,255,255,0.2)',
              border: 'none',
              borderRadius: '12px',
              padding: '6px 12px',
              color: 'white',
              cursor: 'pointer',
              fontSize: '0.85rem',
              backdropFilter: 'blur(10px)'
            }}
          >
            Clear
          </button>
        </div>

        {/* Messages */}
        <div style={{
          flex: 1,
          overflowY: 'auto',
          padding: '20px',
          background: 'linear-gradient(180deg, #f8fafc 0%, #f1f5f9 100%)',
          scrollbarWidth: 'thin'
        }}>
          {messages.map((msg, index) => (
            <div 
              key={index}
              style={{
                display: 'flex',
                marginBottom: '16px',
                justifyContent: msg.role === 'ai' ? 'flex-start' : 'flex-end',
                animation: 'slideIn 0.3s ease-out'
              }}
            >
              <div style={{
                width: '40px',
                height: '40px',
                borderRadius: '50%',
                background: msg.role === 'ai' ? '#667eea' : '#3b82f6',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                marginRight: msg.role === 'ai' ? '12px' : 0,
                marginLeft: msg.role !== 'ai' ? '12px' : 0,
                flexShrink: 0,
                fontSize: '1rem'
              }}>
                {msg.role === 'ai' ? '🤖' : '👤'}
              </div>
              
              <div style={{
                maxWidth: '280px',
                padding: '14px 18px',
                borderRadius: '20px',
                background: msg.role === 'ai' ? 
                  'linear-gradient(135deg, #f1f5f9, #e2e8f0)' : 
                  'linear-gradient(135deg, #3b82f6, #1e40af)',
                color: msg.role === 'ai' ? '#1e293b' : 'white',
                lineHeight: '1.45',
                boxShadow: '0 4px 16px rgba(0,0,0,0.1)',
                position: 'relative'
              }}>
                <div>{msg.text}</div>
                <div style={{
                  fontSize: '0.75rem',
                  opacity: 0.7,
                  marginTop: '6px',
                  textAlign: msg.role === 'ai' ? 'left' : 'right'
                }}>
                  {msg.timestamp}
                </div>
              </div>
            </div>
          ))}
          
          {isTyping && (
            <div style={{display: 'flex', justifyContent: 'flex-start', gap: '12px', padding: '8px 0'}}>
              <div style={{
                width: '40px', height: '40px',
                borderRadius: '50%', background: '#667eea',
                display: 'flex', alignItems: 'center', justifyContent: 'center'
              }}>
                🤖
              </div>
              <div style={{
                padding: '12px 16px', borderRadius: '20px',
                background: '#e2e8f0', color: '#64748b'
              }}>
                <div style={{width: '40px', height: '3px', background: '#e2e8f0', borderRadius: '2px', marginBottom: '4px'}}>
                  <div style={{
                    width: '20px', height: '3px', 
                    background: '#667eea', borderRadius: '2px',
                    animation: 'typing 1.4s infinite ease-in-out'
                  }}></div>
                </div>
                Thinking...
              </div>
            </div>
          )}
          
          <div ref={messagesEndRef} />
        </div>

        {/* Input */}
        <div style={{
          padding: '16px 20px',
          borderTop: '1px solid #e2e8f0',
          background: 'white',
          display: 'flex',
          alignItems: 'center',
          gap: '12px'
        }}>
          <Mic style={{width: '20px', height: '20px', color: '#9ca3af', opacity: 0.6}} />
          <input
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyPress={handleKeyPress}
            placeholder="Ask about food, restrooms, parking..."
            style={{
              flex: 1,
              border: 'none',
              outline: 'none',
              fontSize: '0.95rem',
              background: 'transparent',
              color: '#374151',
              padding: '12px 0'
            }}
            maxLength={250}
          />
          <Send 
            style={{width: '24px', height: '24px', color: input ? '#667eea' : '#d1d5db'}}
            onClick={sendMessage}
            cursor={input ? 'pointer' : 'default'}
          />
        </div>
      </div>

      <style jsx>{`
        @keyframes slideIn {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        @keyframes typing {
          0%, 60%, 100% {
            transform: translateX(0);
            width: 20px;
          }
          30% {
            transform: translateX(10px);
            width: 30px;
          }
        }
      `}</style>
    </div>
  );
}
