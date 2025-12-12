

import { Button } from "@/components/ui/button";
import ZoomParallax from "@/components/zoom-parallax";
import Link from "next/link";

export default function About() {
    return (
        
            <div className="flex flex-col w-full p-6 mt-16  max-w-7xl  mx-auto ">
               
                    <div className="flex flex-col    gap-2">
                        <h1 className="text-5xl text-center font-extrabold m-4 mb-0">Addis News</h1>
                        {/* <Image
                            src="https://media.istockphoto.com/id/1482209083/photo/aerial-overview-of-addis-abeba-city-the-capital-of-ethiopia-showing-brand-new-buildings-and.webp?a=1&b=1&s=612x612&w=0&k=20&c=S_Ih3ysB8JSKKi4YHv2UVPjNAMTSwI4q8Pb2Gf_wyhs="
                            className=" rounded-md h-96   w-96 "
                            alt="Politic"
                            width={400}
                            height={200}
                        /> */}
                        <ZoomParallax />
                    </div>

                    <div className="flex flex-col gap-6 mt-6 justify-center  items-centerp-6">
                        {/* <h1 className="text-xl font-bold self-start">
                            We bring you curated selection of stories we strongly love.
                        </h1>
                        <p className="text-md">
                            Vestibulum ante ipsum primis in faucibus orci luctus et ultrices
                            posuere cubilia Curae; Fusce id purus. Cras sagittis. Fusce ac
                            felis sit amet ligula pharetra condimentum. Quisque ut nisi. In
                            turpis.Fusce neque.
                        </p>
                        <p className="text-md">
                            Nullam sagittis. Vestibulum rutrum, mi nec elementum vehicula,
                            eros quam gravida nisl, id fringilla neque ante vel mi.
                            Pellentesque libero tortor, tincidunt et, tincidunt eget, semper
                            nec, quam. Nullam nulla eros, ultricies sit amet, nonummy id,
                            imperdiet feugiat, pede.Fusce neque. Donec pede justo, fringilla
                            vel, aliquet nec, vulputate eget, arcu. Proin faucibus arcu quis
                            ante. Ut varius tincidunt libero. Nulla neque dolor, sagittis
                            eget, iaculis quis, molestie non, velit.
                        </p> */}
                        <p>Welcome to Addis News, your premier online news source dedicated to providing comprehensive coverage of events and developments in Addis Ababa, Ethiopia, and beyond. We are committed to delivering accurate, unbiased, and timely news to our readers, empowering them to stay informed and engaged with their community and the world.</p>

                        <h2 className="text-2xl font-bold">Our Mission</h2>

                        <p>Our mission is to be the leading provider of news and information in Addis Ababa, fostering a well-informed and engaged citizenry.  We aim to:</p>
                        <ul className="list-disc list-inside">
                            <li>Deliver accurate and reliable news reporting.</li>
                            <li>Provide diverse perspectives on important issues.</li>
                            <li>Promote civic engagement and dialogue.</li>
                            <li>Support the growth and development of our community.</li>
                        </ul>

                        <h2 className="text-2xl font-bold">What We Cover</h2>

                        <p>Addis News covers a wide range of topics, including:</p>
                        <ul className="list-disc list-inside">
                            <li>Politics and Government</li>
                            <li>Business and Economy</li>
                            <li>Culture and Arts</li>
                            <li>Technology and Innovation</li>
                            <li>Social Issues</li>
                            <li>Local Events</li>
                        </ul>
                            <Link href="/Contact">
                            
                        <Button className="w-fit">Contact Us</Button>
                            </Link>

                        <p className="text-sm text-muted-foreground">Have questions or feedback?  We had love to hear from you!  Contact us at christianeyob92@gmail.com.</p>
                        {/* <Button className="w-20 self-start">join</Button> */}
                    </div>
                
            </div>
      
    );
}