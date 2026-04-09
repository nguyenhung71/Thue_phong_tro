import { memo } from "react";

const Button = ({ text, textColor, bgColor, IcAfter, onClick, fullWidth }) => {
  return (
    <button
      type="button"
      className={`px-4 py-2 ${textColor} ${bgColor} ${fullWidth && "w-full"} outline-none rounded-md flex items-center justify-center gap-1 hover:underline`}
      onClick={onClick}
    >
      <span>{text}</span>
      {IcAfter && <IcAfter />}
    </button>
  );
};

export default memo(Button);