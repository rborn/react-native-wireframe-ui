import _ from 'lodash';
import React from 'react';

import { generator } from '../../utils/Draw';
import { WireframeContainer } from '../../utils/Layout';
import { tw, colors, TW_REM_025, COMPONENT_PADDING } from '../../utils/styling';

const onPath =
    'M14 36q-5 0-8.5-3.5T2 24q0-5 3.5-8.5T14 12h20q5 0 8.5 3.5T46 24q0 5-3.5 8.5T34 36Zm0-3h20q3.8 0 6.4-2.6T43 24q0-3.8-2.6-6.4T34 15H14q-3.8 0-6.4 2.6T5 24q0 3.8 2.6 6.4T14 33Zm20-4q2.1 0 3.6-1.4t1.5-3.6q0-2.1-1.5-3.6T34 19q-2 0-3.5 1.4T29 24q0 2.1 1.5 3.6T34 29Zm-10-5Z';
const offPath =
    'M14 36q-5 0-8.5-3.5T2 24q0-5 3.5-8.5T14 12h20q5 0 8.5 3.5T46 24q0 5-3.5 8.5T34 36Zm0-3h20q3.8 0 6.4-2.6T43 24q0-3.8-2.6-6.4T34 15H14q-3.8 0-6.4 2.6T5 24q0 3.8 2.6 6.4T14 33Zm0-4q2 0 3.5-1.4T19 24q0-2.1-1.5-3.6T14 19q-2 0-3.5 1.4T8.9 24q0 2.1 1.5 3.6t3.5 1.4Zm10-5Z';

export type SwitchOptions = {
    size: number;
    color?: string;
    status?: 'on' | 'off';
    style?: any;
    onPress?: () => void;
};

const Switch = ({ size, status = 'off', color = colors.mainBlack, style, onPress }: SwitchOptions) => {
    const paths = [];
    let allPaths = [];

    const scale = (size * TW_REM_025 - COMPONENT_PADDING) / 48;

    const strokeColor = tw.color(color);
    let c: any;

    const pathOptions = {
        stroke: strokeColor,
        strokeWidth: 1,
        fill: strokeColor,
        fillStyle: 'solid'
    };

    switch (status) {
        case 'on':
            c = generator.path(onPath, pathOptions);
            paths.push(generator.toPaths(c));
            break;
        case 'off':
            c = generator.path(offPath, pathOptions);
            paths.push(generator.toPaths(c));
            break;
    }

    allPaths = _.flatten(paths);

    return (
        <WireframeContainer paths={allPaths} width={size} height={size} scale={scale} style={style} onPress={onPress} />
    );
};

export { Switch };
