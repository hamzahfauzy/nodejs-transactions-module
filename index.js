import payment_methods from './databases/model/payment_methods.js'
import invoices from './databases/model/invoices.js'
import invoice_items from './databases/model/invoice_items.js'
import payments from './databases/model/payments.js'
import menu from './config/menu.js'
import page from './config/page.js'

const tables = {
    payment_methods,
    invoices,
    invoice_items,
    payments,
}

export default {
    // context {register, ui, db}
    init(context){
        for(const m in menu) {
            context.ui.registerMenu(m, menu[m])
        }

        for(const p in page) {
            context.ui.registerPage(p, page[p])
        }
        
        for(const t in tables){
            context.register.table(tables[t].name, tables[t])
        }

        context.register.migration('transactions', 'app/transactions/databases/migrations')

    }
}