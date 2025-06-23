"use client";

import Link from "next/link";

import { AuthCarousel } from "@/components/auth/carousel";
import { Logo } from "@/components/logo";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Icons } from "@/lib/icons";
import { useCallback, useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

const formSchema = z
    .object({
        name: z.string().min(1, { message: "Name is required" }),
        email: z.string().email({ message: "Please enter a valid email address" }).min(1, { message: "Email is required" }),
        password: z.string().min(8, { message: "Password must be at least 8 characters" }),
        confirmPassword: z.string().min(1, { message: "Please confirm your password" }),
    })
    .refine((data) => data.password === data.confirmPassword, {
        message: "Passwords don't match",
        path: ["confirmPassword"],
    });

export default function SignUp() {
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);

    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            name: "",
            email: "",
            password: "",
            confirmPassword: "",
        },
    });

    const handleShowPassword = useCallback(() => {
        setShowPassword(!showPassword);
    }, [showPassword]);

    const handleShowConfirmPassword = useCallback(() => {
        setShowConfirmPassword(!showConfirmPassword);
    }, [showConfirmPassword]);

    const onSubmit = useCallback((data: z.infer<typeof formSchema>) => {
        console.log(data);
    }, []);

    return (
        <div className="flex flex-col items-center justify-center h-screen px-6">
            <div className="flex items-center justify-between w-full">
                <div className="flex-1 flex justify-center lg:justify-end lg:pr-[170px]">
                    <div className="flex items-center flex-col max-w-[380px] w-full">
                        <Logo />

                        <div className="flex flex-col gap-2 mt-8 text-center">
                            <h2 className="text-3xl font-bold text-typography">Create Account</h2>
                            <p className="text-[#636370]">Please enter your details to get started.</p>
                        </div>

                        <form className="flex flex-col w-full mt-8" onSubmit={form.handleSubmit(onSubmit)}>
                            <div className="flex flex-col gap-1.5">
                                <Label htmlFor="name">Full Name</Label>
                                <Input id="name" type="text" placeholder="Full Name" {...form.register("name")} />
                                {form.formState.errors.name && <p className="text-red-500 text-sm mt-1">{form.formState.errors.name.message}</p>}
                            </div>

                            <div className="flex flex-col gap-1.5 mt-5">
                                <Label htmlFor="email">Email Address</Label>
                                <Input id="email" type="email" placeholder="Email Address" {...form.register("email")} />
                                {form.formState.errors.email && <p className="text-red-500 text-sm mt-1">{form.formState.errors.email.message}</p>}
                            </div>

                            <div className="flex flex-col gap-1.5 mt-5">
                                <Label htmlFor="password">Password</Label>
                                <div className="relative">
                                    <Input id="password" type={showPassword ? "text" : "password"} placeholder="••••••••" className="w-full" {...form.register("password")} />
                                    <button type="button" onClick={handleShowPassword} className="absolute right-3 top-1/2 -translate-y-1/2">
                                        {showPassword ? <Icons.eye className="text-[#5B5C6E]" size={20} /> : <Icons.eyeOff className="text-[#5B5C6E]" size={20} />}
                                    </button>
                                </div>
                                {form.formState.errors.password && <p className="text-red-500 text-sm mt-1">{form.formState.errors.password.message}</p>}
                            </div>

                            <div className="flex flex-col gap-1.5 mt-5">
                                <Label htmlFor="confirmPassword">Confirm Password</Label>
                                <div className="relative">
                                    <Input id="confirmPassword" type={showConfirmPassword ? "text" : "password"} placeholder="••••••••" className="w-full" {...form.register("confirmPassword")} />
                                    <button type="button" onClick={handleShowConfirmPassword} className="absolute right-3 top-1/2 -translate-y-1/2">
                                        {showConfirmPassword ? <Icons.eye className="text-[#5B5C6E]" size={20} /> : <Icons.eyeOff className="text-[#5B5C6E]" size={20} />}
                                    </button>
                                </div>
                                {form.formState.errors.confirmPassword && <p className="text-red-500 text-sm mt-1">{form.formState.errors.confirmPassword.message}</p>}
                            </div>

                            <Button type="submit" className="mt-6">
                                Sign Up
                            </Button>

                            <div className="mt-10 text-center">
                                <p className="text-[#636370]">
                                    Already have an account?{" "}
                                    <Link href="/" className="text-primary font-semibold hover:underline">
                                        Sign in
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
