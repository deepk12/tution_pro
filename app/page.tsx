"use client";

import { useState, useEffect, useCallback } from "react";
import { motion, AnimatePresence, useScroll, useSpring } from "framer-motion";
import { 
  Home, Info, Briefcase, CreditCard, Mail, ArrowRight, Zap, Users, 
  Check, Sun, Moon, Menu, X, Facebook, Twitter, Instagram, Linkedin,
  Globe, Shield, Cpu, GraduationCap, Award, MessageSquare, Phone, MessageCircle, Clock
} from "lucide-react";

// --- Configuration & Data ---
const NAV_LINKS = [
  { id: "home", name: "Home", icon: Home },
  { id: "about", name: "About Us", icon: Info },
  { id: "services", name: "Services", icon: Briefcase },
  { id: "plans", name: "Plans", icon: CreditCard },
  { id: "contact", name: "Contact", icon: Mail },
];

const SLIDE_IMAGES = [
  "https://images.unsplash.com/photo-1522202176988-66273c2fd55f?w=800&q=80",
  "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=800&q=80",
  "https://images.unsplash.com/photo-1524178232363-1fb2b075b655?w=800&q=80"
];

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
        <div className="space-y-8">
          <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} className={`inline-flex items-center gap-2 px-4 py-1.5 rounded-full border text-sm font-bold ${isDarkMode ? 'bg-indigo-500/10 border-indigo-500/20 text-indigo-400' : 'bg-indigo-50 border-indigo-200 text-indigo-600'}`}>
            <Zap size={16} className="fill-current" /> Leading Tech Education 2026
          </motion.div>
          <h1 className={`text-6xl md:text-8xl font-black leading-[0.9] tracking-tighter ${isDarkMode ? 'text-white' : 'text-slate-900'}`}>
            Master the <br/> <span className="text-indigo-600">Future.</span>
          </h1>
          <p className={`text-xl max-w-lg leading-relaxed ${isDarkMode ? 'text-gray-400' : 'text-slate-600'}`}>
            TutionPro provides industry-vetted curriculums and 1-on-1 mentorship to help you break into top-tier tech roles.
          </p>
          <div className="flex flex-wrap gap-4">
            <button onClick={() => navigateTo("plans")} className="px-10 py-5 bg-indigo-600 hover:bg-indigo-700 text-white rounded-2xl font-bold shadow-2xl shadow-indigo-600/40 transition-all flex items-center gap-3">Start Learning <ArrowRight size={20} /></button>
            <button onClick={() => navigateTo("about")} className={`px-10 py-5 rounded-2xl font-bold border transition-all ${isDarkMode ? 'border-white/10 hover:bg-white/5' : 'border-slate-200 hover:bg-slate-50'}`}>Explore More</button>
          </div>
        </div>

        <div className="relative flex justify-center">
          <div className="relative w-full max-w-[450px] aspect-[4/5]">
            <div className={`absolute -inset-4 blur-[100px] rounded-full opacity-30 ${isDarkMode ? 'bg-indigo-500' : 'bg-indigo-300'}`} />
            <div className={`relative z-10 w-full h-full rounded-[50px] overflow-hidden border-8 transition-colors duration-500 ${isDarkMode ? 'border-slate-900 shadow-black/50' : 'border-white shadow-indigo-500/10'}`}>
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
            <div className="absolute bottom-6 left-1/2 -translate-x-1/2 z-20 flex gap-2">
              {SLIDE_IMAGES.map((_, i) => (
                <div key={i} className={`h-2 rounded-full transition-all duration-300 ${current === i ? "w-8 bg-indigo-600" : "w-2 bg-white/50"}`} />
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

const About = ({ isDarkMode }) => (
  <section id="about" className="py-32 border-t border-white/5">
    <div className="grid lg:grid-cols-2 gap-20 items-center">
      <FadeInWhenVisible>
        <div className="space-y-8">
          <h2 className={`text-5xl font-black tracking-tighter ${isDarkMode ? 'text-white' : 'text-slate-900'}`}>Built by <span className="text-indigo-600">Engineers.</span></h2>
          <p className="text-xl opacity-70 leading-relaxed">We founded TutionPro after realizing university degrees weren't keeping up with the speed of AI development.</p>
          <div className="grid grid-cols-2 gap-6">
            {[ { l: "15k+", s: "Active Students" }, { l: "98%", s: "Job Success" } ].map((stat, i) => (
              <div key={i} className={`p-6 rounded-3xl border ${isDarkMode ? 'bg-white/5 border-white/10' : 'bg-slate-50 border-slate-200'}`}>
                <div className="text-3xl font-black text-indigo-600">{stat.l}</div>
                <div className="text-sm font-bold opacity-60 uppercase tracking-widest">{stat.s}</div>
              </div>
            ))}
          </div>
        </div>
      </FadeInWhenVisible>
      <img src={SLIDE_IMAGES[0]} className="rounded-[40px] shadow-2xl" alt="Office" />
    </div>
  </section>
);

const Services = ({ isDarkMode }) => (
  <section id="services" className="py-32">
    <FadeInWhenVisible>
      <div className="text-center max-w-2xl mx-auto mb-20 space-y-4">
        <h2 className="text-5xl font-black tracking-tighter">Everything you need to <span className="text-indigo-600">Scale.</span></h2>
      </div>
      <div className="grid md:grid-cols-3 gap-8">
        {[
          { i: Globe, t: "Global Network", d: "Connect with developers across 40+ countries." },
          { i: Shield, t: "Certified Skills", d: "Get ISO-verified certificates." },
          { i: MessageSquare, t: "1:1 Coaching", d: "Weekly calls with senior engineers." }
        ].map((item, idx) => (
          <div key={idx} className={`p-10 rounded-[40px] border ${isDarkMode ? 'bg-white/5 border-white/10' : 'bg-white border-slate-200 shadow-xl'}`}>
            <item.i className="text-indigo-600 mb-6" size={40} />
            <h3 className="text-2xl font-bold mb-4">{item.t}</h3>
            <p className="opacity-60 leading-relaxed">{item.d}</p>
          </div>
        ))}
      </div>
    </FadeInWhenVisible>
  </section>
);

const Plans = ({ isDarkMode }) => (
  <section id="plans" className="py-32">
    <FadeInWhenVisible>
      <div className="text-center mb-16">
        <h2 className="text-5xl font-black tracking-tighter mb-4">Invest in <span className="text-indigo-600">Yourself.</span></h2>
      </div>
      <div className="grid lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
        {[
          { n: "Starter", p: "$29", f: ["Fundamental Tracks", "Community Access"] },
          { n: "Pro", p: "$79", f: ["Unlimited Access", "Priority Mentorship"], h: true },
          { n: "Enterprise", p: "$199", f: ["Custom Roadmap", "Team Analytics"] }
        ].map((plan, i) => (
          <div key={i} className={`p-10 rounded-[40px] border relative ${plan.h ? 'border-indigo-600 bg-indigo-600/5 ring-2 ring-indigo-600' : isDarkMode ? 'border-white/10 bg-white/5' : 'border-slate-200 bg-white shadow-lg'}`}>
            <h3 className="text-2xl font-bold mb-4">{plan.n}</h3>
            <div className="text-6xl font-black mb-8">{plan.p}<span className="text-lg font-normal opacity-40">/mo</span></div>
            <ul className="space-y-4 mb-12">
              {plan.f.map(f => <li key={f} className="flex gap-3 items-center font-medium"><Check size={20} className="text-indigo-600 shrink-0"/> {f}</li>)}
            </ul>
            <button className={`w-full py-5 rounded-2xl font-bold ${plan.h ? 'bg-indigo-600 text-white' : 'bg-indigo-600/10 text-indigo-600'}`}>Get Started</button>
          </div>
        ))}
      </div>
    </FadeInWhenVisible>
  </section>
);

const Contact = ({ isDarkMode }) => {
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [showConfetti, setShowConfetti] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    setShowConfetti(true);
    // Let confetti run for a moment before switching view
    setTimeout(() => {
      setIsSubmitted(true);
      setShowConfetti(false);
    }, 1500);
  };

  return (
    <section id="contact" className="py-32 mb-20">
      <FadeInWhenVisible>
        <div className={`p-16 rounded-[60px] border grid lg:grid-cols-2 gap-16 items-center overflow-hidden relative ${isDarkMode ? 'bg-indigo-600/10 border-indigo-600/20' : 'bg-slate-900 text-white border-transparent'}`}>
          
          {/* Confetti Particles Effect */}
          {showConfetti && (
            <div className="absolute inset-0 pointer-events-none z-50">
              {[...Array(40)].map((_, i) => (
                <motion.div
                  key={i}
                  initial={{ 
                    top: "60%", 
                    left: "75%", 
                    scale: 0,
                    rotate: 0 
                  }}
                  animate={{ 
                    top: [`${Math.random() * 100}%`], 
                    left: [`${Math.random() * 100}%`], 
                    scale: [0, 1, 0],
                    rotate: 360 
                  }}
                  transition={{ duration: 1.5, ease: "easeOut" }}
                  className="absolute w-2 h-2 rounded-sm"
                  style={{ backgroundColor: ["#4F46E5", "#FACC15", "#10B981", "#EC4899"][i % 4] }}
                />
              ))}
            </div>
          )}

          <div className="space-y-8">
            <h2 className="text-6xl font-black tracking-tighter">Ready to <br/> <span className="text-indigo-500">Transform?</span></h2>
            <div className="space-y-4">
               <div className="flex items-center gap-4 text-lg font-medium"><Mail className="text-indigo-500"/> hello@tutionpro.com</div>
            </div>
          </div>

          <div className="relative min-h-[350px] flex flex-col justify-center">
            <AnimatePresence mode="wait">
              {!isSubmitted ? (
                <motion.form 
                  key="form"
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  onSubmit={handleSubmit}
                  className="space-y-4"
                >
                  <input required placeholder="Full Name" className="w-full p-5 rounded-2xl bg-black/20 border border-white/10 outline-none focus:border-indigo-500 transition-colors" />
                  <input required type="email" placeholder="Email" className="w-full p-5 rounded-2xl bg-black/20 border border-white/10 outline-none focus:border-indigo-500 transition-colors" />
                  <textarea required placeholder="Message" rows={4} className="w-full p-5 rounded-2xl bg-black/20 border border-white/10 outline-none focus:border-indigo-500 transition-colors" />
                  <button type="submit" className="w-full py-5 bg-indigo-600 text-white rounded-2xl font-black text-lg hover:bg-indigo-700 active:scale-[0.98] transition-all relative overflow-hidden">
                    Send Application
                  </button>
                </motion.form>
              ) : (
                <motion.div 
                  key="success"
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="text-center space-y-6"
                >
                  <div className="w-24 h-24 bg-green-500 rounded-full flex items-center justify-center mx-auto shadow-2xl shadow-green-500/40">
                    <Check size={48} className="text-white" strokeWidth={4} />
                  </div>
                  <div className="space-y-2">
                    <h3 className="text-3xl font-black">Application Sent!</h3>
                    <p className="opacity-70 text-lg">Check your email for the next steps. <br/> Welcome to the future.</p>
                  </div>
                  <button onClick={() => setIsSubmitted(false)} className="text-indigo-400 font-bold hover:underline">
                    Send another message
                  </button>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>
      </FadeInWhenVisible>
    </section>
  );
};

// --- Main App ---

export default function App() {
  const [activePage, setActivePage] = useState("home");
  const [isDarkMode, setIsDarkMode] = useState(true);
  const [isMobileMenu, setIsMobileMenu] = useState(false);

  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, { stiffness: 100, damping: 30 });

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
    const handlePopState = () => {
      const hash = window.location.hash.replace("#", "") || "home";
      navigateTo(hash);
    };
    window.addEventListener("popstate", handlePopState);
    return () => window.removeEventListener("popstate", handlePopState);
  }, []);

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
      
      {/* 1. TOP ADVERTISEMENT BANNER WITH CLAIM BUTTON */}
      <div className="fixed top-0 left-0 w-full z-[120] bg-indigo-600 text-white py-2 border-b border-indigo-400/30 overflow-hidden shadow-xl">
        <div className="max-w-7xl mx-auto px-6 flex justify-between items-center relative h-10">
          <motion.div 
            animate={{ x: ["0%", "-50%"] }} 
            transition={{ repeat: Infinity, duration: 30, ease: "linear" }}
            className="whitespace-nowrap flex gap-10 items-center text-[10px] md:text-xs font-black uppercase tracking-[0.1em]"
          >
            {[1, 2].map((i) => (
              <div key={i} className="flex gap-10 items-center">
                <span>🔥 NAT Admission is LOCKED at ₹0! 🔥</span>
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
              <button key={link.id} onClick={() => navigateTo(link.id)} 
                className={`px-5 py-2 font-bold text-sm rounded-xl transition-all 
                ${activePage === link.id ? "text-white bg-indigo-600 shadow-md" : "opacity-50 hover:opacity-100"}`}>
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

      {/* Floating Buttons */}
      <div className="fixed bottom-6 right-6 z-[120] flex flex-col gap-4">
        <motion.a whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }} href="https://wa.me/911234567890" target="_blank" className="w-16 h-16 bg-green-500 text-white rounded-full flex items-center justify-center shadow-2xl"><MessageCircle size={32} fill="currentColor" /></motion.a>
        <motion.a whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }} href="tel:+911234567890" className="w-16 h-16 bg-indigo-600 text-white rounded-full flex items-center justify-center shadow-2xl"><Phone size={28} fill="currentColor" /></motion.a>
      </div>

      <main className="max-w-7xl mx-auto px-6">
        <Hero navigateTo={navigateTo} isDarkMode={isDarkMode} />
        <About isDarkMode={isDarkMode} />
        <Services isDarkMode={isDarkMode} />
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

      {/* Footer */}
      <footer className={`py-20 border-t ${isDarkMode ? 'border-white/5 bg-slate-950' : 'border-slate-200 bg-slate-50'}`}>
        <div className="max-w-7xl mx-auto px-6 grid md:grid-cols-4 gap-12">
          <div className="col-span-2 space-y-6">
            <div className="flex items-center gap-2 font-black text-3xl tracking-tighter">
              <div className="h-10 w-10 bg-indigo-600 rounded-xl flex items-center justify-center text-white italic">T</div>
              <span>Tution<span className="text-indigo-600">Pro</span></span>
            </div>
            <p className="max-w-xs opacity-50 text-lg">Empowering the next generation of engineers with real-world skills and expert guidance.</p>
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
          © 2026 TutionPro Education Group. NAT 0 RS Admission Campaign Active.
        </div>
      </footer>
    </div>
  );
}