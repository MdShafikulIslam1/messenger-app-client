"use client";

import { Dialog, Transition } from "@headlessui/react";
import { Fragment } from "react";
import { RingLoader } from "react-spinners";

const LoadingModal = () => {
  return (
    <Transition.Root show as={Fragment}>
      <Dialog onClose={() => {}} as="div" className="relative z-50">
        <Transition.Child
          as={Fragment}
          enter="ease-out duration-3000"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in duration-200"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className="fixed inset-0 bg-slate-100 bg-opacity-50 transition-opacity" />
        </Transition.Child>
        <div className="fixed inset-0 z-10 overflow-y-auto">
          <div className="p-4  min-h-full flex justify-center items-center text-center">
            <RingLoader size={80} color="#36d7b7" />
          </div>
        </div>
      </Dialog>
    </Transition.Root>
  );
};

export default LoadingModal;
