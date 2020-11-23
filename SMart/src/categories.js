import React from 'react';
import {
    View,
    VirtualizedList,
} from 'react-native';
import styles from './styles';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons'

const config = require('./config');

export default function Category({
    categories, 
    currentCategory, 
    changeCategory,
    getRef
}){
    return (
        <View style={[styles.category, styles.rowContainer, {flex: 1}]}>
            <VirtualizedList 
                ref={(ref)=>{getRef(ref)}}
                horizontal={true} 
                scrollEnabled={true}
                showsHorizontalScrollIndicator={false}
                data={categories}
                getItem = {(data, index)=>data[index]}
                getItemCount = {(data)=>data.length}
                keyExtractor={(item)=>item.id}
                renderItem={({item})=>(
                    <Icon
                        style={{
                            paddingLeft: 15, 
                            paddingRight: 15, 
                            paddingTop:0,
                            color: currentCategory===item.id?"green":"black"
                        }} 
                            name={item.name} 
                            size={28}  
                            onPress={()=>changeCategory(item.id, item.type)} 
                    />
                )}>
            </VirtualizedList>
        </View>
    );
}
