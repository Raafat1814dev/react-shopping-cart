import React, { Component } from "react";
import Product from "./Product";
import Title from "./Title";
import { ProductConsumer } from "../context";

export default class ProductList extends Component {
  render() {
    // console.log(this.state.products);
    return (
      <React.Fragment>
        <div className="py-5">
          <div className="container">
            <Title name="our" title="products" />
            {/* product row  */}
            <div className="row">
              <ProductConsumer>
                {value => {
                  return value.products.map(product => {
                    // <Product product={product} />;
                    return <Product key={product.id} product={product} />;
                    // console.log(product);
                  });
                  // return <h1>{value}</h1>;
                  // console.log("the value", value);
                }}
              </ProductConsumer>
            </div>
          </div>
        </div>
      </React.Fragment>
      // <div>
      //   <h3>From Product List !!</h3>
      //   <Product />1. thumb
      // 2. first finger
      // 3. second and third finger together
      // 4. second finger (immideatly)
      // 5. first finger
      // 6. third finger
      // </div>
    );
  }
}
