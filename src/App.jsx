import React, { useState, useEffect, useRef } from 'react';
import { MapPin, Clock, Users, MessageCircle, Navigation2 } from 'lucide-react';
import { Loader } from './components/Loader';
import { Heatmap } from './components/Heatmap';
import { AIChat } from './components/AIChat';

function App() {
  const [location, setLocation] = useState(null);
  const [waitTimes, setWaitTimes] = useState({
    food: 4, concessions: 8, restroom: 2, entry: 6
  });
  const [showMap, setShowMap] = useState(false);
  const mapRef = useRef(null);

 // src/App.jsx - Replace location useEffect:
useEffect(() => {
  // FAKE LOCATION for demo (Madison Square Garden area)
  setLocation({
    lat: 40.7505,
    lng: -73.9934
  });
  
  // Update wait times every 10s (demo)
  const interval = setInterval(() => {
    setWaitTimes({
      food: Math.floor(Math.random() * 8) + 2,
      concessions: Math.floor(Math.random() * 10) + 3,
      restroom: Math.floor(Math.random() * 5) + 1,
      entry: Math.floor(Math.random() * 7) + 2
    });
  }, 10000);
  
  return () => clearInterval(interval);
}, []);

  const getSmartRecommendation = () => {
    const options = [
      { place: 'Hot Dogs - Gate 7', wait: 4, distance: '180m' },
      { place: 'Beer - Section 12', wait: 6, distance: '220m' },
      { place: 'Restroom - Gate 3', wait: 2, distance: '90m' }
    ];
    return options[0]; // AI logic simplified
  };

  return (
    <div className="min-h-screen text-white p-4">
      {/* Header */}
      <div className="text-center mb-8">
        <h1 className="text-3xl font-bold mb-2">🏟️ VenueFlow AI</h1>
        <p className="text-blue-200">Smart Stadium Assistant</p>
      </div>

      {/* Current Location */}
      {location && (
        <div className="bg-white/10 backdrop-blur-lg rounded-2xl p-6 mb-6">
          <div className="flex items-center mb-4">
            <MapPin className="w-6 h-6 mr-3" />
            <span>Near Section 112</span>
          </div>
          
          {/* Live Wait Times */}
          <div className="grid grid-cols-2 gap-4 mb-6">
            <WaitCard icon={Users} label="Food" time={waitTimes.food} />
            <WaitCard icon={Clock} label="Concessions" time={waitTimes.concessions} />
            <WaitCard icon={Users} label="Restroom" time={waitTimes.restroom} />
            <WaitCard icon={MapPin} label="Entry" time={waitTimes.entry} />
          </div>

          {/* Smart Recommendation */}
          <div className="bg-green-500/20 p-4 rounded-xl">
            <h3 className="font-bold mb-2">🎯 AI Recommendation</h3>
            <div className="flex items-center justify-between">
              <span>Hot Dogs - Gate 7</span>
              <div className="text-right">
                <div className="text-lg font-bold">4 min</div>
                <div className="text-sm">180m away</div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Action Buttons */}
      <div className="grid grid-cols-2 gap-4 mb-8">
        <button 
          onClick={() => setShowMap(true)}
          className="bg-blue-600 hover:bg-blue-700 p-4 rounded-2xl flex flex-col items-center"
        >
          <Navigation2 className="w-8 h-8 mb-2" />
          Navigate
        </button>
        <button className="bg-purple-600 hover:bg-purple-700 p-4 rounded-2xl flex flex-col items-center">
          <MessageCircle className="w-8 h-8 mb-2" />
          AI Chat
        </button>
      </div>

      {/* Map Modal */}
      {showMap && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white/90 backdrop-blur-xl rounded-3xl w-full max-w-2xl max-h-[80vh] overflow-hidden">
            <div className="p-6 pb-4">
              <h2 className="text-2xl font-bold text-gray-800 mb-2">📍 Navigate</h2>
              <button 
                onClick={() => setShowMap(false)}
                className="text-gray-500 hover:text-gray-700"
              >✕</button>
            </div>
            <Heatmap location={location} />
          </div>
        </div>
      )}

      {/* Bottom AI Chat */}
      <AIChat />
      
      {!location && <Loader />}
    </div>
  );
}

const WaitCard = ({ icon: Icon, label, time }) => (
  <div className="bg-white/20 p-4 rounded-xl text-center backdrop-blur-sm">
    <Icon className="w-6 h-6 mx-auto mb-2 opacity-75" />
    <div className="font-bold text-xl">{time}min</div>
    <div className="text-sm opacity-75">{label}</div>
  </div>
);

export default App;
