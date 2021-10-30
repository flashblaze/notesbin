import create from "zustand";
import { combine } from "zustand/middleware";

export const useUuidStore = create((set) => ({
  uuid: "",
  setUuid: (uuid) => set(() => ({ uuid })),
}));

export const useNoteStore = create(
  combine({ note: "", isEditing: false, isSaving: false, doesSavedNoteExists: false }, (set) => ({
    setNote: (note) => set(() => ({ note })),
    setIsEditing: (isEditing) => set(() => ({ isEditing })),
    setIsSaving: (isSaving) => set(() => ({ isSaving })),
    setDoesSavedNoteExists: (doesSavedNoteExists) => set(() => ({ doesSavedNoteExists })),
  }))
);
