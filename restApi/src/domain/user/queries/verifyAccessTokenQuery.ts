import { VerifyAccessTokenQueryPayload } from './payloads/verifyAccessTokenQueryPayload.js';
import { VerifyAccessTokenQueryResult } from './payloads/verifyAccessTokenQueryResult.js';

export interface VerifyAccessTokenQuery {
  verifyAccessToken(input: VerifyAccessTokenQueryPayload): Promise<VerifyAccessTokenQueryResult>;
}
