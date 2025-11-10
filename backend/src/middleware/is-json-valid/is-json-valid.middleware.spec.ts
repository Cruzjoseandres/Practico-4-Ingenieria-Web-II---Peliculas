import { IsJsonValidMiddleware } from './is-json-valid.middleware';

describe('IsJsonValidMiddleware', () => {
    it('should be defined', () => {
        expect(new IsJsonValidMiddleware()).toBeDefined();
    });
});
