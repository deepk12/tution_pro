"use client";

import { useState, useEffect, useCallback } from "react";
import { motion, AnimatePresence, useScroll, useSpring } from "framer-motion";
import { 
  Home, Info, Briefcase, CreditCard, Mail, ArrowRight, Zap, Users, 
  Check, Sun, Moon, Menu, X, Facebook, Twitter, Instagram, Linkedin,
  Globe, Shield, Cpu, GraduationCap, Award, MessageSquare, Phone, 
  MessageCircle, BookOpen, Target, Video, FileText, Clock, Trophy, MapPin, Send
} from "lucide-react";

// --- Configuration & Data ---
const NAV_LINKS = [
  { id: "home", name: "Home", icon: Home },
  { id: "about", name: "About Us", icon: Info },
  { id: "gallery", name: "Gallery", icon: Globe },
  { id: "why-us", name: "Why Choose Us", icon: Target },
  { id: "services", name: "Services", icon: Briefcase },
  { id: "testimonials", name: "Success Stories", icon: MessageCircle },
  { id: "plans", name: "Plans", icon: CreditCard },
  { id: "contact", name: "Contact", icon: Mail },
];

const SLIDE_IMAGES = [
  "https://plus.unsplash.com/premium_photo-1682125773446-259ce64f9dd7?q=80&w=2071&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  "https://images.unsplash.com/photo-1568047571827-8c46fe611345?w=900&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8OHx8c3R1ZHklMjBtb3RpdmF0aW9ufGVufDB8fDB8fHww",
  "https://plus.unsplash.com/premium_photo-1683887034473-74e486cdb7a1?w=900&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTd8fHVuaXZlcnNpdHl8ZW58MHx8MHx8fDA%3D",
  "https://images.unsplash.com/photo-1610563166150-b34df4f3bcd6?w=900&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8c29mdHdhcmUlMjBlbmdpbmVlcnxlbnwwfHwwfHx8MA%3D%3D",
  "https://images.unsplash.com/photo-1604964432806-254d07c11f32?w=900&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8ZGV2ZWxvcGVyfGVufDB8fDB8fHww"
];

// --- Sub-Component: Preloader Animation ---
const Preloader = ({ isDarkMode }) => {
  return (
    <motion.div
      initial={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.8, ease: "easeInOut" }}
      className={`fixed inset-0 z-[2000] flex flex-col items-center justify-center ${
        isDarkMode ? "bg-slate-950" : "bg-white"
      }`}
    >
      <motion.div
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.5 }}
        className="flex items-center gap-4 mb-8"
      >
        <div className="h-20 w-20 bg-indigo-600 rounded-2xl flex items-center justify-center text-white text-4xl italic font-black shadow-2xl">
          T
        </div>
        <span className={`text-5xl font-black tracking-tighter ${isDarkMode ? 'text-white' : 'text-slate-900'}`}>
          Tution<span className="text-indigo-600">Pro</span>
        </span>
      </motion.div>

      <div className="w-64 h-1.5 bg-indigo-500/10 rounded-full overflow-hidden relative">
        <motion.div
          initial={{ x: "-100%" }}
          animate={{ x: "0%" }}
          transition={{ duration: 1.8, ease: "easeInOut" }}
          className="absolute inset-0 bg-indigo-600"
        />
      </div>
      
      <motion.p 
        initial={{ opacity: 0 }}
        animate={{ opacity: [0, 1, 0.5] }}
        transition={{ delay: 0.5, duration: 1 }}
        className="mt-6 text-xs font-black uppercase tracking-[0.4em] text-indigo-500"
      >
        Empowering Your Future
      </motion.p>
    </motion.div>
  );
};

