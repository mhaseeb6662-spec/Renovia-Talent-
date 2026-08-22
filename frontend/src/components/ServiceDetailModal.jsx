import React from 'react';
import { X, CheckCircle2, Sparkles, ShieldCheck } from 'lucide-react';
import Button from './common/Button';

export const ServiceDetailModal = ({ service, onClose, onOpenContact }) => {
  if (!service) return null;

  const Icon = service.icon;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-[#05070D]/85 backdrop-blur-xl animate-in fade-in duration-300">
      <div className="relative w-full max-w-2xl rounded-3xl bg-[#080B12] border border-slate-700/80 shadow-2xl overflow-hidden text-left">
        
        {/* Header */}
        <div className="p-6 sm:p-8 bg-gradient-to-r from-[#080B12] via-[#0D162B] to-[#080B12] border-b border-slate-800 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-2xl bg-blue-500/20 border border-blue-400/40 flex items-center justify-center text-blue-400 shadow-md">
              <Icon className="w-6 h-6" />
            </div>
            <div>
              <span className="text-label text-blue-400 font-semibold">SERVICE {service.number}</span>
              <h3 className="text-h3 font-bold text-white">{service.title}</h3>
            </div>
          </div>

          <button
            type="button"
            onClick={onClose}
            className="p-2 rounded-xl bg-slate-800 text-slate-400 hover:text-white hover:bg-slate-700 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content */}
        <div className="p-6 sm:p-8 space-y-6 max-h-[75vh] overflow-y-auto">
          
          <div className="space-y-3">
            <h4 className="text-label text-slate-400 font-semibold">Overview</h4>
            <p className="text-body text-slate-200 font-normal leading-relaxed">
              {service.description}
            </p>
          </div>

          {/* Key Capabilities Bullet Points */}
          <div className="space-y-3 pt-2">
            <h4 className="text-label text-slate-400 font-semibold">Key Capabilities & Deliverables</h4>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {service.features.map((feature, idx) => (
                <div key={idx} className="p-3 rounded-xl bg-[#05070D] border border-slate-800 flex items-start gap-2.5">
                  <CheckCircle2 className="w-4 h-4 text-blue-400 shrink-0 mt-0.5" />
                  <span className="text-xs font-semibold text-slate-200">{feature}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Value Assurance Note */}
          <div className="p-4 rounded-2xl bg-blue-500/10 border border-blue-400/30 flex items-center gap-3">
            <ShieldCheck className="w-5 h-5 text-blue-400 shrink-0" />
            <p className="text-xs text-blue-200 font-normal">
              All services are delivered under Renovia Talent's high-standard service agreement, ensuring transparency, privacy, and continuous support.
            </p>
          </div>

          {/* Modal Action Buttons */}
          <div className="pt-4 border-t border-slate-800 flex items-center justify-between">
            <Button variant="ghost" size="md" onClick={onClose} className="w-auto">
              Close Window
            </Button>

            <Button
              variant="primary"
              size="md"
              onClick={() => {
                onClose();
                onOpenContact();
              }}
              icon={Sparkles}
              className="w-auto"
            >
              Inquire About This Service
            </Button>
          </div>

        </div>
      </div>
    </div>
  );
};

export default ServiceDetailModal;
