import Image from "next/image";
import Link from "next/link";

export interface LogoProps {
    containerClassName?: string;
    className?: string;
    href?: string;
    width?: number;
    height?: number;
}

export function Logo({ containerClassName, className, href = "/", width = 154, height = 43 }: LogoProps) {
    return (
        <Link href={href} className={containerClassName}>
            <Image src="/images/logo.png" alt="Probound" width={width} height={height} className={className} />
        </Link>
    );
}
