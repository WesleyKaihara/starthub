import React, { useState } from "react";
import { FaTrashAlt } from "react-icons/fa";
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalCloseButton,
  ModalBody,
  ModalFooter,
  Button,
  useDisclosure,
} from "@chakra-ui/react";

interface CardProps {
  imageSrc: string;
  title: string;
  description?: string;
  buttonText: string;
  buttonOnClick: () => void;
  cardOnClick: () => void;
  showDeleteButton?: boolean;
  deleteButtonOnClick?: () => void;
}

const CardProjeto: React.FC<CardProps> = ({
  imageSrc,
  title,
  description,
  buttonText,
  buttonOnClick,
  cardOnClick,
  showDeleteButton = false,
  deleteButtonOnClick,
}) => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const limitedDescription = description
    ? `${description.slice(0, 100)}...`
    : "";

  const handleDeleteClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    onOpen();
  };

  const handleConfirmDelete = () => {
    if (deleteButtonOnClick) {
      deleteButtonOnClick();
    }
    onClose();
  };

  return (
    <>
      <div
        className="max-w-sm rounded overflow-hidden shadow-lg transform transition duration-300 ease-in-out hover:scale-105 relative cursor-pointer"
        onClick={cardOnClick}
      >
        <img className="w-full h-48 object-cover" src={imageSrc} alt={title} />
        <div className="px-6 pt-6 pb-16">
          <div className="font-bold text-xl mb-2">{title}</div>
          <p className="text-gray-700 text-base text-justify">
            {limitedDescription}
          </p>
        </div>
        <div className="absolute bottom-0 left-0 w-full flex justify-between px-6 py-4">
          <button
            className="bg-primary text-white font-bold py-2 px-4 rounded-md w-full transition duration-300 ease-in-out hover:filter hover:brightness-90"
            onClick={buttonOnClick}
          >
            {buttonText}
          </button>
          {showDeleteButton && (
            <button className="text-red-600 ml-4" onClick={handleDeleteClick}>
              <FaTrashAlt size={20} />
            </button>
          )}
        </div>
      </div>

      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Confirmar Exclusão</ModalHeader>
          <ModalCloseButton />
          <ModalBody>Tem certeza que deseja deletar este item?</ModalBody>
          <ModalFooter>
            <Button colorScheme="red" mr={3} onClick={handleConfirmDelete}>
              Deletar
            </Button>
            <Button variant="ghost" onClick={onClose}>
              Cancelar
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
};

export default CardProjeto;
