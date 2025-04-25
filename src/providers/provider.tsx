"use client";

import AosInitializer from "@/component/Shared/animation/AosInitializer";

import UserProvider from "@/context/useContext";
import { Toaster } from "sonner";



const Providers = ({ children }: { children: React.ReactNode }) => {
  return (
    <UserProvider>
      <AosInitializer></AosInitializer>
      <Toaster richColors position="top-right" />

    {children}
    </UserProvider>
  );
};

export default Providers;