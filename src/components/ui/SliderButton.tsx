import { forwardRef } from "react";

interface CustomNavButtonProps {
  direction: "prev" | "next";
}

const CustomNavButton = forwardRef<HTMLButtonElement, CustomNavButtonProps>(
  ({ direction }, ref) => {
    return (
      <button
        ref={ref}
        className={`px-4 py-2 rounded bg-gray-200 hover:bg-gray-300 ${
          direction === "prev" ? "mr-2" : "ml-2"
        }`}
      >
        {direction === "prev" ? "← 이전" : "다음 →"}
      </button>
    );
  }
);

export default CustomNavButton;