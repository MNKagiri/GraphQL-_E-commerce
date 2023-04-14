import Link from 'next/link';
import { Flex, Box, Button, Text,
Popover, PopoverTrigger, PopoverContent, PopoverArrow, PopoverCloseButton, PopoverBody, PopoverHeader, useColorMode, useColorModeValue} from '@chakra-ui/react';
import { MdShoppingCart, MdAccountCircle, MdDarkMode, MdWbSunny } from 'react-icons/md';
import {useContext} from 'react';
import CartContext from '../../lib/context/Cart';
import { signIn, signOut, useSession } from 'next-auth/react'



export default function NavBar(){

    const {data: session} =  useSession()



const {colorMode, toggleColorMode} = useColorMode()
const {items} = useContext(CartContext)

const itemsCount = Object.values(items)
                          .reduce((x,y) => x + y, 0)

const text_color = useColorModeValue('#484b6a', '#d2d3db')
const background_color = useColorModeValue('#fafafa', '#404258' )

    return(

        <Flex zIndex={10} position = 'fixed' top={0} left = {0} w="full"
            bgColor= {background_color}/* 'rgba(0, 0, 0, 0.80)' */  boxShadow="md"  textAlign="right" variant="nav" marginBottom='10%'>
            <Flex width = "container.xl" m="auto" p="5" minW="100vw" textAlign="right"
            justifyContent="space-between">
                <Link href="/" passHref>
 
                    <Text  textColor= {text_color} /* 'blue.800' */  fontWeight="bold"
                    fontSize = "2x1" as="a" letterSpacing={24} >
                        THE GRAPH SHOP
                    </Text>
                </Link>
                {
                    session ? <Box > <Button onClick = {() => signOut()}> Log Out</Button></Box>
                    :        
            <Button onClick={() => signIn()}>Log In</Button>
                                        
                                           
                }

                <Button onClick={toggleColorMode}> {colorMode  === 'light' ? <MdDarkMode/> :  <MdWbSunny/>}</Button>
                <Box>
                    <Link href="/cart" passHref>
                        <Button as="a"> <MdShoppingCart />  
                        <Text ml="3">{itemsCount}</Text>
                        </Button>
                    </Link>
                </Box>
            </Flex>
        </Flex>
    )
}