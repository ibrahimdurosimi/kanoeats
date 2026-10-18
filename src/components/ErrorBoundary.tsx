import { Component, type ErrorInfo, type ReactNode } from 'react';

/**
 * Catches render errors so a crash shows something useful instead of a blank
 * white page.
 *
 * It also handles a failure mode specific to a deployed, code-split SPA.
 * Cloudflare serves `index.html` with a 200 for any path that is not a real
 * file, which is what makes client-side routing work. The side effect is that
 * a stale tab requesting a chunk deleted by a redeploy receives HTML where it
 * expected JavaScript, and `React.lazy` throws a MIME-type error that means
 * nothing to the user. The fix is simply to reload onto the new deploy.
 */

function isStaleChunkError(error: Error): boolean {
  const message = `${error.name} ${error.message}`.toLowerCase();
  return (
    message.includes('failed to fetch dynamically imported module') ||
    message.includes('error loading dynamically imported module') ||
    message.includes('expected a javascript') ||
    message.includes("expected a javascript-equivalent module script") ||
    message.includes('importing a module script failed') ||
    (message.includes('mime type') && message.includes('text/html'))
  );
}

/** Reload once per deploy at most, so a genuine failure cannot loop forever. */
const RELOAD_FLAG = 'kanoeats.chunk-reload';

interface Props {
  children: ReactNode;
}

interface State {
  error: Error | null;
}

export default class ErrorBoundary extends Component<Props, State> {
  state: State = { error: null };

  static getDerivedStateFromError(error: Error): State {
    return { error };
  }

  componentDidCatch(error: Error, info: ErrorInfo) {
    if (isStaleChunkError(error)) {
      let alreadyReloaded = false;
      try {
        alreadyReloaded = sessionStorage.getItem(RELOAD_FLAG) === '1';
        sessionStorage.setItem(RELOAD_FLAG, '1');
      } catch {
        /* storage blocked — fall through to the manual retry screen */
      }

      if (!alreadyReloaded) {
        window.location.reload();
        return;
      }
    }

    console.error('[kanoeats] Unhandled render error:', error, info.componentStack);
  }

  private reset = () => {
    try {
      sessionStorage.removeItem(RELOAD_FLAG);
    } catch {
      /* ignore */
    }
    window.location.href = '/';
  };

  render() {
    const { error } = this.state;
    if (!error) return this.props.children;

    const stale = isStaleChunkError(error);

    return (
      <div className="grid min-h-screen place-items-center bg-[#FAF5EC] px-5 text-[#14201B]">
        <div className="max-w-md text-center">
          <p className="font-display text-[26px] font-extrabold tracking-tight text-[#DF5F49]">
            kanoeats
          </p>
          <h1 className="mt-5 font-display text-2xl font-bold text-[#0A2E24]">
            {stale ? 'A new version is available' : 'Something went wrong'}
          </h1>
          <p className="mt-2.5 text-sm text-[#6C7C73]">
            {stale
              ? 'This page was updated while your tab was open. Reload to pick up the latest version.'
              : 'We hit an unexpected error. Reloading usually clears it — if it keeps happening, let us know on WhatsApp.'}
          </p>

          <div className="mt-6 flex flex-wrap justify-center gap-2.5">
            <button
              onClick={() => window.location.reload()}
              className="rounded-full bg-[#DF5F49] px-5 py-3 text-sm font-bold text-white shadow-[0_3px_0_#B94733] transition hover:-translate-y-0.5"
            >
              Reload
            </button>
            <button
              onClick={this.reset}
              className="rounded-full border-[1.5px] border-[#E4DACA] bg-[#FFFDF8] px-5 py-3 text-sm font-semibold transition hover:border-[#166049]"
            >
              Back to home
            </button>
          </div>

          {import.meta.env.DEV && (
            <pre className="mt-6 overflow-auto rounded-xl bg-[#F2E8D7] p-4 text-left text-[11px] text-[#6C7C73]">
              {error.stack ?? error.message}
            </pre>
          )}
        </div>
      </div>
    );
  }
}
