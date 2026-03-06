"use client";

import { useState, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { 
  Home, Info, Briefcase, CreditCard, BookOpen, Star, Mail, 
  ChevronRight, ArrowRight, ArrowLeft, Play, Zap, Shield, Users,
  Check, Sun, Moon, Menu, X, Target, Facebook, Twitter, Instagram, Linkedin
} from "lucide-react";

// --- Configuration & Data ---
const NAV_LINKS = [
  { id: "home", name: "Home", icon: Home },
  { id: "about", name: "About Us", icon: Info },
  { id: "services", name: "Services", icon: Briefcase },
  { id: "plans", name: "Plans", icon: CreditCard },
  { id: "blogs", name: "Blogs", icon: BookOpen },
  { id: "contact", name: "Contact", icon: Mail },
];

const SLIDE_IMAGES = [
  "https://images.unsplash.com/photo-1522202176988-66273c2fd55f?w=800&q=80",
  "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=800&q=80",
  "https://images.unsplash.com/photo-1524178232363-1fb2b075b655?w=800&q=80"
];

// --- Sub-Components: Pages ---

const HomePage = ({ setActivePage, isDarkMode }) => {
  const [current, setCurrent] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrent((prev) => (prev === SLIDE_IMAGES.length - 1 ? 0 : prev + 1));
    }, 3000);
    return () => clearInterval(timer);
  }, []);

  return (
    <div className="space-y-32 pb-24">
      {/* Hero Section */}
      <section className="grid lg:grid-cols-2 gap-12 items-center min-h-[60vh]">
        <div className="space-y-8 order-2 lg:order-1">
          <motion.div 
            initial={{ opacity: 0, x: -20 }} 
            animate={{ opacity: 1, x: 0 }} 
            className={`inline-flex items-center gap-2 px-3 py-1 rounded-full border text-sm font-semibold transition-colors duration-300
              ${isDarkMode ? 'bg-indigo-500/10 border-indigo-500/20 text-indigo-400' : 'bg-indigo-50 border-indigo-200 text-indigo-600'}`}
          >
            <Zap size={14} /> New Courses Available for 2026
          </motion.div>
          <motion.h1 
            initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} 
            className={`text-5xl md:text-7xl font-black leading-tight tracking-tighter transition-colors duration-300
              ${isDarkMode ? 'text-white' : 'text-slate-900'}`}
          >
            Learn from the <br/> <span className="text-indigo-500">Best Mentors.</span>
          </motion.h1>
          <p className={`text-xl leading-relaxed transition-colors duration-300 ${isDarkMode ? 'text-gray-400' : 'text-slate-600'}`}>
            Join TutionPro and get access to high-quality interactive lessons designed to help you master professional skills in record time.
          </p>
          <div className="flex flex-wrap gap-4">
            <button onClick={() => setActivePage("plans")} className="px-8 py-4 bg-indigo-600 hover:bg-indigo-700 text-white rounded-2xl font-bold shadow-lg shadow-indigo-600/20 transition-all flex items-center gap-2">Join Now <ArrowRight size={20} /></button>
            <button className={`px-8 py-4 border rounded-2xl font-bold transition-all flex items-center gap-2
              ${isDarkMode ? 'bg-white/5 border-white/10 text-gray-400 hover:text-white' : 'bg-white border-slate-200 text-slate-600 hover:border-indigo-500 hover:text-indigo-600 shadow-sm'}`}>
              Watch Video
            </button>
          </div>
        </div>
        <div className="relative order-1 lg:order-2 flex justify-center">
          <div className="relative w-full max-w-[450px] aspect-square">
            <div className={`absolute inset-0 blur-[80px] rounded-full transition-colors duration-500 ${isDarkMode ? 'bg-indigo-500/20' : 'bg-indigo-500/10'}`} />
            <div className={`relative z-10 w-full h-full rounded-[40px] overflow-hidden border-8 shadow-2xl transition-colors duration-500
              ${isDarkMode ? 'border-slate-900 shadow-black/50' : 'border-white shadow-indigo-500/10'}`}>
              <AnimatePresence mode="wait">
                <motion.img key={current} src={SLIDE_IMAGES[current]} initial={{ opacity: 0, scale: 1.1 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 0.9 }} transition={{ duration: 0.6 }} className="w-full h-full object-cover" />
              </AnimatePresence>
            </div>
            <motion.div animate={{ y: [0, -10, 0] }} transition={{ repeat: Infinity, duration: 4 }} 
              className={`absolute -top-6 -right-6 z-20 border p-4 rounded-2xl shadow-xl hidden md:block transition-colors duration-500
              ${isDarkMode ? 'bg-slate-800 border-white/10 text-white' : 'bg-white border-slate-100 text-slate-900'}`}>
              <div className="flex items-center gap-3">
                <div className="p-2 bg-green-500/20 rounded-lg text-green-500"><Users size={20} /></div>
                <div><div className="text-sm font-bold">15k+ Students</div><div className={isDarkMode ? 'text-gray-500 text-[10px]' : 'text-slate-500 text-[10px]'}>Joined this month</div></div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Feature Grid */}
      <section className="grid md:grid-cols-3 gap-8">
        {[
          { t: "Live Mentorship", d: "Real-time sessions with experts from top companies.", i: Users },
          { t: "Flexible Learning", d: "Study at your own pace with lifetime access.", i: Zap },
          { t: "Global Certification", d: "Earn certificates recognized by top tech firms.", i: Check }
        ].map((feat, i) => (
          <div key={i} className={`p-10 rounded-3xl border transition-all duration-300
            ${isDarkMode ? 'bg-white/5 border-white/10 hover:border-indigo-500/50' : 'bg-white border-slate-200 hover:border-indigo-500 shadow-sm hover:shadow-md'}`}>
            <feat.i className="text-indigo-500 mb-6" size={32} />
            <h3 className={`text-2xl font-bold mb-3 ${isDarkMode ? 'text-white' : 'text-slate-900'}`}>{feat.t}</h3>
            <p className={isDarkMode ? 'text-gray-400 leading-relaxed' : 'text-slate-600 leading-relaxed'}>{feat.d}</p>
          </div>
        ))}
      </section>
    </div>
  );
};

