import React from 'react';
import {
    View, 
} from 'react-native';


import {Loading, NetworkBroken, Header} from './utils';
import Category from './categories';
import Ads from './ads';
import Products from './product';
import Sites from './sites';
import styles from './styles';

const config = require('./config');

class HomeScreen extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            isLoaded: 0,
            isNetworkBroken: 0,
            currentCategory: '0',
            currentCategoryInfo: "Everything",
            categories: [],
            sites: [],
            product: [],
        }
        this.categoryRef = undefined;
        this.changeCategory = this.changeCategory.bind(this);
        this.refresh = this.refresh.bind(this);
        this.getRef = this.getRef.bind(this);
    }
     
    getRef(ref){
        this.categoryRef = ref||undefined;
    }

    changeCategory(category, info){
        if(this.state.currentCategory !== category){
            this.setState({
                isLoaded: false,
                currentCategory: category,
                currentCategoryInfo: info,
                sites: [],
                products: []
            });
        }
    }

    refresh(){
        this.setState({
            isNetworkBroken: 0,
        })
    }

    fetchReqData(){
        return new Promise((resolve, reject)=>{
            var sites = [], products = [];
            fetch(config.api+'?query=links&category='+this.state.currentCategory,{
                method: 'GET',
                headers: {
                    Accept: 'application/json',
                    'Content-Type': 'application/json'
                },
            })
            .then((response)=>response.json())
            .then((json)=>{
                sites = json.data.sites || [];
                products = json.data.products || [];
                resolve({sites, products});
            })
            .catch((error)=>{
                reject(error);
            });
        })
    }

    fetchAllData(){
        return new Promise((resolve, reject)=>{
            var categories = [], ads = [], sites = [], products = [];
            fetch(config.api+'?query=all&category='+this.state.currentCategory, {
                method: 'GET',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',
                  },
            })
            .then((response)=>{
                // console.log(response);
                return response.json();})
            .then((json)=>{
                categories = json.data.categories||[];
                categories.unshift({
                    id: '0',
                    name: 'math-norm-box',
                    type: 'Everything'
                });
                sites = json.data.sites||[];
                products = json.data.products||[];
                // console.log(categories, sites, products);
            })
            .then(()=>{
                resolve({categories, sites, products});
            })
            .catch((error)=>{
                reject(error);
            });
        })
    }

    componentDidMount(){
        this.fetchAllData()
        .then(({categories, sites, products})=>{
            this.setState({
                isLoaded: true,
                categories: categories,
                sites: sites,
                products: products,
            });
        })
        .catch((err)=>{
            // console.log("error", err);
            this.setState({
                isNetworkBroken: 1,
            })
        });        
    }

    componentDidUpdate(prevProps, prevState){
        if(this.categoryRef !== undefined){
            var reqIndex=0;
            this.state.categories.forEach((item, index)=>{
                if(item.id == this.state.currentCategory){
                    reqIndex = index;
                }
            });
            reqIndex = reqIndex>3?reqIndex:0;
            if(reqIndex > this.state.categories.length-3){
                setTimeout(()=>{
                    this.categoryRef.scrollToEnd();
                }, 100);
            }
            else{
                setTimeout(()=>{
                    this.categoryRef.scrollToOffset({
                        animated: true,
                        offset: reqIndex*61.9,
                    });
                }, 100);
            }
        }
        if(this.state.isLoaded == false && prevState.isLoaded == true
            && prevState.isNetworkBroken == false && this.state.isNetworkBroken == false){
            this.fetchReqData()
            .then(({sites, products})=>{
                this.setState({
                    sites: sites,
                    products: products,
                    isLoaded: true,
                });
            })
            .catch(()=>{
                this.setState({
                    sites: [],
                    products: [],
                    isLoaded: true,
                })
            })
        }
        else if(prevState.isNetworkBroken == true && this.state.isNetworkBroken == false){
            this.fetchAllData()
            .then(({categories, sites, products})=>{
                this.setState({
                    isLoaded: true,
                    categories: categories,
                    sites: sites,
                    products: products,
                });
            })
            .catch((err)=>{
                this.setState({
                    isNetworkBroken: true,
                })
            });
        }  
    }

    render(){
        return (
            <View style={styles.container}>
                <Header text={this.state.currentCategoryInfo}/>
                {this.state.isNetworkBroken?
                    <NetworkBroken reload={this.refresh} />
                    :this.state.isLoaded?
                    <View style={styles.container}>
                        <Ads />
                        <Sites sites={this.state.sites} />
                        <Products products={this.state.products} />
                        <Category 
                            categories={this.state.categories} 
                            currentCategory={this.state.currentCategory} 
                            changeCategory={this.changeCategory} 
                            getRef={this.getRef}
                        />
                    </View>:
                    <Loading />
                    }
            </View>
        )
    }
}

export {
    HomeScreen
}