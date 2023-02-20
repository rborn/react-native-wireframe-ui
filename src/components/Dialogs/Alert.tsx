import React from 'react';

import { Button } from '../../components/Primitives/Button';
import { Card } from '../../components/Primitives/Card';
import { Text } from '../../components/Primitives/Text';
import { VBox, HBox } from '../../utils/Layout';
import { colors, tw } from '../../utils/styling';

export type AlertOptions = {
    onOk?(): void;
    onCancel?(): void;
};

const Alert = ({ onOk, onCancel }: AlertOptions) => {
    return (
        <Card itemsAlign={'center'} justifyContent={'center'} padding={4} style={tw`self-center`}>
            <VBox itemsAlign={'center'}>
                <Text width={40} type={'h2'} />
                <Text width={70} height={10} color={colors.mainGrey} />
                <HBox>
                    <Button fill width={30} height={10} title={'Cancel'} color={'pink-600'} onPress={onCancel} />
                    <Button fill width={30} height={10} title={'Ok'} onPress={onOk} />
                </HBox>
            </VBox>
        </Card>
    );
};

export { Alert };
