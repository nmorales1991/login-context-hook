import React from 'react'

export default React.createContext()//acá se crea el context. Se le puede enviar un estado inicial, pero este estado inicial sólo se mostrará en los componentes que no han sido envueltos en el Provider, así que pocas veces se utiliza