'use client';

import { User, Phone } from 'lucide-react';

interface UserDetailsProps {
  firstName: string;
  phone: string;
  onChange: (field: 'firstName' | 'phone', value: string) => void;
}

export default function UserDetails({ firstName, phone, onChange }: UserDetailsProps) {
  const handlePhoneChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    let value = e.target.value.replace(/\D/g, ''); // Remove non-digits
    
    if (value.length > 10) value = value.slice(0, 10);
    
    if (value.length > 3) {
      value = value.slice(0, 3) + '-' + value.slice(3);
    }
    
    onChange('phone', value);
  };

  return (
    <div className="space-y-6">
      <div className="space-y-2 text-right">
        <label className="block text-sm font-medium text-gray-700">שם</label>
        <div className="relative">
          <div className="absolute inset-y-0 right-0 pr-4 flex items-center pointer-events-none text-gray-400">
            <User size={18} />
          </div>
          <input
            type="text"
            value={firstName}
            onChange={(e) => onChange('firstName', e.target.value)}
            placeholder="ישראל ישראלי"
            dir="rtl"
            className="w-full pr-11 pl-4 py-3 rounded-xl border-2 border-gray-100 focus:border-blue-600 outline-none transition-all text-right"
          />
        </div>
      </div>

      <div className="space-y-2 text-right">
        <label className="block text-sm font-medium text-gray-700">טלפון</label>
        <div className="relative">
          <div className="absolute inset-y-0 right-0 pr-4 flex items-center pointer-events-none text-gray-400">
            <Phone size={18} />
          </div>
          <input
            type="tel"
            value={phone}
            onChange={handlePhoneChange}
            placeholder="052-7654321"
            dir="rtl"
            className="w-full pr-11 pl-4 py-3 rounded-xl border-2 border-gray-100 focus:border-blue-600 outline-none transition-all text-right"
          />
        </div>
      </div>
    </div>
  );
}
