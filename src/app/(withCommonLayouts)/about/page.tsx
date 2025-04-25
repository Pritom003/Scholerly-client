

import React from "react";
import Image from "next/image";
import PageBanner from "@/component/PageBanner/PageBanner";
import Container from "@/component/Shared/Container/Container";
import SectionTitle from "@/component/Shared/SectionTitle";
import SideImage from "../../../../public/pexels-julia-m-cameron-4145037 (1).jpg";
import achivementBanner from  "../../../../public/group-people-working-out-business-plan-office.jpg";
import certificate1 from  "../../../../public/certificate.jpg";
import certificate2 from  "../../../../public/certificate1.jpg";
import certificate3 from  "../../../../public/certificate-2.jpg";
const missionPoints = [
  { title: "Quality Education", description: "Providing top-notch learning experiences." },
  { title: "Expert Tutors", description: "Connecting students with skilled professionals." },
  { title: "Flexible Learning", description: "Ensuring accessibility for all schedules." },
  { title: "Growth Mindset", description: "Encouraging personal and academic development." },
  { title: "Community Support", description: "Building a strong learning ecosystem." },
  { title: "Innovation First", description: "Continuously improving through technology." },
];

const AboutPage = () => {
  return (
    <div>
        <PageBanner
          title="About Us"
          description="We are a team of passionate individuals dedicated to providing the best"
        />
      <Container>
        

        {/* Side-by-side layout */}
        <div className="flex flex-col lg:flex-row gap-10 items-center mt-10">
          {/* Left: Image */}
          <div className="w-full lg:w-1/2 h-full">
            <Image
              src={SideImage}
              alt="julia"
              className="rounded-lg object-cover w-full h-full max-h-[600px]"
            />
          </div>

          {/* Right: Mission Content */}
          <div className="w-full lg:w-1/2 space-y-6">
            <SectionTitle text="Our Mission" description="Map To Be The Best" />

            <ul className="space-y-4">
              {missionPoints.map((point, index) => (
                <li key={index} className="relative pl-8">
                  <span className="absolute italic left-0 top-0 text-[#815606]  text-3xl font-bold">
                    {index + 1}
                  </span>
                  <h4 className="font-semibold text-lg flex items-center gap-2">
                    <span className="text-[#815606] ">-</span> {point.title}
                  </h4>
                  <p className="text-sm text-gray-600">{point.description}</p>
                </li>
              ))}
            </ul>
          </div>
        </div>
        {/* Our Achievements Section */}
        {/* change the section design first show the banner image ont he bottom middle show three cards (the cards should be 50% over the banner iamge and 50% outside thbe banner ) with certificate iamge link and title and description . certificate image should have black overlay and  */}
<div className="mt-16">
  <SectionTitle
    text="Our Achievements"
    description=" milestones that define our journey"
  />


{/* Our Achievements Section */}
<div className="mt-24 relative">
  {/* Banner Image */}
  <div className="w-full h-[400px] relative">
    <Image
      src={achivementBanner}
      alt="Achievements Banner"
      fill
      className="object-cover rounded-xl"
    />
    <div className="absolute inset-0  bg-opacity-4 rounded-xl flex flex-col justify-center items-center text-white text-center">
      
    </div>
  </div>

  {/* Certificates Section */}
  <div className="absolute top-[65%] left-1/2 transform -translate-x-1/2 w-full px-4 sm:px-10">
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {[certificate1, certificate2, certificate3].map((cert, i) => (
       <div
       key={i}
       className="rounded-xl overflow-hidden shadow-md
        bg-white hover:shadow-lg transition duration-300"
     >
       {/* Image at top */}
       <div className="h-24 w-full relative">
         <Image
           src={cert}
           alt={`Certificate ${i + 1}`}
           fill
           className="object-cover"
         />
       </div>
     
       {/* Content below image */}
       <div className="p-4">
         <h3 className="text-lg font-semibold text-gray-800 mb-2">
           Achivements {i + 1}
         </h3>
        
         <a
           href="https://en.wikipedia.org/wiki/Certificate_(education)"
           target="_blank"
           rel="noopener noreferrer"
           className="text-[#815606] text-sm underline"
         >
           Learn more →
         </a>
       </div>
     </div>
     
      ))}
    </div>
  </div>
</div>

{/* Spacer for overlap */}
<div className="h-[250px]" />

{/* Spacer for overlap */}
<div className="h-[250px]" />

</div>

      </Container>
    </div>
  );
};

export default AboutPage;
