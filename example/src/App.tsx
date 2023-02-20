import React from 'react';

import { StyleSheet, ScrollView } from 'react-native';
import {
    Button,
    CheckBox,
    Divider,
    HBox,
    Icon,
    Loader,
    ProgressBar,
    RadioButton,
    Slider,
    Switch,
    Avatar,
    Badge,
    VBox,
    Text,
    TextInput,
    TextArea,
    LineChart,
    VBarChart,
    Card,
    Alert,
    Image,
    tw,
    colors
} from 'react-native-wireframe-ui';

export default function App() {
    return (
        <ScrollView style={styles.container} contentContainerStyle={styles.contentContainerStyle}>
            <ProgressBar progress={0.7} />
            <Slider progress={0.3} color={'red-500'} />

            <HBox>
                <Loader color="red-500" size={10} />
                <Loader color="blue-500" size={20} />
                <Loader color="green-200" size={30} />
            </HBox>
            <HBox>
                <CheckBox color="red-500" size={6} />
                <CheckBox status={'indeterminate'} color="blue-500" size={8} />
                <CheckBox status={'checked'} color="green-500" size={10} />
            </HBox>
            <HBox>
                <RadioButton color="red-500" size={8} />
                <RadioButton status={'checked'} color="green-500" size={10} />
            </HBox>
            <HBox>
                <Switch color="red-500" size={10} />
                <Switch status={'on'} color="green-500" size={16} />
            </HBox>
            <Divider color={'slate-500'} />
            <Divider type={'vertical'} height={20} color={'slate-500'} />
            <HBox>
                <Avatar size={10} round color="black" />
                <Avatar size={15} color="violet-500" />
                <Avatar size={20} square color="lime-500" />
            </HBox>
            <HBox>
                <Icon size={4} />
                <Icon size={6} color={'pink-500'} />
            </HBox>

            <HBox>
                <Badge size={4} color={'red-300'} />
                <Badge size={6} color={'green-500'} />
                <Badge count={2} size={8} color={'blue-500'} />
                <Badge fill={false} count={10} size={10} color={'green-300'} textColor={'red-800'} />
            </HBox>

            <VBox>
                <Button width={20} height={5} title={'button'} />
                <Button width={'full'} height={10} title={'full width'} />
                <Button height={10} title={'no width'} />
                <Button width={'auto'} height={10} title={'auto width'} />
                <Button width={40} height={10} title={'button'} color={'red-600'} />
                <Button text width={70} height={10} title={'text button width'} color={'slate-600'} />
                <Button text height={10} title={'text button'} color={'slate-600'} />
                <Button fill width={40} height={10} title={'filled button'} color={'pink-600'} />
                <Button icon fill width={40} height={10} title={'with icon'} color={'slate-600'} />
                <Button icon fill height={10} title={'1 with icon no width'} color={'slate-600'} />
                <Button icon fill width={'full'} height={10} title={'with icon full'} color={'slate-600'} />
                <Button icon width={10} height={10} color={'slate-600'} />
            </VBox>

            <VBox>
                <Text type={'h1'} color={colors.mainBlack} />
                <Text type={'h2'} width={80} color={colors.mainBlack} />
                <Text type={'h3'} width={100} color={colors.mainBlack} />
                <Text type={'h4'} width={100} color={colors.mainBlack} />
                <Text type={'h5'} width={100} color={colors.mainBlack} />
                <Text type={'h6'} width={80} color={colors.mainBlack} />
                <Text type={'p'} width={80} color={colors.mainBlack} />

                <Text width={75} height={20} color={colors.mainGrey} />
                <Text height={20} color={'pink-300'} />
                <Text type={'h4'} width={'2/5'} color={'lime-300'} />
                <Text randomLength type={'h5'} width={60} height={30} color={'blue-300'} />
            </VBox>
            <VBox>
                <TextInput width={50} color={'slate-600'} />
                <TextInput width={'2/3'} color={'slate-600'} />
                <TextArea width={70} height={40} color={'slate-600'} />
                <TextArea width={'full'} height={40} color={'slate-600'} />
            </VBox>
            <VBox>
                <Image width={75} height={30} color={'lime-600'} />
                <Image width={35} height={30} color={'lime-600'} fill={'lime-300'} />
            </VBox>
            <VBox>
                <VBarChart fill width={40} height={40} color={'red-300'} />
                <VBarChart width={'1/5'} height={40} color={'green-600'} />
                <LineChart width={60} height={40} />
                <LineChart width={'3/5'} height={40} />
            </VBox>
            <HBox>
                <Card width={20} height={40} color={'blue-600'} />
                <Card width={24} height={14} />
                <Card height={40} color={'blue-600'} style={tw`grow`} />
            </HBox>
            <Alert onOk={() => {}} onCancel={() => {}} />
        </ScrollView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff'
    },
    contentContainerStyle: {
        padding: 16,
        gap: 16,
        paddingTop: 48,
        paddingBottom: 32
    }
});
