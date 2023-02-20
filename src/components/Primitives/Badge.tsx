import _ from 'lodash';
import React from 'react';
import { Text } from 'react-native';

import { generator } from '../../utils/Draw';
import { WireframeContainer } from '../../utils/Layout';
import { colors, COMPONENT_PADDING, tw, TW_REM_025 } from '../../utils/styling';

//TODO: add the onlayout size ? is it needed?

export type BadgeOptions = {
    size: number;
    color?: string;
    textColor?: string;
    style?: any;
    count?: number;
    fill?: boolean;
    onPress?: () => void;
};

const Badge = ({
    size,
    fill = true,
    color = colors.mainBlack,
    textColor = colors.mainBlack,
    style,
    count,
    onPress
}: BadgeOptions) => {
    const paths = [];
    let allPaths = [];

    const realSize = size * TW_REM_025;
    const innerSize = realSize - COMPONENT_PADDING;

    const strokeColor = tw.color(color);

    const textScale = size * 0.6;
    const textStyle = tw.style(`text-${textScale}  text-${textColor} text-center z-1`, {
        fontFamily: 'WaitingfortheSunrise'
    });

    const badge = generator.circle(innerSize / 2, innerSize / 2, innerSize, {
        fill: fill ? strokeColor : 'transparent',
        stroke: strokeColor,
        fillStyle: 'solid'
    });

    paths.push(generator.toPaths(badge));

    allPaths = _.flatten(paths);

    return (
        <WireframeContainer paths={allPaths} width={size} height={size} style={style} onPress={onPress}>
            {!_.isNil(count) && <Text style={textStyle}>{count}</Text>}
        </WireframeContainer>
    );
};

export { Badge };
