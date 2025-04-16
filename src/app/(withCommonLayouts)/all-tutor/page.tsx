/* eslint-disable @typescript-eslint/no-explicit-any */
// app/tutors/page.tsx
import { getAllTutors } from "@/app/Services/TutorServices";
import TutorCard from "@/lib/TutorCard/TutorCard";
// import TutorCard from "@/components/TutorCard"; // Adjust this path as needed

const TutorsPage = async () => {
  const data = await getAllTutors("page=1&limit=10");
  const tutors = data?.data?.tutors || [];
  console.log(tutors);

  return (
    <div className="max-w-7xl mx-auto p-6">
      <h2 className="text-2xl font-bold mb-6 text-center">All Tutors</h2>
      <div className="grid gap-6">
        {tutors.map((tutor: any) => (
          <TutorCard
            key={tutor._id}
            name={`${tutor.name?.firstname || ""} ${tutor.name?.lastname || ""}`}
            image={tutor.image || "/default-avatar.png"} // fallback image
            rating={tutor.rating || 0}
            totalBookings={tutor.totalBookings || 0}
          />
        ))}
      </div>
    </div>
  );
};

export default TutorsPage;
