import React from "react";

import { ReactComponent as ShoppingItem } from "../../assets/shopping-bag.svg";

import "./cart-icon.style.scss";

const CartItem = () => (
	<div className='cart-icon'>
		<ShoppingItem className='shopping-icon'/>
		<span className='item-count'>0</span>
	</div>
);
export default CartItem;
