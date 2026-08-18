import React, { useState } from 'react';
import { Plus, HelpCircle, Sparkles } from 'lucide-react';
import Container from '../common/Container';
import useScrollReveal from '../../hooks/useScrollReveal';

export const AboutFAQSection = () => {
  const sectionRef = useScrollReveal({ stagger: 0.08 });
  const [openIndex, setOpenIndex] = useState(0);

  const faqs = [
    {
      question: 'What core services does Renovia Talent provide?',
      answer: 'Renovia Talent is a technology and professional services company. We deliver end-to-end custom software and website development, IT infrastructure support, professional talent recruitment, dedicated remote workforce placement, and business operations support.',
    },
    {
      question: 'How does Renovia Talent approach software and website development?',
      answer: 'We build digital products around specific client business requirements. Our engineering workflow emphasizes clean scalable architecture, intuitive user experience design, thorough security compliance, and long-term technical maintainability.',
    },
    {
      question: 'What types of staffing and recruitment models are available?',
      answer: 'We offer versatile workforce solutions including specialized IT talent placement, direct executive recruitment, project-based contract staffing, and dedicated remote team extension tailored to your headcount requirements.',
    },
    {
      question: 'How do you ensure seamless integration with remote teams?',
      answer: 'Our remote workforce solutions include structured onboarding, direct collaborative communication frameworks, time-zone alignment, performance tracking, and ongoing operational support to ensure seamless client integration.',
    },
    {
      question: 'What IT support and digital transformation services do you offer?',
      answer: 'We provide continuous network infrastructure monitoring, cloud ecosystem optimization, system maintenance, cybersecurity best practices, and strategic technology consulting to modernize operational workflows.',
    },
    {
      question: 'How quickly can a consultation or project scoping begin?',
      answer: 'Our team acknowledges every inquiry within 24 business hours. We conduct a thorough requirement discovery session to provide a clear, transparent scope and project implementation roadmap.',
    },
    {
      question: 'How does Renovia Talent protect client data and confidentiality?',
      answer: 'We enforce strict enterprise data privacy protocols, compliant security controls, and comprehensive Non-Disclosure Agreements (NDAs) across all software development, talent placement, and consulting engagements.',
    },
  ];

  const toggleFAQ = (index) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section
      id="about-faq"
      ref={sectionRef}
      className="relative py-24 lg:py-32 bg-[#05070D] overflow-hidden border-t border-slate-800/80"
    >
      {/* High-Quality Technology Background Image */}
      <img
        src="/about-faq-tech-bg.jpg"
        alt="Renovia Technology Background"
        className="absolute inset-0 w-full h-full object-cover opacity-25 scale-105 pointer-events-none select-none"
      />

      {/* Dark Overlay Vignette (Guarantees 100% Text Readability) */}
      <div className="absolute inset-0 bg-gradient-to-b from-[#05070D] via-[#05070D]/85 to-[#05070D] z-10 pointer-events-none" />
      <div className="absolute inset-0 bg-[#05070D]/50 backdrop-blur-[2px] z-10 pointer-events-none" />

      {/* Ambient Blue Radial Glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[850px] h-[450px] bg-blue-600/10 rounded-full blur-3xl pointer-events-none z-10" />

      <Container className="relative z-20 max-w-4xl mx-auto space-y-12">
        
        {/* Section Header */}
        <div className="text-center space-y-4 max-w-2xl mx-auto">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#101621]/90 border border-blue-500/40 text-blue-300 text-label font-semibold backdrop-blur-xl shadow-lg shadow-blue-500/10">
            <Sparkles className="w-4 h-4 text-blue-400" />
            <span>FAQ</span>
          </div>

          <h2 className="text-h1 font-bold text-white tracking-tight [text-wrap:balance]">
            Frequently Asked Questions
          </h2>

          <p className="text-body-lg text-slate-300 font-normal leading-relaxed">
            Everything you need to know about Renovia Talent's technology solutions, recruitment placement, remote teams, and business support.
          </p>
        </div>

        {/* Accordion List */}
        <div className="space-y-4">
          {faqs.map((faq, index) => {
            const isOpen = openIndex === index;
            return (
              <div
                key={index}
                data-reveal
                className={`group rounded-2xl border transition-all duration-300 backdrop-blur-xl overflow-hidden ${
                  isOpen
                    ? 'bg-[#0A0F1D]/95 border-blue-500/50 shadow-xl shadow-blue-500/10'
                    : 'bg-[#080B12]/80 border-slate-800/80 hover:border-blue-500/40 hover:-translate-y-0.5'
                }`}
              >
                {/* Question Header */}
                <button
                  type="button"
                  onClick={() => toggleFAQ(index)}
                  className="w-full p-6 sm:p-7 text-left flex items-center justify-between gap-4 focus:outline-none focus:ring-2 focus:ring-blue-500 rounded-2xl"
                  aria-expanded={isOpen}
                >
                  <div className="flex items-center gap-3.5">
                    <div className={`w-8 h-8 rounded-xl flex items-center justify-center shrink-0 transition-colors ${
                      isOpen ? 'bg-blue-500/20 text-blue-400 border border-blue-400/40' : 'bg-slate-900 text-slate-400 border border-slate-800'
                    }`}>
                      <HelpCircle className="w-4 h-4" />
                    </div>

                    <span className={`text-h3 font-semibold transition-colors ${
                      isOpen ? 'text-blue-300' : 'text-white group-hover:text-blue-200'
                    }`}>
                      {faq.question}
                    </span>
                  </div>

                  <div className={`w-8 h-8 rounded-full bg-slate-900/80 border border-slate-800 flex items-center justify-center text-slate-400 transition-transform duration-300 shrink-0 ${
                    isOpen ? 'rotate-45 bg-blue-500/20 border-blue-400/40 text-blue-300' : ''
                  }`}>
                    <Plus className="w-4 h-4" />
                  </div>
                </button>

                {/* Animated Answer Body */}
                <div
                  className={`transition-all duration-300 ease-in-out overflow-hidden ${
                    isOpen ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'
                  }`}
                >
                  <div className="px-6 pb-6 sm:px-7 sm:pb-7 pt-0 text-body text-slate-300 font-normal leading-relaxed border-t border-slate-800/50 mt-1">
                    <p className="pt-4">{faq.answer}</p>
                  </div>
                </div>

              </div>
            );
          })}
        </div>

      </Container>
    </section>
  );
};

export default AboutFAQSection;
