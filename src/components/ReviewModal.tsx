import { Loader2, X } from 'lucide-react';
import { useEffect, useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { useToast } from '../context/ToastContext';
import { submitReview } from '../lib/api';
import type { Order, Review } from '../types';
import StarRating from './StarRating';

interface ReviewModalProps {
  order: Order | null;
  existing?: Review;
  onClose: () => void;
  onSaved: (review: Review) => void;
}

export default function ReviewModal({ order, existing, onClose, onSaved }: ReviewModalProps) {
  const { user } = useAuth();
  const { toast } = useToast();
  const [rating, setRating] = useState(existing?.rating ?? 5);
  const [comment, setComment] = useState(existing?.comment ?? '');
  const [saving, setSaving] = useState(false);

  // Reset when a different order opens, so one review's text cannot leak into
  // another's form.
  useEffect(() => {
    setRating(existing?.rating ?? 5);
    setComment(existing?.comment ?? '');
  }, [order, existing]);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => e.key === 'Escape' && onClose();
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [onClose]);

  if (!order) return null;

  const handleSubmit = async () => {
    if (!user) return;
    setSaving(true);
    try {
      const saved = await submitReview({
        orderId: order.id,
        restaurantId: order.restaurantId,
        userId: user.id,
        rating,
        comment,
      });
      onSaved(saved);
      toast(existing ? 'Review updated' : 'Thank you for the review');
      onClose();
    } catch (e) {
      toast(e instanceof Error ? e.message : 'Could not save your review', 'error');
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="fixed inset-0 z-[220] grid place-items-center p-5" role="dialog" aria-modal="true">
      <div onClick={onClose} aria-hidden="true" className="absolute inset-0 bg-[#0A2019]/50 backdrop-blur-[3px]" />

      <div className="relative w-[min(460px,100%)] rounded-3xl bg-[#FAF5EC] p-6 shadow-2xl">
        <button
          onClick={onClose}
          aria-label="Close"
          className="absolute right-4 top-4 grid h-9 w-9 place-items-center rounded-full border-[1.5px] border-[#E4DACA] transition hover:border-[#DF5F49] hover:bg-[#DF5F49] hover:text-white"
        >
          <X size={17} />
        </button>

        <h2 className="pr-10 font-display text-xl font-bold text-[#0A2E24]">
          {existing ? 'Edit your review' : 'How was it?'}
        </h2>
        <p className="mt-1.5 text-[13.5px] text-[#6C7C73]">
          {order.restaurantName ?? 'This kitchen'} · order {order.reference}
        </p>

        <div className="mt-5">
          <StarRating value={rating} onChange={setRating} size={30} />
        </div>

        <label className="mt-5 block">
          <span className="mb-1.5 block text-[12.5px] font-semibold text-[#3D4E46]">
            Tell others what you thought (optional)
          </span>
          <textarea
            value={comment}
            onChange={(e) => setComment(e.target.value)}
            rows={4}
            maxLength={600}
            placeholder="Was the suya properly charred? Did it arrive hot?"
            className="w-full resize-none rounded-xl border-[1.5px] border-[#E4DACA] bg-[#FFFDF8] px-4 py-3 text-sm outline-none transition focus:border-[#E9A93A]"
          />
          <span className="mt-1 block text-right text-[11px] text-[#6C7C73]">
            {comment.length}/600
          </span>
        </label>

        <button
          onClick={handleSubmit}
          disabled={saving}
          className="mt-4 flex w-full items-center justify-center gap-2 rounded-full bg-[#DF5F49] py-3.5 text-sm font-bold text-white shadow-[0_3px_0_#B94733] transition enabled:hover:-translate-y-0.5 disabled:opacity-60"
        >
          {saving && <Loader2 size={16} className="animate-spin" />}
          {existing ? 'Update review' : 'Post review'}
        </button>
      </div>
    </div>
  );
}
