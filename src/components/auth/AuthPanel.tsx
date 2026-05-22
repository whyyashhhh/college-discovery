"use client";

import { FormEvent, useEffect, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";

type AuthMode = "login" | "signup";

type DemoUser = {
  id: string;
  name: string;
  email: string;
  mode: AuthMode;
};

const STORAGE_KEY = "college-discovery-demo-user";

function readStoredUser(): DemoUser | null {
  if (typeof window === "undefined") return null;

  const value = window.localStorage.getItem(STORAGE_KEY);
  if (!value) return null;

  try {
    return JSON.parse(value) as DemoUser;
  } catch {
    return null;
  }
}

export default function AuthPanel({ mode }: { mode: AuthMode }) {
  const router = useRouter();
  const [storedUser, setStoredUser] = useState<DemoUser | null>(null);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setStoredUser(readStoredUser());
  }, []);

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setLoading(true);
    setError(null);

    if (mode === "signup" && password !== confirmPassword) {
      setLoading(false);
      setError("Passwords do not match.");
      return;
    }

    try {
      const response = await fetch("/api/auth/[...nextauth]", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ mode, name, email }),
      });
      const data = await response.json();

      if (!response.ok) {
        throw new Error(data?.error ?? "Authentication failed");
      }

      const user = data.user as DemoUser;
      window.localStorage.setItem(STORAGE_KEY, JSON.stringify(user));
      setStoredUser(user);
      router.push("/");
    } catch (submitError) {
      setError(submitError instanceof Error ? submitError.message : "Authentication failed");
    } finally {
      setLoading(false);
    }
  }

  function handleSignOut() {
    window.localStorage.removeItem(STORAGE_KEY);
    setStoredUser(null);
  }

  return (
    <main className="min-h-screen px-6 py-16 text-slate-100 sm:px-10 lg:px-16">
      <section className="mx-auto grid max-w-6xl gap-6 lg:grid-cols-[0.9fr_1.1fr]">
        <div className="rounded-[2rem] border border-white/10 bg-[radial-gradient(circle_at_top,_rgba(34,211,238,0.16),_transparent_40%),rgba(255,255,255,0.05)] p-8">
          <p className="text-sm font-semibold uppercase tracking-[0.35em] text-cyan-300">
            {mode === "login" ? "Welcome back" : "Create account"}
          </p>
          <h1 className="mt-4 text-4xl font-semibold tracking-tight">
            {mode === "login" ? "Sign in to your demo session" : "Join the college discovery workspace"}
          </h1>
          <p className="mt-4 max-w-xl text-sm leading-6 text-slate-300">
            This project uses a lightweight demo auth flow so the login and signup screens work end to end without a server-side auth provider.
          </p>

          <div className="mt-8 grid gap-3 text-sm text-slate-300">
            <div className="rounded-2xl border border-white/10 bg-slate-950/50 p-4">Demo session stored in localStorage</div>
            <div className="rounded-2xl border border-white/10 bg-slate-950/50 p-4">No provider setup required</div>
            <div className="rounded-2xl border border-white/10 bg-slate-950/50 p-4">Works on Vercel immediately</div>
          </div>

          <div className="mt-8 flex gap-3">
            <Link className="rounded-full border border-white/10 px-5 py-3 text-sm font-semibold hover:bg-white/10" href="/login">
              Login
            </Link>
            <Link className="rounded-full border border-white/10 px-5 py-3 text-sm font-semibold hover:bg-white/10" href="/signup">
              Sign up
            </Link>
          </div>
        </div>

        <div className="rounded-[2rem] border border-white/10 bg-slate-950/60 p-8 backdrop-blur">
          {storedUser ? (
            <div className="space-y-4">
              <p className="text-sm uppercase tracking-[0.3em] text-cyan-300">Signed in</p>
              <h2 className="text-3xl font-semibold text-white">{storedUser.name}</h2>
              <p className="text-sm text-slate-300">{storedUser.email}</p>
              <p className="text-sm text-slate-400">Session mode: {storedUser.mode}</p>
              <div className="flex gap-3 pt-2">
                <button
                  type="button"
                  onClick={handleSignOut}
                  className="rounded-full border border-white/10 px-5 py-3 text-sm font-semibold hover:bg-white/10"
                >
                  Sign out
                </button>
                <Link
                  href="/colleges"
                  className="rounded-full bg-cyan-300 px-5 py-3 text-sm font-semibold text-slate-950 hover:bg-cyan-200"
                >
                  Browse colleges
                </Link>
              </div>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <h2 className="text-3xl font-semibold text-white">{mode === "login" ? "Log in" : "Sign up"}</h2>
                <p className="mt-2 text-sm text-slate-400">Use any valid email. This creates a demo session for the app.</p>
              </div>

              {mode === "signup" && (
                <label className="block space-y-2 text-sm">
                  <span className="text-slate-300">Name</span>
                  <input
                    value={name}
                    onChange={(event) => setName(event.target.value)}
                    className="w-full rounded-2xl border border-white/10 bg-white/5 px-4 py-3 text-white outline-none"
                    placeholder="Your name"
                  />
                </label>
              )}

              <label className="block space-y-2 text-sm">
                <span className="text-slate-300">Email</span>
                <input
                  type="email"
                  value={email}
                  onChange={(event) => setEmail(event.target.value)}
                  className="w-full rounded-2xl border border-white/10 bg-white/5 px-4 py-3 text-white outline-none"
                  placeholder="you@example.com"
                  required
                />
              </label>

              <label className="block space-y-2 text-sm">
                <span className="text-slate-300">Password</span>
                <input
                  type="password"
                  value={password}
                  onChange={(event) => setPassword(event.target.value)}
                  className="w-full rounded-2xl border border-white/10 bg-white/5 px-4 py-3 text-white outline-none"
                  placeholder="••••••••"
                  required
                />
              </label>

              {mode === "signup" && (
                <label className="block space-y-2 text-sm">
                  <span className="text-slate-300">Confirm password</span>
                  <input
                    type="password"
                    value={confirmPassword}
                    onChange={(event) => setConfirmPassword(event.target.value)}
                    className="w-full rounded-2xl border border-white/10 bg-white/5 px-4 py-3 text-white outline-none"
                    placeholder="••••••••"
                    required
                  />
                </label>
              )}

              {error && <div className="rounded-2xl border border-rose-400/30 bg-rose-500/10 p-4 text-sm text-rose-100">{error}</div>}

              <button
                type="submit"
                disabled={loading}
                className="w-full rounded-full bg-cyan-300 px-5 py-3 text-sm font-semibold text-slate-950 transition hover:bg-cyan-200 disabled:cursor-not-allowed disabled:opacity-60"
              >
                {loading ? "Working..." : mode === "login" ? "Log in" : "Create account"}
              </button>
            </form>
          )}
        </div>
      </section>
    </main>
  );
}