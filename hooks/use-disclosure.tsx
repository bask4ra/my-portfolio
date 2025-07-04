"use client";

import { useState } from "react";

type UseDisclosureReturn = {
  isOpen: boolean;
  onOpen: () => void;
  onClose: () => void;
  onToggle: () => void;
  setIsOpenAction: (isOpen: boolean) => void;
};

export function useDisclosure(
  initialState: boolean = false
): UseDisclosureReturn {
  const [isOpen, setIsOpen] = useState<boolean>(initialState);

  const onOpen = () => setIsOpen(true);
  const onClose = () => setIsOpen(false);
  const onToggle = () => setIsOpen((prev) => !prev);
  const setIsOpenAction = (isOpen: boolean) => setIsOpen(isOpen);

  return {
    isOpen,
    onOpen,
    onClose,
    onToggle,
    setIsOpenAction,
  };
}
