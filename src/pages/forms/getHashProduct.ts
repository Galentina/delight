
import { api } from './api';

import {
    tableColor, editProd, mem, mem128, mem64,
    tableProcessor, prodName, tableMem, tableGraphics,
    tableBrightness, tableContrast, tableMatrix, tableCameras,
    showCharacteristics, wrightReview, reviewButton, characteristicsButton,
    itemPrice, addToBasket, itemsInBasket,
} from './elements';
import { addItemToBasket } from './addItemToBasket';
import { storage } from './storage';
import { generateReviewTable } from './generateReviewTable';

export const getHashProduct = (token: string, hash: string) => {
    try {
        const data = api.hashProduct(token, hash);
        data.then((answer) => {
            const { name, price } = answer;
            const {
                memory, colors, processor, graphics, brightness,
                contrast, matrix, cameras,
            } = answer.characteristics;
            console.log('answer', answer);
            prodName.innerHTML = name;
            editProd.className = 'btn-red';
            editProd.style.cursor = 'pointer';
            if (mem64 && mem128) {
                if (memory === 64) {
                    mem64.className = 'param selected';
                    mem128.className = 'param';
                } else if (memory === 128) {
                    mem128.className = 'param selected';
                    mem64.className = 'param';
                } else {
                    const newMem = `<div id="mem${memory}" class="param selected">
                            <p>${memory}</p>
                            </div>`;
                    if (mem) mem.insertAdjacentHTML(<'beforebegin' | 'afterbegin' | 'beforeend' | 'afterend'>'beforeend', newMem);
                    mem128.className = 'param';
                    mem64.className = 'param';
                }
            }
            itemPrice.innerHTML = `${price} &#8364;`;
            addToBasket.addEventListener('click', () => {
                addItemToBasket(hash);
                itemsInBasket.innerHTML = storage.getItem('basket').length;
            });
            tableMem.innerHTML = `${memory} GB`;
            let allColors;
            if (colors) {
                if (colors.length === 1) allColors = colors.join('');
                else allColors = colors.join(', ');
            }
            tableColor.innerHTML = `${allColors}`;
            tableProcessor.innerHTML = `${processor}`;
            tableGraphics.innerHTML = `${graphics}`;
            tableBrightness.innerHTML = `${brightness}`;
            tableContrast.innerHTML = `${contrast}`;
            tableMatrix.innerHTML = `${matrix}`;
            tableCameras.innerHTML = `${cameras}`;
            characteristicsButton.addEventListener('click', () => {
                characteristicsButton.className = 'active';
                reviewButton.className = '';
                showCharacteristics.className = 'tab_pane show';
                wrightReview.className = 'tab_pane';
            });
            reviewButton.addEventListener('click', () => {
                reviewButton.className = 'active';
                characteristicsButton.className = '';
                showCharacteristics.className = 'tab_pane';
                wrightReview.className = 'tab_pane show';
                generateReviewTable(answer);
            });


            return null;
        })
            .catch((error) => console.log(error.messade));
    } catch (error) {
        console.log(error.message);

        return null;
    }
};
