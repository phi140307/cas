type ExchangeResponse = {
  requestId: string;
  accessToken: string;
  grantId: string;
};

export async function exchangePublicToken(publicToken: string): Promise<ExchangeResponse> {
  const baseUrl = process.env.CAS_ENV === 'production'
    ? 'https://production.bankhub.dev'
    : 'https://sandbox.bankhub.dev';

  const response = await fetch(`${baseUrl}/grant/exchange`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'X-BankHub-Api-Version': '2023-01-01',
      'x-client-id': requiredEnv('CAS_CLIENT_ID'),
      'x-secret-key': requiredEnv('CAS_SECRET_KEY'),
    },
    body: JSON.stringify({ publicToken }),
    signal: AbortSignal.timeout(20_000),
  });

  const payload = await response.json();
  if (!response.ok || !payload.accessToken) {
    throw new Error(`Cannot exchange public token: ${payload.errorMessage || response.status}`);
  }
  return payload as ExchangeResponse;
}

function requiredEnv(name: string) {
  const value = process.env[name]?.trim();
  if (!value) throw new Error(`${name} is required`);
  return value;
}
