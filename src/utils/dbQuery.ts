import { Collection, Document, MongoClient } from 'mongodb'

const dbQuery = async (callback: (collection: Collection<Document>) => Promise<any>) => {
    if (!process.env.MONGODB_URI) {
        throw new Error('No se ha encontrado la URI de la base de datos')
    }
    const client = new MongoClient(process.env.MONGODB_URI)
    const res = { ok: false, data: null }
    try {
        await client.connect()

        const db = client.db('db_horarios')
        const collection = db.collection('horarios')

        const resQuery = await callback(collection)
        res.ok = true
        res.data = resQuery
    } catch (error) {
        console.log(error)
    } finally {
        await client.close()
    }
    return res
}

export default dbQuery