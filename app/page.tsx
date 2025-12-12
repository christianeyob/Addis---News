import React from 'react';
import Headers from "../components/Header"
import Latest from "@/components/Latest";
import Indepth from "@/components/Indepth";
import Explore from "@/components/Explore";
import News from "@/components/News";
import Subscribe from "@/components/Subscribe";

export default function Home() {
    // Create a mapping of categories to their respective articles
    return (
        <div className="mt-20">
            <Headers />
            <Latest />
            <News />
            <Subscribe />
            <Explore />
            <Indepth />
        </div>
    );

}