import React, { Component } from "react";
import { storeProducts, detailProduct } from "./data";

const ProductContext = React.createContext();
// 1. Provider
// 2. Consumer

// export default class ProductProvider extends Component {
class ProductProvider extends Component {
  state = {
    products: storeProducts,
    detailProduct
  };
  handleDetail = () => {
    console.log("hello from detailll ");
  };
  addToCart = () => {
    console.log("hello from add to cartttttttt");
  };
  render() {
    return (
      <ProductContext.Provider
        value={{
          ...this.state,
          handleDetail: this.handleDetail,
          addToCart: this.addToCart
        }}
      >
        {this.props.children}
      </ProductContext.Provider>
    );
  }
}

const ProductConsumer = ProductContext.Consumer;

export { ProductProvider, ProductConsumer };
