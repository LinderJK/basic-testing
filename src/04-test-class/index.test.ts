import { getBankAccount } from '.';

describe('BankAccount', () => {
  test('should create account with initial balance', () => {
    const account = getBankAccount(500);
    expect(account.getBalance()).toBe(500);
  });

  test('should throw InsufficientFundsError error when withdrawing more than balance', () => {
    const balance = 500;
    const account = getBankAccount(balance);

    const message = `Insufficient funds: cannot withdraw more than ${balance}`;

    expect(() => account.withdraw(501)).toThrowError(message);
  });

  test('should throw error when transferring more than balance', () => {
    const balance = 50;
    const account1 = getBankAccount(balance);
    const account2 = getBankAccount(100);

    const message = `Insufficient funds: cannot withdraw more than ${balance}`;

    expect(() => account1.transfer(100, account2)).toThrow(message);
  });

  test('should throw error when transferring to the same account', () => {
    const account = getBankAccount(500);
    expect(() => account.transfer(500, account)).toThrowError(
      'Transfer failed',
    );
  });

  test('should deposit money', () => {
    const account = getBankAccount(500);
    account.deposit(100);
    expect(account.getBalance()).toBe(600);
  });

  test('should withdraw money', () => {
    const account = getBankAccount(500);
    account.withdraw(100);
    expect(account.getBalance()).toBe(400);
  });

  test('should transfer money', () => {
    const account1 = getBankAccount(500);
    const account2 = getBankAccount(100);
    account1.transfer(100, account2);
    expect(account1.getBalance()).toBe(400);
    expect(account2.getBalance()).toBe(200);
  });

  test('fetchBalance should return number in case if request did not failed', async () => {
    const account = getBankAccount(500);
    const balance = await account.fetchBalance();
    if (balance !== null) {
      expect(typeof balance).toBe('number');
    }
  });

  test('should set new balance if fetchBalance returned number', async () => {
    const account = getBankAccount(500);
    const fetchBalanceSpy = jest
      .spyOn(account, 'fetchBalance')
      .mockResolvedValue(200);

    await account.synchronizeBalance();
    expect(account.getBalance()).toBe(200);

    fetchBalanceSpy.mockRestore();
  });

  test('should throw SynchronizationFailedError if fetchBalance returned null', async () => {
    const account = getBankAccount(100);
    const fetchBalanceSpy = jest
      .spyOn(account, 'fetchBalance')
      .mockResolvedValue(null);

    await expect(account.synchronizeBalance()).rejects.toThrow(
      'Synchronization failed',
    );

    fetchBalanceSpy.mockRestore();
  });
});
