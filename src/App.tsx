import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Terminal, 
  User, 
  Code2, 
  Briefcase, 
  Cpu, 
  Github, 
  Linkedin, 
  Mail, 
  ExternalLink,
  ChevronRight,
  Command,
  Shield,
  Zap,
  Lock
} from 'lucide-react';

// --- Types ---
type Section = 'home' | 'about' | 'experience' | 'skills' | 'projects' | 'contact' | 'education' | 'languages';

interface Project {
  title: string;
  description: string;
  tech: string[];
  link?: string;
  github?: string;
}

interface Experience {
  company: string;
  role: string;
  period: string;
  description: string[];
}

// --- Constants ---
const PROJECTS: Project[] = [
  {
    title: "Digital Customer Onboarding Platform",
    description: "Led the development of a secure onboarding system for major banks including Bank Islam and Alliance Bank.",
    tech: ["PHP", "JavaScript", "MySQL", "SIT/UAT"],
    github: "https://github.com"
  },
  {
    title: "Enterprise Claim & Recruitment Systems",
    description: "Architected and developed internal enterprise tools for claim processing and recruitment management.",
    tech: ["Svelte", "Python", "Django", "PostgreSQL"],
    github: "https://github.com"
  },
  {
    title: "IoT Mobile Design Guidelines",
    description: "Researched and designed comprehensive guidelines for IoT-enabled mobile applications.",
    tech: ["IoT", "Mobile Design", "R&D"],
    link: "#"
  }
];

const EXPERIENCES: Experience[] = [
  {
    company: "TDCX / Google Malaysia",
    role: "Technical Solutions Architect",
    period: "03/2025 - Present",
    description: [
      "Specializing in Google Ads, GTM, GMC, and GA4 implementations.",
      "Providing technical consulting and troubleshooting for high-value advertisers.",
      "Assisting clients with conversion tracking, remarketing, and tag configuration via GTM/JS.",
      "Delivering detailed technical documentation and debugging insights to stakeholders."
    ]
  },
  {
    company: "Juris Technologies (Juristech)",
    role: "Technical Lead / Specialist Software Engineer",
    period: "04/2024 - 03/2025",
    description: [
      "Tech Lead for Bank Islam Retail and Non-retail projects.",
      "Managed development, SIT, and UAT environments for Digital Customer Onboarding platforms.",
      "Developed integrations with CBS (Silverlake), Infoconnect, and internal JOM systems.",
      "Performed unit testing and defect fixing across multiple banking projects."
    ]
  },
  {
    company: "Fusionex Group",
    role: "Software Engineer (Solution Consultant)",
    period: "02/2023 - 03/2024",
    description: [
      "Designed prototypes and gathered functional requirements from stakeholders.",
      "Developed frontend and backend components for recruitment and analytics projects.",
      "Implemented automated testing using Selenium and Python/Django.",
      "Conducted security and load testing using OWASP ZAP and Locust."
    ]
  },
  {
    company: "Fusionex Group",
    role: "Software Engineer Intern",
    period: "12/2022 - 02/2023",
    description: [
      "Supported the development team in building enterprise solutions.",
      "Assisted in unit testing and bug fixing for core modules.",
      "Gained hands-on experience with enterprise-level software development lifecycles."
    ]
  },
  {
    company: "Human-Machine Collaboration Lab (Sunway HOME Lab)",
    role: "Undergraduate Researcher",
    period: "09/2021 - 03/2023",
    description: [
      "Helped lecturers conduct R&D on several IT-related topics.",
      "Guided newcomers on journal writing and research methodologies.",
      "Research Area: Design Guideline for IoT mobile applications."
    ]
  },
  {
    company: "Silverlake Axis, SMC",
    role: "Information Technology / Microservices Intern",
    period: "12/2020 - 02/2021",
    description: [
      "Worked with Java Springboot and Swagger API for microservices development.",
      "Utilized Docker, Kubernetes, and Docker Swarm for container orchestration.",
      "Deployed and managed services on Google Cloud Platform (Kubernetes Engine)."
    ]
  }
];

const SKILLS = {
  google: ["Google Ads", "GTM", "GA4", "GMC", "Tag Assistant"],
  frontend: ["Svelte", "React", "JavaScript", "HTML/CSS", "Bootstrap", "AJAX"],
  backend: ["Python", "Django", "PHP", "Java Springboot", "Node.js"],
  devops: ["Docker", "Kubernetes", "Git", "Gitlab", "Azure DevOps"],
  testing: ["Selenium", "JMeter", "Locust", "OWASP ZAP"]
};

