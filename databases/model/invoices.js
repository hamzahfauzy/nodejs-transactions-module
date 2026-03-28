import { getModel } from "#database/database.registry.js";
import { DataTypes } from "#database/database.sequelize.js";

const responseField = {
    id: {},
    organization_name: {
        relation: true,
        searchable: true,
        value: 'organization.name'
    },
    organization_id: { searchable: true },
    code: { searchable: true },
    due_date: {},
    status: { searchable: true },
    description: {},
    total_price: {},
    discount_price: {},
    discount_alias: {},
    tax_price: {},
    tax_alias: {},
    final_price: {},
    total_paid: {
        value: (row) => {
            const payments = row.payments || []

            const total = payments.reduce((sum, p) => {
                return sum + parseFloat(p.amount || 0)
            }, 0)

            return total.toFixed(2)
        }
    },

    remaining_amount: {
        value: (row) => {
            const finalPrice = parseFloat(row.final_price || 0)
            const payments = row.payments || []

            const totalPaid = payments.reduce((sum, p) => {
                return sum + parseFloat(p.amount || 0)
            }, 0)

            return (finalPrice - totalPaid).toFixed(2)
        }
    },
    payments: {
        relation: 'hasMany',
        as: 'payments',
        where: { status: 'success' },
        fields: {
            id: {},
            amount: {},
            status: {},
        }
    },
    record_type: { searchable: true },
    ref_name: {},
    ref_id: {},
    created_at: {},
    updated_at: {},
    deleted_at: {},
}

const singleResponseField = {
    ...responseField, 
    items: {
        relation: 'hasMany',
        model: 'trx_invoice_items',
        as: 'items',
        fields: {
            id: {},
            name: {},
            qty: {},
            unit: {},
            discount: {},
            price: {},
            price_format: {
                value: row => {
                    return parseInt(row.price).toLocaleString('id-ID')
                }
            },
            subtotal: {},
            subtotal_format: {
                value: row => {
                    return parseInt(row.subtotal).toLocaleString('id-ID')
                }
            },
            final_price: {}
        }
    }
}

export default {

    name: 'trx_invoices',

    schema: {
        fields: {

            id: {
                type: DataTypes.BIGINT.UNSIGNED,
                primaryKey: true,
                autoIncrement: true
            },

            organization_id: {
                type: DataTypes.BIGINT.UNSIGNED,
                allowNull: false
            },

            code: {
                type: DataTypes.STRING(100),
                allowNull: false
            },

            due_date: {
                type: DataTypes.DATE
            },

            status: {
                type: DataTypes.STRING(50)
            },

            description: {
                type: DataTypes.TEXT
            },

            total_price: {
                type: DataTypes.DECIMAL(18,2),
                defaultValue: 0
            },

            discount_price: {
                type: DataTypes.DECIMAL(18,2),
                defaultValue: 0
            },

            discount_alias: {
                type: DataTypes.STRING(100)
            },

            tax_price: {
                type: DataTypes.DECIMAL(18,2),
                defaultValue: 0
            },

            tax_alias: {
                type: DataTypes.STRING(100)
            },

            final_price: {
                type: DataTypes.DECIMAL(18,2),
                defaultValue: 0
            },

            record_type: {
                type: DataTypes.STRING(100)
            },

            ref_name: {
                type: DataTypes.STRING(100)
            },

            ref_id: {
                type: DataTypes.BIGINT.UNSIGNED
            },

            created_at: {
                type: DataTypes.DATE
            },

            updated_at: {
                type: DataTypes.DATE
            },

        },

        relations: [
            {
                modelName: 'organizations',
                type: 'belongsTo',
                as: 'organization',
                foreignKey: 'organization_id'
            },
            {
                modelName: 'trx_invoice_items',
                type: 'hasMany',
                as: 'items',
                foreignKey: 'invoice_id'
            },
            {
                modelName: 'trx_payments',
                type: 'hasMany',
                as: 'payments',
                foreignKey: 'invoice_id',
            }
        ],

        options: {
            tableName: 'trx_invoices',
            timestamps: true,
            paranoid: true,
            createdAt: 'created_at',
            updatedAt: 'updated_at',
            deletedAt: 'deleted_at'
        }
    },

    permissions: [
        'trx_invoices.list',
        'trx_invoices.create',
        'trx_invoices.update',
        'trx_invoices.single',
        'trx_invoices.delete'
    ],

    response: {
        list: responseField,
        single: singleResponseField
    },

    events: {
        afterCreate: async context => {
            const payload = {...context.payload}
            const items = payload.items

            var total_price = 0
        
            items.forEach(item => {
                const invoiceItem = getModel('trx_invoice_items')
                invoiceItem.create({
                    invoice_id: context.data.id,
                    name: item.name,
                    qty: item.qty,
                    unit: item.unit,
                    price: item.price,
                    discount: item.discount,
                    subtotal: item.qty*item.price,
                    final_price: (item.qty*item.price)-item.discount
                })

                total_price += (item.qty*item.price)-item.discount
            })

            var final_price = total_price - context.data.discount_price + context.data.tax_price

            await context.table.model.update({
                total_price,
                final_price
            }, { where: {id: context.data.id }})
            
        },
    }

}