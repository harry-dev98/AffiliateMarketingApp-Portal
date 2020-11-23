import React from 'react';
import {
    ScrollView, 
    Image, 
    View, 
    TouchableOpacity,
    Linking,
    Platform,
    Dimensions
} from 'react-native';
import styles from './styles';
import {EmptyList, } from './utils';
const config = require('./config');
const {width: screenWidth, height: screenHeight} = Dimensions.get('window');
const os = Platform.OS;



export default class AdCollage extends React.Component{
    constructor(props){
        super(props);
        this.ref = undefined;
        this.scrollInterval = undefined;
        this.state = {
            ads: []
        }
    }

    autoScroll(){
        var scrollX = 0;
        if(this.scrollInterval === undefined){
            this.scrollInterval = setInterval(()=>{
                scrollX += screenWidth;
                scrollX %= screenWidth*this.state.ads.length;
                this.ref.scrollTo({
                   x: scrollX, 
                   animation: true,  
                })
            }, 10000);
        }
    }

    clearScrollInterval(){
        if(this.autoScrollInterval !== undefined){
            clearInterval(this.autoScrollInterval);
            this.autoScrollInterval = undefined;
        }
    }

    componentDidUpdate(){
        if(this.state.ads.length > 0){
            this.autoScroll();
        }
    }

    componentWillUnmount(){
        if(this.scrollInterval !== undefined){
            clearInterval(this.scrollInterval);
        }
        
    }
    componentDidMount(){
        fetch(config.api + '?query=ads', {
            method: 'GET',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
              },
        })
        .then((response)=>response.json())
        .then((json)=>{
            var _ads = json.data.ads || [];
            this.setState({
                ads: _ads
            });
        })
        .catch((err)=>{
        })
    }

    render(){

        return (
            <View style={[styles.card, styles.container, {flex: 3}]}>
                {this.state.ads.length>0?
                <ScrollView
                    horizontal={true}
                    scrollEnabled={true}
                    pagingEnabled={true}
                    ref={(ref)=>{this.ref=ref;}}
                    showsHorizontalScrollIndicator={false}
                    alwaysBounceHorizontal={true}>
                    {this.state.ads.map((item) => (
                        <TouchableOpacity 
                            key={item.id} 
                            onPress={()=>{
                                if(os === "web"){
                                    var a = document.createElement('a');
                                    a.href = item.url||"";
                                    a.target = "_blank";
                                    a.click();
                                    a.remove();
                                }
                                else{
                                    Linking.openURL(item.url||"");
                                }
                            }}
                        >
                        <View style={[{
                                alignItems:"center",
                            },
                                styles.container,
                            ]}>
                            <Image style={{ 
                                resizeMode: 'contain', 
                                width: screenWidth, 
                                height: '100%',
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
}
