import SportsForm from '@/components/SportsForm';
import SoccerBallIcon from '@/components/SoccerBallIcon';

export default function Home() {
  return (
    <main className="min-h-screen bg-[#f8fafc] text-slate-900 pb-12 px-4 md:pb-20 pt-0">
      {/* Top Disclaimer Bar */}
      <div className="w-full bg-slate-100 border-b border-slate-200 py-3 px-4 mb-12" dir="rtl">
        <p className="text-center text-xs md:text-sm text-slate-500 font-medium">
          אנחנו משווקים כרטיסים בשוק המשני למשחקי כדורגל באירופה ומחירם עשוי להיות גבוה או נמוך מהמחיר הרשמי
        </p>
      </div>

      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="text-center mb-16 space-y-4">
          <div className="inline-flex items-center justify-center p-3 bg-blue-600 text-white rounded-2xl shadow-xl shadow-blue-200 mb-4 animate-bounce">
            <SoccerBallIcon size={32} />
          </div>
          <h1 className="text-4xl md:text-5xl font-black tracking-tight text-slate-900">
            חווית כדורגל <span className="text-blue-600">עולמית</span>
          </h1>
          <p className="text-lg text-slate-500 max-w-xl mx-auto" dir="rtl">
            הזמן את טיול הכדורגל החלומי שלך תוך דקות.<br />
            בחר קבוצה, משחק, ואנחנו נדאג לכל השאר.
          </p>
        </div>

        {/* Form Container */}
        <SportsForm />

        {/* Footer info */}
        <div className="mt-20 text-center text-slate-400 text-sm" dir="rtl">
          <p>© 2026 כל הזכויות שמורות.</p>
          <p className="mt-2">כרטיסים למשחקי כדורגל באירופה</p>
        </div>
      </div>

      {/* Background decoration */}
      <div className="fixed top-0 left-0 w-full h-full pointer-events-none -z-10 overflow-hidden">
        <div className="absolute -top-24 -right-24 w-96 h-96 bg-blue-100 rounded-full blur-3xl opacity-50" />
        <div className="absolute -bottom-24 -left-24 w-96 h-96 bg-indigo-100 rounded-full blur-3xl opacity-50" />
      </div>
    </main>
  );
}
