import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

const Welcome = () => {
  const navigate = useNavigate();
  const taglines = ["Medication", "Health", "Wellness"];
  const phrases = [
    "Helping you stay on track...",
    "Never miss a dose again...",
    "Alerts that keep family in the loop..."
  ];

  const [currentTaglineIndex, setCurrentTaglineIndex] = useState(0);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const taglineInterval = setInterval(() => {
      setCurrentTaglineIndex((prevIndex) => (prevIndex + 1) % taglines.length);
    }, 2000);

    return () => clearInterval(taglineInterval);
  }, []);

  useEffect(() => {
    let typedIndex = 0;
    let letterIndex = 0;
    const typedText = document.getElementById('typedText');
    const typingSpeedSubhead = 100;
    const erasingSpeedSubhead = 50;
    const pauseBetweenPhrases = 0;
    let typingTimeout;

    function type() {
      if (letterIndex < phrases[typedIndex].length) {
        typedText.textContent += phrases[typedIndex].charAt(letterIndex);
        letterIndex++;
        typingTimeout = setTimeout(type, typingSpeedSubhead);
      } else {
        typingTimeout = setTimeout(erase, pauseBetweenPhrases);
      }
    }

    function erase() {
      if (letterIndex > 0) {
        typedText.textContent = phrases[typedIndex].substring(0, letterIndex - 1);
        letterIndex--;
        typingTimeout = setTimeout(erase, erasingSpeedSubhead);
      } else {
        typedIndex = (typedIndex + 1) % phrases.length;
        letterIndex = 0;
        typedText.textContent = '';
        typingTimeout = setTimeout(type, 300);
      }
    }

    typedText.textContent = '';
    type();

    return () => clearTimeout(typingTimeout);
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
      const scrollHeight = document.documentElement.scrollHeight - document.documentElement.clientHeight;
      const scrollProgress = (scrollTop / scrollHeight) * 100;
      setProgress(scrollProgress);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleButtonClick = () => {
    const mainContent = document.querySelector('.main-content');
    mainContent.style.transition = 'transform 0.5s';
    mainContent.style.transform = 'translateY(-100%)';
    const progressInterval = setInterval(() => {
      setProgress((prevProgress) => {
        if (prevProgress >= 100) {
          clearInterval(progressInterval);
          setTimeout(() => {
            navigate('/login');
          }, 100); // Small delay to let the progress bar fill completely
          return prevProgress;
        }
        return prevProgress + 1;
      });
    }, 5); // Adjust this duration to control the speed of the progress bar
  };
  useEffect(() => {
    // Inject keyframes for the gradient animation
    const styleSheet = document.createElement("style");
    styleSheet.type = "text/css";
    styleSheet.innerText = `
      @keyframes gradientMove {
        0% { background-position: 0% 50%; }
        50% { background-position: 100% 50%; }
        100% { background-position: 0% 50%; }
      }
    `;
    document.head.appendChild(styleSheet);

    return () => {
      document.head.removeChild(styleSheet);
    };
  }, [])

  return (
    <div className='bg-gradient-to-r from-orange-start via-orange-middle to-blue-end'>
      <div id="scrollProgress" className="fixed top-0 left-0 h-1 bg-white z-50" style={{ width: `${progress}%` }}></div>
      <button id="backToTop" className="fixed right-6 bottom-[-60px] w-12 h-12  text-white text-xl rounded-full flex items-center justify-center transition-all duration-300 hover:from-orange-600 hover:to-blue-600 z-50">&#8679;</button>
      <div className="floating-bubble fixed top-1/2 left-1/2 w-16 h-16 bg-white/50 rounded-full opacity-10 pointer-events-none transition-transform duration-100 ease-out z-40" id="floatingBubble"></div>
      <div className="bg-shapes fixed top-0 left-0 w-full h-full pointer-events-none z-0">
        <div className="shape shape1 absolute w-96 h-96 top-1/4 left-[-150px] bg-white/50 rounded-full opacity-5 animate-spin"></div>
        <div className="shape shape2 absolute w-[500px] h-[500px] top-3/4 right-[-200px] bg-blue-500 rounded-full opacity-5 animate-spin"></div>
      </div>
      <div className="main-content mx-auto max-w-6xl relative z-10 p-4">
        <section className="hero fade-section min-h-screen flex flex-col items-center justify-center text-center bg-gradient-to-r from-orange-500 to-blue-500 text-white rounded-lg p-8 shadow-lg">
          <div>
            <h1 className="text-5xl font-bold mb-4">
              <span className="dynamic-tagline text-black text-2xl">{taglines[currentTaglineIndex]}</span> <span> Reminder & Tracker</span>
            </h1>
            <div className="text-container mb-2" style={{ minHeight: '60px' }}>
            <p className="text-lg text-black" id="typedText"></p>
            </div>
            <button onClick={handleButtonClick} className="btn-primary bg-white text-black py-3 px-8 text-lg font-semibold rounded-full shadow-md hover:scale-105 transition-transform">Get Started</button>
          </div>
        </section>
        <section className='flex flex-col items-center justify-center text-center p-8 bg-gradient-to-rrounded-lg shadow-lg mt-12 bg-white/50'>
          <h1 className='text-4xl md:text-5xl font-bold text-gray-800 mb-4'>
            Healthcare is changing.
          </h1>
          <h2 className='text-4xl md:text-5xl font-bold text-gray-800 mb-6'>
            Are you ready?
          </h2>
          <p className='text-lg text-gray-600 max-w-3xl leading-relaxed'>
            From AI-driven diagnostics to personalized telemedicine, the healthcare landscape is undergoing a massive transformation.
            Prepare yourself with robust tools that keep you ahead of the curve, ensuring patients receive the best possible care.
          </p>
        </section>

        <section className="comparison-grid fade-section grid grid-cols-1 md:grid-cols-3 gap-6 mt-12 ">

          {/* Card 1: Track & Remind */}
          <div className="comparison-card p-6 rounded-lg shadow-lg transform transition-transform hover:scale-105 bg-white/50">
            <h3 className="text-2xl font-semibold mb-4 text-gray-800">Track & Remind</h3>
            <p className="text-gray-700 mb-4">
              Helps users track their medication schedules and ensures timely reminders.
            </p>
            <ul className="list-disc list-inside text-gray-600 space-y-2">
              <li><span className="font-medium text-gray-800">Customizable schedules</span></li>
              <li><span className="font-medium text-gray-800">Timely reminders</span></li>
              <li><span className="font-medium text-gray-800">Easy input and editing</span></li>
            </ul>
          </div>

          {/* Card 2: Family Alerts */}
          <div className="comparison-card  p-6 rounded-lg shadow-lg transform transition-transform hover:scale-105 bg-white/50">
            <h3 className="text-2xl font-semibold mb-4 text-gray-800">Family Alerts</h3>
            <p className="text-gray-700 mb-4">
              Sends notifications to family members if a user misses doses, offering peace of mind.
            </p>
            <ul className="list-disc list-inside text-gray-600 space-y-2">
              <li><span className="font-medium text-gray-800">Instant alerts</span></li>
              <li><span className="font-medium text-gray-800">Multiple contact support</span></li>
              <li><span className="font-medium text-gray-800">Emergency escalation</span></li>
            </ul>
          </div>

          {/* Card 3: Medication History */}
          <div className="comparison-card  p-6 rounded-lg shadow-lg transform transition-transform hover:scale-105 bg-white/50">
            <h3 className="text-2xl font-semibold mb-4 text-gray-800">Medication History</h3>
            <p className="text-gray-700 mb-4">
              Access detailed logs and insights to track your medication adherence over time.
            </p>
            <ul className="list-disc list-inside text-gray-600 space-y-2">
              <li><span className="font-medium text-gray-800">Historical data charts</span></li>
              <li><span className="font-medium text-gray-800">Progress tracking</span></li>
              <li><span className="font-medium text-gray-800">Personalized insights</span></li>
            </ul>
          </div>

        </section>


      </div>
      <footer className="footer fade-section text-center p-6 mt-12 text-gray-600 bg-white/50"
        style={{
          backgroundImage: 'linear-gradient(270deg, #F97316, #3B82F6)',
          backgroundSize: '400% 400%',
          animation: 'gradientMove 5s ease infinite',
        }}>
        &copy; <span id="year"></span> Vibrant Healthcare | Better Health, One Reminder at a Time.
      </footer>
    </div>
  );
};

export default Welcome;
