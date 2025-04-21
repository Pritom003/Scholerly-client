/* eslint-disable @typescript-eslint/no-explicit-any */
import { getValidToken } from "@/lib/varifyToken";

const baseURL = "http://localhost:5000/api/v1/review";

// 👉 Create a new review
export const createReview = async (payload: any) => {
  try {
    const token = await getValidToken();
    const res = await fetch(`${baseURL}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `${token}`,
      },
      body: JSON.stringify(payload),
    });

    return await res.json();
  } catch (error: any) {
    console.error("Error creating review:", error);
    return null;
  }
};

// 👉 Get all reviews for a specific tutor
export const getReviewsByTutorId = async (tutorId: string) => {
  try {
    const res = await fetch(`${baseURL}/${tutorId}`, {
      method: "GET",
      cache: "no-store",
    });

    return await res.json();
  } catch (error: any) {
    console.error("Error fetching reviews:", error);
    return null;
  }
};
export const getAllreviws= async (queryParams:string) => {
  try {
    const res = await fetch(`${baseURL}?${queryParams}`, {
      method: "GET",
      cache: "no-store",//i want to store it 
    });

    return await res.json();
  } catch (error: any) {
    console.error("Error fetching reviews:", error);
    return null;
  }
};

// 👉 Delete a review
export const deleteReview = async (reviewId: string) => {
  try {
    const token = await getValidToken();
    const res = await fetch(`${baseURL}/${reviewId}`, {
      method: "DELETE",
      headers: {
        Authorization: `${token}`,
      },
    });

    return await res.json();
  } catch (error: any) {
    console.error("Error deleting review:", error);
    return null;
  }
};

// 👉 Update a review
export const updateReview = async (reviewId: string, payload: any) => {
  try {
    const token = await getValidToken();
    const res = await fetch(`${baseURL}/${reviewId}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: `${token}`,
      },
      body: JSON.stringify(payload),
    });

    return await res.json();
  } catch (error: any) {
    console.error("Error updating review:", error);
    return null;
  }
};
