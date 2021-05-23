/**
 * @jest-environment jsdom
 */



import { pushToHistory } from '../scripts/router.js';
const router = {};

 describe('length test', () => {
    test('settings', () => {
        pushToHistory('settings'); 
        expect(history.length).toBe(2);
    });
  
    test('entry', () => {
        pushToHistory('entry', 1);  
        expect(history.length).toBe(3);
    });

    test('default', () => {
        pushToHistory('default');
        expect(history.length).toBe(4);
      });
  });
