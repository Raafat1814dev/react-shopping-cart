import React, { Component } from "react";
import { storeProducts, detailProduct } from "./data";

const ProductContext = React.createContext();
// 1. Provider
// 2. Consumer

// export default class ProductProvider extends Component {
class ProductProvider extends Component {
  // state = {
  //   products: storeProducts,
  //   detailProduct
  // };
  // to get a copy of the values of the array from data.js
  // unfortunately we can't just do simple separator >>> const newArr = [...oldArr] <<<
  // so we do the following
  // 1. set the products: []  inside the state
  // 2. in the setProducts function we loop throw the oldArr and copy each item into the newArr
  // 3. inside the forEach we return a {products: newArr}  Object inside the setState() function
  // 4. we call the function setProduct() inside the lifeCircle-method componentDidMount()
  // and this is how we get a COPY of the data.js not the reference of the array values

  state = {
    products: [],
    detailProduct: detailProduct,
    cart: [],
    // cart: storeProducts,

    // model
    modalOpen: false,
    modalProduct: detailProduct,
    // cart
    cartSubTotal: 0,
    cartTax: 0,
    cartTotal: 0
  };

  componentDidMount() {
    this.setProducts();
  }
  setProducts = () => {
    let tempProducts = [];
    storeProducts.forEach(item => {
      const singleItem = { ...item };
      tempProducts = [...tempProducts, singleItem];
    });
    this.setState(() => {
      return { products: tempProducts };
    });
  };

  getItem = id => {
    const product = this.state.products.find(item => item.id === id);
    return product;
  };

  handleDetail = id => {
    const product = this.getItem(id);
    this.setState(() => {
      return { detailProduct: product };
    });
    // console.log("hello from detailll ");
  };
  addToCart = id => {
    // we are going to use the index .. because if we mutate the product directly ..
    // react will re-render and place the product with the mutated values in the last
    //* this is why we will use the index
    // and we will save the values of the products in tempProducts
    // because we don't want to mutate the state
    //
    let tempProducts = [...this.state.products];
    const index = tempProducts.indexOf(this.getItem(id));
    const product = tempProducts[index];
    product.inCart = true;
    product.count = 1;
    const price = product.price;
    product.total = price;

    // console.log("hello cart ID : ", id);

    this.setState(
      () => {
        // we need to change the product too .. to prevent adding the product to the cart more than one time
        return { products: tempProducts, cart: [...this.state.cart, product] }; // cart: <<is the array of items that are inside the cart
        // [...this.state.cart, product] >>>> using the spread operator to add the product in the cart array !!
      },
      () => {
        // console.log(this.state);
        this.addTotals();
      }
    );
  };

  // functions for the Modal
  openModal = id => {
    const product = this.getItem(id);
    this.setState(() => {
      return {
        modalProduct: product,
        modalOpen: true
      };
    });
  };
  closeModal = () => {
    this.setState(() => {
      return {
        modalOpen: false
      };
    });
  };

  // functions for the cart
  increment = id => {
    // console.log("this is increment method ");
    let tempCart = [...this.state.cart];
    const selectedProduct = tempCart.find(item => item.id === id);

    const index = tempCart.indexOf(selectedProduct);
    const product = tempCart[index];

    product.count = product.count + 1;
    product.total = product.count * product.price;

    this.setState(
      () => {
        return {
          cart: [...tempCart]
        };
      },
      () => {
        this.addTotals();
      }
    );
  };
  decrement = id => {
    // console.log("this is Decrement !! ");
    let tempCart = [...this.state.cart];
    const selectedProduct = tempCart.find(item => item.id === id);

    const index = tempCart.indexOf(selectedProduct);
    const product = tempCart[index];

    product.count = product.count - 1;

    if (product.count === 0) {
      this.removeItem(id);
    } else {
      product.total = product.count * product.price;
      this.setState(
        () => {
          return {
            cart: [...tempCart]
          };
        },
        () => {
          this.addTotals();
        }
      );
    }
  };
  removeItem = id => {
    // console.log(" Item removed ");
    let tempProducts = [...this.state.products];
    let tempCart = [...this.state.cart];

    tempCart = tempCart.filter(item => item.id !== id);

    const index = tempProducts.indexOf(this.getItem(id));

    let removedProduct = tempProducts[index];

    removedProduct.inCart = false;
    removedProduct.count = 0;
    removedProduct.total = 0;

    this.setState(
      () => {
        return {
          cart: [...tempCart],
          products: [...tempProducts]
        };
      },
      () => {
        this.addTotals();
      }
    );
  };
  clearCart = () => {
    // console.log("cart was cleared ");
    this.setState(
      () => {
        return {
          cart: []
        };
      },
      () => {
        // this.setProduct will give them new original set of fresh copies of all the objects
        // so all the modified objects are going to set back to the default, what you are getting back from the DB
        // this is why we passed them as copies in the beginning
        this.setProducts();
        this.addTotals();
      }
    );
  };
  addTotals = () => {
    let subTotal = 0;
    this.state.cart.map(item => {
      subTotal += item.total;
    });
    const tempTax = subTotal * 0.1;
    // the function toFixed() returns a string .. that's why we use the parseFloat() functoin
    const tax = parseFloat(tempTax.toFixed(2));
    const total = subTotal + tax;
    this.setState(() => {
      return {
        cartSubTotal: subTotal,
        cartTax: tax,
        cartTotal: total
      };
    });
  };

  render() {
    return (
      <ProductContext.Provider
        value={{
          ...this.state,
          handleDetail: this.handleDetail,
          addToCart: this.addToCart,
          openModal: this.openModal,
          closeModal: this.closeModal,

          increment: this.increment,
          decrement: this.decrement,
          removeItem: this.removeItem,
          clearCart: this.clearCart
        }}
      >
        {this.props.children}
      </ProductContext.Provider>
    );
  }
}

const ProductConsumer = ProductContext.Consumer;

export { ProductProvider, ProductConsumer };
