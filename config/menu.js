export default {
    transactions: {
        label: "Transactions",
        icon: "credit-card",
        permissions: ["trx_payment_methods.list",'trx_invoices.list','trx_payments.list'],
        activeState:['/transactions/payment-methods','/transactions/invoices','/transactions/payments'],
        children: {
            payment_methods: {
                label: 'Payment Methods',
                route: '/transactions/payment-methods',
                permission: "trx_payment_methods.list",
                activeState:['/transactions/payment-methods'],
            },
            invoices: {
                label: 'Invoices',
                route: '/transactions/invoices',
                permission: "trx_invoices.list",
                activeState:['/transactions/invoices'],
            },
            payments: {
                label: 'Payments',
                route: '/transactions/payments',
                permission: "trx_payments.list",
                activeState:['/transactions/payments'],
            },
        }
    },
}