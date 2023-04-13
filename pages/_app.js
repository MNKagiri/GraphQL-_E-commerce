import '../styles/globals.css'
import {Box, Flex, ChakraProvider, useColorModeValue} from '@chakra-ui/react'
import Navbar from '../component/Navbar'
import { useState} from 'react'
import CartContext from '../lib/context/Cart'
import {SessionProvider} from 'next-auth/react';



function MyApp({ Component, pageProps: {session, ...pageProps}}) {

  const  [items, setItems] = useState({})
  
  const background_color = useColorModeValue('#fafafa', '#9394a5' )
  const bg_paint  = useState(background_color)
  

  return(
    <SessionProvider session={session}>
    <ChakraProvider >
  
      <CartContext.Provider value = {{items, setItems}}>
        <div style={{ display: 'flex', width:'100%', minHeight:'100vh', backgroundColor: `${bg_paint}`}}>
{/*        <Flex w="full" minH="100vh" bg={background_color} > 
 */}      <Navbar/>
      <Box maxW =  "700vw" m ="auto" bgColor={background_color}>
    <Component {...pageProps} />
    </Box>
 {/*     </Flex>  */}
 </div>
    </CartContext.Provider>
   
    </ChakraProvider>
    </SessionProvider>
    )
}

export default MyApp
