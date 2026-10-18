import { createContext, useCallback, useContext, useMemo, useRef, useState, type ReactNode } from 'react';
import { CheckCircle2, Info, XCircle } from 'lucide-react';

type ToastKind = 'success' | 'info' | 'error';

interface Toast {
  id: number;
  message: string;
  kind: ToastKind;
}

interface ToastContextValue {
  toast: (message: string, kind?: ToastKind) => void;
}

const ToastContext = createContext<ToastContextValue | null>(null);

const ICONS: Record<ToastKind, typeof CheckCircle2> = {
  success: CheckCircle2,
  info: Info,
  error: XCircle,
};

const STYLES: Record<ToastKind, string> = {
  success: 'bg-[#0A2E24] text-white',
  info: 'bg-[#0A2E24] text-white',
  error: 'bg-[#B23A26] text-white',
};

const ICON_COLOR: Record<ToastKind, string> = {
  success: 'text-[#E9A93A]',
  info: 'text-[#E9A93A]',
  error: 'text-white',
};

export function ToastProvider({ children }: { children: ReactNode }) {
  const [toasts, setToasts] = useState<Toast[]>([]);
  const nextId = useRef(0);

  const toast = useCallback((message: string, kind: ToastKind = 'success') => {
    const id = nextId.current++;
    setToasts((prev) => [...prev, { id, message, kind }]);
    setTimeout(() => setToasts((prev) => prev.filter((t) => t.id !== id)), 3200);
  }, []);

  const value = useMemo(() => ({ toast }), [toast]);

  return (
    <ToastContext.Provider value={value}>
      {children}
      {/* Bottom-centre on mobile keeps clear of the sticky cart bar on desktop. */}
      <div
        className="pointer-events-none fixed bottom-28 left-1/2 z-[9999] flex -translate-x-1/2 flex-col items-center gap-2 px-4 md:bottom-8"
        role="status"
        aria-live="polite"
      >
        {toasts.map((t) => {
          const Icon = ICONS[t.kind];
          return (
            <div
              key={t.id}
              className={`pointer-events-auto flex items-center gap-2.5 rounded-full px-5 py-3 text-sm font-semibold shadow-2xl ${STYLES[t.kind]}`}
            >
              <Icon size={17} className={ICON_COLOR[t.kind]} />
              <span>{t.message}</span>
            </div>
          );
        })}
      </div>
    </ToastContext.Provider>
  );
}

export function useToast(): ToastContextValue {
  const ctx = useContext(ToastContext);
  if (!ctx) throw new Error('useToast must be used inside <ToastProvider>');
  return ctx;
}
