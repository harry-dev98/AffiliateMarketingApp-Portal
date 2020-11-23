import React from 'react';
import { Text, 
    ScrollView, 
    Image, 
    View,  
    TouchableOpacity,
    Linking,
    Platform,
} from 'react-native';
import styles from './styles';
import {EmptyList, } from './utils';

const config = require('./config');
const os = Platform.OS;

export default function Sites({sites}){
    return (
        <View style={[styles.card, styles.container, {flex: 3}]}>
            {sites.length>0?
            <ScrollView
                horizontal={true}
                showsHorizontalScrollIndicator={false}>
                {sites.map((item) => (
                    <TouchableOpacity 
                        key={item.id} 
                        style={{
                            backgroundColor: '#FFFFFF', 
                            borderRadius: 20,
                            marginLeft: 5,
                            height: '100%',
                            width: 125,
                        }}
                        onPress={()=>{
                        if(os === "web"){
                            var a = document.createElement('a');
                            a.href = item.url;
                            a.target = "_blank";
                            a.click();
                            a.remove();
                        }
                        else{
                            Linking.openURL(item.url);
                        }
                    }} key={item.id}>
                    <View style={[{
                            alignItems:"center",
                        },
                            styles.container,
                        ]}>
                        <Text style={{color: '#228B22', fontSize: 14, marginTop:'5%'}}>{item.name}</Text>
                        <Image style={{ 
                            resizeMode: 'contain', 
                            width: 100, 
                            height:  '80%',
                        }}
                        source={{
                            uri: item.imageUrl,
                        }}
                        />
                    </View>
                </TouchableOpacity>
                ))}</ScrollView>:<EmptyList/>
            }
        </View>
    );
}

