import _ from 'lodash';
import React, { useState } from 'react';

import { colors, COMPONENT_PADDING, tw } from '../../utils/styling';
import { generator } from '../../utils/Draw';
import { LayoutOptions, WireframeContainer } from '../../utils/Layout';

import type { CardOptions } from './Card';

export type ProgressBarOptions = CardOptions & {
    progress: number;
    color?: string;
    onPress?(): void;
};

const ProgressBar = ({
    width = 'full',
    progress = 0,
    color = colors.mainBlack,
    style,
    onPress
}: ProgressBarOptions) => {
    const paths: any = [];
    const [allPaths, setAllPath] = useState([]);

    const innerOnLayout = ({ layoutWidth }: LayoutOptions) => {
        const strokeColor = tw.color(color);
        const fillColor = tw.color(`${color}/25`);

        const bodyBar = generator.rectangle(0, 0, layoutWidth - COMPONENT_PADDING, 8, {
            stroke: strokeColor,
            fill: fillColor
        });

        paths.push(generator.toPaths(bodyBar));
        if (progress > 0) {
            const progressBar = generator.rectangle(
                0,
                0,
                Math.min(progress, 1) * (layoutWidth - COMPONENT_PADDING),
                8,
                {
                    stroke: strokeColor,
                    fill: strokeColor,
                    fillStyle: 'solid'
                }
            );
            paths.push(generator.toPaths(progressBar));
        }

        setAllPath(_.flatten(paths));
    };

    return (
        <WireframeContainer
            paths={allPaths}
            width={width}
            height={3}
            onLayout={innerOnLayout}
            style={style}
            onPress={onPress}
        />
    );
};

export { ProgressBar };
