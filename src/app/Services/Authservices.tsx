/* eslint-disable @typescript-eslint/no-explicit-any */
export const registerUserWithFormData = async (formData: FormData) => {
    try {
      const res = await fetch(`http://localhost:5000/api/v1/auth/create-user`, {
        method: "POST",
        
        body: formData, 
        cache: "no-store",
      });
  
      const result = await res.json();
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
    return { response, result };
  } catch (error: any) {
    console.error("Login error:", error);
    return { response: null, result: null };
  }
};

  