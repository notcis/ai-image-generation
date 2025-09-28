import HeroImageSlider from "@/components/display/hero-image-slider";
import GenerateImageInput from "@/components/forms/generate-image-input";

export default function Home() {
  return (
    <div className="flex items-center justify-center m-5">
      <div className="grid max-w-4xl">
        <div className="my-10">
          <h1 className="text-7xl lg:text-9xl font-bold mb-2">
            <span className=" text-8xl bg-gradient-to-r from-green-500 via-blue-500 to-purple-500 text-transparent bg-clip-text animate-pulse">
              AI
            </span>
            <br />
            Image Generator
          </h1>
          <p className="text-lg text-muted-foreground mt-2 ">
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Amet quia
            laborum fuga porro fugiat dignissimos quos, aut iure nobis error,
            iste, temporibus doloribus nihil repudiandae. Ab voluptates
            recusandae ratione nihil!
          </p>
        </div>
        <GenerateImageInput />

        <div className="relative">
          <HeroImageSlider />
        </div>
      </div>
    </div>
  );
}
