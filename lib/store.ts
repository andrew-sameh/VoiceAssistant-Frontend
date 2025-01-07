import { atom } from 'jotai';

export interface Doc<Type = string> {
  id: string
  name: string
  overview: string | null
  namespace: string
  created_at: string
  file_name: string
  type: Type
//   description: string
//   strengths?: string
}


export const selectedDocumentAtom = atom<Doc | null>(null);
export const documentsAtom = atom<Doc[]>([]);