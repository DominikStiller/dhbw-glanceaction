import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';
import { GlanceactionService } from '../../services/glanceaction.service';
import { Account, UpdateAccount } from '../../models/account';
import { Category, UpdateCategory } from '../../models/category';

@Component({
  selector: 'app-settings',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.scss'],
})
export class SettingsComponent implements OnInit {

  newAccountName;
  newAccountInitialBalance;

  newCategoryName;
  newCategoryColor;

  constructor(public g: GlanceactionService,
              public location: Location) {
    this.resetNewAccount();
    this.resetNewCategory();
  }

  ngOnInit() {
  }

  createAccount() {
    this.g.createAccount({
      name: this.newAccountName,
      initialBalance: this.newAccountInitialBalance,
    }).subscribe(() => {
      this.resetNewAccount();
    });
  }

  updateAccount(a: Account) {
    const update: UpdateAccount = {
      name: a.name,
      initialBalance: a.initialBalance,
    };
    this.g.updateAccount(a, update).subscribe(() => alert('Account has been updated successfully.'));
  }

  deleteAccount(a: Account) {
    if (confirm(`Do you really want to delete the account "${a.name}"?\nAll associated transactions will be deleted as well!`)) {
      this.g.deleteAccount(a).subscribe();
    }
  }

  private resetNewAccount() {
    this.newAccountName = '';
    this.newAccountInitialBalance = null;
  }

  createCategory() {
    this.g.createCategory({
      name: this.newCategoryName,
      color: this.newCategoryColor,
    }).subscribe(() => {
      this.resetNewCategory();
    });
  }

  updateCategory(c: Category) {
    const update: UpdateCategory = {
      name: c.name,
      color: c.color,
    };
    this.g.updateCategory(c, update).subscribe(() => alert('Category has been updated successfully.'));
  }

  deleteCategory(c: Account) {
    if (confirm(`Do you really want to delete the category "${c.name}"?`)) {
      this.g.deleteCategory(c).subscribe();
    }
  }

  private resetNewCategory() {
    this.newCategoryName = '';
    this.newCategoryColor = '#ffffff';
  }
}
