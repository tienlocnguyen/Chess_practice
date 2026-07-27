import React from 'react';
import { Sparkles, HelpCircle, AlertTriangle, Lightbulb } from 'lucide-react';

interface CoachBubbleProps {
  message: string;
  onRequestHint?: () => void;
  disabled?: boolean;
}

export const CoachBubble: React.FC<CoachBubbleProps> = ({ message, onRequestHint, disabled }) => {
  return (
    <div className="bg-gradient-to-r from-slate-900 via-slate-900 to-indigo-950 p-3.5 sm:p-4 rounded-2xl border border-amber-500/30 shadow-xl flex items-start gap-3 relative overflow-hidden">
      {/* Mascot Avatar */}
      <div className="w-11 h-11 rounded-2xl bg-gradient-to-tr from-amber-400 to-orange-400 flex items-center justify-center text-slate-950 text-2xl font-black shadow-lg shrink-0 animate-bounce-slow">
        ♟️
      </div>

      {/* Speech Content */}
      <div className="flex-1">
        <div className="flex items-center justify-between mb-1">
          <div className="flex items-center gap-1.5 text-xs font-bold text-amber-300">
            <Sparkles className="w-3.5 h-3.5 text-amber-400" />
            <span>Chessie the Kid Coach</span>
          </div>
          {onRequestHint && (
            <button
              onClick={onRequestHint}
              disabled={disabled}
              className="px-2.5 py-1 rounded-xl bg-amber-500/20 border border-amber-400/40 text-amber-300 hover:bg-amber-500 hover:text-slate-950 text-xs font-black transition flex items-center gap-1 shadow-sm disabled:opacity-50"
            >
              <Lightbulb className="w-3.5 h-3.5" />
              <span>Get Hint</span>
            </button>
          )}
        </div>
        <p className="text-xs sm:text-sm text-slate-200 leading-relaxed font-medium">
          {message}
        </p>
      </div>
    </div>
  );
};
