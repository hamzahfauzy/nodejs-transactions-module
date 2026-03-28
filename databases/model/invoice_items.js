import { DataTypes } from "#database/database.sequelize.js";

const responseField = {
    id: {},
    invoice_id: {},
    name: { searchable: true },
    qty: {},
    unit: {},
    price: {},
    subtotal: {},
    final_price: {}
}

export default {

    name: 'trx_invoice_items',

    schema: {
        fields: {

            id: {
                type: DataTypes.BIGINT.UNSIGNED,
                primaryKey: true,
                autoIncrement: true
            },

            invoice_id: {
                type: DataTypes.BIGINT.UNSIGNED,
                allowNull: false
            },

            ref_name: {
                type: DataTypes.STRING(100)
            },

            ref_id: {
                type: DataTypes.BIGINT.UNSIGNED
            },

            name: {
                type: DataTypes.STRING(255)
            },

            qty: {
                type: DataTypes.DECIMAL(12,2),
                defaultValue: 1
            },

            unit: {
                type: DataTypes.STRING(50)
            },

            price: {
                type: DataTypes.DECIMAL(18,2)
            },

            discount: {
                type: DataTypes.DECIMAL(18,2),
                defaultValue: 0
            },

            subtotal: {
                type: DataTypes.DECIMAL(18,2)
            },

            final_price: {
                type: DataTypes.DECIMAL(18,2)
            },

            metadata: {
                type: DataTypes.JSON
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
                modelName: 'trx_invoices',
                type: 'belongsTo',
                as: 'invoice',
                foreignKey: 'invoice_id'
            }
        ],

        options: {
            tableName: 'trx_invoice_items',
            timestamps: true,
            createdAt: 'created_at',
            updatedAt: 'updated_at'
        }
    },

    permissions: [
        'trx_invoice_items.list',
        'trx_invoice_items.create',
        'trx_invoice_items.update',
        'trx_invoice_items.delete'
    ],

    response: {
        list: responseField,
        single: responseField
    }

}