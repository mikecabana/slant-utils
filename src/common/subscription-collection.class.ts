import { Subscription } from 'rxjs';

export class SubscriptionCollection {
  /**
   * Holds all the subscriptions.
   *
   * @private
   * @type {Subscription[]}
   * @memberof SubscriptionCollection
   */
  private subscriptions: Subscription[];

  /**
   * Creates an instance of SubscriptionCollection.
   * @param {Subscription[]} _subscriptions
   * @memberof SubscriptionCollection
   */
  constructor(_subscriptions: Subscription[]) {
    if (typeof _subscriptions !== 'undefined' && _subscriptions !== undefined) {
      this.subscriptions = _subscriptions;
    } else {
      this.subscriptions = [];
    }
  }

  /**
   * Adds a new subscription to the `subscriptions` object of the `SubscriptionCollection`.
   * The key must be unique.
   *
   * @param {(Subscription | Array<Subscription>)} items
   * @memberof SubscriptionCollection
   */
  public register(items: Subscription | Array<Subscription>): void {
    if (items instanceof Array) {
      this.subscriptions.concat(items);
    } else {
      this.subscriptions.push(items);
    }
  }

  /**
   * Unsubscribe from all subscriptions.
   *
   * @memberof SubscriptionCollection
   */
  public unsubscribe(): void {
    this.subscriptions.forEach(sub => sub.unsubscribe());
    this.subscriptions = [];
  }
}
