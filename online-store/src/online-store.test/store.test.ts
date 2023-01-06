/**
 * @jest-environment jsdom
 */

import {
  checkCVV,
  checkCardNumber,
  checkCardValid,
  upperCaseFirstLetter
} from "../pages/Cart/modalWindow/modalWindow";
import { getMaxQuantityItem } from "../pages/Home/filterCard";
import { getUniqArr, clearArray } from "../pages/Home/sortAndSearch";
import { getButtonText } from "../components/ProductCard/homeCard";
import { getDiscountTotal } from "../pages/Cart/cart";
import { getPage } from "../routes/routes";

describe("CVV", () => {
  it("must consist of 3 characters", () => {
    const testCases = [
      { a: "10", expected: false },
      { a: "154", expected: true },
      { a: "9", expected: false },
    ];
    testCases.forEach(({ a, expected }) => {
      const result = checkCVV(a);
      expect(result).toEqual(expected);
    });
  });
});

describe("Card number", () => {
  it("must consist of 16 characters", () => {
    const testCases = [
      { a: "1000 5456 1544 3812", expected: true },
      { a: "15411236 14785236", expected: true },
      { a: "911 778 369 841", expected: false },
    ];
    testCases.forEach(({ a, expected }) => {
      const result = checkCardNumber(a);
      expect(result).toEqual(expected);
    });
  });
});

describe("Card valid", () => {
  it("the month should be no more than 12", () => {
    const testCases = [
      { a: "10/47", expected: true },
      { a: "25/35", expected: false },
      { a: "01/88", expected: true },
    ];
    testCases.forEach(({ a, expected }) => {
      const result = checkCardValid(a);
      expect(result).toEqual(expected);
    });
  });
  it("the year must be greater than or equal to 22", () => {
    const testCases = [
      { a: "10/17", expected: false },
      { a: "12/22", expected: true },
      { a: "01/47", expected: true },
    ];
    testCases.forEach(({ a, expected }) => {
      const result = checkCardValid(a);
      expect(result).toEqual(expected);
    });
  });
});

describe("Maximum quantity items", () => {
  it("the category should be 5", () => {
    const testCases = [
      { a: "category", b: "laptops", expected: 5 },
      { a: "category", b: "skincare", expected: 5 },
    ];
    testCases.forEach(({ a, b, expected }) => {
      const result = getMaxQuantityItem(a, b);
      expect(result).toEqual(expected);
    });
  });
  it("the brand should be 2", () => {
    const testCases = [
      { a: "brand", b: "Apple", expected: 2 },
      { a: "brand", b: "Samsung", expected: 2 },
    ];
    testCases.forEach(({ a, b, expected }) => {
      const result = getMaxQuantityItem(a, b);
      expect(result).toEqual(expected);
    });
  });
});

describe("UniqArr", () => {
  it("must contain only unique values", () => {
    const result = getUniqArr([1], [1, 2], [1, 2, 3], [4], [1, 2, 3, 4, 5]);
    const expected = [1, 2, 3, 4, 5];
    expect(result).toEqual(expected);
  });
});


describe("ClearArr", () => {
  it("must clear the array", () => {
    const testCases = [
        { a: [1, 2, 3], expected: 0 },
        { a: [], expected: 0 },
        { a: ['1', '2'], expected: 0 },
      ];
      testCases.forEach(({ a, expected }) => {
        const result = clearArray(a);
        expect(result).toEqual(expected);
      });
    });
});


describe("Function upperCaseFirstLetter", () => {
  it("must increase the case of the first letter of each word", () => {
    const testCases = [
        { a: 'alina', expected: 'Alina' },
        { a: 'Anna', expected: 'Anna' },
        { a: 'qwerty qwerty', expected: 'Qwerty Qwerty' },
      ];
      testCases.forEach(({ a, expected }) => {
        const result = upperCaseFirstLetter(a);
        expect(result).toEqual(expected);
      });
    });
});


describe("Button text", () => {
    it("there should be DROP FROM CART if the element is in the array, and ADD TO CART if not", () => {
        const testCases = [
            { a: [1, 2, 3], b: 1, expected: 'DROP FROM CART' },
            { a: [1, 2, 3], b: 4, expected: 'ADD TO CART' },
          ];
          testCases.forEach(({ a, b, expected }) => {
            const result = getButtonText(a, b);
            expect(result).toEqual(expected);
          });
        });
  });
  

describe("getDiscountTotal", () => {
    it("should return discount total", () => {
        const testCases = [
            { a: 100, b: 0.1, expected: 90 },
            { a: 100, b: 1, expected: 0 },
          ];
          testCases.forEach(({ a, b, expected }) => {
            const result = getDiscountTotal(a, b);
            expect(result).toEqual(expected);
          });
        });
  });


describe("getPage", () => {
    it("should return page in the form of '/...'", () => {
        const testCases = [
            { a: '', expected: '/' },
            { a: '/cart', expected: '/cart' },
            { a: '/product/1', expected: '/product' },
          ];
          testCases.forEach(({ a, expected }) => {
            const result = getPage(a);
            expect(result).toEqual(expected);
          });
        });
  });
  