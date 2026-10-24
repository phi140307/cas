import { timingSafeEqual } from 'node:crypto';

type TransactionWebhook = {
  webhookType: 'TRANSACTIONS';
  transaction: {
    id: string;
    transactionCode?: string;
    amount: number;
    paymentMeta?: { referenceNumber?: string };
  };
};

type SettlementStore = {
  settle(input: {
    referenceNumber: string;
    providerTransactionId: string;
    paidAmount: number;
    providerTransactionCode?: string;
  }): Promise<'completed' | 'already_completed' | 'amount_mismatch' | 'not_found'>;
};

export async function handleWebhook(
  rawBody: string,
  webhookToken: string,
  suppliedToken: string,
  store: SettlementStore,
) {
  if (!sameSecret(webhookToken, suppliedToken)) return { status: 401, body: { error: 'Unauthorized' } };

  const event = JSON.parse(rawBody) as Partial<TransactionWebhook>;
  if (event.webhookType !== 'TRANSACTIONS') return { status: 200, body: { status: 'ignored_event' } };

  const transaction = event.transaction;
  const referenceNumber = transaction?.paymentMeta?.referenceNumber?.trim();
  const paidAmount = Number(transaction?.amount);
  if (!transaction?.id || !referenceNumber || !Number.isFinite(paidAmount) || paidAmount <= 0) {
    return { status: 400, body: { error: 'Invalid transaction payload' } };
  }

  const result = await store.settle({
    referenceNumber,
    providerTransactionId: transaction.id,
    paidAmount,
    providerTransactionCode: transaction.transactionCode,
  });
  return { status: 200, body: { status: result } };
}

function sameSecret(expected: string, supplied: string) {
  const left = Buffer.from(expected);
  const right = Buffer.from(supplied);
  return Boolean(expected) && left.length === right.length && timingSafeEqual(left, right);
}
