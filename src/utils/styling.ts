import { create, useDeviceContext } from 'twrnc';

const tw = create();

const COMPONENT_PADDING = 4;
const TW_REM = 16;
const TW_REM_025 = 4;

const colors = {
    mainBlack: '[#393939]',
    mainGrey: '[#999999]'
};

export { tw, useDeviceContext, COMPONENT_PADDING, TW_REM, TW_REM_025, colors };
