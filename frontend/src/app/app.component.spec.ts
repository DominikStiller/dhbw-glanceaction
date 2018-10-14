import { TestBed, async } from '@angular/core/testing';
import { FormsModule } from '@angular/forms';
import { AppComponent } from './app.component';
import { Router } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';

describe('AppComponent', () => {
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [AppComponent],
      imports: [FormsModule, RouterTestingModule],
    }).compileComponents();
  }));

  it('should create the app', async(() => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.debugElement.componentInstance;
    expect(app).toBeTruthy();
  }));

  it('should have a navbar with search', async(() => {
    const fixture = TestBed.createComponent(AppComponent);
    fixture.detectChanges();
    const compiled = fixture.debugElement.nativeElement;

    const nav = compiled.querySelector('nav');
    expect(nav).toBeTruthy();

    const search = nav.querySelector('input[type=search]');
    expect(search).toBeTruthy();
    expect(search.classList).toContain('form-control');
  }));
});
