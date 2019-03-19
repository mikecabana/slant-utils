import { Subscription } from 'rxjs';

export class SubscriptionCollection {

    /**
     * Holds all the subscriptions.
     *
     * @private
     * @type {{ [key: string]: Subscription }}
     * @memberof SubscriptionCollection
     */
    private subscriptions: { [key: string]: Subscription };

    constructor() {
        this.subscriptions = {};
    }

    /**
     * Adds a new subscription to the `subscriptions` object of the `SubscriptionsCollection`.
     *
     * @param {string} key
     * @param {Subscription} subscription
     * @memberof SubscriptionCollection
     */
    public add(key: string, subscription: Subscription): void {
        if (this.isKeyUnique(key)) {
            this.subscriptions[key] = subscription;
        } else {
            throw new Error('Key for subscription is not unique.');
        }
    }

    /**
     * Unsubscribes from one or all subscriptions in the `subscriptions` object.
     *
     * @param {string} [key]
     * @memberof SubscriptionCollection
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
     * @memberof SubscriptionCollection
     */
    private isKeyUnique(key: string): boolean {
        return !Object.keys(this.subscriptions).includes(key);
    }
}