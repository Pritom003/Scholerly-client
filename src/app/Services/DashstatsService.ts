import { getValidToken } from "@/lib/varifyToken";

/* eslint-disable @typescript-eslint/no-explicit-any */
const baseURL = `${process.env.NEXT_PUBLIC_BASE_API}/api/v1/dashborad`;



// Get all blogs (public or admin view)
export const getDashboardStats = async () => {
  try {
  const token = await getValidToken();
    const res = await fetch(`${baseURL}/`, {
      method: "GET",
       headers: {
        Authorization: `${token}`,
      },
      cache: "no-store",
    });
    return await res.json();
  } catch (error) {
    console.error("Error fetching all stats:", error);
    return null;
  }
};