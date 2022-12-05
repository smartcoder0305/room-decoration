import { atom } from 'recoil';

export const countState = atom({
    key: 'countSt', 
    default: 0,
});

export const netPriceState = atom({
    key: 'netPriceSt',
    default: 0,
})

export const imageCountState = atom({
    key: 'imageCountSt',
    default: 0,
})

export const totalPriceState = atom({
    key: 'totalPriceSt',
    default: 0,
})

export const discountPriceState = atom({
    key: 'discountPriceSt',
    default: 0,
})

export const discountPercentageState = atom({
    key: 'discountPercentageSt',
    default: 0,
})