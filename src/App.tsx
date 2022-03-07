import {useState} from 'react';
import {useQuery} from 'react-query';
//Components
import {Item} from "./Item/Item";
import Drawer from '@material-ui/core/Drawer';
import {isKeyObject} from 'util/types';
import LinearProgress from '@material-ui/core/LinearProgress';
import Grid from '@material-ui/core/Grid';
import AddShoppingCartIcon from '@material-ui/icons/AddShoppingCart';
import Badge from '@material-ui/core/Badge';
//Styles
import {Wrapper, StyledButton} from "./App.styles";
//Types
export type CartItemType = {
    id: number;
    category: string;
    description: string;
    image: string;
    price: string;
    title: string;
    amount: number;
}

const getProducts = async (): Promise<CartItemType[]> =>
    await (await fetch('https://fakestoreapi.com/products')).json();

const App = () => {

    const [cartOpen, setCartOpen] = useState(false),
        [cartItems, setCartItems] = useState([] as CartItemType[]),
        {data, isLoading, error} = useQuery<CartItemType[]>('products', getProducts),

        getTotalItems = (items: CartItemType[]) =>
            items.reduce((ack, item) => ack + item.amount, 0),

        handleAddToCart = (clickedItem: CartItemType) => null,

        handleRemoveFromCart = () => null;

    if (isLoading) return <LinearProgress/>
    if (error) return <div>Something went wrong ...</div>

    return (
        <Wrapper>
            <Drawer anchor='right' open={cartOpen} onClose={() => setCartOpen(false)}>
                Cart goes here
            </Drawer>
            <StyledButton onClick={() => setCartOpen(true)}>
                <Badge badgeContent={getTotalItems(cartItems)} color='error'>
                    <AddShoppingCartIcon/>
                </Badge>
            </StyledButton>
            <Grid container spacing={3}>
                {data?.map(item => (
                    <Grid item key={item.id} xs={12} sm={4}>
                        <Item item={item} handleAddToCart={handleAddToCart}/>
                    </Grid>
                ))}
            </Grid>
        </Wrapper>
    );
}

export default App;
