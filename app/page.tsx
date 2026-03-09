"use client";

import { useState, useEffect, useCallback } from "react";
import { motion, AnimatePresence, useScroll, useSpring } from "framer-motion";
import { 
  Home, Info, Briefcase, CreditCard, Mail, ArrowRight, Zap, Users, 
  Check, Sun, Moon, Menu, X, Facebook, Twitter, Instagram, Linkedin,
  Globe, Shield, Cpu, GraduationCap, Award, MessageSquare
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

// --- Animation Helper Component ---
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

const Hero = ({ navigateTo, isDarkMode }) => (
  <section id="home" className="min-h-screen flex flex-col justify-center pt-20">
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
      <motion.div initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} className="relative">
        <div className={`absolute -inset-4 blur-[100px] rounded-full opacity-30 ${isDarkMode ? 'bg-indigo-500' : 'bg-indigo-300'}`} />
        <img src={SLIDE_IMAGES[1]} className="relative z-10 rounded-[50px] shadow-2xl border-4 border-white/5 object-cover aspect-[4/5] w-full max-w-md mx-auto" alt="Student" />
      </motion.div>
    </div>
  </section>
);

const About = ({ isDarkMode }) => (
  <section id="about" className="py-32 border-t border-white/5">
    <div className="grid lg:grid-cols-2 gap-20 items-center">
      <FadeInWhenVisible>
        <div className="space-y-8">
          <h2 className={`text-5xl font-black tracking-tighter ${isDarkMode ? 'text-white' : 'text-slate-900'}`}>Built by <span className="text-indigo-600">Engineers.</span></h2>
          <p className="text-xl opacity-70 leading-relaxed">We founded TutionPro after realizing that university degrees weren't keeping up with the speed of AI and Modern Web development.</p>
          <div className="grid grid-cols-2 gap-6">
            {[ { l: "15k+", s: "Active Students" }, { l: "98%", s: "Job Success" }, { l: "200+", s: "Expert Mentors" }, { l: "50+", s: "Partner Firms" } ].map((stat, i) => (
              <div key={i} className={`p-6 rounded-3xl border ${isDarkMode ? 'bg-white/5 border-white/10' : 'bg-slate-50 border-slate-200'}`}>
                <div className="text-3xl font-black text-indigo-600">{stat.l}</div>
                <div className="text-sm font-bold opacity-60 uppercase tracking-widest">{stat.s}</div>
              </div>
            ))}
          </div>
        </div>
      </FadeInWhenVisible>
      <div className="relative group">
         <img src={SLIDE_IMAGES[0]} className="rounded-[40px] grayscale group-hover:grayscale-0 transition-all duration-700 shadow-2xl" alt="Office" />
      </div>
    </div>
  </section>
);