const EDUCATION = [
  {
    degree: "Bachelor of Software Engineering (Hons)",
    school: "Sunway University / Lancaster University, UK",
    period: "04/2021 - 04/2023",
    details: "First Class Honours, CGPA: 3.65. ACE Scholarship holder."
  },
  {
    degree: "Diploma in Information Technology",
    school: "Sunway College",
    period: "03/2019 - 03/2021",
    details: "Distinction, CGPA: 3.85. Entrance Scholarship holder."
  }
];

const CERTIFICATES = [
  "Google Ads - Measurement Certification (2025)",
  "Google AI-Powered Shopping Ads Certification (2025)",
  "Google Ads Search Certification (2025)",
  "Google Ads Display Certification (2025)",
  "Advance and Continuing Excellence (ACE) Scholarship (2022)",
  "Certification of Participation for Make It Challenge (MIC) 2021",
  "Google Analytics Individual Qualification (2021)",
  "Google Creative Certification Exam (2021)",
  "Google Mobile Experience Certification (2021)",
  "Google Python Crash Course (2021)",
  "UiPath AI Computer Vision (2021)",
  "UiPath Get Started with RPA Development (2021)",
  "UiPath Orchestrator Personal Workspaces (2021)",
  "Gitlab 101 & 201 Certified (2021)",
  "Complete Certification of Introduction to Big Data (UCSD) (2021)"
];

const LANGUAGES = [
  { name: "English", level: 5 },
  { name: "Mandarin", level: 5 },
  { name: "Cantonese", level: 5 },
  { name: "Malay", level: 4 }
];

// --- Components ---

const MatrixBackground = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    const characters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789$+-*/=%\"'#&_(),.;:?!\\|{}<>[]^~";
    const fontSize = 14;
    const columns = canvas.width / fontSize;
    const drops: number[] = [];

    for (let i = 0; i < columns; i++) {
      drops[i] = 1;
    }

    const draw = () => {
      ctx.fillStyle = 'rgba(0, 0, 0, 0.05)';
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      ctx.fillStyle = '#0f0';
      ctx.font = `${fontSize}px monospace`;

      for (let i = 0; i < drops.length; i++) {
        const text = characters.charAt(Math.floor(Math.random() * characters.length));
        ctx.fillText(text, i * fontSize, drops[i] * fontSize);

        if (drops[i] * fontSize > canvas.height && Math.random() > 0.975) {
          drops[i] = 0;
        }
        drops[i]++;
      }
    };

    const interval = setInterval(draw, 33);
    const handleResize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };

    window.addEventListener('resize', handleResize);
    return () => {
      clearInterval(interval);
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  return <canvas ref={canvasRef} className="fixed top-0 left-0 w-full h-full opacity-20 pointer-events-none" />;
};

const Typewriter = ({ text, delay = 50 }: { text: string; delay?: number }) => {
  const [currentText, setCurrentText] = useState('');
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    if (currentIndex < text.length) {
      const timeout = setTimeout(() => {
        setCurrentText(prev => prev + text[currentIndex]);
        setCurrentIndex(prev => prev + 1);
      }, delay);
      return () => clearTimeout(timeout);
    }
  }, [currentIndex, delay, text]);

  return <span>{currentText}</span>;
};

const NavItem = ({ section, active, onClick, icon: Icon }: { section: Section; active: boolean; onClick: () => void; icon: any }) => (
  <button
    onClick={onClick}
    className={`flex items-center gap-2 px-4 py-2 transition-all duration-300 border-b-2 ${
      active 
        ? 'border-green-500 text-green-500 bg-green-500/10' 
        : 'border-transparent text-green-800 hover:text-green-500 hover:bg-green-500/5'
    }`}
  >
    <Icon size={16} />
    <span className="uppercase tracking-widest text-xs font-bold">{section}</span>
  </button>
);

