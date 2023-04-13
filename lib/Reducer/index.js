import { useReducer } from "react";
import { useColorContext } from "../context/Colors";

const [setDarkmode, setBg, setText, setCard ] = useColorContext()

const reducer = (state, action) => {
    switch(action.type){
        case 'darkmode':
            setBg(state.backgroundcolor)
            setText(state.textColor)
            setCard(state.cardColor)
            setDarkmode(true)

        case 'lightmode':
            setBg('#F7FAFC')
            setText('blue.800')
            setCard('white')
            setDarkmode(false)
        default:
            return state 
        }}



export default function colorReducer() {

    const [state, dispatch ] = useReducer(reducer, {backgroundcolor: ' #1A202C', textColor:'#CBD5E0', cardColor: '#4A5568'})

    function darkmode(){
        dispatch({type: 'darkmode'})
    }

    function defaultmode(){
        dispatch({type:'lightmode'})
    }
}
 