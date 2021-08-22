
import { api } from './api';

import {
    tableColor, editProd, mem, mem128, mem64,
    tableProcessor, prodName, tableMem, tableGraphics,
    tableBrightness, tableContrast, tableMatrix, tableCameras,
    showCharacteristics, wrightReview, reviewButton, characteristicsButton, itemPrice, addToBasket,
} from './elements';
import { addItemToBasket } from './addItemToBasket';

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
            if (prodName) { prodName.innerHTML = name; }
            if (editProd) {
                editProd.className = 'btn-red';
                editProd.style.cursor = 'pointer';
            }
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
            if (itemPrice) { itemPrice.innerHTML = `${price} &#8364;`; }
            if (addToBasket) {
                addToBasket.addEventListener('click', () => {
                    addItemToBasket();
                });
            }
            if (tableMem) { tableMem.innerHTML = `${memory} GB`; }
            let allColors;
            if (colors) {
                if (colors.length === 1) allColors = colors.join('');
                else allColors = colors.join(', ');
            }
            if (tableColor) { tableColor.innerHTML = `${allColors}`; }
            if (tableProcessor) { tableProcessor.innerHTML = `${processor}`; }
            if (tableGraphics) { tableGraphics.innerHTML = `${graphics}`; }
            if (tableBrightness) { tableBrightness.innerHTML = `${brightness}`; }
            if (tableContrast) { tableContrast.innerHTML = `${contrast}`; }
            if (tableMatrix) { tableMatrix.innerHTML = `${matrix}`; }
            if (tableCameras) { tableCameras.innerHTML = `${cameras}`; }
            if (characteristicsButton) {
                characteristicsButton.addEventListener('click', () => {
                    if (characteristicsButton) characteristicsButton.className = 'active';
                    if (reviewButton) reviewButton.className = '';
                    if (showCharacteristics) showCharacteristics.className = 'tab_pane show';
                    if (wrightReview) wrightReview.className = 'tab_pane';
                });
            }
            if (reviewButton) {
                reviewButton.addEventListener('click', () => {
                    if (reviewButton) reviewButton.className = 'active';
                    if (characteristicsButton) characteristicsButton.className = '';
                    if (showCharacteristics) showCharacteristics.className = 'tab_pane';
                    if (wrightReview) wrightReview.className = 'tab_pane show';
                });
            }


            return null;
        })
            .catch((error) => console.log(error.messade));
    } catch (error) {
        console.log(error.message);

        return null;
    }
};
