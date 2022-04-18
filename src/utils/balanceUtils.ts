export function calcBalance(recharges: any[], transactions: any[]) {
    let totalRecharges = 0;
    let totalTransactions = 0;

    recharges.forEach((recharge) =>
        totalRecharges += recharge.amount
    );

    transactions.forEach((transaction) =>
        totalTransactions += transaction.amount
    );

    return totalRecharges - totalTransactions;
}