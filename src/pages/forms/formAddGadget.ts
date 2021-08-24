import { addGadgetForm, textModal } from './elements';
import { ISubmitEvent } from '../types/types';
import { getToken } from './getFromStorage';
import { api } from './api';
import { modalClosing, modalOpening } from './modalOpening';
import { validateNewGadget } from './shema';


export const gadgetForm = () => {
    addGadgetForm.addEventListener('submit', (event) => {
        event.preventDefault();
        const submitEvent = event as unknown as ISubmitEvent;
        const formData = new FormData(submitEvent.target);

        const name = formData.get('naming');
        const price = Number(formData.get('price'));
        const memory = Number(formData.get('memory'));
        const color = formData.get('color');
        const processor = Number(formData.get('processor'));
        const graphics = Number(formData.get('graphics'));
        const brightness = Number(formData.get('brightness'));
        const contrast = Number(formData.get('contrast'));
        const matrix = Number(formData.get('matrix'));
        const cameras = Number(formData.get('cameras'));
        // const created = Date.now();
        const category = 'phone';

        const payload = {
            name,
            category,
            price,
            reviews:[
                {
                    hash: '9e02823d-6660-414f-974b-b16beb161597',
                    name: 'John Snow',
                    pros: 'Perfect gadget',
                    cons: 'Weak battery',
                },
            ],
            characteristics: {
                memory,
                colors: [color],
                processor,
                graphics,
                brightness,
                contrast,
                matrix,
                cameras,
            },
        };
        const token = getToken();
        console.log(token);
        try {
            const sendForm = api.createNewGadget(token, payload);
            sendForm.then((data) => {
                textModal.innerHTML = 'A new gadget\nwas successfully added\nto the list';

                return data;
            })
                .catch((error) => {
                    console.log(error.message);
                    const answer = validateNewGadget(payload);
                    textModal.innerHTML = answer;
                });
        } catch (error) {
            console.log(error.message);

            return null;
        }
        modalOpening();
        setTimeout(() => { modalClosing(); }, 5000);
        setTimeout(() => { addGadgetForm.reset(); }, 5500);
    });
};
