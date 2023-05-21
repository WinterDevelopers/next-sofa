import Footer from '@/components/Footer/footer';
import NavBar from '@/components/Navbar/Navbar';
import '@/styles/globals.css';
import {AuthProvider} from '@/context/AuthenticationContext';
//redux
import { store } from '@/redux/store';
import { Provider } from 'react-redux';
//redux persist
import { PersistGate } from 'redux-persist/integration/react';
import { persistStore } from 'redux-persist';

export default function App({ Component, pageProps }) {
  let persistor = persistStore(store);
  return <>
    <Provider store={store}>
      <PersistGate persistor={persistor}>
        <AuthProvider>
          <NavBar/>
          <Component {...pageProps} />
          <Footer></Footer>
        </AuthProvider>
      </PersistGate>
    </Provider>
  </>
}
