import React, { useState, useEffect } from 'react';
import Lenis from '@studio-freight/lenis';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import FaultyTerminal from './components/FaultyTerminal';
import { 
  Code2, 
  Database, 
  Globe, 
  Menu, 
  X, 
  ArrowRight, 
  ExternalLink,
  Github,
  Linkedin,
  Mail,
  Phone
} from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

function App() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [lenis, setLenis] = useState<Lenis | null>(null);

  useEffect(() => {
    // GSAP animations setup
    const ctx = gsap.context(() => {
      // Hero section animations
      gsap.fromTo('.hero-title', 
        { y: 100, opacity: 0 },
        { y: 0, opacity: 1, duration: 1.2, ease: 'power3.out', delay: 0.2 }
      );
      
      gsap.fromTo('.hero-subtitle', 
        { y: 50, opacity: 0 },
        { y: 0, opacity: 1, duration: 1, ease: 'power3.out', delay: 0.5 }
      );
      
      gsap.fromTo('.hero-buttons', 
        { y: 30, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.8, ease: 'power3.out', delay: 0.8 }
      );

      // Section animations on scroll
      gsap.utils.toArray('.animate-on-scroll').forEach((element: any) => {
        gsap.fromTo(element, 
          { y: 60, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            duration: 0.8,
            ease: 'power3.out',
            scrollTrigger: {
              trigger: element,
              start: 'top 85%',
              end: 'bottom 15%',
              toggleActions: 'play none none reverse'
            }
          }
        );
      });

      // Service cards stagger animation
      gsap.fromTo('.service-card', 
        { y: 80, opacity: 0, scale: 0.9 },
        {
          y: 0,
          opacity: 1,
          scale: 1,
          duration: 0.6,
          ease: 'power3.out',
          stagger: 0.2,
          scrollTrigger: {
            trigger: '.services-grid',
            start: 'top 80%',
            toggleActions: 'play none none reverse'
          }
        }
      );

      // Project cards stagger animation
      gsap.fromTo('.project-card', 
        { y: 80, opacity: 0, scale: 0.95 },
        {
          y: 0,
          opacity: 1,
          scale: 1,
          duration: 0.7,
          ease: 'power3.out',
          stagger: 0.15,
          scrollTrigger: {
            trigger: '.projects-grid',
            start: 'top 80%',
            toggleActions: 'play none none reverse'
          }
        }
      );

      // Testimonial cards animation
      gsap.fromTo('.testimonial-card', 
        { y: 60, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.8,
          ease: 'power3.out',
          stagger: 0.2,
          scrollTrigger: {
            trigger: '.testimonials-grid',
            start: 'top 80%',
            toggleActions: 'play none none reverse'
          }
        }
      );
    });

    // Initialize Lenis
    const lenisInstance = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      direction: 'vertical',
      gestureDirection: 'vertical',
      smooth: true,
      mouseMultiplier: 1,
      smoothTouch: false,
      touchMultiplier: 2,
      infinite: false,
      normalizeWheel: true,
    });

    setLenis(lenisInstance);
    
    // Connect Lenis with GSAP ScrollTrigger
    lenisInstance.on('scroll', ScrollTrigger.update);
    
    gsap.ticker.add((time) => {
      lenisInstance.raf(time * 1000);
    });
    
    gsap.ticker.lagSmoothing(0);


    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    
    window.addEventListener('scroll', handleScroll);
    
    return () => {
      window.removeEventListener('scroll', handleScroll);
      lenisInstance.destroy();
      ctx.revert();
      ScrollTrigger.getAll().forEach(trigger => trigger.kill());
    };
  }, []);

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element && lenis) {
      lenis.scrollTo(element, { 
        duration: 2,
        easing: (t) => 1 - Math.pow(1 - t, 3)
      });
      setIsMenuOpen(false);
    }
  };

  return (
    <div className="min-h-screen bg-white text-black">
      {/* Invisible Navbar */}
      <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled ? 'bg-black/10 backdrop-blur-sm' : 'bg-transparent'
      }`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            {/* Logo */}
            <div className="flex-shrink-0">
              <button 
                onClick={() => scrollToSection('hero')}
                className="text-2xl font-bold text-white hover:text-gray-300 transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-black"
              >
                Harsh Dev
              </button>
            </div>

            {/* Desktop Navigation */}
            <div className="hidden md:block">
              <div className="ml-10 flex items-baseline space-x-4">
                {['Home', 'Services', 'Projects', 'Contact'].map((item) => (
                  <button
                    key={item}
                    onClick={() => scrollToSection(item.toLowerCase() === 'home' ? 'hero' : item.toLowerCase())}
                    className="text-white hover:text-gray-300 px-3 py-2 text-sm font-medium transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-black"
                  >
                    {item}
                  </button>
                ))}
              </div>
            </div>

            {/* Mobile menu button */}
            <div className="md:hidden">
              <button
                onClick={() => setIsMenuOpen(!isMenuOpen)}
                className="text-white hover:text-gray-300 p-2 transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-black"
              >
                {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Navigation Menu */}
        {isMenuOpen && (
          <div className="md:hidden bg-black/95 backdrop-blur-sm">
            <div className="px-2 pt-2 pb-3 space-y-1">
              {['Home', 'Services', 'Projects', 'Contact'].map((item) => (
                <button
                  key={item}
                  onClick={() => scrollToSection(item.toLowerCase() === 'home' ? 'hero' : item.toLowerCase())}
                  className="text-white hover:text-gray-300 block px-3 py-2 text-base font-medium w-full text-left transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-black"
                >
                  {item}
                </button>
              ))}
            </div>
          </div>
        )}
      </nav>

      {/* Hero Section */}
      <section id="hero" className="bg-black text-white min-h-screen flex items-center justify-center relative overflow-hidden">
        {/* Animated Terminal Background */}
        <div className="absolute inset-0 opacity-20">
          <FaultyTerminal
            scale={1.5}
            gridMul={[2, 1]}
            digitSize={1.2}
            timeScale={1}
            pause={false}
            scanlineIntensity={1}
            glitchAmount={1}
            flickerAmount={1}
            noiseAmp={1}
            chromaticAberration={0}
            dither={0}
            curvature={0}
            tint="#ffffff"
            mouseReact={true}
            mouseStrength={0.5}
            pageLoadAnimation={false}
            brightness={1}
          />
        </div>
        
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
                className="bg-white text-black px-8 py-4 text-lg font-semibold rounded-lg hover:bg-gray-100 transform hover:-translate-y-1 transition-all duration-200 focus:outline-none focus:ring-4 focus:ring-white focus:ring-offset-4 focus:ring-offset-black inline-flex items-center gap-2"
              >
                Hire Me
                <ArrowRight size={20} />
              </button>
              <button 
                onClick={() => scrollToSection('projects')}
                className="border-2 border-white text-white px-8 py-4 text-lg font-semibold rounded-lg hover:bg-white hover:text-black transform hover:-translate-y-1 transition-all duration-200 focus:outline-none focus:ring-4 focus:ring-white focus:ring-offset-4 focus:ring-offset-black inline-flex items-center gap-2"
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
                className="service-card p-8 border-2 border-black rounded-lg hover:bg-black hover:text-white transform hover:-translate-y-2 transition-all duration-300 group"
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
              A selection of recent work showcasing modern web development techniques
            </p>
          </div>

          <div className="projects-grid grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              {
                title: "E-Commerce Platform",
                tech: "React, Node.js, PostgreSQL",
                description: "Full-stack e-commerce solution with payment processing"
              },
              {
                title: "Task Management App",
                tech: "TypeScript, Express, MongoDB",
                description: "Collaborative project management with real-time updates"
              },
              {
                title: "Analytics Dashboard",
                tech: "React, Python, AWS",
                description: "Data visualization platform with machine learning insights"
              },
              {
                title: "Social Media App",
                tech: "Next.js, Supabase, Tailwind",
                description: "Modern social platform with real-time messaging"
              },
              {
                title: "Booking System",
                tech: "Vue.js, Laravel, MySQL",
                description: "Appointment scheduling with calendar integration"
              },
              {
                title: "Learning Platform",
                tech: "React, Django, Redis",
                description: "Educational content delivery with progress tracking"
              }
            ].map((project, index) => (
              <div 
                key={index}
                className="project-card border-2 border-white rounded-lg overflow-hidden hover:bg-white hover:text-black transform hover:-translate-y-2 transition-all duration-300 group"
              >
                <div className="h-48 bg-gray-800 group-hover:bg-gray-200 flex items-center justify-center">
                  <Code2 size={64} className="text-gray-600 group-hover:text-gray-400" />
                </div>
                <div className="p-6">
                  <h3 className="text-xl font-bold mb-2">{project.title}</h3>
                  <p className="text-sm text-gray-400 group-hover:text-gray-600 mb-3">{project.tech}</p>
                  <p className="text-gray-300 group-hover:text-gray-700 leading-relaxed">
                    {project.description}
                  </p>
                </div>
              </div>
            ))}
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
              <div className="marquee-content flex gap-8 animate-marquee pause-marquee">
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
                ].concat([
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
                ]).map((testimonial, index) => (
                  <div 
                    key={index}
                    className="testimonial-card flex-shrink-0 w-80 p-6 border-2 border-black rounded-lg hover:bg-black hover:text-white transition-all duration-300 group"
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
                href="mailto:harsh@example.com"
                className="bg-white text-black px-8 py-4 text-lg font-semibold rounded-lg hover:bg-gray-100 transform hover:-translate-y-1 transition-all duration-200 focus:outline-none focus:ring-4 focus:ring-white focus:ring-offset-4 focus:ring-offset-black inline-flex items-center gap-3"
              >
                <Mail size={20} />
                Send Email
              </a>
              <a 
                href="tel:+1234567890"
                className="border-2 border-white text-white px-8 py-4 text-lg font-semibold rounded-lg hover:bg-white hover:text-black transform hover:-translate-y-1 transition-all duration-200 focus:outline-none focus:ring-4 focus:ring-white focus:ring-offset-4 focus:ring-offset-black inline-flex items-center gap-3"
              >
                <Phone size={20} />
                Call Now
              </a>
            </div>

            <div className="flex gap-6 mt-8">
              {[
                { icon: <Github size={24} />, href: "https://github.com", label: "GitHub" },
                { icon: <Linkedin size={24} />, href: "https://linkedin.com", label: "LinkedIn" },
                { icon: <Mail size={24} />, href: "mailto:harsh@example.com", label: "Email" }
              ].map((social, index) => (
                <a
                  key={index}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-3 border-2 border-white rounded-lg hover:bg-white hover:text-black transform hover:-translate-y-1 transition-all duration-200 focus:outline-none focus:ring-4 focus:ring-white focus:ring-offset-4 focus:ring-offset-black"
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