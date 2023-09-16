import { PrismaClient } from "@prisma/client";
import { create } from "domain";

const prisma = new PrismaClient();


type User = {
    id?: number
    name: string
    surname?: string
}

type Article = {
    title: string,
    description?: string
    author: number
}


const createUser = async (payload: User) => {

    const user = await prisma.user.create({
        data: payload
    })

    return user
}

const updateUser = async (payload: User) => {
    const user = await prisma.user.update({
        where: {
            id: payload.id
        },
        data: payload
    })

    return user
}

const deleteUser = async (dataID: number) => {
    const user = await prisma.user.delete({
        where: {
            id: dataID
        },

    })

    return user
}

const getUsers = async () => {
    const users = await prisma.user.findMany({
        include: { articles: true }
    });

    return users
}

const getArticles = async () => {
    const articles = await prisma.article.findMany();

    return articles
}


const createArticle = async (payload: Article) => {
    const article = await prisma.article.create({
        data: {
            ...payload,
            author: {
                connect: {
                    id: payload.author
                }
            }
        }


    })

    return article
}

const main = async () => {
    const userObj = {

        name: "test12",
        surname: "test12"
    }
    const articleObj = {
        title: "Articles Title",
        description: "This is nice article yopu should read this",
        author: 2
    }

    const articleAndUserObj = {
        name: "test",
        surname: "test",
        articles: {
            create: {
                title: "Article title",
                description: "Article description"
            }
        }
    }

    // const response = await createUser(userObj)
    const response = await getUsers()
    // const response = await createArticle(articleObj)
    // const response = await getArticles()
    // const response = await updateUser(userObj)
    // const response = await deleteUser(4)

    console.log(response)

}




main()
    .then(async () => {
        await prisma.$disconnect()
    })
    .catch(async (err) => {
        console.error(err)
        await prisma.$disconnect()
        process.exit(1)
    })