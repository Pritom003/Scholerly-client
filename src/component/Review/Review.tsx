"use client";

import { useState, useEffect } from "react";
import { Rate, Input, message } from "antd";
import { SendOutlined, DeleteOutlined, LoadingOutlined } from "@ant-design/icons";
import { createReview, deleteReview, getReviewsByTutorId } from "@/app/Services/reviewServices";
import Image from "next/image";
import { useUser } from "@/context/useContext";
import { toast } from "sonner";

interface Review {
  _id: string;
  userId: {
    name: string;
    email: string;
    Profileimage: string;
  };
  tutorId: {
    name: string;
    profileImage: string;
  };
  rating: number;
  comment: string;
}

const ReviewFunc = ({ tutorId }: { tutorId: string }) => {
  const [reviews, setReviews] = useState<Review[]>([]);
  const [rating, setRating] = useState<number>(0);
  const [comment, setComment] = useState<string>("");
  const { user } = useUser();
  const [loading, setLoading] = useState(false);

// console.log(user);
  const fetchReviews = async () => {
    try {
      const data = await getReviewsByTutorId(tutorId);
      console.log(data);
      setReviews(data?.data || []);
    } catch (error) {
      console.error(error);
    }
  };

const handleSubmit = async () => {
  console.log('clikcke');
  if (!comment || rating === 0) return message.warning("Please add a rating and comment");

  const payload = {
    tutorId,
    userId: user?.id,
    rating,
    comment,
  };

  try {
    setLoading(true); // start loading
    const data = await createReview(payload);
    if (data.success) {
      toast.success("Review added!");
      setComment("");
      setRating(0);
      fetchReviews();
    }
  } catch (error) {
    console.error(error);
    toast.error("Something went wrong!");
  } finally {
    setLoading(false); // end loading
  }
};


  const handleDelete = async (reviewId: string) => {
    try {
      const data = await deleteReview(reviewId);
      console.log();
      if (data.success) {
        toast.success("Review deleted!");
        fetchReviews();
      }
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    fetchReviews();
  }, []);

  return (
    <div className="space-y-6">
      <h3 className="text-xl font-semibold
       text-[#815606]">Leave a Review</h3>

      <Rate onChange={setRating} value={rating} className="mb-2" />

   <div className="flex items-start gap-3">
  <Image
 src={user?.image||
  "https://res.cloudinary.com/dkal4qazy/image/upload/v1744812682/profile_1744812678684.png"
}

    alt="User"
    width={40}
    height={40}
    className="rounded-full mt-1"
  />
  <div className="relative w-full">
    <Input.TextArea
      rows={2}
      value={comment}
      onChange={(e) => setComment(e.target.value)}
      placeholder="Write your comment..."
      className="!pr-10 !bg-gray-100 !text-sm !rounded-md"
      disabled={!user}
    />
   {loading ? (
  <LoadingOutlined
    className="absolute right-3 top-2.5 text-[#815606] text-lg animate-spin"
  />
) : (
  <SendOutlined
    onClick={handleSubmit}
    className={`absolute right-3 top-2.5 text-[#815606] text-lg cursor-pointer hover:scale-110 transition ${
      !user && "opacity-50 cursor-not-allowed"
    }`}
  />
)}

    {!user && (
      <p className="text-xs  text-red-700 mt-1">
        Please log in to add a comment.
      </p>
    )}
  </div>
</div>


      <h3 className="text-xl font-semibold text-[#815606] mt-8">Reviews</h3>

      {reviews.map((review) => (
        <div key={review._id} className="flex items-start gap-4 border p-4 rounded-md bg-white shadow-sm">
       <Image
            src={review?.userId.Profileimage|| "https://res.cloudinary.com/dkal4qazy/image/upload/v1744812682/profile_1744812678684.png"}
            alt={review.userId.name}
            width={40}
            height={40}
            className="rounded-full"
          />
          <div className="flex-1">
            <div className="flex justify-between items-start">
              <div>
                <p className="font-semibold">{review.userId.name}</p>
                <Rate disabled value={review.rating} style={{ fontSize: "16px" }} />
              </div>
              {(user?.email === review.userId.email || user?.role === "admin") && (
                <DeleteOutlined
                  className="text-red-500 hover:text-red-700 cursor-pointer"
                  onClick={() => handleDelete(review._id)}
                />
              )}
            </div>
            <p className="mt-1 text-sm text-gray-700">{review.comment}</p>
          </div>
        </div>
      ))}
    </div>
  );
};

export default ReviewFunc;
