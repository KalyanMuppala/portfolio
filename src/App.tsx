/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect, useRef } from 'react';
import { Routes, Route, Link } from 'react-router-dom'; // Removed BrowserRouter
import { motion, AnimatePresence, useSpring, useMotionValue } from 'motion/react';
import Resume from './components/Resume';
import { 
  Cloud, 
  Terminal, 
  Shield, 
  Cpu, 
  Mail, 
  ChevronRight,
  Award,
  BookOpen,
  Sun,
  Moon,
  ArrowRight,
  ChevronDown
} from 'lucide-react';

// --- Types ---
interface Experience {
  company: string;
  role: string;
  period: string;
  description: string[];
}

interface SkillCategory {
  title: string;
  skills: string[];
  icon: React.ReactNode;
}

// --- Data ---
const experiences: Experience[] = [
  {
    company: "MilliporeSigma (Merck Group)",
    role: "Senior Cloud Engineer – AWS Platform & Kubernetes",
    period: "May 2024 - Present",
    description: [
      "Architected and managed AWS EKS clusters, reducing downtime by 30% through enhanced lifecycle management, autoscaling, and secure networking.",
      "Designed and maintained infrastructure as code with Terraform and CloudFormation to standardize AWS environments, reducing provisioning time by 40%.",
      "Implemented monitoring, logging, and alerting with CloudWatch using observability best practices, resulting in 99.9% system uptime.",
      "Enhanced cloud security by implementing IAM least-privilege policies, managing secrets, and enforcing encryption.",
      "Optimized cloud costs by rightsizing EC2/ECS instances, applying tagging strategies, and conducting capacity planning.",
      "Lead incident troubleshooting, root cause analysis, and postmortems to improve platform reliability."
    ]
  },
  {
    company: "University of New Haven",
    role: "Graduate Research Assistant – Azure Cloud & Platform Automation",
    period: "Apr 2023 - Apr 2024",
    description: [
      "Designed and supported Azure infrastructure for analytics and research workloads using ARM templates and Azure Key Vault.",
      "Implemented Azure IaaS and PaaS services including Virtual Machines, VNets, Azure Storage, and Azure Monitor.",
      "Assisted with cloud automation and Infrastructure as Code, improving deployment consistency and operational reliability."
    ]
  },
  {
    company: "Intellipaat Software Solutions",
    role: "Cloud Infrastructure Engineer – AWS & DevOps",
    period: "Jun 2021 - Jan 2023",
    description: [
      "Supported and maintained AWS cloud infrastructure including EC2, VPC, IAM, S3, RDS, and networking components.",
      "Assisted in Terraform-based provisioning and environment automation across development and production accounts.",
      "Developed Python and Bash automation scripts to reduce manual operational tasks and improve efficiency."
    ]
  }
];

const skillCategories: SkillCategory[] = [
  {
    title: "Cloud Platforms",
    skills: ["AWS (EKS, Lambda, S3, RDS)", "Azure (AKS, Functions, SQL)"],
    icon: <Cloud className="w-5 h-5" />
  },
  {
    title: "Infrastructure as Code",
    skills: ["Terraform", "CloudFormation", "ARM Templates", "Bicep"],
    icon: <Terminal className="w-5 h-5" />
  },
  {
    title: "DevOps & Containers",
    skills: ["Kubernetes", "Docker", "Helm", "CI/CD (GitHub Actions, Jenkins)"],
    icon: <Cpu className="w-5 h-5" />
  },
  {
    title: "Security & Networking",
    skills: ["IAM/RBAC", "VPC/VNet Design", "Firewalls", "Key Vault"],
    icon: <Shield className="w-5 h-5" />
  }
];

const certifications = [
  "AWS Certified Solutions Architect Professional",
  "Microsoft Certified: Azure Solutions Architect Expert",
  "HashiCorp Terraform Associate",
  "Certified Kubernetes Administrator"
];

// --- Components ---

const Magnetic = ({ children, strength = 0.5 }: { children: React.ReactNode; strength?: number }) => {
  const ref = useRef<HTMLDivElement>(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const springX = useSpring(x, { damping: 15, stiffness: 150 });
  const springY = useSpring(y, { damping: 15, stiffness: 150 });

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!ref.current) return;
    const { clientX, clientY } = e;
    const { left, top, width, height } = ref.current.getBoundingClientRect();
    const centerX = left + width / 2;
    const centerY = top + height / 2;
    const distanceX = clientX - centerX;
    const distanceY = clientY - centerY;
    
    x.set(distanceX * strength);
    y.set(distanceY * strength);
  };

  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
  };

  return (
    <motion.div
      ref={ref}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{ x: springX, y: springY }}
    >
      {children}
    </motion.div>
  );
};

