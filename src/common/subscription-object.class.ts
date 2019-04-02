import { Subscription } from 'rxjs';

export class SubscriptionObject {

    /**
     * Holds all the subscriptions.
     *
     * @private
     * @type {{ [key: string]: Subscription }}
     * @memberof SubscriptionObject
     */
    private subscriptions: { [key: string]: Subscription };

    /**
     * Creates an instance of SubscriptionObject.
     * @memberof SubscriptionObject
     */
    constructor() {
        this.subscriptions = {};
    }

    /**
     * Adds a new subscription to the `subscriptions` object of the `SubscriptionObject`.
     * The key must be unique.
     *
     * @param {string} key
     * @param {Subscription} subscription
     * @memberof SubscriptionObject
     */
    public register(key: string, subscription: Subscription): void {
        if (this.isKeyUnique(key)) {
            this.subscriptions[key] = subscription;
        } else {
            throw new Error('Key for subscription is not unique.');
        }
    }

    /**
     * Unsubscribes from one or all subscriptions in the `subscriptions` object.
     * Omitting an argument will unsubscribe from all;
     *
     * @param {string} [key]
     * @memberof SubscriptionObject
     */
    public unsubscribe(key?: string): void {
        if (key) {
            this.subscriptions[key].unsubscribe();
        } else {
            Object.values(this.subscriptions)
                .filter(sub => sub instanceof Subscription && typeof sub.unsubscribe === 'function')
                .forEach(sub => sub.unsubscribe());
        }
    }

    /**
     * Ensures duplicate keys are not used in `subscriptions` object.
     * 
     * @private
     * @param {string} key
     * @returns {boolean}
     * @memberof SubscriptionObject
     */
    private isKeyUnique(key: string): boolean {
        return !Object.keys(this.subscriptions).includes(key);
    }
}