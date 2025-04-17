/* eslint-disable @typescript-eslint/no-explicit-any */
// app/tutors/page.tsx
import { getAllTutors } from "@/app/Services/TutorServices";
import PageBanner from "@/component/PageBanner/PageBanner";
import Container from "@/component/Shared/Container/Container";
import TutorCard from "@/lib/TutorCard/TutorCard";
// import TutorCard from "@/components/TutorCard"; // Adjust this path as needed

const TutorsPage = async () => {
  const data = await getAllTutors("page=1&limit=10");
  const tutors = data?.data?.tutors || [];


  return (
    <div className="">
      <PageBanner title="All-Tutors" description="Find the tutor that match your preference"></PageBanner>
   
     <Container>
     <div   data-aos="fade-up"
            data-aos-duration="2000" className="grid gap-6 md:grid-cols-3  ">
        {tutors.map((tutor: any) => (
  <TutorCard
  key={tutor._id}
  id={tutor._id}
  name={tutor.name}
  image={tutor.profileImage}
  rating={tutor.rating}
  hourlyRate={tutor.hourlyRate}
  location={tutor.location}
  qualifications={tutor.qualifications}
/>

        ))}
      </div>
     </Container>
    </div>
  );
};

export default TutorsPage;
