import { ID, type Models } from "appwrite";
import { AuthContext, type User } from "../context/AuthContext";
import { useCallback, useState, type ReactNode } from "react";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { account } from "../lib/appwrite";

type ExtendedPreferences = Models.Preferences & {
  plan?: "free" | "pro";
  credits?: number;
};

// eslint-disable-next-line react-refresh/only-export-components
export const AUTH_SESSION_QUERY_KEY = ["auth", "session"] as const;

const mapAppwriteUser = (user: Models.User<ExtendedPreferences>): User => ({
  name: user.name || user.email.split("@")[0],
  email: user.email,
  $id: user.$id,
  plan: user.prefs?.plan || "free",
  credits: Number(user.prefs?.credits || 0),
});

const fetchCurrentUser = async (): Promise<User | null> => {
  try {
    const sessionUser = await account.get();
    return mapAppwriteUser(sessionUser as Models.User<ExtendedPreferences>);
  } catch {
    return null;
  }
};

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const queryClient = useQueryClient();
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);

  const { data: user = null } = useQuery({
    queryKey: AUTH_SESSION_QUERY_KEY,
    queryFn: fetchCurrentUser,
    retry: false,
    staleTime: 60 * 1000,
  });

  const setUser = useCallback(
    (nextUser: User | null) => {
      queryClient.setQueryData(AUTH_SESSION_QUERY_KEY, nextUser);
    },
    [queryClient]
  );

  const login = useCallback(
    async (email: string, password: string) => {
      await account.createEmailPasswordSession({ email, password });
      const sessionUser = await account.get();
      setUser(mapAppwriteUser(sessionUser as Models.User<ExtendedPreferences>));
    },
    [setUser]
  );

  const signup = useCallback(
    async (name: string, email: string, password: string) => {
      await account.create({ userId: ID.unique(), email, password, name });
      await account.createEmailPasswordSession({ email, password });
      const params = {
        plan: "free",
        credits: 5,
      };
      await account.updatePrefs({ prefs: params });
      const sessionUser = await account.get();
      setUser(mapAppwriteUser(sessionUser as Models.User<ExtendedPreferences>));
    },
    [setUser]
  );

  const logout = useCallback(async () => {
    await account.deleteSession({ sessionId: "current" });
    setUser(null);
  }, [setUser]);

  const value = {
    user,
    setUser,
    login,
    signup,
    logout,
    openAuthModal: () => setIsAuthModalOpen(true),
    closeAuthModal: () => setIsAuthModalOpen(false),
    isAuthModalOpen,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
