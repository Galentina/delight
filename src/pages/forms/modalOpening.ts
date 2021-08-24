import { modalOpen } from './elements';

export const modalOpening = () => {
    modalOpen.style.display = 'inherit';

    return null;
};

export const modalClosing = () => {
    modalOpen.style.display = 'none';
};
