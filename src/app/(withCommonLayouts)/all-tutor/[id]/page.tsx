// import { getSingleTutor } from "@/services/tutor.service";
import { getSingleTutor } from "@/app/Services/TutorServices";
// import { notFound } from "next/navigation";

type Params = {
  params: {
    id: string;
  };
};
export async function generateMetadata({ params }: { params: { id: string } }) {
  const tutor = await getSingleTutor(params.id);

  return {
    title: tutor?.data?.name || "Tutor Details",
    description: tutor?.data?.bio || "Details about the selected tutor",
  };
}


const TutorDetailsPage = async ({ params }: Params) => {
  const id = params.id;

  const tutorData = await getSingleTutor(id);

  if (!tutorData?.data) {
    return 'no data '
  }

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold">{tutorData.data.name}</h1>
      <p>{tutorData.data.bio}</p>
      {/* Render other details here */}
    </div>
  );
};

export default TutorDetailsPage;
