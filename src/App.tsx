import React, { useState, useEffect } from 'react';
import Lenis from '@studio-freight/lenis';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import OptimizedTerminal from './components/OptimizedTerminal';
import BubbleMenu from './components/BubbleMenu';
import ImageCarousel from './components/ImageCarousel';
import { usePerformanceOptimization } from './hooks/usePerformanceOptimization';
import { 
  Code2, 
  Database, 
  Globe, 
  ArrowRight, 
  ExternalLink,
  Github,
  Linkedin,
  Mail,
  Phone,
  Trophy,
  Calendar,
  Award
} from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

function App() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [lenis, setLenis] = useState<Lenis | null>(null);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { capabilities, settings, isReady } = usePerformanceOptimization();

  useEffect(() => {
    if (!isReady || !settings) return;

    // GSAP animations setup
    const ctx = gsap.context(() => {
      const duration = settings.animationDuration;
      const ease = settings.enableComplexAnimations ? 'power3.out' : 'power2.out';

      // Hero section animations
      if (settings.enableComplexAnimations) {
        gsap.fromTo('.hero-title', 
          { y: 100, opacity: 0 },
          { y: 0, opacity: 1, duration: duration * 1.5, ease, delay: 0.2 }
        );
        
        gsap.fromTo('.hero-subtitle', 
          { y: 50, opacity: 0 },
          { y: 0, opacity: 1, duration: duration * 1.25, ease, delay: 0.5 }
        );
        
        gsap.fromTo('.hero-buttons', 
          { y: 30, opacity: 0 },
          { y: 0, opacity: 1, duration: duration, ease, delay: 0.8 }
        );
      } else {
        // Simple fade-in for low-end devices
        gsap.set(['.hero-title', '.hero-subtitle', '.hero-buttons'], { opacity: 0 });
        gsap.to(['.hero-title', '.hero-subtitle', '.hero-buttons'], {
          opacity: 1,
          duration: duration,
          stagger: 0.1
        });
      }

      // Section animations on scroll
      if (settings.enableComplexAnimations) {
        gsap.utils.toArray('.animate-on-scroll').forEach((element: any) => {
          gsap.fromTo(element, 
            { y: 60, opacity: 0 },
            {
              y: 0,
              opacity: 1,
              duration: duration,
              ease,
              scrollTrigger: {
                trigger: element,
                start: 'top 85%',
                end: 'bottom 15%',
                toggleActions: 'play none none reverse'
              }
            }
          );
        });
      }

      // Service cards stagger animation
      if (settings.enableComplexAnimations) {
        gsap.fromTo('.service-card', 
          { y: 80, opacity: 0, scale: 0.9 },
          {
            y: 0,
            opacity: 1,
            scale: 1,
            duration: duration * 0.75,
            ease,
            stagger: settings.throttleAnimations ? 0.1 : 0.2,
            scrollTrigger: {
              trigger: '.services-grid',
              start: 'top 80%',
              toggleActions: 'play none none reverse'
            }
          }
        );
      }

      // Project cards stagger animation
      if (settings.enableComplexAnimations) {
        gsap.fromTo('.project-card', 
          { y: 80, opacity: 0, scale: 0.95 },
          {
            y: 0,
            opacity: 1,
            scale: 1,
            duration: duration * 0.875,
            ease,
            stagger: settings.throttleAnimations ? 0.08 : 0.15,
            scrollTrigger: {
              trigger: '.projects-grid',
              start: 'top 80%',
              toggleActions: 'play none none reverse'
            }
          }
        );
      }

      // Testimonial cards animation
      if (settings.enableComplexAnimations) {
        gsap.fromTo('.testimonial-card', 
          { y: 60, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            duration: duration,
            ease,
            stagger: settings.throttleAnimations ? 0.1 : 0.2,
            scrollTrigger: {
              trigger: '.testimonials-grid',
              start: 'top 80%',
              toggleActions: 'play none none reverse'
            }
          }
        );
      }
    });

    // Initialize Lenis only if smooth scrolling is enabled
    let lenisInstance: Lenis | null = null;
    if (settings.enableSmoothScrolling) {
      lenisInstance = new Lenis({
        duration: settings.throttleAnimations ? 0.8 : 1.2,
        easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
        direction: 'vertical',
        gestureDirection: 'vertical',
        smooth: true,
        mouseMultiplier: settings.throttleAnimations ? 0.5 : 1,
        smoothTouch: false,
        touchMultiplier: settings.throttleAnimations ? 1 : 2,
        infinite: false,
        normalizeWheel: true,
      });

      setLenis(lenisInstance);
      
      // Connect Lenis with GSAP ScrollTrigger
      lenisInstance.on('scroll', ScrollTrigger.update);
      
      gsap.ticker.add((time) => {
        lenisInstance!.raf(time * 1000);
      });
      
      gsap.ticker.lagSmoothing(0);
    }


    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    
    window.addEventListener('scroll', handleScroll);
    
    return () => {
      window.removeEventListener('scroll', handleScroll);
      if (lenisInstance) {
        lenisInstance.destroy();
      }
      ctx.revert();
      ScrollTrigger.getAll().forEach(trigger => trigger.kill());
    };
  }, [isReady, settings]);

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element && lenis && settings?.enableSmoothScrolling) {
      lenis.scrollTo(element, { 
        duration: settings.throttleAnimations ? 1 : 2,
        easing: (t) => 1 - Math.pow(1 - t, 3)
      });
      setIsMenuOpen(false);
    } else if (element) {
      // Fallback to native scrolling
      element.scrollIntoView({ behavior: 'smooth' });
      setIsMenuOpen(false);
    }
  };

  const menuItems = [
    {
      label: 'home',
      href: '#hero',
      ariaLabel: 'Home',
      rotation: -8,
      hoverStyles: { bgColor: '#3b82f6', textColor: '#ffffff' }
    },
    {
      label: 'services',
      href: '#services',
      ariaLabel: 'Services',
      rotation: 8,
      hoverStyles: { bgColor: '#10b981', textColor: '#ffffff' }
    },
    {
      label: 'projects',
      href: '#projects',
      ariaLabel: 'Projects',
      rotation: 8,
      hoverStyles: { bgColor: '#f59e0b', textColor: '#ffffff' }
    },
    {
      label: 'achievements',
      href: '#achievements',
      ariaLabel: 'Achievements',
      rotation: -8,
      hoverStyles: { bgColor: '#ef4444', textColor: '#ffffff' }
    },
    {
      label: 'contact',
      href: '#contact',
      ariaLabel: 'Contact',
      rotation: -8,
      hoverStyles: { bgColor: '#8b5cf6', textColor: '#ffffff' }
    }
  ];


  // Show loading state while detecting capabilities
  if (!isReady || !capabilities) {
    return (
      <div className="min-h-screen bg-black flex items-center justify-center">
        <div className="text-white text-xl">Loading...</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white text-black">
      {/* BubbleMenu Navigation */}
      <BubbleMenu
        logo={<span style={{ fontWeight: 700, fontSize: '1.5rem', color: '#000' }}>Harsh Dev</span>}
        items={menuItems}
        onMenuClick={setIsMenuOpen}
        menuAriaLabel="Toggle navigation"
        menuBg="#ffffff"
        menuContentColor="#111111"
        useFixedPosition={true}
        animationEase={settings.enableComplexAnimations ? "back.out(1.5)" : "power2.out"}
        animationDuration={settings.animationDuration}
        staggerDelay={settings.throttleAnimations ? 0.06 : 0.12}
      />

      {/* Hero Section */}
      <section id="hero" className="bg-black text-white min-h-screen flex items-center justify-center relative overflow-hidden">
        {/* Animated Terminal Background */}
        <OptimizedTerminal 
          capabilities={capabilities}
          className="absolute inset-0 opacity-20"
        />
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
          <div className="text-center relative z-10">
            <h1 className="hero-title text-4xl md:text-6xl lg:text-7xl font-bold mb-6 leading-tight">
              I Build Scalable Full Stack
              <br />
              <span className="text-white">Web Applications</span>
            </h1>
            <p className="hero-subtitle text-xl md:text-2xl text-gray-300 mb-12 max-w-3xl mx-auto leading-relaxed">
              Modern, responsive, performance-driven solutions for businesses.
            </p>
            
            <div className="hero-buttons flex flex-col sm:flex-row gap-6 justify-center items-center">
              <button 
                onClick={() => scrollToSection('contact')}
                className={`bg-white text-black px-8 py-4 text-lg font-semibold rounded-lg hover:bg-gray-100 focus:outline-none focus:ring-4 focus:ring-white focus:ring-offset-4 focus:ring-offset-black inline-flex items-center gap-2 ${
                  settings.enableComplexAnimations ? 'transform hover:-translate-y-1 transition-all duration-200' : 'transition-colors duration-200'
                }`}
              >
                Hire Me
                <ArrowRight size={20} />
              </button>
              <button 
                onClick={() => scrollToSection('projects')}
                className={`border-2 border-white text-white px-8 py-4 text-lg font-semibold rounded-lg hover:bg-white hover:text-black focus:outline-none focus:ring-4 focus:ring-white focus:ring-offset-4 focus:ring-offset-black inline-flex items-center gap-2 ${
                  settings.enableComplexAnimations ? 'transform hover:-translate-y-1 transition-all duration-200' : 'transition-colors duration-200'
                }`}
              >
                View Projects
                <ExternalLink size={20} />
              </button>
            </div>
          </div>
        </div>

      </section>

      {/* Services Section */}
      <section id="services" className="bg-white text-black py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16 animate-on-scroll">
            <h2 className="text-4xl md:text-5xl font-bold mb-6">Services</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Comprehensive full-stack development services to bring your ideas to life
            </p>
          </div>

          <div className="services-grid grid md:grid-cols-3 gap-8">
            {[
              {
                icon: <Code2 size={48} />,
                title: "Frontend Development",
                description: "Modern React applications with responsive design and seamless user experiences."
              },
              {
                icon: <Database size={48} />,
                title: "Backend Development",
                description: "Robust server architecture with secure APIs and efficient database management."
              },
              {
                icon: <Globe size={48} />,
                title: "Full Stack Solutions",
                description: "End-to-end web applications with complete feature sets and deployment."
              }
            ].map((service, index) => (
              <div 
                key={index}
                className={`service-card p-8 border-2 border-black rounded-lg hover:bg-black hover:text-white group ${
                  settings.enableComplexAnimations ? 'transform hover:-translate-y-2 transition-all duration-300' : 'transition-colors duration-200'
                }`}
              >
                <div className="mb-6 group-hover:text-white">
                  {service.icon}
                </div>
                <h3 className="text-2xl font-bold mb-4">{service.title}</h3>
                <p className="text-gray-600 group-hover:text-gray-300 leading-relaxed">
                  {service.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Projects Section */}
      <section id="projects" className="bg-black text-white py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16 animate-on-scroll">
            <h2 className="text-4xl md:text-5xl font-bold mb-6">Featured Projects</h2>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto">
              A selection of my recent projects showcasing AI, real-time collaboration, and e-commerce solutions
            </p>
          </div>

          <div className="projects-grid grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              {
                title: "Verifai",
                tech: "React.js, Tailwind CSS, Firebase, Gemini API, D3.js",
                description: "AI-powered Fake News Detection and Content Analysis Platform with multilingual support and image verification",
                link: "https://verifai-by-house-stark.vercel.app",
                image: "/Verifai.png"
              },
              {
                title: "LiveDocs",
                tech: "Next.js, Tailwind CSS, Liveblocks, Clerk",
                description: "Real-time collaborative document editor with user authentication and version history",
                link: "https://livedocs-by-harsh-rathod.vercel.app/sign-in",
                image: "/Live-Docs.png"
              },
              {
                title: "SkyStore",
                tech: "Next.js, Tailwind CSS, Appwrite",
                description: "Modern e-commerce web application with secure authentication and smooth shopping experience",
                link: "https://sky-store-by-harsh-rathod.vercel.app/sign-in",
                image: "/Sky-Store.png"
              }
            ].map((project, index) => (
              <div 
                key={index}
                className={`project-card border-2 border-white rounded-lg overflow-hidden hover:bg-white hover:text-black group ${
                  settings.enableComplexAnimations ? 'transform hover:-translate-y-2 transition-all duration-300' : 'transition-colors duration-200'
                }`}
              >
                <div className="h-48 bg-gray-800 group-hover:bg-gray-200 flex items-center justify-center overflow-hidden relative">
                  {project.image ? (
                    <img 
                      src={project.image} 
                      alt={`${project.title} screenshot`}
                      className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                    />
                  ) : (
                    <Code2 size={64} className="text-gray-600 group-hover:text-gray-400" />
                  )}
                </div>
                <div className="p-6">
                  <h3 className="text-xl font-bold mb-2">{project.title}</h3>
                  <p className="text-sm text-gray-400 group-hover:text-gray-600 mb-3">{project.tech}</p>
                  <p className="text-gray-300 group-hover:text-gray-700 leading-relaxed">
                    {project.description}
                  </p>
                  {project.link && (
                    <a
                      href={project.link}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 text-white group-hover:text-black font-semibold hover:underline"
                    >
                      View Project
                      <ExternalLink size={16} />
                    </a>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Achievements Section */}
      <section id="achievements" className="bg-white text-black py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16 animate-on-scroll">
            <h2 className="text-4xl md:text-5xl font-bold mb-6">Achievements</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Recognition and awards from hackathons and competitive programming events
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-12 max-w-6xl mx-auto">
            {/* First Achievement */}
            <div className={`group relative bg-black text-white rounded-3xl overflow-hidden ${settings.enableComplexAnimations ? 'transform transition-all duration-700 hover:scale-105 hover:shadow-2xl' : 'transition-all duration-300'}`}>
              <div className="absolute inset-0 bg-gradient-to-br from-gray-900 via-black to-gray-800 opacity-90"></div>
              
              <div className="relative z-10 p-8 md:p-12 h-full flex flex-col">
                <div className="flex items-start justify-between mb-8">
                  <div className={`p-4 bg-white rounded-2xl ${settings.enableComplexAnimations ? 'transform transition-all duration-500 group-hover:rotate-12 group-hover:scale-110' : ''}`}>
                    <Trophy size={32} className="text-black" />
                  </div>
                  <div className="bg-white text-black px-6 py-2 rounded-full font-bold text-sm tracking-wide">
                    WINNER
                  </div>
                </div>
                
                <div className="flex-1 flex flex-col">
                  <h3 className="text-2xl md:text-3xl font-bold mb-4 leading-tight">
                    Google Developer Group
                  </h3>
                  <p className="text-lg text-gray-300 mb-6 font-medium">
                    Code the Cloud Edition
                  </p>
                  
                  {/* Certificate Display */}
                  <div className="flex-1 mb-8">
                    <div className={`bg-white rounded-2xl p-1 ${settings.enableComplexAnimations ? 'transform transition-all duration-500 group-hover:scale-105 group-hover:shadow-xl' : 'transition-all duration-300'}`}>
                      <div className="bg-gray-100 rounded-xl aspect-[4/3] flex items-center justify-center overflow-hidden">
                        <img 
                          src="https://raw.githubusercontent.com/panduthegang/Verifai-News_Detection-System/refs/heads/main/public/Harsh-CCD.jpg" 
                          alt="Google Developer Group Winner Certificate"
                          className="w-full h-full object-cover rounded-xl"
                        />
                      </div>
                    </div>
                  </div>
                  
                  <p className="text-gray-300 leading-relaxed">
                    Winner of Google's premier cloud hackathon, competing against hundreds of developers worldwide.
                  </p>
                </div>
                
                <div className={`mt-8 w-full h-1 bg-white rounded-full ${settings.enableComplexAnimations ? 'transform transition-all duration-700 group-hover:bg-gray-300' : ''}`}></div>
              </div>
            </div>

            {/* Second Achievement */}
            <div className={`group relative bg-white text-black border-4 border-black rounded-3xl overflow-hidden ${settings.enableComplexAnimations ? 'transform transition-all duration-700 hover:scale-105 hover:shadow-2xl hover:bg-black hover:text-white' : 'transition-all duration-300'}`}>
              <div className="relative z-10 p-8 md:p-12 h-full flex flex-col">
                <div className="flex items-start justify-between mb-8">
                  <div className={`p-4 bg-black group-hover:bg-white rounded-2xl ${settings.enableComplexAnimations ? 'transform transition-all duration-500 group-hover:rotate-12 group-hover:scale-110' : ''}`}>
                    <Award size={32} className="text-white group-hover:text-black" />
                  </div>
                  <div className="bg-black group-hover:bg-white text-white group-hover:text-black px-6 py-2 rounded-full font-bold text-sm tracking-wide transition-colors duration-300">
                    RUNNER-UP
                  </div>
                </div>
                
                <div className="flex-1 flex flex-col">
                  <h3 className="text-2xl md:text-3xl font-bold mb-4 leading-tight">
                    Suprathon
                  </h3>
                  <p className="text-lg text-gray-600 group-hover:text-gray-300 mb-6 font-medium transition-colors duration-300">
                    by Suprazo Technologies
                  </p>
                  
                  {/* Certificate Display */}
                  <div className="flex-1 mb-8">
                    <div className={`bg-black group-hover:bg-white rounded-2xl p-1 transition-colors duration-300 ${settings.enableComplexAnimations ? 'transform transition-all duration-500 group-hover:scale-105 group-hover:shadow-xl' : ''}`}>
                      <div className="bg-gray-800 group-hover:bg-gray-100 rounded-xl aspect-[4/3] flex items-center justify-center overflow-hidden transition-colors duration-300">
                        <img 
                          src="https://raw.githubusercontent.com/panduthegang/Verifai-News_Detection-System/refs/heads/main/public/Harsh-Suprathon.png" 
                          alt="Suprathon Runner-up Certificate"
                          className="w-full h-full object-cover rounded-xl"
                        />
                      </div>
                    </div>
                  </div>
                  
                  <p className="text-gray-600 group-hover:text-gray-300 leading-relaxed transition-colors duration-300">
                    Runner-up in Suprazo Technologies' intensive hackathon, showcasing innovative full-stack solutions.
                  </p>
                </div>
                
                <div className={`mt-8 w-full h-1 bg-black group-hover:bg-white rounded-full transition-colors duration-300`}></div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="bg-white text-black py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16 animate-on-scroll">
            <h2 className="text-4xl md:text-5xl font-bold mb-6">What Clients Say</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Testimonials from satisfied clients across various industries
            </p>
          </div>

          <div className="relative overflow-hidden">
            <div className="marquee-container">
              <div className={`marquee-content flex gap-8 ${settings.enableComplexAnimations ? 'animate-marquee pause-marquee' : ''}`}>
                {[
                  {
                    quote: "Harsh delivered an exceptional e-commerce platform that exceeded our expectations. The attention to detail and performance optimization was outstanding.",
                    author: "Sarah Johnson",
                    role: "CEO, TechStart Inc."
                  },
                  {
                    quote: "Working with Harsh was a seamless experience. The project was delivered on time with clean, maintainable code and excellent documentation.",
                    author: "Michael Chen",
                    role: "CTO, DataFlow Solutions"
                  },
                  {
                    quote: "The full-stack application Harsh built for us has been running flawlessly for over a year. Highly recommend for any complex web development needs.",
                    author: "Emily Rodriguez",
                    role: "Product Manager, InnovateCorp"
                  },
                  {
                    quote: "The scalability and performance of the solution Harsh built has allowed us to grow from 1K to 100K users seamlessly.",
                    author: "David Park",
                    role: "Founder, GrowthTech"
                  },
                  {
                    quote: "Exceptional problem-solving skills and deep understanding of modern web technologies. Delivered beyond expectations.",
                    author: "Lisa Wang",
                    role: "VP Engineering, CloudScale"
                  },
                  {
                    quote: "The most professional developer we've worked with. Clean code, great communication, and delivered on time.",
                    author: "James Miller",
                    role: "CTO, StartupFlow"
                  }
                ].concat(settings.enableComplexAnimations ? [
                  {
                    quote: "Harsh delivered an exceptional e-commerce platform that exceeded our expectations. The attention to detail and performance optimization was outstanding.",
                    author: "Sarah Johnson",
                    role: "CEO, TechStart Inc."
                  },
                  {
                    quote: "Working with Harsh was a seamless experience. The project was delivered on time with clean, maintainable code and excellent documentation.",
                    author: "Michael Chen",
                    role: "CTO, DataFlow Solutions"
                  },
                  {
                    quote: "The full-stack application Harsh built for us has been running flawlessly for over a year. Highly recommend for any complex web development needs.",
                    author: "Emily Rodriguez",
                    role: "Product Manager, InnovateCorp"
                  },
                  {
                    quote: "The scalability and performance of the solution Harsh built has allowed us to grow from 1K to 100K users seamlessly.",
                    author: "David Park",
                    role: "Founder, GrowthTech"
                  },
                  {
                    quote: "Exceptional problem-solving skills and deep understanding of modern web technologies. Delivered beyond expectations.",
                    author: "Lisa Wang",
                    role: "VP Engineering, CloudScale"
                  },
                  {
                    quote: "The most professional developer we've worked with. Clean code, great communication, and delivered on time.",
                    author: "James Miller",
                    role: "CTO, StartupFlow"
                  }
                ] : []).map((testimonial, index) => (
                  <div 
                    key={index}
                    className={`testimonial-card flex-shrink-0 w-80 p-6 border-2 border-black rounded-lg hover:bg-black hover:text-white group ${
                      settings.enableComplexAnimations ? 'transition-all duration-300' : 'transition-colors duration-200'
                    }`}
                  >
                    <p className="text-base mb-4 leading-relaxed">"{testimonial.quote}"</p>
                    <div className="pt-4 border-t-2 border-gray-300 group-hover:border-gray-600">
                      <p className="font-bold text-sm">{testimonial.author}</p>
                      <p className="text-gray-600 group-hover:text-gray-300 text-xs">{testimonial.role}</p>
                    </div>
                  </div>
                ))}
                </div>
              </div>
          </div>
        </div>
      </section>

      {/* Contact/Footer Section */}
      <section id="contact" className="bg-black text-white py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16 animate-on-scroll">
            <h2 className="text-4xl md:text-5xl font-bold mb-6">Let's Work Together</h2>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto">
              Ready to bring your project to life? Get in touch and let's discuss your next web application.
            </p>
          </div>

          <div className="flex flex-col items-center gap-8">
            <div className="flex flex-col sm:flex-row gap-6">
              <a 
                href="mailto:panduthegang@gmail.com"
                className={`bg-white text-black px-8 py-4 text-lg font-semibold rounded-lg hover:bg-gray-100 focus:outline-none focus:ring-4 focus:ring-white focus:ring-offset-4 focus:ring-offset-black inline-flex items-center gap-3 ${
                  settings.enableComplexAnimations ? 'transform hover:-translate-y-1 transition-all duration-200' : 'transition-colors duration-200'
                }`}
              >
                <Mail size={20} />
                Send Email
              </a>
              <a 
                href="tel:+918451811626"
                className={`border-2 border-white text-white px-8 py-4 text-lg font-semibold rounded-lg hover:bg-white hover:text-black focus:outline-none focus:ring-4 focus:ring-white focus:ring-offset-4 focus:ring-offset-black inline-flex items-center gap-3 ${
                  settings.enableComplexAnimations ? 'transform hover:-translate-y-1 transition-all duration-200' : 'transition-colors duration-200'
                }`}
              >
                <Phone size={20} />
                Call Now
              </a>
            </div>

            <div className="flex gap-6 mt-8">
              {[
                { icon: <Github size={24} />, href: "https://github.com/panduthegang", label: "GitHub" },
                { icon: <Linkedin size={24} />, href: "https://www.linkedin.com/in/harsh-rathod-2591b0292/", label: "LinkedIn" },
                { icon: <Mail size={24} />, href: "mailto:panduthegang@gmail.com", label: "Email" }
              ].map((social, index) => (
                <a
                  key={index}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`p-3 border-2 border-white rounded-lg hover:bg-white hover:text-black focus:outline-none focus:ring-4 focus:ring-white focus:ring-offset-4 focus:ring-offset-black ${
                    settings.enableComplexAnimations ? 'transform hover:-translate-y-1 transition-all duration-200' : 'transition-colors duration-200'
                  }`}
                  aria-label={social.label}
                >
                  {social.icon}
                </a>
              ))}
            </div>
          </div>

          <div className="text-center mt-16 pt-8 border-t border-gray-800">
            <p className="text-gray-400">
              © 2024 Harsh Dev. All rights reserved. | Full Stack Developer
            </p>
          </div>
        </div>
      </section>

    </div>
  );
}

export default App;