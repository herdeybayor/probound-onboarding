import { cn } from "@/lib/utils";
import React from "react";

export function Button({ children, className, ...props }: React.ButtonHTMLAttributes<HTMLButtonElement>) {
    return (
        <button className={cn("rounded-full bg-primary text-white font-semibold px-4 py-2 hover:bg-primary/90 cursor-pointer", className)} {...props}>
            {children}
        </button>
    );
}
