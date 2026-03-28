CREATE TABLE trx_payment_methods (
    id BIGINT UNSIGNED AUTO_INCREMENT PRIMARY KEY,

    organization_id BIGINT UNSIGNED NOT NULL,

    name VARCHAR(150) NOT NULL,

    admin_price DECIMAL(18,2) DEFAULT 0,

    account_number VARCHAR(100) NULL,
    account_name VARCHAR(150) NULL,

    icon_url VARCHAR(255) NULL,

    created_at TIMESTAMP NULL DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    deleted_at TIMESTAMP NULL,

    CONSTRAINT fk_trx_payment_methods_organization_id
        FOREIGN KEY (organization_id) REFERENCES organizations(id)
        ON DELETE CASCADE
);

CREATE TABLE trx_invoices (
    id BIGINT UNSIGNED AUTO_INCREMENT PRIMARY KEY,

    organization_id BIGINT UNSIGNED NOT NULL,

    code VARCHAR(100) NOT NULL,

    due_date DATE NULL,

    status VARCHAR(50) DEFAULT 'pending',

    description TEXT NULL,

    total_price DECIMAL(18,2) DEFAULT 0,
    discount_price DECIMAL(18,2) DEFAULT 0,
    discount_alias VARCHAR(100) NULL,

    tax_price DECIMAL(18,2) DEFAULT 0,
    tax_alias VARCHAR(100) NULL,

    final_price DECIMAL(18,2) DEFAULT 0,

    record_type VARCHAR(50) NULL,

    ref_name VARCHAR(100) NULL,
    ref_id BIGINT UNSIGNED NULL,

    created_at TIMESTAMP NULL DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    deleted_at TIMESTAMP NULL,

    CONSTRAINT fk_trx_invoice_organization_id
        FOREIGN KEY (organization_id) REFERENCES organizations(id)
        ON DELETE CASCADE
);

CREATE TABLE trx_invoice_items (
    id BIGINT UNSIGNED AUTO_INCREMENT PRIMARY KEY,

    invoice_id BIGINT UNSIGNED NOT NULL,

    ref_name VARCHAR(100) NULL,
    ref_id BIGINT UNSIGNED NULL,

    metadata JSON NULL,

    name VARCHAR(255) NOT NULL,

    qty DECIMAL(12,2) DEFAULT 1,
    unit VARCHAR(50) NULL,

    price DECIMAL(18,2) DEFAULT 0,
    discount DECIMAL(18,2) DEFAULT 0,

    subtotal DECIMAL(18,2) DEFAULT 0,
    final_price DECIMAL(18,2) DEFAULT 0,

    created_at TIMESTAMP NULL DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    deleted_at TIMESTAMP NULL,

    CONSTRAINT fk_invoice_items_invoice
        FOREIGN KEY (invoice_id) REFERENCES trx_invoices(id)
        ON DELETE CASCADE
);