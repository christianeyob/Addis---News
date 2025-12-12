"use client";

import { Button } from "@/components/ui/button";
import {
    NavigationMenu,
    NavigationMenuContent,
    NavigationMenuItem,
    NavigationMenuLink,
    NavigationMenuList,
    NavigationMenuTrigger,
} from "@/components/ui/navigation-menu";
import { Menu, MoveRight, X } from "lucide-react";
import { useEffect, useState } from "react";
import Link from "next/link";
import { ModeToggle } from "./toggle";
import { SubscribeDialog } from "./subscribeDialog";

export default function Nav() {
    const navigationItems = [
        {
            title: "Home",
            href: "/",
            description: "",
        },
        {
            title: "About",
            href: "/About",
            description: "",
        },
        {
            title: "Categories",
            description: "Explore our diverse range of news categories and discover the stories that matter most to you.",
            items: [
                {
                    title: "News",
                    href: "/category/News",
                },
                {
                    title: "Bussines",
                    href: "/category/Business",
                },
                {
                    title: "Politics",
                    href: "/category/politics",
                },
                {
                    title: "Money Talks",
                    href: "/category/Money Talks",
                },
            ],
        },
        {
            title: "More",
            description: "Discover more about us and explore additional topics and resources beyond our main categories.",
            items: [
                {
                    title: "About",
                    href: "/About",
                },
                {
                    title: "Technology",
                    href: "/category/technology",
                },
                {
                    title: "Global Addis",
                    href: "/category/Global Addis",
                },
                {
                    title: "ዜና",
                    href: "/category/ዜና",
                },
                {
                    title: "ስፖርት",
                    href: "/category/ስፖርት",
                },
                {
                    title: "Society",
                    href: "/category/Society",
                },
                {
                    title: "ethiopian-music",
                    href: "/category/ethiopian-music",
                },
                {
                    title: "Sponsored Contents",
                    href: "/category/Sponsored Contents",
                },{
                    title: "Contact",
                    href: "/Contact",
                },
            ],
        },
    ];
    const [isOpen, setOpen] = useState(false);
    const [scrollShadow, setScrollShadow] = useState(false); // State to track scroll shadow

    useEffect(() => {
        const handleScroll = () => {
            if (window.scrollY > 20) { // Adjust the scroll threshold as needed
                setScrollShadow(true);
            } else {
                setScrollShadow(false);
            }
        };

        window.addEventListener('scroll', handleScroll);

        return () => {
            window.removeEventListener('scroll', handleScroll); // Clean up the event listener
        };
    }, []);


    return (
        <header className={`z-50 fixed w-full top-0 py-6 px-6 backdrop-blur-md bg-white/20 dark:bg-black/20 left-0  border-b border-neutral-700 border-opacity-20 ${scrollShadow ? 'shadow-md dark:shadow-md dark:shadow-neutral-700/40' : ''}`} data-scroll-spy="true">
            <div className=" flex max-w-screen-xl mx-auto w-full  gap-4 flex-row lg:grid lg:grid-cols-3 items-center ">
                <Link href={"/"} className="flex ">
                    <div className="bg-black dark:bg-white rounded-md justify-center items-center px-2">
                        <p className="text-white dark:text-black font-bold text-2xl">A</p>
                    </div>
                    <p className="font-bold text-xl ml-2">Addis</p>
                </Link>
                <div className="justify-start items-center gap-4 lg:flex hidden flex-row">
                    <NavigationMenu className="flex justify-start items-start">
                        <NavigationMenuList className="flex justify-start gap-4 flex-row">
                            {navigationItems.map((item) => (
                                <NavigationMenuItem key={item.title}>
                                    {item.href ? (
                                        <>
                                            <NavigationMenuLink className="font-medium text-md">
                                                    <Button variant="ghost" className="font-medium text-md">{item.title}</Button>
                                            </NavigationMenuLink>
                                        </>
                                    ) : (
                                        <>
                                            <NavigationMenuTrigger className="font-medium text-md bg-transparent">
                                                {item.title}
                                            </NavigationMenuTrigger>
                                            <NavigationMenuContent className="!w-[450px] p-4">
                                                <div className="flex flex-col lg:grid grid-cols-2 gap-4">
                                                    <div className="flex flex-col h-full justify-between">
                                                        <div className="flex flex-col">
                                                            <p className="text-md">{item.title}</p>
                                                            <p className="text-muted-foreground text-sm">
                                                                {item.description}
                                                            </p>
                                                        </div>
                                                       
                                                    </div>
                                                    <div className="flex flex-col text-sm h-full justify-end">
                                                        {item.items?.map((subItem) => (
                                                            <NavigationMenuLink
                                                                href={subItem.href}
                                                                key={subItem.title}
                                                                className="flex flex-row justify-between items-center hover:bg-muted py-2 px-4 rounded"
                                                            >
                                                                <span>{subItem.title}</span>
                                                                <MoveRight className="w-4 h-4 text-muted-foreground" />
                                                            </NavigationMenuLink>
                                                        ))}
                                                    </div>
                                                </div>
                                            </NavigationMenuContent>
                                        </>
                                    )}
                                </NavigationMenuItem>
                            ))}
                        </NavigationMenuList>
                    </NavigationMenu>
                </div>
                <div className="flex justify-end w-full gap-4">
                    <ModeToggle />
                    <div className="border-r hidden md:inline"></div>                
                       <div className="hidden lg:inline ">
                   < SubscribeDialog/>
                   </div>
                </div>
                <div className="flex w-12 shrink lg:hidden items-end justify-end">
                    <Button variant="ghost" onClick={() => setOpen(!isOpen)}>
                        {isOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
                    </Button>
                    {isOpen && (
                        <div className="absolute top-20 border-t flex flex-col w-full right-0 bg-background shadow-lg p-4 py-4 container gap-2">
                            {navigationItems.map((item) => (
                                <div key={item.title}>
                                    <div className="flex flex-col gap-2">
                                        {item.href ? (
                                            <Link
                                                href={item.href}
                                                className="flex justify-between items-center"
                                            >
                                                <span className="text-lg font-bold">{item.title}</span>
                                                <MoveRight className="w-4 h-4 stroke-1 text-muted-foreground -rotate-45" />
                                            </Link>
                                        ) : (
                                            <p className="text-lg font-bold">{item.title}</p>
                                        )}
                                        {item.items &&
                                            item.items.map((subItem) => (
                                                <Link
                                                    key={subItem.title}
                                                    href={subItem.href}
                                                    className="flex justify-between items-center"
                                                >
                                                    <span className="text-muted-foreground">
                                                        {subItem.title}
                                                    </span>
                                                    <MoveRight className="w-4 h-4 stroke-1  text-muted-foreground  -rotate-45 " />
                                                </Link>
                                            ))}
                                    </div>
                                </div>
                            ))}
                            <div className="lg:hidden inline-flex ">
                            <SubscribeDialog />
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </header>
    );
};