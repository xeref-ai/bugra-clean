
export class ApiError extends Error {
  statusCode: number;

  constructor(message: string, statusCode: number) {
    super(message);
    this.name = 'ApiError';
    this.statusCode = statusCode;
  }
}

export class FetchError extends ApiError {
  constructor(url: string, status: number, statusText: string) {
    super(`Failed to fetch URL: ${url}. Status: ${status} ${statusText}`, 500);
    this.name = 'FetchError';
  }
}

export class ContentExtractionError extends ApiError {
  constructor(url: string) {
    super(`Failed to extract content from URL: ${url}. The page might be empty or not an article.`, 422); // 422 Unprocessable Entity
    this.name = 'ContentExtractionError';
  }
}
