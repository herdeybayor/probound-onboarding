"use client";

import Link from "next/link";

import { AuthCarousel } from "@/components/auth/carousel";
import { Logo } from "@/components/logo";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Icons } from "@/lib/icons";
import { useState } from "react";

export default function SignIn() {
    const [showPassword, setShowPassword] = useState(false);

    const handleShowPassword = () => {
        setShowPassword(!showPassword);
    };

    return (
        <div className="flex flex-col items-center justify-center h-screen px-6">
            <div className="flex items-center justify-between w-full">
                <div className="flex-1 flex justify-center lg:justify-end lg:pr-[170px]">
                    <div className="flex items-center flex-col max-w-[380px] w-full">
                        <Logo />

                        <div className="flex flex-col gap-2 mt-8 text-center">
                            <h2 className="text-3xl font-bold text-typography">Welcome Back</h2>
                            <p className="text-[#636370]">Welcome Back! Please enter your details.</p>
                        </div>

                        <form className="flex flex-col w-full mt-8">
                            <div className="flex flex-col gap-1.5">
                                <Label htmlFor="email">Email Address</Label>
                                <Input id="email" type="email" placeholder="Email Address" />
                            </div>

                            <div className="flex flex-col gap-1.5 mt-5">
                                <Label htmlFor="password">Password</Label>
                                <div className="relative">
                                    <Input id="password" type={showPassword ? "text" : "password"} placeholder="••••••••" className="w-full" />
                                    <button type="button" onClick={handleShowPassword} className="absolute right-3 top-1/2 -translate-y-1/2">
                                        {showPassword ? <Icons.eye className="text-[#5B5C6E]" size={20} /> : <Icons.eyeOff className="text-[#5B5C6E]" size={20} />}
                                    </button>
                                </div>
                                <Link href="/forgot-password" className="text-primary font-semibold hover:underline text-right self-end text-sm mt-1">
                                    Forgot Password?
                                </Link>
                            </div>

                            <Button type="submit" className="mt-6">
                                Sign In
                            </Button>

                            <div className="mt-10 text-center">
                                <p className="text-[#636370]">
                                    Don&apos;t have an account?{" "}
                                    <Link href="/signup" className="text-primary font-semibold hover:underline">
                                        Sign up
                                    </Link>
                                </p>
                            </div>
                        </form>
                    </div>
                </div>

                <AuthCarousel />
            </div>
        </div>
    );
}
