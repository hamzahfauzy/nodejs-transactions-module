const appUrl = process.env.APP_URL
export default {
    title: "Payment Methods",
    path: 'transactions/payment-methods',
    permission: "trx_payment_methods.list",
    content: {
        type: "crud",
        value: {
            endpoint: '/table/trx_payment_methods',
            create: { 
                label: 'Create', icon: 'plus', permission: "trx_payment_methods.create", title: "Create Payment Method",
                modalClass: 'modal-md',
                fields: [
                    { 
                        name: "organization_id", label: "Organization", type: "select2",
                        dropdownParent: '#create-modal',
                        ajax: {
                            useBearer: true,
                            term: 'search',
                            response: {id: 'id', text: 'name'},
                            url: appUrl + '/table/organizations',
                        }
                    },
                    { name: "name", label: "Name", type: "text"},
                    { name: "admin_price", label: "Admin Price", type: "number"},
                    { name: "account_number", label: "Account Number", type: "number"},
                    { name: "account_name", label: "Account Name", type: "text"},
                ]
            },
            actions: [
                { 
                    label: 'Edit', type: 'edit', icon: 'edit-2', permission: "trx_payment_methods.update", title: "Edit Category",
                    modalClass: 'modal-md',
                    fields: [
                        { 
                            name: "organization_id", label: "Organization", type: "select2",
                            dropdownParent: '#edit-modal',
                            ajax: {
                                useBearer: true,
                                term: 'search',
                                response: {id: 'id', text: 'label'},
                                initList: {
                                    url: '/table/organizations',
                                    key: 'organization_id',
                                    response: {id: 'id', text: 'name'},
                                },
                                url: appUrl + '/table/organizations',
                                urlParams: [{key: 'id', value: 'id'}]
                            }
                        },
                        { name: "name", label: "Name", type: "text"},
                        { name: "admin_price", label: "Admin Price", type: "number"},
                        { name: "account_number", label: "Account Number", type: "number"},
                        { name: "account_name", label: "Account Name", type: "text"},
                    ]
                },
                { label: 'Delete', type: 'delete', icon: 'trash', class:'text-danger', permission: "trx_payment_methods.delete"},
            ],

            columns: [
                { key: "name", label: "Name", sortable: true, searchable: true },
                { key: "admin_price", label: "Admin Price", type: 'currency', sortable: true, searchable: true },
                { key: "account_name", label: "Account Name", sortable: true, searchable: true },
                { key: "account_number", label: "Account Number", sortable: true, searchable: true },
                { key: "created_at", label: "Created At", sortable: true,type: "date" },
                { key: "updated_at", label: "Updated At", sortable: true,type: "date" },
            ],
        }
    }
}