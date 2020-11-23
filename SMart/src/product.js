import React from 'react';
import { Text, 
    Image, 
    View,
    TouchableOpacity,
    Linking,
    Platform,
    FlatList,
} from 'react-native';
import {EmptyList, } from './utils';
import styles from './styles';

const config = require('./config');
const os = Platform.OS;


function HeaderText({text}){
    return (
        <Text style={[{
            alignSelf: 'center',
            }, styles.boldText
        ]}>{text}</Text>
    );
}

export default function Products({products}){
    return (
        <View style={[styles.card, styles.container, {flex:8}]}>
            <FlatList
                scrollEnabled = {true}
                showsVerticalScrollIndicator = {false}
                data = {products}
                ListHeaderComponent = {()=><HeaderText text="Buy Products Here"/>}
                ListEmptyComponent = {EmptyList}
                renderItem = {({ item }) => (
                <TouchableOpacity 
                    style={{ 
                        backgroundColor: '#FFFFFF', 
                        flex: 1, 
                        flexDirection: 'column', 
                        margin: 2.5,
                        borderRadius: 20,
                     }}
                    onPress={()=>{
                        if(os === "web"){
                            var a = document.createElement('a');
                            a.href = item.hostUrl;
                            a.target = "_blank";
                            a.click();
                            a.remove();
                        }
                        else{
                            Linking.openURL(item.hostUrl);
                        }
                    }}>
                <View style={[{
                    alignItems: 'center',
                }, styles.container]}>
                    <Text style={{ color: '#228B22', fontWeight:'bold'}}>{item.name}</Text>
                    <Text style={{ color: '#228B22'}}>Price: {item.price}</Text>
                    <Image style={{
                        height: 100, 
                        width: 150, 
                        margin: 5, 
                        resizeMode: 'contain',
                        }} source={{ uri: item.imageUrl }} />
                </View>
            </TouchableOpacity>
            )}
            numColumns={2}
            keyExtractor={(item) => item.id}
            />
        </View>
    );
}