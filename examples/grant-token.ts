type GrantTokenResponse = {
  requestId: string;
  grantToken: string;
  expiredAt: string;
};

function casBaseUrl() {
  return process.env.CAS_ENV === 'production'
    ? 'https://production.bankhub.dev'
    : 'https://sandbox.bankhub.dev';
}

export async function createQrPayGrant(redirectUri: string): Promise<GrantTokenResponse> {
  const response = await fetch(`${casBaseUrl()}/grant/token`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'X-BankHub-Api-Version': '2023-01-01',
      'x-client-id': requiredEnv('CAS_CLIENT_ID'),
      'x-secret-key': requiredEnv('CAS_SECRET_KEY'),
    },
    body: JSON.stringify({
      scopes: 'qrpay',
      language: 'vi',
      redirectUri,
    }),
    signal: AbortSignal.timeout(20_000),
  });

  const payload = await response.json();
  if (!response.ok || !payload.grantToken) {
    throw new Error(`Cannot create grant: ${payload.errorMessage || response.status}`);
  }
  return payload as GrantTokenResponse;
}

function requiredEnv(name: string) {
  const value = process.env[name]?.trim();
  if (!value) throw new Error(`${name} is required`);
  return value;
}
