import _ from 'lodash';
import React, { useState } from 'react';
import { View } from 'react-native';

import { generator } from '../../utils/Draw';
import { WireframeContainer, LayoutOptions } from '../../utils/Layout';
import { tw, colors, COMPONENT_PADDING } from '../../utils/styling';

//TODO: add aspect?, etc
//TODO: w-full doesn't work correctly, check height too //still true?
export interface CardOptions {
    width?: number | string;
    height?: number | string;
    fill?: boolean;
    color?: any;
    children?: any;
    style?: any;
    justifyContent?: 'start' | 'end' | 'center' | 'between' | 'around' | 'evenly';
    itemsAlign?: 'start' | 'end' | 'center' | 'baseline' | 'stretch';
    flex?: boolean;
    padding?: number;
    onLayout?(e: LayoutOptions): any;
    onPress?(): void;
}

const Card = ({
    width = 'auto',
    height,
    fill,
    color = colors.mainBlack,
    children,
    itemsAlign,
    justifyContent,
    style,
    flex,
    padding,
    onLayout,
    onPress
}: CardOptions) => {
    const paths: any = [];
    const [allPaths, setAllPath] = useState([]);

    const innerOnLayout = ({ layoutWidth, layoutHeight }: LayoutOptions) => {
        const strokeColor = tw.color(color);
        const fillColor = fill ? tw.color(`${color}/25`) : 'transparent';

        const rect = generator.rectangle(0, 0, layoutWidth - COMPONENT_PADDING, layoutHeight - COMPONENT_PADDING, {
            stroke: strokeColor,
            fill: fillColor
        });

        paths.push(generator.toPaths(rect));

        setAllPath(_.flatten(paths));

        onLayout?.({ layoutWidth, layoutHeight });
    };

    return (
        <WireframeContainer
            paths={allPaths}
            width={width}
            height={height}
            itemsAlign={itemsAlign}
            justifyContent={justifyContent}
            style={style}
            flex={flex}
            onLayout={innerOnLayout}
            onPress={onPress}
        >
            <View style={tw.style(!_.isNil(padding) ? `p-${padding}` : `p-2`)}>{children}</View>
        </WireframeContainer>
    );
};

export { Card };
