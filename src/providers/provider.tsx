"use client";

import UserProvider from "@/context/useContext";



const Providers = ({ children }: { children: React.ReactNode }) => {
  return (
    <UserProvider>
    {children}
    </UserProvider>
  );
};

export default Providers;