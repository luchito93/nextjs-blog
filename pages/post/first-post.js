import Head from "next/head"
import Link from "next/link"
import Script from "next/script"
import Layout from "../../components/layout"

const FirstPost = () => {
    return (
        <Layout home={false}>
            <div>
                <Head>
                    <title>My first post</title>
                </Head>
                { false && <Script
                src="https://connect.facebook.net/en_US/sdk.js"
                strategy="lazyOnload"
                onLoad={() => console.log('Ya termino de cargar el facepur')}
                />}
                <h1>First post special 😍</h1>
            </div>
        </Layout>
    )
}

export default FirstPost