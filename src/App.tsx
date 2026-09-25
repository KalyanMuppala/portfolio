/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect, useRef } from 'react';
import { Routes, Route, Link } from 'react-router-dom';
import { motion, AnimatePresence, useSpring, useMotionValue } from 'motion/react';
import WaveBackground from './components/WaveBackground';
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
  Activity,
  Zap
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
    company: "Levo.ai",
    role: "AI Solutions Engineer (Forward Deployed)",
    period: "Apr 2026 - Present",
    description: [
      "Embed with customer security and platform teams during proof-of-value engagements, running technical discovery, scoping deployment prerequisites, and owning delivery through to a signed-off evaluation.",
      "Deploy eBPF-based runtime API security sensors into customer production Kubernetes clusters (Amazon EKS, Azure AKS, Google GKE) using Helm, within each customer's network policies, IAM/RBAC model, and change-control process.",
      "Debug deployment blockers live with customer engineers, from network restrictions and IAM/RBAC misconfigurations to sensor performance issues, without pulling in core engineering.",
      "Write Python and SQL tooling against customer API telemetry to produce risk and posture reports mapped to the OWASP API Top 10 and sensitive-data exposure, then walk teams through a prioritized remediation plan.",
      "Built reproducible Kubernetes evaluation environments so every engagement starts from a known-good baseline, with health checks on deployed sensor fleets so failures surface before the customer notices.",
      "Bring field issues back to product and engineering with repro steps, logs, and suggested fixes, and keep runbooks current so any engineer can pick up an engagement mid-stream."
    ]
  },
  {
    company: "MilliporeSigma",
    role: "Cloud Engineer",
    period: "Jun 2024 - Apr 2026",
    description: [
      "Designed and delivered proof-of-value pipelines using GitHub Actions and eBPF runtime sensors, letting stakeholders evaluate new cloud capabilities within two weeks.",
      "Ran multi-region Amazon EKS clusters (upgrades, autoscaling, VPC CNI networking, IRSA) and tracked down the networking and registry bottlenecks that kept two product teams from meeting release SLAs.",
      "Stood up a Prometheus and Grafana observability stack with SLIs, SLOs, alert thresholds, and incident runbooks agreed with each owning team, cutting unplanned downtime by 20% and bringing MTTR down.",
      "Carried on-call and ran blameless post-incident reviews; root-cause findings went back into shared fixes that reduced repeat incidents across engineering."
    ]
  },
  {
    company: "Intellipaat",
    role: "Cloud Infrastructure Engineer",
    period: "Nov 2021 - Jan 2023",
    description: [
      "Replaced manual provisioning with Terraform and Ansible across AWS and Azure for platforms serving thousands of concurrent users; monitoring, autoscaling, and automated failover cut downtime by 40%.",
      "Built Jenkins and GitHub Actions pipelines covering build, test, and deploy, shortening release cycles by 40% and removing the 2-day wait that manual handoffs used to add.",
      "Containerized applications with Docker and Kubernetes and set up centralized logging with CloudWatch and the ELK stack, giving developers one place to look when something broke.",
      "Handled Tier 2/3 production support, working incidents directly with affected teams and doing root-cause analysis across networking, compute, and container layers within SLA."
    ]
  }
];

const skillCategories: SkillCategory[] = [
  {
    title: "Forward Deployed Engineering",
    skills: ["Technical Discovery", "Proof-of-Value Delivery", "Customer Production Deployments", "Solution Scoping", "Remediation Planning", "Stakeholder Communication"],
    icon: <Zap className="w-5 h-5" />
  },
  {
    title: "Cloud Platforms",
    skills: ["AWS (EKS, EC2, S3, IAM, VPC, CloudWatch)", "Azure (AKS, VNets, DevOps, RBAC)", "GCP (GKE)"],
    icon: <Cloud className="w-5 h-5" />
  },
  {
    title: "Containers & IaC",
    skills: ["Kubernetes", "Helm", "Docker", "Terraform", "Ansible"],
    icon: <Cpu className="w-5 h-5" />
  },
  {
    title: "CI/CD & Languages",
    skills: ["Jenkins", "GitHub Actions", "Azure DevOps", "Git", "Python, SQL & Bash"],
    icon: <Terminal className="w-5 h-5" />
  },
  {
    title: "Observability & SRE",
    skills: ["Prometheus & Grafana", "ELK Stack", "CloudWatch & Azure Monitor", "SLIs / SLOs", "Incident Response"],
    icon: <Activity className="w-5 h-5" />
  },
  {
    title: "Security",
    skills: ["eBPF Runtime Sensors", "API Security", "OWASP API Top 10", "IAM / RBAC"],
    icon: <Shield className="w-5 h-5" />
  }
];

