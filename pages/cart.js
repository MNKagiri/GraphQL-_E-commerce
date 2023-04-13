import { useContext, useEffect, useState}  from 'react'
import {Box, Divider, Text, Flex, Button, Link, useColorModeValue} from '@chakra-ui/react'
import CartContext from '../lib/context/Cart'
import getProductsById from '../lib/graphql/queries/getProductsById'
import graphql from '../lib/graphql';
import loadStripe from '../lib/stripe'



export default function Cart(){

    const {items} = useContext(CartContext)
    const [products, setProducts] =   useState([])
    const hasProducts = Object.keys(items).length;

    const background_color = useColorModeValue('#fafafa', '#404258' )
    const card_color = useColorModeValue('gray.200', '#474E68')
    const text_color = useColorModeValue('black', '#d2d3db')


    function getTotal(){
        if(!products.length) return 0;


        return Object.keys(items)
        .map(
            (id) => products.find((product) => product.id === id).price * (items[id] / 100)

            //Stripe requires the price to be integers (i.e $4.99 should be written as 499)
            // That's why we need to divide by 100 the prices
            // we need to divide by 100 the prices
            // we get from GraphCMS which are already in the correct stripe format

         
        )
        .reduce( (x,y) => x + y)
        .toFixed(2)
    }

    async function handlePayment (){

        const stripe = await loadStripe()

        const res = await fetch('/api/checkout', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                items,
            })
        });

        const {session} = await res.json()
        await stripe.redirectToCheckout({
            sessionId: session.id, 
        })
    }

    useEffect(() => {
        //only fetch data if user has selected any product
        if (!hasProducts) return;

        graphql.request(getProductsById, {
            ids: Object.keys(items),
        })
        .then((data) => {
            setProducts(data.products);
        })
        .catch((err) => 
            console.error(err)
        )
    }, [JSON.stringify(products)])


    return(
            <Box 
            
            boxShadow= "2xl"
            w="container.lg"
            p="16"
            bgColor= /* '#F7FAFC' */ {background_color}>
                <Text as="h1" fontSize="2xl" fontWeight="bold" color={text_color}>
                        Cart
                </Text>
                <Divider my="10" />
                <Box>
                    { !hasProducts ? (<Text> The Cart is Empty.</Text>
                    ) : (
                        <>
                        {products.map((product) => (
                            <Flex
                            key={product.id}
                            justifyContent= "space-between"
                            mb="4">
                            <Box>
                                <Link href={`/product/${product.slug}` } passHref>
                                    <Text
                                    as="a"
                                    fontWeight="bold"
                                    _hover={{
                                        textDecoration: 'underline',
                                        color: 'blue.500'
                                    }}>
                                        {product.name}
                                        <Text as="span">
                                            {''}
                                            x{items[product.id]}
                                        </Text>
                                    </Text>
                                </Link>
                            </Box>
                            <Box>
                                ${(items [product.id] * (product.price/100)). toFixed(2)}
                            </Box>
                            </Flex>
                        ))}
                        <Divider my="10" />
                        <Flex
                        alignItems = "center"
                        justifyContent =  "space-between"                        
                        >
                            <Text fontSize="xl" fontWeight="bold">
                                        Total: ${getTotal()}
                            </Text>
                                    <Button onClick={handlePayment} colorScheme="blue"> Pay Now </Button>
                        </Flex>
                        </>
                    )}
                    
                </Box>
            </Box>
    )
}