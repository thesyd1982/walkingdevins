import { PrismaClient } from '@prisma/client'
import * as argon2 from 'argon2'



const prisma = new PrismaClient()

async function seed() {
    try {

        await prisma.post.deleteMany();
        await prisma.user.deleteMany();

        const argon2Options = {
            type: argon2.argon2id,
            memoryCost: 2 ** 16,
            timeCost: 3,
            parallelism: 1
        }

        const users = [

            {
                firstname: 'Alice', lastname: 'Doe',
                email: 'alice@example.com', password: 'password123',
            },
            {
                firstname: 'Bob', lastname: 'Smith',
                email: 'bob@example.com', password: 'password456', role: 1,
            },
            {
                firstname: 'Charlie', lastname: 'Johnson',
                email: 'charlie@example.com', password: 'password789', role: 2,
            },
            {
                firstname: 'Charles', lastname: 'Gontran',
                email: 'charles@example.com', password: 'password101', role: 3,
            },
        ]

        const usersWithHashedPasswords = await Promise.all(
            users.map(async user => ({
                ...user,
                password: await argon2.hash(user.password, argon2Options)
            }))
        )

        await prisma.user.createMany({ data: usersWithHashedPasswords, skipDuplicates: true })

        const posts = [
            {
                title: 'First Post', content: 'This is the first post', published: true,
                authorEmail: 'alice@example.com'
            },
            {
                title: 'Second Post', content: 'This is the second post', published: false,
                authorEmail: 'bob@example.com'
            },
            {
                title: 'Third Post', content: 'This is the third post', published: true,
                authorEmail: 'charlie@example.com'
            },
            {
                title: 'Fourth Post', content: 'This is the fourth post', published: true,
                authorEmail: 'alice@example.com'
            },
        ]

        for (const post of posts) {
            const { id } = await prisma.user.findUnique({
                select: { id: true }
                , where: { email: post.authorEmail }
            })
            if (!id) {
                console.error('Author not found:', post.authorEmail)
                continue
            }
            await prisma.post.create({
                data: {
                    title: post.title,
                    content: post.content,
                    published: post.published,
                    author: {
                        connect: {
                            id
                        }
                    }
                }
            })
        }
    } catch (e) {
        console.error('Seed error:', e)
        process.exit(1)
    } finally {
        await prisma.$disconnect()
    }
}

async function unseed() {
    try {
        await prisma.post.deleteMany();
        console.log('All posts have been deleted.');

        await prisma.user.deleteMany();
        console.log('All users have been deleted.');
    } catch (error) {
        console.error('Error while clearing the database:', error);
    } finally {
        await prisma.$disconnect();
    }
}

process.argv[2] === "-d" ? unseed() : seed();
