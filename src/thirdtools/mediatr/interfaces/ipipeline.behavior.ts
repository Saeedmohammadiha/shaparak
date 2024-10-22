/**
 *  The pipeline behavior interface.
 *
 * @export
 * @interface IPipelineBehavior
 */

import type IRequest from '@Mediatr/interfaces/irequest.js';

// eslint-disable-next-line @typescript-eslint/ban-types
export default interface IPipelineBehavior {
	handle(request: IRequest<unknown>, next: () => unknown): Promise<unknown>;
}

export type IPipelineBehaviorClass = new (...args: unknown[]) => IPipelineBehavior;
