import _ from 'lodash';
import React, { useState } from 'react';
import { generator } from '../../utils/Draw';

import { WireframeContainer, LayoutOptions } from '../../utils/Layout';
import { tw, colors, COMPONENT_PADDING } from '../../utils/styling';

export type ChartOptions = {
    width: number | string;
    height: number | string;
    fill?: boolean;
    color?: any;
    style?: any;
    onPress?(): void;
};

const VBarChart = ({ width, height, fill, color = colors.mainBlack, onPress }: ChartOptions) => {
    const paths: any = [];
    const [allPaths, setAllPath] = useState([]);

    const strokeColor = tw.color(color);
    const fillColor = fill ? tw.color(`${color}/25`) : 'transparent';

    const onLayout = ({ layoutWidth, layoutHeight }: LayoutOptions) => {
        const step = layoutWidth / 10;

        _.each([1, 3, 5, 7], (index: number) => {
            const bar = generator.rectangle(index * step, layoutHeight * _.random(0.1, 0.4), step, layoutHeight, {
                stroke: strokeColor,
                fill: fillColor
            });
            paths.push(generator.toPaths(bar));
        });

        const xAxis = generator.line(
            0,
            layoutHeight - COMPONENT_PADDING,
            layoutWidth - COMPONENT_PADDING,
            layoutHeight - COMPONENT_PADDING,
            { stroke: strokeColor }
        );
        const yAxis = generator.line(0, 0, 0, layoutHeight - COMPONENT_PADDING, { stroke: strokeColor });

        paths.push(generator.toPaths(xAxis));
        paths.push(generator.toPaths(yAxis));

        setAllPath(_.flatten(paths));
    };

    return <WireframeContainer paths={allPaths} width={width} height={height} onLayout={onLayout} onPress={onPress} />;
};

const LineChart = ({ width, height, color = colors.mainBlack, onPress }: ChartOptions) => {
    const paths: any = [];
    const [allPaths, setAllPath] = useState([]);

    const strokeColor = tw.color(color);
    const downStrokeColor = tw.color(`${color}/25`);

    const onLayout = ({ layoutWidth, layoutHeight }: LayoutOptions) => {
        const hStep = layoutWidth / 4;
        const vStep = layoutHeight / 10;

        //ascending trend
        _.each([0, 4, 3, 7], (value, index, arr) => {
            if (index !== arr.length - 1) {
                const line = generator.line(
                    index * hStep,
                    layoutHeight - value * vStep,
                    (index + 1) * hStep,
                    // @ts-ignore
                    layoutHeight - arr[index + 1] * vStep,
                    {
                        stroke: strokeColor
                    }
                );
                paths.push(generator.toPaths(line));
            }
        });

        //descending trend
        _.each([0, 1, 4, 3], (value, index, arr) => {
            if (index !== arr.length - 1) {
                const line = generator.line(
                    index * hStep,
                    layoutHeight - value * vStep,
                    (index + 1) * hStep,
                    // @ts-ignore
                    layoutHeight - arr[index + 1] * vStep,
                    {
                        stroke: downStrokeColor
                    }
                );
                paths.push(generator.toPaths(line));
            }
        });

        const xAxis = generator.line(
            0,
            layoutHeight - COMPONENT_PADDING,
            layoutWidth - COMPONENT_PADDING,
            layoutHeight - COMPONENT_PADDING,
            { stroke: strokeColor }
        );
        const yAxis = generator.line(0, 0, 0, layoutHeight - COMPONENT_PADDING, { stroke: strokeColor });

        paths.push(generator.toPaths(xAxis));
        paths.push(generator.toPaths(yAxis));

        setAllPath(_.flatten(paths));
    };

    return <WireframeContainer paths={allPaths} width={width} height={height} onLayout={onLayout} onPress={onPress} />;
};

export { VBarChart, LineChart };
