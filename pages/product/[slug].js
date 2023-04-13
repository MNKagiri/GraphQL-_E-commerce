import graphql from "../../lib/graphql";
import getAllProducts from "../../lib/graphql/queries/getAllProducts";
import getProductDetail from "../../lib/graphql/queries/getProductDetail";
import {Box, Flex, Grid, Text, Image, Divider, Button, Select, useColorMode, useColorModeValue} from '@chakra-ui/react'
import {useContext, useState} from 'react'
import CartContext from "../../lib/context/Cart";
import useColorContext  from "../../lib/context/Colors";
import { signIn, signOut, useSession } from 'next-auth/react'


function SelectQuantity(props){

    const quantity = [...Array.from({length: 10})];



    return(
        <Select placeholder="Quantity"
        onChange={ (event) => props.onChange(event.target.value)}>
                {quantity.map((_, i) => (
                    <option key={i + 1} value={i + 1 }>
                            {i + 1}
                    </option>
                ))}

        </Select>
    )
}

export default function ProductPage({product}) {
    const [quantity, setQuantity] = useState(0)
    const [uniqueNumber, setUniqueNumber] = useState(0)
    const {items, setItems} = useContext(CartContext);
    const {data: session} =  useSession()


    const background_color = useColorModeValue('#fafafa', '#404258' )
    const card_color = useColorModeValue('gray.200', '#474E68')
    const text_color = useColorModeValue('white', '#d2d3db')

    const alreadyInCart = product.id in items

    function addToCart(){
        setUniqueNumber(uniqueNumber + 1)
        setItems({
            ...items,
            [product.id]: quantity,
        })
    
         window.localStorage.setItem('cartItem' ,  JSON.stringify(items)) 
         console.log(items[0])
    }

    return (
        <Flex   paddingTop={30} marginTop = {30}
        rounded="x1" boxShadow="2x1" w="full" p="16" /* bgColor='white' */ bgColor={card_color}>
{/*  newly added element     */}  
            <Image height="96" width="96" src={product.images[0].url}/>
            <Box ml="12" width="container.xs">

        <Text as="h1" fontSize="4xl" fontWeight="bold" textColor={text_color}>
            {product.name}
            </Text>       
 
        <Text lineHeight="none" fontSize = "x1" my="3"
        fontWeight="bold" 
    /*     textColor='blue.500' */ textColor={text_color}> 
        $ {product.price/ 100}
        </Text>
        <Text maxW="96" textAlign="justify" fontSize="sm"  textColor={text_color}>
            {product.description}</Text> 
            <Divider my="6"/>
            <Grid gridTemplateColumns="2fr 1fr " gap="5"
            alignItems = "center">
                <SelectQuantity onChange={(quantity) => setQuantity(parseInt(quantity))}/>
                {session ?  <Button colorScheme="blue" onClick={addToCart}>
                    {alreadyInCart? 'Update' : 'Add to cart'}
                </Button>:     <Button onClick={() => signIn()}> Sign in To Add To Cart</Button>}
            
            </Grid>
         </Box>
        </Flex>
    )
}

export async function getStaticPaths(){
    const {products} = await graphql.request(getAllProducts)

    const paths =  products.map((product) => ({
        params: {
            slug: product.slug,
        }
    }) )
    return {
        paths,
        fallback: false,
    }
}

export async function getStaticProps({params}) {
    const {products} = await graphql.request(getProductDetail, {
        slug: params.slug,
    });
    return {
        props: {
            product: products[0]
        }
    }
}