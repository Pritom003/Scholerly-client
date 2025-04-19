/* eslint-disable @typescript-eslint/no-explicit-any */
import { getSingleTutor } from "@/app/Services/TutorServices";
import PageBanner from "@/component/PageBanner/PageBanner";
import AvailabilityGrid from "./Available";
import Image from "next/image";
import Container from "@/component/Shared/Container/Container";
import BookNowButton from "@/component/Booking/BookNowButton";
// import BookNowButton from "@/components/BookNowButton"; // Import the client component

type Params = {
  params: {
    id: string;
  };
};

export function generateMetadata() {
  return {
    title: "Tutor Details",
    description: "Details about the selected tutor",
  };
}

const TutorDetailsPage = async ({ params }: Params) => {
  const { id } =  await params;
  const tutordata = await getSingleTutor( id);
  const tutor = tutordata?.data;

  if (!tutor) {
    return <p>No data available.</p>;
  }

  return (
    <div className="p-6">
      <PageBanner title={tutor.name} description={`Profile of ${tutor.name}`} />
      <Container>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="w-full h-full">
            <Image
              src={tutor.profileImage}
              alt={tutor.name}
              width={300}
              height={300}
              className="object-cover rounded-xl w-full h-[300px]"
            />
            <div className="w-full grid justify-center align-bottom my-8">
              {/* The Book Now button automatically triggers booking without needing user input */}
              <BookNowButton tutor={tutor} />
            </div>
          </div>
          <div className="md:col-span-2 space-y-4">
            <h2 className="text-3xl font-semibold">{tutor.name}</h2>
            <p className="text-gray-600">{tutor.bio}</p>
            <div className="grid gap-4 text-sm text-gray-700">
              <p className="text-black text-xl font-bold">
                <span className="font-bold text-xl text-[#815606]">Hourly Rate:</span> ${tutor.hourlyRate}
              </p>
              <p className="text-black text-xl font-bold">
                <span className="font-bold text-xl text-[#815606]">Email:</span> {tutor.email}
              </p>
              <p className="text-black text-xl font-bold">
                <span className="font-bold text-xl text-[#815606]">Phone:</span> {tutor.phone}
              </p>
            </div>
            <div>
              <p>
                <span className="font-bold text-xl">Preferred Location:</span> {tutor.location}
              </p>
              <p>
                <span className="font-bold text-xl">Expertise in (subjects):</span> {tutor.subjects?.join(", ")}
              </p>
            </div>
            <h3 className="font-bold text-xl text-[#815606] mb-2">Qualifications</h3>
            <ul className="list-disc ml-6">
              {tutor.qualifications?.map((q: any, idx: number) => (
                <li key={idx}>
                  {q.degree} — {q.institution} ({q.year})
                </li>
              ))}
            </ul>
          </div>
        </div>
        {/* Tutor availability section */}
        <div className="mt-8">
          <h3 className="font-bold text-xl text-[#815606] mb-4">Availability</h3>
          <div className="bg-white rounded-lg shadow p-4">
            <AvailabilityGrid availability={tutor.availability} />
          </div>
        </div>
      </Container>
    </div>
  );
};

export default TutorDetailsPage;
