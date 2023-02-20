import _ from 'lodash';
import React, { useState } from 'react';

import { generator } from '../../utils/Draw';
import { WireframeContainer, LayoutOptions } from '../../utils/Layout';
import { tw, colors, COMPONENT_PADDING } from '../../utils/styling';

export type TextInputOptions = {
    width: number | string;
    color?: any;
    style?: any;
    onPress?(): void;
};

export type TextAreaOptions = TextInputOptions & {
    height: number | string;
};

export type InputOptions = TextInputOptions &
    TextAreaOptions & {
        isTextArea?: boolean;
    };

const Input = ({ width, height, isTextArea, color = colors.mainBlack, style, onPress }: InputOptions) => {
    const paths: any = [];
    const [allPaths, setAllPath] = useState([]);

    const strokeColor = tw.color(color);

    const onLayout = ({ layoutWidth, layoutHeight }: LayoutOptions) => {
        const rect = generator.rectangle(0, 0, layoutWidth - COMPONENT_PADDING, layoutHeight - COMPONENT_PADDING, {
            stroke: strokeColor
        });

        paths.push(generator.toPaths(rect));

        let promptHeight = layoutHeight - 8;
        let promptBase = 4;

        if (isTextArea) {
            promptHeight = layoutHeight - 32;
            promptBase = layoutHeight - 8;
        }
        const prompt = generator.line(8, promptBase, 8, promptHeight, { stroke: strokeColor, strokeWidth: 3 });
        paths.push(generator.toPaths(prompt));
        const up = generator.line(4, promptBase, 12, promptBase, { stroke: strokeColor, strokeWidth: 2 });
        paths.push(generator.toPaths(up));
        const down = generator.line(4, promptHeight, 12, promptHeight, { stroke: strokeColor, strokeWidth: 3 });
        paths.push(generator.toPaths(down));

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

const TextInput = ({ width, color = colors.mainBlack, style }: TextInputOptions) => {
    return <Input width={width} height={10} color={color} style={style} />;
};

const TextArea = ({ width, height, color = colors.mainBlack, style }: TextAreaOptions) => {
    return <Input isTextArea width={width} height={height} color={color} style={style} />;
};

export { TextInput, TextArea };
