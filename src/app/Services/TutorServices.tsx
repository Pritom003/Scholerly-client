/* eslint-disable @typescript-eslint/no-explicit-any */
const baseURL = "http://localhost:5000/api/v1/tutor";

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

// Get a single tutor by ID
export const getSingleTutor = async (id: string, token?: string) => {
  try {
    const res = await fetch(`${baseURL}/${id}`, {
      method: "GET",
      headers: {
        Authorization: token ? `Bearer ${token}` : "",
      },
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
        Authorization: `Bearer ${token}`,
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
export const approveTutorRequest = async (
  id: string,
  approvalData: any,
  token: string
) => {
  try {
    const res = await fetch(`${baseURL}/approve/${id}`, {
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
