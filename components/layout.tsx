import Image from 'next/image'
import Head from 'next/head'
import Link from 'next/link'
import styles from './layout.module.css'
import utilsStyles from '../styles/utils.module.css'

const name = 'Luichito gomez'
const siteTitle = 'Next.js Sample Website'

const Layout = ({ children, home }: { children: React.ReactNode, home?: boolean }) => {
    const image =  <Image
                            priority
                            src="/images/profile.jpg"
                            className={utilsStyles.borderCircle}
                            height={144}
                            width={144}
                            alt={name}
                        />
    const title =  <h1 className={utilsStyles.heading2Xl}>{name}</h1>
    return (
        <div className={styles.container}>
            <Head>
                <link rel='icon' href='/favicon.ico'/>
                <meta name='description' content='Aprende a crear tu web personal con Next.js'/>
                <meta
                    property="og:image"
                    content={`https://og-image.vercel.app/${encodeURI(
                        siteTitle
                    )}.png?theme=light&md=0&fontSize=75px&images=https%3A%2F%2Fassets.vercel.com%2Fimage%2Fupload%2Ffront%2Fassets%2Fdesign%2Fnextjs-black-logo.svg`}
                />
                <meta name="og:title" content={siteTitle} />
                <meta name="twitter:card" content="summary_large_image" />
            </Head>
            <header className={styles.header}>
                {
                    home ? (
                        <>
                            {image}
                            {title}
                        </>
                    ) : (
                        <>
                            <Link href="/">
                                <a>
                                    {image}
                                </a>
                            </Link>
                            <h2 className={utilsStyles.headingLg}>
                                <Link href="/">
                                    <a className={utilsStyles.colorInherit}>{name}</a>
                                </Link>
                            </h2>
                        </>
                    )
                }
            </header>
            <main>
                {children}
            </main>
            {
                !home && (
                    <div>
                        <Link href="/">
                            <a>⬅ Back to Home</a>
                        </Link>
                    </div>
                )
            }
            <footer>
                <a
                href="https://vercel.com?utm_source=create-next-app&utm_medium=default-template&utm_campaign=create-next-app"
                target="_blank"
                rel="noopener noreferrer"
                >
                Powered by{' '}
                <img src="/vercel.svg" alt="Vercel" className="logo" />
                </a>
            </footer>
        </div>
    )
}

export default Layout