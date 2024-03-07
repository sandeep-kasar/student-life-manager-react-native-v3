import { SQLiteDatabase } from "react-native-sqlite-storage"
import { ExpenseEntity } from "../models/ExpenseEntity"
import { ExpenseData, ExpenseRow } from "../models/ExpenseData";
import { ExpenseHeader } from "../models/ExpenseHeader";
import { ExpenseDate } from "../models/ExpenseDate";

const tableName = 'my_expense';

export const addMyExpence = async (db: SQLiteDatabase, myExpence: ExpenseEntity[]) => {
    const insertQuery =
        `INSERT OR REPLACE INTO ${tableName} (ex_title, ex_note, ex_amount, ex_type, ex_date, ex_month) values` + myExpence.map(i => `('${i.ex_title}', '${i.ex_note}', '${i.ex_amount}', '${i.ex_type}', '${i.ex_date}', '${i.ex_month}')`).join(',');
    try {
        return db.executeSql(insertQuery)
    } catch (error) {
        console.error(error)
        throw Error("Failed to add expense")
    }
}

export const getExpenseData = async (db: SQLiteDatabase): Promise<ExpenseData> => {
    try {

        // get expense header
        let incomeValue = 0
        const incomeResult = await db.executeSql(`select sum(ex_amount) As inamount from ${tableName} where ex_type = 1 and ex_month = 2`)
        incomeResult?.forEach((result) => {
            for (let index = 0; index < result.rows.length; index++) {
                incomeValue = result.rows.item(index).inamount
            }
        })
        //console.log("incomeValue=="+incomeValue)

        let expenseValue = 0
        const expenseResult = await db.executeSql(`select sum(ex_amount) As expamount from ${tableName} where ex_type = 2 and ex_month = 2`)
        expenseResult?.forEach((result) => {
            for (let index = 0; index < result.rows.length; index++) {
                expenseValue = result.rows.item(index).expamount
            }
        })
        //console.log("expenseValue=="+expenseValue)

        const balanceValue = incomeValue - expenseValue
        const expenseHeaderData: ExpenseHeader = { income: incomeValue, expense: expenseValue, balance: balanceValue }

        //console.log("balanceValue=="+balanceValue)

        // get expenses by date
        let expenseRow: ExpenseRow[] = []
        let arrayListDate: string[] = [];
        const datesList = await db.executeSql(`SELECT DISTINCT ex_date as date FROM ${tableName} WHERE ex_month = 2 ORDER BY ex_date DESC`)
        datesList?.forEach((result) => {
            for (let index = 0; index < result.rows.length; index++) {
                arrayListDate.push(result.rows.item(index).date)
            }
        })
        //console.log("arrayListDate==" + arrayListDate)

        for(const date of arrayListDate){
            try {
                let expenseTotalForDate = 0
                const datesList = await db.executeSql(`select sum(ex_amount) As amount from ${tableName} where ex_date= '${date}' and ex_type IN (1, 2)`)
                datesList?.forEach((result) => {
                    for (let index = 0; index < result.rows.length; index++) {
                        expenseTotalForDate = result.rows.item(index).amount
                    }
                })
                const expenseDate: ExpenseDate = { date: date, total: expenseTotalForDate }
                
                let entityList: ExpenseEntity[] = []
                const entityListResult = await db.executeSql(`SELECT * FROM ${tableName} WHERE ex_date = '${date}' ORDER BY ex_id DESC`)
                entityListResult?.forEach((result) => {
                    for (let index = 0; index < result.rows.length; index++) {
                        entityList.push(result.rows.item(index))
                    }
                })
                expenseRow.push({ expenseDate: expenseDate, expenseEntity: entityList })
            } catch (error) { 
                console.error(error)
            }
        }
        const expenseData: ExpenseData = { expenseHeader: expenseHeaderData, expenseRow: expenseRow }
        //console.log("balance==="+expenseData.expenseHeader.balance);
        //console.log("expenseRow==="+expenseData.expenseRow[0].expenseDate.date);
        //console.log("expenseRow==="+expenseData.expenseRow[0].expenseEntity[0].ex_title);

        return expenseData
    } catch (error) {
        console.error(error)
        throw Error("Failed to get Expense from database")
    }
}

