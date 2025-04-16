import React from "react";
import { Card, Rate } from "antd";

interface TutorCardProps {
  name: string;
  image: string;
  rating?: number;
  totalBookings: number;
}

const TutorCard: React.FC<TutorCardProps> = ({
  name,
  image,
  rating = 0,
  totalBookings,
}) => {
  return (
    <Card
      className="!p-0 !border-none shadow-md w-full max-w-2xl overflow-hidden rounded-xl"
      bodyStyle={{ padding: 0 }}
    >
      <div className="flex h-40 relative">
        {/* Black section */}
        <div className="w-1/3 bg-black relative z-10" />

        {/* White section */}
        <div className="w-2/3 bg-white p-4 relative z-10 flex flex-col justify-center">
          <h2 className="text-lg font-semibold">{name}</h2>
          <div className="flex items-center gap-2 mt-2">
            <Rate disabled allowHalf defaultValue={rating} />
            <span className="text-sm text-gray-600">({rating || 0})</span>
          </div>
          <p className="text-sm mt-2 text-gray-500">
            Total Bookings: {totalBookings}
          </p>
        </div>

        {/* Image overlapping both sections */}
        <div className="absolute left-1/3 top-1/2 transform -translate-x-1/2 -translate-y-1/2 z-20">
          <img
            src={image}
            alt={name}
            className="w-28 h-28 rounded-full border-4 border-white object-cover shadow-lg"
          />
        </div>
      </div>
    </Card>
  );
};

export default TutorCard;
