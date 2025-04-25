import { getValidToken } from "@/lib/varifyToken";

const baseURL = `${process.env.NEXT_PUBLIC_BASE_API}/api/v1/notification`;




export const getUserNotifications = async (userId:string) => {
  try {
    const token = await getValidToken()
    const res = await fetch(`${baseURL}/${userId}`, {
      method: 'GET',
      headers: {
        Authorization: `${token}`,
      },
      cache: 'no-store',
    })
    return await res.json()
  } catch (error) {
    console.error('Error fetching notifications:', error)
    return []
  }
}

// Mark a notification as read
export const markNotificationAsRead = async (notificationId: string) => {
  try {
    const token = await getValidToken();
    const res = await fetch(`${baseURL}/read/${notificationId}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
        Authorization: `${token}`,
      },
      body: JSON.stringify({ read: true }),
    });
    return await res.json();
  } catch (error) {
    console.error("Error marking notification as read:", error);
    return null;
  }
};

// Optional: Send a new notification (for admin/internal use)
export const sendNotification = async (payload: { message: string; recipientId: string }) => {
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
  } catch (error) {
    console.error("Error sending notification:", error);
    return null;
  }
};
