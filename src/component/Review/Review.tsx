"use client";

import { useState, useEffect } from "react";
import { Rate, Button, Input, message } from "antd";
import { DeleteOutlined } from "@ant-design/icons";
import { createReview, deleteReview, getReviewsByTutorId } from "@/app/Services/reviewServices";
import Image from "next/image";
import { useUser } from "@/context/useContext";


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
//   const { data: session }: any = useSession(); // Assuming you're using next-auth
  const { user } = useUser();

  const fetchReviews = async () => {
    try {
      const data = await getReviewsByTutorId(tutorId)
     
      console.log(data,'get');
      setReviews(data?.data || []);
    } catch (error) {
      console.error(error);
    }
  };

  const handleSubmit = async () => {
    console.log(comment,rating,'before');
    if (!comment || rating === 0) return message.warning("Please add a rating and comment");
    const payload ={
        tutorId:tutorId,
        userId: user?.id,
        rating: rating,
        comment: comment
      
    }
console.log(payload,'payload');
    try {
      const data = await createReview(payload);

      // const data = await res.json();
      console.log(data,'post');
      if (data.success) {
        message.success("Review added!");
        setComment("");
        setRating(0);
        fetchReviews();
      }
    } catch (error) {
      console.error(error);
    }
  };

  const handleDelete = async (reviewId: string) => {
    try {
      const data = await deleteReview(reviewId)
console.log(data);
    
      if (data.success) {
        message.success("Review deleted!");
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
      <h3 className="text-xl font-semibold text-[#815606]">Leave a Review</h3>
      <Rate onChange={setRating} value={rating} />
      <Input.TextArea
        rows={4}
        placeholder="Write your comment..."
        value={comment}
        onChange={(e) => setComment(e.target.value)}
      />
      <Button type="primary" onClick={handleSubmit}>
        Submit
      </Button>

      <h3 className="text-xl font-semibold text-[#815606] mt-8">Reviews</h3>
      {reviews.map((review) => (
        <div key={review._id} className="flex items-start gap-4 border p-3 rounded">
          <Image
            src={review?.userId.Profileimage|| "https://res.cloudinary.com/dkal4qazy/image/upload/v1744812682/profile_1744812678684.png"}
            alt={review.userId.name}
            width={40}
            height={40}
            className="rounded-full"
          />
          <div className="flex-1">
            <div className="flex justify-between">
              <div>
                <p className="font-bold">{review.userId.name}</p>
                <Rate disabled value={review.rating} />
              </div>
              {(user?.email === review.userId.email || user?.role === "admin") && (
                <DeleteOutlined
                  className="text-red-500 hover:text-red-700 cursor-pointer"
                  onClick={() => handleDelete(review._id)}
                />
              )}
            </div>
            <p>{review.comment}</p>
          </div>
        </div>
      ))}
    </div>
  );
};

export default ReviewFunc;
