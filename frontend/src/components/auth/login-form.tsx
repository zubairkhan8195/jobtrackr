"use client";

import Link from "next/link";
import { Loader2 } from "lucide-react";
import { cn } from "@/lib/utils";
import { zodResolver } from "@hookform/resolvers/zod";
import { Controller, useForm } from "react-hook-form";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useLogin } from "@/hooks/auth/use-login";
import { loginSchema, type LoginFormValues } from "@/schema";

export function LoginForm() {
  // api
  const { mutate, isPending } = useLogin();

  const form = useForm<LoginFormValues>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const { control, handleSubmit } = form;

  function onSubmit(values: LoginFormValues) {
    mutate(values);
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

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-5" noValidate>
        <Controller
          name="email"
          control={control}
          render={({ field, fieldState }) => (
            <div className="space-y-2">
              <Label htmlFor="email">Email address</Label>
              <Input
                {...field}
                id="email"
                type="email"
                autoComplete="email"
                placeholder="you@example.com"
                aria-invalid={fieldState.invalid}
                className="h-10 px-3 text-sm"
              />
              {fieldState.error ? (
                <p className="text-xs text-destructive">{fieldState.error.message}</p>
              ) : null}
            </div>
          )}
        />

        <Controller
          name="password"
          control={control}
          render={({ field, fieldState }) => (
            <div className="space-y-2">
              <Label htmlFor="password">Password</Label>
              <Input
                {...field}
                id="password"
                password
                autoComplete="current-password"
                placeholder="Enter your password"
                aria-invalid={fieldState.invalid}
                className="h-10 px-3 text-sm"
              />
              {fieldState.error ? (
                <p className="text-xs text-destructive">{fieldState.error.message}</p>
              ) : null}
            </div>
          )}
        />

        <Button
          type="submit"
          disabled={isPending}
          className={cn("h-10 w-full text-sm font-medium", isPending && "opacity-80")}
        >
          {isPending ? "Signing in..." : "Sign in"}
          {isPending ? <Loader2 className="ml-2 size-4 animate-spin" /> : null}
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
