import { Api } from './api.entity';

describe('Api entity class', () => {
  it('makes class with no fields', () => {
    const api = new Api();
    expect(api).toBeTruthy();
    expect(api.id).toBe(undefined);
    expect(api.lat).toBe(undefined);
    expect(api.lon).toBe(undefined);
    expect(api.exclude).toBe(undefined);
    expect(api.response).toBe(undefined);
    expect(api.dateCreated).toBe(undefined);
  });
});
