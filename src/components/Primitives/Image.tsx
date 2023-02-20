import _ from 'lodash';
import React, { useState } from 'react';

import { generator } from '../../utils/Draw';
import { WireframeContainer, SizeOptions, LayoutOptions } from '../../utils/Layout';
import { tw, colors, COMPONENT_PADDING } from '../../utils/styling';

export type ImageOptions = SizeOptions & {
    fill?: string;
    color?: string;
    style?: any;
    onPress?(): void;
};

const Image = ({ width, height, fill, color = colors.mainBlack, style, onPress }: ImageOptions) => {
    const paths: any = [];
    const [allPaths, setAllPath] = useState([]);

    const strokeColor = tw.color(color);
    const fillColor = fill ? tw.color(`${color}/25`) : 'transparent';

    const onLayout = ({ layoutWidth, layoutHeight }: LayoutOptions) => {
        const rect = generator.rectangle(0, 0, layoutWidth - COMPONENT_PADDING, layoutHeight - COMPONENT_PADDING, {
            stroke: strokeColor,
            fill: fillColor
        });

        const rline = generator.line(0, 0, layoutWidth, layoutHeight, { stroke: strokeColor });
        const lline = generator.line(0, layoutHeight, layoutWidth, 0, { stroke: strokeColor });

        paths.push(generator.toPaths(rect));
        paths.push(generator.toPaths(rline));
        paths.push(generator.toPaths(lline));

        setAllPath(_.flatten(paths));
    };

    return (
        <WireframeContainer
            paths={allPaths}
            width={width}
            height={height}
            style={style}
            onLayout={onLayout}
            onPress={onPress}
        />
    );
};

export { Image };
