import  { createContext, useContext, useState } from "react";


 const ColorContext = createContext();

 export default ColorContext;
/* export function ColorContextProvider({children}){

    const [bg, setBg]  = useState('#F7FAFC')
    const [text, setText] = useState('blue.800')
    const [card, setCard] = useState('white')
    const [darkmode, setDarkmode] = useState(false)
    
   

    return(
        <ColorContext.Provider value={{bg, setBg, text, setText, card, setCard, darkmode, setDarkmode}}>
            {children}
        </ColorContext.Provider>
    )
}

export default function useColorContext(){
    return useContext(ColorContext)
} */