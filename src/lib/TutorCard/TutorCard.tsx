import React from "react";
import { Card } from "antd";
import Image from "next/image";
import { MapPin, MoveRight, Star } from "lucide-react";
import Link from "next/link";

interface Qualification {
  degree: string;
  institution: string;
  graduationYear?: number;
  experience?: string;
}

interface TutorCardProps {
  name: string;
  image: string;
  id:string
  rating?: number;
  hourlyRate: number;
  location: string;
  qualifications: Qualification[];
}

const TutorCard: React.FC<TutorCardProps> = ({
  name,
  image,
  id,
  rating = 0,
  hourlyRate,
  location,
  qualifications = [],
}) => {
  const qualification = qualifications[0]; // show first qualification if exists
  const hasExperience = qualification?.experience;
  const education = qualification ? `${qualification.degree}, ${qualification.institution}` : null;

  return (
    <Card
      className="!p-0 !border-none shadow-md max-w-[400px] overflow-hidden rounded-xl"
      styles={{ body: { padding: 0 } }}
    >
      <div className="flex h-40 relative">
        {/* Black section */}
        <div className="w-1/6 bg-[#815606] relative z-10" >
        <div className="flex items-center text-white
         pl-2 gap-2 mt-1 ">
            <Star color="white" size={16} />
            <span className="text-sm">({rating})</span>
          </div>
        </div>

        {/* White section */}
        <div className="w-5/6 bg-[#f7f7fa] px-2  relative z-10 flex flex-col justify-center">
         <div className="pl-12">
         <h2 className="text-lg font-semibold">{name}</h2>

     

<p className="text-sm mt-2 text-gray-500 line-clamp-1">
  {hasExperience || education}
</p>

<p className="text-sm text-gray-500 mt-1"> Price : ${hourlyRate}/hr</p>
<p className="text-sm text-gray-500 mt-1 flex justify-start align-middle gap-2  "> <span className=" mt-1.5"><MapPin size={14}></MapPin> </span>{location}</p>
         </div>
       <div className="w-full flex justify-end  p-4 font-bold">
        <Link className="text-[#815606]   hover:underline"  href={`/all-tutor/${id}`}>
        <p className="text-[#815606] flex ">view profile <MoveRight></MoveRight> </p>
        
        </Link>
       </div>
        </div>

        {/* Profile Image */}
        <div className="absolute left-1/6 top-1/2 transform -translate-x-1/2 -translate-y-1/2 z-20">
          <div className="w-20 h-20 rounded-full border-4 border-white overflow-hidden shadow-lg relative">
            <Image src={image} alt={name} fill className="object-cover" />
          </div>
        </div>
      </div>
    </Card>
  );
};

export default TutorCard;
