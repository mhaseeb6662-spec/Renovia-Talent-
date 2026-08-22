import React from 'react';
import { X, Shield } from 'lucide-react';
import Button from './common/Button';

export const LegalModal = ({ title, isOpen, onClose }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-[#05070D]/85 backdrop-blur-xl animate-in fade-in duration-300">
      <div className="relative w-full max-w-2xl rounded-3xl bg-[#080B12] border border-slate-700/80 shadow-2xl overflow-hidden text-left">
        
        <div className="p-6 bg-gradient-to-r from-[#080B12] via-[#0D162B] to-[#080B12] border-b border-slate-800 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Shield className="w-5 h-5 text-blue-400" />
            <h3 className="text-h3 font-bold text-white">{title || 'Legal Document'}</h3>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="p-2 rounded-xl bg-slate-800 text-slate-400 hover:text-white hover:bg-slate-700 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="p-6 sm:p-8 space-y-4 text-body text-slate-300 font-normal leading-relaxed max-h-[70vh] overflow-y-auto">
          <p>
            <strong>Renovia Talent</strong> is committed to maintaining high standards of data protection, client privacy, and operational compliance.
          </p>
          
          <h4 className="text-white font-semibold pt-2">1. Data Privacy & Confidentiality</h4>
          <p>
            We collect and process personal and corporate information solely for the purpose of evaluating technology requirements, candidate placement, and executing professional business agreements. We do not sell or rent personal information to third parties.
          </p>

          <h4 className="text-white font-semibold pt-2">2. Service Delivery Standards</h4>
          <p>
            All engagements, including software development projects and staffing placements, are executed under formal client agreements outlining project scope, deliverables, intellectual property rights, and payment terms.
          </p>

          <h4 className="text-white font-semibold pt-2">3. Intellectual Property</h4>
          <p>
            Unless explicitly stated otherwise in a custom client contract, all custom software artifacts, designs, and deliverables produced by Renovia Talent for a client become the property of the client upon full payment.
          </p>
        </div>

        <div className="p-6 bg-[#05070D] border-t border-slate-800 flex justify-end">
          <Button variant="secondary" size="sm" onClick={onClose} className="w-auto">
            Close
          </Button>
        </div>
      </div>
    </div>
  );
};

export default LegalModal;
