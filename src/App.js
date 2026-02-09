import React, { useState, useEffect, useRef, useMemo } from 'react';
import './App.css';

function App() {
  const [isUnlocked, setIsUnlocked] = useState(false);
  const [inputName, setInputName] = useState('');
  const [senderName, setSenderName] = useState('');
  const [receiverName, setReceiverName] = useState('');
  const [currentDay, setCurrentDay] = useState(null);
  const [showCongratulations, setShowCongratulations] = useState(false);
  const [showOldWishes, setShowOldWishes] = useState(false);
  const [noButtonPosition, setNoButtonPosition] = useState({ top: '75%', left: '50%' });
  const [isVoicePlaying, setIsVoicePlaying] = useState(false);
  const [showOtherNameInput, setShowOtherNameInput] = useState(false);
  const [otherSenderName, setOtherSenderName] = useState('');
  const [showSpecialPopup, setShowSpecialPopup] = useState(false);
  const speechRef = useRef(null);
  const videoRef = useRef(null);
  const audioRef = useRef(null);

  // Special users who get the popup (lowercase for comparison)
  const specialUsers = ['aasthajs', 'monica', 'bhabhi'];

  // Separate lists for senders and receivers
  const receiverList = ['Aasthajs', 'Monica', 'bhabhi', 'Other'];

  // Sender-Receiver mapping
  const senderReceiverMapping = {
    'bhabhi': 'Rajik',
    'aasthajs': 'Ajay',
    'monica': 'Charan',
    'other': 'Other',
  };

  // Valentine's Week Days with custom messages, video paths, and song paths
  const valentineDays = useMemo(() => [
    {
      date: new Date(2026, 1, 7),
      dayOfWeek: 'Saturday',
      name: 'Rose Day',
      emoji: '🌹',
      color: '#ff1744',
      bgGradient: 'linear-gradient(135deg, #ff6b9d 0%, #c06c84 50%, #f67280 100%)',
      wish: 'Happy Rose Day! Like a rose in full bloom, you fill my life with beauty, fragrance, and joy. This rose represents my everlasting love for you!',
      sayari: ["🥀 नजर को नजर की नजर ना लगे ","कोई अच्छा भी इस कदर ना लगे...!","🥀 तुझे देखा है मैने बस उस नज़र से "," जिस नजर से तुझे नजर ना लगे...!!","","🥀 वो पलकें झुकाना, वो तेरा शर्माना","कोई तुझसे सीखे दिल को चुराना","🥀 वो लटों को अपनी उंगली से घुमाना","कोई तुझसे सीखे किसी को दीवाना बनाना।"],
      wishEmojis: ['🌹', '❤️'],
      videoPath: '/Videos/first.mp4',
      songPath: '/Songs/first.mpeg',
      customMessage: 'Accept this rose, my dear!',
      voiceMessage: 'Happy Rose Day! Like a rose in full bloom, you fill my life with beauty, fragrance, and joy.'
    },
    {
      date: new Date(2026, 1, 8),
      dayOfWeek: 'Sunday',
      name: 'Propose Day',
      emoji: '💍',
      color: '#d500f9',
      bgGradient: 'linear-gradient(135deg, #d500f9 0%, #aa00ff 50%, #6200ea 100%)',
      wish: 'Happy Propose Day! Today, I want to ask you the most important question of my life - Will you be my Valentine, today and always? You make every moment magical!',
      sayari: ["🌹 आँखों में प्यार तुम पढ़ नहीं पा रहे,", "दिल में जो है बात तुम समझ नहीं पा रहे,", "🌹 कहना तो बहुत कुछ चाहते हैं पर,","मुंह से मेरे शब्द निकल नहीं पा रहे।","","🌹 हमारे बीच परिस्थितियां सदैव एक सी नहीं रहेंगी...","तर्क वितर्क, कलह क्लेश, क्रोध सब आएंगे","🌹 परन्तु इन सब को छोड़कर प्रेम को महत्व देना,","हमें इस रिश्ते को जीवंत बनाए रखना है... प्रिय ।।"],
      wishEmojis: ['💍', '✨'],
      videoPath: '/Videos/second.mp4',
      songPath: '/Songs/second.mp3',
      customMessage: 'Will you be the reason behind my every smile?',
      voiceMessage: 'Happy Propose Day! Will you be my Valentine, today and always? You make every moment magical!'
    },
    {
      date: new Date(2026, 1, 9),
      dayOfWeek: 'Monday',
      name: 'Chocolate Day',
      emoji: '🍫',
      color: '#6d4c41',
      bgGradient: 'linear-gradient(135deg, #8d6e63 0%, #6d4c41 50%, #5d4037 100%)',
      wish: 'Happy Chocolate Day! Just like these chocolates, life with you is sweet, delightful, and full of wonderful surprises. You\'re the sweetness in my life!',
      sayari: ["🍫 दिल हमारा चॉकलेट की तरह नाजुक है,", "तुम इसमें प्यार की मिठास भर दो...","🍫 नजदीक आओ, इसे कुछ ऐसे चखो,", "जैसे साँसों में साँसें घुलती हैं..."],
      wishEmojis: ['🍫', '💝'],
      videoPath: '/Videos/third.mp4',
      songPath: '/Songs/third.mpeg',
      customMessage: 'You make life sweeter!',
      voiceMessage: 'Happy Chocolate Day! Just like these chocolates, life with you is sweet and delightful.'
    },
    {
      date: new Date(2026, 1, 10),
      dayOfWeek: 'Tuesday',
      name: 'Teddy Day',
      emoji: '🧸',
      color: '#ff6f00',
      bgGradient: 'linear-gradient(135deg, #ffb74d 0%, #ff9800 50%, #f57c00 100%)',
      wish: 'Happy Teddy Day! This teddy is soft, cuddly, and cute - just like the love and warmth you bring into my life. I hope it reminds you of my hugs!',
      sayari: ["💕 तुम तो कोमल हो, मासूम हो,","किसी प्यारे से टेडी जैसी...","💕 मेरी शाम को रंगीन कर देती है,","तुम्हारी हंसी, किसी नूर जैसी।"],
      wishEmojis: ['🧸', '💕'],
      videoPath: '/Videos/fourth.mp4',
      songPath: '/Songs/4th.mp3',
      customMessage: "Just like the teddy, you bring comfort and joy into my life. I'm lucky to have you!",
      voiceMessage: 'Happy Teddy Day! This teddy reminds me of the warmth and love you bring into my life.'
    },
    {
      date: new Date(2026, 1, 11),
      dayOfWeek: 'Wednesday',
      name: 'Promise Day',
      emoji: '🤝',
      color: '#00bfa5',
      bgGradient: 'linear-gradient(135deg, #1de9b6 0%, #00bfa5 50%, #00897b 100%)',
      wish: 'Happy Promise Day! I promise to always be there for you, to love you unconditionally, to support your dreams, and to make you smile every single day!',
      sayari: ["🤝 बात मुमकिन हो तो इक वादा निभाना होगा,","मुझको हर सांस में, बस तुमको ही बसाना होगा।","🤝 आओ कसम खाएं, ना होंगे कभी जुदा,","यह इश्क का रिश्ता, हमें उम्र भर निभाना होगा।"],
      wishEmojis: ['🤝', '💖'],
      videoPath: '/Videos/fifth.mp4',
      songPath: '/Songs/5th_day.mpeg',
      customMessage: 'I Promise Forever!',
      voiceMessage: 'Happy Promise Day! I promise to always be there for you, to love you unconditionally.'
    },
    {
      date: new Date(2026, 1, 12),
      dayOfWeek: 'Thursday',
      name: 'Hug Day',
      emoji: '🤗',
      color: '#ff6d00',
      bgGradient: 'linear-gradient(135deg, #ff9e80 0%, #ff6e40 50%, #ff3d00 100%)',
      wish: 'Happy Hug Day! Your hugs are my safe haven, my comfort zone, my happy place. Here\'s sending you warm hugs filled with all my love!',
      sayari: ["🤗 तुझे जो याद करता हूँ, मैं दुनिया भूल जाता हूँ,","तुझे जो गले लगाता हूँ, मैं खुद को भूल जाता हूँ।","🤗 वो मोहब्बत भी तुम्हारी थी, नफरत भी तुम्हारी थी,","वो हक जो जताते थे, वो भी तुम्हारा था|"],
      wishEmojis: ['🤗', '💞'],
      videoPath: '/Videos/fifth.mp4',
      songPath: '/Songs/6th_day.mpeg',
      customMessage: "You're the peanut butter to my hug sandwich!",
      voiceMessage: 'Happy Hug Day! Your hugs are my safe haven, my comfort zone, my happy place.'
    },
    {
      date: new Date(2026, 1, 13),
      dayOfWeek: 'Friday',
      name: 'Kiss Day',
      emoji: '💋',
      color: '#e91e63',
      bgGradient: 'linear-gradient(135deg, #f06292 0%, #ec407a 50%, #c2185b 100%)',
      wish: 'Happy Kiss Day! Your kisses are like magic - they make my heart skip a beat and fill my world with love. Sending you sweet kisses and endless love!',
      sayari: ["💗 मेरी मोहब्बत ही देखनी है तो गले लगाकर देखो,","दिल में धड़कता जो हिस्सा है, उसे चूम कर देखो।","💗 वो जो दूरियों का ख़ौफ़ है, वो मिट जाएगा,","मेरी आँखों में अपनी रूह को उतर कर देखो।"],
      wishEmojis: ['💋', '💗'],
      videoPath: '/Videos/sixth.mp4',
      songPath: '/Songs/4th_day.mpeg',
      customMessage: 'A kiss is a lovely trick designed by nature to stop speeches when words become superfluous. Happy Kiss Day, Beautiful!',
      voiceMessage: 'Happy Kiss Day! Your kisses are like magic, they make my heart skip a beat.'
    },
    {
      date: new Date(2026, 1, 14),
      dayOfWeek: 'Saturday',
      name: 'Valentine\'s Day',
      emoji: '❤️',
      color: '#ff0844',
      bgGradient: 'linear-gradient(135deg, #ff6b9d 0%, #c06c84 50%, #f67280 100%)',
      wish: 'Happy Valentine\'s Day! You are my everything - my best friend, my soulmate, my forever love. Together, we create the most beautiful love story! Thank you for being mine!',
      sayari: ["👨‍❤️‍👨 आज हर ख़ामोशी को मिटा देने का मन है,","जो भी छिपा रखा है मन में लूटा देने का मन है।","👨‍❤️‍👨 क्यूं इतने लफजो में मुझे चुनते हो,","इतनी ईंटें लगती है क्या एक खयाल दफनाने में?"],
      wishEmojis: ['❤️', '🌹'],
      videoPath: '/Videos/seventh.mp4',
      songPath: '/Songs/7th_day.mpeg',
      customMessage: 'You are my everything!',
      voiceMessage: 'Happy Valentines Day! You are my everything, my best friend, my soulmate, my forever love.'
    }
  ], []);

  // Get old wishes (events before today)
  const getOldWishes = () => {
    const today = new Date();
    const todayDateOnly = new Date(today.getFullYear(), today.getMonth(), today.getDate());
    
    return valentineDays.filter(day => {
      const dayDateOnly = new Date(day.date.getFullYear(), day.date.getMonth(), day.date.getDate());
      return dayDateOnly < todayDateOnly;
    });
  };

  // Determine current day
  useEffect(() => {
    const determineCurrentDay = () => {
      const today = new Date();
      
      const foundDay = valentineDays.find(day => {
        return day.date.getDate() === today.getDate() && 
               day.date.getMonth() === today.getMonth();
      });

      if (foundDay) {
        setCurrentDay(foundDay);
      } else {
        setCurrentDay(valentineDays[7]);
      }
    };

    determineCurrentDay();
  }, [valentineDays]);

  // Auto-play video when it loads
  useEffect(() => {
    if (videoRef.current && showCongratulations) {
      videoRef.current.play().catch(error => {
        console.log('Auto-play prevented:', error);
      });
    }
  }, [showCongratulations, currentDay]);

  // Voice synthesis with song playback after
  const speakWish = (message, songPath) => {
    if ('speechSynthesis' in window) {
      window.speechSynthesis.cancel();
      
      const utterance = new SpeechSynthesisUtterance(message);
      
      const voices = window.speechSynthesis.getVoices();
      const indianVoice = voices.find(voice => 
        voice.lang.includes('en-IN') || 
        voice.name.includes('Indian') ||
        voice.name.includes('India')
      );
      
      if (indianVoice) {
        utterance.voice = indianVoice;
      } else {
        const englishVoice = voices.find(voice => voice.lang.includes('en'));
        if (englishVoice) utterance.voice = englishVoice;
      }
      
      utterance.rate = 0.9;
      utterance.pitch = 1.1;
      utterance.volume = 1.0;
      
      utterance.onstart = () => setIsVoicePlaying(true);
      
      utterance.onend = () => {
        setIsVoicePlaying(false);
        if (songPath && audioRef.current) {
          audioRef.current.src = songPath;
          audioRef.current.play().catch(error => {
            console.log('Audio playback prevented:', error);
          });
        }
      };
      
      utterance.onerror = () => setIsVoicePlaying(false);
      
      speechRef.current = utterance;
      window.speechSynthesis.speak(utterance);
    } else {
      if (songPath && audioRef.current) {
        audioRef.current.src = songPath;
        audioRef.current.play().catch(error => {
          console.log('Audio playback prevented:', error);
        });
      }
    }
  };

  const stopVoice = () => {
    if ('speechSynthesis' in window) {
      window.speechSynthesis.cancel();
      setIsVoicePlaying(false);
    }
    if (audioRef.current) {
      audioRef.current.pause();
      audioRef.current.currentTime = 0;
    }
  };

  useEffect(() => {
    if ('speechSynthesis' in window) {
      const loadVoices = () => {
        window.speechSynthesis.getVoices();
      };
      
      loadVoices();
      
      if (window.speechSynthesis.onvoiceschanged !== undefined) {
        window.speechSynthesis.onvoiceschanged = loadVoices;
      }
    }
  }, []);

  const handleUnlock = () => {
    const trimmedName = inputName.trim();
    
    if (!trimmedName) {
      alert('Please enter your name!');
      return;
    }

    const isValidReceiver = receiverList.some(
      name => name.toLowerCase() === trimmedName.toLowerCase()
    );

    if (isValidReceiver) {
      setReceiverName(trimmedName);
      
      if (trimmedName.toLowerCase() === 'other') {
        setShowOtherNameInput(true);
        return;
      }
      
      const mappedSender = senderReceiverMapping[trimmedName.toLowerCase()];
      
      if (mappedSender) {
        setSenderName(mappedSender);
      } else {
        setSenderName('Unknown');
      }
      
      setIsUnlocked(true);
    } else {
      // For any other name not in list, set as receiver and ask for sender name
      setReceiverName(trimmedName);
      setShowOtherNameInput(true);
    }
  };

  const handleOtherNameSubmit = () => {
    const trimmedOtherName = otherSenderName.trim();
    
    if (!trimmedOtherName) {
      alert('Please enter the sender name!');
      return;
    }
    
    setSenderName(trimmedOtherName);
    setShowOtherNameInput(false);
    setIsUnlocked(true);
  };

  // Helper function to display receiver name properly
  const getDisplayReceiverName = (name) => {
    if (name.toLowerCase() === 'aasthajs') {
      return 'Aastha';
    }
    return name.charAt(0).toUpperCase() + name.slice(1);
  };

  const handleNoButtonHover = () => {
    const randomTop = Math.random() * 80 + 10 + '%';
    const randomLeft = Math.random() * 80 + 10 + '%';
    setNoButtonPosition({ top: randomTop, left: randomLeft });
  };

  const handleYesClick = () => {
    // Check if user is in special list
    const isSpecialUser = specialUsers.includes(receiverName.toLowerCase());
    
    if (isSpecialUser) {
      // Show special popup for 3 seconds, then show congratulations
      setShowSpecialPopup(true);
      setTimeout(() => {
        setShowSpecialPopup(false);
        setShowCongratulations(true);
        setTimeout(() => {
          if (currentDay && currentDay.voiceMessage) {
            speakWish(currentDay.voiceMessage, currentDay.songPath);
          }
        }, 500);
      }, 3000);
    } else {
      // For "other" names, go directly to congratulations
      setShowCongratulations(true);
      setTimeout(() => {
        if (currentDay && currentDay.voiceMessage) {
          speakWish(currentDay.voiceMessage, currentDay.songPath);
        }
      }, 500);
    }
  };

  const handleOldWishClick = (day) => {
    setCurrentDay(day);
    setShowOldWishes(false);
    setShowCongratulations(true);
    setTimeout(() => {
      if (day && day.voiceMessage) {
        speakWish(day.voiceMessage, day.songPath);
      }
    }, 500);
  };

  if (!currentDay) {
    return (
      <div className="App">
        <div className="loading-screen">
          <div className="loading-spinner"></div>
          <p>Loading Valentine's Magic...</p>
        </div>
      </div>
    );
  }

  // Special Popup Screen (3 seconds with roses)
  if (showSpecialPopup) {
    return (
      <div className="App special-popup-screen" style={{ background: currentDay.bgGradient }}>
        <div className="special-popup-overlay">
          <div className="special-popup-content">
            <div className="rose-animation">
              <span className="rose rose-1">🌹</span>
              <span className="rose rose-2">🌹</span>
              <span className="rose rose-3">🌹</span>
              <span className="rose rose-4">🌹</span>
              <span className="rose rose-5">🌹</span>
            </div>
            <h1 className="special-message">
              You are Special for {senderName}! 💖
            </h1>
            <div className="heart-pulse">❤️</div>
          </div>
        </div>
      </div>
    );
  }

  if (showOtherNameInput) {
    return (
      <div className="App" style={{ background: currentDay.bgGradient }}>
        <div className="lock-screen">
          <div className="lock-header">
            <div className="lock-icon">💝</div>
            <h1>Who is sending this love?</h1>
            <p className="week-subtitle">Enter the sender's name</p>
          </div>

          <div className="input-container">
            <div className="input-group">
              <label>Sender's Name</label>
              <input
                type="text"
                placeholder="Enter sender name..."
                value={otherSenderName}
                onChange={(e) => setOtherSenderName(e.target.value)}
                onKeyPress={(e) => {
                  if (e.key === 'Enter') {
                    handleOtherNameSubmit();
                  }
                }}
              />
            </div>
            <button className="unlock-button" onClick={handleOtherNameSubmit}>
              Continue 💌
            </button>
            <button 
              className="back-button-small" 
              onClick={() => {
                setShowOtherNameInput(false);
                setInputName('');
              }}
            >
              ← Back
            </button>
          </div>
        </div>
      </div>
    );
  }

  if (!isUnlocked) {
    return (
      <div className="App" style={{ background: currentDay.bgGradient }}>
        <div className="lock-screen">
          <div className="lock-header">
            <div className="lock-icon">🔒</div>
            <h1>Valentine's Week Special</h1>
            <p className="week-subtitle">{new Date().toLocaleDateString("en-US",{month:"long",day:"numeric",year:"numeric"})}</p>
          </div>

          <div className="current-day-preview">
            <div className="day-emoji-large">{currentDay.emoji}</div>
            <h2>{currentDay.name}</h2>
            <p>{currentDay.dayOfWeek}, February {currentDay.date.getDate()}</p>
          </div>

          <div className="input-container">
            <div className="input-group">
              <label>Enter Your Name to Unlock</label>
              <input
                type="text"
                placeholder="Your name..."
                value={inputName}
                onChange={(e) => setInputName(e.target.value)}
                onKeyPress={(e) => {
                  if (e.key === 'Enter') {
                    handleUnlock();
                  }
                }}
              />
            </div>
            <button className="unlock-button" onClick={handleUnlock}>
              Unlock My Valentine's Message 💝
            </button>
          </div>
        </div>
      </div>
    );
  }

  if (showOldWishes) {
    const oldWishes = getOldWishes();
    
    return (
      <div className="App old-wishes-screen" style={{ background: currentDay.bgGradient }}>
        <div className="old-wishes-container">
          <h1 className="old-wishes-title">Previous Love Memories 💕</h1>
          <p className="old-wishes-subtitle">Relive the beautiful moments we've shared</p>
          
          <div className="old-wishes-grid">
            {oldWishes.map((day, index) => (
              <div 
                key={index} 
                className="old-wish-card"
                onClick={() => handleOldWishClick(day)}
              >
                <div className="old-wish-emoji">{day.emoji}</div>
                <h3 className="old-wish-name">{day.name}</h3>
                <p className="old-wish-date">{day.dayOfWeek}, Feb {day.date.getDate()}</p>
                <button className="view-wish-btn">View Wish ❤️</button>
              </div>
            ))}
          </div>

          <button 
            className="back-to-today-button" 
            onClick={() => setShowOldWishes(false)}
          >
            ← Back to Today's Message
          </button>

          <div className="developer-credit-bottom">
            <p>💝 Developed with Love by Ajay 💝</p>
          </div>
        </div>
      </div>
    );
  }

  if (showCongratulations) {
    const oldWishes = getOldWishes();
    const hasOldWishes = oldWishes.length > 0;

    return (
      <div className="App congratulations-screen" style={{ background: currentDay.bgGradient }}>
        <div className="congratulations-container">
          <button 
            className="voice-control-button"
            onClick={isVoicePlaying ? stopVoice : () => speakWish(currentDay.voiceMessage, currentDay.songPath)}
          >
            {isVoicePlaying ? '🔇 Stop Voice' : '🔊 Play Voice'}
          </button>

          <audio ref={audioRef} loop />

          <div className="video-frame-container">
            <div className="video-decorative-frame">
              <div className="frame-corner frame-corner-tl"></div>
              <div className="frame-corner frame-corner-tr"></div>
              <div className="frame-corner frame-corner-bl"></div>
              <div className="frame-corner frame-corner-br"></div>
              
              <div className="video-wrapper">
                <video 
                  ref={videoRef}
                  className="valentine-video"
                  src={currentDay.videoPath}
                  loop
                  muted
                  playsInline
                  controls
                >
                  Your browser does not support the video tag.
                </video>
              </div>
              
              <div className="custom-message-overlay">{currentDay.customMessage}</div>
            </div>
          </div>

          <div className="congratulations-content">
            <div className="valentine-message-box">
              <h2 className="personal-message">
                {receiverName ? getDisplayReceiverName(receiverName) : ""}, you are the Valentine of {senderName ? senderName.charAt(0).toUpperCase() + senderName.slice(1) : ""}
              </h2>
            </div>

            <div className="greeting-header">
              <div className="day-emoji-display">{currentDay.emoji}</div>
              <h1 className="day-title">Happy {currentDay.name}!</h1>
              <p className="day-date">{currentDay.dayOfWeek}, February {currentDay.date.getDate()}, 2026</p>
            </div>

            <div className="wish-card">
              <p className="wish-text">
                {currentDay.wish}
              </p>
              <div className="wish-emojis-container">
                {currentDay.wishEmojis && currentDay.wishEmojis.map((emoji, index) => (
                  <span key={index} className="wish-emoji">{emoji}</span>
                ))}
              </div>
            </div>

            <div className="wish-card">
              {currentDay.sayari.map((line, index) => (
                <p
                  className="wish-text"
                  key={index}
                  style={{ margin: "5px 0", lineHeight: "1.4", fontSize: "1.2rem", minHeight: "1.4em" }}
                >
                  {line || "\u00A0"}
                </p>
              ))}
            </div>

            <button 
              className="back-button" 
              onClick={() => {
                setShowCongratulations(false);
                stopVoice();
              }}
            >
              ← Back to Proposal
            </button>

            {hasOldWishes && (
              <button 
                className="old-wishes-button" 
                onClick={() => {
                  setShowOldWishes(true);
                  setShowCongratulations(false);
                  stopVoice();
                }}
              >
                📅 View Previous Love Messages
              </button>
            )}
          </div>

          <div className="developer-credit-bottom">
            <p>💝 Developed with Love by Ajay 💝</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="App" style={{ background: currentDay.bgGradient }}>
      <div className="invitation-container">
        <div className="invitation-header">
          <div className="day-badge">
            <span className="badge-emoji">{currentDay.emoji}</span>
            <div className="badge-info">
              <h2>{currentDay.name}</h2>
              <p>{currentDay.dayOfWeek}, Feb {currentDay.date.getDate()}</p>
            </div>
          </div>
        </div>

        <div className="heart-animation">
          <div className="beating-heart">❤️</div>
        </div>

        <div className="proposal-section">
          <h1 className="proposal-question">Will you be my Valentine?</h1>
          <p className="from-sender">~ From {senderName} with Love {currentDay.emoji}</p>
          
          <div className="answer-buttons-container">
            <div className="answer-buttons">
              <button 
                className="yes-button" 
                onClick={handleYesClick}
              >
                Yes! I'd Love To! {currentDay.emoji}
              </button>
            </div>
            
            <button 
              className="no-button" 
              style={{
                position: 'absolute',
                top: noButtonPosition.top,
                left: noButtonPosition.left,
                transform: 'translate(-50%, -50%)',
                transition: 'top 0.05s ease, left 0.05s ease'
              }}
              onMouseEnter={handleNoButtonHover}
              onMouseMove={handleNoButtonHover}
              onTouchStart={handleNoButtonHover}
              onTouchMove={handleNoButtonHover}
              onClick={(e) => {
                e.preventDefault();
                handleNoButtonHover();
              }}
            >
              No
            </button>
          </div>
        </div>

        <div className="developer-credit-bottom">
          <p>💝 Developed with Love by Ajay 💝</p>
        </div>
      </div>
    </div>
  );
}

export default App;
