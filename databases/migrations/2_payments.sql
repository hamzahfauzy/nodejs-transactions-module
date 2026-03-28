CREATE TABLE trx_payments (
    id BIGINT UNSIGNED AUTO_INCREMENT PRIMARY KEY,

    ref_name VARCHAR(100) NULL,
    ref_id BIGINT UNSIGNED NULL,

    invoice_id BIGINT UNSIGNED NULL,
    organization_id BIGINT UNSIGNED NULL,

    payment_method_id BIGINT UNSIGNED NOT NULL,

    code VARCHAR(100) NULL,

    amount DECIMAL(18,2) NOT NULL,

    date DATETIME NOT NULL,

    description TEXT NULL,

    metadata JSON NULL,

    status VARCHAR(50) DEFAULT 'pending',

    record_type VARCHAR(50) NULL,

    created_at TIMESTAMP NULL DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    deleted_at TIMESTAMP NULL,

    CONSTRAINT fk_payments_payment_method
        FOREIGN KEY (payment_method_id) REFERENCES trx_payment_methods(id),
    
    CONSTRAINT fk_payments_payment_invoice
        FOREIGN KEY (invoice_id) REFERENCES trx_invoices(id),

    CONSTRAINT fk_payments_payment_organization_id
        FOREIGN KEY (organization_id) REFERENCES organizations(id)
        ON DELETE CASCADE
);