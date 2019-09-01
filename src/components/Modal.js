import React, { Component } from "react";
import styled from "styled-components";
import { ProductConsumer } from "../context";
import { ButtonContainer } from "./Button";
import { Link } from "react-router-dom";

export default class Modal extends Component {
  render() {
    return (
      <ProductConsumer>
        {value => {
          const { modalOpen, closeModal } = value;
          const { img, title, price } = value.modalProduct;
          if (!modalOpen) {
            return null;
          } else {
            return (
              <ModalContainer>
                <div className="container">
                  <div className="row">
                    <div
                      id="modal"
                      className="col-8 mx-auto col-md-6 col-lg-4 text-center text-capitalized p-5"
                    >
                      <h5>item added to the cart</h5>
                      {/* img-fluid : to make sure that the image is not bigger than the container that it is placed in  */}
                      <img src={img} className="img-fluid" alt="product" />
                      <h5>{title}</h5>
                      <h5 className="text-muted"> price: &euro; {price}</h5>
                      <Link to="/">
                        <ButtonContainer
                          onClick={() => {
                            closeModal();
                          }}
                        >
                          back to store
                        </ButtonContainer>
                      </Link>
                      <Link to="/cart">
                        <ButtonContainer
                          cart
                          onClick={() => {
                            closeModal();
                          }}
                        >
                          go to cart
                        </ButtonContainer>
                      </Link>
                    </div>
                  </div>
                </div>
                {/*  */}
              </ModalContainer>
            );
          }
          return;
        }}
      </ProductConsumer>
    );
  }
}

const ModalContainer = styled.div`
  /*  to add the modal and make it appear  */
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.3);
  /* to position the modal in the middle of the screen  */
  display: flex;
  align-items: center;
  justify-content: center;

  /* targeting the modal  */
  #modal {
    background: var(--mainWhite);
  }
`;
