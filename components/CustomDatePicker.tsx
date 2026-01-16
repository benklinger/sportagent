'use client';

import { useState } from 'react';
import { 
  format, 
  addMonths, 
  subMonths, 
  startOfMonth, 
  endOfMonth, 
  startOfWeek, 
  endOfWeek, 
  isSameMonth, 
  isSameDay, 
  eachDayOfInterval,
  isBefore,
  startOfToday
} from 'date-fns';
import { he } from 'date-fns/locale/he';
import { ChevronLeft, ChevronRight, Calendar as CalendarIcon } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

interface CustomDatePickerProps {
  selectedDate: string;
  onChange: (date: string) => void;
}

export default function CustomDatePicker({ selectedDate, onChange }: CustomDatePickerProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [currentMonth, setCurrentMonth] = useState(new Date(selectedDate || new Date()));
  const today = startOfToday();

  const handleDateClick = (day: Date) => {
    onChange(format(day, 'yyyy-MM-dd'));
    setIsOpen(false);
  };

  const renderHeader = () => {
    return (
      <div className="flex items-center justify-between px-4 py-2 border-b">
        <button
          onClick={() => setCurrentMonth(subMonths(currentMonth, 1))}
          className="p-1 hover:bg-gray-100 rounded-full transition-colors"
        >
          <ChevronRight size={20} />
        </button>
        <div className="font-bold text-gray-700">
          {format(currentMonth, 'MMMM yyyy', { locale: he })}
        </div>
        <button
          onClick={() => setCurrentMonth(addMonths(currentMonth, 1))}
          className="p-1 hover:bg-gray-100 rounded-full transition-colors"
        >
          <ChevronLeft size={20} />
        </button>
      </div>
    );
  };

  const renderDays = () => {
    const days = ['א', 'ב', 'ג', 'ד', 'ה', 'ו', 'ש'];
    return (
      <div className="grid grid-cols-7 mb-2">
        {days.map((day) => (
          <div key={day} className="text-center text-xs font-bold text-gray-400 py-2">
            {day}
          </div>
        ))}
      </div>
    );
  };

  const renderCells = () => {
    const monthStart = startOfMonth(currentMonth);
    const monthEnd = endOfMonth(monthStart);
    const startDate = startOfWeek(monthStart);
    const endDate = endOfWeek(monthEnd);

    const calendarDays = eachDayOfInterval({
      start: startDate,
      end: endDate,
    });

    return (
      <div className="grid grid-cols-7">
        {calendarDays.map((day) => {
          const isSelected = isSameDay(day, new Date(selectedDate));
          const isCurrentMonth = isSameMonth(day, monthStart);
          const isPast = isBefore(day, today) && !isSameDay(day, today);

          return (
            <button
              key={day.toString()}
              disabled={isPast}
              onClick={() => handleDateClick(day)}
              className={`
                relative py-3 text-sm transition-all rounded-xl
                ${!isCurrentMonth ? 'text-gray-200' : 'text-gray-700'}
                ${isSelected ? 'bg-blue-600 text-white font-bold shadow-md' : 'hover:bg-blue-50'}
                ${isPast ? 'opacity-30 cursor-not-allowed hover:bg-transparent' : 'cursor-pointer'}
              `}
            >
              {format(day, 'd')}
              {isSameDay(day, today) && !isSelected && (
                <div className="absolute bottom-1 left-1/2 -translate-x-1/2 w-1 h-1 bg-blue-600 rounded-full" />
              )}
            </button>
          );
        })}
      </div>
    );
  };

  return (
    <div className="relative">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-full p-4 rounded-xl border-2 border-gray-100 focus:border-blue-600 outline-none flex items-center justify-between bg-white hover:border-blue-200 transition-all group"
      >
        <div className="flex items-center gap-3 text-gray-700">
          <CalendarIcon size={20} className="text-gray-400 group-hover:text-blue-600 transition-colors" />
          <span className="font-medium">
            {selectedDate ? format(new Date(selectedDate), 'EEEE, d בMMMM yyyy', { locale: he }) : 'בחר תאריך'}
          </span>
        </div>
        <div className="text-xs font-bold text-blue-600 bg-blue-50 px-2 py-1 rounded-lg">
        תאריך
        </div>
      </button>

      <AnimatePresence>
        {isOpen && (
          <>
            <div 
              className="fixed inset-0 z-10" 
              onClick={() => setIsOpen(false)} 
            />
            <motion.div
              initial={{ opacity: 0, y: 10, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 10, scale: 0.95 }}
              className="absolute z-20 top-full mt-2 w-full bg-white rounded-2xl shadow-2xl border border-gray-100 p-2 overflow-hidden"
              dir="rtl"
            >
              {renderHeader()}
              <div className="p-2">
                {renderDays()}
                {renderCells()}
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </div>
  );
}