// --- Sub-Component: Countdown Timer ---
const CountdownTimer = () => {
  const [timeLeft, setTimeLeft] = useState({ hours: 0, minutes: 0, seconds: 0 });

  useEffect(() => {
    const timer = setInterval(() => {
      const now = new Date();
      setTimeLeft({
        hours: 23 - now.getHours(),
        minutes: 59 - now.getMinutes(),
        seconds: 59 - now.getSeconds()
      });
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  const format = (n) => String(n).padStart(2, '0');

  return (
    <div className="flex items-center gap-1 font-mono bg-black/40 px-3 py-1 rounded-lg border border-white/20 text-yellow-400">
      <Clock size={14} />
      <span className="text-xs font-bold tracking-widest">{format(timeLeft.hours)}:{format(timeLeft.minutes)}:{format(timeLeft.seconds)}</span>
    </div>
  );
};

// --- Animation Helper ---
const FadeInWhenVisible = ({ children, delay = 0 }) => (
  <motion.div
    initial={{ opacity: 0, y: 40 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true, margin: "-50px" }}
    transition={{ duration: 0.7, delay, ease: "easeOut" }}
  >
    {children}
  </motion.div>
);

// --- Section Components ---

const Hero = ({ navigateTo, isDarkMode }) => {
  const [current, setCurrent] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrent((prev) => (prev === SLIDE_IMAGES.length - 1 ? 0 : prev + 1));
    }, 4000);
    return () => clearInterval(timer);
  }, []);

  return (
    <section id="home" className="min-h-screen flex flex-col justify-center pt-44 md:pt-32">
      <div className="grid lg:grid-cols-2 gap-12 items-center">
        
        {/* LEFT COLUMN: IMAGE SLIDER */}
        <div className="relative flex justify-center order-2 lg:order-1">
          <div className="relative w-full max-w-[450px] aspect-[4/5]">
            <div className={`absolute -inset-4 blur-[100px] rounded-full opacity-30 ${isDarkMode ? 'bg-indigo-500' : 'bg-indigo-300'}`} />
            
            <div className={`relative z-10 w-full h-full rounded-[50px] overflow-hidden border-8 transition-colors duration-500
              ${isDarkMode ? 'border-slate-900 shadow-black/50' : 'border-white shadow-indigo-500/10'}`}>
              <AnimatePresence mode="wait">
                <motion.img 
                  key={current} 
                  src={SLIDE_IMAGES[current]} 
                  initial={{ opacity: 0, scale: 1.1 }} 
                  animate={{ opacity: 1, scale: 1 }} 
                  exit={{ opacity: 0, scale: 0.95 }} 
                  transition={{ duration: 0.8 }} 
                  className="w-full h-full object-cover" 
                />
              </AnimatePresence>
            </div>

            <motion.div 
              animate={{ y: [0, -10, 0] }}
              transition={{ repeat: Infinity, duration: 4 }}
              className={`absolute -bottom-6 -right-6 z-20 p-4 rounded-2xl border shadow-xl hidden md:block
                ${isDarkMode ? 'bg-slate-900 border-white/10' : 'bg-white border-slate-100'}`}
            >
              <div className="flex items-center gap-3">
                <div className="p-2 bg-green-500/20 rounded-lg text-green-500"><Check size={20} /></div>
                <div>
                  <div className={`text-sm font-bold ${isDarkMode ? 'text-white' : 'text-slate-900'}`}>CBSE / ICSE / State</div>
                  <div className="text-[10px] font-bold text-indigo-500 uppercase">100% Syllabus Covered</div>
                </div>
              </div>
            </motion.div>

            <div className="absolute bottom-6 left-1/2 -translate-x-1/2 z-20 flex gap-2">
              {SLIDE_IMAGES.map((_, i) => (
                <div key={i} className={`h-2 rounded-full transition-all duration-300 ${current === i ? "w-8 bg-indigo-600" : "w-2 bg-white/50"}`} />
              ))}
            </div>
          </div>
        </div>

        {/* RIGHT COLUMN: TEXT CONTENT */}
        <div className="space-y-8 order-1 lg:order-2">
          <motion.div 
            initial={{ opacity: 0, x: 20 }} 
            animate={{ opacity: 1, x: 0 }} 
            className={`inline-flex items-center gap-2 px-4 py-1.5 rounded-full border text-sm font-bold ${isDarkMode ? 'bg-indigo-500/10 border-indigo-500/20 text-indigo-400' : 'bg-indigo-50 border-indigo-200 text-indigo-600'}`}
          >
            <Zap size={16} className="fill-current" /> India's Top Rated Classes 1-12
          </motion.div>
          
          <h1 className={`text-6xl md:text-8xl font-black leading-[0.9] tracking-tighter ${isDarkMode ? 'text-white' : 'text-slate-900'}`}>
            Excellence in <br/> <span className="text-indigo-600">Every Grade.</span>
          </h1>
          
          <p className={`text-xl max-w-lg leading-relaxed ${isDarkMode ? 'text-gray-400' : 'text-slate-600'}`}>
            From Class 1 foundations to Class 12 Boards & Entrance (JEE/NEET), TutionPro provides the mentorship your child needs to lead the rank list.
          </p>
          
          <div className="flex flex-wrap gap-4">
            <button 
              onClick={() => navigateTo("plans")} 
              className="px-10 py-5 bg-indigo-600 hover:bg-indigo-700 text-white rounded-2xl font-bold shadow-2xl shadow-indigo-600/40 transition-all flex items-center gap-3 active:scale-95"
            >
              Join Free Demo <ArrowRight size={20} />
            </button>
            <button 
              onClick={() => navigateTo("unboxing")} 
              className={`px-10 py-5 rounded-2xl font-bold border transition-all ${isDarkMode ? 'border-white/10 hover:bg-white/5' : 'border-slate-200 hover:bg-slate-50'}`}
            >
              Win Scholarship
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

const About = ({ isDarkMode }) => (
  <section id="about" className="py-32 scroll-mt-24 border-t border-white/5 overflow-hidden">
    <div className="grid lg:grid-cols-2 gap-16 items-center">
      <FadeInWhenVisible>
        <div className="space-y-10">
          <div className="space-y-4">
            <motion.span 
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              className="px-4 py-1.5 rounded-full bg-indigo-600 text-white text-[10px] font-black uppercase tracking-[0.2em]"
            >
              The TutionPro Standard
            </motion.span>
            <h2 className={`text-6xl md:text-7xl font-black tracking-tighter leading-[0.9] ${isDarkMode ? 'text-white' : 'text-slate-900'}`}>
              Beyond <br /> <span className="text-indigo-600">Learning.</span>
            </h2>
          </div>
          <p className={`text-xl leading-relaxed max-w-lg ${isDarkMode ? 'text-gray-400' : 'text-slate-600'}`}>
            We don't just teach Class 1-12; we engineer success. Our ecosystem combines **AIR Top-100 mentors** with adaptive AI to create a personalized journey.
          </p>
          <div className="flex flex-col gap-8">
             <div className="flex items-start gap-6">
                <div className={`h-16 w-16 shrink-0 rounded-2xl flex items-center justify-center ${isDarkMode ? 'bg-white/5' : 'bg-indigo-50'}`}>
                   <Trophy className="text-indigo-600" size={32} />
                </div>
                <div>
                   <h4 className="text-xl font-bold">AIR Ranker Faculty</h4>
                   <p className="text-sm opacity-60">Learn directly from those who conquered JEE & NEET.</p>
                </div>
             </div>
             <div className="flex items-start gap-6">
                <div className={`h-16 w-16 shrink-0 rounded-2xl flex items-center justify-center ${isDarkMode ? 'bg-white/5' : 'bg-indigo-50'}`}>
                   <Target className="text-indigo-600" size={32} />
                </div>
                <div>
                   <h4 className="text-xl font-bold">Precision Mapping</h4>
                   <p className="text-sm opacity-60">Syllabus coverage designed for 100/100 board scores.</p>
                </div>
             </div>
          </div>
        </div>
      </FadeInWhenVisible>

      <div className="grid grid-cols-2 grid-rows-2 gap-4 h-[650px]">
        
        <motion.div whileHover={{ scale: 1.02 }} className="rounded-[40px] overflow-hidden shadow-xl bg-indigo-600 flex items-center justify-center relative">
          <img src="https://plus.unsplash.com/premium_photo-1685086785013-acc71c40e5fe?w=900&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1yZWxhdGVkfDR8fHxlbnwwfHx8fHw%3D" className="w-full h-full object-cover opacity-60" alt="Mentorship" />
          <div className="absolute flex flex-col items-center text-white p-4">
             <BookOpen size={32} className="mb-2" />
             <span className="text-[10px] font-black uppercase tracking-widest text-center">Qaulity Eduaction</span>
          </div>
        </motion.div>
        <motion.div whileHover={{ scale: 1.02 }} className="rounded-[40px] overflow-hidden shadow-xl bg-indigo-600 flex items-center justify-center relative">
          <img src="https://images.unsplash.com/photo-1427504494785-3a9ca7044f45?w=900&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MzR8fHN0dWRlbnR8ZW58MHx8MHx8fDA%3D" className="w-full h-full object-cover opacity-60" alt="Mentorship" />
          <div className="absolute flex flex-col items-center text-white p-4">
             <Users size={32} className="mb-2" />
             <span className="text-[10px] font-black uppercase tracking-widest text-center">Personalized Mentorship</span>
          </div>
        </motion.div>
        <motion.div whileHover={{ scale: 1.02 }} className="rounded-[40px] overflow-hidden shadow-xl bg-indigo-600 flex items-center justify-center relative">
          <img src="https://images.unsplash.com/photo-1710743719228-123b2ef2796c?w=900&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8N3x8aW50ZXJhY3RpdmUlMjBhbmltYXRpb258ZW58MHx8MHx8fDA%3D" className="w-full h-full object-cover opacity-60" alt="Visualization" />
          <div className="absolute flex flex-col items-center text-white p-4">
             <Cpu size={32} className="mb-2" />
             <span className="text-[10px] font-black uppercase tracking-widest text-center">Interactive Animations</span>
          </div>
        </motion.div>
        <motion.div whileHover={{ scale: 1.02 }} className="rounded-[40px] overflow-hidden shadow-xl bg-indigo-600 flex items-center justify-center relative">
          <img src="https://images.unsplash.com/photo-1510070112810-d4e9a46d9e91?w=800" className="w-full h-full object-cover opacity-60" alt="Focus" />
          <div className="absolute flex flex-col items-center text-white p-4">
             <Target size={32} className="mb-2" />
             <span className="text-[10px] font-black uppercase tracking-widest text-center">Exam Focus</span>
          </div>
        </motion.div>
      </div>
    </div>
  </section>
);

const Gallery = ({ isDarkMode }) => {
  const photos = [
    { url: "https://images.unsplash.com/photo-1577896851231-70ef18881754?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D", title: "Smart Class" },
    { url: "https://images.unsplash.com/photo-1434030216411-0b793f4b4173?w=500", title: "Study Focus" },
    { url: "https://images.unsplash.com/photo-1522202176988-66273c2fd55f?w=500", title: "Group Session" },
    { url: "https://images.unsplash.com/photo-1543269865-cbf427effbad?w=500", title: "Top Results" },
    { url: "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=500", title: "Tech Lab" },
    { url: "https://images.unsplash.com/photo-1524178232363-1fb2b075b655?w=500", title: "Expert Faculty" },
    { url: "https://images.unsplash.com/photo-1571260899304-425eee4c7efc?w=500", title: "Campus Life" },
    { url: "https://images.unsplash.com/photo-1517694712202-14dd9538aa97?w=500", title: "Coding Class" },
    { url: "https://images.unsplash.com/photo-1497633762265-9d179a990aa6?w=500", title: "Library" },
    { url: "https://images.unsplash.com/photo-1509062522246-3755977927d7?w=500", title: "Doubt Clearing" },
    { url: "https://plus.unsplash.com/premium_photo-1664303932375-21fe1d60b886?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D", title: "Success Gala" },
    { url: "https://images.unsplash.com/photo-1503676260728-1c00da094a0b?w=500", title: "Workshops" },
  ];

  return (
    <section id="gallery" className="py-32 scroll-mt-24">
      <FadeInWhenVisible>
        <div className="mb-16">
          <h2 className={`text-5xl font-black tracking-tighter ${isDarkMode ? 'text-white' : 'text-slate-900'}`}>
            Gallery <span className="text-indigo-600">Hub.</span>
          </h2>
          <p className="opacity-60 text-lg mt-2 font-medium">12+ reasons why TutionPro is the top choice.</p>
        </div>

        {/* Dense 12-Photo Grid */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {photos.map((photo, idx) => (
            <motion.div
              key={idx}
              whileHover={{ scale: 0.96, rotate: 1 }}
              transition={{ duration: 0.3 }}
              className={`relative aspect-square overflow-hidden rounded-3xl group cursor-pointer ${
                isDarkMode ? 'bg-white/5 border border-white/10' : 'bg-slate-100 border border-slate-200 shadow-md'
              }`}
            >
              <img 
                src={photo.url} 
                alt={photo.title} 
                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110 opacity-90 group-hover:opacity-100" 
              />
              
              {/* Overlay with Title */}
              <div className="absolute inset-0 bg-gradient-to-t from-indigo-950/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex flex-col justify-end p-5">
                <p className="text-white font-bold text-sm tracking-widest uppercase">
                  {photo.title}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </FadeInWhenVisible>
    </section>
  );
};

const WhyChooseUs = ({ isDarkMode }) => {
  const features = [
    { title: "Personalized Attention", desc: "Small batches ensuring every student gets the focus they deserve.", icon: Users, color: "bg-blue-500" },
    { title: "Regular Doubt Sessions", desc: "Dedicated time slots to clear every hurdle in your learning journey.", icon: MessageSquare, color: "bg-purple-500" },
    { title: "Weekly Tests", desc: "Rigorous assessment to ensure concept clarity and exam readiness.", icon: FileText, color: "bg-orange-500" },
    { title: "Performance Tracking", desc: "Detailed analytics for parents and students to monitor growth.", icon: Target, color: "bg-green-500" },
    { title: "Affordable Fees", desc: "Premium quality education at prices that don't break the bank.", icon: CreditCard, color: "bg-yellow-500" },
    { title: "Smart Classrooms", desc: "Interactive digital tools and 3D animations for better visualization.", icon: Cpu, color: "bg-indigo-500" },
  ];

  return (
    <section id="why-us" className="py-32 scroll-mt-24">
      <FadeInWhenVisible>
        <div className="flex flex-col md:flex-row justify-between items-end mb-16 gap-6">
          <div className="max-w-2xl">
            <h2 className={`text-6xl font-black tracking-tighter leading-[0.9] mb-6 ${isDarkMode ? 'text-white' : 'text-slate-900'}`}>
              Why Students <br /> <span className="text-indigo-600">Trust TutionPro.</span>
            </h2>
            <p className="opacity-60 text-lg font-medium">We combine traditional teaching values with modern technology.</p>
          </div>
          <div className="hidden lg:block h-px flex-grow bg-indigo-600/20 mx-10 mb-6"></div>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {features.map((f, idx) => (
            <motion.div 
              key={idx}
              whileHover={{ y: -5 }}
              className={`p-8 rounded-[32px] border transition-all ${isDarkMode ? 'bg-white/5 border-white/10' : 'bg-slate-50 border-slate-200'}`}
            >
              <div className={`w-12 h-12 rounded-2xl ${f.color} flex items-center justify-center text-white mb-6 shadow-lg`}>
                <f.icon size={24} />
              </div>
              <h3 className="text-xl font-black mb-3">{f.title}</h3>
              <p className="opacity-60 text-sm leading-relaxed">{f.desc}</p>
            </motion.div>
          ))}
        </div>
      </FadeInWhenVisible>
    </section>
  );
};

const Services = ({ isDarkMode }) => (
  <section id="services" className="py-32 scroll-mt-24">
    <FadeInWhenVisible>
      <div className="text-center max-w-3xl mx-auto mb-20 space-y-4">
        <h2 className={`text-5xl font-black tracking-tighter ${isDarkMode ? 'text-white' : 'text-slate-900'}`}>
          The Ultimate <span className="text-indigo-600">Learning Toolkit.</span>
        </h2>
        <p className="opacity-60 text-lg font-medium">Tools designed to help you top your school exams.</p>
      </div>
      <div className="grid md:grid-cols-3 gap-8">
        {[
          { i: BookOpen, t: "NCERT & Board Solutions", d: "Step-by-step solutions for all textbooks." },
          { i: MessageSquare, t: "Instant Doubt Solving", d: "Snap a photo and get video solutions in 60 seconds." },
          { i: Target, t: "JEE / NEET Prep", d: "Specialized mock tests and rank predictors." },
          { i: Video, t: "Concept 3D Animations", d: "Visualize complex Biology and Physics concepts." },
          { i: Award, t: "Olympiad Training", d: "Dedicated modules for IMO, NSO, and NTSE." },
          { i: FileText, t: "Personalized Notes", d: "Handwritten revision notes and mind maps." }
        ].map((item, idx) => (
          <div key={idx} className={`p-10 rounded-[40px] border transition-all duration-300 hover:-translate-y-2 group ${isDarkMode ? 'bg-white/5 border-white/10 hover:bg-white/10' : 'bg-white border-slate-200 shadow-xl hover:shadow-2xl'}`}>
            <div className={`w-16 h-16 rounded-2xl flex items-center justify-center mb-8 transition-colors ${isDarkMode ? 'bg-indigo-500/10' : 'bg-indigo-50 group-hover:bg-indigo-600'}`}>
              <item.i className={`transition-colors ${isDarkMode ? 'text-indigo-500' : 'text-indigo-600 group-hover:text-white'}`} size={32} />
            </div>
            <h3 className={`text-2xl font-bold mb-4 ${isDarkMode ? 'text-white' : 'text-slate-900'}`}>{item.t}</h3>
            <p className={`leading-relaxed ${isDarkMode ? 'text-gray-400' : 'text-slate-600'}`}>{item.d}</p>
          </div>
        ))}
      </div>
    </FadeInWhenVisible>
  </section>
);
const Testimonials = ({ isDarkMode }) => {
  const reviews = [
    { 
      text: "Best coaching! My marks improved from 60% to 90% in just 6 months. The focus on basics is life-changing.", 
      author: "Aditya Sharma", 
      role: "Class 12 Student", 
      tag: "Result" 
    },
    { 
      text: "Teachers explain concepts very clearly. My daughter actually looks forward to her Math classes now!", 
      author: "Mr. Rajesh Kumar", 
      role: "Parent (Class 9)", 
      tag: "Parent Feedback" 
    },
    { 
      text: "The doubt solving feature is incredible. I uploaded a Physics problem at 10 PM and got a video solution instantly.", 
      author: "Sneha Kapoor", 
      role: "JEE Aspirant", 
      tag: "Technology" 
    },
    { 
      text: "Affordable fees but premium education. The smart classroom animations help in visualizing Biology perfectly.", 
      author: "Ishan Singh", 
      role: "Class 10 Student", 
      tag: "Innovation" 
    }
  ];

  return (
    <section id="testimonials" className="py-32 scroll-mt-24">
      <FadeInWhenVisible>
        <div className="text-center mb-16 space-y-4">
          <motion.span className="text-indigo-600 font-black uppercase tracking-widest text-xs">Real Stories</motion.span>
          <h2 className={`text-5xl md:text-6xl font-black tracking-tighter ${isDarkMode ? 'text-white' : 'text-slate-900'}`}>
            Voices of <span className="text-indigo-600">Success.</span>
          </h2>
        </div>

        <div className="columns-1 md:columns-2 gap-6 space-y-6">
          {reviews.map((rev, idx) => (
            <motion.div 
              key={idx}
              whileHover={{ scale: 1.02 }}
              className={`break-inside-avoid p-10 rounded-[40px] border flex flex-col gap-6 transition-all ${
                isDarkMode ? 'bg-white/5 border-white/10' : 'bg-white border-slate-100 shadow-xl'
              }`}
            >
              <div className="flex justify-between items-start">
                <div className="flex gap-1">
                  {[...Array(5)].map((_, i) => (
                    <span key={i} className="text-yellow-400 text-lg">★</span>
                  ))}
                </div>
                <span className="px-3 py-1 bg-indigo-600/10 text-indigo-500 rounded-full text-[10px] font-black uppercase tracking-widest">
                  {rev.tag}
                </span>
              </div>
              
              <p className={`text-xl font-medium leading-relaxed italic ${isDarkMode ? 'text-gray-300' : 'text-slate-700'}`}>
                “{rev.text}”
              </p>

              <div className="flex items-center gap-4 border-t pt-6 border-white/5">
                <div className="h-12 w-12 bg-indigo-600 rounded-full flex items-center justify-center text-white font-black">
                  {rev.author[0]}
                </div>
                <div>
                  <h4 className="font-bold text-lg">{rev.author}</h4>
                  <p className="text-xs opacity-50">{rev.role}</p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </FadeInWhenVisible>
    </section>
  );
};

const Plans = ({ isDarkMode }) => (
  <section id="plans" className="py-32 scroll-mt-24">
    <FadeInWhenVisible>
      <div className="text-center mb-16 space-y-4">
        <h2 className={`text-5xl font-black tracking-tighter ${isDarkMode ? 'text-white' : 'text-slate-900'}`}>
          Choose Your <span className="text-indigo-600">Academic Tier.</span>
        </h2>
      </div>
      <div className="grid lg:grid-cols-3 gap-8 max-w-7xl mx-auto">
        {[
          { n: "Foundations (Class 1-5)", p: "₹499", f: ["All Primary Subjects", "Animation Lessons", "Parent Progress Portal"] },
          { n: "Achievers (Class 6-10)", p: "₹999", f: ["Maths, Science, SST", "Olympiad Preparation", "Weekly Live Sessions"], h: true },
          { n: "Masters (Class 11-12)", p: "₹1499", f: ["PCM, PCB, Commerce", "JEE/NEET Modules", "Career Mentorship"] }
        ].map((plan, i) => (
          <div key={i} className={`p-10 rounded-[40px] border relative flex flex-col transition-all hover:scale-[1.02] duration-300 ${plan.h ? 'border-indigo-600 bg-indigo-600/5 ring-2 ring-indigo-600 shadow-2xl shadow-indigo-600/20' : isDarkMode ? 'border-white/10 bg-white/5' : 'border-slate-200 bg-white shadow-lg'}`}>
            {plan.h && <span className="absolute -top-4 left-1/2 -translate-x-1/2 bg-indigo-600 text-white px-6 py-1.5 rounded-full text-xs font-black uppercase tracking-widest shadow-lg">Most Popular</span>}
            <h3 className={`text-2xl font-black mb-4 ${isDarkMode ? 'text-white' : 'text-slate-900'}`}>{plan.n}</h3>
            <div className={`text-6xl font-black mb-2 ${isDarkMode ? 'text-white' : 'text-slate-900'}`}>{plan.p}<span className="text-lg font-normal opacity-40 italic">/mo</span></div>
            <ul className="space-y-4 mb-12 flex-grow">
              {plan.f.map(f => (
                <li key={f} className="flex gap-3 items-start font-medium text-sm leading-tight">
                  <Check size={18} className="text-indigo-600 shrink-0 mt-0.5"/> 
                  <span className={isDarkMode ? 'text-gray-400' : 'text-slate-600'}>{f}</span>
                </li>
              ))}
            </ul>
            <button className={`w-full py-5 rounded-2xl font-black text-sm uppercase tracking-widest transition-all ${plan.h ? 'bg-indigo-600 text-white shadow-xl shadow-indigo-600/30' : 'bg-indigo-600/10 text-indigo-600 hover:bg-indigo-600 hover:text-white'}`}>Enroll Now</button>
          </div>
        ))}
      </div>
    </FadeInWhenVisible>
  </section>
);

const Contact = ({ isDarkMode }) => {
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsSubmitted(true);
    // Reset after 5 seconds for demo purposes
    setTimeout(() => setIsSubmitted(false), 5000);
  };

  const contactDetails = [
    { 
      icon: Phone, 
      title: "Call Us", 
      detail: "+91 95594 94070", 
      link: "tel:+919559494070",
      color: "bg-green-500"
    },
    { 
      icon: Mail, 
      title: "Email Us", 
      detail: "hello@tutionpro.com", 
      link: "mailto:hello@tutionpro.com",
      color: "bg-blue-500"
    },
    { 
      icon: MapPin, 
      title: "Visit Us", 
      detail: "Abhay Khand 4, Pocket 2, Indirapuram, Ghaziabad, UP 201014", 
      link: "https://www.google.com/maps/search/Abhay+Khand+4+Indirapuram",
      color: "bg-indigo-600",
      isLocation: true // Unique flag for the 📍 effect
    }
  ];

  return (
    <section id="contact" className="py-32 scroll-mt-24">
      {/* 1. Header Area */}
      <div className="text-center mb-16 space-y-4">
        <motion.span 
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          className="text-indigo-600 font-black uppercase tracking-[0.3em] text-xs"
        >
          Get Started
        </motion.span>
        <h2 className={`text-5xl md:text-7xl font-black tracking-tighter ${isDarkMode ? 'text-white' : 'text-slate-900'}`}>
          Contact <span className="text-indigo-600">TutionPro.</span>
        </h2>
      </div>

      {/* 2. Interactive Contact Cards */}
      <div className="grid lg:grid-cols-3 gap-8 mb-20">
        {contactDetails.map((item, idx) => (
          <motion.a 
            key={idx}
            href={item.link}
            target="_blank"
            rel="noopener noreferrer"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: idx * 0.1 }}
            whileHover={{ y: -10 }}
            className={`group p-10 rounded-[48px] border flex flex-col items-center text-center gap-6 transition-all relative overflow-hidden ${
              isDarkMode ? 'bg-white/5 border-white/10 hover:bg-white/10' : 'bg-white border-slate-100 shadow-2xl shadow-indigo-500/5 hover:shadow-indigo-500/10'
            }`}
          >
            {/* The "📍" Specialized Icon Container */}
            <div className="relative">
              {item.isLocation && (
                <span className="absolute inset-0 rounded-full bg-indigo-600/30 animate-ping"></span>
              )}
              <div className={`relative w-20 h-20 ${item.color} rounded-3xl flex items-center justify-center text-white shadow-2xl transition-transform duration-500 ${item.isLocation ? 'rotate-12 group-hover:rotate-0' : 'group-hover:scale-110'}`}>
                <item.icon size={32} fill="currentColor" className={item.isLocation ? "-rotate-12 group-hover:rotate-0 transition-transform" : ""} />
              </div>
            </div>

            <div className="space-y-2">
              <h4 className="font-black text-xs uppercase tracking-[0.2em] text-indigo-600">{item.title}</h4>
              <p className={`text-xl font-bold leading-tight ${isDarkMode ? 'text-white' : 'text-slate-900'}`}>
                {item.detail}
              </p>
            </div>

            <div className={`mt-auto px-6 py-2 rounded-full text-[10px] font-black uppercase tracking-widest transition-colors ${isDarkMode ? 'bg-white/10 text-white' : 'bg-indigo-50 text-indigo-600'}`}>
              {item.isLocation ? "View on Map" : "Connect Now"}
            </div>
          </motion.a>
        ))}
      </div>

      {/* 3. Map & Form Integrated Block */}
      <div className={`rounded-[60px] border grid lg:grid-cols-2 overflow-hidden shadow-2xl ${
        isDarkMode ? 'bg-slate-900 border-white/10' : 'bg-white border-slate-200'
      }`}>
        
        {/* Left: Professional Inquiry Form */}
        <div className="p-10 lg:p-16 border-r border-white/5">
          <h3 className="text-3xl font-black mb-8 tracking-tighter">Send an Inquiry</h3>
          <AnimatePresence mode="wait">
            {!isSubmitted ? (
              <motion.form 
                key="form"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                onSubmit={handleSubmit} 
                className="space-y-4"
              >
                <div className="grid md:grid-cols-2 gap-4">
                  <input required placeholder="Student Name" className={`w-full p-5 rounded-2xl border outline-none focus:border-indigo-500 transition-all ${isDarkMode ? 'bg-black/20 border-white/10 text-white' : 'bg-slate-50 border-slate-200'}`} />
                  <input required placeholder="Class (e.g. 10th)" className={`w-full p-5 rounded-2xl border outline-none focus:border-indigo-500 transition-all ${isDarkMode ? 'bg-black/20 border-white/10 text-white' : 'bg-slate-50 border-slate-200'}`} />
                </div>
                <input required type="tel" placeholder="Mobile Number" className={`w-full p-5 rounded-2xl border outline-none focus:border-indigo-500 transition-all ${isDarkMode ? 'bg-black/20 border-white/10 text-white' : 'bg-slate-50 border-slate-200'}`} />
                <textarea required placeholder="Your Message or Doubt" rows={4} className={`w-full p-5 rounded-2xl border outline-none focus:border-indigo-500 transition-all ${isDarkMode ? 'bg-black/20 border-white/10 text-white' : 'bg-slate-50 border-slate-200'}`} />
                
                <button type="submit" className="w-full py-5 bg-indigo-600 text-white rounded-2xl font-black text-lg hover:bg-indigo-700 active:scale-[0.98] transition-all flex items-center justify-center gap-3">
                  Submit Application <Send size={20} />
                </button>
              </motion.form>
            ) : (
              <motion.div 
                key="success"
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                className="text-center py-10"
              >
                <div className="w-20 h-20 bg-green-500 rounded-full flex items-center justify-center mx-auto mb-6 shadow-2xl shadow-green-500/40">
                  <Check size={40} className="text-white" strokeWidth={4} />
                </div>
                <h4 className="text-2xl font-black mb-2">Message Sent!</h4>
                <p className="opacity-60">We'll contact you in Indirapuram shortly.</p>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* Right: Targeted Map of Abhay Khand 4 */}
        <div className="relative bg-slate-200 min-h-[500px]">
          <iframe 
            title="TutionPro Indirapuram Location"
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3502.558368142718!2d77.369325975494!3d28.61528497567544!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x390ce510f2746401%3A0xed0189922e5242b8!2sAbhay%20Khand%204%2C%20Indirapuram%2C%20Ghaziabad%2C%20Uttar%20Pradesh%20201014!5e0!3m2!1sen!2sin!4v1710000000000!5m2!1sen!2sin" 
            className={`absolute inset-0 w-full h-full border-0 ${isDarkMode ? 'grayscale invert-[0.9] contrast-[1.2] opacity-80' : ''}`}
            allowFullScreen="" 
            loading="lazy" 
          />
          {/* Subtle Overlay to prevent accidental scrolling on map */}
          <div className="absolute inset-0 bg-transparent pointer-events-none group-hover:bg-indigo-600/5 transition-colors" />
        </div>
      </div>
    </section>
  );
};

// --- Main App ---

export default function App() {
  const [activePage, setActivePage] = useState("home");
  const [isDarkMode, setIsDarkMode] = useState(true);
  const [isMobileMenu, setIsMobileMenu] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, { stiffness: 100, damping: 30 });

  // Handle Initial Loading Animation (Session-based)
  useEffect(() => {
    const hasSeenIntro = sessionStorage.getItem("hasSeenIntro");
    if (hasSeenIntro) {
      setIsLoading(false);
    } else {
      const timer = setTimeout(() => {
        setIsLoading(false);
        sessionStorage.setItem("hasSeenIntro", "true");
      }, 2500); // Intro duration
      return () => clearTimeout(timer);
    }
  }, []);

  const navigateTo = (id) => {
    const el = document.getElementById(id);
    if (el) {
      const offset = 140; 
      const position = el.getBoundingClientRect().top + window.pageYOffset - offset;
      window.scrollTo({ top: position, behavior: "smooth" });
      window.history.pushState({ section: id }, "", `#${id}`);
      setActivePage(id);
      setIsMobileMenu(false);
    }
  };

  useEffect(() => {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) setActivePage(entry.target.id);
      });
    }, { threshold: 0.3, rootMargin: "-140px 0px 0px 0px" });

    NAV_LINKS.forEach(link => {
      const el = document.getElementById(link.id);
      if (el) observer.observe(el);
    });
    return () => observer.disconnect();
  }, []);

  return (
    <div className={`transition-colors duration-500 selection:bg-indigo-600 selection:text-white ${isDarkMode ? "bg-slate-950 text-white" : "bg-white text-slate-900"}`}>
      
      {/* 0. WEBSITE PRELOADER */}
      <AnimatePresence>
        {isLoading && <Preloader isDarkMode={isDarkMode} key="loader" />}
      </AnimatePresence>

      {/* 1. TOP ADVERTISEMENT BANNER */}
      <div className="fixed top-0 left-0 w-full z-[120] bg-indigo-600 text-white py-2 border-b border-indigo-400/30 overflow-hidden shadow-xl">
        <div className="max-w-7xl mx-auto px-6 flex justify-between items-center relative h-10">
          <motion.div animate={{ x: ["0%", "-50%"] }} transition={{ repeat: Infinity, duration: 30, ease: "linear" }} className="whitespace-nowrap flex gap-10 items-center text-[10px] md:text-xs font-black uppercase tracking-[0.1em]">
            {[1, 2].map((i) => (
              <div key={i} className="flex gap-10 items-center">
                <span>🔥 Admission is LOCKED at ₹999! 🔥</span>
                <button onClick={() => navigateTo('contact')} className="bg-yellow-400 text-indigo-950 px-3 py-1 rounded-full text-[9px] font-black hover:scale-105 transition-transform shadow-lg">CLAIM NOW</button>
                <span className="opacity-30">|</span>
                <span className="text-yellow-300">⚡ OFFER EXPIRES SOON ⚡</span>
                <span className="opacity-30">|</span>
              </div>
            ))}
          </motion.div>
          <div className="hidden sm:flex items-center gap-3 bg-indigo-700 pl-6 pr-2 py-1 rounded-l-full shadow-[-20px_0_30px_rgba(79,70,229,1)] z-10">
            <span className="text-[10px] font-bold tracking-tighter">ENDS IN:</span>
            <CountdownTimer />
          </div>
        </div>
      </div>

      <motion.div className="fixed top-[48px] left-0 right-0 h-1 bg-indigo-400 z-[110] origin-left" style={{ scaleX }} />

      {/* Navbar */}
      <nav className={`fixed top-[48px] z-[100] w-full border-b backdrop-blur-xl ${isDarkMode ? "border-white/5 bg-slate-950/80 shadow-2xl" : "border-slate-200 bg-white/80"}`}>
        <div className="mx-auto max-w-7xl px-6 flex h-20 items-center justify-between">
          <div className="flex items-center gap-2 cursor-pointer font-black text-2xl tracking-tighter" onClick={() => navigateTo("home")}>
            <div className="h-10 w-10 bg-indigo-600 rounded-xl flex items-center justify-center text-white italic shadow-lg shadow-indigo-600/20">T</div>
            <span>Tution<span className="text-indigo-600">Pro</span></span>
          </div>
          <div className="hidden md:flex items-center gap-2 bg-indigo-500/5 p-1 rounded-2xl border border-indigo-500/10">
            {NAV_LINKS.map(link => (
              <button key={link.id} onClick={() => navigateTo(link.id)} className={`px-5 py-2 font-bold text-sm rounded-xl transition-all ${activePage === link.id ? "text-white bg-indigo-600 shadow-md" : "opacity-50 hover:opacity-100"}`}>
                {link.name}
              </button>
            ))}
          </div>
          <div className="flex items-center gap-4">
            <button onClick={() => setIsDarkMode(!isDarkMode)} className={`p-3 rounded-2xl transition-all ${isDarkMode ? 'bg-white/5 text-yellow-400' : 'bg-slate-100 text-indigo-600'}`}>
              {isDarkMode ? <Sun size={22}/> : <Moon size={22}/>}
            </button>
            <button onClick={() => setIsMobileMenu(true)} className="md:hidden text-indigo-600"><Menu size={32}/></button>
          </div>
        </div>
      </nav>

      {/* Floating Contact Buttons */}
      {/* Floating Contact Buttons */}
      <div className="fixed bottom-6 right-6 z-[120] flex flex-col gap-4">
        {/* WhatsApp Button */}
        <motion.a 
          whileHover={{ scale: 1.1, rotate: 5 }} 
          whileTap={{ scale: 0.9 }} 
          href="https://wa.me/919559494070?text=Hi%20TutionPro,%20I'm%20interested%20in%20your%20coaching%20classes!" 
          target="_blank"
          rel="noopener noreferrer"
          className="w-16 h-16 bg-[#25D366] text-white rounded-full flex items-center justify-center shadow-2xl cursor-pointer"
        >
          {/* Official WhatsApp Logo SVG */}
          <svg 
            viewBox="0 0 24 24" 
            width="32" 
            height="32" 
            fill="currentColor" 
            xmlns="http://www.w3.org/2000/svg"
          >
            <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L0 24l6.335-1.662c1.72.938 3.659 1.434 5.633 1.435h.004c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z"/>
          </svg>
        </motion.a>

        {/* Call Button */}
        <motion.a 
          whileHover={{ scale: 1.1 }} 
          whileTap={{ scale: 0.9 }} 
          href="tel:+919559494070" 
          className="w-16 h-16 bg-indigo-600 text-white rounded-full flex items-center justify-center shadow-2xl cursor-pointer"
        >
          <Phone size={28} fill="currentColor" />
        </motion.a>
      </div>

      <main className="max-w-7xl mx-auto px-6">
        <Hero navigateTo={navigateTo} isDarkMode={isDarkMode} />
        <About isDarkMode={isDarkMode} />
        <Gallery isDarkMode={isDarkMode} />
        <WhyChooseUs isDarkMode={isDarkMode} />
        <Services isDarkMode={isDarkMode} />
        <Testimonials isDarkMode={isDarkMode} />
        <Plans isDarkMode={isDarkMode} />
        <Contact isDarkMode={isDarkMode} />
      </main>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMobileMenu && (
          <motion.div initial={{ x: "100%" }} animate={{ x: 0 }} exit={{ x: "100%" }} transition={{ type: "spring", damping: 25 }} className={`fixed inset-0 z-[200] p-10 flex flex-col items-center justify-center gap-8 ${isDarkMode ? 'bg-slate-950' : 'bg-white'}`}>
             <button onClick={() => setIsMobileMenu(false)} className="absolute top-10 right-10 p-4 bg-indigo-600/10 text-indigo-600 rounded-full"><X size={32}/></button>
             {NAV_LINKS.map(link => (
               <button key={link.id} onClick={() => navigateTo(link.id)} className="text-5xl font-black uppercase tracking-tighter active:text-indigo-600">
                 {link.name}
               </button>
             ))}
          </motion.div>
        )}
      </AnimatePresence>

      <footer className={`py-20 border-t ${isDarkMode ? 'border-white/5 bg-slate-950' : 'border-slate-200 bg-slate-50'}`}>
        <div className="max-w-7xl mx-auto px-6 grid md:grid-cols-4 gap-12">
          <div className="col-span-2 space-y-6">
            <div className="flex items-center gap-2 font-black text-3xl tracking-tighter">
              <div className="h-10 w-10 bg-indigo-600 rounded-xl flex items-center justify-center text-white italic">T</div>
              <span>Tution<span className="text-indigo-600">Pro</span></span>
            </div>
            <p className="max-w-xs opacity-50 text-lg">Empowering the next generation of engineers with expert guidance.</p>
          </div>
          <div className="space-y-4">
            <h4 className="font-bold uppercase tracking-widest text-sm text-indigo-600">Quick Links</h4>
            {NAV_LINKS.map(l => <button key={l.id} onClick={() => navigateTo(l.id)} className="block opacity-60 hover:opacity-100 transition-opacity text-left">{l.name}</button>)}
          </div>
          <div className="space-y-6">
            <h4 className="font-bold uppercase tracking-widest text-sm text-indigo-600">Connect</h4>
            <div className="flex gap-4">
              {[Facebook, Twitter, Instagram, Linkedin].map((Icon, i) => (
                <button key={i} className="p-3 rounded-xl bg-indigo-600/10 text-indigo-600 hover:bg-indigo-600 hover:text-white transition-all"><Icon size={20}/></button>
              ))}
            </div>
          </div>
        </div>
        <div className="max-w-7xl mx-auto px-6 mt-20 pt-10 border-t border-white/5 text-center opacity-30 text-sm font-medium">
          © 2026 TutionPro Education Group.
        </div>
      </footer>
    </div>
  );
}