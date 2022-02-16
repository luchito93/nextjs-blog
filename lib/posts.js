import fs from  'fs'
import path from 'path'
import matter from 'gray-matter'
import remarkHtml from 'remark-html'
import { remark } from 'remark'

const postDirectory = path.join(process.cwd(), 'posts')

const getSortedPostsData = () => {
    // Gen file names under /post
    const fileNames = fs.readdirSync(postDirectory)
    const allPostData = fileNames.map(fileName => {
        // Remove ".md" from file name to get id
        const id = fileName.replace(/\.md$/, '')

        //Read markdown file as string
        const fullPath = path.join(postDirectory, fileName)
        const fileContents = fs.readFileSync(fullPath, 'utf8')

        // Use gray-matter to parse the post metadata section
        const matterResult = matter(fileContents)

        // Combine the data with the id
        return {
            id,
            ...matterResult.data
        }
    })

    // Sort post by date
    return allPostData.sort(({ date: a }, { date: b }) => {
        if (a < b) {
            return 1
        } else if (a > b) {
            return -1
        } else {
            return 0
        }
    })
}

// Returns an array that looks like this:
  // [
  //   {
  //     params: {
  //       id: 'ssg-ssr'
  //     }
  //   },
  //   {
  //     params: {
  //       id: 'pre-rendering'
  //     }
  //   }
  // ]
const getAllPostIds = () => {
    const fileNames = fs.readdirSync(postDirectory)
    return fileNames.map(fileName => {
        return {
            params: {
                id: fileName.replace(/\.md$/, '')
            }
        }
    })
}

const getPostData = async (id) => {
    const fullPath = path.join(postDirectory, `${id}.md`)
    const fileContents = fs.readFileSync(fullPath, 'utf8')

    //use gray-matter to parse the post metadata section
    const matterResult = matter(fileContents)

    //use remar to convert markdown into html strin

    const processContent = await remark().use(remarkHtml).process(matterResult.content)
    const contentHtml = processContent.toString()

    //combine the data with the id
    return {
        id,
        contentHtml,
        ...matterResult.data
    }
}

export {
    getSortedPostsData,
    getAllPostIds,
    getPostData
}