"user client"
import React from 'react'
import { Card,  Rate } from 'antd'
import { PhoneOutlined, MailOutlined} from '@ant-design/icons'
import Image from 'next/image'
import heroImage from '../../../public/kat2.jpg' // replace wi1th your actual image path
import Container from '../Shared/Container/Container'
import SearchBar from '../searchComponent/serchALltutor'
// import Logo from '@/app/assets/Logo'
// import Logo from '@/app/assets/Logo'

const HeroHome = () => {
  return (
    <div className="w-full  mb-10">
      {/* Top Section: Title + Contact Card */}
   <Container>
   <div className="w-[90%] mx-auto flex flex-col
    lg:flex-row justify-between  items-center align-middle
    gap-10  ">
        {/* Left: Title + Description */}
        <div className="flex-1  animate-fade-out
         fadeOut-animation"
         data-aos="fade-right"
         data-aos-duration="1200" 
          data-aos-easing="ease-in-out"
        >
          <h1 className="text-2xl  font-bold
           text-[#815606] flex  align-middle items-center gap-2 "> 
        <svg height="6" width="60" xmlns="http://www.w3.org/2000/svg">
  <line x1="0" y1="10" x2="250" y2="10"
   style={{ stroke: "#815606", strokeWidth: 12 }}
   
   />
 
</svg>
           
           Scholerly</h1>
          <p className="text-5xl font-semibold 
          leading-snug text-gray-700">
            Expert tutors<br />
            at your fingertips.
          </p>
          <p className="text-gray-600 text-base
          md:text-lg">
            Find the perfect tutor for your learning journey. Whether you’re looking for math help,
            language learning, or coding lessons — we’ve got you covered.
          </p>
        </div>

    
   {/* Right: Contact Card */}
<div
  className="relative z-30 w-80  md:mb-10"
  data-aos="fade-left"
  data-aos-duration="2000"
>
  <Card
    className="shadow-xl lg:absolute w-72 md:w-96 
     h-96 lg:bottom-[-100px] lg:left-0"
    style={{ borderRadius: '16px' }}
  >
    <div className="space-y-2 relative pt-20" >
      <p className="text-gray-700 max-w-64 font-medium ">
        <span className='h-10'></span>
        <svg
        className="h-18  absolute top-2 -left-10"
        version="1.0"
        xmlns="http://www.w3.org/2000/svg"
        width="300.000000pt"
        height="229.000000pt"
        viewBox="0 0 300.000000 229.000000"
        preserveAspectRatio="xMidYMid meet"
      >
 <g transform="translate(0.000000,229.000000) scale(0.100000,-0.100000)" fill="#000000" stroke="none"> <path d="M1325 1863 c-77 -25 -147 -47 -155 -51 -8 -3 29 -11 83 -17 54 -7 100 -14 102 -17 3 -3 0 -20 -7 -38 -10 -29 -8 -39 11 -75 34 -65 91 -89 168 -71 37 9 92 66 94 99 1 12 2 38 3 57 l1 35 100 11 c55 6 93 13 85 16 -61 24 -311 98 -326 97 -11 -1 -82 -21 -159 -46z m218 -8 c77 -23 85 -29 63 -54 -11 -12 -20 -40 -22 -68 -2 -39 -9 -53 -34 -75 -41 -37 -100 -39 -135 -3 -25 24 -29 37 -25 88 1 16 -6 37 -15 47 -25 27 -15 41 41 61 62 22 65 22 127 4z"/> <path d="M870 1749 c-10 -19 0 -33 102 -137 62 -65 119 -123 126 -131 10 -10 13 -62 11 -220 l-1 -206 93 -36 c52 -19 137 -50 190 -68 l96 -33 99 35 c273 97 284 102 279 115 -3 8 -5 95 -6 195 -1 165 -2 178 -14 142 -9 -25 -14 -94 -14 -183 l-1 -143 -57 -25 c-78 -35 -113 -41 -113 -20 0 9 -4 16 -10 16 -5 0 -10 -10 -10 -21 0 -18 -2 -19 -15 -9 -14 12 -20 5 -17 -22 2 -14 -78 -38 -100 -29 -13 5 -38 6 -56 4 -41 -7 -89 13 -95 38 -3 13 -11 17 -21 13 -11 -4 -16 -2 -14 6 2 7 -3 15 -10 17 -8 3 -10 -1 -6 -11 4 -10 1 -16 -9 -16 -19 0 -127 40 -144 53 -10 7 -13 51 -13 158 0 81 -5 160 -10 175 -18 46 0 41 50 -13 26 -29 49 -50 51 -48 2 2 3 52 1 112 l-3 108 -52 33 c-29 18 -61 38 -72 45 -11 6 -59 38 -107 70 -48 31 -94 57 -102 57 -9 0 -20 -9 -26 -21z m298 -184 c28 -23 32 -33 32 -75 0 -27 -4 -51 -9 -54 -5 -3 -21 11 -37 32 -15 20 -55 66 -89 102 -98 105 -98 107 -9 62 45 -22 95 -53 112 -67z"/> <path d="M1976 1710 c-49 -33 -92 -60 -97 -60 -5 0 -41 -21 -79 -46 l-70 -47 0 -108 c0 -60 4 -109 9 -109 5 0 11 4 13 10 3 8 80 90 276 291 68 70 83 91 77 108 -10 33 -34 26 -129 -39z m-2 -62 c-14 -24 -188 -208 -196 -208 -4 0 -8 24 -8 54 0 62 3 65 130 128 88 43 83 41 74 26z"/> <path d="M1110 1690 c0 -33 11 -38 30 -15 10 12 28 15 69 13 l56 -3 8 -70 c4 -38 7 -154 5 -257 l-3 -187 104 -38 104 -39 101 37 101 37 5 240 c5 218 7 242 24 261 23 26 91 29 124 5 19 -13 22 -13 22 0 0 8 3 21 6 30 5 14 -5 16 -78 16 l-84 0 -17 -54 c-52 -163 -277 -198 -373 -57 -13 20 -27 53 -30 74 l-7 37 -83 0 -84 0 0 -30z m273 -184 l69 -34 -30 -18 c-41 -24 -56 -54 -48 -101 8 -48 8 -51 0 -89 -5 -25 0 -36 26 -62 27 -27 39 -32 82 -32 44 0 54 4 85 35 32 32 34 39 29 73 -6 35 -7 54 -5 112 1 16 -11 36 -35 57 -31 28 -34 34 -19 39 10 3 37 14 61 25 23 10 47 19 53 19 6 0 8 -61 7 -167 l-3 -168 -60 -24 c-89 -35 -125 -37 -198 -11 -34 12 -68 27 -74 32 -10 8 -13 56 -13 179 0 93 1 169 3 169 1 0 33 -16 70 -34z m140 -77 c21 -9 47 -46 47 -64 0 -3 -16 -5 -35 -5 -25 0 -35 4 -35 16 0 9 -7 14 -16 12 -27 -5 -18 -22 27 -49 45 -26 56 -49 45 -94 -12 -48 -110 -56 -141 -12 -24 34 -19 47 20 47 24 0 35 -5 35 -15 0 -8 7 -15 15 -15 29 0 14 30 -25 50 -50 25 -68 59 -52 95 18 40 69 55 115 34z"/> <path d="M820 1315 c0 -33 48 -66 148 -104 l103 -40 -3 32 c-3 29 -8 33 -88 64 -47 18 -102 40 -122 48 -33 13 -38 13 -38 0z"/> <path d="M2105 1310 c-22 -11 -75 -32 -117 -47 -72 -25 -78 -30 -78 -55 0 -16 2 -28 4 -28 2 0 46 16 97 35 88 32 149 75 149 105 0 13 -8 12 -55 -10z"/> <path d="M2020 1169 c-8 -5 -36 -18 -62 -29 -40 -16 -48 -24 -48 -45 0 -14 2 -25 4 -25 22 0 98 44 111 64 20 30 17 48 -5 35z"/> <path d="M945 1139 c11 -19 32 -37 61 -50 58 -24 60 -24 59 9 0 24 -7 30 -59 50 -75 29 -80 28 -61 -9z"/> <path d="M796 814 c-29 -28 -20 -61 24 -90 40 -26 53 -54 26 -54 -7 0 -19 7 -26 15 -18 21 -40 19 -40 -5 0 -36 67 -53 103 -26 30 23 18 67 -25 95 -38 24 -50 51 -24 51 7 0 19 -7 26 -15 18 -21 40 -19 40 5 0 37 -74 55 -104 24z"/> <path d="M972 814 c-19 -13 -22 -24 -22 -78 0 -48 4 -67 18 -79 26 -24 65 -21 90 6 28 30 28 37 -3 37 -16 0 -25 -6 -25 -16 0 -9 -7 -14 -17 -12 -15 3 -18 14 -18 63 0 49 3 60 18 63 10 2 17 -3 17 -12 0 -10 9 -16 25 -16 30 0 32 13 5 40 -24 24 -57 26 -88 4z"/> <path d="M1120 735 l0 -95 26 0 c25 0 26 2 20 36 -7 34 -6 35 21 32 25 -3 28 -7 25 -35 -2 -29 1 -33 23 -33 25 0 25 0 25 95 0 94 0 95 -25 95 -22 0 -24 -4 -22 -37 2 -34 0 -38 -23 -38 -23 0 -25 3 -22 38 3 34 1 37 -22 37 l-26 0 0 -95z"/> <path d="M1331 813 c-38 -31 -40 -122 -5 -157 21 -22 77 -20 98 3 33 36 33 122 0 155 -21 21 -67 20 -93 -1z m67 -76 c2 -46 0 -59 -14 -64 -22 -8 -34 14 -34 68 0 50 6 61 30 57 11 -2 16 -18 18 -61z"/> <path d="M1490 735 l0 -95 50 0 c46 0 50 2 50 24 0 21 -5 24 -27 23 l-28 -2 0 73 c0 68 -1 72 -22 72 -22 0 -23 -3 -23 -95z"/> <path d="M1628 735 l3 -95 50 0 c42 0 49 3 49 19 0 14 -8 21 -27 23 -37 4 -45 38 -10 38 16 0 26 7 30 20 4 17 0 20 -24 20 -19 0 -29 5 -29 15 0 10 10 15 30 15 23 0 30 4 30 20 0 17 -7 20 -52 20 l-53 0 3 -95z"/> <path d="M1770 735 c0 -95 0 -95 25 -95 24 0 25 2 18 43 -6 38 -5 41 10 29 9 -7 19 -27 22 -43 5 -22 12 -29 31 -29 28 0 28 -2 9 43 -13 31 -13 39 0 64 19 36 19 39 -5 63 -14 14 -33 20 -65 20 l-45 0 0 -95z m80 39 c0 -33 -33 -30 -38 4 -3 17 2 22 17 22 16 0 21 -6 21 -26z"/> <path d="M1940 735 l0 -95 53 0 c50 0 54 2 52 23 -2 18 -7 21 -29 19 l-26 -3 0 76 c0 73 -1 75 -25 75 -25 0 -25 0 -25 -95z"/> <path d="M2050 825 c0 -3 11 -28 25 -55 14 -28 25 -66 25 -90 0 -36 3 -40 24 -40 22 0 24 3 19 38 -4 29 1 51 21 90 31 62 31 62 6 62 -13 0 -24 -10 -30 -26 -12 -30 -34 -27 -38 4 -2 16 -10 22 -28 22 -13 0 -24 -2 -24 -5z"/> </g> 

     
      </svg>
        </p>
      <h3 className='flex  align-middle items-center gap-2'> 
        <svg height="6" width="60" xmlns="http://www.w3.org/2000/svg">
  <line x1="0" y1="10" x2="250" y2="10"
   style={{ stroke: "black", strokeWidth: 12 }}
   
   />
 
</svg>Live Zoom
.</h3>
<span>      Laoreet amet arcu quisque aliquam feugiat sit. Mauris quis vestibulum viverra nullam lobortis et eget</span>


<div className='font-bold my-2'>  
  <Rate  defaultValue={5} /> <br />
  Trusted by 10k+ students</div>

      <hr />
      <div className="space-y-1 pt-2">
        <p className="flex items-center gap-2 text-gray-800">
          <PhoneOutlined /> +123 456 7890
        </p>
        <p className="flex items-center gap-2 text-gray-800">
          <MailOutlined /> contact@scholerly.com
        </p>
      </div>
    </div>
  </Card>
</div>

      </div>
   </Container>

{/* Background Section with Scroll Reveal Effect */}
<div data-aos="fade-up" data-aos-duration="2000"
 className="relative h-[70vh] w-full">
        {/* Background Image */}
        <Image
          src={heroImage}
          alt="Hero Background"
          layout="fill"
          objectFit="cover"
          objectPosition="center"
          priority
        />

       <div className="absolute bottom-10 left-1/2 transform -translate-x-1/2 z-10 w-[90%] max-w-xl">
   <SearchBar></SearchBar>
  </div>


      </div>
    </div>
  )
}

export default HeroHome                                                                                                   //global css syle custom @keyframes fadeOut-animation {
  