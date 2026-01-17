'use client';

import { useModal } from './ModalContext';
import Modal from './Modal';

export default function ModalWrapper() {
    const { isOpen, closeModal } = useModal();
    return <Modal isOpen={isOpen} onClose={closeModal} />;
}
