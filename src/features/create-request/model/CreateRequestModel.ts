import type { HelpRequest } from '../../request-flow/model/RequestModel';

export type NewHelpRequest = Omit<HelpRequest, 'id' | 'commitments' | 'currentVolunteers'>;

export const DEFAULT_NEW_REQUEST: NewHelpRequest = {
  title: '',
  type: 'moving',
  customType: '',
  neighborhood: '',
  needs: '',
  whenISO: '',
  targetVolunteers: 6
};
