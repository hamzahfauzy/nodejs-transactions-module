const appUrl = process.env.APP_URL
export default {
    title: "Invoices",
    path: 'transactions/invoices',
    permission: "trx_invoices.list",
    content: {
        type: "crud",
        value: {
            endpoint: '/table/trx_invoices',
            create: { 
                label: 'Create', icon: 'plus', permission: "trx_invoices.create", title: "Create Invoice",
                modalClass: 'modal-xl',
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
                        name: "ref_name",
                        label: "Ref Type",
                        type: "select",
                        defaultValue: "people",
                        className: 'col-md-6',
                        options: [
                            { label: "People", value: "people" },
                            { label: "Organization", value: "organizations" },
                        ],
                    },
                    {
                        name: "ref_people_id",
                        label: "Reference",
                        type: "select2",
                        className: 'col-md-6',
                        dropdownParent: "#create-modal",
                        ajax: {
                            useBearer: true,
                            term: "search",
                            response: { id: "id", text: "full_name" },
                            url: appUrl + "/table/people",
                        },
                        show_if: {
                            field: "ref_name",
                            operator: "equals",
                            value: "people",
                        },
                    },
                    {
                        name: "ref_organization_id",
                        label: "Reference",
                        type: "select2",
                        className: 'col-md-6',
                        dropdownParent: "#create-modal",
                        ajax: {
                            useBearer: true,
                            term: "search",
                            response: { id: "id", text: "name" },
                            url: appUrl + "/table/organizations",
                            initList: {
                                url: "/table/organizations",
                                key: "organization_id",
                                response: { id: "id", text: "name" },
                            },
                        },
                        defaultValue: "organization_id",
                        defaultFrom: "queryParam",
                        show_if: {
                            field: "ref_name",
                            operator: "equals",
                            value: "organizations",
                        },
                    },
                    { name: "code", label: "Code", type: "text", className: 'col-md-6'},
                    { name: "due_date", label: "Due Date", type: "datePicker", className: 'col-md-6'},
                    { name: "status", label: "Status", type: "select", className: 'col-md-6', defaultValue: 'pending', options: [
                        { label: "Pending", value: "pending" },
                        { label: "Success", value: "success" },
                        { label: "Overdue", value: "overdue" },
                    ]},
                    { name: "record_type", label: "Record Type", type: "text", className: 'col-md-6'},
                    { name: "description", label: "Description", type: "textArea"},
                    {
                        name: 'items',
                        label: 'Items',
                        type: 'tableItems',
                        columns: [
                            {columnLabel: 'Name', name: 'name', type: 'text'},
                            {columnLabel: 'Qty', name: 'qty', type: 'number'},
                            {columnLabel: 'Unit', name: 'unit', type: 'text'},
                            {columnLabel: 'Price', name: 'price', type: 'number'},
                            {columnLabel: 'Subtotal', name: 'subtotal', type: 'number', formula: 'price*qty', props: {readonly: true}},
                            {columnLabel: 'Discount', name: 'discount', type: 'number'},
                            {columnLabel: 'Final Price', name: 'final_price', type: 'number', formula: 'subtotal-discount', props: {readonly: true}},
                        ]
                    }
                ]
            },
            actions: [
                { 
                    label: 'Print', type: 'link', icon: 'eye', permission: "trx_invoices.print", title: 'Print',
                    to: {value: 'invoice_url'}, 
                },
                { 
                    label: 'Detail', type: 'view', icon: 'eye', permission: "trx_invoices.single", title: 'Invoice Detail',
                    modalClass: "modal-lg",
                    fields: [
                        { name: "organization_name", label: "Organization", type: "text", className: 'col-md-6' },
                        { name: "code", label: "Code", type: "text", className: 'col-md-6' },
                        { name: "status", label: "Status", type: "status-badge", className: 'col-md-6', 
                            badge: {
                                color:{'success': 'success', 'pending': 'warning', 'overdue': 'danger'}, 
                                label:{'success':'Success', 'pending':'Pending', 'overdue': 'Overdue'}
                            }
                        },
                        { name: "total_price", label: "Total Price", type: "currency", className: 'col-md-6' },
                        { name: "discount_price", label: "Discount Price", type: "currency", className: 'col-md-6' },
                        { name: "tax_price", label: "Tax Price", type: "currency", className: 'col-md-6' },
                        { name: "final_price", label: "Final Price", type: "currency", className: 'col-md-6' },
                        { name: "total_paid", label: "Total Paid", type: "currency", className: 'col-md-6' },
                        { name: "remaining_amount", label: "Remaining Amount", type: "currency", className: 'col-md-6' },
                        { name: "record_type", label: "Record Type", type: "text", className: 'col-md-6' },
                        { name: "description", label: "Description", type: "text", className: 'col-md-6' },
                        { name: "created_at", label: "Created At", type: "date", className: 'col-md-6' },
                        { name: "updated_at", label: "Updated At", type: "date", className: 'col-md-6' },
                        {
                            name: 'items',
                            label: 'Items',
                            type: 'tableItems',
                            columns: [
                                {
                                    columnLabel: 'Item', name: 'name', type: 'html', 
                                    template: `<b>{{name}}</b><br><div class=""><span>{{qty}} {{unit}} x {{price_format}}</span></div>`
                                },
                                {columnLabel: 'Subtotal', name: 'subtotal', type: 'currency', className: 'text-end'},
                                {columnLabel: 'Discount', name: 'discount', type: 'currency', className: 'text-end'},
                                {columnLabel: 'Final Price', name: 'final_price', type: 'currency', className: 'text-end'},
                            ],
                            footer: [
                                {type: 'raw', value: 'Total'},
                                {type: 'currency', value: 'subtotal', formula: 'sum', className: 'text-end'},
                                {type: 'currency', value: 'discount', formula: 'sum', className: 'text-end'},
                                {type: 'currency', value: 'final_price', formula: 'sum', className: 'text-end'},
                            ]
                        }
                    ]
                },
                { 
                    label: 'Edit', type: 'edit', icon: 'edit-2', permission: "trx_invoices.update", title: "Edit Category", 
                    show_if: {field: 'status', operator: 'equals', value: 'pending'},
                    modalClass: 'modal-md',
                    fields: [
                        {
                            name: "organization_id",
                            label: "Organization",
                            type: "select2",
                            dropdownParent: "#edit-modal",
                            ajax: {
                                useBearer: true,
                                term: "search",
                                response: { id: "id", text: "label" },
                                initList: {
                                url: "/table/organizations",
                                key: "organization_id",
                                response: { id: "id", text: "name" },
                                },
                                url: appUrl + "/table/organizations",
                                urlParams: [{ key: "id", value: "id" }],
                            },
                        },
                        {
                            name: "ref_name",
                            label: "Ref Type",
                            type: "select",
                            defaultValue: "people",
                            className: 'col-md-6',
                            options: [
                                { label: "People", value: "people" },
                                { label: "Organization", value: "organizations" },
                            ],
                        },
                        {
                            name: "ref_people_id",
                            label: "Reference",
                            type: "select2",
                            className: 'col-md-6',
                            dropdownParent: "#edit-modal",
                            ajax: {
                                useBearer: true,
                                term: "search",
                                response: { id: "id", text: "full_name" },
                                url: appUrl + "/table/people",
                            },
                            show_if: {
                                field: "ref_name",
                                operator: "equals",
                                value: "people",
                            },
                        },
                        {
                            name: "ref_organization_id",
                            label: "Reference",
                            type: "select2",
                            className: 'col-md-6',
                            dropdownParent: "#edit-modal",
                            ajax: {
                                useBearer: true,
                                term: "search",
                                response: { id: "id", text: "name" },
                                url: appUrl + "/table/organizations",
                                initList: {
                                    url: "/table/organizations",
                                    key: "organization_id",
                                    response: { id: "id", text: "name" },
                                },
                            },
                            defaultValue: "organization_id",
                            defaultFrom: "queryParam",
                            show_if: {
                                field: "ref_name",
                                operator: "equals",
                                value: "organizations",
                            },
                        },
                        { name: "code", label: "Code", type: "text", className: 'col-md-6' },
                        { name: "due_date", label: "Due Date", type: "datePicker", className: 'col-md-6' },
                        {
                            name: "status",
                            label: "Status",
                            type: "select",
                            className: "col-md-6",
                            defaultValue: "active",
                            options: [
                                { label: "Pending", value: "pending" },
                                { label: "Success", value: "success" },
                                { label: "Overdue", value: "overdue" },
                            ],
                        },
                        { name: "record_type", label: "Record Type", type: "text", className: 'col-md-6'},
                        { name: "description", label: "Description", type: "textArea" },
                        
                    ]
                },
                { label: 'Delete', type: 'delete', icon: 'trash', class:'text-danger', permission: "trx_invoices.delete", show_if: {field: 'status', operator: 'equals', value: 'pending'}},
            ],

            columns: [
                { key: "code", label: "Code", sortable: true, searchable: true },
                { key: "due_date", label: "Due Date", sortable: true, searchable: true },
                { key: "reference.name", label: "Ref." },
                // { key: "total_price", label: "Total Price", type: 'currency', sortable: true, searchable: true },
                // { key: "tax_price", label: "Tax", type: 'currency',sortable: true, searchable: true },
                // { key: "discount_price", label: "Discount", type: 'currency', sortable: true, searchable: true },
                { key: "final_price", label: "Final Price", type: 'currency', sortable: true, searchable: true },
                { key: "total_paid", label: "Total Paid", type: 'currency' },
                { key: "remaining_amount", label: "Remaining Amount", type: 'currency' },
                { 
                    key: "status", label: "Status", sortable: true, searchable: true,
                    type: "status-badge", 
                    badge: {
                        color:{'success': 'success', 'pending': 'warning', 'overdue': 'danger'}, 
                        label:{'success':'Success', 'pending':'Pending', 'overdue': 'Overdue'}
                    }
                },
                { key: "record_type", label: "Record Type", sortable: true, searchable: true },
                { key: "created_at", label: "Created At", sortable: true,type: "date" },
                { key: "updated_at", label: "Updated At", sortable: true,type: "date" },
            ],
        }
    }
}