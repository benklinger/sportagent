'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FormData } from '@/lib/types';
import TeamSelection from './TeamSelection';
import MatchSelection from './MatchSelection';
import PreferencesSelection from './PreferencesSelection';
import UserDetails from './UserDetails';
import { ArrowLeft, ArrowRight, CheckCircle2 } from 'lucide-react';

const STEPS = [
  { id: 'team', title: 'בחר קבוצה' },
  { id: 'match', title: 'בחר משחק' },
  { id: 'prefs', title: 'בחר חבילה' },
  { id: 'user', title: 'פרטי קשר' },
];

export default function SportsForm() {
  const [currentStep, setCurrentStep] = useState(0);
  const [formData, setFormData] = useState<FormData>({
    selectedTeamId: '',
    startDate: new Date().toISOString().split('T')[0],
    selectedMatchId: '',
    preferences: {
      flight: false,
      hotel: false,
      tickets: true,
    },
    firstName: '',
    phone: '',
  });
  const [isSubmitted, setIsSubmitted] = useState(false);

  const nextStep = () => setCurrentStep((prev) => Math.min(prev + 1, STEPS.length - 1));
  const prevStep = () => setCurrentStep((prev) => Math.max(prev - 1, 0));

  const updateFormData = (updates: Partial<FormData>) => {
    setFormData((prev) => ({ ...prev, ...updates }));
  };

  const togglePreference = (key: 'flight' | 'hotel' | 'tickets') => {
    setFormData((prev) => ({
      ...prev,
      preferences: {
        ...prev.preferences,
        [key]: !prev.preferences[key],
      },
    }));
  };

  const canGoNext = () => {
    if (currentStep === 0) return !!formData.selectedTeamId;
    if (currentStep === 1) return !!formData.selectedMatchId;
    if (currentStep === 2) return true; // Preferences are optional
    if (currentStep === 3) {
      const phoneDigits = formData.phone.replace(/\D/g, '');
      return !!formData.firstName && phoneDigits.length === 10;
    }
    return false;
  };

  const handleSubmit = async () => {
    console.log('Form data:', formData);
    setIsSubmitted(true);
  };

  if (isSubmitted) {
    return (
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        className="bg-white p-8 md:p-12 rounded-3xl shadow-2xl text-center max-w-md mx-auto"
      >
        <div className="w-20 h-20 bg-green-100 text-green-600 rounded-full flex items-center justify-center mx-auto mb-6">
          <CheckCircle2 size={40} />
        </div>
        <h2 className="text-3xl font-bold text-gray-900 mb-4" dir="rtl">הבקשה נשלחה!</h2>
        <p className="text-gray-600 mb-8" dir="rtl">
          תודה {formData.firstName}! קיבלנו את הבקשה שלך לכרטיסים וניצור איתך קשר בקרוב.
        </p>
        <button
          onClick={() => window.location.reload()}
          className="w-full py-4 bg-blue-600 text-white rounded-xl font-bold hover:bg-blue-700 transition-colors"
        >
          חזרה להתחלה
        </button>
      </motion.div>
    );
  }

  return (
    <div className="w-full max-w-2xl mx-auto">
      {/* Progress Bar */}
      <div className="mb-12">
        <div className="flex flex-row-reverse justify-between mb-4">
          {STEPS.map((step, idx) => (
            <div
              key={step.id}
              className={`flex flex-col items-center gap-2 ${
                idx <= currentStep ? 'text-blue-600' : 'text-gray-400'
              }`}
            >
              <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold border-2 transition-all ${
                idx < currentStep ? 'bg-blue-600 border-blue-600 text-white' : 
                idx === currentStep ? 'border-blue-600 text-blue-600' : 'border-gray-200'
              }`}>
                {idx < currentStep ? <CheckCircle2 size={16} /> : idx + 1}
              </div>
              <span className="text-xs font-bold uppercase tracking-wider hidden sm:block">{step.title}</span>
            </div>
          ))}
        </div>
        <div className="h-2 bg-gray-100 rounded-full overflow-hidden flex flex-row-reverse">
          <motion.div
            className="h-full bg-blue-600"
            initial={{ width: '0%' }}
            animate={{ width: `${((currentStep + 1) / STEPS.length) * 100}%` }}
          />
        </div>
      </div>

      <div className="bg-white p-6 md:p-10 rounded-3xl shadow-xl border border-gray-100">
        <h2 className="text-2xl font-bold text-gray-900 mb-8 text-right">{STEPS[currentStep].title}</h2>
        
        <div className="min-h-[300px]">
          <AnimatePresence mode="wait">
            <motion.div
              key={currentStep}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.3 }}
            >
              {currentStep === 0 && (
                <TeamSelection
                  selectedTeamId={formData.selectedTeamId}
                  onSelect={(id) => updateFormData({ selectedTeamId: id })}
                />
              )}
              {currentStep === 1 && (
                <MatchSelection
                  selectedTeamId={formData.selectedTeamId}
                  startDate={formData.startDate || ''}
                  selectedMatchId={formData.selectedMatchId || ''}
                  onDateChange={(date) => updateFormData({ startDate: date, selectedMatchId: '' })}
                  onMatchSelect={(matchId) => updateFormData({ selectedMatchId: matchId })}
                />
              )}
              {currentStep === 2 && (
                <PreferencesSelection
                  preferences={formData.preferences}
                  onToggle={togglePreference}
                />
              )}
              {currentStep === 3 && (
                <UserDetails
                  firstName={formData.firstName}
                  phone={formData.phone}
                  onChange={(field, value) => updateFormData({ [field]: value })}
                />
              )}
            </motion.div>
          </AnimatePresence>
        </div>

        <div className="mt-12 flex flex-row-reverse justify-between gap-4">
          <button
            onClick={prevStep}
            disabled={currentStep === 0}
            className={`flex flex-row-reverse items-center gap-2 px-6 py-3 rounded-xl font-bold transition-all ${
              currentStep === 0 ? 'opacity-0 pointer-events-none' : 'text-gray-600 hover:bg-gray-100'
            }`}
          >
            <ArrowLeft size={20} className="rotate-180" />
            חזור
          </button>
          
          {currentStep === STEPS.length - 1 ? (
            <button
              onClick={handleSubmit}
              disabled={!canGoNext()}
              className={`flex flex-row-reverse items-center gap-2 px-8 py-3 rounded-xl font-bold text-white transition-all ${
                canGoNext() ? 'bg-blue-600 hover:bg-blue-700 shadow-lg shadow-blue-200' : 'bg-gray-300 cursor-not-allowed'
              }`}
            >
              שלח בקשה
              <CheckCircle2 size={20} />
            </button>
          ) : (
            <button
              onClick={nextStep}
              disabled={!canGoNext()}
              className={`flex flex-row-reverse items-center gap-2 px-8 py-3 rounded-xl font-bold text-white transition-all ${
                canGoNext() ? 'bg-blue-600 hover:bg-blue-700 shadow-lg shadow-blue-200' : 'bg-gray-300 cursor-not-allowed'
              }`}
            >
              המשך
              <ArrowRight size={20} className="rotate-180" />
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
