import Link from "next/link";

export default function HowTo() {
  return (
    <div className=" w-screen text-white">
      <div className="flex justify justify-center flex-col">
        <p
          className="text-center text-[1.4rem] py-[1rem] px-[22rem] 
          max-xl:px-[17rem] 
          max-lg:px-[7rem] max-lg:py-[2rem]
          max-sm:px-[3rem] max-sm:text-[1.3rem]"
        >
          Please upload a photo of your receipt and click{" "}  
          <Link href="../split-page" passHref> 
          <span className="text-orange">next</span>
          </Link>
          .
        </p>
      </div>
    </div>
  );
}
