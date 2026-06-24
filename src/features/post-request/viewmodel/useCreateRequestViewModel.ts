import { useState } from 'react';
import type { NewHelpRequest } from '../model/CreateRequestModel';
import { DEFAULT_NEW_REQUEST } from '../model/CreateRequestModel';

export const useCreateRequestViewModel = (onSubmit: (req: NewHelpRequest) => void, onClose: () => void) => {
  const [formData, setFormData] = useState<NewHelpRequest>(DEFAULT_NEW_REQUEST);
  const [isOpen, setIsOpen] = useState(false);

  const openModal = () => setIsOpen(true);
  const closeModal = () => {
    setIsOpen(false);
    setFormData(DEFAULT_NEW_REQUEST);
    onClose();
  };

  const handleChange = (field: keyof NewHelpRequest, value: string | number) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.title || !formData.neighborhood || !formData.needs) return;

    onSubmit(formData);
    closeModal();
  };

  return {
    isOpen,
    openModal,
    closeModal,
    formData,
    handleChange,
    handleSubmit
  };
};
