import { SubscriptionCollection } from '../common';
import { BaseApplicationContext } from '../context';
export class BaseComponent {
  protected subscriptionCollection: SubscriptionCollection;
  constructor(protected context: BaseApplicationContext) {
    this.subscriptionCollection = new SubscriptionCollection([]);
  }
}