const Services = ({ isDarkMode }) => (
  <section id="services" className="py-32">
    <FadeInWhenVisible>
      <div className="text-center max-w-2xl mx-auto mb-20 space-y-4">
        <h2 className="text-5xl font-black tracking-tighter">Everything you need to <span className="text-indigo-600">Scale.</span></h2>
        <p className="opacity-60 text-lg">Our platform isn't just a video player. It's an entire ecosystem built for high-performance learning.</p>
      </div>
      <div className="grid md:grid-cols-3 gap-8">
        {[
          { i: Globe, t: "Global Network", d: "Connect with developers across 40+ countries and expand your reach." },
          { i: Shield, t: "Certified Skills", d: "Get ISO-verified certificates that recruiters actually trust." },
          { i: Cpu, t: "AI Tutoring", d: "24/7 AI-powered code reviews and conceptual debugging." },
          { i: MessageSquare, t: "1:1 Coaching", d: "Weekly calls with senior engineers to unblock your progress." },
          { i: GraduationCap, t: "Curated Paths", d: "Hand-picked learning tracks from Junior to Senior Architect." },
          { i: Award, t: "Placement Hub", d: "Exclusive access to our private job board with 500+ tech partners." }
        ].map((item, idx) => (
          <div key={idx} className={`p-10 rounded-[40px] border transition-all hover:-translate-y-2 ${isDarkMode ? 'bg-white/5 border-white/10 hover:bg-white/10' : 'bg-white border-slate-200 hover:shadow-2xl'}`}>
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
        <p className="opacity-60">No hidden fees. Cancel anytime. 14-day money-back guarantee.</p>
      </div>
      <div className="grid lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
        {[
          { n: "Starter", p: "$29", f: ["Fundamental Tracks", "Community Access", "Standard Support"] },
          { n: "Pro", p: "$79", f: ["Unlimited Access", "AI Code Review", "Priority Mentorship", "Career Coaching"], h: true },
          { n: "Enterprise", p: "$199", f: ["Custom Roadmap", "White-glove Support", "Team Analytics", "Talent Placement"] }
        ].map((plan, i) => (
          <div key={i} className={`p-10 rounded-[40px] border relative flex flex-col ${plan.h ? 'border-indigo-600 bg-indigo-600/5 ring-2 ring-indigo-600' : isDarkMode ? 'border-white/10 bg-white/5' : 'border-slate-200 bg-white shadow-lg'}`}>
            {plan.h && <span className="absolute -top-4 left-1/2 -translate-x-1/2 bg-indigo-600 text-white px-4 py-1 rounded-full text-xs font-bold uppercase tracking-widest">Most Popular</span>}
            <h3 className="text-2xl font-bold mb-4">{plan.n}</h3>
            <div className="text-6xl font-black mb-8">{plan.p}<span className="text-lg font-normal opacity-40">/mo</span></div>
            <ul className="space-y-4 mb-12 flex-grow">
              {plan.f.map(f => <li key={f} className="flex gap-3 items-center font-medium"><Check size={20} className="text-indigo-600 shrink-0"/> {f}</li>)}
            </ul>
            <button className={`w-full py-5 rounded-2xl font-bold transition-all ${plan.h ? 'bg-indigo-600 text-white shadow-xl shadow-indigo-600/30 hover:scale-[1.02]' : 'bg-indigo-600/10 text-indigo-600 hover:bg-indigo-600/20'}`}>Get Started Now</button>
          </div>
        ))}
      </div>
    </FadeInWhenVisible>
  </section>
);

const Contact = ({ isDarkMode }) => (
  <section id="contact" className="py-32 mb-20">
    <FadeInWhenVisible>
      <div className={`p-16 rounded-[60px] border grid lg:grid-cols-2 gap-16 items-center ${isDarkMode ? 'bg-indigo-600/10 border-indigo-600/20' : 'bg-slate-900 text-white border-transparent'}`}>
        <div className="space-y-8">
          <h2 className="text-6xl font-black tracking-tighter">Ready to <br/> <span className="text-indigo-500">Transform?</span></h2>
          <p className="text-xl opacity-70">Join our next cohort starting April 2026. Spots are limited to ensure quality mentorship.</p>
          <div className="space-y-4">
             <div className="flex items-center gap-4 text-lg font-medium"><Mail className="text-indigo-500"/> hello@tutionpro.com</div>
             <div className="flex items-center gap-4 text-lg font-medium"><Globe className="text-indigo-500"/> 123 Tech Plaza, SF</div>
          </div>
        </div>
        <div className="space-y-4">
          <input placeholder="Full Name" className={`w-full p-5 rounded-2xl outline-none border transition-all focus:ring-2 focus:ring-indigo-600 ${isDarkMode ? 'bg-slate-950 border-white/10' : 'bg-slate-800 border-white/5'}`} />
          <input placeholder="Email Address" className={`w-full p-5 rounded-2xl outline-none border transition-all focus:ring-2 focus:ring-indigo-600 ${isDarkMode ? 'bg-slate-950 border-white/10' : 'bg-slate-800 border-white/5'}`} />
          <textarea placeholder="Your Vision / Question" rows={4} className={`w-full p-5 rounded-2xl outline-none border transition-all focus:ring-2 focus:ring-indigo-600 ${isDarkMode ? 'bg-slate-950 border-white/10' : 'bg-slate-800 border-white/5'}`} />
          <button className="w-full py-5 bg-indigo-600 hover:bg-indigo-700 text-white rounded-2xl font-black text-lg transition-all shadow-xl shadow-indigo-600/20">Send Application</button>
        </div>
      </div>
    </FadeInWhenVisible>
  </section>
);

// --- Main App ---

export default function App() {
  const [activePage, setActivePage] = useState("home");
  const [isDarkMode, setIsDarkMode] = useState(true);
  const [isMobileMenu, setIsMobileMenu] = useState(false);

  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, { stiffness: 100, damping: 30, restDelta: 0.001 });

  const navigateTo = (id) => {
    const el = document.getElementById(id);
    if (el) {
      const offset = 80; 
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
    }, { threshold: 0.3, rootMargin: "-80px 0px 0px 0px" });

    NAV_LINKS.forEach(link => {
      const el = document.getElementById(link.id);
      if (el) observer.observe(el);
    });
    return () => observer.disconnect();
  }, []);

  return (
    <div className={`transition-colors duration-500 selection:bg-indigo-600 selection:text-white ${isDarkMode ? "bg-slate-950 text-white" : "bg-white text-slate-900"}`}>
      
      {/* Scroll Progress Bar */}
      <motion.div className="fixed top-0 left-0 right-0 h-1 bg-indigo-600 z-[100] origin-left" style={{ scaleX }} />

      {/* Navbar */}
      <nav className={`fixed top-0 z-50 w-full border-b backdrop-blur-xl ${isDarkMode ? "border-white/5 bg-slate-950/80" : "border-slate-200 bg-white/80"}`}>
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

      {/* Main Sections */}
      <main className="max-w-7xl mx-auto px-6">
        <Hero navigateTo={navigateTo} isDarkMode={isDarkMode} />
        <About isDarkMode={isDarkMode} />
        <Services isDarkMode={isDarkMode} />
        <Plans isDarkMode={isDarkMode} />
        <Contact isDarkMode={isDarkMode} />
      </main>

      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {isMobileMenu && (
          <motion.div initial={{ opacity: 0, scale: 1.1 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 1.1 }} className={`fixed inset-0 z-[100] p-10 flex flex-col justify-center items-center gap-10 ${isDarkMode ? 'bg-slate-950' : 'bg-white'}`}>
             <button onClick={() => setIsMobileMenu(false)} className="absolute top-10 right-10 p-4 rounded-full bg-indigo-600/10 text-indigo-600"><X size={32}/></button>
             {NAV_LINKS.map(link => (
               <button key={link.id} onClick={() => navigateTo(link.id)} className="text-5xl font-black uppercase tracking-tighter hover:text-indigo-600 transition-colors">
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
            {NAV_LINKS.map(l => <button key={l.id} onClick={() => navigateTo(l.id)} className="block opacity-60 hover:opacity-100 transition-opacity">{l.name}</button>)}
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
          © 2026 TutionPro Education Group. Built with Love & Framer Motion.
        </div>
      </footer>
    </div>
  );
}