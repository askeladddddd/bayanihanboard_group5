import React from 'react';
import { useCreateRequestViewModel } from '../viewmodel/useCreateRequestViewModel';
import type { NewHelpRequest } from '../model/CreateRequestModel';
import { useLanguage } from '@/contexts/LanguageContext';
import { X, Type, Tag, MapPin, AlignLeft, Image as ImageIcon, Calendar, Users, ChevronDown } from 'lucide-react';

interface Props {
  onSubmit: (req: NewHelpRequest) => void;
  isOpen: boolean;
  onClose: () => void;
}

export const CreateRequestView: React.FC<Props> = ({ onSubmit, isOpen, onClose }) => {
  const vm = useCreateRequestViewModel(onSubmit, onClose);
  const { t } = useLanguage();

  React.useEffect(() => {
    if (isOpen && !vm.isOpen) vm.openModal();
    if (!isOpen && vm.isOpen) vm.closeModal();
  }, [isOpen]);

  React.useEffect(() => {
    if (vm.isOpen) {
      const originalOverflow = document.body.style.overflow;
      document.body.style.overflow = 'hidden';
      return () => {
        document.body.style.overflow = originalOverflow;
      };
    }
  }, [vm.isOpen]);

  if (!vm.isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-center bg-black/40 p-0 sm:p-4 backdrop-blur-sm animate-in fade-in duration-200">
      <div className="relative w-full sm:max-w-4xl max-h-[95vh] sm:max-h-[90vh] overflow-y-auto rounded-t-3xl sm:rounded-3xl bg-[#FAF8F2] shadow-2xl animate-in slide-in-from-bottom-4 sm:zoom-in-95 duration-200">

        {/* Header */}
        <div className="border-b border-stone-200 bg-[#F5F2EA] px-8 py-5 flex items-center justify-between">
          <div>
            <h2 className="font-display text-lg sm:text-2xl font-bold tracking-tight text-stone-800">{t('create.title')}</h2>
            <p className="mt-1 text-sm text-stone-600">{t('create.desc')}</p>
          </div>
          <button
            onClick={vm.closeModal}
            className="rounded-full p-2 text-stone-500 transition hover:bg-stone-200 hover:text-stone-800 focus:outline-none focus:ring-2 focus:ring-[color:var(--bamboo)]"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        {/* Body */}
        <form onSubmit={vm.handleSubmit} className="p-4 sm:p-8">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-8 gap-y-5">

            {/* Row 1 */}
            <div className="space-y-1.5">
              <label className="text-xs font-bold uppercase tracking-wider text-stone-500">{t('create.form.title')}</label>
              <div className="relative group">
                <Type className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-stone-400 group-focus-within:text-[color:var(--bamboo)] transition-colors" />
                <input
                  required
                  type="text"
                  value={vm.formData.title}
                  onChange={e => vm.handleChange('title', e.target.value)}
                  placeholder={t('create.form.title.ph')}
                  className="w-full rounded-xl border border-stone-200 bg-white pl-12 pr-4 py-3 text-sm font-medium text-stone-800 outline-none transition focus:border-[color:var(--bamboo)] focus:ring-4 focus:ring-[color:var(--bamboo)]/10 placeholder:text-stone-400"
                />
              </div>
            </div>

            <div className="space-y-1.5">
              <label className="text-xs font-bold uppercase tracking-wider text-stone-500">{t('create.form.category')}</label>
              <div className="relative group">
                <Tag className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-stone-400 group-focus-within:text-[color:var(--bamboo)] transition-colors pointer-events-none" />
                <select
                  value={vm.formData.type}
                  onChange={e => vm.handleChange('type', e.target.value)}
                  className="w-full appearance-none rounded-xl border border-stone-200 bg-white pl-12 pr-10 py-3 text-sm font-medium text-stone-800 outline-none transition focus:border-[color:var(--bamboo)] focus:ring-4 focus:ring-[color:var(--bamboo)]/10"
                >
                  <option value="moving">MOVING HOUSE</option>
                  <option value="medical">MEDICAL EMERGENCY</option>
                  <option value="fundraiser">FUNDRAISER / WAKE</option>
                  <option value="other">OTHER</option>
                </select>
                <ChevronDown className="absolute right-4 top-1/2 -translate-y-1/2 h-5 w-5 text-stone-400 pointer-events-none" />
              </div>
            </div>

            {vm.formData.type === 'other' && (
              <div className="space-y-1.5 md:col-span-2 animate-in fade-in duration-200">
                <label className="text-xs font-bold uppercase tracking-wider text-stone-500">Custom Category</label>
                <div className="relative group">
                  <Tag className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-stone-400 group-focus-within:text-[color:var(--bamboo)] transition-colors" />
                  <input
                    required
                    type="text"
                    value={vm.formData.customType || ''}
                    onChange={e => vm.handleChange('customType', e.target.value)}
                    placeholder="e.g. Community Cleanup"
                    className="w-full rounded-xl border border-stone-200 bg-white pl-12 pr-4 py-3 text-sm font-medium text-stone-800 outline-none transition focus:border-[color:var(--bamboo)] focus:ring-4 focus:ring-[color:var(--bamboo)]/10 placeholder:text-stone-400"
                  />
                </div>
              </div>
            )}

            {/* Row 2 */}
            <div className="space-y-1.5">
              <label className="text-xs font-bold uppercase tracking-wider text-stone-500">{t('create.form.location')}</label>
              <div className="relative group">
                <MapPin className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-stone-400 group-focus-within:text-[color:var(--bamboo)] transition-colors" />
                <input
                  required
                  type="text"
                  value={vm.formData.neighborhood}
                  onChange={e => vm.handleChange('neighborhood', e.target.value)}
                  placeholder={t('create.form.location.ph')}
                  className="w-full rounded-xl border border-stone-200 bg-white pl-12 pr-4 py-3 text-sm font-medium text-stone-800 outline-none transition focus:border-[color:var(--bamboo)] focus:ring-4 focus:ring-[color:var(--bamboo)]/10 placeholder:text-stone-400"
                />
              </div>
            </div>

            <div className="space-y-1.5 md:col-span-2">
              <label className="text-xs font-bold uppercase tracking-wider text-stone-500">Photos (Optional, up to 6)</label>
              {/* Hidden file input */}
              <input
                ref={vm.fileInputRef}
                type="file"
                accept="image/*"
                multiple
                className="hidden"
                onChange={e => vm.handleImageFiles(e.target.files)}
              />
              {/* Drop zone / click to upload */}
              <div
                onClick={() => vm.fileInputRef.current?.click()}
                onDragOver={e => e.preventDefault()}
                onDrop={e => { e.preventDefault(); vm.handleImageFiles(e.dataTransfer.files); }}
                className="flex flex-col items-center justify-center gap-2 w-full border-2 border-dashed border-stone-300 rounded-xl py-6 px-4 cursor-pointer hover:border-[color:var(--bamboo)] hover:bg-[color:var(--bamboo)]/5 transition-colors group"
              >
                <ImageIcon className="h-8 w-8 text-stone-400 group-hover:text-[color:var(--bamboo)] transition-colors" />
                <p className="text-sm font-semibold text-stone-500 group-hover:text-[color:var(--bamboo-deep)] transition-colors">Click or drag photos here</p>
                <p className="text-xs text-stone-400">JPG, PNG, WEBP — up to 6 images</p>
              </div>
              {/* Image Previews */}
              {vm.imagePreviews.length > 0 && (
                <div className="grid grid-cols-3 gap-2 mt-2">
                  {vm.imagePreviews.map((src, i) => (
                    <div key={i} className="relative group rounded-xl overflow-hidden aspect-video border border-stone-200 shadow-sm">
                      <img src={src} alt={`Preview ${i + 1}`} className="w-full h-full object-cover" />
                      <button
                        type="button"
                        onClick={() => vm.removeImage(i)}
                        className="absolute top-1 right-1 bg-black/60 hover:bg-red-500 text-white rounded-full p-0.5 transition-colors opacity-0 group-hover:opacity-100"
                      >
                        <X className="h-3.5 w-3.5" />
                      </button>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* Row 3 */}
            <div className="space-y-1.5">
              <label className="text-xs font-bold uppercase tracking-wider text-stone-500">{t('create.form.date')}</label>
              <div className="relative group">
                <Calendar className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-stone-400 group-focus-within:text-[color:var(--bamboo)] transition-colors pointer-events-none" />
                <input
                  required
                  type="datetime-local"
                  value={vm.formData.whenISO}
                  onChange={e => vm.handleChange('whenISO', e.target.value)}
                  className="w-full rounded-xl border border-stone-200 bg-white pl-12 pr-4 py-3 text-sm font-medium text-stone-800 outline-none transition focus:border-[color:var(--bamboo)] focus:ring-4 focus:ring-[color:var(--bamboo)]/10"
                />
              </div>
            </div>

            <div className="space-y-1.5">
              <label className="text-xs font-bold uppercase tracking-wider text-stone-500">{t('create.form.volunteers')}</label>
              <div className="relative group">
                <Users className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-stone-400 group-focus-within:text-[color:var(--bamboo)] transition-colors" />
                <input
                  required
                  type="number"
                  min={1}
                  max={50}
                  value={vm.formData.targetVolunteers}
                  onChange={e => vm.handleChange('targetVolunteers', parseInt(e.target.value))}
                  className="w-full rounded-xl border border-stone-200 bg-white pl-12 pr-4 py-3 text-sm font-medium text-stone-800 outline-none transition focus:border-[color:var(--bamboo)] focus:ring-4 focus:ring-[color:var(--bamboo)]/10"
                />
              </div>
            </div>

          </div>

          {/* Row 4: Description (Full Width) */}
          <div className="mt-6 space-y-1.5">
            <label className="text-xs font-bold uppercase tracking-wider text-stone-500">{t('create.form.desc')}</label>
            <div className="relative group">
              <AlignLeft className="absolute left-4 top-4 h-5 w-5 text-stone-400 group-focus-within:text-[color:var(--bamboo)] transition-colors" />
              <textarea
                required
                value={vm.formData.needs}
                onChange={e => vm.handleChange('needs', e.target.value)}
                placeholder={t('create.form.desc.ph')}
                rows={4}
                className="w-full rounded-xl border border-stone-200 bg-white pl-12 pr-4 py-3 text-sm font-medium text-stone-800 outline-none transition focus:border-[color:var(--bamboo)] focus:ring-4 focus:ring-[color:var(--bamboo)]/10 resize-none placeholder:text-stone-400"
              />
            </div>
          </div>

          {/* Action Buttons */}
          <div className="mt-8 flex items-center justify-end gap-3 border-t border-stone-200 pt-6">
            <button
              type="button"
              onClick={vm.closeModal}
              className="h-11 px-6 rounded-xl text-sm font-bold text-stone-600 transition hover:bg-stone-200 hover:text-stone-900 focus:outline-none focus:ring-2 focus:ring-stone-300"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="h-11 px-8 rounded-xl bg-[#1a5c28] text-white text-sm font-bold shadow-md hover:bg-[#14471f] transition-colors focus:outline-none focus:ring-2 focus:ring-[#1a5c28] focus:ring-offset-2 focus:ring-offset-[#FAF8F2]"
            >
              Post Request
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
