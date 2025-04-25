import { Button } from "antd";
import Link from "next/link";
import image from "../../public/27898543.jpg";
import Image from "next/image";

export default function NotFoundPage() {
  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="text-center space-y-4 text-black">
        {/* Image at the top */}
        <Image src={image} alt="404 image" height={300} width={300} className="mx-auto" />

   
        <p className="text-sm text-black">
          Sorry, your requested page does not exist. It might have been removed or is temporarily unavailable.
        </p>

        {/* Go Back Home Button */}
        <Link href="/" className="block">
          <Button className="mt-4 bg-[#F59E0B] text-black hover:bg-[#D97706] cursor-pointer">
            Go Back Home
          </Button>
        </Link>
      </div>
    </div>
  );
}
