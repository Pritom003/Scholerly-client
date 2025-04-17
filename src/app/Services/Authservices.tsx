"use server";
import { cookies } from "next/headers";
import { jwtDecode } from "jwt-decode";

/* eslint-disable @typescript-eslint/no-explicit-any */
export const registerUserWithFormData = async (formData: FormData) => {
    try {
      const res = await fetch(`http://localhost:5000/api/v1/auth/create-user`, {
        method: "POST",
        
        body: formData, 
        cache: "no-store",
      });
  
      const result = await res.json();
      console.log(result);
      if (result.success) {
        (await cookies()).set("accessToken", result.data.accessToken);
        (await cookies()).set("refreshToken", result?.data?.refreshToken);
      }
      return result;
      
    } catch (error: any) {
      console.error("Registration error:", error);
      return null;
    }
  };
/* eslint-disable @typescript-eslint/no-explicit-any */
export const loginUser = async (values: { email: string; password: string }) => {
  try {
    const response = await fetch("http://localhost:5000/api/v1/auth/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      cache: "no-store",
      body: JSON.stringify(values),
    });

    const result = await response.json();
    console.log(result ,'from service ') ;
    if (result?.success) {
      (await cookies()).set("accessToken", result?.data?.accessToken);
      // (await cookies()).set("refreshToken", result?.data?.refreshToken);
    }

    return result;
  } catch (error: any) {
    console.error("Login error:", error);
    return { response: null, result: null };
  }
};

export const getCurrentUser = async () => {
  const accessToken = (await cookies()).get("accessToken")?.value;
  let decodedData = null;

  if (accessToken) {
    decodedData = await jwtDecode(accessToken);
    console.log(decodedData);
    return decodedData;
  } else {
    return null;
  }
};