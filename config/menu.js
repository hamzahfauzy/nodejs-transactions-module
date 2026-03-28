export default {
    transactions: {
        label: "Transactions",
        icon: "credit-card",
        permissions: ["trx_payment_methods.list",'trx_invoices.list','trx_payments.list'],
        activeState:['/payment-methods','/invoices','/payments'],
        children: {
            payment_methods: {
                label: 'Payment Methods',
                route: '/payment-methods',
                permission: "trx_payment_methods.list",
                activeState:['/payment-methods'],
            },
            invoices: {
                label: 'Invoices',
                route: '/invoices',
                permission: "trx_invoices.list",
                activeState:['/invoices'],
            },
            payments: {
                label: 'Payments',
                route: '/payments',
                permission: "trx_payments.list",
                activeState:['/payments'],
            },
        }
    },
}