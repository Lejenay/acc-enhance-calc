const averageTrialsCalc = (successRate: number): number =>
  successRate > 0 && successRate < 1
    ? parseFloat((1 / successRate).toFixed(2))
    : -1;

export default averageTrialsCalc;
