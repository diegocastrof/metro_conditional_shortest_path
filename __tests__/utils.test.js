import exampleRed from '../src/red';
import { sanitazeRed } from '../src/utils/utils';

describe('sanitazeRed', () => {
	describe('when train has color', () => {
		const sanitazedRed = sanitazeRed(exampleRed, 'red');

		it('should return an object', () => {
			expect(sanitazedRed instanceof Object).toBe(true);
		});

		it('should remove stations with different color than train color', () => {
			expect(sanitazedRed).not.toHaveProperty('I');
			expect(sanitazedRed).not.toHaveProperty('C');
			expect(sanitazedRed).not.toHaveProperty('G');
		});

		it('should keep stations with same color than train color', () => {
			expect(sanitazedRed).toHaveProperty('H');
		});

		it('should keep stations without any color defined', () => {
			expect(sanitazedRed).toHaveProperty('A');
			expect(sanitazedRed).toHaveProperty('B');
			expect(sanitazedRed).toHaveProperty('D');
			expect(sanitazedRed).toHaveProperty('E');
			expect(sanitazedRed).toHaveProperty('F');
		});

		it('should rearrenge station edges after removing stations', () => {
			expect(sanitazedRed['A'].sort()).toEqual(['B'].sort());
			expect(sanitazedRed['B'].sort()).toEqual(['A', 'D', 'H'].sort());
			expect(sanitazedRed['D'].sort()).toEqual(['B', 'E', 'H'].sort());
			expect(sanitazedRed['E'].sort()).toEqual(['D', 'F'].sort());
			expect(sanitazedRed['F'].sort()).toEqual(['E', 'H'].sort());
			expect(sanitazedRed['H'].sort()).toEqual(['B', 'D', 'F'].sort());
		});
	});

	describe('when train has no color', () => {
		const sanitazedRed = sanitazeRed(exampleRed);

		it('should return an object', () => {
			expect(sanitazedRed instanceof Object).toBe(true);
		});

		it('should keep all the stations', () => {
			expect(sanitazedRed).toHaveProperty('A');
			expect(sanitazedRed).toHaveProperty('B');
			expect(sanitazedRed).toHaveProperty('C');
			expect(sanitazedRed).toHaveProperty('D');
			expect(sanitazedRed).toHaveProperty('E');
			expect(sanitazedRed).toHaveProperty('F');
			expect(sanitazedRed).toHaveProperty('G');
			expect(sanitazedRed).toHaveProperty('H');
			expect(sanitazedRed).toHaveProperty('I');
		});

		it('should keep the same conexions for stations', () => {
			expect(sanitazedRed['A'].sort()).toEqual(['B'].sort());
			expect(sanitazedRed['B'].sort()).toEqual(['A', 'C'].sort());
			expect(sanitazedRed['C'].sort()).toEqual(['B', 'D', 'G'].sort());
			expect(sanitazedRed['D'].sort()).toEqual(['C', 'E'].sort());
			expect(sanitazedRed['E'].sort()).toEqual(['D', 'F'].sort());
			expect(sanitazedRed['F'].sort()).toEqual(['E', 'I'].sort());
			expect(sanitazedRed['G'].sort()).toEqual(['C', 'H'].sort());
			expect(sanitazedRed['H'].sort()).toEqual(['G', 'I'].sort());
			expect(sanitazedRed['I'].sort()).toEqual(['H', 'F'].sort());
		});
	});
});
