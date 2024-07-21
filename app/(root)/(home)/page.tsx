"use client";

import Autoplay from "embla-carousel-autoplay";

import MeetingTypeList from "@/components/MeetingTypeList";

import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { bannerImages } from "@/constants";
import { cn } from "@/lib/utils";
import { useRef } from "react";

const Home = () => {
  const plugin = useRef(Autoplay({ delay: 2000, stopOnInteraction: true }));

  const now = new Date();

  const time = now.toLocaleTimeString("en-US", {
    hour: "2-digit",
    minute: "2-digit",
  });
  const date = new Intl.DateTimeFormat("en-US", { dateStyle: "full" }).format(
    now
  );

  return (
    <section className="flex size-full flex-col gap-5 text-white">
      <Carousel
        opts={{
          align: "start",
          loop: true,
        }}
        plugins={[plugin.current]}
      >
        <CarouselContent>
          {bannerImages.map((image, index) => {
            return (
              <CarouselItem key={index}>
                <div
                  className={cn(
                    "h-[303px] w-full rounded-[20px] bg-hero-1 bg-cover",
                    image
                  )}
                >
                  <div className="flex h-full flex-col justify-between max-md:px-5 max-md:py-8 lg:p-11">
                    <h2 className="glassmorphism max-w-[273px] rounded py-2 text-center text-base font-normal">
                      Upcoming Meeting at: 12:30 PM
                    </h2>
                    <div className="flex flex-col gap-2">
                      <h1 className="text-4xl font-extrabold lg:text-7xl">
                        {time}
                      </h1>
                      <p className="text-lg font-medium text-sky-1 lg:text-2xl">
                        {date}
                      </p>
                    </div>
                  </div>
                </div>
              </CarouselItem>
            );
          })}
        </CarouselContent>
      </Carousel>

      <MeetingTypeList />
    </section>
  );
};

export default Home;
