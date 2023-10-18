import Image from "next/image";
import { AiOutlineMail, AiOutlinePhone } from "react-icons/ai";
import logo from "@/public/images/logodmsans.png";

export default function Footer() {
  return (
    <div className="text-gray-200 max-sm:max-h-[450px] sm:px-[4.75rem] sm:py-[3.25rem] max-md:text-sm  md:max-h-[372px] md:px-[8.75rem] md:py-[6.25rem] w-screen">
      <hr className="pb-[5%] " />
      <div className="flex lg:flex-row max-sm:flex-col max-sm:pl-[30%] max-sm:pb-[10%]">
        {/* Left Side Col */}
        <div className="md:pl-[0rem] flex-col">
          <Image className="pb-8 w-[10rem]" src={logo} alt="logo" />
          <div className="leading-8">
            <p>Copyright @2023 CheckMate$ </p>
            <p>All rights reserved</p>
          </div>
        </div>

        {/* Right Side Col */}
        <div className="max-sm:pt-10 max-sm:pl-0 max-md:pl-20 md:absolute md:right-[9rem] flex-col">
          <h1 className="pb-5 text-2xl font-semibold ">Contact Us</h1>
          <a className="hover:text-white text-md" href="">
            <p className="">
              {" "}
              <AiOutlineMail
                className="pr-2 inline-flex max-w-[2rem]"
                size={40}
              />{" "}
              contact@checkmates.com
            </p>
          </a>
        </div>
      </div>
    </div>
  );
}
