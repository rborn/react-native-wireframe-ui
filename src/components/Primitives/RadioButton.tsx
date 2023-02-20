import _ from 'lodash';
import React from 'react';

import { generator } from '../../utils/Draw';
import { WireframeContainer } from '../../utils/Layout';
import { tw, colors, TW_REM_025, COMPONENT_PADDING } from '../../utils/styling';

const checkedPath =
    'M24 33.3q3.9 0 6.6-2.7 2.7-2.7 2.7-6.6 0-3.9-2.7-6.6-2.7-2.7-6.6-2.7-3.9 0-6.6 2.7-2.7 2.7-2.7 6.6 0 3.9 2.7 6.6 2.7 2.7 6.6 2.7ZM24 44q-4.1 0-7.8-1.6-3.6-1.6-6.3-4.3-2.8-2.7-4.3-6.4Q4 28.1 4 24q0-4.2 1.6-7.8 1.6-3.6 4.3-6.3 2.7-2.8 6.3-4.3Q20 4 24 4q4.2 0 7.8 1.6 3.6 1.6 6.3 4.3 2.7 2.7 4.3 6.3Q44 19.9 44 24t-1.6 7.8q-1.6 3.6-4.3 6.3t-6.3 4.3Q28.1 44 24 44Zm0-3q7.1 0 12-5 5-5 5-12 0-7.1-5-12-4.9-5-12-5-7 0-12 5-5 4.9-5 12 0 7 5 12t12 5Zm0-17Z';
const uncheckedPath =
    'M24 44q-4.1 0-7.8-1.6-3.6-1.6-6.3-4.3-2.8-2.7-4.3-6.4Q4 28.1 4 24q0-4.2 1.6-7.8 1.6-3.6 4.3-6.3 2.7-2.8 6.3-4.3Q20 4 24 4q4.2 0 7.8 1.6 3.6 1.6 6.3 4.3 2.7 2.7 4.3 6.3Q44 19.9 44 24t-1.6 7.8q-1.6 3.6-4.3 6.3t-6.3 4.3Q28.1 44 24 44Zm0-3q7.1 0 12-5 5-5 5-12 0-7.1-5-12-4.9-5-12-5-7 0-12 5-5 4.9-5 12 0 7 5 12t12 5Zm0-17Z';

export type RadioButtonOptions = {
    size: number;
    color?: string;
    status?: 'checked' | 'unchecked';
    style?: any;
    onPress?: () => void;
};

const RadioButton = ({ size, status = 'unchecked', color = colors.mainBlack, style, onPress }: RadioButtonOptions) => {
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
    }

    allPaths = _.flatten(paths);

    return (
        <WireframeContainer paths={allPaths} width={size} height={size} scale={scale} style={style} onPress={onPress} />
    );
};

export { RadioButton };
