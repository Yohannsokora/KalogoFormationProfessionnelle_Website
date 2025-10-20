import * as React from "react";
import { cn } from "./utils";

function Input({ className, type, ...props }: React.ComponentProps<"input">) {
  return (
    <input
      type={type}
      data-slot="input"
      className={cn(
        "flex h-9 w-full min-w-0 rounded-md border border-gray-300 bg-white px-3 py-1 text-base placeholder:text-gray-400 transition-[color,box-shadow] outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-50 md:text-sm",
        "file:inline-flex file:h-7 file:border-0 file:bg-transparent file:text-sm file:font-medium file:text-gray-700",
        className,
      )}
      {...props}
    />
  );
}

export { Input };