const certifications = [
  "AWS Certified Solutions Architect – Associate",
  "Microsoft Certified: Azure Network Engineer Associate (AZ-700)",
  "Microsoft Certified: Azure Administrator Associate (AZ-104)"
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
        <Route path="/" element={
          <div className={`min-h-screen font-sans selection:bg-zinc-500 selection:text-white transition-colors duration-700 ${isDark ? 'text-zinc-100' : 'text-zinc-900'}`}>
            <CustomCursor isDark={isDark} />
            <WaveBackground isDark={isDark} />
            
            <div className="relative z-10">
              {/* Navigation */}
      <nav className={`fixed top-0 left-0 w-full z-50 px-6 py-8 flex justify-between items-center transition-all duration-500 ${isDark ? 'bg-black/40 backdrop-blur-xl border-b border-white/10' : 'bg-white/80 backdrop-blur-xl border-b border-zinc-200'}`}>
        <motion.div 
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          className={`text-xl md:text-2xl font-serif italic tracking-tight cursor-pointer transition-all ${isDark ? 'text-white' : 'text-zinc-950'}`}
        >
          Forward Deployed Engineer
        </motion.div>
        
        <div className="flex items-center gap-8">
          <div className="hidden md:flex gap-8 text-xs font-medium tracking-widest uppercase">
            {['work', 'skills', 'about'].map((item) => (
              <motion.a 
                key={item}
                href={`#${item}`} 
                className={`transition-all relative group ${isDark ? 'text-zinc-400' : 'text-zinc-950'}`}
              >
                {item}
                <motion.span className={`absolute -bottom-1 left-0 w-0 h-[1px] ${isDark ? 'bg-white' : 'bg-black'} transition-all group-hover:w-full`} />
              </motion.a>
            ))}
          </div>
          
          <motion.button
            whileHover={{ scale: 1.1, rotate: 180 }}
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
          transition={{ duration: 0.8 }}
          className="relative z-10 flex flex-col items-center"
        >
          <motion.h1 
            className="text-7xl md:text-[8rem] font-light leading-[0.9] tracking-tighter mb-8"
          >
            Kalyan <br />
            <span className={`italic font-serif ${isDark ? 'text-zinc-500' : 'text-slate-400'}`}>Muppala.</span>
          </motion.h1>
          <motion.p 
            className={`text-xl md:text-2xl max-w-2xl font-light leading-relaxed ${isDark ? 'text-zinc-400' : 'text-slate-600'}`}
          >
            Forward Deployed Engineer with 3+ years across AWS, Azure, and GCP. I embed with customer teams to deploy, debug, and ship API security on production Kubernetes.
          </motion.p>
          
          <div className="mt-12 flex flex-wrap justify-center gap-6">
            <Magnetic strength={0.2}>
              <motion.button 
                onClick={() => setShowEmailModal(true)}
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
                    <a 
                      href="/portfolio/resume.pdf" 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className={`px-10 py-5 border rounded-full text-sm font-medium flex items-center gap-2 transition-all ${
                        isDark ? 'border-zinc-800' : 'border-zinc-200'
                      }`}
                    >
                      <BookOpen className="w-4 h-4" />
                      View Resume
                    </a>
                  </Magnetic>
          </div>
        </motion.div>
      </section>

      {/* Experience Section */}
      <section id="work" className="py-32 px-6 md:px-24 relative">
        <SectionHeader 
          isDark={isDark}
          title="Professional Experience" 
          subtitle="From the first technical call to production rollout: deploying security inside customer environments, built on years of platform engineering and SRE."
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
                className={`p-8 md:p-12 rounded-[2rem] border backdrop-blur-2xl ${
                  isDark ? 'bg-zinc-900/40 border-zinc-800/50' : 'bg-white/70 border-zinc-200/50'
                }`}
              >
                <h3 className="text-3xl font-light mb-8">{experiences[activeTab].role}</h3>
                <ul className="space-y-6">
                  {experiences[activeTab].description.map((item, i) => (
                    <motion.li key={i} className={`flex gap-4 leading-relaxed ${isDark ? 'text-zinc-400' : 'text-slate-600'}`}>
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
          subtitle="Equally at home on a call with customer engineers or writing the Python, SQL, or Terraform an engagement needs to get unstuck."
        />

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {skillCategories.map((cat, index) => (
            <motion.div
              key={index}
              className={`p-8 rounded-[2rem] border backdrop-blur-2xl transition-all ${
                isDark ? 'bg-zinc-900/30 border-zinc-800/50' : 'bg-white/50 border-zinc-200/50'
              }`}
            >
              <div className={`w-14 h-14 rounded-2xl flex items-center justify-center mb-6 ${isDark ? 'bg-zinc-800 text-zinc-100' : 'bg-slate-100 text-zinc-900'}`}>
                {cat.icon}
              </div>
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

      {/* Education & Certifications Section */}
      <section id="about" className="py-32 px-6 md:px-24 relative">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-24">
          <div>
            <SectionHeader isDark={isDark} title="Certifications" />
            <div className="space-y-4">
              {certifications.map((cert, index) => (
                <div key={index} className={`flex items-center gap-4 p-5 rounded-2xl border ${isDark ? 'bg-zinc-900/20 border-zinc-800/50' : 'bg-white/40 border-zinc-200/50'}`}>
                  <Award className="w-6 h-6 text-zinc-400" />
                  <span className={`font-medium text-lg ${isDark ? 'text-zinc-300' : 'text-slate-700'}`}>{cert}</span>
                </div>
              ))}
            </div>
          </div>
          <div>
            <SectionHeader isDark={isDark} title="Education" />
            <div className="space-y-8">
              <div className={`relative pl-8 border-l ${isDark ? 'border-zinc-800' : 'border-zinc-200'}`}>
                <h4 className="text-xl font-medium mb-1">Master of Science, Business Analytics</h4>
                <p className={`${isDark ? 'text-zinc-500' : 'text-slate-500'}`}>University of New Haven · GPA 4.0</p>
              </div>
              <div className={`relative pl-8 border-l ${isDark ? 'border-zinc-800' : 'border-zinc-200'}`}>
                <h4 className="text-xl font-medium mb-1">Bachelor of Science, Computer Science</h4>
                <p className={`${isDark ? 'text-zinc-500' : 'text-slate-500'}`}>Lovely Professional University · GPA 3.40</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-24 px-6 md:px-24 border-t border-zinc-900 text-center">
        <h2 className="text-4xl md:text-6xl font-light mb-12 tracking-tighter">
          Let's build something <span className="italic font-serif text-zinc-500">resilient.</span>
        </h2>
        <div className="flex justify-center gap-8 text-sm font-medium tracking-widest uppercase">
          <a href="#" onClick={(e) => { e.preventDefault(); setShowEmailModal(true); }} className="hover:text-white transition-colors">Email</a>
          <a href="https://www.linkedin.com/in/muppala-kalyan" target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors">LinkedIn</a>
          <a href="https://github.com/KalyanMuppala" target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors">GitHub</a>
          <a href="/portfolio/resume.pdf" target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors">Resume</a>
        </div>
        <p className="mt-24 text-xs tracking-widest uppercase text-zinc-700">© 2026 Kalyan Muppala. All rights reserved.</p>
      </footer>

      {/* Email Modal */}
      <AnimatePresence>
        {showEmailModal && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center p-6">
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={() => setShowEmailModal(false)} className="absolute inset-0 bg-black/60 backdrop-blur-sm" />
            <motion.div className={`relative w-full max-w-md p-8 rounded-3xl border shadow-2xl ${isDark ? 'bg-zinc-900 border-zinc-800 text-white' : 'bg-white border-zinc-200 text-zinc-900'}`}>
              <h3 className="text-2xl font-light mb-6">Get in touch</h3>
              <div className={`p-6 rounded-2xl border mb-8 flex items-center justify-between group cursor-pointer ${isDark ? 'bg-zinc-800/50 border-zinc-700' : 'bg-zinc-50 border-zinc-200'}`}
                onClick={() => { navigator.clipboard.writeText('kalyan.muppala7@gmail.com'); setCopied(true); setTimeout(() => setCopied(false), 2000); }}>
                <div className="flex items-center gap-4">
                  <Mail className="w-5 h-5" />
                  <div>
                    <div className="text-xs uppercase opacity-50">Email</div>
                    <div className="font-medium">kalyan.muppala7@gmail.com</div>
                  </div>
                </div>
                <div className="text-xs">{copied ? 'Copied!' : 'Copy'}</div>
              </div>
              <button onClick={() => setShowEmailModal(false)} className={`w-full py-4 rounded-2xl font-medium ${isDark ? 'bg-zinc-100 text-black' : 'bg-zinc-900 text-white'}`}>Close</button>
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
