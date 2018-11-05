import React, { Component } from 'react';
import {View, Text, SectionList, TextInput, Button} from 'react-native';

class SearchBar extends Component {
    constructor(props) {
        super(props);
    }

    handleSearchTextInputChange = (e) => {
        this.props.onSearchTextInput(e);
    }

    handleInStockInputChange = (e) => {
        this.props.onInStockInput(e);
    }

    render () {
        return (
            <View style={{marginLeft: 8}}>
                <TextInput
                    placeholder="Searching..."
                    style={{height: 30, width: 200, borderColor: 'gray', borderWidth: 1}}
                    value={this.props.searchText}
                    onChangeText={this.handleSearchTextInputChange}
                />
                <View style={{flexDirection: 'row'}}>
                    <Button title={this.props.isStockOnly ? 'c': 'u'}
                            onPress={this.handleInStockInputChange}/>
                    <Text>Only show products in stock </Text>
                </View>
            </View>
        );
    }
}

class ProductRow extends Component {
    render () {
        const color = this.props.product.stocked ? 'red': 'black'
        return (
            <View style={{flex: 1, flexDirection: 'row', marginTop: 8, marginLeft: 8}}>
                <Text style={{color: color}}>
                    {this.props.product.name}
                </Text>
                <Text style={{marginLeft: 20}}>
                    {this.props.product.price}
                </Text>
            </View>
        );
    }
}

class ProductTable extends Component {
    render () {
        var titles = [];
        var datas = [];
        for (var i = 0; i < this.props.products.length; i++) {
            var product = this.props.products[i];
            if (this.props.searchText.length) {
                if (product.name.toLowerCase().indexOf(this.props.searchText.toLowerCase()) === -1) {
                    continue ;
                }
            }
            var index = titles.indexOf(product.category)
            if (index === -1) {
                titles.push(product.category)
                datas.push([product])
            } else {
                datas[index].push(product)
            }
        };

        var sections = [];
        titles.forEach((item, index) => {
            sections.push({title: titles[index], data: datas[index]})
        });
        return (
            <SectionList
                renderItem={({item}) => <ProductRow product={item}/>}
                renderSectionHeader = {({section}) => <Text style={{fontSize: 16}}> {section.title} </Text>}
                sections = {sections}
                keyExtractor = {(item, index) => item.name}
            />
        );
    }
}

class SearchableProductTable extends Component {
    constructor(props) {
        super(props);
        this.state = {
            searchText: '',
            isStockOnly: false
        };
    }

    handleSearchTextInput = (searchText) => {
        this.setState({
           searchText: searchText
        });
    }

    handleInStockInput = (isStockOnly) => {
        this.setState({
            isStockOnly: isStockOnly
        })
    }

    render () {
        return (
            <View style={{marginTop: 44}}>
                <SearchBar
                    searchText = {this.state.searchText}
                    isStockOnly = {this.state.isStockOnly}
                    onSearchTextInput = {this.handleSearchTextInput}
                    onInStockInput = {this.handleInStockInput}
                />
                <ProductTable
                    products = {this.props.products}
                    searchText = {this.state.searchText}
                    isStockOnly = {this.state.isStockOnly}
                />
            </View>
        );
    }
}

var PRODUCTS = [
    {category: 'Sporting Goods', price: '$49.99', stocked: true, name: 'Football'},
    {category: 'Sporting Goods', price: '$9.99', stocked: true, name: 'Baseball'},
    {category: 'Sporting Goods', price: '$29.99', stocked: false, name: 'Basketball'},
    {category: 'Electronics', price: '$99.99', stocked: true, name: 'iPod Touch'},
    {category: 'Electronics', price: '$399.99', stocked: false, name: 'iPhone 5'},
    {category: 'Electronics', price: '$199.99', stocked: true, name: 'Nexus 7'}
];


export default class Product extends Component {
    render() {
        return (
            <SearchableProductTable products={PRODUCTS} />
            );
    }
}