import { useLanguageLayerValue } from '../context/LanguageLayer';

export default function useNumber(number) {
    const [{ language, hooksNumber }] = useLanguageLayerValue();

    if (isNaN(Number(number))) {
        return '0';
    }

    number = Math.floor(number);
    number = number + '';
    let length = number.length;

    if (length < 4) {
        return number;
    } else if (length === 4) {
        number = number.split('');
        number.splice(-3, 0, ' ');
        number = number.join('');
    } else if (length < 7) {
        number = number.split('');
        number.splice(-3, 3);
        number = number.join('') + hooksNumber[language].K;
    } else if (length < 10) {
        number = number.split('');
        number.splice(-3, 3);
        number.splice(-3, 0, ',');
        number.splice(-1, 1);
        number = number.join('') + hooksNumber[language].M;
    } else {
        number = number.split('');
        number.splice(-6, 6);
        number.splice(-3, 0, ',');
        number.splice(-1, 1);
        number = number.join('') + hooksNumber[language].B;
    }

    return number;
}
