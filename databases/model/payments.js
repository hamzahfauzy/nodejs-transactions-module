import { getTable } from "#database/database.registry.js";
import { DataTypes } from "#database/database.sequelize.js";
import DatabaseService from "#database/database.service.js";
import { eventBus } from "#libs/eventBus.js";
import { formatDate } from "#libs/util.js";

const service = new DatabaseService()

const responseField = {
    id: {},
    code: { searchable: true },
    organization_name: {
        relation: true,
        searchable: true,
        value: 'organization.name'
    },
    invoice_code: {
        relation: true,
        searchable: true,
        value: 'invoice.code'
    },
    payment_method_name: {
        relation: true,
        searchable: true,
        value: 'paymentMethod.name'
    },
    organization_id: {},
    invoice_id: {},
    payment_method_id: {},
    invoice: {
        relation: true,
        as: 'invoice',
    },
    amount: {},
    date: {},
    status: {},
    description: {},
    record_type: {},
    created_at: {},
    updated_at: {},
    deleted_at: {}
}

async function updateWhenSuccess(payload){
    if(payload.invoice_id && payload.status == 'success')
    {
        const invoiceTable = getTable('trx_invoices')
        const invoice = await service.single(invoiceTable, payload.invoice_id)
        
        if(parseInt(payload.amount) == parseInt(invoice.remaining_amount))
        {
            await service.update(invoiceTable, payload.invoice_id, {
                status: 'success'
            })

            eventBus.emit('payment.success', {invoice})
        }
    }
}

async function updateWhenPending(payload){
    if(payload.invoice_id && payload.status != 'success')
    {
        const invoiceTable = getTable('trx_invoices')
        const invoice = await service.update(invoiceTable, payload.invoice_id, {
            status: 'pending'
        })

        eventBus.emit('payment.cancel', {payload, invoice})
    }
}

export default {

    name: 'trx_payments',

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

            ref_name: {
                type: DataTypes.STRING(100)
            },

            ref_id: {
                type: DataTypes.BIGINT.UNSIGNED
            },

            invoice_id: {
                type: DataTypes.BIGINT.UNSIGNED
            },

            organization_id: {
                type: DataTypes.BIGINT.UNSIGNED
            },

            payment_method_id: {
                type: DataTypes.BIGINT.UNSIGNED
            },

            code: {
                type: DataTypes.STRING(100)
            },

            amount: {
                type: DataTypes.DECIMAL(18,2)
            },

            date: {
                type: DataTypes.DATE,
                get() {
                    const value = this.getDataValue('date')
                    if (!value) return null

                    const date = new Date(value)

                    const formatted = date.toISOString().split('T')[0]

                    return formatDate(formatted, 'Y-m-d')
                }
            },

            description: {
                type: DataTypes.TEXT
            },

            metadata: {
                type: DataTypes.JSON
            },

            status: {
                type: DataTypes.ENUM('pending','success','failed','cancelled')
            },

            record_type: {
                type: DataTypes.STRING(50)
            },

            created_at: {
                type: DataTypes.DATE
            },

            updated_at: {
                type: DataTypes.DATE
            }

        },

        relations: [
            {
                modelName: 'organizations',
                type: 'belongsTo',
                as: 'organization',
                foreignKey: 'organization_id'
            },
            {
                modelName: 'trx_invoices',
                type: 'belongsTo',
                as: 'invoice',
                foreignKey: 'invoice_id'
            },
            {
                modelName: 'trx_payment_methods',
                type: 'belongsTo',
                as: 'paymentMethod',
                foreignKey: 'payment_method_id'
            },
        ],

        options: {
            tableName: 'trx_payments',
            timestamps: true,
            paranoid: true,
            createdAt: 'created_at',
            updatedAt: 'updated_at',
            deletedAt: 'deleted_at'
        }
    },

    permissions: [
        'trx_payments.list',
        'trx_payments.single',
        'trx_payments.create',
        'trx_payments.update',
        'trx_payments.delete'
    ],

    response: {
        list: responseField,
        single: responseField
    },

    events: {
        beforeCreate: async (context) => {
            const payload = {...context.payload}
            if(payload.invoice_id == "")
            {
                delete payload.invoice_id
            }
            
            await updateWhenSuccess(payload)

            return payload
        },
        beforeUpdate: async (context) => {
            const payload = {...context.payload}
            if(payload.invoice_id == "")
            {
                delete payload.invoice_id
            }

            await updateWhenSuccess(payload)
            await updateWhenPending(payload)

            return payload
        },
        beforeDelete: async context => {
            const row = {...context.data}
            row.status = 'cancelled'

            updateWhenPending(row)
        }
    }

}