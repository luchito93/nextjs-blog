import Head from 'next/head'
import Link from 'next/link'
import Layout from '../components/layout'
import { getSortedPostsData } from '../lib/posts'
import utilsStyles from '../styles/utils.module.css'
import Date from '../components/date'

const getStaticProps = async () => {
  const allPostData = getSortedPostsData()
  return {
    props: {
      allPostData
    }
  }
}

const Home = ({ allPostData }) => {
  return (
    <Layout home={true}>
      <Head>
        <title>Create Next App</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <h1 className="title">
        Read{' '}
        <Link href="/post/first-post">
          <a>This page!!</a>
        </Link>
      </h1>
      <a href='/post/first-post'>Bad chante page using navigator event</a>

      <p className="description">
        Get started by editing <code>pages/index.js</code>
      </p>

      <div className="grid">
        <a href="https://nextjs.org/docs" className="card">
          <h3>Documentation &rarr;</h3>
          <p>Find in-depth information about Next.js features and API.</p>
        </a>

        <a href="https://nextjs.org/learn" className="card">
          <h3>Learn &rarr;</h3>
          <p>Learn about Next.js in an interactive course with quizzes!</p>
        </a>

        <a
          href="https://github.com/vercel/next.js/tree/master/examples"
          className="card"
        >
          <h3>Examples &rarr;</h3>
          <p>Discover and deploy boilerplate example Next.js projects.</p>
        </a>

        <a
          href="https://vercel.com/import?filter=next.js&utm_source=create-next-app&utm_medium=default-template&utm_campaign=create-next-app"
          className="card"
        >
          <h3>Deploy &rarr;</h3>
          <p>
            Instantly deploy your Next.js site to a public URL with Vercel.
          </p>
        </a>
      </div>

      <section className={`${utilsStyles.headingMd} ${utilsStyles.padding1px} ${utilsStyles.cardblog}`}>
        <h2 className={utilsStyles.headingLg}>Blog</h2>
        <ul className={utilsStyles.list}>
          {
            allPostData.map(({id, title, date}) => (
              <li className={utilsStyles.listItem} key={id}>
                <Link href={`post/${id}`}>
                  <a>{title}</a>
                </Link>
                <br />
                <Date dateString={date} />
              </li>
            ))
          }
        </ul>
      </section>
    </Layout>
  )
}


export {
  Home as default,
  getStaticProps
}