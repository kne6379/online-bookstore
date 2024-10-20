# README

## 개발 환경 및 요구 사항

- **운영 체제**: macOS
- **패키지 매니저**: yarn
- **프레임워크**: NestJS

- **필수**:
  - Node.js (v14 이상)
  - MySQL (데이터베이스)
- **선택**:
  - NestJS CLI 

## 설치 방법

1. **Node.js 및 yarn 설치**
   ```bash
   sudo apt update
   sudo apt install curl
   curl -sL https://deb.nodesource.com/setup_14.x | sudo -E bash -
   sudo apt install -y nodejs
   npm install -g yarn
   ```

2. **NestJS 설치 (선택)**
   ```bash
   yarn global add @nestjs/cli
   ```

3. **프로젝트 복제 및 종속성 설치**
   ```bash
   git clone [프로젝트 URL]
   cd [프로젝트 폴더]
   yarn install
   ```

4. **환경 변수 설정**
   ```bash
   cp .env.example .env
   ```

## 실행 방법

1. **개발 서버 실행**
   ```bash
   yarn start:dev
   ```

2. **프로덕션 빌드 및 실행**
   ```bash
   yarn build
   yarn start:prod
   ```


## 주요 구현사항

#### 1. **캐시 처리**
   - NestJS `cache-manager`를 사용하여 조회 데이터를 캐시 처리
   - 도서 목록과 상세 정보 조회 시 자주 사용되는 데이터를 캐시로 저장하여 성능 최적화, DB 부하를 줄임

#### 2. **에러 처리**
   - Global Exception Filter 적용, API 응답에서 발생할 수 있는 예외 상황을 표준화된 메시지로 처리

#### 3. **무차별 공격 방지**
   - `@nestjs/throttler` 적용하여 요청 빈도를 제한함으로써 무차별 공격 방지

#### 4. **API 인터페이스 구조화**
   - API 응답 데이터를 `ApiResponse<T>`로 구조화하여 일관된 데이터 반환 구조를 유지

## API 명세서

- **배포 URL**: `http://stephenoeul.shop:3001/`

### 1. 도서 등록 API

- **URL**: `/api/books`
- **Method**: `POST`

#### Request Body (JSON)

```json
{
  "title": "작별하지 않는다",
  "author": "한강",
  "publisher": "문학동네",
  "description": "학살로 가족을 잃은 이는...",
  "category": "LITERATURE",
  "pageCount": 332,
  "price": 16800,
  "rating": 4.7,
  "stockQuantity": 100,
  "publicationDate": "2021-09-09"
}
```

---

### 2. 도서 목록 조회 API

- **URL**: `/api/books`
- **Method**: `GET`

#### Query Parameters

- `title`
- `author`

---

### 3. 도서 상세 조회 API

- **URL**: `/api/books/:id`
- **Method**: `GET`

---

### 4. 도서 삭제 API

- **URL**: `/api/books/:id`
- **Method**: `DELETE`

---

### 5. 도서 수정 API

- **URL**: `/api/books/:id`
- **Method**: `PUT`

#### Request Body (JSON)

```json
{
  "title": "작별하지 않는다",
  "author": "한강",
}
```

## ERD

- **id**: `int`
- **title**: `varchar(100)`
- **author**: `varchar(50)`
- **publisher**: `varchar(100)`
- **description**: `text`
- **category**: `enum`
- **pageCount**: `int`
- **price**: `int`
- **rating**: `decimal(2,1)`
- **stockQuantity**: `int`
- **publicationDate**: `date`
- **createdAt**: `timestamp`
- **updatedAt**: `timestamp`
