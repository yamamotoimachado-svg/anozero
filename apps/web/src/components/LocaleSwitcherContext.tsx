"use client";

import {createContext, useContext} from "react";

export type LocaleSwitcherTranslations = {
  pt?: string | null;
  en?: string | null;
};

type LocaleSwitcherContextValue = {
  translations?: LocaleSwitcherTranslations;
};

const LocaleSwitcherContext = createContext<LocaleSwitcherContextValue>({});

export function LocaleSwitcherProvider({
  translations,
  children,
}: {
  translations?: LocaleSwitcherTranslations;
  children: React.ReactNode;
}) {
  return (
    <LocaleSwitcherContext.Provider value={{translations}}>
      {children}
    </LocaleSwitcherContext.Provider>
  );
}

export function useLocaleSwitcherContext() {
  return useContext(LocaleSwitcherContext);
}
