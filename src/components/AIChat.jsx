import React, { useState, useEffect, useRef } from 'react';
import { MessageCircle, Send, Mic } from 'lucide-react';

const AIChat = ({ waitTimes = { food: 4, concessions: 8, restroom: 2, entry: 6 } }) => {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef(null);

  useEffect(() => {
    // Welcome message with live data
    setMessages([{
      role: 'ai',
      text: `Hi! Live wait times - Food: ${waitTimes.food}min | Restrooms: ${waitTimes.restroom}min`,
      time: new Date().toLocaleTimeString('en-US', { hour12: false, hour: '2-digit', minute: '2-digit' })
    }]);
  }, []);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const sendMessage = async () => {
    const userText = input.trim();
    if (!userText || isTyping) return;

    // Add user message
    const userMsg = { role: 'user', text: userText, time: new Date().toLocaleTimeString('en-US', { hour12: false, hour: '2-digit', minute: '2-digit' }) };
    setMessages(prev => [...prev, userMsg]);
    setInput('');
    setIsTyping(true);

    // Simulate AI thinking
    setTimeout(() => {
      let aiText = `Food: ${waitTimes.food}min | Restrooms: ${waitTimes.restroom}min | Entry: ${waitTimes.entry}min`;
      
      const lowerText = userText.toLowerCase();
      if (lowerText.includes('food') || lowerText.includes('eat')) {
        aiText = `🍔 Gate 7 Food: ${waitTimes.food}min (180m from you)`;
      } else if (lowerText.includes('bathroom') || lowerText.includes('restroom') || lowerText.includes('toilet')) {
        aiText = `🚻 Gate 3 Restrooms: ${waitTimes.restroom}min (90m)`;
      } else if (lowerText.includes('beer') || lowerText.includes('drink')) {
        aiText = `🍺 Section 12 Drinks: ${waitTimes.concessions}min`;
      } else if (lowerText.includes('gate') || lowerText.includes('entry')) {
        aiText = `🚪 Entry gates: ${waitTimes.entry}min average`;
      } else if (lowerText.includes('help') || lowerText.includes('hi')) {
        aiText = `Hi! Try "food", "bathroom", "beer", "gates" or "help"`;
      }

      const aiMsg = { 
        role: 'ai', 
        text: aiText, 
        time: new Date().toLocaleTimeString('en-US', { hour12: false, hour: '2-digit', minute: '2-digit' })
      };
      
      setMessages(prev => [...prev.slice(-8), aiMsg]); // Keep last 9 messages
      setIsTyping(false);
    }, 1000);
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      sendMessage();
    }
  };

  return (
    <div style={{
      position: 'fixed',
      bottom: '20px',
      right: '20px',
      width: '340px',
      height: '440px',
      maxWidth: '90vw',
      zIndex: 1000,
      fontFamily: 'system-ui, -apple-system, sans-serif'
    }}>
      <div style={{
        height: '100%',
        background: 'rgba(255, 255, 255, 0.95)',
        borderRadius: '20px',
        boxShadow: '0 20px 40px rgba(0,0,0,0.2)',
        border: '1px solid rgba(255,255,255,0.3)',
        overflow: 'hidden',
        display: 'flex',
        flexDirection: 'column'
      }}>
        {/* Header */}
        <div style={{
          background: '#6366f1',
          padding: '16px 20px',
          color: 'white',
          fontWeight: 'bold',
          fontSize: '1rem',
          display: 'flex',
          alignItems: 'center',
          gap: '12px'
        }}>
          <MessageCircle width={24} height={24} />
          Stadium Assistant
        </div>

        {/* Messages */}
        <div style={{
          flex: 1,
          padding: '16px',
          overflowY: 'auto',
          background: '#f8fafc',
          fontSize: '0.9rem',
          lineHeight: '1.4'
        }}>
          {messages.map((msg, index) => (
            <div key={index} style={{
              display: 'flex',
              marginBottom: '12px',
              justifyContent: msg.role === 'ai' ? 'flex-start' : 'flex-end'
            }}>
              {msg.role === 'ai' && (
                <div style={{
                  width: '32px',
                  height: '32px',
                  borderRadius: '50%',
                  background: '#6366f1',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  marginRight: '8px',
                  flexShrink: 0
                }}>
                  🤖
                </div>
              )}
              <div style={{
                maxWidth: '240px',
                padding: '10px 14px',
                borderRadius: '18px',
                background: msg.role === 'ai' ? '#e2e8f0' : '#3b82f6',
                color: msg.role === 'ai' ? '#374151' : 'white',
                boxShadow: '0 2px 8px rgba(0,0,0,0.1)'
              }}>
                {msg.text}
                <div style={{
                  fontSize: '0.7rem',
                  opacity: 0.6,
                  marginTop: '4px',
                  textAlign: msg.role === 'ai' ? 'left' : 'right'
                }}>
                  {msg.time}
                </div>
              </div>
              {msg.role === 'user' && (
                <div style={{
                  width: '32px',
                  height: '32px',
                  borderRadius: '50%',
                  background: '#3b82f6',
                  marginLeft: '8px',
                  flexShrink: 0
                }} />
              )}
            </div>
          ))}
          
          {isTyping && (
            <div style={{display: 'flex', justifyContent: 'flex-start', gap: '8px'}}>
              <div style={{
                width: '32px', height: '32px',
                borderRadius: '50%', background: '#6366f1',
                display: 'flex', alignItems: 'center', justifyContent: 'center'
              }}>
                🤖
              </div>
              <div style={{
                padding: '10px 14px', borderRadius: '18px',
                background: '#e2e8f0', color: '#6b7280'
              }}>
                Typing...
              </div>
            </div>
          )}
          
          <div ref={messagesEndRef} />
        </div>

        {/* Input */}
        <div style={{
          padding: '16px 20px',
          borderTop: '1px solid #e5e7eb',
          background: 'white',
          display: 'flex',
          alignItems: 'center',
          gap: '12px'
        }}>
          <Mic width={20} height={20} style={{color: '#9ca3af', opacity: 0.6}} />
          <input
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyPress={handleKeyPress}
            placeholder="Type 'food', 'bathroom', 'help'..."
            style={{
              flex: 1,
              border: 'none',
              outline: 'none',
              fontSize: '0.9rem',
              background: 'transparent',
              color: '#374151',
              padding: '8px 0'
            }}
          />
          <Send 
            width={24} 
            height={24} 
            style={{ 
              color: input ? '#6366f1' : '#d1d5db',
              cursor: input ? 'pointer' : 'default'
            }}
            onClick={sendMessage}
          />
        </div>
      </div>
    </div>
  );
};

export default AIChat;
