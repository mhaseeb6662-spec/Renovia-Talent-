import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Code2, Smartphone, Cpu, Cloud, Building2, UserPlus, ArrowRight, CheckCircle2, Sparkles } from 'lucide-react';
import PageHero from '../components/common/PageHero';
import Container from '../components/common/Container';
import Button from '../components/common/Button';

const solutions = [
  {
    icon: Code2,
    title: 'Custom Software Development',
    description: 'We build tailored software applications designed specifically to solve your unique operational bottlenecks and scale with your growth.',
    benefit: 'Increase operational efficiency by up to 40%',
  },
  {
    icon: Smartphone,
    title: 'Web & Mobile Applications',
    description: 'Engage your users with lightning-fast, highly responsive web and mobile applications engineered for exceptional user experience.',
    benefit: 'Higher user retention and engagement rates',
  },
  {
    icon: Cpu,
    title: 'AI & Automation Solutions',
    description: 'Integrate intelligent automation and AI models into your existing workflows to reduce manual tasks and uncover data-driven insights.',
    benefit: 'Save hundreds of hours on manual processes',
  },
  {
    icon: Cloud,
    title: 'Cloud & Backend Systems',
    description: 'Modernize your infrastructure with secure, scalable, and highly available cloud architectures using AWS, Azure, or GCP.',
    benefit: '99.99% uptime and reduced infrastructure costs',
  },
  {
    icon: Building2,
    title: 'Digital Transformation',
    description: 'A holistic approach to modernizing your entire business model, transitioning legacy systems to agile, digital-first frameworks.',
    benefit: 'Future-proof your enterprise operations',
  },
  {
    icon: UserPlus,
    title: 'Talent & Recruitment Solutions',
    description: 'Overcome tech talent shortages. We source, vet, and place top-tier professional engineers and specialists to accelerate your projects.',
    benefit: 'Reduce time-to-hire by 50%',
  }
];

const processSteps = [
  { step: '01', title: 'Discovery', desc: 'We analyze your business challenge, existing systems, and long-term objectives.' },
  { step: '02', title: 'Planning', desc: 'Creating a strategic roadmap, defining architecture, and selecting the right tech stack.' },
  { step: '03', title: 'Design', desc: 'Crafting intuitive UI/UX and finalizing the technical blueprint.' },
  { step: '04', title: 'Development', desc: 'Agile sprints delivering functional, high-quality code and infrastructure.' },
  { step: '05', title: 'Testing', desc: 'Rigorous QA, automated testing, and security audits to ensure reliability.' },
  { step: '06', title: 'Launch & Support', desc: 'Smooth deployment followed by continuous monitoring and maintenance.' },
];

