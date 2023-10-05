import '../styles/global.css';
import 'bootstrap/dist/css/bootstrap.css'
import { useEffect } from "react";


export default function App({ Component, pageProps }) {
    useEffect(() => {
        require("bootstrap/dist/js/bootstrap.bundle.js");
      }, []);
    return <Component {...pageProps} />
  }