export default function App() {
  const [activeSection, setActiveSection] = useState<Section>('home');
  const [booting, setBooting] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => setBooting(false), 2000);
    return () => clearTimeout(timer);
  }, []);

  if (booting) {
    return (
      <div className="fixed inset-0 bg-black flex items-center justify-center crt-effect">
        <div className="text-green-500 font-mono text-sm space-y-2">
          <p><Typewriter text="> INITIALIZING SYSTEM BOOT..." delay={30} /></p>
          <p><Typewriter text="> LOADING KERNEL MODULES..." delay={20} /></p>
          <p><Typewriter text="> ESTABLISHING SECURE CONNECTION..." delay={40} /></p>
          <p><Typewriter text="> ACCESS GRANTED: CHIN_WAI_SIONG_V2.0" delay={50} /></p>
          <motion.div 
            initial={{ width: 0 }}
            animate={{ width: '100%' }}
            transition={{ duration: 1.5, ease: "easeInOut" }}
            className="h-1 bg-green-500 mt-4"
          />
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-black text-green-500 font-mono selection:bg-green-500 selection:text-black crt-effect">
      <MatrixBackground />
      <div className="scanline" />

      {/* Header / Nav */}
      <header className="fixed top-0 left-0 w-full z-50 bg-black/80 backdrop-blur-md border-b border-green-900/50">
        <div className="max-w-6xl mx-auto px-4 flex items-center justify-between h-16">
          <div className="flex items-center gap-2">
            <Shield className="text-green-500 animate-pulse" size={24} />
            <span className="text-xl font-bold tracking-tighter glitch" data-text="CHIN_WAI_SIONG">CHIN_WAI_SIONG</span>
          </div>
          <nav className="hidden md:flex items-center">
            <NavItem section="home" active={activeSection === 'home'} onClick={() => setActiveSection('home')} icon={Terminal} />
            <NavItem section="about" active={activeSection === 'about'} onClick={() => setActiveSection('about')} icon={User} />
            <NavItem section="experience" active={activeSection === 'experience'} onClick={() => setActiveSection('experience')} icon={Briefcase} />
            <NavItem section="skills" active={activeSection === 'skills'} onClick={() => setActiveSection('skills')} icon={Cpu} />
            <NavItem section="projects" active={activeSection === 'projects'} onClick={() => setActiveSection('projects')} icon={Code2} />
            <NavItem section="education" active={activeSection === 'education'} onClick={() => setActiveSection('education')} icon={Lock} />
            <NavItem section="languages" active={activeSection === 'languages'} onClick={() => setActiveSection('languages')} icon={Mail} />
          </nav>
          <div className="flex items-center gap-4">
            <a href="https://github.com" target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors">
              <Github size={20} />
            </a>
            <a href="https://linkedin.com/in/waisiong00" target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors">
              <Linkedin size={20} />
            </a>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="pt-24 pb-12 px-4 max-w-6xl mx-auto relative z-10">
        <AnimatePresence mode="wait">
          {activeSection === 'home' && (
            <motion.section
              key="home"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="min-h-[70vh] flex flex-col justify-center"
            >
              <div className="space-y-6">
                <div className="inline-block px-3 py-1 border border-green-500/30 bg-green-500/5 rounded text-xs uppercase tracking-widest">
                  System Status: Online
                </div>
                <h1 className="text-5xl md:text-7xl font-bold tracking-tighter leading-none">
                  SOFTWARE <br />
                  <span className="text-white">ENGINEER</span>
                </h1>
                <p className="text-lg md:text-xl text-green-800 max-w-2xl leading-relaxed">
                  Specializing in building high-performance distributed systems, 
                  neural architectures, and secure web applications. 
                  Passionate about clean code and system optimization.
                </p>
                <div className="flex flex-wrap gap-4 pt-4">
                  <button 
                    onClick={() => setActiveSection('projects')}
                    className="px-8 py-3 bg-green-500 text-black font-bold uppercase tracking-widest hover:bg-white transition-all flex items-center gap-2"
                  >
                    <Command size={18} />
                    View Projects
                  </button>
                  <button 
                    onClick={() => setActiveSection('about')}
                    className="px-8 py-3 border border-green-500 text-green-500 font-bold uppercase tracking-widest hover:bg-green-500/10 transition-all flex items-center gap-2"
                  >
                    <User size={18} />
                    About Me
                  </button>
                </div>
              </div>
            </motion.section>
          )}

          {activeSection === 'about' && (
            <motion.section
              key="about"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              className="space-y-8"
            >
              <div className="flex items-center gap-4 border-b border-green-900 pb-4">
                <User size={32} />
                <h2 className="text-3xl font-bold uppercase tracking-tighter">Identity_Profile</h2>
              </div>
              <div className="grid md:grid-cols-2 gap-12">
                <div className="space-y-6 text-green-400 leading-relaxed">
                  <p>
                    I am a software engineer with a deep fascination for how complex systems interact. 
                    My journey in technology started with a curiosity about security and evolved into 
                    a passion for building robust, scalable software.
                  </p>
                  <p>
                    I believe in "Coding Best Practices" not just as a set of rules, but as a philosophy 
                    of craftsmanship. Clean code, comprehensive testing, and thoughtful architecture 
                    are the foundations of everything I build.
                  </p>
                  <div className="p-4 border border-green-900 bg-green-900/10 rounded-lg space-y-2">
                    <div className="flex items-center gap-2 text-green-500 font-bold">
                      <Lock size={16} />
                      <span>Security First Mindset</span>
                    </div>
                    <p className="text-xs text-green-700">
                      Every line of code is written with security and performance in mind. 
                      I prioritize zero-trust architectures and data integrity.
                    </p>
                  </div>
                </div>
                <div className="relative group">
                  <div className="absolute -inset-1 bg-green-500 rounded-lg blur opacity-25 group-hover:opacity-50 transition duration-1000 group-hover:duration-200"></div>
                  <div className="relative bg-black border border-green-900 p-8 rounded-lg space-y-4">
                    <h3 className="text-xl font-bold text-white uppercase tracking-widest">System_Specs</h3>
                    <div className="space-y-3">
                      {[
                        { label: "Location", value: "Kuala Lumpur, MY" },
                        { label: "Focus", value: "Technical Solutions / Software Eng" },
                        { label: "Experience", value: "5+ Years" },
                        { label: "Status", value: "Active / Online" }
                      ].map((spec, i) => (
                        <div key={i} className="flex justify-between border-b border-green-900/30 pb-2">
                          <span className="text-green-800 text-xs uppercase">{spec.label}</span>
                          <span className="text-green-500 text-sm">{spec.value}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
              
              {/* Certificates Section */}
              <div className="pt-8">
                <h3 className="text-xl font-bold text-white uppercase tracking-widest mb-4">Certifications_Log</h3>
                <div className="grid md:grid-cols-2 gap-4">
                  {CERTIFICATES.map((cert, i) => (
                    <div key={i} className="flex items-center gap-3 p-3 border border-green-900/50 bg-green-900/5 rounded">
                      <Lock size={14} className="text-green-700" />
                      <span className="text-xs text-green-400">{cert}</span>
                    </div>
                  ))}
                </div>
              </div>
            </motion.section>
          )}

          {activeSection === 'experience' && (
            <motion.section
              key="experience"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="space-y-8"
            >
              <div className="flex items-center gap-4 border-b border-green-900 pb-4">
                <Briefcase size={32} />
                <h2 className="text-3xl font-bold uppercase tracking-tighter">Work_History</h2>
              </div>
              <div className="space-y-12">
                {EXPERIENCES.map((exp, i) => (
                  <div key={i} className="relative pl-8 border-l border-green-900">
                    <div className="absolute left-[-5px] top-0 w-[9px] h-[9px] bg-green-500 rounded-full shadow-[0_0_10px_#0f0]" />
                    <div className="space-y-2">
                      <div className="flex flex-wrap justify-between items-start gap-2">
                        <div>
                          <h3 className="text-xl font-bold text-white">{exp.role}</h3>
                          <p className="text-green-500 font-bold">{exp.company}</p>
                        </div>
                        <span className="text-xs bg-green-900/30 px-2 py-1 rounded border border-green-900">{exp.period}</span>
                      </div>
                      <ul className="space-y-2 pt-2">
                        {exp.description.map((item, j) => (
                          <li key={j} className="flex gap-2 text-sm text-green-400">
                            <ChevronRight size={16} className="shrink-0 text-green-600" />
                            <span>{item}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                ))}
              </div>
            </motion.section>
          )}

          {activeSection === 'skills' && (
            <motion.section
              key="skills"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="space-y-8"
            >
              <div className="flex items-center gap-4 border-b border-green-900 pb-4">
                <Cpu size={32} />
                <h2 className="text-3xl font-bold uppercase tracking-tighter">Tech_Stack</h2>
              </div>
              <div className="grid md:grid-cols-3 gap-6">
                {Object.entries(SKILLS).map(([category, items], i) => (
                  <div key={i} className="border border-green-900 bg-green-900/5 p-6 rounded-lg space-y-4 hover:border-green-500/50 transition-colors">
                    <h3 className="text-lg font-bold text-white uppercase tracking-widest border-b border-green-900 pb-2">{category}</h3>
                    <div className="flex flex-wrap gap-2">
                      {items.map((skill, j) => (
                        <span key={j} className="text-xs px-2 py-1 bg-green-500/10 border border-green-500/20 rounded hover:bg-green-500 hover:text-black transition-all cursor-default">
                          {skill}
                        </span>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
              <div className="pt-8">
                <div className="p-6 border border-dashed border-green-900 rounded-lg flex flex-col md:flex-row items-center gap-6">
                  <Zap className="text-yellow-500" size={48} />
                  <div className="space-y-2 text-center md:text-left">
                    <h4 className="text-xl font-bold text-white">Continuous Learning</h4>
                    <p className="text-sm text-green-700">
                      Currently exploring: Rust Systems Programming, WebAssembly Optimization, and Zero-Knowledge Proofs.
                    </p>
                  </div>
                </div>
              </div>
            </motion.section>
          )}

          {activeSection === 'projects' && (
            <motion.section
              key="projects"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="space-y-8"
            >
              <div className="flex items-center gap-4 border-b border-green-900 pb-4">
                <Code2 size={32} />
                <h2 className="text-3xl font-bold uppercase tracking-tighter">Active_Deployments</h2>
              </div>
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                {PROJECTS.map((project, i) => (
                  <div key={i} className="group relative border border-green-900 bg-black p-6 rounded-lg flex flex-col h-full hover:border-green-500 transition-all">
                    <div className="space-y-4 flex-grow">
                      <div className="flex justify-between items-start">
                        <Terminal size={24} className="text-green-800 group-hover:text-green-500 transition-colors" />
                        <div className="flex gap-3">
                          {project.github && (
                            <a href={project.github} target="_blank" rel="noopener noreferrer" className="text-green-800 hover:text-white transition-colors">
                              <Github size={18} />
                            </a>
                          )}
                          {project.link && (
                            <a href={project.link} target="_blank" rel="noopener noreferrer" className="text-green-800 hover:text-white transition-colors">
                              <ExternalLink size={18} />
                            </a>
                          )}
                        </div>
                      </div>
                      <h3 className="text-xl font-bold text-white group-hover:text-green-400 transition-colors">{project.title}</h3>
                      <p className="text-sm text-green-600 leading-relaxed">{project.description}</p>
                      <div className="flex flex-wrap gap-2 pt-2">
                        {project.tech.map((t, j) => (
                          <span key={j} className="text-[10px] uppercase font-bold tracking-tighter text-green-800">#{t}</span>
                        ))}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </motion.section>
          )}

          {activeSection === 'education' && (
            <motion.section
              key="education"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 20 }}
              className="space-y-8"
            >
              <div className="flex items-center gap-4 border-b border-green-900 pb-4">
                <Lock size={32} />
                <h2 className="text-3xl font-bold uppercase tracking-tighter">Academic_Records</h2>
              </div>
              <div className="space-y-8">
                {EDUCATION.map((edu, i) => (
                  <div key={i} className="border border-green-900/50 bg-green-900/5 p-6 rounded-lg space-y-2">
                    <div className="flex justify-between items-start">
                      <h3 className="text-xl font-bold text-white">{edu.degree}</h3>
                      <span className="text-xs bg-green-900/30 px-2 py-1 rounded border border-green-900">{edu.period}</span>
                    </div>
                    <p className="text-green-500 font-bold">{edu.school}</p>
                    <p className="text-sm text-green-700">{edu.details}</p>
                  </div>
                ))}
              </div>
            </motion.section>
          )}

          {activeSection === 'languages' && (
            <motion.section
              key="languages"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="space-y-8"
            >
              <div className="flex items-center gap-4 border-b border-green-900 pb-4">
                <Mail size={32} />
                <h2 className="text-3xl font-bold uppercase tracking-tighter">Communication_Protocols</h2>
              </div>
              <div className="grid md:grid-cols-2 gap-6">
                {LANGUAGES.map((lang, i) => (
                  <div key={i} className="border border-green-900 bg-green-900/5 p-6 rounded-lg flex justify-between items-center">
                    <span className="text-xl font-bold text-white uppercase tracking-widest">{lang.name}</span>
                    <div className="flex gap-1">
                      {[1, 2, 3, 4, 5].map((dot) => (
                        <div 
                          key={dot} 
                          className={`w-3 h-3 rounded-full ${dot <= lang.level ? 'bg-green-500 shadow-[0_0_8px_#0f0]' : 'bg-green-900/30'}`} 
                        />
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </motion.section>
          )}
        </AnimatePresence>
      </main>

      {/* Footer */}
      <footer className="border-t border-green-900/50 py-8 mt-12 bg-black/50 backdrop-blur-sm">
        <div className="max-w-6xl mx-auto px-4 flex flex-col md:flex-row justify-between items-center gap-4">
          <div className="text-xs text-green-900 uppercase tracking-widest">
            &copy; 2026 WAI_SIONG // ALL RIGHTS RESERVED
          </div>
          <div className="flex items-center gap-6">
            <a href="mailto:legendvaiz7@gmail.com" className="flex items-center gap-2 text-xs hover:text-white transition-colors">
              <Mail size={14} />
              CONTACT_ME
            </a>
            <div className="flex items-center gap-2 text-xs text-green-900">
              <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
              SYSTEM_STABLE
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
