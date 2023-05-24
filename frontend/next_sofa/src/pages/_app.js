import Router from 'next/router';
import { useState } from 'react';
//components
import Footer from '@/components/Footer/footer';
import NavBar from '@/components/Navbar/Navbar';
import '@/styles/globals.css';
import {AuthProvider} from '@/context/AuthenticationContext';
import LoadingPage from '@/components/Global/loading_page';
//redux
import { store } from '@/redux/store';
import { Provider } from 'react-redux';
//redux persist
import { PersistGate } from 'redux-persist/integration/react';
import { persistStore } from 'redux-persist';


export default function App({ Component, pageProps }) {
  const [loading, setLoading] = useState(false);
  Router.events.on("routeChangeStart",(url)=>{
    setLoading(true)
  });
  Router.events.on("routeChangeComplete",(url)=>{
    setLoading(false)
  });

  let persistor = persistStore(store);
  
  return <>
    <Provider store={store}>
      <PersistGate persistor={persistor}>
        <AuthProvider>
          {loading&&<LoadingPage/>}
          <NavBar/>
          <Component {...pageProps} />
          <Footer></Footer>
        </AuthProvider>
      </PersistGate>
    </Provider>
  </>
}
