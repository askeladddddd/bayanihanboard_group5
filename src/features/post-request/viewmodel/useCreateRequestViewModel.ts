import { useState, useRef } from 'react';
import type { NewHelpRequest } from '../model/CreateRequestModel';
import { DEFAULT_NEW_REQUEST } from '../model/CreateRequestModel';

export const useCreateRequestViewModel = (onSubmit: (req: NewHelpRequest) => void, onClose: () => void) => {
  const [formData, setFormData] = useState<NewHelpRequest>(DEFAULT_NEW_REQUEST);
  const [isOpen, setIsOpen] = useState(false);
  const [imagePreviews, setImagePreviews] = useState<string[]>([]);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const openModal = () => setIsOpen(true);
  const closeModal = () => {
    setIsOpen(false);
    setFormData(DEFAULT_NEW_REQUEST);
    setImagePreviews([]);
    onClose();
  };

  const handleChange = (field: keyof NewHelpRequest, value: string | number | string[]) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleImageFiles = (files: FileList | null) => {
    if (!files || files.length === 0) return;
    const readers: Promise<string>[] = Array.from(files).map(file => {
      return new Promise<string>((resolve) => {
        const reader = new FileReader();
        reader.onload = (e) => resolve(e.target?.result as string);
        reader.readAsDataURL(file);
      });
    });
    Promise.all(readers).then(dataUrls => {
      setImagePreviews(prev => {
        const merged = [...prev, ...dataUrls].slice(0, 6); // max 6 images
        setFormData(fd => ({ ...fd, imageUrls: merged }));
        return merged;
      });
    });
  };

  const removeImage = (idx: number) => {
    setImagePreviews(prev => {
      const updated = prev.filter((_, i) => i !== idx);
      setFormData(fd => ({ ...fd, imageUrls: updated }));
      return updated;
    });
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
    handleSubmit,
    handleImageFiles,
    removeImage,
    imagePreviews,
    fileInputRef,
  };
};
