import { cloneElement, useState } from 'react';
import { Pressable, View } from 'react-native';

import _ from 'lodash';

import { Draw } from './Draw';
import { tw } from './styling';

export type LayoutOptions = {
    layoutWidth: number;
    layoutHeight: number;
};

export type SizeOptions = {
    width?: number | string;
    height?: number | string;
};

export type BoxProps = {
    children?: any;
    style?: any;
    justifyContent?: 'start' | 'end' | 'center' | 'between' | 'around' | 'evenly' | null;
    itemsAlign?: 'start' | 'end' | 'center' | 'baseline' | 'stretch' | null;
};

export type WireframeContainerOptions = SizeOptions &
    BoxProps & {
        fill?: boolean; //is this needed?
        flex?: boolean;
        paths?: any;
        scale?: number;
        onLayout?(e: any): any;
        onPress?(): void;
    };

const WireframeContainer = (props: WireframeContainerOptions) => {
    const [wh, setWh] = useState({ width: 0, height: 0 });

    const { width, height, children, style, itemsAlign, justifyContent, paths, flex, scale, onPress } = props;

    const containerStyle = tw.style(
        'overflow-hidden',
        itemsAlign ? `items-${itemsAlign}` : null,
        justifyContent ? `justify-${justifyContent}` : null,
        flex ? 'flex-1' : null,
        style,
        !_.isNil(width) ? `w-${width}` : null,
        !_.isNil(height) ? `h-${height}` : null
    );

    const onLayout = (e: any) => {
        const newLayout = e.nativeEvent.layout;

        setWh({
            width: newLayout.width,
            height: newLayout.height
        });

        props.onLayout?.({ layoutWidth: newLayout.width, layoutHeight: newLayout.height });
    };

    return (
        <Pressable style={containerStyle} onLayout={onLayout} onPress={onPress}>
            <Draw paths={paths} width={wh.width} height={wh.height} scale={scale} />
            {children}
        </Pressable>
    );
};

const VBox = (props: BoxProps) => {
    const { children, itemsAlign, justifyContent, style } = props;
    return (
        <View
            style={tw.style(
                style,
                'flex-col',
                itemsAlign ? `items-${itemsAlign}` : null,
                justifyContent ? `justify-${justifyContent}` : null
            )}
        >
            {children.map((child: any, index: number) => {
                return cloneElement(child, {
                    key: `${index}`,
                    style: tw.style(child.props.style, index > 0 ? 'mt-2' : null)
                });
            })}
        </View>
    );
};

const HBox = (props: BoxProps) => {
    const { children, itemsAlign, justifyContent, style } = props;

    return (
        <View
            style={tw.style(
                style,
                'flex-row',
                itemsAlign ? `items-${itemsAlign}` : null,
                justifyContent ? `justify-${justifyContent}` : null
            )}
        >
            {children.map((child: any, index: number) => {
                return cloneElement(child, {
                    key: `${index}`,
                    style: tw.style(child.props.style, index > 0 ? 'ml-2' : null)
                });
            })}
        </View>
    );
};

export { WireframeContainer, VBox, HBox };
