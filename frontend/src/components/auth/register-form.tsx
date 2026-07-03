"use client";

import Link from "next/link";
import { zodResolver } from "@hookform/resolvers/zod";
import { Controller, useForm } from "react-hook-form";
import { Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useRegister } from "@/hooks/auth/use-register";
import { registerSchema, type RegisterFormValues } from "@/schema";
import { cn } from "@/lib/utils";

export function RegisterForm() {
  // resolver
  const form = useForm<RegisterFormValues>({
    resolver: zodResolver(registerSchema),
    defaultValues: {
      name: "",
      email: "",
      password: "",
      confirmPassword: "",
    },
  });

  const { control, handleSubmit } = form;

  // api
  const { mutate, isPending } = useRegister();

  function onSubmit(values: RegisterFormValues) {
    mutate({
      name: values.name,
      email: values.email,
      password: values.password,
    });
  }

  return (
    <div className="w-full max-w-[600px]">
      <div className="mb-8">
        <div className="mb-6 flex items-center gap-2.5">
          <div className="flex size-9 items-center justify-center rounded-lg bg-primary/10">
            <span className="text-sm font-bold text-primary">JT</span>
          </div>
          <span className="text-lg font-semibold tracking-tight">
            JobTrackr
          </span>
        </div>
      </div>

      <div className="mb-8 space-y-2">
        <h1 className="text-2xl font-semibold tracking-tight text-foreground">
          Create your account
        </h1>
        <p className="text-sm text-muted-foreground">
          Start tracking your job applications in one organized workspace.
        </p>
      </div>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-5" noValidate>
        <Controller
          name="name"
          control={control}
          render={({ field, fieldState }) => (
            <div className="space-y-2">
              <Label htmlFor="name">Full name</Label>
              <Input
                {...field}
                id="name"
                type="text"
                autoComplete="name"
                placeholder="John Doe"
                aria-invalid={fieldState.invalid}
                className="h-10 px-3 text-sm"
              />
              {fieldState.error ? (
                <p className="text-xs text-destructive">
                  {fieldState.error.message}
                </p>
              ) : null}
            </div>
          )}
        />

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
                <p className="text-xs text-destructive">
                  {fieldState.error.message}
                </p>
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
                autoComplete="new-password"
                placeholder="Create a password"
                aria-invalid={fieldState.invalid}
                className="h-10 px-3 text-sm"
              />
              {fieldState.error ? (
                <p className="text-xs text-destructive">
                  {fieldState.error.message}
                </p>
              ) : null}
            </div>
          )}
        />

        <Controller
          name="confirmPassword"
          control={control}
          render={({ field, fieldState }) => (
            <div className="space-y-2">
              <Label htmlFor="confirmPassword">Confirm password</Label>
              <Input
                {...field}
                id="confirmPassword"
                password
                autoComplete="new-password"
                placeholder="Confirm your password"
                aria-invalid={fieldState.invalid}
                className="h-10 px-3 text-sm"
              />
              {fieldState.error ? (
                <p className="text-xs text-destructive">
                  {fieldState.error.message}
                </p>
              ) : null}
            </div>
          )}
        />

        <Button
          type="submit"
          disabled={isPending}
          className={cn(
            "h-10 w-full text-sm font-medium",
            isPending && "opacity-80",
          )}
        >
          {isPending ? "Creating account..." : "Create account"}

          {isPending ? <Loader2 className="ml-2 size-4 animate-spin" /> : null}
        </Button>
      </form>

      <p className="mt-2 text-center text-sm text-muted-foreground">
        Already have an account?{" "}
        <Link
          href="/auth/login"
          className="font-medium text-primary hover:text-primary/80"
        >
          Sign in
        </Link>
      </p>
    </div>
  );
}
