import axios from 'axios';
import { throttledGetDataFromApi } from './index';

jest.mock('axios');

describe('throttledGetDataFromApi', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });
  test('should create instance with provided base url', async () => {
    const relativePath = '/posts/1';
    const expectedResponse = { id: 1, title: 'Post Title' };

    (axios.create as jest.Mock).mockReturnValue({
      get: jest.fn().mockResolvedValue({ data: expectedResponse }),
    });

    const data = await throttledGetDataFromApi(relativePath);

    expect(data).toEqual(expectedResponse);
    expect(axios.create).toHaveBeenCalledWith({
      baseURL: 'https://jsonplaceholder.typicode.com',
    });
  });

  test('should perform request to correct provided url', async () => {
    // const relativePath = '/posts/1';
  });

  test('should return response data', async () => {
    const relativePath = '/posts/1';
    const expectedResponse = { id: 1, title: 'Post Title' };

    (axios.create as jest.Mock).mockReturnValue({
      get: jest.fn().mockResolvedValue({ data: expectedResponse }),
    });

    const data = await throttledGetDataFromApi(relativePath);

    expect(data).toEqual(expectedResponse);
  });
});
