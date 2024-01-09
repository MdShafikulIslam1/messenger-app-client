"use client";

import Image from "next/image";
import Modal from "./Modal";

interface ImageModalProps {
  isOpen?: boolean;
  onClose: () => void;
  src?: string | null;
}

const ImageModal = ({ onClose, isOpen, src }: ImageModalProps) => {
  if (!src) {
    return null;
  }
  return (
    <Modal onClose={onClose} isOpen={isOpen}>
      <div className="w-80 h-80">
        <Image alt="image" src={src} className="object-cover"fill />
      </div>
    </Modal>
  );
};

export default ImageModal;
