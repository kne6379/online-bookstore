export const MESSAGES = {
  BOOK: {
    TITLE: {
      REQUIRED: '도서 제목을 입력해주세요.',
      INVALID_FORMAT: '도서 제목이 올바르지 않습니다.',
      LENGTH_EXCEEDED: '도서 제목은 최대 100자까지 입력할 수 있습니다.',
    },
    AUTHOR: {
      REQUIRED: '저자를 입력해주세요.',
      INVALID_FORMAT: '저자 정보가 올바르지 않습니다.',
      LENGTH_EXCEEDED: '저자 이름은 최대 50자까지 입력할 수 있습니다.',
    },
    PUBLISHER: {
      REQUIRED: '출판사를 입력해주세요.',
      INVALID_FORMAT: '출판사 정보가 올바르지 않습니다.',
      LENGTH_EXCEEDED: '출판사는 최대 100자까지 입력할 수 있습니다.',
    },
    DESCRIPTION: {
      REQUIRED: '도서 설명을 입력해주세요.',
      INVALID_FORMAT: '도서 설명이 올바르지 않습니다.',
    },
    CATEGORY: {
      REQUIRED: '도서 카테고리를 선택해주세요.',
      INVALID_FORMAT: '도서 카테고리가 올바르지 않습니다.',
    },
    PAGE_COUNT: {
      REQUIRED: '도서의 페이지 수를 입력해주세요.',
      INVALID_FORMAT: '도서의 페이지 수가 올바르지 않습니다.',
    },
    PRICE: {
      REQUIRED: '가격을 입력해주세요.',
      INVALID_FORMAT: '가격 정보가 올바르지 않습니다.',
    },
    RATING: {
      INVALID_FORMAT: '평점은 숫자여야 합니다.',
      MAX: '평점은 최대 5점까지 가능합니다.',
      MIN: '평점은 최소 0점이어야 합니다.',
    },
    STOCK_QUANTITY: {
      REQUIRED: '재고 수량을 입력해주세요.',
      INVALID_FORMAT: '재고 수량 정보가 올바르지 않습니다.',
    },
    PUBLICATION_DATE: {
      REQUIRED: '발행일자를 입력해주세요.',
      INVALID_FORMAT: '발행일자가 올바르지 않습니다.',
    },
    SUCCESS: {
      CREATED: '책이 성공적으로 등록되었습니다.',
      FOUND_ALL: '전체 도서 목록을 성공적으로 조회했습니다.',
      FOUND_ONE: '도서 상세 정보를 성공적으로 조회했습니다.',
      UPDATED: '도서 정보가 성공적으로 업데이트되었습니다.',
      DELETED: '도서가 성공적으로 삭제되었습니다.',
    },
    ERROR: {
      CREATED_FAILED: '도서를 등록하는 중 오류가 발생했습니다.',
      FIND_ALL_FAILED: '도서 목록을 불러오는 중 오류가 발생했습니다.',
      FIND_ONE_FAILED: '도서 상세 정보를 불러오는 중 오류가 발생했습니다.',
      UPDATE_FAILED: '도서 정보를 업데이트하는 중 오류가 발생했습니다.',
      DELETE_FAILED: '도서를 삭제하는 중 오류가 발생했습니다.',
    },
  },
};
