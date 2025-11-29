CREATE TABLE IF NOT EXISTS signatures (
  id SERIAL PRIMARY KEY,
  signature_token UUID NOT NULL UNIQUE,
  document_id TEXT NOT NULL,
  document_hash TEXT NOT NULL,
  signer_id TEXT, -- user id or rut
  pin_hash TEXT NOT NULL,
  status TEXT NOT NULL DEFAULT 'pending', -- pending | signed | expired | failed
  created_at TIMESTAMP DEFAULT now(),
  expires_at TIMESTAMP,
  signed_at TIMESTAMP,
  ip_address TEXT,
  signed_pdf_path TEXT
);
