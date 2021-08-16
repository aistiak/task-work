import '../styles/globals.css'
import {wrapper} from "../store/index"
const MyApp = ({ Component, pageProps }) => {
  return <Component {...pageProps} />
}

// export default MyApp
export default wrapper.withRedux(MyApp);
