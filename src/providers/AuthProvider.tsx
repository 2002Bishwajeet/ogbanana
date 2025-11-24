import { ID, type Models } from "appwrite";
import { AuthContext, type User } from "../context/AuthContext";
import { useCallback, useEffect, useState, type ReactNode } from "react";
import { account } from "../lib/appwrite";

type ExtendedPreferences = Models.Preferences & {
  plan?: "free" | "pro";
  credits?: number;
};

const mapAppwriteUser = (user: Models.User<ExtendedPreferences>): User => ({
  name: user.name || user.email.split("@")[0],
  email: user.email,
  $id: user.$id,
  plan: user.prefs?.plan || "free",
  credits: user.prefs?.credits || 5,
});

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);

  useEffect(() => {
    const checkSession = async () => {
      try {
        const sessionUser = await account.get();
        setUser(
          mapAppwriteUser(sessionUser as Models.User<ExtendedPreferences>)
        );
      } catch {
        // No session
        setUser(null);
      }
    };
    checkSession();
  }, []);

  const login = useCallback(async (email: string, password: string) => {
    await account.createEmailPasswordSession({ email, password });
    const sessionUser = await account.get();
    setUser(mapAppwriteUser(sessionUser as Models.User<ExtendedPreferences>));
  }, []);

  const signup = useCallback(
    async (name: string, email: string, password: string) => {
      await account.create({ userId: ID.unique(), email, password, name });
      await account.createEmailPasswordSession({ email, password });
      const params = {
        plan: "free",
        credits: 5,
      };
      account.updatePrefs({ prefs: params });
      const sessionUser = await account.get();
      setUser(mapAppwriteUser(sessionUser as Models.User<ExtendedPreferences>));
    },
    []
  );

  const logout = useCallback(async () => {
    await account.deleteSession({ sessionId: "current" });
    setUser(null);
  }, []);

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
