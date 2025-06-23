import { cn } from "@/lib/utils";
import React from "react";

export function Label({ children, className, ...props }: React.LabelHTMLAttributes<HTMLLabelElement>) {
    return (
        <label className={cn("text-sm font-medium text-typography", className)} {...props}>
            {children}
        </label>
    );
}
