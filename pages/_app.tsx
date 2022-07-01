import '../styles/globals.css'

import Layout from '../components/Layout'
import ApplicationProvider from '../context/provider/applicationProvider'

function MyApp({ Component, pageProps }) {
  return (
    <ApplicationProvider>
      <Layout>
          <Component {...pageProps} />
      </Layout>
   </ApplicationProvider>)
}

export default MyApp
