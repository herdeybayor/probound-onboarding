"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import Link from "next/link";
import { useCallback } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";

import { AuthCarousel } from "@/components/auth/carousel";
import { Logo } from "@/components/logo";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

const formSchema = z.object({
    email: z.string().email({ message: "Please enter a valid email address" }).min(1, { message: "Email is required" }),
});

export default function ForgotPassword() {
    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            email: "",
        },
    });

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
                            <h2 className="text-3xl font-bold text-typography">Forgot Password</h2>
                            <p className="text-[#636370]">Enter the email address you used when you joined and we’ll send you verification to reset your password.</p>
                        </div>

                        <form className="flex flex-col w-full mt-8" onSubmit={form.handleSubmit(onSubmit)}>
                            <div className="flex flex-col gap-1.5">
                                <Label htmlFor="email">Email Address</Label>
                                <Input id="email" type="email" placeholder="Email Address" {...form.register("email")} />
                                {form.formState.errors.email && <p className="text-red-500 text-sm mt-1">{form.formState.errors.email.message}</p>}
                            </div>

                            <Button type="submit" className="mt-6">
                                Confirm
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
