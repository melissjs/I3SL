import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ActionSheetController } from 'ionic-angular';
import { ShoppingItem } from '../../models/shopping-item/shopping-item.interface';
import { AngularFireDatabase, FirebaseListObservable } from 'angularfire2/database';

@IonicPage()
@Component({
  selector: 'page-shopping-list',
  templateUrl: 'shopping-list.html',
})
export class ShoppingListPage {

  shoppingListRef$: FirebaseListObservable<ShoppingItem[]>;

  constructor(private navCtrl: NavController, private navParams: NavParams, private database: AngularFireDatabase, private actionSheetCtrl: ActionSheetController) {
    this.shoppingListRef$ = this.database.list('shopping-list');

    // this.shoppingListRef$.subscribe(x => console.log(x));
  }

  selectShoppingItem(shoppingItem: ShoppingItem) {
    this.actionSheetCtrl.create({
      title: `${shoppingItem.itemName}`,
      buttons: [
        {
          text: 'Edit',
          handler: () => {
            this.navCtrl.push('EditShoppingItemPage', {
              shoppingItemId: shoppingItem.$key
            });
            
          }
        }, 
        {
          text: 'Delete',
          role: 'destructive',
          handler: () => {
            this.shoppingListRef$.remove(shoppingItem.$key);
          }
        },
        {
            text: 'Cancel',
            role: 'cancel',
            handler: () => {
              console.log('User selected cancel');
            }
          },
      ]
    }).present();
  }

  navigateToAddShoppingPage() {
    this.navCtrl.push('AddShoppingPage');
  }

}
