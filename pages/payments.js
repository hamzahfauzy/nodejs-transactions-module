const appUrl = process.env.APP_URL
export default {
    title: "Payments",
    path: 'transactions/payments',
    permission: "trx_payments.list",
    content: {
        type: "crud",
        value: {
            endpoint: '/table/trx_payments',
            create: { 
                label: 'Create', icon: 'plus', permission: "trx_payments.create", title: "Create Payment",
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
                    { 
                        name: "invoice_id", label: "Invoice", type: "select2",
                        dropdownParent: '#create-modal',
                        events: {
                            change: {
                                set: 'amount',
                                value: 'remaining_amount'
                            }
                        },
                        ajax: {
                            useBearer: true,
                            term: 'search',
                            response: {id: 'id', text: 'code'},
                            url: appUrl + '/table/trx_invoices',
                            urlParams: [{key: 'filters[status]', value: 'pending', type: 'raw'}]
                        }
                    },
                    { 
                        name: "payment_method_id", label: "Payment Method", type: "select2",
                        dropdownParent: '#create-modal',
                        ajax: {
                            useBearer: true,
                            term: 'search',
                            response: {id: 'id', text: 'name'},
                            url: appUrl + '/table/trx_payment_methods',
                        }
                    },
                    { name: "code", label: "Code", type: "text", className: 'col-md-6'},
                    { name: "amount", label: "Amount", type: "number", className: 'col-md-6'},
                    { name: "date", label: "Date", type: "datePicker", className: 'col-md-6'},
                    { 
                        name: "record_type", label: "Record Type", type: "select", className: 'col-md-6', defaultValue: 'IN', options: [
                            { label: "IN", value: "IN" },
                            { label: "OUT", value: "OUT" },
                        ]
                    },
                    { name: "description", label: "Description", type: "textArea"},
                    { name: "status", label: "Status", type: "select", defaultValue: 'success', options: [
                        { label: "Pending", value: "pending" },
                        { label: "Success", value: "success" },
                        { label: "Cancelled", value: "cancelled" },
                    ]},
                ]
            },
            actions: [
                { 
                    label: 'Detail', type: 'view', icon: 'eye', permission: "trx_payments.single", title: 'Payment Detail',
                    modalClass: "modal-lg",
                    fields: [
                        { name: "organization_name", label: "Organization", type: "text" },
                        { name: "invoice_code", label: "Invoice", type: "text", className: 'col-md-6' },
                        { name: "code", label: "Code", type: "text", className: 'col-md-6' },
                        { name: "amount", label: "Amount", type: "currency", className: 'col-md-6' },
                        { name: "payment_method_name", label: "Method", type: "text", className: 'col-md-6' },
                        { name: "date", label: "Date", type: "date", format: 'Y-m-d', className: 'col-md-6' },
                        { name: "status", label: "Status", type: "status-badge", className: 'col-md-6', 
                            badge: {
                                color:{'success': 'success', 'pending': 'warning', 'cancelled': 'danger'}, 
                                label:{'success':'Success', 'pending':'Pending', 'cancelled': 'Cancelled'}
                            }
                        },
                        { name: "record_type", label: "Record Type", type: "text", className: 'col-md-6' },
                        { name: "description", label: "Description", type: "text" },
                    ]
                },
                { 
                    label: 'Edit', type: 'edit', icon: 'edit-2', permission: "trx_payments.update", title: "Edit Payment",
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
                        { 
                            name: "invoice_id", label: "Invoice", type: "select2",
                            dropdownParent: '#edit-modal',
                            events: {
                                change: {
                                    set: 'amount',
                                    value: 'remaining_amount'
                                }
                            },
                            ajax: {
                                useBearer: true,
                                term: 'search',
                                response: {id: 'id', text: 'code'},
                                initList: {
                                    url: '/table/trx_invoices',
                                    key: 'invoice_id',
                                    response: {id: 'id', text: 'code'},
                                },
                                url: appUrl + '/table/trx_invoices',
                                urlParams: [{key: 'filters[status]', value: 'pending', type: 'raw'}]
                            }
                        },
                        { 
                            name: "payment_method_id", label: "Payment Method", type: "select2",
                            dropdownParent: '#edit-modal',
                            ajax: {
                                useBearer: true,
                                term: 'search',
                                response: {id: 'id', text: 'name'},
                                initList: {
                                    url: '/table/trx_payment_methods',
                                    key: 'payment_method_id',
                                    response: {id: 'id', text: 'name'},
                                },
                                url: appUrl + '/table/trx_payment_methods',
                            }
                        },
                        { name: "code", label: "Code", type: "text", className: 'col-md-6'},
                        { name: "amount", label: "Amount", type: "number", className: 'col-md-6'},
                        { name: "date", label: "Date", type: "datePicker", className: 'col-md-6'},
                        { 
                            name: "record_type", label: "Record Type", type: "select", className: 'col-md-6', defaultValue: 'IN', options: [
                                { label: "IN", value: "IN" },
                                { label: "OUT", value: "OUT" },
                            ]
                        },
                        { name: "description", label: "Description", type: "textArea"},
                        { name: "status", label: "Status", type: "select", defaultValue: 'success', options: [
                            { label: "Pending", value: "pending" },
                            { label: "Success", value: "success" },
                            { label: "Cancelled", value: "cancelled" },
                        ]},
                    ]
                },
                { label: 'Delete', type: 'delete', icon: 'trash', class:'text-danger', permission: "trx_payments.delete", show_if: {field: 'status', operator: 'not_equals', value: 'success'} },
            ],

            columns: [
                { key: "invoice_code", label: "Invoice Code" },
                { key: "code", label: "Code", sortable: true, searchable: true },
                { key: "payment_method_name", label: "Method", type: 'text' },
                { key: "amount", label: "Amount", type: 'currency', sortable: true, searchable: true },
                { key: "date", label: "Date", type: "date", format: "Y-m-d", sortable: true, searchable: true },
                { 
                    key: "status", label: "Status", sortable: true, searchable: true,
                    type: "status-badge", 
                    badge: {
                        color:{'success': 'success', 'pending': 'warning', 'cancelled': 'danger'}, 
                        label:{'success':'Success', 'pending':'Pending', 'cancelled': 'Cancelled'}
                    }
                },
                { key: "record_type", label: "Record Type", sortable: true, searchable: true },
                { key: "created_at", label: "Created At", sortable: true,type: "date" },
                { key: "updated_at", label: "Updated At", sortable: true,type: "date" },
            ],

            filters: [
                { key: "status", type: "options", label: "Status", placeholder: 'All Status', options: [
                    {label: 'Pending', value: 'pending'},
                    {label: 'Success', value: 'success'},
                    {label: 'Cancelled', value: 'cancelled'},
                ] },
            ]
        }
    }
}