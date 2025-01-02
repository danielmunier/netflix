import React, { FC } from 'react';

interface InputProps {
  id: string;
  onChange: (ev: React.ChangeEvent<HTMLInputElement>) => void;
  value: string;
  label: string;
  type: string;
}

const Input: FC<InputProps> = ({
  id,
  onChange,
  value,
  label,
  type
}) => {
  return (
    <div className="relative">
      <input
        onChange={onChange}
        type={type}
        value={value}
        id={id}
        className="
          block
          rounded-md
          px-6
          pt-6
          w-full
          text-md
          text-white
          bg-neutral-600
          appearance-none
          focus:outline-none
          focus:ring-0
          peer
        "
        placeholder=" "
      />
      <label
        htmlFor={id}
        className="
          absolute
          text-md
          text-gray-400
          duration-150
          transform
          -translate-y-3
          scale-75
          top-3
          z-10
          origin-[0]
          left-6
          peer-placeholder-shown:scale-100
          peer-placeholder-shown:translate-y-0
          peer-focus:scale-75
          peer-focus:-translate-y-3
        "
      >
        {label}
      </label>
    </div>
  );
}

export default Input;