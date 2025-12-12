"use client";
import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import Image from "next/image";

let interval: NodeJS.Timeout;

type Card = {
  id: number;
  name: string;
  title: string;
  category: string;
  imageUrl: string | null | undefined
  content: React.ReactNode;
};

export const CardStack = ({
  items,
  offset,
  scaleFactor,
}: {
  items: Card[];
  offset?: number;
  scaleFactor?: number;
}) => {
  const CARD_OFFSET = offset || 10;
  const SCALE_FACTOR = scaleFactor || 0.6;
  const [cards, setCards] = useState<Card[]>(items);

  useEffect(() => {
    startFlipping();

    return () => clearInterval(interval);
  }, []);
  const startFlipping = () => {
    interval = setInterval(() => {
      setCards((prevCards: Card[]) => {
        const newArray = [...prevCards]; // create a copy of the array
        newArray.unshift(newArray.pop()!); // move the last element to the front
        return newArray;
      });
    }, 5000);
  };

  return (
    <div className="relative  h-60 w-60 md:h-48 lg:h-64 xl:h-72 md:w-full   ">
      {cards.map((card, index) => {
        return (
          <motion.div
            key={card.id}
            className="absolute   bg-black/10 dark:bg-white/10 p-4    backdrop-blur-lg   h-60 w-60 md:h-48 lg:h-64 xl:h-72  md:w-full rounded-3xl    flex flex-col gap-2 "
            style={{
              transformOrigin: "top center",
            }}
            animate={{
              top: index * -CARD_OFFSET,
              scale: 1 - index * SCALE_FACTOR, // decrease scale for cards that are behind
              zIndex: cards.length - index, //  decrease z-index for the cards that are behind
            }}
          >
            <Image
              src={card.imageUrl ?? ""}
              alt={card.name}
              width={400}
              height={200}
              className="w-full  h-40 md:h-32 lg:h-40 xl:h-48 rounded-2xl"
              />
              <div className="flex flex-col  px-4">

             <p className=" text-red-600 font-bold text-xl ">
                {card.category}
              </p>
            <Link href={`/Detaile/${card.id}/`}>
            <div className="line-clamp-2 text-black dark:text-white  text-lghover:underline font-medium">
              {card.title}
            </div>
            </Link>
              </div>
            {/*<div>
               <p className="opacity-70 font-normal line-clamp-4  ">
                {card.content}
              </p>
              
            </div>*/}
          </motion.div>
        );
      })}
    </div>
  );
};
