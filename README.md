# react-native-wireframe-ui

A wireframe UI kit for React Native (and web, with Expo).

<img src="https://raw.githubusercontent.com/rborn/react-native-wireframe-ui/main/docs/ios.png" width="100" >

## Installation

```
yarn add @rborn/react-native-wireframe-ui
```

You will also need to install the `WaitingfortheSunrise-Regular.ttf` font. Check the example project for details.

## Usage

Check the example project for details. (Will update with more details soon.)
All components have an `onPress` prop, which is called when the component is pressed. Otherwise, the components are not interactive nor very configurable.

> Note:

    - For now it uses [twrnc](https://github.com/jaredh159/tailwind-react-native-classnames), therefore the colors are tailwind specific or they need to be defined as `[_hexcode_]` if you want custom colors. Eg `#ff0000` is `[#ff0000]`.
    - Sizes are also tailwind specific and multiple of 4dp (read more in [twrnc documentation](https://github.com/jaredh159/tailwind-react-native-classnames#api))

## Primitives

-   Avatar
-   Badge
-   Button
-   Card
-   LineChart
-   VBarChart
-   Checkbox
-   Divider
-   Icon
-   Image
-   TextInput
-   TextArea
-   Loader
-   ProgressBar
-   RadioButton
-   Slider
-   Switch
-   Text
-   VBox
-   HBox

## Dialogs

-   Alert
