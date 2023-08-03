import _ from 'lodash';
import React, { useState } from 'react';

import { colors, COMPONENT_PADDING, tw } from '../../utils/styling';
import { generator } from '../../utils/Draw';
import { LayoutOptions, WireframeContainer } from '../../utils/Layout';

import type { CardOptions } from './Card';

export type SliderOptions = CardOptions & {
    progress: number;
    color?: string;
    onPress?(): void;
};

const Slider = ({ width = 'full', progress = 0, color = colors.mainBlack, style, onPress }: SliderOptions) => {
    const paths: any = [];
    const [allPaths, setAllPath] = useState([]);

    const innerOnLayout = ({ layoutWidth }: LayoutOptions) => {
        const strokeColor = tw.color(color);
        const fillColor = tw.color(`${color}/25`);

        const position = Math.min(Math.max(0, progress), 1) * (layoutWidth - COMPONENT_PADDING);

        const knob = generator.circle(position, 8, 16, {
            fill: strokeColor,
            stroke: strokeColor,
            fillStyle: 'solid'
        });

        const bodyBar = generator.rectangle(0, 8, layoutWidth - COMPONENT_PADDING, 4, {
            stroke: strokeColor,
            fill: fillColor
        });

        paths.push(generator.toPaths(bodyBar));
        if (progress > 0) {
            const progressBar = generator.rectangle(0, 8, position, 4, {
                stroke: strokeColor,
                fill: strokeColor,
                fillStyle: 'solid'
            });
            paths.push(generator.toPaths(progressBar));
        }

        paths.push(generator.toPaths(knob));

        setAllPath(_.flatten(paths));
    };

    return (
        <WireframeContainer
            paths={allPaths}
            width={width}
            height={8}
            onLayout={innerOnLayout}
            style={style}
            onPress={onPress}
        />
    );
};

export { Slider };
