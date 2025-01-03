import * as odbc from 'odbc';
import * as dotenv from 'dotenv';

dotenv.config();


export async function executeCloudBSSQuery(query: string): Promise<any> {

    const connectionString = process.env.CLOUD_BSS_ODBC_CONNECTION_STRING;

    if (!connectionString) {
        throw new Error('Connection string is required');
    }
    let connection;
    try {
        connection = await odbc.connect(connectionString);
        const result = await connection.query(query);
        return result;
    } catch (error) {
        console.error('Error executing query:', error);
        throw error;
    } finally {
        if (connection) {
            await connection.close();
        }
    }
}