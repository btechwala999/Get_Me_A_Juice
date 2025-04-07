"use client";
import React, { useState, useEffect } from "react";
import Link from "next/link";
import { useSession } from "next-auth/react";
import { usePathname } from "next/navigation"; // To get the current route

const Navbar = () => {
    const { data: session } = useSession();
    const [showdropdown, setShowdropdown] = useState(false);
    const [isScrolled, setIsScrolled] = useState(false); // Track scroll state
    const pathname = usePathname(); // Get the current route

    // Check if the current route is the landing page, login page, or signup page
    const isLandingPage = pathname === "/";
    const isLoginPage = pathname === "/login";
    const isSignupPage = pathname === "/signup";

    // Handle scroll event
    useEffect(() => {
        const handleScroll = () => {
            if (window.scrollY > 50) {
                setIsScrolled(true); // Navbar is scrolled
            } else {
                setIsScrolled(false); // Navbar is at the top
            }
        };

        window.addEventListener("scroll", handleScroll);
        return () => {
            window.removeEventListener("scroll", handleScroll);
        };
    }, []);

    return (
        <nav
            className={` top-0 left-0 w-full z-20 ${isLoginPage || isSignupPage
                    ? "bg-white text-black py-4"
                    : isLandingPage
                        ? isScrolled
                            ? "backdrop-brightness-105 transition-all duration-500 ease-in-out fixed backdrop-saturate-150 backdrop-blur-2xl bg-purple-600 bg-opacity-25 shadow-2xl shadow-black scale-90 rounded-2xl p-4 mt-4 text-white"
                            : "bg-transparent transition-all duration-500 ease-in-out fixed py-4 border-none text-white"
                        : "bg-transparent fixed transition-all duration-500 ease-in-out backdrop-brightness-105 backdrop-saturate-150 backdrop-blur-2xl py-2 text-white"
                } flex justify-between items-center px-10`}
        >
            <Link href={"/"} className="logo font-bold text-2xl">
                <span className={`${isLoginPage || isSignupPage ? "text-black" : "text-white"}`}>
                    Get Me A Juice
                </span>
            </Link>

            <div className="flex gap-0 relative">
                <div className="relative border-0">
                    {session && (
                        <>
                            <button
                                onClick={() => {
                                    setShowdropdown(!showdropdown);
                                }}
                                onBlur={() => {
                                    setTimeout(() => {
                                        setShowdropdown(false);
                                    }, 100);
                                }}
                                id="dropdownDefaultButton"
                                className={`${isLoginPage || isSignupPage ? "text-black" : "text-white"
                                    } left-5 relative bg-transparent hover:bg-transparent focus:outline-none font-medium rounded-lg transition-all ease-in-out text-lg py-2.5 text-center border-0 outline-0 focus:outline-0 inline-flex items-center`}
                                type="button"
                            >
                                {session.user.name}{" "}
                                <svg
                                    className="w-2.5 h-2.5 ms-3"
                                    aria-hidden="true"
                                    xmlns="http://www.w3.org/2000/svg"
                                    fill="none"
                                    viewBox="0 0 10 6"
                                >
                                    <path
                                        stroke="currentcolor"
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth="2"
                                        d="m1 1 4 4 4-4"
                                    />
                                </svg>
                            </button>
                            <div
                                id="dropdown"
                                className={`z-20 bg-white text-black divide-y divide-gray-100 absolute -left-8 top-[48px] rounded-xl shadow-2xl shadow-black w-44 focus:transition-all focus:ease-in-out transition-all duration-200 ease-linear ${showdropdown
                                        ? "opacity-100 -translate-y-0"
                                        : "opacity-0 -translate-y-5 pointer-events-none"
                                    }`}
                            >
                                <ul
                                    className="py-2 text-sm font-bold text-black"
                                    aria-labelledby="dropdownDefaultButton"
                                >
                                    <li>
                                        <Link
                                            href="/dashboard"
                                            className="block px-4 py-2 mx-2 hover:transition-all hover:ease-in-out hover:bg-black hover:text-white hover:rounded-full hover:mx-2"
                                        >
                                            Dashboard
                                        </Link>
                                    </li>
                                    <li>
                                        <Link
                                            href="#"
                                            className="block px-4 py-2 mx-2 hover:transition-all hover:ease-in-out hover:bg-black hover:text-white hover:rounded-full hover:mx-2"
                                        >
                                            Settings
                                        </Link>
                                    </li>
                                    <li>
                                        <Link
                                            href={`/${session.user.name}`}
                                            className="block px-4 py-2 mx-2 hover:transition-all hover:ease-in-out hover:bg-black hover:text-white hover:rounded-full hover:mx-2"
                                        >
                                            Your Page
                                        </Link>
                                    </li>
                                </ul>
                            </div>
                        </>
                    )}
                </div>
                <div className="flex gap-3 transition-all border-0 ease-in-out">
                    {!session && (
                        <Link href={"/login"}>
                            <button
                                className={`w-[80px] h-[35px] transition-all ease-in-out login top-3 font-extrabold ${isLoginPage ? "hidden" : isSignupPage ? "text-black" : "text-white"
                                    }`}
                            >
                                Log in
                            </button>
                        </Link>
                    )}
                    {!session && (
                        <Link href={"/signup"}>
                            <button
                                className={`w-[80px] h-[35px] transition-all ease-in-out signup top-3 font-extrabold ${isSignupPage ? "hidden" : isLoginPage ? "text-black" : "text-white"
                                    }`}
                            >
                                Sign up
                            </button>
                        </Link>
                    )}
                </div>
            </div>
        </nav>
    );
};

export default Navbar;
