import React from 'react';
import { Sparkles, Lightbulb } from 'lucide-react';
import { Language, getTranslation } from '../utils/i18n';
import { playSound } from '../utils/sound';

interface CoachBubbleProps {
  message: string;
  onRequestHint?: () => void;
  disabled?: boolean;
  language?: Language;
}

export const CoachBubble: React.FC<CoachBubbleProps> = ({
  message,
  onRequestHint,
  disabled,
  language = 'vi',
}) => {
  return (
    <div className="bg-slate-900 p-4 rounded-3xl border border-emerald-500/40 shadow-2xl flex items-start gap-3.5 relative overflow-hidden">
      {/* Duo Mascot Avatar */}
      <div className="w-12 h-12 rounded-2xl bg-emerald-500 flex items-center justify-center text-slate-950 text-2xl font-black shadow-lg shadow-emerald-500/20 shrink-0 border border-white/40 animate-bounce-slow">
        🦉
      </div>

      {/* Speech Content */}
      <div className="flex-1">
        <div className="flex items-center justify-between mb-1">
          <div className="flex items-center gap-1.5 text-xs font-black text-emerald-300">
            <Sparkles className="w-4 h-4 text-emerald-400" />
            <span>{getTranslation(language, 'coachTitle')}</span>
          </div>
          {onRequestHint && (
            <button
              onClick={() => {
                playSound.buttonClick();
                onRequestHint();
              }}
              disabled={disabled}
              className="px-3 py-1 rounded-xl bg-amber-500/20 border border-amber-400/40 text-amber-300 hover:bg-amber-500 hover:text-slate-950 text-xs font-black transition flex items-center gap-1 shadow-sm disabled:opacity-50"
            >
              <Lightbulb className="w-3.5 h-3.5" />
              <span>{getTranslation(language, 'getHint')}</span>
            </button>
          )}
        </div>
        <p className="text-xs sm:text-sm text-slate-100 leading-relaxed font-semibold">
          {message}
        </p>
      </div>
    </div>
  );
};
