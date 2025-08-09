import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CadastroContato } from './cadastro-contato';

describe('CadastroContato', () => {
  let component: CadastroContato;
  let fixture: ComponentFixture<CadastroContato>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CadastroContato]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CadastroContato);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