const CustomCursor = ({ isDark }: { isDark: boolean }) => {
  const cursorX = useMotionValue(-100);
  const cursorY = useMotionValue(-100);
  const [isHovering, setIsHovering] = useState(false);

  const springConfig = { damping: 25, stiffness: 250 };
  const x = useSpring(cursorX, springConfig);
  const y = useSpring(cursorY, springConfig);

  useEffect(() => {
    const moveCursor = (e: MouseEvent) => {
      cursorX.set(e.clientX);
      cursorY.set(e.clientY);
    };

    const handleMouseOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      if (
        target.tagName === 'BUTTON' || 
        target.tagName === 'A' || 
        target.closest('button') || 
        target.closest('a') ||
        target.classList.contains('cursor-pointer')
      ) {
        setIsHovering(true);
      } else {
        setIsHovering(false);
      }
    };

    window.addEventListener('mousemove', moveCursor);
    window.addEventListener('mouseover', handleMouseOver);
    
    return () => {
      window.removeEventListener('mousemove', moveCursor);
      window.removeEventListener('mouseover', handleMouseOver);
    };
  }, [cursorX, cursorY]);

  return (
    <motion.div
      className="fixed top-0 left-0 w-8 h-8 rounded-full pointer-events-none z-[9999] mix-blend-difference hidden md:block"
      style={{
        x,
        y,
        translateX: '-50%',
        translateY: '-50%',
        backgroundColor: 'white',
        scale: isHovering ? 2.5 : 1,
      }}
      transition={{ type: 'spring', damping: 20, stiffness: 300 }}
    />
  );
};

const AnimatedBackground = ({ isDark }: { isDark: boolean }) => {
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  const springConfig = { damping: 30, stiffness: 100 };
  const glowX = useSpring(mouseX, springConfig);
  const glowY = useSpring(mouseY, springConfig);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      mouseX.set(e.clientX);
      mouseY.set(e.clientY);
    };
    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, [mouseX, mouseY]);

  return (
    <div className="fixed inset-0 -z-10 overflow-hidden pointer-events-none">
      <motion.div 
        animate={{ 
          backgroundColor: isDark ? '#050505' : '#f8fafc'
        }}
        className="absolute inset-0 transition-colors duration-1000"
      />
      <div className="absolute inset-0 overflow-hidden">
        <motion.div
          animate={{
            x: [0, 100, -100, 0],
            y: [0, -100, 100, 0],
            scale: [1, 1.1, 0.9, 1],
          }}
          transition={{ duration: 40, repeat: Infinity, ease: "easeInOut" }}
          className={`absolute -top-[20%] -left-[10%] w-[70%] h-[70%] rounded-full blur-[150px] opacity-[0.15] ${isDark ? 'bg-blue-600' : 'bg-blue-200'}`}
        />
        <motion.div
          animate={{
            x: [0, -100, 100, 0],
            y: [0, 100, -100, 0],
            scale: [1, 0.9, 1.1, 1],
          }}
          transition={{ duration: 45, repeat: Infinity, ease: "easeInOut" }}
          className={`absolute -bottom-[20%] -right-[10%] w-[70%] h-[70%] rounded-full blur-[150px] opacity-[0.15] ${isDark ? 'bg-purple-600' : 'bg-purple-200'}`}
        />
      </div>

      <motion.div
        style={{
          x: glowX,
          y: glowY,
          translateX: '-50%',
          translateY: '-50%',
          background: isDark 
            ? 'radial-gradient(circle at center, rgba(59, 130, 246, 0.15) 0%, transparent 70%)' 
            : 'radial-gradient(circle at center, rgba(59, 130, 246, 0.05) 0%, transparent 70%)'
        }}
        className={`absolute w-[1000px] h-[1000px] rounded-full blur-[120px] ${isDark ? 'mix-blend-screen' : 'mix-blend-multiply opacity-20'}`}
      />

      <div className="absolute inset-0 opacity-[0.02] pointer-events-none mix-blend-overlay" 
        style={{ backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.65' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")` }}
      />
    </div>
  );
};

const SectionHeader = ({ title, subtitle, isDark, centered = true }: { title: string; subtitle?: string; isDark: boolean; centered?: boolean }) => (
  <div className={`mb-12 ${centered ? 'text-center flex flex-col items-center' : ''}`}>
    <motion.h2 
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      className={`text-4xl md:text-5xl font-light tracking-tight mb-4 ${isDark ? 'text-zinc-100' : 'text-zinc-900'}`}
    >
      {title}
    </motion.h2>
    {subtitle && (
      <motion.p 
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ delay: 0.1 }}
        className={`text-lg max-w-2xl font-light leading-relaxed ${isDark ? 'text-zinc-500' : 'text-slate-500/80'}`}
      >
        {subtitle}
      </motion.p>
    )}
  </div>
);

