import Head from "next/head";
import Navbar from "./Navbar";

export default function Layout({children}) {
  return(
    <>
      <Head>
        <link rel="shortcut icon" href="/images/blacka.png"/>
        <title>Wine</title>
      </Head>
      <Navbar />
      <main>{children}</main>
    </>
  )
}