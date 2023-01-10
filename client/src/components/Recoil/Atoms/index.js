import { atom } from 'recoil';

export const overlayState = atom({
    key: 'overlay', 
    default: false,
});

export const secondOverlayState = atom({
    key: 'secondOverlay', 
    default: false,
});

export const paymentMethods = atom({
    key: 'payments',
    default: [
        // {
        //     cardNumber: '4800 0000 0000 0000',
        //     cardHolder: 'Rusan Matusevich',
        //     expiriedMonth: '01',
        //     expiriedYear: '2022',
        //     cvv: '000',
        // }
    ]
})

export const selectedPaymentMethod = atom({
    key: 'selectedPayment',
    default: undefined,
})

export const selectedShippingAddress = atom({
    key: 'selectedAddress',
    default: undefined,
})

export const showMenu = atom({
    key: 'menu',
    default: false,
})
export const modalWindows = atom({
    key: 'modals',
    default: {
        editImage: { visible: false, data: {}},
        uploadOptions: { visible: false, data: {}},
        imageLoader: { visible: false, data: {}},
        imageOptions: { visible: false, data: {}},
        deleteConfirm: { visible: false, data: {}},
        checkout: { visible: false, data: {}},
        mobileCheckout: { visible: false, data: {}},
    }
})

export const secondaryModals = atom({
    key: 'secondary-modals',
    default: {
        addCard: { visible: false, data: {}},
        selectCard: { visible: false, },
        addAddress: { visible: false, data: {}},
        addAddressMobile: { visible: false, data: {}},
    }
})
export const imagesData = atom({
    key: 'uploadedImages',
    default: [],
})
export const sharedFunction = atom({
    key: 'sharedFunc',
    default: {},
})

export const popUpImage = atom({
    key: 'imageOnPopup',
    default: undefined,
})
