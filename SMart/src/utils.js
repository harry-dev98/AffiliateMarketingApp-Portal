import React from 'react';
import {
    Text,
    View,
    Image,
    ActivityIndicator,
    TouchableOpacity,
} from 'react-native'
import Icon from 'react-native-vector-icons/MaterialCommunityIcons'

import styles from './styles';


function Header({text}){
    return (
        <View style={styles.header}>
            <Text style={[{ 
                alignSelf: 'center'
            }, styles.vBoldText]}>{text}</Text>
        </View>
    )
}

function EmptyList(){
    return (
        <View style={[{
            alignItems: 'center',
            backgroundColor: '#FFFFFF',
        }]}>
            <Image
                source= {{
                    uri: "https://i.pinimg.com/originals/a8/93/67/a89367cc7d4d95be50920cadbfeb8e63.jpg"
                }}
                style={{ 
                    height:50,
                    resizeMode: 'contain', 
                    width: 50, 
                    padding: 10
                }}
            />
            <Text style={styles.text}>
                Oops.. No Data to Display. 
            </Text>
        </View>
    );
}

function Loading(){
    return (
        <View style={styles.loading}>
            <ActivityIndicator color={'#228B22'} size='large'/>
            <Text style={styles.text}>Please Wait.. Loading Data</Text>
        </View>
    );
}

function NetworkBroken({reload}){
    return (
        <View style={styles.loading}>
            <Text style={styles.text}>You Have Network Issue :( :'(</Text>
            <Text style={styles.text}>Click Below To Reload</Text>
            <TouchableOpacity onPress={reload}>
                <Icon name='folder-sync' size={48}/>
            </TouchableOpacity> 
        </View>
    )
}

export {
    Header,
    NetworkBroken,
    Loading,
    EmptyList,
}