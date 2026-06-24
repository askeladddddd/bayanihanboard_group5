import React from 'react';
import { useCreateRequestViewModel } from '../viewmodel/useCreateRequestViewModel';
import type { NewHelpRequest } from '../model/CreateRequestModel';
import { Button } from '../../../shared-components/Button/Button';
import { useLanguage } from '@/contexts/LanguageContext';

interface Props {
  onSubmit: (req: NewHelpRequest) => void;
  isOpen: boolean;
  onClose: () => void;
}

export const CreateRequestView: React.FC<Props> = ({ onSubmit, isOpen, onClose }) => {
  const vm = useCreateRequestViewModel(onSubmit, onClose);
  const { t } = useLanguage();

  // Sync prop with vm state
  React.useEffect(() => {
    if (isOpen && !vm.isOpen) vm.openModal();
    if (!isOpen && vm.isOpen) vm.closeModal();
  }, [isOpen]);

  if (!vm.isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 p-4 backdrop-blur-sm animate-in fade-in duration-200">
      <div className="relative w-full max-w-lg overflow-hidden rounded-3xl bg-card shadow-2xl shadow-black/20 animate-in zoom-in-95 duration-200">
        <div className="border-b border-border/50 bg-muted/30 px-6 py-5">
          <h2 className="font-display text-2xl font-bold tracking-tight text-foreground">{t('create.title')}</h2>
          <p className="mt-1 text-sm text-muted-foreground">{t('create.desc')}</p>
        </div>
        
        <form onSubmit={vm.handleSubmit} className="p-6 space-y-5">
          <div className="space-y-1.5">
            <label className="text-xs font-bold uppercase tracking-wider text-muted-foreground">{t('create.form.title')}</label>
            <input 
              required 
              type="text" 
              value={vm.formData.title} 
              onChange={e => vm.handleChange('title', e.target.value)} 
              placeholder={t('create.form.title.ph')}
              className="w-full rounded-2xl border-2 border-transparent bg-muted/50 px-4 py-3 text-sm font-medium outline-none transition focus:border-[color:var(--bamboo)]/50 focus:bg-background focus:ring-4 focus:ring-[color:var(--bamboo)]/10" 
            />
          </div>

          <div className="space-y-1.5">
            <label className="text-xs font-bold uppercase tracking-wider text-muted-foreground">{t('create.form.category')}</label>
            <select 
              value={vm.formData.type} 
              onChange={e => vm.handleChange('type', e.target.value)} 
              className="w-full rounded-2xl border-2 border-transparent bg-muted/50 px-4 py-3 text-sm font-medium outline-none transition focus:border-[color:var(--bamboo)]/50 focus:bg-background focus:ring-4 focus:ring-[color:var(--bamboo)]/10"
            >
              <option value="moving">MOVING HOUSE</option>
              <option value="medical">MEDICAL EMERGENCY</option>
              <option value="fundraiser">FUNDRAISER / WAKE</option>
              <option value="other">OTHER</option>
            </select>
          </div>

          {vm.formData.type === 'other' && (
            <div className="space-y-1.5 animate-in slide-in-from-top-2 duration-200">
              <label className="text-xs font-bold uppercase tracking-wider text-muted-foreground">Custom Category</label>
              <input 
                required 
                type="text" 
                value={vm.formData.customType || ''} 
                onChange={e => vm.handleChange('customType', e.target.value)} 
                placeholder="e.g. Community Cleanup"
                className="w-full rounded-2xl border-2 border-transparent bg-muted/50 px-4 py-3 text-sm font-medium outline-none transition focus:border-[color:var(--bamboo)]/50 focus:bg-background focus:ring-4 focus:ring-[color:var(--bamboo)]/10" 
              />
            </div>
          )}

          <div className="space-y-1.5">
            <label className="text-xs font-bold uppercase tracking-wider text-muted-foreground">{t('create.form.location')}</label>
            <input 
              required 
              type="text" 
              value={vm.formData.neighborhood} 
              onChange={e => vm.handleChange('neighborhood', e.target.value)} 
              placeholder={t('create.form.location.ph')}
              className="w-full rounded-2xl border-2 border-transparent bg-muted/50 px-4 py-3 text-sm font-medium outline-none transition focus:border-[color:var(--bamboo)]/50 focus:bg-background focus:ring-4 focus:ring-[color:var(--bamboo)]/10" 
            />
          </div>

          <div className="space-y-1.5">
            <label className="text-xs font-bold uppercase tracking-wider text-muted-foreground">{t('create.form.desc')}</label>
            <textarea 
              required 
              value={vm.formData.needs} 
              onChange={e => vm.handleChange('needs', e.target.value)} 
              placeholder={t('create.form.desc.ph')}
              rows={3}
              className="w-full rounded-2xl border-2 border-transparent bg-muted/50 px-4 py-3 text-sm font-medium outline-none transition focus:border-[color:var(--bamboo)]/50 focus:bg-background focus:ring-4 focus:ring-[color:var(--bamboo)]/10 resize-none" 
            />
          </div>

          <div className="flex gap-4">
            <div className="flex-1 space-y-1.5">
              <label className="text-xs font-bold uppercase tracking-wider text-muted-foreground">{t('create.form.date')}</label>
              <input 
                required 
                type="datetime-local" 
                value={vm.formData.whenISO} 
                onChange={e => vm.handleChange('whenISO', e.target.value)} 
                className="w-full rounded-2xl border-2 border-transparent bg-muted/50 px-4 py-3 text-sm font-medium outline-none transition focus:border-[color:var(--bamboo)]/50 focus:bg-background focus:ring-4 focus:ring-[color:var(--bamboo)]/10" 
              />
            </div>
            <div className="flex-1 space-y-1.5">
              <label className="text-xs font-bold uppercase tracking-wider text-muted-foreground">{t('create.form.volunteers')}</label>
              <input 
                required 
                type="number" 
                min={1} 
                max={50} 
                value={vm.formData.targetVolunteers} 
                onChange={e => vm.handleChange('targetVolunteers', parseInt(e.target.value))} 
                className="w-full rounded-2xl border-2 border-transparent bg-muted/50 px-4 py-3 text-sm font-medium outline-none transition focus:border-[color:var(--bamboo)]/50 focus:bg-background focus:ring-4 focus:ring-[color:var(--bamboo)]/10" 
              />
            </div>
          </div>

          <div className="mt-8 flex items-center justify-end gap-3 border-t border-border/50 pt-5">
            <Button type="button" variant="ghost" onClick={vm.closeModal} className="h-[44px]">{t('create.btn.cancel')}</Button>
            <Button type="submit" variant="primary" className="h-[44px] px-6 shadow-md shadow-[color:var(--bamboo)]/20 hover:-translate-y-0.5">{t('create.btn.post')}</Button>
          </div>
        </form>
      </div>
    </div>
  );
};
