import { MessageSquare } from 'lucide-react';
import { useMemo } from 'react';
import { formatRelative } from '../lib/format';
import type { Review } from '../types';
import Avatar from './Avatar';
import StarRating from './StarRating';

export default function ReviewList({
  reviews,
  loading,
}: {
  reviews: Review[];
  loading: boolean;
}) {
  const summary = useMemo(() => {
    if (!reviews.length) return null;
    const total = reviews.reduce((sum, r) => sum + r.rating, 0);
    // Index 0 holds 1-star, index 4 holds 5-star.
    const buckets = [0, 0, 0, 0, 0];
    reviews.forEach((r) => {
      buckets[r.rating - 1]++;
    });
    return { average: total / reviews.length, buckets };
  }, [reviews]);

  if (loading) {
    return (
      <div className="space-y-3">
        {Array.from({ length: 2 }).map((_, i) => (
          <div key={i} className="h-24 animate-pulse rounded-2xl bg-[#EFE6D5]" />
        ))}
      </div>
    );
  }

  if (!reviews.length) {
    return (
      <div className="rounded-2xl border-[1.5px] border-dashed border-[#E4DACA] bg-[#FFFDF8] px-5 py-12 text-center">
        <MessageSquare size={44} className="mx-auto mb-3 text-[#6C7C73] opacity-50" strokeWidth={1.4} />
        <h3 className="font-display text-base font-bold text-[#0A2E24]">No reviews yet</h3>
        <p className="mt-1.5 text-[13.5px] text-[#6C7C73]">
          Order from this kitchen and you can be the first to review it.
        </p>
      </div>
    );
  }

  return (
    <div className="grid gap-6 lg:grid-cols-[260px_1fr]">
      {summary && (
        <aside className="h-fit rounded-2xl border-[1.5px] border-[#E4DACA] bg-[#FFFDF8] p-5">
          <p className="font-display text-[44px] font-bold leading-none text-[#0A2E24]">
            {summary.average.toFixed(1)}
          </p>
          <div className="mt-2">
            <StarRating value={summary.average} size={15} />
          </div>
          <p className="mt-1.5 text-[12.5px] text-[#6C7C73]">
            {reviews.length} review{reviews.length === 1 ? '' : 's'}
          </p>

          <div className="mt-4 space-y-1.5">
            {[5, 4, 3, 2, 1].map((star) => {
              const count = summary.buckets[star - 1];
              const pct = Math.round((count / reviews.length) * 100);
              return (
                <div key={star} className="flex items-center gap-2 text-[11.5px] text-[#6C7C73]">
                  <span className="w-3 text-right">{star}</span>
                  <span className="h-1.5 flex-1 overflow-hidden rounded-full bg-[#EFE6D5]">
                    <span
                      className="block h-full rounded-full bg-[#E9A93A]"
                      style={{ width: `${pct}%` }}
                    />
                  </span>
                  <span className="w-6 text-right tabular-nums">{count}</span>
                </div>
              );
            })}
          </div>
        </aside>
      )}

      <div className="space-y-3">
        {reviews.map((review) => {
          const name = review.authorName || 'KanoEats customer';
          return (
            <article
              key={review.id}
              className="rounded-2xl border-[1.5px] border-[#E4DACA] bg-[#FFFDF8] p-5"
            >
              <div className="flex items-center gap-3">
                <Avatar name={name} className="h-10 w-10 shrink-0 rounded-full" />
                <div className="min-w-0">
                  <p className="truncate text-sm font-semibold">{name}</p>
                  <p className="text-[11.5px] text-[#6C7C73]">{formatRelative(review.createdAt)}</p>
                </div>
                <span className="ml-auto shrink-0">
                  <StarRating value={review.rating} size={14} />
                </span>
              </div>
              {review.comment && (
                <p className="mt-3 text-[13.5px] leading-relaxed text-[#3D4E46]">{review.comment}</p>
              )}
            </article>
          );
        })}
      </div>
    </div>
  );
}
