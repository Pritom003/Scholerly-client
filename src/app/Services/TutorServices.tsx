import { getValidToken } from "@/lib/varifyToken";

/* eslint-disable @typescript-eslint/no-explicit-any */
const baseURL = `${process.env.NEXT_PUBLIC_BASE_API}/api/v1/tutor`;

// Get all tutors with query (search, filter, paginate)
export const getAllTutors = async (queryParams = "") => {
  try {
    const res = await fetch(`${baseURL}?${queryParams}`, {
      method: "GET",
      cache: "no-store",
    });

    return await res.json();
  } catch (error: any) {
    console.error("Error fetching tutors:", error);
    return null;
  }
};
    
export const getsubjects= async () => {
  try {
    const res = await fetch(`${baseURL}/all/subjects`, {
      method: "GET",
      cache: "no-store",
    });

    return await res.json();
  } catch (error: any) {
    console.error("Error fetching tutors:", error);
    return null;
  }
};
// Get a single tutor by ID
export const getSingleTutor = async (id: string) => {
  try {
    // const token =await getValidToken()
    const res = await fetch(`${baseURL}/${id}`, {
      method: "GET",
      cache: "no-store",
    });

    return await res.json();
  } catch (error: any) {
    console.error("Error fetching tutor:", error);
    return null;
  }
};

// Update tutor profile (for tutor or admin)
export const updateTutorProfile = async (
  id: string,
  data: any,
  token: string
) => {
  try {
    const res = await fetch(`${baseURL}/${id}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
        Authorization: ` ${token}`,
      },
      body: JSON.stringify(data),
    });

    return await res.json();
  } catch (error: any) {
    console.error("Error updating tutor:", error);
    return null;
  }
};

// Approve tutor request (admin only)
export const handleTutorRequest = async (
  id: string,
  approvalData: any,

) => {
  try {  const token = await getValidToken();
    const res = await fetch(`${baseURL}/request/${id}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(approvalData),
    });

    return await res.json();
  } catch (error: any) {
    console.error("Error approving tutor:", error);
    return null;
  }
};
