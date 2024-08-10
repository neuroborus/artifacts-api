import { HEADERS, SERVER, PREFIXES } from '@/config';
import { DepositItemResponse } from '@/entities/artifacts';

export async function depositItem(
  character: string,
  itemCode: string,
  itemQuantity: number,
): Promise<DepositItemResponse | null> {
  const url = SERVER + '/my/' + character + '/action/bank/deposit';
  const options = {
    method: 'POST',
    headers: HEADERS,
    body: `{"code":${itemCode},"quantity":${itemQuantity}}`,
  };

  try {
    const response = await fetch(url, options);
    const { data } = await response.json();
    console.log(
      PREFIXES[character] +
        `deposited items to bank (${itemCode} [${itemQuantity}])`,
    );
    return data as DepositItemResponse;
  } catch (error) {
    console.error(PREFIXES[character] + error);
  }
  return null;
}
