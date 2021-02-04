import create from "zustand";

export const useUuidStore = create((set) => ({
  uuid: "",
  setUuid: (uuid) => set(() => ({ uuid })),
}));

export const useNoteStore = create((set) => ({
  note: "",
  editNote: "",
  setNote: (note) => set(() => ({ note })),
  setEditPrevNote: (editNote) => set(() => ({ editNote })),
}));
