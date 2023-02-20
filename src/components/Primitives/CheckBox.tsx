import _ from 'lodash';
import React from 'react';

import { generator } from '../../utils/Draw';
import { WireframeContainer } from '../../utils/Layout';
import { tw, colors, TW_REM_025, COMPONENT_PADDING } from '../../utils/styling';

const checkedPath =
    'M20.95 31.95 35.4 17.5l-2.15-2.15-12.3 12.3L15 21.7l-2.15 2.15ZM9 42q-1.2 0-2.1-.9Q6 40.2 6 39V9q0-1.2.9-2.1Q7.8 6 9 6h30q1.2 0 2.1.9.9.9.9 2.1v30q0 1.2-.9 2.1-.9.9-2.1.9Zm0-3h30V9H9v30ZM9 9v30V9Z';
const uncheckedPath =
    'M9 42q-1.2 0-2.1-.9Q6 40.2 6 39V9q0-1.2.9-2.1Q7.8 6 9 6h30q1.2 0 2.1.9.9.9.9 2.1v30q0 1.2-.9 2.1-.9.9-2.1.9Zm0-3h30V9H9v30Z';
const indeterminatePath =
    'M12.5 25.4h23.05v-3H12.5ZM9 42q-1.2 0-2.1-.9Q6 40.2 6 39V9q0-1.2.9-2.1Q7.8 6 9 6h30q1.2 0 2.1.9.9.9.9 2.1v30q0 1.2-.9 2.1-.9.9-2.1.9Zm0-3h30V9H9v30ZM9 9v30V9Z';

export type CheckBoxOptions = {
    size: number;
    color?: string;
    status?: 'checked' | 'unchecked' | 'indeterminate';
    style?: any;
    onPress?: () => void;
};

const CheckBox = ({ size, status = 'unchecked', color = colors.mainBlack, style, onPress }: CheckBoxOptions) => {
    const paths = [];
    let allPaths = [];

    const scale = (size * TW_REM_025 - COMPONENT_PADDING) / 48;

    const strokeColor = tw.color(color);
    let c: any;

    const pathOptions = {
        stroke: strokeColor,
        strokeWidth: 2,
        fill: strokeColor,
        fillStyle: 'solid'
    };

    switch (status) {
        case 'checked':
            c = generator.path(checkedPath, pathOptions);
            paths.push(generator.toPaths(c));
            break;
        case 'unchecked':
            c = generator.path(uncheckedPath, pathOptions);
            paths.push(generator.toPaths(c));
            break;
        case 'indeterminate':
            c = generator.path(indeterminatePath, pathOptions);
            paths.push(generator.toPaths(c));
            break;
    }

    allPaths = _.flatten(paths);

    return (
        <WireframeContainer paths={allPaths} width={size} height={size} scale={scale} style={style} onPress={onPress} />
    );
};

export { CheckBox };
