"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { cn } from "@/lib/utils";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";

export function LoginForm() {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);

  function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setIsLoading(true);

    // API integration will be added in a follow-up step.
    window.setTimeout(() => {
      setIsLoading(false);
      router.push("/dashboard");
    }, 800);
  }

  return (
    <div>
      <div className="mb-8">
        <div className="mb-6 flex items-center gap-2.5">
          <div className="flex size-9 items-center justify-center rounded-lg bg-primary/10">
            <span className="text-sm font-bold text-primary">JT</span>
          </div>
          <span className="text-lg font-semibold tracking-tight">JobTrackr</span>
        </div>
      </div>

      <div className="mb-8 space-y-2">
        <h1 className="text-2xl font-semibold tracking-tight text-foreground">Welcome back</h1>
        <p className="text-sm text-muted-foreground">
          Sign in to continue managing your job applications.
        </p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-5">
        <div className="space-y-2">
          <Label htmlFor="email">Email address</Label>
          <Input
            id="email"
            name="email"
            type="email"
            autoComplete="email"
            placeholder="you@example.com"
            required
            className="h-10 px-3 text-sm"
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="password">Password</Label>
          <Input
            id="password"
            name="password"
            password
            autoComplete="current-password"
            placeholder="Enter your password"
            required
            minLength={6}
            className="h-10 px-3 text-sm"
          />
        </div>

        <Button
          type="submit"
          disabled={isLoading}
          className={cn("h-10 w-full text-sm font-medium", isLoading && "opacity-80")}
        >
          {isLoading ? "Signing in..." : "Sign in"}
        </Button>
      </form>

      <p className="mt-3 text-center text-sm text-muted-foreground">
        Don&apos;t have an account?{" "}
        <Link href="/auth/register" className="font-medium text-primary hover:text-primary/80">
          Create account
        </Link>
      </p>
    </div>
  );
}