export default function App() {
  const [activeTab, setActiveTab] = useState(0);
  const [isDark, setIsDark] = useState(true);
  const [showEmailModal, setShowEmailModal] = useState(false);
  const [copied, setCopied] = useState(false);

  const toggleTheme = () => setIsDark(!isDark);

  return (
      <Routes>
        <Route path="/resume" element={<Resume />} />
        <Route path="/" element={
          <div className={`min-h-screen font-sans selection:bg-zinc-500 selection:text-white transition-colors duration-700 ${isDark ? 'text-zinc-100' : 'text-zinc-900'}`}>
            <CustomCursor isDark={isDark} />
            <AnimatedBackground isDark={isDark} />
            
            <div className="relative z-10">
              {/* Navigation */}
      <nav className={`fixed top-0 left-0 w-full z-50 px-6 py-8 flex justify-between items-center transition-all duration-500 ${isDark ? 'bg-black/40 backdrop-blur-xl border-b border-white/10' : 'bg-white/80 backdrop-blur-xl border-b border-zinc-200'}`}>
        <motion.div 
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          whileHover={{ 
            scale: 1.05,
            letterSpacing: "0.1em",
            color: isDark ? "#fff" : "#000",
            textShadow: isDark ? "0 0 15px rgba(255,255,255,0.3)" : "0 0 15px rgba(0,0,0,0.1)"
          }}
          className={`text-2xl font-serif italic tracking-tight cursor-pointer transition-all ${isDark ? 'text-white' : 'text-zinc-950'}`}
        >
          Cloud Architect
        </motion.div>
        
        <div className="flex items-center gap-8">
          <div className="hidden md:flex gap-8 text-xs font-medium tracking-widest uppercase">
            {['work', 'skills', 'about'].map((item) => (
              <motion.a 
                key={item}
                href={`#${item}`} 
                whileHover={{ 
                  y: -5, 
                  opacity: 1,
                  scale: 1.1,
                  color: isDark ? "#fff" : "#000"
                }}
                className={`transition-all relative group ${isDark ? 'text-zinc-400' : 'text-zinc-950'}`}
              >
                {item}
                <motion.span 
                  className={`absolute -bottom-1 left-0 w-0 h-[1px] ${isDark ? 'bg-white' : 'bg-black'} transition-all group-hover:w-full`}
                />
              </motion.a>
            ))}
          </div>
          
          <motion.button
            whileHover={{ scale: 1.1, rotate: 180 }}
            whileTap={{ scale: 0.9 }}
            onClick={toggleTheme}
            className={`p-2 rounded-full transition-colors ${isDark ? 'bg-zinc-800 text-zinc-100 hover:bg-zinc-700' : 'bg-white text-zinc-900 shadow-lg hover:bg-zinc-50'}`}
          >
            {isDark ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />}
          </motion.button>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="relative h-screen flex flex-col justify-center items-center text-center px-6 md:px-24 overflow-hidden">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className="relative z-10 flex flex-col items-center"
        >
          <motion.h1 
            className="text-7xl md:text-[8rem] font-light leading-[0.9] tracking-tighter mb-8"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2 }}
          >
            Kalyan <br />
            <span className={`italic font-serif ${isDark ? 'text-zinc-500' : 'text-slate-400'}`}>Muppala.</span>
          </motion.h1>
          <motion.p 
            className={`text-xl md:text-2xl max-w-2xl font-light leading-relaxed ${isDark ? 'text-zinc-400' : 'text-slate-600'}`}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4 }}
          >
            Senior Cloud Engineer driving multi-cloud solutions on AWS and Azure. 
            Specializing in Kubernetes, Terraform, and DevOps automation.
          </motion.p>
          
          <div className="mt-12 flex flex-wrap justify-center gap-6">
            <Magnetic strength={0.2}>
              <motion.button 
                onClick={() => setShowEmailModal(true)}
                whileHover={{ 
                  scale: 1.05, 
                  x: 10,
                  boxShadow: isDark ? "0 0 20px rgba(255,255,255,0.2)" : "0 0 20px rgba(0,0,0,0.1)"
                }}
                whileTap={{ scale: 0.95 }}
                className={`px-10 py-5 rounded-full text-sm font-medium flex items-center gap-2 transition-all shadow-xl ${
                  isDark ? 'bg-zinc-100 text-black' : 'bg-zinc-900 text-white'
                }`}
              >
                <Mail className="w-4 h-4" />
                Get in touch
                <ArrowRight className="w-4 h-4 ml-1" />
              </motion.button>
            </Magnetic>
                  <Magnetic strength={0.2}>
                    <Link 
                      to="/resume"
                      target="_blank"
                      className={`px-10 py-5 border rounded-full text-sm font-medium flex items-center gap-2 transition-all ${
                        isDark ? 'border-zinc-800' : 'border-zinc-200'
                      }`}
                    >
                      <BookOpen className="w-4 h-4" />
                      View Resume
                    </Link>
                  </Magnetic>
          </div>
        </motion.div>

        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1 }}
          className="absolute bottom-12 left-1/2 -translate-x-1/2"
        >
          <motion.div
            animate={{ 
              y: [0, 8, 0],
              opacity: [0.3, 0.7, 0.3]
            }}
            transition={{ 
              duration: 2, 
              repeat: Infinity, 
              ease: "easeInOut" 
            }}
          >
            <ChevronDown className={`w-5 h-5 ${isDark ? 'text-white' : 'text-black'}`} />
          </motion.div>
        </motion.div>
      </section>

      {/* Experience Section */}
      <section id="work" className="py-32 px-6 md:px-24 relative">
        <SectionHeader 
          isDark={isDark}
          title="Professional Experience" 
          subtitle="A track record of building resilient, scalable, and cost-effective cloud infrastructures for global enterprises."
        />

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
          <div className="lg:col-span-4 flex flex-col gap-2">
            {experiences.map((exp, index) => (
              <motion.button
                key={index}
                onClick={() => setActiveTab(index)}
                className={`text-left p-6 rounded-2xl transition-all duration-500 relative group ${
                  activeTab === index 
                    ? (isDark ? 'text-white' : 'text-black') 
                    : (isDark ? 'text-zinc-500 hover:text-zinc-300' : 'text-slate-400 hover:text-slate-600')
                }`}
              >
                {activeTab === index && (
                  <motion.div 
                    layoutId="activeTab"
                    className={`absolute inset-0 rounded-2xl border ${isDark ? 'bg-zinc-900/40 border-zinc-700/50' : 'bg-white/60 border-zinc-200/50'} backdrop-blur-md -z-10`}
                    transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
                  />
                )}
                <div className="text-xs mb-1 uppercase tracking-widest font-semibold opacity-70">{exp.period}</div>
                <div className="text-xl font-medium tracking-tight">{exp.company}</div>
                <div className="text-sm opacity-80">{exp.role}</div>
              </motion.button>
            ))}
          </div>

          <div className="lg:col-span-8">
            <AnimatePresence mode="wait">
              <motion.div
                key={activeTab}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.4, ease: "easeOut" }}
                className={`p-8 md:p-12 rounded-[2rem] border backdrop-blur-2xl transition-all duration-500 ${
                  isDark 
                    ? 'bg-zinc-900/40 border-zinc-800/50 shadow-[0_20px_50px_rgba(0,0,0,0.3)]' 
                    : 'bg-white/70 border-zinc-200/50 shadow-[0_20px_50px_rgba(0,0,0,0.05)]'
                }`}
              >
                <h3 className="text-3xl font-light mb-8">{experiences[activeTab].role}</h3>
                <ul className="space-y-6">
                  {experiences[activeTab].description.map((item, i) => (
                    <motion.li 
                      key={i} 
                      className={`flex gap-4 leading-relaxed ${isDark ? 'text-zinc-400' : 'text-slate-600'}`}
                      initial={{ opacity: 0, x: -10 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      transition={{ delay: i * 0.1 }}
                    >
                      <div className={`mt-2 w-1.5 h-1.5 rounded-full shrink-0 ${isDark ? 'bg-zinc-600' : 'bg-slate-300'}`} />
                      {item}
                    </motion.li>
                  ))}
                </ul>
              </motion.div>
            </AnimatePresence>
          </div>
        </div>
      </section>

      {/* Skills Section */}
      <section id="skills" className="py-32 px-6 md:px-24 relative">
        <SectionHeader 
          isDark={isDark}
          title="Core Competencies" 
          subtitle="Expertise across the entire cloud lifecycle, from architecture and security to automation and observability."
        />

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {skillCategories.map((cat, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              whileHover={{ y: -8 }}
              className={`p-8 rounded-[2rem] border backdrop-blur-2xl transition-all duration-500 group ${
                isDark 
                  ? 'bg-zinc-900/30 border-zinc-800/50 hover:bg-zinc-900/50 hover:border-zinc-700/50 shadow-2xl' 
                  : 'bg-white/50 border-zinc-200/50 hover:bg-white/80 hover:border-zinc-300/50 shadow-xl'
              }`}
            >
              <motion.div 
                whileHover={{ 
                  rotate: [0, -10, 10, -10, 0],
                  scale: 1.2,
                  backgroundColor: isDark ? "#fff" : "#000",
                  color: isDark ? "#000" : "#fff"
                }}
                transition={{ duration: 0.5 }}
                className={`w-14 h-14 rounded-2xl flex items-center justify-center mb-6 transition-all shadow-lg ${
                  isDark ? 'bg-zinc-800 text-zinc-100' : 'bg-slate-100 text-zinc-900'
                }`}
              >
                {cat.icon}
              </motion.div>
              <h3 className="text-xl font-medium mb-4">{cat.title}</h3>
              <ul className="space-y-2">
                {cat.skills.map((skill, i) => (
                  <li key={i} className={`text-sm flex items-center gap-2 ${isDark ? 'text-zinc-500' : 'text-slate-500'}`}>
                    <ChevronRight className="w-3 h-3" />
                    {skill}
                  </li>
                ))}
              </ul>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Certifications & Education */}
      <section id="about" className="py-32 px-6 md:px-24 relative">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-24">
          <div>
            <SectionHeader isDark={isDark} title="Certifications" />
            <div className="space-y-4">
              {certifications.map((cert, index) => (
                <motion.div 
                  key={index}
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                  whileHover={{ 
                    x: 10, 
                    backgroundColor: isDark ? 'rgba(39, 39, 42, 0.4)' : 'rgba(255, 255, 255, 0.6)',
                  }}
                  className={`flex items-center gap-4 p-5 rounded-2xl border backdrop-blur-xl transition-all cursor-default ${
                    isDark ? 'bg-zinc-900/20 border-zinc-800/50' : 'bg-white/40 border-zinc-200/50 shadow-sm'
                  }`}
                >
                  <motion.div 
                    whileHover={{ scale: 1.3, rotate: -15, color: isDark ? "#fff" : "#000" }}
                    className={`w-12 h-12 rounded-xl flex items-center justify-center transition-colors ${isDark ? 'bg-zinc-800 text-zinc-400' : 'bg-slate-100 text-slate-500'}`}
                  >
                    <Award className="w-6 h-6" />
                  </motion.div>
                  <span className={`font-medium text-lg ${isDark ? 'text-zinc-300' : 'text-slate-700'}`}>{cert}</span>
                </motion.div>
              ))}
            </div>
          </div>

          <div>
            <SectionHeader isDark={isDark} title="Education" />
            <div className="space-y-8">
              <motion.div 
                className={`relative pl-8 border-l ${isDark ? 'border-zinc-800' : 'border-zinc-200'}`}
                whileHover={{ x: 5 }}
              >
                <div className={`absolute top-0 left-[-4px] w-2 h-2 rounded-full ${isDark ? 'bg-zinc-100' : 'bg-zinc-900'}`} />
                <h4 className="text-xl font-medium mb-1">Master of Science</h4>
                <p className={`${isDark ? 'text-zinc-500' : 'text-slate-500'} mb-2`}>Business Analytics & Technologies</p>
                <p className={`text-sm italic ${isDark ? 'text-zinc-600' : 'text-slate-400'}`}>University of New Haven</p>
              </motion.div>
              <motion.div 
                className={`relative pl-8 border-l ${isDark ? 'border-zinc-800' : 'border-zinc-200'}`}
                whileHover={{ x: 5 }}
              >
                <div className={`absolute top-0 left-[-4px] w-2 h-2 rounded-full ${isDark ? 'bg-zinc-100' : 'bg-zinc-900'}`} />
                <h4 className="text-xl font-medium mb-1">Bachelor of Technology</h4>
                <p className={`${isDark ? 'text-zinc-500' : 'text-slate-500'} mb-2`}>Computer Science Engineering</p>
                <p className={`text-sm italic ${isDark ? 'text-zinc-600' : 'text-slate-400'}`}>Lovely Professional University</p>
              </motion.div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className={`py-24 px-6 md:px-24 border-t transition-colors duration-700 text-center ${isDark ? 'border-zinc-900' : 'border-zinc-200'}`}>
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
        >
          <motion.h2 
            className="text-4xl md:text-6xl font-light mb-12 tracking-tighter"
            whileHover={{ scale: 1.02 }}
          >
            Let's build something <br />
            <span className={`italic font-serif ${isDark ? 'text-zinc-500' : 'text-slate-400'}`}>resilient.</span>
          </motion.h2>
          <div className={`flex flex-wrap justify-center gap-8 text-sm font-medium tracking-widest uppercase ${isDark ? 'text-zinc-500' : 'text-slate-500'}`}>
            <motion.a 
              key="Email"
              href="#" 
              onClick={(e) => {
                e.preventDefault();
                setShowEmailModal(true);
              }}
              whileHover={{ y: -5, color: isDark ? '#fff' : '#000' }}
              className="transition-colors"
            >
              Email
            </motion.a>
            <motion.a 
              key="LinkedIn"
              href="https://www.linkedin.com/in/muppala-kalyan" 
              target="_blank"
              rel="noopener noreferrer"
              whileHover={{ y: -5, color: isDark ? '#fff' : '#000' }}
              className="transition-colors"
            >
              LinkedIn
            </motion.a>
            <Link 
              to="/resume"
              className={`transition-colors uppercase font-medium tracking-widest text-sm ${isDark ? 'text-zinc-500 hover:text-white' : 'text-slate-500 hover:text-black'}`}
            >
              Resume
            </Link>
          </div>
          <p className={`mt-24 text-xs tracking-widest uppercase ${isDark ? 'text-zinc-700' : 'text-slate-400'}`}>
            © 2026 Kalyan Muppala. All rights reserved.
          </p>
        </motion.div>
      </footer>
      {/* Email Modal */}
      <AnimatePresence>
        {showEmailModal && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center p-6">
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setShowEmailModal(false)}
              className="absolute inset-0 bg-black/60 backdrop-blur-sm"
            />
            <motion.div 
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 20 }}
              className={`relative w-full max-w-md p-8 rounded-3xl border shadow-2xl ${
                isDark ? 'bg-zinc-900 border-zinc-800 text-white' : 'bg-white border-zinc-200 text-zinc-900'
              }`}
            >
              <h3 className="text-2xl font-light mb-6 tracking-tight">Get in touch</h3>
              <p className={`text-sm mb-8 ${isDark ? 'text-zinc-400' : 'text-zinc-500'}`}>
                Feel free to reach out for collaborations or just a friendly hello.
              </p>
              
              <div className={`p-6 rounded-2xl border mb-8 flex items-center justify-between group cursor-pointer transition-all ${
                isDark ? 'bg-zinc-800/50 border-zinc-700 hover:border-zinc-500' : 'bg-zinc-50 border-zinc-200 hover:border-zinc-300'
              }`}
              onClick={() => {
                navigator.clipboard.writeText('mdjkalyan@gmail.com');
                setCopied(true);
                setTimeout(() => setCopied(false), 2000);
              }}
              >
                <div className="flex items-center gap-4">
                  <div className={`w-10 h-10 rounded-xl flex items-center justify-center ${isDark ? 'bg-zinc-700' : 'bg-white shadow-sm'}`}>
                    <Mail className="w-5 h-5" />
                  </div>
                  <div>
                    <div className="text-xs uppercase tracking-widest opacity-50 mb-1">Email</div>
                    <div className="font-medium">mdjkalyan@gmail.com</div>
                  </div>
                </div>
                <motion.div 
                  animate={{ opacity: copied ? 1 : 0.5 }}
                  className="text-xs font-medium uppercase tracking-widest"
                >
                  {copied ? 'Copied!' : 'Copy'}
                </motion.div>
              </div>

              <motion.button 
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={() => setShowEmailModal(false)}
                className={`w-full py-4 rounded-2xl font-medium transition-all ${
                  isDark ? 'bg-zinc-100 text-black hover:bg-white' : 'bg-zinc-900 text-white hover:bg-black'
                }`}
              >
                Close
              </motion.button>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
            </div>
          </div>
        } />
      </Routes>
  );
}
