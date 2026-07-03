export function AuthPageShell({ children }: { children: React.ReactNode }) {
  return (
    <div className="relative flex min-h-screen items-center justify-center overflow-hidden px-4 py-10 sm:px-6 sm:py-12">
      <div
        aria-hidden
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{ backgroundImage: "url(/images/auth-bg.png)" }}
      />
      <div
        aria-hidden
        className="absolute inset-0 bg-linear-to-br from-white/75 via-lavender-f9/50 to-lavender-e9/60"
      />
      <div className="relative z-10 w-full max-w-[480px] rounded-2xl border border-border/50 bg-background/95 p-8 shadow-[0_8px_30px_rgba(15,23,42,0.08)] backdrop-blur-sm sm:p-10">
        {children}
      </div>
    </div>
  );
}
