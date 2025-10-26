'use client';

import { CalculatorInputs, calculateResults, formatCurrency } from '@/lib/calculator';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/registry/new-york-v4/ui/card';

import ContactForm from './ContactForm';
import { Clock, DollarSign, Target, Users } from 'lucide-react';

interface ResultsDisplayProps {
    data: CalculatorInputs & {
        firstName?: string;
        fullName?: string;
        company?: string;
        email?: string;
    };
    isPreview?: boolean;
    onFormChange?: (data: any) => void;
    onSubmit?: () => void;
    isSubmitting?: boolean;
}

export default function ResultsDisplay({
    data,
    isPreview = false,
    onFormChange,
    onSubmit,
    isSubmitting
}: ResultsDisplayProps) {
    const results = calculateResults(data);

    const annualRevenue = data.feeEarners * 1800 * data.avgRate * 0.8; // Estimate current revenue
    const percentageIncrease = Math.round((results.totalOpportunity / annualRevenue) * 100);

    return (
        <div className='relative space-y-6'>
            {/* Main Opportunity */}
            <div className='rounded-lg border border-gray-200 bg-white p-6 text-center'>
                <div className='mb-2 text-3xl font-bold' style={{ color: '#FF6F20' }}>
                    {formatCurrency(results.totalOpportunity)}
                </div>
                <div className='mb-1 text-lg' style={{ color: '#6b7280' }}>
                    Total Annual Opportunity
                </div>
                <div className='text-sm' style={{ color: '#6b7280' }}>
                    {percentageIncrease}% potential revenue increase • Equivalent of {results.equivalentAssociates}{' '}
                    additional associates
                </div>
            </div>

            {/* Bottom Section with Overlay */}
            <div className='relative'>
                {/* Breakdown Cards */}
                <div className={`grid gap-4 md:grid-cols-2 lg:grid-cols-4 ${isPreview ? 'blur-sm' : ''}`}>
                    <div className='rounded-lg border bg-white p-4 text-center' style={{ borderColor: '#e5e7eb' }}>
                        <Clock className='mx-auto mb-2 h-8 w-8' style={{ color: '#FF6F20' }} />
                        <div className='font-semibold' style={{ color: '#222222' }}>
                            {formatCurrency(results.utilizationGap)}
                        </div>
                        <div className='text-sm' style={{ color: '#6b7280' }}>
                            Time Capture Gap
                        </div>
                    </div>

                    <div className='rounded-lg border bg-white p-4 text-center' style={{ borderColor: '#e5e7eb' }}>
                        <DollarSign className='mx-auto mb-2 h-8 w-8' style={{ color: '#FF6F20' }} />
                        <div className='font-semibold' style={{ color: '#222222' }}>
                            {formatCurrency(results.collectionImprovement)}
                        </div>
                        <div className='text-sm' style={{ color: '#6b7280' }}>
                            Collection Improvement
                        </div>
                    </div>

                    <div className='rounded-lg border bg-white p-4 text-center' style={{ borderColor: '#e5e7eb' }}>
                        <Users className='mx-auto mb-2 h-8 w-8' style={{ color: '#FF6F20' }} />
                        <div className='font-semibold' style={{ color: '#222222' }}>
                            {formatCurrency(results.partnerTimeSavings)}
                        </div>
                        <div className='text-sm' style={{ color: '#6b7280' }}>
                            Partner Time Savings
                        </div>
                    </div>

                    <div className='rounded-lg border bg-white p-4 text-center' style={{ borderColor: '#e5e7eb' }}>
                        <Target className='mx-auto mb-2 h-8 w-8' style={{ color: '#FF6F20' }} />
                        <div className='font-semibold' style={{ color: '#222222' }}>
                            {formatCurrency(results.cashFlowImpact)}
                        </div>
                        <div className='text-sm' style={{ color: '#6b7280' }}>
                            Cash Flow Impact
                        </div>
                    </div>
                </div>

                {/* Key Insights */}
                <div
                    className={`mt-6 rounded-lg p-4 ${isPreview ? 'blur-sm' : ''}`}
                    style={{ backgroundColor: '#f9fafb' }}>
                    <h4 className='mb-3 font-medium' style={{ color: '#222222' }}>
                        Key Insights:
                    </h4>
                    <div className='space-y-2 text-sm'>
                        {results.utilizationGap > 0 && (
                            <div className='flex items-start gap-2'>
                                <span
                                    className='mt-2 h-2 w-2 shrink-0 rounded-full'
                                    style={{ backgroundColor: '#FF6F20' }}></span>
                                <span style={{ color: '#374151' }}>
                                    Your {data.timesheetFrequency?.toLowerCase()} timesheet frequency is causing
                                    approximately <strong>{formatCurrency(results.utilizationGap)}</strong> in lost
                                    billable time annually
                                </span>
                            </div>
                        )}
                        {results.partnerTimeSavings > 0 && (
                            <div className='flex items-start gap-2'>
                                <span
                                    className='mt-2 h-2 w-2 shrink-0 rounded-full'
                                    style={{ backgroundColor: '#FF6F20' }}></span>
                                <span style={{ color: '#374151' }}>
                                    Streamlining your billing process could save{' '}
                                    <strong>
                                        {Math.round(results.partnerTimeSavings / data.partnerRate || 0)} partner hours
                                    </strong>{' '}
                                    annually
                                </span>
                            </div>
                        )}
                        {results.collectionImprovement > 0 && (
                            <div className='flex items-start gap-2'>
                                <span
                                    className='mt-2 h-2 w-2 shrink-0 rounded-full'
                                    style={{ backgroundColor: '#FF6F20' }}></span>
                                <span style={{ color: '#374151' }}>
                                    Faster invoicing could improve collection rates, recovering{' '}
                                    <strong>{formatCurrency(results.collectionImprovement)}</strong> in additional
                                    revenue
                                </span>
                            </div>
                        )}
                    </div>
                </div>

                {/* Overlay with Contact Form for Preview - Only covers bottom sections */}
                {isPreview && onFormChange && (
                    <div className='absolute inset-0 flex items-start justify-center'>
                        <div className='mx-4 w-full max-w-3xl'>
                            <Card className='border-2 border-orange-200 shadow-lg'>
                                <CardContent>
                                    <ContactForm
                                        data={data}
                                        onChange={onFormChange}
                                        onSubmit={onSubmit}
                                        isSubmitting={isSubmitting}
                                    />
                                </CardContent>
                            </Card>
                        </div>
                    </div>
                )}
            </div>

            {isPreview && (
                <div className='text-muted-foreground text-center text-sm'>
                    Complete all steps to get your full personalized report with detailed recommendations
                </div>
            )}
        </div>
    );
}
