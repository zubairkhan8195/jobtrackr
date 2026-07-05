"use client";

import { useEffect } from "react";
import { useQuery } from "@tanstack/react-query";
import { toast } from "sonner";

import axiosClient from "@/lib/axiosClient";
import { getApiErrorMessage } from "@/lib/errors";
import { saveRole } from "@/lib/helpers";
import type { AuthUser, ProfileResponse } from "@/types/auth";

const fetchProfile = async () => {
  const { data } = await axiosClient.get<ProfileResponse>("/auth/profile");

  return data;
};

export const profileKey = ["auth", "profile"] as const;

function normalizeProfileUser(user: ProfileResponse["user"]): AuthUser {
  return {
    id: String(user.id ?? user._id),
    name: user.name,
    email: user.email,
    role: user.role,
  };
}

export function useProfile() {
  const query = useQuery({
    queryKey: profileKey,
    queryFn: fetchProfile,
    select: (response) => normalizeProfileUser(response.user),
  });

  useEffect(() => {
    if (query.data?.role) {
      saveRole(query.data.role);
    }
  }, [query.data]);

  useEffect(() => {
    if (query.isError) {
      toast.error(getApiErrorMessage(query.error));
    }
  }, [query.isError, query.error]);

  return query;
}
