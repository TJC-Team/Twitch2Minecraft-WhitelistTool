import { BaseApi } from '../../BaseApi';
import { HelixPaginatedRequest } from '../HelixPaginatedRequest';
import type { HelixPaginatedResult } from '../HelixPaginatedResult';
import type { HelixPagination } from '../HelixPagination';
import type { HelixExtensionTransactionData } from './HelixExtensionTransaction';
import { HelixExtensionTransaction } from './HelixExtensionTransaction';
/**
 * Filters for the extension transactions request.
 */
interface HelixExtensionTransactionsFilter {
    transactionIds?: string[];
}
/**
 * @inheritDoc
 */
interface HelixExtensionTransactionsPaginatedFilter extends HelixExtensionTransactionsFilter, HelixPagination {
}
/**
 * The Helix API methods that deal with extensions.
 *
 * Can be accessed using `client.helix.extensions` on an {@ApiClient} instance.
 *
 * ## Example
 * ```ts
 * const api = new ApiClient(new StaticAuthProvider(clientId, accessToken));
 * const transactions = await api.helix.extionsions.getExtensionTransactions('abcd');
 * ```
 */
export declare class HelixExtensionsApi extends BaseApi {
    /**
     * Retrieves a list of transactions for the given extension.
     *
     * @param extensionId The ID of the extension to retrieve transactions for.
     * @param filter Additional filters.
     */
    getExtensionTransactions(extensionId: string, filter?: HelixExtensionTransactionsPaginatedFilter): Promise<HelixPaginatedResult<HelixExtensionTransaction>>;
    /**
     * Creates a paginator for transactions for the given extension.
     *
     * @param extensionId The ID of the extension to retrieve transactions for.
     * @param filter Additional filters.
     */
    getExtensionTransactionsPaginated(extensionId: string, filter?: HelixExtensionTransactionsFilter): HelixPaginatedRequest<HelixExtensionTransactionData, HelixExtensionTransaction>;
}
export {};
