import _ from 'lodash';
import React from 'react';

import { colors, COMPONENT_PADDING, tw, TW_REM_025 } from '../../utils/styling';
import { generator } from '../../utils/Draw';
import { WireframeContainer } from '../../utils/Layout';

export type AvatarOptions = {
    size: number;
    square?: boolean;
    round?: boolean;
    color?: string;
    style?: any;
    onPress?: () => void;
};

const Avatar = ({ size, square, round, color = colors.mainBlack, style, onPress }: AvatarOptions) => {
    const paths = [];
    let allPaths = [];

    const realSize = size * TW_REM_025;

    const scale = (realSize - COMPONENT_PADDING) / 100;
    const strokeColor = tw.color(color);
    const fillColor = tw.color(`${color}/25`);

    const head = generator.circle(50, 50 - 20, 30, {
        fill: fillColor,
        stroke: strokeColor
    });

    paths.push(generator.toPaths(head));

    const body = generator.ellipse(50, 50 + 20, 70, 50, {
        fill: fillColor,
        stroke: strokeColor
    });
    paths.push(generator.toPaths(body));

    if (round) {
        const roundWrapper = generator.circle(50, 50, 90, {
            stroke: strokeColor
        });
        paths.push(generator.toPaths(roundWrapper));
    } else if (square) {
        const squareWrapper = generator.rectangle(0, 0, 96, 96, { stroke: strokeColor });
        paths.push(generator.toPaths(squareWrapper));
    }

    allPaths = _.flatten(paths);

    return (
        <WireframeContainer paths={allPaths} width={size} height={size} scale={scale} style={style} onPress={onPress} />
    );
};

export { Avatar };
