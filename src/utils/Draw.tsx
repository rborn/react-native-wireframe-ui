import React from 'react';
import rough from 'roughjs/bin/rough';
import Svg, { G, Path } from 'react-native-svg';
import { View } from 'react-native';

import { COMPONENT_PADDING, tw } from './styling';

const simpleDomMock = {
    ownerDocument: {
        createElementNS: (ns: any, tagName: string) => {
            const children: any = [];
            const attrs: any = {};
            return {
                tagName,
                attrs,
                setAttribute: (key: string, value: any) => (attrs[key] = value),
                appendChild: (node: any) => children.push(node),
                children
            };
        }
    }
};

const roughSvg = rough.svg(simpleDomMock);
const generator = roughSvg.generator;

export type DrawOptions = {
    width: number;
    height: number;
    paths: any[];
    scale?: number;
    style?: any;
};

const Draw = (props: DrawOptions) => {
    const { width, height, paths = [], scale = 1, style = {} } = props;
    const containerStyle = tw.style(style, 'absolute top-0 left-0 bottom-0 right-0 z-0');

    return width && height ? (
        <View style={containerStyle}>
            <Svg height={'100%'} width={'100%'} viewBox={`0 0 ${width} ${height}`}>
                <G x={COMPONENT_PADDING / 2} y={COMPONENT_PADDING / 2} scale={scale}>
                    {paths?.map((p, idx) => {
                        return <Path key={`${idx}`} {...p} />;
                    })}
                </G>
            </Svg>
        </View>
    ) : null;
};

export { Draw, generator };
