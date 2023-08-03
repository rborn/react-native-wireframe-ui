import _ from 'lodash';
import React, { useState } from 'react';

import { colors, COMPONENT_PADDING, tw } from '../../utils/styling';
import { generator } from '../../utils/Draw';
import { LayoutOptions, WireframeContainer } from '../../utils/Layout';

import type { CardOptions } from './Card';

//TODO: Divider should fill the parrent if no width/height is provided, doesn't work with HBox/VBox

export type DividerOptions = CardOptions & {
    type?: 'horizontal' | 'vertical';
    color?: string;
};

const Divider = ({
    width = 'full',
    height = 'full',
    type = 'horizontal',
    color = colors.mainBlack,
    style
}: DividerOptions) => {
    const paths: any = [];
    const [allPaths, setAllPath] = useState([]);

    const innerOnLayout = ({ layoutWidth, layoutHeight }: LayoutOptions) => {
        const strokeColor = tw.color(color);

        if (type === 'horizontal') {
            const line = generator.line(0, 0, layoutWidth - COMPONENT_PADDING, 0, {
                stroke: strokeColor,
                strokeWidth: 2
            });
            paths.push(generator.toPaths(line));
        }

        if (type === 'vertical') {
            const line = generator.line(0, 0, 0, layoutHeight - COMPONENT_PADDING, {
                stroke: strokeColor,
                strokeWidth: 2
            });
            paths.push(generator.toPaths(line));
        }

        setAllPath(_.flatten(paths));
    };

    return (
        <WireframeContainer
            paths={allPaths}
            width={type === 'horizontal' ? width : 2}
            height={type === 'horizontal' ? 2 : height}
            onLayout={innerOnLayout}
            style={style}
        />
    );
};

export { Divider };
