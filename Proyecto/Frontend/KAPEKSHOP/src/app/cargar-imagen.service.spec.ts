import { TestBed } from '@angular/core/testing';

import { CargarImagenService } from './cargar-imagen.service';

describe('CargarImagenService', () => {
  let service: CargarImagenService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CargarImagenService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
