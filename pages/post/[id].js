import Layout from "../../components/layout"
import { getAllPostIds, getPostData } from "../../lib/posts"
import Head from "next/head"
import Date from "../../components/date"
import utilStyles from '../../styles/utils.module.css'

const getStaticPaths = () => {
    const paths = getAllPostIds()
    return {
        paths,
        fallback: false
    }
}

const getStaticProps = async ({ params }) => {
    const postData = await getPostData(params.id)
    return {
        props: {
            postData
        }
    }
}

const Post = ({ postData }) => {
    return (
        <Layout>
            <Head>
                <title>{postData.title}</title>
            </Head>
            <article>
                <h1 className={utilStyles.headingXl}>{postData.title}</h1>
                <div className={utilStyles.lightText}>
                    <Date dateString={postData.date} />
                </div>
                <div dangerouslySetInnerHTML={{ __html: postData.contentHtml }}></div>
            </article>
        </Layout>
    )
}

export {
    Post as default,
    getStaticPaths,
    getStaticProps
}