"use client";

import clsx from "clsx";
import React from "react";
import { FieldErrors, FieldValues, UseFormRegister } from "react-hook-form";

type MessageInputProps = {
  id: string;
  register: UseFormRegister<FieldValues>;
  required?: boolean;
  type?: string;
  errors?: FieldErrors;
  placeholder?: string;
};

const MessageInput: React.FC<MessageInputProps> = ({
  id,
  register,
  errors,
  placeholder,
  required,
  type,
}) => {
  return (
    <div className="relative w-full">
      <input
        type={type}
        {...register(id, { required })}
        id={id}
        placeholder={placeholder}
        autoComplete={id}
        className={clsx(
          `w-full px-4 py-2 font-light text-black bg-neutral-100 rounded-full focus:outline-none`
        )}
      />
    </div>
  );
};

export default MessageInput;
