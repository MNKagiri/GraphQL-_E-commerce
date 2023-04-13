import '../styles/globals.css'
import {Box, Flex, ChakraProvider, useColorModeValue} from '@chakra-ui/react'
import Navbar from '../component/Navbar'
import { useState} from 'react'
import CartContext from '../lib/context/Cart'
import ColorContext from '../lib/context/Colors'
import {SessionProvider} from 'next-auth/react';



function MyApp({ Component, pageProps: {session, ...pageProps}}) {

  const  [items, setItems] = useState({})
  const [bg, setBg]  = useState('#F7FAFC')
  const [text, setText] = useState('blue.800')
  const [card, setCard] = useState('white')
  const [darkmode, setDarkmode] = useState(false)

  const background_color = useColorModeValue('#fafafa', '#9394a5' )
  const bg_paint  = useState(background_color)
  

  return(
    <SessionProvider session={session}>
    <ChakraProvider >
    <ColorContext.Provider value = {[bg, setBg, text, setText, card, setCard, darkmode, setDarkmode]}>
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
    </ColorContext.Provider>
    </ChakraProvider>
    </SessionProvider>
    )
}

export default MyApp
