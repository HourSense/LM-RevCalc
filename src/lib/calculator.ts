export interface CalculatorInputs {
  // Stage 1: Timekeeping
  feeEarners: number;
  avgRate: number;
  timesheetTime: number; // hours per week
  timesheetFrequency: 'Daily' | 'Weekly' | 'Monthly';
  fillTime: '<30min' | '30-60min' | '60min+';

  // Stage 2: Billing
  monthlyInvoices: number;
  peopleInvolved: number;
  partnerRate: number;

  // Stage 3: Client
  timeToInvoice: 'Within 1 week' | '2-4 weeks' | '1-2 months' | '2+ months';
}

export interface CalculatorResults {
  feeEarners: number;
  avgRate: number;
  totalOpportunity: number;
  utilizationGap: number;
  collectionImprovement: number;
  cashFlowImpact: number;
  partnerTimeSavings: number;
  adminTimeCost: number;
  equivalentAssociates: number;
  breakdown: {
    timeCaptureLeakage: number;
    adminWaste: number;
    preBillingInefficiency: number;
    collectionLoss: number;
    cashFlowCost: number;
  };
}

export function calculateResults(inputs: CalculatorInputs): CalculatorResults {
  const annualBillableHours = 1800;
  const workingWeeks = 48;

  // 1. Utilization Gap (Revenue Loss from Poor Time Capture)
  const leakageMap = {
    'Daily': 0.05,
    'Weekly': 0.20,
    'Monthly': 0.35
  };
  const leakagePercent = leakageMap[inputs.timesheetFrequency];
  const hoursLostPerPerson = annualBillableHours * leakagePercent;
  const utilizationGap = inputs.feeEarners * hoursLostPerPerson * inputs.avgRate;

  // 2. Administrative Time Cost
  const annualTimesheetHours = inputs.timesheetTime * workingWeeks;
  const totalAdminHours = inputs.feeEarners * annualTimesheetHours;
  const adminTimeCost = totalAdminHours * inputs.avgRate;

  // 3. Pre-Billing Cost & Partner Time Savings
  const hoursPerInvoice = inputs.peopleInvolved * 1; // 1 hour per person per invoice
  const annualInvoices = inputs.monthlyInvoices * 12;
  const annualPreBillingHours = annualInvoices * hoursPerInvoice;

  // 4. Partner Time Savings (if optimized to 0.25 hours per invoice)
  const optimizedHoursPerInvoice = 0.25;
  const hoursSavedPerInvoice = Math.max(0, hoursPerInvoice - optimizedHoursPerInvoice);
  const annualHoursSaved = annualInvoices * hoursSavedPerInvoice;
  const partnerTimeSavings = annualHoursSaved * inputs.partnerRate;

  // 5. Calculate total billable revenue (after time leakage)
  const annualBillableRevenue =
    inputs.feeEarners * annualBillableHours * inputs.avgRate * (1 - leakagePercent);

  // 6. Collection Improvement
  const collectionRateMap = {
    'Within 1 week': 0.90,
    '2-4 weeks': 0.87,
    '1-2 months': 0.84,
    '2+ months': 0.78
  };
  const currentCollectionRate = collectionRateMap[inputs.timeToInvoice];
  const topQuartileCollection = 0.90;
  const collectionImprovement = Math.max(0,
    annualBillableRevenue * (topQuartileCollection - currentCollectionRate)
  );

  // 7. Cash Flow Impact
  const daysToInvoiceMap = {
    'Within 1 week': 7,
    '2-4 weeks': 21,
    '1-2 months': 45,
    '2+ months': 75
  };
  const daysToInvoice = daysToInvoiceMap[inputs.timeToInvoice];
  const daysToCollect = 30; // Standard 30 days to collect after invoice
  const totalDSO = daysToInvoice + daysToCollect;
  const monthlyRevenue = annualBillableRevenue / 12;
  const wipOutstanding = monthlyRevenue * (totalDSO / 30);

  const topQuartileDSO = 37; // 7 days to invoice + 30 days to collect
  const topQuartileWIP = monthlyRevenue * (topQuartileDSO / 30);
  const workingCapitalFreed = Math.max(0, wipOutstanding - topQuartileWIP);
  const cashFlowImpact = workingCapitalFreed * 0.08; // 8% opportunity cost

  // Total Opportunity
  const totalOpportunity =
    utilizationGap +
    collectionImprovement +
    cashFlowImpact +
    partnerTimeSavings;

  // Additional metrics
  const equivalentAssociates = Math.floor(totalOpportunity / (inputs.avgRate * annualBillableHours));

  return {
    feeEarners: inputs.feeEarners,
    avgRate: inputs.avgRate,
    totalOpportunity: Math.round(totalOpportunity),
    utilizationGap: Math.round(utilizationGap),
    collectionImprovement: Math.round(collectionImprovement),
    cashFlowImpact: Math.round(cashFlowImpact),
    partnerTimeSavings: Math.round(partnerTimeSavings),
    adminTimeCost: Math.round(adminTimeCost),
    equivalentAssociates,
    breakdown: {
      timeCaptureLeakage: Math.round(utilizationGap),
      adminWaste: Math.round(adminTimeCost),
      preBillingInefficiency: Math.round(partnerTimeSavings),
      collectionLoss: Math.round(collectionImprovement),
      cashFlowCost: Math.round(cashFlowImpact),
    }
  };
}

// Helper function to format currency
export function formatCurrency(amount: number): string {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(amount);
}

// Helper function to calculate percentage increase
export function calculatePercentageIncrease(opportunity: number, currentRevenue: number): number {
  if (currentRevenue === 0) return 0;
  return Math.round((opportunity / currentRevenue) * 100);
}