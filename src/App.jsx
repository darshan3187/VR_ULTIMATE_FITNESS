import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence, useScroll, useSpring, useInView } from 'framer-motion';
import {
  Dumbbell,
  Trophy,
  Users,
  Calendar,
  MapPin,
  Phone,
  Mail,
  Menu,
  X,
  ArrowRight,
  Star,
  CheckCircle2,
  Instagram,
  Facebook,
  Youtube,
  Zap,
  Target,
  Award,
  TrendingUp,
  Clock,
  ChevronDown
} from 'lucide-react';

// --- BRAND CONSTANTS ---
const BRAND = "#F97316";
const BRAND_RGB = "249,115,22";

// --- ANIMATION VARIANTS ---
const sectionVariants = {
  hidden: { opacity: 0, y: 60 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.7, ease: [0.25, 0.46, 0.45, 0.94] } }
};

const containerVariants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.08, delayChildren: 0.1 } }
};

const itemVariants = {
  hidden: { opacity: 0, y: 30, scale: 0.97 },
  visible: { opacity: 1, y: 0, scale: 1, transition: { duration: 0.5, ease: "easeOut" } }
};

// --- MICRO COMPONENTS ---

const Grain = ({ opacity = 0.05 }) => (
  <div
    className="absolute inset-0 pointer-events-none"
    style={{ zIndex: 1 }}
  >
    <svg className="w-full h-full opacity-[0.05]" style={{ opacity }}>
      <filter id="noise">
        <feTurbulence type="fractalNoise" baseFrequency="0.65" numOctaves="3" stitchTiles="stitch" />
        <feColorMatrix type="saturate" values="0" />
      </filter>
      <rect width="100%" height="100%" filter="url(#noise)" />
    </svg>
  </div>
);

const Shine = () => (
  <div className="absolute inset-0 -translate-x-full animate-shine pointer-events-none"
    style={{ background: 'linear-gradient(90deg, transparent, rgba(255,255,255,0.2), transparent)' }}
  />
);

const SectionDivider = () => (
  <div className="w-full h-px bg-gradient-to-r from-transparent via-border to-transparent" />
);

const Counter = ({ target, label }) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });
  const [count, setCount] = useState(0);

  useEffect(() => {
    if (!isInView) return;
    const duration = 1500;
    const step = target / (duration / 16);
    const timer = setInterval(() => {
      setCount(prev => {
        if (prev >= target) { clearInterval(timer); return target; }
        return Math.min(prev + step, target);
      });
    }, 16);
    return () => clearInterval(timer);
  }, [isInView, target]);

  return (
    <div ref={ref} className="text-center">
      <div className="text-4xl md:text-5xl font-serif text-white mb-2">
        {Math.floor(count)}<span className="text-primary">+</span>
      </div>
      <div className="premium-label">{label}</div>
    </div>
  );
};

// --- UI COMPONENTS ---

const PrimaryButton = ({ children, icon: Icon, onClick }) => (
  <motion.button
    whileHover={{ scale: 1.03 }}
    whileTap={{ scale: 0.98 }}
    onClick={onClick}
    className="group relative inline-flex items-center gap-2 px-8 py-4 rounded-full bg-primary text-white font-mono text-sm font-medium tracking-wide transition-all duration-300 ease-out hover:shadow-[0_0_30px_rgba(249,115,22,0.4)] overflow-hidden"
  >
    <Shine />
    <span className="relative z-10">{children}</span>
    {Icon && <Icon className="relative z-10 w-4 h-4 group-hover:translate-x-1 transition-transform" />}
  </motion.button>
);

const SecondaryButton = ({ children, onClick }) => (
  <motion.button
    whileHover={{ scale: 1.03 }}
    whileTap={{ scale: 0.98 }}
    onClick={onClick}
    className="inline-flex items-center gap-2 px-8 py-4 rounded-full border border-white/20 hover:border-white/60 text-white/70 hover:text-white font-mono text-sm font-medium tracking-wide backdrop-blur-sm transition-all duration-300 hover:bg-white/5"
  >
    {children}
  </motion.button>
);

