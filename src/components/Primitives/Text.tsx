import _ from 'lodash';
import React, { useState } from 'react';

import { colors, tw, TW_REM, TW_REM_025 } from '../../utils/styling';
import { generator } from '../../utils/Draw';
import { LayoutOptions, SizeOptions, WireframeContainer } from '../../utils/Layout';

const sizes = {
    h1: 2,
    h2: 1.5,
    h3: 1.17,
    h4: 1,
    h5: 0.83,
    h6: 0.67,
    p: 0.5
};

export type TextOptions = SizeOptions & {
    randomLength?: boolean;
    type?: 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6' | 'p';
    color?: string;
    style?: any;
    onPress?(): void;
};

const Text = ({
    width = 'full',
    height,
    randomLength,
    color = colors.mainBlack,
    style,
    type = 'p',
    onPress
}: TextOptions) => {
    const paths: any = [];
    const [allPaths, setAllPath] = useState([]);

    const strokeColor = tw.color(color);
    const strokeWidth = sizes[type] ? sizes[type] * TW_REM : sizes.p * TW_REM;

    const lineHeight = 2 * strokeWidth;
    !height && (height = (1.4 * strokeWidth) / TW_REM_025);

    const onLayout = ({ layoutWidth, layoutHeight }: LayoutOptions) => {
        const numberOfLines = _.max([1, Math.ceil(layoutHeight / lineHeight)]) || 1;

        for (let index = 0; index < numberOfLines; index++) {
            const finalWidth = randomLength ? layoutWidth * _.random(0.7, 1) : layoutWidth;
            const text = generator.line(
                0,
                index * lineHeight + strokeWidth / 2,
                finalWidth,
                index * lineHeight + strokeWidth / 2,
                {
                    stroke: strokeColor,
                    strokeWidth,
                    roughness: 1.4
                }
            );

            paths.push(generator.toPaths(text));
        }

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

export { Text };
