"use client";

import { User } from "@prisma/client";
import Modal from "./Modal";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { FieldValues, SubmitHandler, useForm } from "react-hook-form";
import axios from "axios";
import toast from "react-hot-toast";
import Input from "./inputs/Input";
import Select from "./Select";
import Button from "./Button";

interface GroupChatModalProps {
  isOpen: boolean;
  onClose: () => void;
  users: User[];
}

const GroupChatModal = ({ isOpen, onClose, users }: GroupChatModalProps) => {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);

  const {
    register,
    handleSubmit,
    setValue,
    watch,
    formState: { errors },
  } = useForm<FieldValues>({
    defaultValues: {
      name: "",
      members: [],
    },
  });
  const members = watch("members");

  const onSubmit: SubmitHandler<FieldValues> = (data) => {
    setIsLoading(true);
    axios
      .post("/api/conversations", {
        ...data,
        isGroup: true,
      })
      .then(() => {
        router.refresh();
        onClose();
      })
      .catch(() => toast.error("something went wrong"))
      .finally(() => setIsLoading(false));
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="space-y-12">
          <div className="border-b border-gray-900/10 pb-12 shadow-sm">
            <h1 className="text-base font-semibold text-gray-900 leading-7">
              Create a group chat
            </h1>
            <p className="mt-2 text-sm text-gray-500 leading-6">
              Create a chat with more than 2 people
            </p>
            <div className="mt-10 flex flex-col gap-y-8">
              <Input
                register={register}
                label="Name"
                id="name"
                errors={errors}
                disabled={isLoading}
              />
              <Select
                disabled={isLoading}
                label="Members"
                options={users?.map((user) => ({
                  value: user?.id,
                  label: user?.name,
                }))}
                onChange={(value) =>
                  setValue("members", value, { shouldValidate: true })
                }
                value={members}
              />
            </div>
          </div>
        </div>

        {/* Cancel or Submit button */}

        <div className="mt-6 flex items-center justify-end gap-x-6">
          <Button
            disabled={isLoading}
            secondary
            type="button"
            onClick={onClose}
          >
            Cancel
          </Button>

          <Button
            disabled={isLoading}
            type="submit"
          >
            Create
          </Button>
        </div>
      </form>
    </Modal>
  );
};

export default GroupChatModal;
