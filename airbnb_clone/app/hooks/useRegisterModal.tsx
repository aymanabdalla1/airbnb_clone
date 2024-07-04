import {create} from 'zustand'

interface RegisterModalState {
    isOpen: boolean;
    onClose: () => void;
    onOpen: () => void;
}

const useRegisterModal = create<RegisterModalState>((set) => ({
    isOpen: false,
    onOpen: () => set({isOpen: true}),
    onClose: () => set({isOpen: false})
}));

export default useRegisterModal;
