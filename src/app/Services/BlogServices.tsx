import { getValidToken } from "@/lib/varifyToken";

/* eslint-disable @typescript-eslint/no-explicit-any */
const baseURL = `${process.env.NEXT_PUBLIC_BASE_API}/api/v1/blogs`;

export const createBlog = async (payload: FormData) => {
  try {
    const token = await getValidToken();
    const res = await fetch(`${baseURL}`, {
      method: "POST",
      headers: {
        Authorization: `${token}`,
      },
      body: payload,
      cache: "no-store",
    });
    return await res.json();
  } catch (error) {
    console.error("Error creating blog:", error);
    return null;
  }
};



// Get a blog by ID
export const getBlogById = async (id: string) => {
  try {
 
    const res = await fetch(`${baseURL}/single/${id}`, {
      method: "GET",
    
      cache: "no-store",
    });
    return await res.json();
  } catch (error) {
    console.error("Error fetching blog by ID:", error);
    return null;
  }
};

// Get all blogs (public or admin view)
export const getAllBlogs = async (queryParams = "") => {
  try {
 
    const res = await fetch(`${baseURL}/all?${queryParams}`, {
      method: "GET",
      
      cache: "no-store",
    });
    return await res.json();
  } catch (error) {
    console.error("Error fetching all blogs:", error);
    return null;
  }
};
export const getMostLikedBlogs = async () => {
  try {
 
    const res = await fetch(`${baseURL}/most-liked`, {
      method: "GET",
      
      cache: "no-store",
    });
    return await res.json();
  } catch (error) {
    console.error("Error fetching all blogs:", error);
    return null;
  }
};

// Get blogs by user ID (similar to getBookingsByStudentId/TutorId)
export const getBlogsByUserId = async (userId: string) => {
  try {
    const token = await getValidToken();
    const res = await fetch(`${baseURL}/tutor/${userId}`, {
      method: "GET",
      headers: {
        Authorization: `${token}`,
      },
      cache: "no-store",
    });
    return await res.json();
  } catch (error) {
    console.error("Error fetching user blogs:", error);
    return null;
  }
};
export const addComment = async (blogId: string, text: string) => {
  try {
    const token = await getValidToken();
    console.log("Token being sent:", token);
    const res = await fetch(`${baseURL}/${blogId}/comments`, {
      method: "POST",
       headers: {
    "Content-Type": "application/json",
      Authorization: `${token}`,
  },
      body: JSON.stringify({ text }),
    });
    return await res.json();
  } catch (error) {
    console.error("Error adding comment:", error);
    return { success: false };
  }
};


export const toggleLike = async (blogId: string) => {
  try {
    const token = await getValidToken();
    const res = await fetch(`${baseURL}/${blogId}/like`, {
      method: "PATCH",
      headers: {
        Authorization: `${token}`,
      },
    });
    return await res.json();
  } catch (error) {
    console.error("Error toggling like:", error);
    return null;
  }
};
export const updateBlogStatus = async (
  id: string,
  status: "approved" | "rejected"
): Promise<{ success: boolean; message?: string }> => {
  try {
    const token = await getValidToken();
    const res = await fetch(`${baseURL}/${id}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
        Authorization: `${token}`,
      },
      body: JSON.stringify({ status }),
    });

    return await res.json();
  } catch (error: any) {
    console.error("Error updating blog status:", error);
    return {
      success: false,
      message: error.message || "Something went wrong",
    };
  }
};
export const updateBlog = async (blogId: string, payload: FormData) => {
  try {
    const token = await getValidToken();
    const res = await fetch(`${baseURL}/${blogId}`, {
      method: "PATCH",
      headers: {
        Authorization: `${token}`,
        // Do NOT set Content-Type manually for FormData
      },
      body: payload,
      cache: "no-store",
    });

    return await res.json();
  } catch (error) {
    console.error("Error updating blog:", error);
    return null;
  }
};

// Add deleteBlog service function
export const deleteBlog = async (blogId: string) => {
  try {
    const token = await getValidToken();
    const res = await fetch(`${baseURL}/deleteblog/${blogId}`, {
      method: "DELETE",
      headers: {
        Authorization: `${token}`,
      },
      cache: "no-store",
    });
    return await res.json();
  } catch (error) {
    console.error("Error deleting blog:", error);
    return null;
  }
};
