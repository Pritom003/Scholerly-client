// app/all-tutor/page.tsx
import PageBanner from "@/component/PageBanner/PageBanner";
// import Container from "@/component/Shared/Container/Container";
import ClientTutorsSection from "./TutorWrapper";

const TutorsPage = () => {
  return (
    <div>
      <PageBanner title="All Tutors" description="Find the tutor that matches your preference" />

        <ClientTutorsSection />
     
    </div>
  );
};

export default TutorsPage;
