import { ExpenseDate } from "./ExpenseDate"
import { ExpenseEntity } from "./ExpenseEntity"
import { ExpenseHeader } from "./ExpenseHeader"

export type ExpenseData = {
    expenseHeader: ExpenseHeader
    expenseRow: ExpenseRow[]
}
export type ExpenseRow = {
    expenseDate: ExpenseDate
    expenseEntity: ExpenseEntity[]
}