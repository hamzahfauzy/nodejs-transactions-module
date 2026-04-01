import payment_methods from './databases/model/payment_methods.js'
import invoices from './databases/model/invoices.js'
import invoice_items from './databases/model/invoice_items.js'
import payments from './databases/model/payments.js'
import menu from './config/menu.js'
import page from './config/page.js'
import { getView } from '#libs/util.js'
import { getTable } from '#database/database.registry.js'
import DatabaseService from '#database/database.service.js'

const tables = {
    payment_methods,
    invoices,
    invoice_items,
    payments,
}

const service = new DatabaseService

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

        context.register.publicRoute('transactions', (router) => {
            router.get('/invoices/:code(*)', async (req, res) => {
                const code = req.params.code
                const invoiceTable = getTable('trx_invoices')
                const invoice = await service.singleByClause(invoiceTable, {
                    code
                })

                res.render('app/transactions/views/print/invoice', {
                    invoice
                })
            })
            router.get('/print', (req, res) => {
                const view = getView('app/transactions/views/print', 'invoice.html')
                res.sendFile(view)
            })
        })

    }
}