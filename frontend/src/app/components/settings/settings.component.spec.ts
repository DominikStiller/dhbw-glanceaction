import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { RouterTestingModule } from '@angular/router/testing';

import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { of } from 'rxjs';

import { SettingsComponent } from './settings.component';
import { GlanceactionService } from '../../services/glanceaction.service';
import { Account, UpdateAccount } from '../../models/account';

describe('SettingsComponent', () => {
  let component: SettingsComponent;
  let fixture: ComponentFixture<SettingsComponent>;
  let glanceactionService;
  let createAccountSpy, updateAccountSpy;

  beforeEach(async(() => {
    glanceactionService = jasmine.createSpyObj('GlanceactionService', ['createAccount', 'updateAccount']);
    createAccountSpy = glanceactionService.createAccount.and.returnValue(of());
    updateAccountSpy = glanceactionService.updateAccount.and.returnValue(of());

    TestBed.configureTestingModule({
      declarations: [SettingsComponent],
      imports: [FormsModule, NgbModule, HttpClientModule, RouterTestingModule],
      providers: [
        { provide: GlanceactionService, useValue: glanceactionService },
      ],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SettingsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  describe('.createAccount()', () => {
    it('should call GlanceactionService.createAccount()', () => {
      component.createAccount();
      expect(createAccountSpy).toHaveBeenCalled();
    });
  });
  describe('.createAccount()', () => {
    it('should call GlanceactionService.updateAccount()', () => {
      const account: Account = {
        id: 1,
        name: 'test',
        initialBalance: 50,
      };
      const updateAccount: UpdateAccount = {
        name: 'test',
        initialBalance: 50,
      };

      component.updateAccount(account);
      expect(updateAccountSpy).toHaveBeenCalledWith(account, updateAccount);
    });
  });
});
