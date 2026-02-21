/**
 * Standard structure for all API responses.
 * @template T - The type of the data payload.
 */
export interface ApiResponse<T = any> {
  /** Indicates whether the operation was successful. */
  success: boolean;
  /** Optional message describing the operation result. */
  message?: string;
  /** The actual payload returned on success. */
  data?: T;
  /** Error information returned on failure. */
  error?: {
    /** A machine-readable error code. */
    code: string;
    /** A human-readable error message. */
    message: string;
    /** Optional detailed information about the error. */
    details?: any;
  };
  /** Additional metadata about the response. */
  metadata: {
    /** ISO 8601 timestamp of the response generation. */
    timestamp: string;
    /** Current version of the API. */
    version: string;
  };
}

/**
 * Creates a successful API response object.
 * 
 * @param data - The data payload to return.
 * @param message - An optional status message.
 * @returns A formatted {@link ApiResponse} object.
 */
export const successResponse = <T>(data: T, message?: string): ApiResponse<T> => ({
  success: true,
  message,
  data,
  metadata: {
    timestamp: new Date().toISOString(),
    version: '1.1.0'
  }
});

/**
 * Creates a failed API response object.
 * 
 * @param message - A human-readable error message.
 * @param code - A machine-readable error code.
 * @param details - Optional additional error context.
 * @returns A formatted {@link ApiResponse} object with the error information.
 */
export const errorResponse = (message: string, code: string = 'INTERNAL_ERROR', details?: any): ApiResponse => ({
  success: false,
  error: {
    code,
    message,
    details
  },
  metadata: {
    timestamp: new Date().toISOString(),
    version: '1.1.0'
  }
});