const GhostButton = ({ children, onClick }) => (
  <button
    onClick={onClick}
    className="group inline-flex items-center gap-1 text-sm font-mono font-medium text-white/60 hover:text-white transition-colors duration-200"
  >
    {children} <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
  </button>
);

// --- SECTIONS ---

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <nav className={`fixed top-0 w-full z-[100] transition-all duration-500 ${scrolled ? 'py-4' : 'py-8'}`}>
      <div className="max-w-7xl mx-auto px-6">
        <div className={`relative glass-card px-6 py-4 flex items-center justify-between transition-all duration-500 ${scrolled ? 'bg-surface/80 backdrop-blur-xl border-border' : 'bg-transparent border-transparent'}`}>
          <div className="flex items-center gap-2">
            <div className="w-7 h-7 md:w-8 md:h-8 bg-primary rounded-lg flex items-center justify-center">
              <Dumbbell className="text-white w-4 h-4 md:w-5 md:h-5" />
            </div>
            <span className="font-serif text-lg md:text-xl font-medium tracking-tight text-white uppercase">
              VR <span className="text-primary italic">Ultimate</span>
            </span>
          </div>

          <div className="hidden md:flex items-center gap-8">
            {['About', 'Services', 'Pricing', 'Contact'].map((item) => (
              <a key={item} href={`#${item.toLowerCase()}`} className="text-xs font-mono font-medium tracking-widest uppercase text-white/60 hover:text-white transition-colors">
                {item}
              </a>
            ))}
            <PrimaryButton>Join Now</PrimaryButton>
          </div>

          <button onClick={() => setIsOpen(!isOpen)} className="md:hidden text-white p-2">
            {isOpen ? <X /> : <Menu />}
          </button>
        </div>
      </div>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="md:hidden absolute top-full left-6 right-6 mt-4 p-8 glass-card bg-surface z-50 shadow-2xl"
          >
            <div className="flex flex-col gap-6 items-center">
              {['About', 'Services', 'Pricing', 'Contact'].map((item) => (
                <a key={item} href={`#${item.toLowerCase()}`} onClick={() => setIsOpen(false)} className="text-sm font-mono font-medium tracking-widest uppercase text-white/60 hover:text-white">
                  {item}
                </a>
              ))}
              <PrimaryButton>Join Now</PrimaryButton>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};

const Hero = () => {
  const words = "Elevate Your Potential Beyond Limits.".split(" ");

  return (
    <section className="relative min-h-screen flex items-center justify-center pt-32 pb-24 overflow-hidden bg-base">
      <Grain opacity={0.04} />

      {/* Background Shapes */}
      <div className="absolute top-1/4 -left-1/4 w-[50%] h-[50%] bg-primary/10 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute bottom-1/4 -right-1/4 w-[50%] h-[50%] bg-primary/5 rounded-full blur-[120px] pointer-events-none" />

      <div className="relative z-[2] max-w-5xl mx-auto px-6 text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="premium-label mb-8 block"
        >
          Premium Fitness Destination
        </motion.div>

        <h1 className="text-4xl md:text-7xl lg:text-8xl font-serif font-normal tracking-tight leading-[1.1] md:leading-[1.05] text-white mb-8 px-4">
          {words.map((word, i) => (
            <motion.span
              key={i}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.1, duration: 0.8, ease: [0.25, 0.46, 0.45, 0.94] }}
              className="inline-block mr-3"
            >
              {word === "Beyond" ? <span className="text-primary italic font-normal">{word}</span> : word}
            </motion.span>
          ))}
        </h1>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8, duration: 0.5 }}
          className="text-lg md:text-xl font-light text-white/60 leading-relaxed mb-12 max-w-2xl mx-auto"
        >
          Join New Ranip's most sophisticated gym. We combine expert coaching with high-end equipment to sculpt your ultimate self.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1, duration: 0.5 }}
          className="flex flex-col sm:flex-row gap-6 justify-center items-center"
        >
          <PrimaryButton icon={ArrowRight}>Start Your Journey</PrimaryButton>
          <SecondaryButton>View Membership</SecondaryButton>
        </motion.div>
      </div>

      <motion.div
        animate={{ y: [0, 10, 0] }}
        transition={{ duration: 2, repeat: Infinity }}
        className="absolute bottom-12 left-1/2 -translate-x-1/2 flex flex-col items-center gap-4 text-white/40 font-mono text-[10px] uppercase tracking-[0.3em]"
      >
        <span>Scroll</span>
        <div className="w-px h-12 bg-gradient-to-b from-primary via-primary/50 to-transparent" />
      </motion.div>
    </section>
  );
};

