'use client';
import { createContext, useCallback, useContext, useEffect, useState } from 'react';

const STORAGE_KEY = 'tobby-yuki-user';
const ProfileContext = createContext(null);

export function ProfileProvider({ children }) {
  const [profile, setProfile] = useState(null);
  const [loginOpen, setLoginOpen] = useState(false);
  const [profileOpen, setProfileOpen] = useState(false);
  const [profileLoaded, setProfileLoaded] = useState(false);

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const stored = window.localStorage.getItem(STORAGE_KEY);
      if (stored) {
        try {
          setProfile(JSON.parse(stored));
        } catch (error) {
          console.warn('Unable to parse stored profile', error);
        }
      }
      setProfileLoaded(true);
    }
  }, []);

  useEffect(() => {
    if (profileLoaded && !profile) {
      setLoginOpen(true);
    }
  }, [profileLoaded, profile]);

  const saveProfile = useCallback((profileData) => {
    if (typeof window !== 'undefined') {
      window.localStorage.setItem(STORAGE_KEY, JSON.stringify(profileData));
    }
    setProfile(profileData);
    setLoginOpen(false);
    setProfileOpen(false);
  }, []);

  const logout = useCallback(() => {
    if (typeof window !== 'undefined') {
      window.localStorage.removeItem(STORAGE_KEY);
    }
    setProfile(null);
    setLoginOpen(true);
    setProfileOpen(false);
  }, []);

  const openLogin = useCallback(() => {
    setProfileOpen(false);
    setLoginOpen(true);
  }, []);

  const closeLogin = useCallback(() => {
    setLoginOpen(false);
  }, []);

  const openProfile = useCallback(() => {
    if (profile) {
      setLoginOpen(false);
      setProfileOpen(true);
      return;
    }
    setLoginOpen(true);
  }, [profile]);

  const closeProfile = useCallback(() => {
    setProfileOpen(false);
  }, []);

  return (
    <ProfileContext.Provider value={{
      profile,
      loginOpen,
      profileOpen,
      openLogin,
      closeLogin,
      openProfile,
      closeProfile,
      saveProfile,
      logout,
      isLoggedIn: Boolean(profile),
    }}>
      {children}
    </ProfileContext.Provider>
  );
}

export function useProfile() {
  const ctx = useContext(ProfileContext);
  if (!ctx) throw new Error('useProfile must be used within ProfileProvider');
  return ctx;
}
