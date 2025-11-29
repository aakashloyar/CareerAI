import { Loader2 } from "lucide-react";
import Image from "next/image";

export default function Spinner({ size = "md" }: { size?: "sm" | "md" | "lg"|"xl"|"xxl" }) {
  const sizes = {
    sm: "w-4 h-4",
    md: "w-10 h-10",
    lg: "w-12 h-12",
    xl: "w-16 h-16",
    xxl: "w-20 h-20"
  };

  return (
    <div className="flex items-center justify-center ">
      <Image
        src="/spinner.gif"
        alt="Loading..."
        className={sizes[size]} // apply Tailwind size
        width={40} // required but will be overridden by className
        height={40}
      />
    </div>

  );
}
