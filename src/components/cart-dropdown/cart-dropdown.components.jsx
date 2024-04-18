import Button from "../button/button.component";
import "./cart-dropdown.styles.scss";

const CartDropdown = () => {
    return (
        <div className="cart-dropdown-container">
            <div className="cart-itens" />
            <Button buttonType="">CHECKOUT</Button>
        </div>
    );
}

export default CartDropdown;