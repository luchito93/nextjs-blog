import { GetServerSideProps } from "next"

const EXTERNAL_DATA_URL = 'https://jsonplaceholder.typicode.com/posts'

const generateSiteMap  = (posts: { id: string}[]) => {
    return `<?xml version="1.0" encoding="UTF-8"?>
   <urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
     <!--We manually set the two URLs we know already-->
     <url>
       <loc>https://jsonplaceholder.typicode.com</loc>
     </url>
     <url>
       <loc>https://jsonplaceholder.typicode.com/guide</loc>
     </url>
     ${posts
       .map(({ id }) => {
         return `
       <url>
           <loc>${`${EXTERNAL_DATA_URL}/${id}`}</loc>
       </url>
     `
       })
       .join('')}
   </urlset>
 `
}

const Sitemap = () => {}

const getServerSideProps : GetServerSideProps = async ({res}) => {
    // We make an API call to gather the URLs for our site
    const resquest = await fetch(EXTERNAL_DATA_URL)
    const posts = await resquest.json()

    // we generate the xml sitemap with the posts data
    const sitempa = generateSiteMap(posts)

    res.setHeader('Content-Type', 'text/xml')
    // we sent the XML to the browser
    res.write(sitempa)
    res.end() 
    return {
        props: {}
    }
}

export {
    Sitemap as default,
    getServerSideProps
}