// --- Main App Component ---

export default function App() {
  const [activePage, setActivePage] = useState("home");
  const [isDarkMode, setIsDarkMode] = useState(true);
  const [isMobileMenu, setIsMobileMenu] = useState(false);

  // Common dynamic background & border classes
  const cardClass = isDarkMode ? "bg-white/5 border-white/10" : "bg-white border-slate-200 shadow-sm";
  const textClass = isDarkMode ? "text-gray-400" : "text-slate-600";
  const headingClass = isDarkMode ? "text-white" : "text-slate-900";

  return (
    <div className={`min-h-screen transition-colors duration-500 ${isDarkMode ? "bg-slate-950 text-white" : "bg-white text-slate-900"}`}>
      
      {/* Navbar */}
      <nav className={`fixed top-0 z-50 w-full border-b backdrop-blur-md transition-all duration-500 ${isDarkMode ? "border-white/5 bg-slate-950/80" : "border-slate-200 bg-white/80"}`}>
        <div className="mx-auto max-w-7xl px-4 flex h-20 items-center justify-between">
          <div className="flex items-center gap-2 cursor-pointer font-black text-2xl tracking-tighter" onClick={() => setActivePage("home")}>
            <div className="h-9 w-9 bg-indigo-600 rounded-lg flex items-center justify-center text-white italic">T</div>
            <span className={headingClass}>Tution<span className="text-indigo-500">Pro</span></span>
          </div>

          <div className="hidden md:flex gap-1">
            {NAV_LINKS.map(link => (
              <button key={link.id} onClick={() => setActivePage(link.id)} 
                className={`px-4 py-2 font-bold text-sm rounded-lg transition-all 
                ${activePage === link.id ? "text-indigo-600 bg-indigo-500/10" : isDarkMode ? "text-gray-400 hover:text-white" : "text-slate-500 hover:text-indigo-600"}`}>
                {link.name}
              </button>
            ))}
          </div>

          <div className="flex items-center gap-2">
            <button onClick={() => setIsDarkMode(!isDarkMode)} 
              className={`p-2.5 rounded-xl transition-all duration-300 ${isDarkMode ? "bg-white/5 text-yellow-400 hover:bg-white/10" : "bg-slate-100 text-indigo-600 hover:bg-indigo-50"}`}>
              {isDarkMode ? <Sun size={20}/> : <Moon size={20}/>}
            </button>
            <button onClick={() => setIsMobileMenu(!isMobileMenu)} className="md:hidden p-2 text-indigo-500"><Menu size={28}/></button>
          </div>
        </div>
      </nav>

      {/* Main Content (Wrapped for proper light mode styling) */}
      <main className="pt-32 px-4 max-w-7xl mx-auto">
        <AnimatePresence mode="wait">
          <motion.div key={activePage} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }} transition={{ duration: 0.3 }}>
            {activePage === "home" && <HomePage setActivePage={setActivePage} isDarkMode={isDarkMode} />}
            
            {activePage === "about" && (
              <div className="space-y-20 pb-20">
                <div className="grid lg:grid-cols-2 gap-16 items-center">
                  <div className="space-y-6">
                    <h1 className={`text-6xl font-black tracking-tighter ${headingClass}`}>Our <span className="text-indigo-500">Story.</span></h1>
                    <p className={`text-xl leading-relaxed ${textClass}`}>We started TutionPro with a single mission: to democratize high-level technical education.</p>
                  </div>
                  <img src="https://images.unsplash.com/photo-1522202176988-66273c2fd55f?w=800" className={`rounded-[40px] border shadow-xl ${isDarkMode ? 'border-white/10' : 'border-slate-200'}`} alt="Team" />
                </div>
              </div>
            )}

            {activePage === "plans" && (
              <div className="space-y-16 pb-20">
                <h1 className={`text-6xl font-black tracking-tighter text-center ${headingClass}`}>Transparent <span className="text-indigo-500">Pricing.</span></h1>
                <div className="grid lg:grid-cols-3 gap-8">
                  {[
                    { n: "Starter", p: "$29", f: ["5 Courses", "Community Access"] },
                    { n: "Pro", p: "$79", f: ["Unlimited Courses", "Mentorship"], h: true },
                    { n: "Enterprise", p: "$199", f: ["Team License", "Custom Projects"] }
                  ].map((plan, i) => (
                    <div key={i} className={`p-10 rounded-[40px] border transition-all duration-300 ${plan.h ? 'border-indigo-500 bg-indigo-500/5 ring-1 ring-indigo-500' : isDarkMode ? 'border-white/10 bg-white/5' : 'border-slate-200 bg-white shadow-sm'}`}>
                      <h3 className={`text-2xl font-bold mb-4 ${headingClass}`}>{plan.n}</h3>
                      <div className={`text-5xl font-black mb-6 ${headingClass}`}>{plan.p}<span className="text-lg text-gray-500 font-normal">/mo</span></div>
                      <ul className="space-y-4 mb-8">
                        {plan.f.map(f => <li key={f} className={`flex gap-2 font-medium ${textClass}`}><Check size={18} className="text-indigo-500"/> {f}</li>)}
                      </ul>
                      <button className={`w-full py-4 rounded-xl font-bold transition-all ${plan.h ? 'bg-indigo-600 text-white shadow-indigo-500/20 shadow-lg' : isDarkMode ? 'bg-white/10 text-white hover:bg-white/20' : 'bg-slate-100 text-slate-900 hover:bg-slate-200'}`}>Get Started</button>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Contact Page Fix */}
            {activePage === "contact" && (
              <div className="grid lg:grid-cols-2 gap-16 pb-20 items-center">
                <div className="space-y-6"><h1 className={`text-6xl font-black ${headingClass}`}>Let's <span className="text-indigo-500">Talk.</span></h1><p className={`text-xl ${textClass}`}>Reach out to our support team for any queries.</p></div>
                <div className={`p-10 rounded-[40px] border space-y-4 shadow-xl ${cardClass}`}>
                  <input type="text" placeholder="Full Name" className={`w-full border p-4 rounded-xl outline-none focus:border-indigo-500 transition-all ${isDarkMode ? 'bg-white/5 border-white/10 text-white' : 'bg-slate-50 border-slate-200 text-slate-900'}`} />
                  <input type="email" placeholder="Email Address" className={`w-full border p-4 rounded-xl outline-none focus:border-indigo-500 transition-all ${isDarkMode ? 'bg-white/5 border-white/10 text-white' : 'bg-slate-50 border-slate-200 text-slate-900'}`} />
                  <textarea placeholder="Message" className={`w-full border p-4 rounded-xl outline-none focus:border-indigo-500 transition-all ${isDarkMode ? 'bg-white/5 border-white/10 text-white' : 'bg-slate-50 border-slate-200 text-slate-900'}`} rows={4} />
                  <button className="w-full py-4 bg-indigo-600 hover:bg-indigo-700 text-white rounded-xl font-bold shadow-lg shadow-indigo-600/20">Send Message</button>
                </div>
              </div>
            )}
          </motion.div>
        </AnimatePresence>
      </main>

      {/* Footer Fix */}
      {/* Fixed Professional Footer */}
<footer className={`fixed bottom-0 z-50 w-full border-t backdrop-blur-md transition-all duration-500 h-14 flex items-center
  ${isDarkMode ? "border-white/5 bg-slate-950/80 shadow-[0_-10px_30px_rgba(0,0,0,0.5)]" : "border-slate-200 bg-white/80 shadow-[0_-10px_30px_rgba(0,0,0,0.03)]"}`}>
  
  <div className="max-w-7xl mx-auto px-6 w-full flex flex-row justify-between items-center">
    
    {/* Identity Section */}
    <div className="flex items-center gap-3 shrink-0">
      <div className="h-7 w-7 bg-indigo-600 rounded-lg flex items-center justify-center text-white italic font-black text-sm shadow-lg shadow-indigo-500/20">
        T
      </div>
      <span className={`font-bold text-xs uppercase tracking-widest hidden sm:block ${isDarkMode ? 'text-white' : 'text-slate-900'}`}>
        Tution<span className="text-indigo-500">Pro</span> <span className="mx-2 opacity-20">|</span> © 2026
      </span>
    </div>
    
    {/* Navigation Section (Hidden on Mobile) */}
    <div className="hidden lg:flex items-center gap-8 text-[10px] font-bold uppercase tracking-[0.2em]">
      {NAV_LINKS.slice(0, 5).map(l => (
        <button 
          key={l.id} 
          onClick={() => setActivePage(l.id)} 
          className={`transition-colors ${isDarkMode ? 'text-gray-500 hover:text-white' : 'text-slate-400 hover:text-indigo-600'}`}
        >
          {l.name}
        </button>
      ))}
    </div>

    {/* Social & Utility Section */}
    <div className="flex items-center gap-6">
      <div className={`flex items-center gap-4 pr-6 border-r ${isDarkMode ? 'border-white/10' : 'border-slate-200'}`}>
        {[Facebook, Twitter, Instagram, Linkedin].map((Icon, idx) => (
          <motion.a 
            key={idx}
            whileHover={{ y: -3 }}
            href="#" 
            className={`transition-colors ${isDarkMode ? 'text-gray-500 hover:text-indigo-400' : 'text-slate-400 hover:text-indigo-600'}`}
          >
            <Icon size={16} />
          </motion.a>
        ))}
      </div>
      
      <button className={`text-[10px] font-black uppercase tracking-widest transition-colors ${isDarkMode ? 'text-gray-500 hover:text-white' : 'text-slate-400 hover:text-slate-900'}`}>
        Privacy
      </button>
    </div>

  </div>
</footer>
    </div>
  );
}

// Fixed SVG Helpers
const Code = (p) => <svg {...p} fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><polyline points="16 18 22 12 16 6"/><polyline points="8 6 2 12 8 18"/></svg>;
const Palette = (p) => <svg {...p} fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path d="M12 2C6.5 2 2 6.5 2 12s4.5 10 10 10c.92 0 1.7-.72 1.7-1.7 0-.44-.19-.84-.49-1.12-.3-.28-.5-.68-.5-1.12 0-.93.77-1.7 1.7-1.7h3.09c3.04 0 5.5-2.46 5.5-5.5C23 5.37 18.07 2 12 2z"/></svg>;
const Megaphone = (p) => <svg {...p} fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path d="m3 11 18-5v12L3 14v-3z"/><path d="M11.6 16.8a3 3 0 1 1-5.8-1.6"/></svg>;