import _ from 'lodash';
import React from 'react';

import { generator } from '../../utils/Draw';
import { WireframeContainer } from '../../utils/Layout';
import { colors, tw } from '../../utils/styling';

const loaderSvgPath = 'M12 2v4m0 12v4M4.9 4.9l2.9 2.9m8.4 8.4 2.9 2.9M2 12h4m12 0h4M4.9 19.1l2.9-2.9m8.4-8.4 2.9-2.9';

export type LoaderOptions = {
    size: number;
    color?: string;
    style?: any;
    onPress?: () => void;
};

const Loader = ({ size, color = colors.mainBlack, style, onPress }: LoaderOptions) => {
    const paths = [];
    let allPaths = [];

    const scale = size / 6;

    const strokeColor = tw.color(color);

    const c = generator.path(loaderSvgPath, {
        stroke: strokeColor,
        strokeWidth: 2,
        fill: strokeColor
    });

    paths.push(generator.toPaths(c));

    allPaths = _.flatten(paths);

    return (
        <WireframeContainer paths={allPaths} width={size} height={size} scale={scale} style={style} onPress={onPress} />
    );
};

export { Loader };
