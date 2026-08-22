import React from 'react';
import { Code2, Cloud, Layers, ShieldCheck, CheckCircle2 } from 'lucide-react';
import Container from '../common/Container';
import SectionHeading from '../common/SectionHeading';
import useScrollReveal from '../../hooks/useScrollReveal';

export const TechStackSection = () => {
  const sectionRef = useScrollReveal({ stagger: 0.1 });

  const techCategories = [
    {
      category: 'Software & Web Stack',
      icon: Code2,
      skills: ['React / Next.js', 'Node.js / Express', 'Python / Django', 'TypeScript', 'Tailwind CSS', 'GraphQL / REST APIs'],
    },
    {
      category: 'Cloud & Infrastructure',
      icon: Cloud,
      skills: ['AWS / Cloud Architecture', 'Docker & Kubernetes', 'CI/CD Pipelines', 'Database Management', 'DevOps & Security'],
    },
    {
      category: 'Talent & Workforce Domains',
      icon: Layers,
      skills: ['Full-Stack Engineers', 'Mobile Developers (iOS/Android)', 'QA Automation Engineers', 'Remote Operations Managers', 'Customer Success Leads'],
    },
  ];

  return (
    <section ref={sectionRef} className="relative py-24 lg:py-32 bg-[#080B12] overflow-hidden border-t border-slate-800/80">
      {/* Background Radial Glow */}
      <div className="absolute top-1/2 right-1/4 -translate-y-1/2 w-[600px] h-[300px] bg-indigo-600/10 rounded-full blur-3xl pointer-events-none" />

      <Container className="relative z-10">
        <SectionHeading
          badge="Capabilities & Stacks"
          title="Technologies & Technical Expertise"
          subtitle="We work with proven engineering stacks and specialized domain experts to build modern digital products and assemble high-performing workforce teams."
          centered
          className="mb-16"
        />

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-stretch">
          {techCategories.map((cat, idx) => {
            const Icon = cat.icon;
            return (
              <div
                key={idx}
                data-reveal
                className="p-8 rounded-3xl bg-[#090E1A]/90 border border-slate-800/80 hover:border-blue-500/40 backdrop-blur-xl shadow-xl space-y-6 flex flex-col justify-between transition-all duration-300 hover:-translate-y-1"
              >
                <div className="space-y-6">
                  <div className="flex items-center gap-3.5 pb-4 border-b border-slate-800/80">
                    <div className="w-12 h-12 rounded-2xl bg-blue-500/10 border border-blue-400/30 flex items-center justify-center text-blue-400 shrink-0">
                      <Icon className="w-6 h-6" />
                    </div>
                    <h3 className="text-h3 font-semibold text-white">
                      {cat.category}
                    </h3>
                  </div>

                  <div className="flex flex-wrap gap-2.5">
                    {cat.skills.map((skill, sIdx) => (
                      <div
                        key={sIdx}
                        className="inline-flex items-center gap-2 px-3.5 py-2 rounded-xl bg-[#05070D] border border-slate-800 text-xs font-semibold text-slate-200 hover:border-blue-500/50 hover:text-blue-300 transition-colors"
                      >
                        <CheckCircle2 className="w-3.5 h-3.5 text-blue-400 shrink-0" />
                        <span>{skill}</span>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="pt-4 border-t border-slate-800/80 flex items-center gap-2 text-xs text-slate-400 font-medium">
                  <ShieldCheck className="w-4 h-4 text-blue-400" />
                  <span>Production-Grade Quality</span>
                </div>
              </div>
            );
          })}
        </div>
      </Container>
    </section>
  );
};

export default TechStackSection;
