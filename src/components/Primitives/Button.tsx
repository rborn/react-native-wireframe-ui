import _ from 'lodash';
import React, { useState } from 'react';
import { Text, View } from 'react-native';

import { colors, COMPONENT_PADDING, tw, TW_REM_025 } from '../../utils/styling';
import { generator } from '../../utils/Draw';
import { LayoutOptions, WireframeContainer } from '../../utils/Layout';

import { Icon } from './Icon';
import type { CardOptions } from './Card';

export type ButtonOptions = CardOptions & {
    icon?: boolean;
    text?: boolean;
    title?: string;
    square?: boolean;
    round?: boolean;
    onPress?(): void;
};

const Button = ({
    width,
    height,
    fill,
    color = colors.mainBlack,
    icon,
    text,
    title,
    style,
    onPress
}: ButtonOptions) => {
    const paths: any = [];

    const [allPaths, setAllPath] = useState([]);
    const [textSize, setTextSize] = useState(0);
    const strokeColor = tw.color(color);
    const fillColor = fill ? tw.color(`${color}/25`) : 'transparent';

    const containerStyle = tw.style(style, 'self-start');
    const textStyle = tw.style(`text-${textSize} text-center text-${color}`, {
        fontFamily: 'WaitingfortheSunrise'
    });

    const onLayout = ({ layoutWidth, layoutHeight }: LayoutOptions) => {
        if (text) {
            const underline = generator.line(
                COMPONENT_PADDING,
                layoutHeight - 2 * COMPONENT_PADDING,
                layoutWidth,
                layoutHeight - 2 * COMPONENT_PADDING,
                { stroke: strokeColor }
            );
            paths.push(generator.toPaths(underline));
        } else {
            const rect = generator.rectangle(0, 0, layoutWidth - COMPONENT_PADDING, layoutHeight - COMPONENT_PADDING, {
                stroke: strokeColor,
                fill: fillColor
            });

            paths.push(generator.toPaths(rect));
        }

        setAllPath(_.flatten(paths));
        setTextSize((layoutHeight * 0.6) / TW_REM_025);
    };

    return (
        <WireframeContainer
            paths={allPaths}
            width={width}
            height={height}
            style={containerStyle}
            itemsAlign={'center'}
            justifyContent={'center'}
            onLayout={onLayout}
            onPress={onPress}
        >
            <View style={tw`flex-row mx-2 items-center justify-center`}>
                {icon && <Icon color={color} size={textSize} style={tw`mr-${title && icon ? 2 : 0}`} />}
                {title && <Text style={textStyle}>{title}</Text>}
            </View>
        </WireframeContainer>
    );
};

export { Button };
