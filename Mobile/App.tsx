// import React ** obrigatorio
import React from 'react';
// importando um metodo apploading q deixa nosso ap em tela de loading 
import { AppLoading } from 'expo'
// importando meus componentes do react-native
import {StatusBar} from 'react-native'

/* O expo fez um lib que tem acesso as fonts do google fonts para facilitar nossa vida,
primeiro eu instalo o expo fonts e quais os pacotes de fonts eu quero, dps eu importo as fonts e um carinha chamado,
useFonts que ira receber o import das fonts
*/
import { Roboto_400Regular, Roboto_500Medium, useFonts} from '@expo-google-fonts/roboto'
import { Ubuntu_700Bold } from '@expo-google-fonts/ubuntu'

// importando a minha pagina Home
import Routes from './src/routes'

// exportando minha função
export default function App() {
  /* Aqui nos fazemos uma logica que é, a const fontsloaded vai receber o import das fontos da lib do expo
  enquando o usefonts n retornar todas as 3 fonts nosso app fica em loading * Tela de carregamento */
  const [fontsLoaded] = useFonts({
    Roboto_400Regular,
    Roboto_500Medium,
    Ubuntu_700Bold
  })
  if (!fontsLoaded) {
    return <AppLoading />
  }


  
  return (
    <>
    {/*StatusBar é la encima do celular aonde fica a bateria*/}
    <StatusBar barStyle='dark-content' backgroundColor='transparent' translucent />
    <Routes />
    </>
  );
}

