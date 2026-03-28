import { DataTypes } from "#database/database.sequelize.js";

const responseField = {
    id: {},
    name: { searchable: true },
    organization_id: {},
    admin_price: {},
    account_number: {},
    account_name: {},
    created_at: {},
    updated_at: {},
    deleted_at: {}
}

export default {

    name: 'trx_payment_methods',

    schema: {

        fields: {

            id: {
                type: DataTypes.BIGINT.UNSIGNED,
                primaryKey: true,
                autoIncrement: true
            },

            organization_id: {
                type: DataTypes.BIGINT.UNSIGNED
            },

            name: {
                type: DataTypes.STRING(100)
            },

            admin_price: {
                type: DataTypes.DECIMAL(18,2)
            },

            account_number: {
                type: DataTypes.STRING(100)
            },

            account_name: {
                type: DataTypes.STRING(100)
            },

            icon_url: {
                type: DataTypes.STRING(255)
            },

            created_at: {
                type: DataTypes.DATE
            },

            updated_at: {
                type: DataTypes.DATE
            }

        },

        options: {
            tableName: 'trx_payment_methods',
            timestamps: true,
            paranoid: true,
            createdAt: 'created_at',
            updatedAt: 'updated_at',
            deletedAt: 'deleted_at'
        }
    },

    permissions: [
        'trx_payment_methods.list',
        'trx_payment_methods.create',
        'trx_payment_methods.update',
        'trx_payment_methods.single',
        'trx_payment_methods.delete'
    ],

    response: {
        list: responseField,
        single: responseField
    }

}