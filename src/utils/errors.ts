const OFFLINE_MESSAGE = 'Sem conexão com a internet.';

const NETWORK_ERROR_PATTERN =
  /network request failed|failed to fetch|fetch failed|networkerror|internet disconnected|not connected to the internet|enotfound|eai_again|econnrefused|err_internet_disconnected|offline/i;

function messageFrom(error: unknown): string | undefined {
  if (error instanceof Error) return error.message;
  if (
    typeof error === 'object' &&
    error !== null &&
    'message' in error &&
    typeof error.message === 'string'
  ) {
    return error.message;
  }
  if (typeof error === 'string') return error;
  return undefined;
}

export function friendlyError(error: unknown): string {
  const message = messageFrom(error)?.trim();
  if (message && NETWORK_ERROR_PATTERN.test(message)) return OFFLINE_MESSAGE;
  return message || 'Não foi possível concluir a operação. Tente novamente.';
}
