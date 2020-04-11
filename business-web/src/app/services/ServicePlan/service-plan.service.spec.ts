import { TestBed } from '@angular/core/testing';

import { ServicePlanService } from './service-plan.service';

describe('ServicePlanService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: ServicePlanService = TestBed.get(ServicePlanService);
    expect(service).toBeTruthy();
  });
});
