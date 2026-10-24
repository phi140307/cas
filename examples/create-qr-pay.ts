type CreateQrPayInput = {
  amount: number;
  description: string;
  referenceNumber: string;
};

type QrPay = {
  bin: string;
  amount: number;
  description: string;
  accountNumber: string;
  accountName?: string;
  qrCode: string;
  referenceNumber: string;
  virtualAccountNumber: string;
};

type CreateQrPayResponse = {
  requestId: string;
  qrPay: QrPay;
};

export async function createQrPay(input: CreateQrPayInput): Promise<CreateQrPayResponse> {
  if (!Number.isInteger(input.amount) || input.amount <= 0) {
    throw new Error('amount must be a positive integer');
  }

  const baseUrl = process.env.CAS_ENV === 'production'
    ? 'https://production.bankhub.dev'
    : 'https://sandbox.bankhub.dev';

  const response = await fetch(`${baseUrl}/qr-pay`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'X-BankHub-Api-Version': '2023-01-01',
      'x-client-id': requiredEnv('CAS_CLIENT_ID'),
      'x-secret-key': requiredEnv('CAS_SECRET_KEY'),
      // Cas requires the raw token value, not "Bearer <token>".
      Authorization: requiredEnv('CAS_ACCESS_TOKEN'),
    },
    body: JSON.stringify(input),
    signal: AbortSignal.timeout(20_000),
  });

  const payload = await response.json();
  if (!response.ok || !payload.qrPay?.qrCode) {
    throw new Error(`Cannot create QR Pay: ${payload.errorMessage || response.status}`);
  }
  return payload as CreateQrPayResponse;
}

function requiredEnv(name: string) {
  const value = process.env[name]?.trim();
  if (!value) throw new Error(`${name} is required`);
  return value;
}
