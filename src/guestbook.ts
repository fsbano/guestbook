import { DataSource } from "typeorm"
import { Entity, PrimaryGeneratedColumn, Column } from "typeorm"

@Entity()
export class User {
    @PrimaryGeneratedColumn()
    id: number

    @Column()
    firstName: string

    @Column()
    lastName: string

    @Column()
    isActive: boolean
}

const AppDataSource = new DataSource({
    type: "postgres",
    host: "eugenia",
    port: 5432,
    username: "guest",
    password: "guest",
    database: "guest",
    synchronize: true,
    logging: false,
    entities: [User]
})

async function createUser() {
    const user = new User
    user.firstName = "Fabio"
    user.lastName = "Sbano"
    user.isActive = true
    await AppDataSource.manager.save(user)
}

async function listarUser() {
    // const user = await AppDataSource.getRepository(User).findOneBy({ id: 1 })
    const user = await AppDataSource.getRepository(User).find()

    console.info(user)
}

AppDataSource.initialize()
    .then(() => {
        listarUser()
    })
    .catch((err) => {
        console.error("Error during Data Source initialization", err)
    })