export const SolutionsPage = () => {
  const navigate = useNavigate();

  return (
    <main className="min-h-screen pb-20">
      <PageHero
        badge="Our Solutions"
        title="Solving Complex Business Problems"
        subtitle="We deliver robust technology and professional talent solutions designed to modernize your operations, accelerate growth, and give you a competitive edge."
        breadcrumb="Solutions"
      />

      {/* Solutions Grid */}
      <section className="py-24 bg-[#05070D]">
        <Container>
          <div className="flex flex-col items-center mb-16 text-center">
            <h2 className="text-h2 font-bold text-white mb-4">Targeted Business Solutions</h2>
            <p className="text-body-lg text-slate-400 max-w-2xl">
              Our core capabilities are focused on resolving your most pressing technical and operational challenges.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {solutions.map((sol, i) => {
              const Icon = sol.icon;
              return (
                <div key={i} className="group p-8 rounded-2xl bg-[#0B101A] border border-slate-800/80 hover:border-blue-500/30 hover:bg-[#0D1424] transition-all duration-300">
                  <div className="w-12 h-12 rounded-xl bg-blue-600/10 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
                    <Icon className="w-6 h-6 text-blue-400" />
                  </div>
                  <h3 className="text-xl font-bold text-white mb-3 group-hover:text-blue-300 transition-colors">{sol.title}</h3>
                  <p className="text-slate-400 text-sm leading-relaxed mb-6">{sol.description}</p>
                  <div className="flex items-start gap-2 pt-4 border-t border-slate-800/80 mt-auto">
                    <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                    <span className="text-xs font-semibold text-emerald-400/90">{sol.benefit}</span>
                  </div>
                </div>
              );
            })}
          </div>
        </Container>
      </section>

      {/* Approach Section */}
      <section className="py-24 bg-[#080B14] border-y border-slate-800/80">
        <Container>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <div>
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-500/10 border border-blue-400/20 text-blue-300 text-xs font-semibold mb-6">
                Our Approach
              </div>
              <h2 className="text-h2 font-bold text-white mb-6">From Business Challenge to Measurable Outcome</h2>
              <p className="text-slate-400 mb-6 text-lg">
                We don't just write code or fill seats; we act as a strategic partner. We bridge the gap between your high-level business goals and the technical execution required to achieve them.
              </p>
              <ul className="space-y-4 mb-8">
                {['Aligning technology with core business metrics', 'Minimizing operational friction and technical debt', 'Ensuring scalable, secure, and future-proof architectures'].map((item, i) => (
                  <li key={i} className="flex items-center gap-3 text-slate-300">
                    <div className="w-1.5 h-1.5 rounded-full bg-blue-500" />
                    {item}
                  </li>
                ))}
              </ul>
              <Button onClick={() => navigate('/services')} variant="secondary" icon={ArrowRight}>
                Explore Our Services
              </Button>
            </div>
            
            {/* Image/Visual Placeholder */}
            <div className="relative rounded-2xl overflow-hidden aspect-square lg:aspect-[4/3] bg-slate-900 border border-slate-800">
              <img 
                src="https://images.unsplash.com/photo-1551434678-e076c223a692?auto=format&fit=crop&q=80&w=1200" 
                alt="Technology team working" 
                className="w-full h-full object-cover opacity-60"
              />
              <div className="absolute inset-0 bg-gradient-to-tr from-blue-900/40 to-transparent mix-blend-overlay" />
            </div>
          </div>
        </Container>
      </section>

      {/* Process Section */}
      <section className="py-24 bg-[#05070D]">
        <Container>
          <div className="text-center mb-16">
            <h2 className="text-h2 font-bold text-white mb-4">Our Proven Delivery Process</h2>
            <p className="text-slate-400 max-w-2xl mx-auto">A structured, transparent methodology ensuring projects are delivered on time, within budget, and above expectations.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {processSteps.map((process, i) => (
              <div key={i} className="relative p-6 rounded-2xl bg-[#080B14] border border-slate-800/50">
                <div className="text-5xl font-black text-slate-800/50 absolute top-4 right-4 pointer-events-none">
                  {process.step}
                </div>
                <h3 className="text-lg font-bold text-white mt-4 mb-2 relative z-10">{process.title}</h3>
                <p className="text-slate-400 text-sm leading-relaxed relative z-10">{process.desc}</p>
              </div>
            ))}
          </div>
        </Container>
      </section>

      {/* Final CTA */}
      <section className="py-24 relative overflow-hidden">
        <div className="absolute inset-0 bg-blue-900/10" />
        <Container className="relative z-10 text-center max-w-3xl">
          <h2 className="text-4xl sm:text-5xl font-bold text-white mb-6">Ready to Solve Your Next Big Challenge?</h2>
          <p className="text-xl text-slate-300 mb-10">Let's discuss how our technology solutions and professional talent can accelerate your business objectives.</p>
          <Button onClick={() => navigate('/contact')} variant="primary" size="lg" icon={Sparkles}>
            Talk to Us Today
          </Button>
        </Container>
      </section>
    </main>
  );
};

export default SolutionsPage;
