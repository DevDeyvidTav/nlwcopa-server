import {PrismaClient} from "@prisma/client"

const prisma = new PrismaClient()

async function main() {
    const user = await prisma.user.create({
        data:{
            name: 'john Doe',
            email: 'johnDoe@gmail.com',
            avatarUrl: 'http://github.com/DevDeyvidTav.png'
        }
    })
    const pool = await prisma.pool.create({
        data:{
            title: 'Example Pool',
            code: 'BOL123',
            ownerId: user.id,
            Participants: {
                create: {
                    userId: user.id,
                }
            }
        }

    })
    await prisma.game.create({
        data:{
            date: '2022-11-24T12:00:00.115Z',
            firstTeamCountryCode: 'DE',
            secondTeamCountryCode: 'BR'
        }
    })
    await prisma.game.create({
        data: {
            date: '2022-11-28T14:00:00.115Z',
            firstTeamCountryCode: 'BR',
            secondTeamCountryCode: 'Ar',

            guesses: {
                create: {
                    firstTeamPoints: 2,
                    secondTeamPoints: 1,
                    participant: {
                        connect: {
                            userId_poolId:{
                                userId: user.id,
                                poolId: pool.id
                            }
                        }
                    }
                }
            }
        }
    })
}
main();  