import {Grid} from '@chakra-ui/layout'
import { useColorMode, useColorModeValue, Flex, Box} from '@chakra-ui/react'
import graphql from '../lib/graphql';
import getAllProducts from '../lib/graphql/queries/getAllProducts';
import ProductCard from '../component/ProductCard';
import { useEffect , useContext} from 'react';
import CartContext from '../lib/context/Cart'


export default function Home(props) {

  const {items, setItems} = useContext(CartContext)

  const background_color = useColorModeValue('#fafafa', '#404258' )

 
  useEffect(() => {

    if(window.localStorage.hasOwnProperty('cartItems')){
      const oldCart = JSON.parse(window.localStorage.getItem('cartItems'))
      setItems(
        items,
        oldCart
      )
    }
  }

  )

  return (

   <Grid bg={background_color}  /* marginTop = {100} */ paddingTop={100} gridTemplateColumns="repeat(4, 1fr)" gap="5"> 
   {props.products.map((product)=> (
    <ProductCard key={product.id} {...product} />
   ))}
   </Grid>

  )
}




export const getStaticProps = async () => {
  const {products}  = await graphql.request(getAllProducts)

  return{
    revalidate: 60,
    props: {
      products,
    }
  }
}