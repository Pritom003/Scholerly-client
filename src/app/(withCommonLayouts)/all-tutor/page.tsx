// app/all-tutor/page.tsx
import PageBanner from "@/component/PageBanner/PageBanner";
import Container from "@/component/Shared/Container/Container";
import { getAllTutors } from "@/app/Services/TutorServices";
// import ClientTutorsSection from "./ClientTutorsSection"; // renamed for clarity
import { ITutor } from "@/component/HomeComponents/OurTutors/OurTutor";
import ClientTutorsSection from "./TutorWrapper";

type PageProps = {
  searchParams?: Record<string, string | string[] | undefined>;
};

const TutorsPage = async ({ searchParams }: PageProps) => {
  const query = new URLSearchParams(
    Object.entries(searchParams || {}).filter(([, v]) => typeof v === "string") as [string, string][]
  ).toString();

  const data = await getAllTutors(query);
  const tutors = data?.data?.tutors || [];
  const approvedTutors = tutors.filter((tutor: ITutor) => tutor.request === "approved");

  return (
    <div>
      <PageBanner title="All Tutors" description="Find the tutor that matches your preference" />
      <Container>
        <ClientTutorsSection tutors={approvedTutors} />
      </Container>
    </div>
  );
};

export default TutorsPage;
