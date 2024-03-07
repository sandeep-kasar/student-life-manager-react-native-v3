//https://medium.com/@julien-ctx/integrating-sqlite-with-react-native-a-beginners-tutorial-a74bbe34ac6a
//https://blog.logrocket.com/using-sqlite-with-react-native/

import {
  SQLiteDatabase,
  enablePromise,
  openDatabase,
} from "react-native-sqlite-storage"

const tableName = 'my_expense';

enablePromise(true)

export const connectToDatabase = async () => {
  return openDatabase(
    { name: "app_database.db", location: "default" },
    () => { },
    (error) => {
      console.error(error)
      throw Error("Could not connect to database")
    }
  )
}

export const createTables = async (db: SQLiteDatabase) => {
  const query = `
  CREATE TABLE IF NOT EXISTS ${tableName}(
    ex_id INTEGER PRIMARY KEY AUTOINCREMENT, 
    ex_title TEXT NOT NULL,
    ex_note TEXT, 
    ex_amount INTEGER NOT NULL, 
    ex_type INTEGER NOT NULL, 
    ex_date TEXT NOT NULL, 
    ex_month INTEGER NOT NULL)
  `
  try {
    await db.executeSql(query)
  } catch (error) {
    console.error(error)
    throw Error(`Failed to create tables`)
  }
}