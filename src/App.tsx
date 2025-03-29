import React, { useState, useEffect } from 'react';
import { Heart, HeartCrack, PartyPopper, ArrowRight, Sparkles, Coffee, Pizza, Gift } from 'lucide-react';

function App() {
  const [noCount, setNoCount] = useState(0);
  const [yesPressed, setYesPressed] = useState(false);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [isHovering, setIsHovering] = useState(false);

  const noButtonSize = Math.max(20, Math.min(50, noCount * 2));
  const yesButtonSize = Math.max(50, Math.min(70, noCount * 3));

  const phrases = [
    "No 🥺",
    "Are you sure? 😢",
    "Pretty please? 🥹",
    "Don't be mean! 😤",
    "You're breaking my heart! 💔",
    "I'll buy you pizza! 🍕",
    "And coffee too! ☕️",
    "And chocolate! 🍫",
    "I'll do the dishes! 🍽️",
    "I'll clean the house! 🧹",
    "I'm getting desperate here! 😫",
    "My mom says we'd be cute together! 👩‍👦",
    "I'll write you a poem! 📝",
    "Roses are red, violets are blue... 🌹",
    "I'm running out of ideas! 🤔",
    "PLEASE PLEASE PLEASE! 😭",
  ];

  const getNoButtonText = () => phrases[Math.min(noCount, phrases.length - 1)];

  const handleNoClick = () => {
    setNoCount(noCount + 1);
    setMousePosition({
      x: Math.random() * (window.innerWidth - 200),
      y: Math.random() * (window.innerHeight - 200),
    });
  };

  const handleYesClick = () => {
    setYesPressed(true);
  };

  useEffect(() => {
    const interval = setInterval(() => {
      if (noCount > 0 && !yesPressed) {
        setMousePosition({
          x: Math.random() * (window.innerWidth - 200),
          y: Math.random() * (window.innerHeight - 200),
        });
      }
    }, 2000);

    return () => clearInterval(interval);
  }, [noCount, yesPressed]);

  if (yesPressed) {
    return (
      <div className="h-screen bg-gradient-to-br from-pink-400 to-purple-500 flex flex-col items-center justify-center p-8">
        <div className="text-center bg-white/90 backdrop-blur-sm rounded-3xl p-8 max-w-xl mx-auto shadow-2xl">
          <PartyPopper className="w-32 h-32 text-yellow-500 mx-auto mb-4 animate-bounce" />
          <h1 className="text-4xl font-extrabold text-pink-600 mb-4">WOOHOO! 🎉</h1>
          <p className="text-2xl font-medium text-gray-700 mb-6">Time to plan our date! Here's what you get:</p>
          <div className="grid grid-cols-2 gap-4 mb-6">
            <div className="flex items-center gap-2 text-lg">
              <Coffee className="text-brown-500" /> Coffee date
            </div>
            <div className="flex items-center gap-2 text-lg">
              <Pizza className="text-orange-500" /> Pizza dinner
            </div>
            <div className="flex items-center gap-2 text-lg">
              <Gift className="text-red-500" /> Surprise gift
            </div>
            <div className="flex items-center gap-2 text-lg">
              <Sparkles className="text-yellow-500" /> Magic moments
            </div>
          </div>
          <p className="text-gray-600 italic">(Terms and conditions may apply 😉)</p>
        </div>
      </div>
    );
  }

  return (
    <div className="h-screen bg-gradient-to-br from-pink-100 to-purple-100 flex flex-col items-center justify-center p-8">
      <div className="max-w-md w-full bg-white/80 backdrop-blur-sm rounded-3xl shadow-2xl p-8 relative">
        <div className="absolute -top-6 -right-6 animate-float">
          <Heart className="w-12 h-12 text-pink-500" fill="currentColor" />
        </div>
        <div className="absolute -bottom-6 -left-6 animate-bounce">
          <HeartCrack className="w-12 h-12 text-pink-400" />
        </div>
        
        <div className="text-center mb-8">
          <h1 className="text-4xl font-extrabold text-gray-800 mb-4">
            Will you be my Valentine? 
            {noCount > 5 && <span className="block text-sm mt-2">(I'm not leaving until you say yes! 😤)</span>}
          </h1>
          <p className="text-gray-600 text-lg font-medium">
            {noCount === 0 ? "Choose wisely! 😊" : "Come on, you know you want to! 😏"}
          </p>
        </div>

        <img
          src="https://images.unsplash.com/photo-1616046229478-9901c5536a45?w=800&auto=format&fit=crop&q=60"
          alt="Cute teddy bear with hearts"
          className={`w-full h-64 object-cover rounded-2xl mb-8 transition-transform duration-300 ${noCount > 3 ? 'animate-shake' : ''}`}
        />

        <div className="flex flex-col gap-4">
          <button
            className={`bg-pink-500 hover:bg-pink-600 text-white font-bold py-4 px-8 rounded-xl transition-all duration-200 transform hover:scale-105 flex items-center justify-center gap-2 ${isHovering ? 'animate-bounce' : ''}`}
            style={{ fontSize: `${yesButtonSize}px` }}
            onClick={handleYesClick}
            onMouseEnter={() => setIsHovering(true)}
            onMouseLeave={() => setIsHovering(false)}
          >
            Yes <ArrowRight className="w-6 h-6" />
          </button>

          <button
            className="bg-gray-500 hover:bg-gray-600 text-white font-bold py-4 px-8 rounded-xl transition-all duration-200"
            style={{
              position: noCount > 0 ? 'absolute' : 'relative',
              left: mousePosition.x,
              top: mousePosition.y,
              fontSize: `${noButtonSize}px`,
              opacity: Math.max(0.5, 1 - noCount / 10),
            }}
            onClick={handleNoClick}
          >
            {getNoButtonText()}
          </button>
        </div>

        {noCount > 8 && (
          <p className="text-center text-sm text-gray-500 mt-8 italic">
            *Psst... the "No" button is getting tired of running away... 😮‍💨
          </p>
        )}
      </div>
    </div>
  );
}

export default App;