const About = () => (
  <section id="about" className="section-padding bg-surface relative overflow-hidden">
    <Grain opacity={0.03} />
    <div className="relative z-10 max-w-7xl mx-auto px-6">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 lg:gap-32 items-center">
        <motion.div
          variants={sectionVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="relative group"
        >
          <div className="absolute -inset-4 bg-primary/10 rounded-[2.5rem] blur-2xl group-hover:bg-primary/20 transition-all duration-700" />
          <div className="relative rounded-3xl overflow-hidden aspect-[4/5] border border-border">
            <img
              src="https://images.unsplash.com/photo-1534438327276-14e5300c3a48?auto=format&fit=crop&q=80"
              alt="Gym Interior"
              className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-110"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-base via-transparent to-transparent opacity-60" />
          </div>
          <div className="absolute -bottom-8 -right-8 p-8 glass-card bg-elevated shadow-2xl hidden md:block border-primary/20">
            <div className="font-serif text-3xl text-primary italic mb-1">#1 Rated</div>
            <div className="premium-label text-[10px]">Gym in New Ranip</div>
          </div>
        </motion.div>

        <motion.div
          variants={sectionVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        >
          <div className="premium-label mb-4">Our Legacy</div>
          <h2 className="text-3xl md:text-5xl font-serif font-medium tracking-tight text-white mb-8">
            Built for <span className="text-primary italic">Excellence</span>, Designed for Results.
          </h2>
          <p className="mb-12 max-w-xl">
            At VR Ultimate Fitness, we believe that fitness is the foundation of a successful life. Our facility is meticulously designed to provide an atmosphere of luxury and focus. From Olympic-grade weights to advanced recovery tech, every detail is optimized for your performance.
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-12 pt-8 border-t border-border">
            <Counter target={500} label="Active Members" />
            <Counter target={12} label="Master Trainers" />
          </div>
        </motion.div>
      </div>
    </div>
  </section>
);

const Services = () => {
  const services = [
    { title: "Elite Strength", desc: "Premium free weights and Hammer Strength machinery.", icon: Dumbbell, tag: "Power" },
    { title: "Precision Cardio", desc: "Advanced Technogym treadmills with HD virtual trails.", icon: Zap, tag: "HIIT" },
    { title: "Executive Training", desc: "Dedicated sessions with India's top fitness consultants.", icon: Target, tag: "Pro" },
    { title: "Holistic Yoga", desc: "Restore balance in our tranquil, climate-controlled studio.", icon: Users, tag: "Zen" },
    { title: "Mobility Lab", desc: "Functional tools designed to enhance range of motion.", icon: Award, tag: "Vital" },
    { title: "Nutrient Hub", desc: "Data-driven diet plans for optimal body composition.", icon: TrendingUp, tag: "Stats" }
  ];

  return (
    <section id="services" className="section-padding bg-base">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-20">
          <div className="premium-label mb-4">The VR Experience</div>
          <h2 className="text-3xl md:text-5xl font-serif font-medium tracking-tight text-white mb-6">World Class <span className="text-primary italic">Services</span></h2>
          <p className="max-w-2xl mx-auto">Discover a comprehensive suite of fitness solutions tailored to the modern athlete.</p>
        </div>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
        >
          {services.map((service, i) => (
            <motion.div
              key={i}
              variants={itemVariants}
              whileHover={{ y: -8, scale: 1.01, backgroundColor: '#161616' }}
              className="group relative bg-surface border border-border p-10 rounded-3xl transition-all duration-300"
              style={{ boxShadow: 'inset 0 1px 0 rgba(255,255,255,0.05)' }}
            >
              <div className="w-14 h-14 bg-elevated rounded-2xl flex items-center justify-center text-primary mb-8 border border-border group-hover:border-primary/30 transition-all">
                <service.icon className="w-6 h-6" />
              </div>
              <div className="text-[10px] font-mono text-white/30 uppercase tracking-[0.2em] mb-4">{service.tag}</div>
              <h3 className="text-2xl font-serif font-medium text-white mb-4">{service.title}</h3>
              <p className="text-sm mb-8">{service.desc}</p>
              <GhostButton>Learn More</GhostButton>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

const Pricing = () => {
  const [isYearly, setIsYearly] = useState(false);
  const tiers = [
    {
      name: "Executive",
      monthly: "1,499",
      yearly: "14,999",
      features: ["Full Access", "Locker Access", "Fitness Assessment", "Mobile App Access"]
    },
    {
      name: "Pro Elite",
      monthly: "2,999",
      yearly: "29,999",
      features: ["All Group Classes", "2x PT Sessions", "Custom Diet Plan", "Recovery Zone Access"],
      highlight: true
    },
    {
      name: "Ultimate",
      monthly: "4,999",
      yearly: "49,999",
      features: ["Unlimited PT", "Spa & Sauna", "Body Scanning", "Concierge Service"]
    }
  ];

  return (
    <section id="pricing" className="section-padding bg-surface relative overflow-hidden">
      <Grain opacity={0.03} />
      <div className="max-w-7xl mx-auto px-6 relative z-10">
        <div className="text-center mb-16">
          <div className="premium-label mb-4">Investment</div>
          <h2 className="text-3xl md:text-5xl font-serif font-medium tracking-tight text-white mb-8">Elevate Your <span className="text-primary italic">Membership</span></h2>

          {/* Toggle */}
          <div className="flex items-center justify-center gap-4 mt-8">
            <span className={`text-xs font-mono tracking-widest ${!isYearly ? 'text-white' : 'text-white/40'}`}>MONTHLY</span>
            <button
              onClick={() => setIsYearly(!isYearly)}
              className="w-14 h-7 bg-base border border-border rounded-full p-1 relative transition-colors hover:border-primary/50"
            >
              <motion.div
                animate={{ x: isYearly ? 28 : 0 }}
                className="w-5 h-5 bg-primary rounded-full shadow-lg"
              />
            </button>
            <span className={`text-xs font-mono tracking-widest ${isYearly ? 'text-white' : 'text-white/40'}`}>YEARLY <span className="text-primary text-[10px] ml-1">(-20%)</span></span>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {tiers.map((tier, i) => (
            <motion.div
              key={i}
              variants={itemVariants}
              initial="hidden"
              whileInView="visible"
              whileHover={{ y: -10 }}
              viewport={{ once: true }}
              className={`relative p-8 md:p-12 rounded-[2.5rem] border flex flex-col transition-all duration-500 ${tier.highlight
                  ? 'bg-primary border-primary shadow-[0_20px_50px_rgba(249,115,22,0.2)]'
                  : 'bg-base/50 backdrop-blur-sm border-border hover:border-white/20'
                }`}
            >
              {tier.highlight && (
                <div className="absolute -top-4 left-1/2 -translate-x-1/2 px-6 py-2 bg-white text-primary font-mono text-[10px] font-black uppercase tracking-widest rounded-full shadow-xl z-20">
                  Most Preferred
                </div>
              )}

              <div className="mb-10">
                <h3 className={`text-xl font-serif font-medium mb-6 ${tier.highlight ? 'text-white' : 'text-white/60'}`}>{tier.name}</h3>
                <div className="flex items-baseline gap-1">
                  <span className={`text-5xl font-serif tracking-tighter ${tier.highlight ? 'text-white' : 'text-white'}`}>
                    ₹{isYearly ? tier.yearly : tier.monthly}
                  </span>
                  <span className={`text-sm font-mono ${tier.highlight ? 'text-white/70' : 'text-white/40'}`}>
                    /{isYearly ? 'year' : 'mo'}
                  </span>
                </div>
              </div>

              <ul className="space-y-5 mb-12 flex-grow">
                {tier.features.map((f, j) => (
                  <li key={j} className="flex items-center gap-4 text-sm">
                    <div className={`w-5 h-5 rounded-full flex items-center justify-center shrink-0 ${tier.highlight ? 'bg-white/20' : 'bg-primary/10'}`}>
                      <CheckCircle2 className={`w-3 h-3 ${tier.highlight ? 'text-white' : 'text-primary'}`} />
                    </div>
                    <span className={tier.highlight ? 'text-white/90 font-medium' : 'text-white/60'}>{f}</span>
                  </li>
                ))}
              </ul>

              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className={`w-full py-5 rounded-2xl font-mono text-xs font-bold uppercase tracking-widest transition-all relative overflow-hidden group ${tier.highlight
                    ? 'bg-white text-primary hover:shadow-2xl'
                    : 'bg-surface border border-border text-white hover:bg-elevated'
                  }`}
              >
                <span className="relative z-10">Select Plan</span>
                {tier.highlight ? <div className="absolute inset-0 bg-white/10 translate-y-full group-hover:translate-y-0 transition-transform" /> : <Shine />}
              </motion.button>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};


const Contact = () => {
  const [pos, setPos] = useState({ x: 0, y: 0 });
  useEffect(() => {
    const move = (e) => setPos({ x: e.clientX, y: e.clientY });
    window.addEventListener('mousemove', move);
    return () => window.removeEventListener('mousemove', move);
  }, []);

  return (
    <section id="contact" className="section-padding bg-base relative overflow-hidden">
      <Grain opacity={0.04} />

      {/* Interactive Cursor Glow */}
      <div
        className="fixed w-96 h-96 bg-primary/10 rounded-full blur-[100px] pointer-events-none z-0 hidden lg:block transition-all duration-300"
        style={{ left: pos.x - 192, top: pos.y - 192 }}
      />

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-20">
          <motion.div variants={sectionVariants} initial="hidden" whileInView="visible" viewport={{ once: true }}>
            <div className="premium-label mb-4">Concierge</div>
            <h2 className="text-3xl md:text-5xl font-serif font-medium tracking-tight text-white mb-8">Start Your <span className="text-primary italic">Transformation</span></h2>
            <p className="mb-12">Our team of experts is ready to assist you in creating a fitness plan that aligns with your lifestyle and goals.</p>

            <div className="space-y-8">
              {[
                { icon: MapPin, label: "Visit", value: "303, Cluster_ranip 7 Aarya Arcade, Ahmedabad" },
                { icon: Phone, label: "Call", value: "+91 99989 78624", action: "tel:+919998978624" },
                { icon: Mail, label: "Email", value: "info@vrultimatefitness.com", action: "mailto:info@vrultimatefitness.com" }
              ].map((item, i) => (
                <div key={i} className="flex gap-6 group cursor-pointer" onClick={() => item.action && window.open(item.action)}>
                  <div className="w-12 h-12 glass-card bg-surface flex items-center justify-center text-primary group-hover:bg-primary group-hover:text-white transition-all">
                    <item.icon className="w-5 h-5" />
                  </div>
                  <div>
                    <div className="premium-label text-[10px] mb-1">{item.label}</div>
                    <div className="text-white font-serif">{item.value}</div>
                  </div>
                </div>
              ))}
            </div>

            <div className="mt-16 rounded-3xl overflow-hidden h-64 grayscale border border-border">
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3670.3!2d72.562!3d23.09!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x395e83a9!2sVR%20Ultimate!5e0!3m2!1sen!2sin!4v1"
                className="w-full h-full opacity-60"
                loading="lazy"
              />
            </div>
          </motion.div>

          <motion.div 
            variants={sectionVariants} 
            initial="hidden" 
            whileInView="visible" 
            viewport={{ once: true }}
            className="glass-card bg-surface p-8 md:p-12"
          >
            <h3 className="text-2xl font-serif font-medium text-white mb-10">Send an Inquiry</h3>
            <div className="space-y-6">
              <div className="space-y-2">
                <label className="premium-label text-[10px]">Full Name</label>
                <input type="text" className="w-full bg-base border border-border rounded-xl px-6 py-4 text-white focus:border-primary outline-none transition-all" placeholder="John Doe" />
              </div>
              <div className="space-y-2">
                <label className="premium-label text-[10px]">Phone Number</label>
                <input type="tel" className="w-full bg-base border border-border rounded-xl px-6 py-4 text-white focus:border-primary outline-none transition-all" placeholder="+91 00000 00000" />
              </div>
              <div className="space-y-2">
                <label className="premium-label text-[10px]">Message</label>
                <textarea rows="4" className="w-full bg-base border border-border rounded-xl px-6 py-4 text-white focus:border-primary outline-none transition-all resize-none" placeholder="How can we help you?" />
              </div>
              <PrimaryButton icon={ArrowRight}>Send Message</PrimaryButton>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

const Footer = () => (
  <footer className="relative bg-surface pt-32 pb-12 overflow-hidden border-t border-border">
    <Grain opacity={0.03} />

    {/* Background Accents */}
    <div className="absolute top-0 right-0 w-[40%] h-[40%] bg-primary/5 rounded-full blur-[120px] pointer-events-none" />
    <div className="absolute bottom-0 left-0 w-[40%] h-[40%] bg-primary/5 rounded-full blur-[120px] pointer-events-none" />

    <div className="max-w-7xl mx-auto px-6 relative z-10">
      {/* Main Footer Content */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-16 mb-24">
        {/* Brand Column */}
        <div className="space-y-8">
          <div className="flex items-center gap-2">
            <div className="w-10 h-10 bg-primary rounded-xl flex items-center justify-center">
              <Dumbbell className="text-white w-6 h-6" />
            </div>
            <span className="font-serif text-2xl font-medium tracking-tight text-white uppercase">
              VR <span className="text-primary italic text-xl">Ultimate</span>
            </span>
          </div>
          <p className="text-sm leading-relaxed text-white/50">
            Ahmedabad's premier fitness luxury destination. We provide a sanctuary for those who demand excellence in their physical journey.
          </p>
          <div className="flex gap-3">
            {[
              { icon: Instagram, link: "#" },
              { icon: Facebook, link: "#" },
              { icon: Youtube, link: "#" }
            ].map((social, i) => (
              <motion.a
                key={i}
                href={social.link}
                whileHover={{ y: -4, backgroundColor: BRAND }}
                className="w-11 h-11 rounded-2xl bg-base border border-border flex items-center justify-center text-white/40 hover:text-white transition-all shadow-sm"
              >
                <social.icon className="w-5 h-5" />
              </motion.a>
            ))}
          </div>
        </div>

        {/* Navigation */}
        <div>
          <h4 className="premium-label text-[10px] mb-8 font-bold">Quick Navigation</h4>
          <ul className="space-y-4">
            {['About', 'Services', 'Pricing', 'Gallery', 'Contact'].map(item => (
              <li key={item}>
                <a
                  href={`#${item.toLowerCase()}`}
                  className="group flex items-center gap-2 text-sm text-white/40 hover:text-white transition-all"
                >
                  <span className="w-1 h-1 rounded-full bg-primary opacity-0 group-hover:opacity-100 transition-opacity" />
                  {item}
                </a>
              </li>
            ))}
          </ul>
        </div>

        {/* Operational Hours */}
        <div>
          <h4 className="premium-label text-[10px] mb-8 font-bold">Visit Our Studio</h4>
          <div className="space-y-6">
            <div className="flex items-start gap-4">
              <div className="w-10 h-10 rounded-xl bg-base border border-border flex items-center justify-center shrink-0">
                <Clock className="w-5 h-5 text-primary" />
              </div>
              <div>
                <div className="text-white font-medium text-sm mb-1">Operational Hours</div>
                <div className="text-white/40 text-xs leading-relaxed">
                  Mon - Sat: 6:00 AM - 10:00 PM<br />
                  Sunday: Closed
                </div>
              </div>
            </div>
            <div className="flex items-start gap-4">
              <div className="w-10 h-10 rounded-xl bg-base border border-border flex items-center justify-center shrink-0">
                <MapPin className="w-5 h-5 text-primary" />
              </div>
              <div>
                <div className="text-white font-medium text-sm mb-1">Location</div>
                <div className="text-white/40 text-xs leading-relaxed">
                  303, Cluster_ranip 7 Aarya Arcade,<br />
                  New Ranip, Ahmedabad
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Newsletter */}
        <div>
          <h4 className="premium-label text-[10px] mb-8 font-bold">Stay Updated</h4>
          <p className="text-xs text-white/40 mb-6 leading-relaxed">
            Subscribe to receive exclusive fitness tips and luxury event invites.
          </p>
          <div className="relative group">
            <input
              type="email"
              placeholder="Email Address"
              className="w-full bg-base border border-border rounded-2xl px-6 py-4 text-sm text-white focus:border-primary/50 outline-none transition-all pr-12 group-hover:border-white/20"
            />
            <button className="absolute right-2 top-2 bottom-2 aspect-square bg-primary rounded-xl flex items-center justify-center text-white hover:scale-105 transition-transform">
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>

      {/* Footer Bottom */}
      <div className="pt-12 border-t border-border flex flex-col md:flex-row justify-between items-center gap-8">
        <div className="flex flex-col items-center md:items-start gap-2">
          <div className="text-[10px] font-mono text-white/20 uppercase tracking-[0.2em]">
            © {new Date().getFullYear()} VR Ultimate Fitness. All Rights Reserved.
          </div>
          <div className="text-[9px] font-mono text-white/10 uppercase tracking-[0.1em]">
            Crafted for Excellence in Ahmedabad
          </div>
        </div>
      </div>
    </div>
  </footer>
);

const BackToTop = () => {
  const [show, setShow] = useState(false);
  useEffect(() => {
    const handle = () => setShow(window.scrollY > 500);
    window.addEventListener('scroll', handle);
    return () => window.removeEventListener('scroll', handle);
  }, []);

  return (
    <AnimatePresence>
      {show && (
        <motion.button
          initial={{ opacity: 0, scale: 0.5 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.5 }}
          onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
          className="fixed bottom-6 right-6 md:bottom-8 md:right-8 w-10 h-10 md:w-12 md:h-12 bg-primary text-white rounded-full flex items-center justify-center shadow-2xl z-[100] hover:scale-110 transition-transform"
        >
          <ArrowRight className="w-4 h-4 md:w-5 md:h-5 -rotate-90" />
        </motion.button>
      )}
    </AnimatePresence>
  );
};

export default function App() {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, { stiffness: 100, damping: 30 });

  return (
    <div className="selection:bg-primary/30 selection:text-white">
      <motion.div className="fixed top-0 left-0 right-0 h-[2px] bg-primary z-[200] origin-left" style={{ scaleX }} />
      <Navbar />
      <Hero />
      <SectionDivider />
      <About />
      <SectionDivider />
      <Services />
      <SectionDivider />
      <Pricing />
      <SectionDivider />
      <Contact />
      <Footer />
      <BackToTop />
    </div>
  );
}
