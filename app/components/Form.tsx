"use client";

import { FieldValues, SubmitHandler, useForm } from "react-hook-form";
import useConversation from "../hooks/useConversation";
import axios from "axios";
import { HiPaperAirplane, HiPhoto } from "react-icons/hi2";
import MessageInput from "./MessageInput";

const Form = () => {
  const { conversationId } = useConversation();
  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm<FieldValues>({
    defaultValues: {
      message: "",
    },
  });

  const onSubmit: SubmitHandler<FieldValues> = (data) => {
    setValue("message", "", { shouldValidate: true });
    axios.post("/api/messages", {
      ...data,
      conversationId,
    });
  };
  return (
    <div className="p-4 w-full flex items-center gap-2 lg:gap-4 bg-white border-t">
      <HiPhoto size={32} className="text-sky-500" />
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="w-full flex items-center gap-2 lg:gap-6"
      >
        <MessageInput
          id="message"
          register={register}
          errors={errors}
          placeholder="Write a Message"
          required
          type="text"
        />
         <button
        type="submit"
        className="p-2 bg-sky-500 hover:bg-sky-600 transition rounded-full cursor-pointer"
      >
        <HiPaperAirplane className="text-white" size={18} />
      </button>
      </form>
    </div>
  );
};

export default Form;
