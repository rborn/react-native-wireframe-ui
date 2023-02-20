import _ from 'lodash';
import React from 'react';

import { generator } from '../../utils/Draw';
import { WireframeContainer } from '../../utils/Layout';
import { tw, colors, TW_REM_025, COMPONENT_PADDING } from '../../utils/styling';

export type IconOptions = {
    size: number;
    color?: string;
    style?: any;
    onPress?: () => void;
};

const Icon = ({ size, color = colors.mainBlack, style, onPress }: IconOptions) => {
    const paths = [];
    let allPaths = [];

    const realWidth = size * TW_REM_025;
    const realHeight = size * TW_REM_025;

    const strokeColor = tw.color(color);

    const rect = generator.rectangle(0, 0, realWidth - COMPONENT_PADDING, realHeight - COMPONENT_PADDING, {
        stroke: strokeColor,
        fill: strokeColor,
        fillStyle: 'cross-hatch',
        hachureGap: 2
    });

    paths.push(generator.toPaths(rect));

    allPaths = _.flatten(paths);

    return <WireframeContainer paths={allPaths} width={size} height={size} style={style} onPress={onPress} />;
};

export { Icon };
