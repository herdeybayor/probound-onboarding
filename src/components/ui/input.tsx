import React from "react";
import { cn } from "@/lib/utils";

export function Input({ className, ...props }: React.InputHTMLAttributes<HTMLInputElement>) {
    return <input className={cn("rounded-lg px-4 py-2 border border-gray-300 focus:outline-none focus:border-primary", className)} {...props} />;
}
