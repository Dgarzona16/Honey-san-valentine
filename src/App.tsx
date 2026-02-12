import { useState, useEffect, useRef, type Key } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Heart, Gift, Music, Music2 } from 'lucide-react';
import audio from './assets/Goo Goo Dolls - Iris.mp3';
import { memories } from './data/memories.ts'
import type { Memory } from './data/memories.ts';

const ValentinePage = () => {
  const [stage, setStage] = useState('cover'); 
  const [isPlaying, setIsPlaying] = useState(false);
  const audioRef = useRef(null);

  // Fecha de inicio (Ajusta esto con tu fecha real)
  const startDate = new Date('2021-10-16T00:00:00'); 

  const toggleMusic = () => {
    if (audioRef.current.paused) {
      audioRef.current.play();
      setIsPlaying(true);
    } else {
      audioRef.current.pause();
      setIsPlaying(false);
    }
  };

  const startExperience = () => {
    setStage('scroll');
    audioRef.current.play();
    setIsPlaying(true);
  };

  return (
    <div className="min-h-screen bg-[#FFF5F7] text-[#D81B60] font-sans selection:bg-[#D81B60] selection:text-white">
      {/* Elemento de Audio Oculto */}
      <audio ref={audioRef} src={audio} loop />

      {/* Control de Música Flotante (Mobile friendly) */}
      {stage !== 'cover' && (
        <button 
          onClick={toggleMusic}
          className="fixed top-4 right-4 z-50 p-3 bg-white/70 backdrop-blur-md rounded-full shadow-lg"
        >
          {isPlaying ? <Music className="animate-spin-slow" /> : <Music2 />}
        </button>
      )}

      {/* 1. PORTADA */}
      {stage === 'cover' && (
        <motion.div 
          className="flex flex-col items-center justify-center h-screen p-6 text-center"
          exit={{ opacity: 0 }}
        >
          <motion.div
            animate={{ scale: [1, 1.1, 1] }}
            transition={{ repeat: Infinity, duration: 1.5 }}
            onClick={startExperience}
            className="cursor-pointer bg-white p-10 rounded-full shadow-[0_0_50px_rgba(216,27,96,0.2)]"
          >
            <Heart size={120} fill="#D81B60" />
          </motion.div>
          <h1 className="mt-8 text-2xl font-bold tracking-tight">Toca el corazón, tengo algo para ti...</h1>
        </motion.div>
      )}

      {/* 2. STORYTELLING (SCROLL) */}
      {stage === 'scroll' && (
        <div className="px-6 py-12 flex flex-col items-center space-y-32">
          {memories.map((memory: Memory, index: Key) => (<Section key={index} text={memory.text} img={memory.img} />))}

          <motion.button
            whileTap={{ scale: 0.9 }}
            onClick={() => setStage('rain')}
            className="flex flex-col items-center gap-4 pb-20"
          >
            <div className="p-6 bg-[#D81B60] rounded-2xl text-white shadow-2xl">
              <Gift size={40} />
            </div>
            <span className="font-bold animate-pulse">Ábrelo aquí</span>
          </motion.button>
        </div>
      )}

      {/* 3. PANTALLA FINAL CON CONTADOR Y LLUVIA */}
      <AnimatePresence>
        {stage === 'rain' && (
          <motion.div 
            initial={{ opacity: 0 }} 
            animate={{ opacity: 1 }}
            className="fixed inset-0 z-40 bg-[#FFF5F7] flex flex-col items-center justify-center p-6 text-center"
          >
            <RainEffect />
            
            <div className="z-50 bg-white/40 backdrop-blur-sm p-8 rounded-3xl border border-white/50 shadow-2xl">
              <h2 className="text-xl mb-4 font-medium uppercase tracking-widest">Llevamos juntos</h2>
              <Counter startDate={startDate} />
              <p className="mt-6 text-lg italic">¡Y contando! ❤️</p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

// Sub-componente para las secciones de scroll
const Section = ({ text, img }) => (
  <motion.div 
    initial={{ opacity: 0, y: 30 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true, margin: "-50px" }}
    className="w-full max-w-sm"
  >
    <div className="overflow-hidden rounded-3xl shadow-xl mb-6 aspect-4/5">
      <img src={img} alt="Memoria" className="w-full h-full object-cover" />
    </div>
    <p className="text-xl font-serif text-center px-4 leading-relaxed">{text}</p>
  </motion.div>
);

// Componente del Contador
const Counter = ({ startDate }) => {
  const [time, setTime] = useState({ days: 0, hours: 0, mins: 0, secs: 0 });

  useEffect(() => {
    const timer = setInterval(() => {
      const now = new Date();
      const diff = now - startDate;
      
      setTime({
        days: Math.floor(diff / (1000 * 60 * 60 * 24)),
        hours: Math.floor((diff / (1000 * 60 * 60)) % 24),
        mins: Math.floor((diff / 1000 / 60) % 60),
        secs: Math.floor((diff / 1000) % 60),
      });
    }, 1000);
    return () => clearInterval(timer);
  }, [startDate]);

  const Unit = ({ val, label }) => (
    <div className="flex flex-col items-center mx-2">
      <span className="text-3xl font-bold">{val}</span>
      <span className="text-[10px] uppercase opacity-70">{label}</span>
    </div>
  );

  return (
    <div className="flex justify-center items-center">
      <Unit val={time.days} label="Días" />
      <Unit val={time.hours} label="Hrs" />
      <Unit val={time.mins} label="Min" />
      <Unit val={time.secs} label="Seg" />
    </div>
  );
};

// Componente de Lluvia (Mejorado)
const RainEffect = () => {
  const emojis = ['❤️', '💖', '✨', '🌸', '🍭', '🌹', '💕'];
  
  // Aumentamos a 40 elementos para que se vea más lleno en toda la pantalla
  const items = Array.from({ length: 40 });

  return (
    <div className="fixed inset-0 w-full h-full overflow-hidden pointer-events-none z-0">
      {items.map((_, i) => {
        // Generamos valores aleatorios fuera del render para mayor estabilidad
        const randomLeft = Math.floor(Math.random() * 100); // 0% a 100% del ancho
        const randomDuration = Math.random() * 3 + 3; // Entre 3 y 6 segundos
        const randomDelay = Math.random() * 5; // Retraso de hasta 5s para que no salgan todos juntos
        const randomSize = Math.random() * (1.5 - 0.8) + 0.8; // Tamaños variados

        return (
          <motion.div
            key={i}
            initial={{ 
              y: -50, 
              x: `${randomLeft}%`, 
              opacity: 0,
              scale: randomSize 
            }}
            animate={{ 
              y: "110vh", 
              opacity: [0, 1, 1, 0], // Aparece, se mantiene, desaparece al final
              rotate: 360 
            }}
            transition={{ 
              duration: randomDuration, 
              repeat: Infinity, 
              delay: randomDelay,
              ease: "linear" // Caída constante
            }}
            className="absolute text-2xl"
            style={{ left: `${randomLeft}%` }} // Refuerzo de posición
          >
            {emojis[i % emojis.length]}
          </motion.div>
        );
      })}
    </div>
  );
};

export default ValentinePage;