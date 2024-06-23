import React, { useState } from "react";
import { FaCheckCircle, FaBan } from "react-icons/fa";
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
  showStatusChangeButton?: boolean;
  statusChangeButtonOnClick?: () => void;
  isActive?: boolean;
}

const CardProjeto: React.FC<CardProps> = ({
  imageSrc,
  title,
  description,
  buttonText,
  buttonOnClick,
  cardOnClick,
  showStatusChangeButton = false,
  statusChangeButtonOnClick,
  isActive = true,
}) => {
  const { onClose } = useDisclosure();
  const [isConfirmationOpen, setIsConfirmationOpen] = useState(false);
  const limitedDescription = description
    ? `${description.slice(0, 100)}...`
    : "";

  const handleStatusChangeClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    setIsConfirmationOpen(true);
  };

  const handleConfirmStatusChange = () => {
    if (statusChangeButtonOnClick) {
      statusChangeButtonOnClick();
    }
    setIsConfirmationOpen(false);
    onClose();
  };

  const handleCancelStatusChange = () => {
    setIsConfirmationOpen(false);
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
          {showStatusChangeButton && (
            <button onClick={handleStatusChangeClick} className='mx-4'>
              {isActive ? (
                <FaCheckCircle size={20} className="text-green-500" />
              ) : (
                <FaBan size={20} className="text-red-500" />
              )}
            </button>
          )}
        </div>
      </div>

      <Modal isOpen={isConfirmationOpen} onClose={handleCancelStatusChange}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Confirmar Alteração de Status</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            Tem certeza que deseja alterar o status deste projeto?
          </ModalBody>
          <ModalFooter>
            <Button
              colorScheme="green"
              mr={3}
              onClick={handleConfirmStatusChange}
            >
              Confirmar
            </Button>
            <Button variant="ghost" onClick={handleCancelStatusChange}>
              Cancelar
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
};

export default CardProjeto;
