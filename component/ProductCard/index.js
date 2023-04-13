import Link from 'next/link'
import {Box, Text, Image, Divider, useColorModeValue} from '@chakra-ui/react'
import ColorContext from '../../lib/context/Colors'
import { useContext } from 'react'

export default function ProductCard(props){

    const  [bg, setBg ,text, setText] = useContext(ColorContext)

    const background_color = useColorModeValue('#fafafa', '#404258' )
    const card_color = useColorModeValue('gray.200', '#474E68')
    const text_color = useColorModeValue('black', '#d2d3db')
    return(
        <Link href={`/product/${props.slug}`} passHref>
                <Box
                as="a"
                border="1px"
                 borderColor= {card_color}/* "gray.200" */
                 px="10"
                py="5"
                rounded="lg"
                boxShadow="lg"
                bgColor={card_color}
                transition = "ease 0.2s"
                _hover = {{
                    boxShadow: 'x1',
                    transform: 'scale(1.02)'
                }}>
                    <Image src={props.images[0]?.url} alt={props.name}/>
                    <Divider my="3" />
                    <Box>
                        <Text fontWeight="bold" /* textColor="purple"  */textColor={text_color}
                        fontSize="lg">
                            {props.name}
                        </Text>
                        <Text textColor={text_color}>${props.price/100} </Text>
                    </Box>
                </Box>                
        </Link>
    )
}