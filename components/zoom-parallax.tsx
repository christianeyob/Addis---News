"use client"
import { FC, useRef } from "react";
import Image from "next/image";

import { useScroll, useTransform, motion } from "framer-motion";
import { cn } from "@/lib/utils";

interface Props {
  classes?: string;
}

const ZoomParallax: FC<Props> = ({ classes }) => {
  const container = useRef(null);
  const { scrollYProgress } = useScroll({
    target: container,
    offset: ["start start", "end end"],
  });

  const scale1 = useTransform(scrollYProgress, [0, 1], [1, 4]);
  const scale2 = useTransform(scrollYProgress, [0, 1], [1, 5]);
  const scale3 = useTransform(scrollYProgress, [0, 1], [1, 6]);
  const scale4 = useTransform(scrollYProgress, [0, 1], [1, 8]);
  const scale5 = useTransform(scrollYProgress, [0, 1], [1, 9]);

  const pictures = [
    {
        src: "https://images.unsplash.com/photo-1614981816670-3e65f4cfdb28?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NHx8YWRkaXMlMjBhYmViYXxlbnwwfHwwfHx8MA%3D%3D",

      scale: scale1,
      classes: "relative w-[25%] h-[25%]",
    },
    {
        src: "https://images.unsplash.com/photo-1686143293144-f799b66836b1?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NDR8fGV0aGlvcGlhJTIwY2l0eXxlbnwwfHwwfHx8MA%3D%3D",

      scale: scale2,
      classes: "relative top-[-30%] left-[5%] w-[35%] h-[30%]",
    },
    {
        src: "https://images.unsplash.com/photo-1686143293611-85158a1a9370?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MzZ8fGV0aGlvcGlhJTIwY2l0eXxlbnwwfHwwfHx8MA%3D%3D",
      scale: scale3,
      classes: "relative top-[-29%] left-[-25%] w-[20%] h-[28%]",
    },
    {
        src: "https://images.unsplash.com/photo-1710704323971-f69350116082?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mjh8fGV0aGlvcGlhJTIwY2l0eXxlbnwwfHwwfHx8MA%3D%3D",

      scale: scale2,
      classes: "relative left-[27.5%] w-[25%] h-[25%]",
    },
    {
        src: "https://images.unsplash.com/photo-1734865934450-719ef6f59a37?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NDN8fGV0aGlvcGlhJTIwY2l0eXxlbnwwfHwwfHx8MA%3D%3D",

      scale: scale3,
      classes: "relative left-[-27.5%] w-[25%] h-[25%]",
    },
    {
        src: "https://images.unsplash.com/photo-1553687334-0161f3d4aca9?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTB8fGFkZGlzJTIwYWJhYmF8ZW58MHx8MHx8fDA%3D",

      scale: scale4,
      classes: "relative top-[27.5%] left-[5%] w-[20%] h-[25%]",
    },
    {
        src: "https://images.unsplash.com/photo-1571946080923-a81668948f52?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MzR8fGV0aGlvcGlhJTIwY2l0eXxlbnwwfHwwfHx8MA%3D%3D",
        scale: scale5,
       classes: "relative top-[22.5%] left-[25%] w-[15%] h-[15%]",
    },
  ];

  return (
    <section
      ref={container}
      className={cn("relative h-[200vh] w-full", classes)}
    >
      <div className="sticky top-0 h-screen overflow-hidden">
        {pictures.map(({ src, scale, classes }, index) => {
          return (
            <motion.div
              key={index}
              style={{ scale }}
              className="absolute top-0 flex h-full w-full items-center justify-center"
            >
              <div className={` bg-zinc-200 dark:bg-zinc-800 ${classes}`}>
                <Image
                  src={src}
                  fill
                  objectFit="cover"
                  alt="image of beautiful person"
                />
              </div>
            </motion.div>
          );
        })}
      </div>
      <div className="h-[100vh] leading-[0]"></div>
     
    </section>
  );
};

export default ZoomParallax;
