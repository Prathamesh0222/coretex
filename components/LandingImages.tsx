import Image from "next/image";

export const LandingImages = () => {
  return (
    <div className="relative">
      <div className="absolute inset-x-0 bottom-0 h-40 md:h-100 w-full mask-t-from-10% bg-background z-50 " />
      <div className="relative min-h-72 sm:min-h-80 md:min-h-100 lg:min-h-140 pt-20 perspective-distant translate-x-10 md:translate-x-25 -translate-y-30">
        <div className="perspective-[4000px] -translate-y-10">
          <Image
            alt="Coretex Dashboard Preview"
            src="/sample_coretex3.png"
            height={1080}
            width={1920}
            className="rounded-lg border mask-r-from-50% mask-b-from-50% shadow-2xl"
            priority
            style={{
              transform: "rotateY(20deg) rotateX(40deg) rotateZ(-20deg)",
            }}
          />
        </div>
        <div className="perspective-[4000px] md:-translate-y-10 absolute inset-0">
          <Image
            alt="Coretex Dashboard Preview"
            src="/sample_coretex2.png"
            height={1080}
            width={1920}
            className="rounded-lg mask-r-from-70% mask-b-from-70% shadow-2xl"
            priority
            style={{
              transform: "rotateY(20deg) rotateX(40deg) rotateZ(-20deg)",
            }}
          />
        </div>
      </div>
    </div>
  );
};
