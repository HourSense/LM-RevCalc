import * as React from 'react';

interface EmailTemplateProps {
    fullName: string;
    lawFirm: string;
    totalOpportunity: number;
    utilizationGap: number;
    collectionImprovement: number;
    cashFlowImpact: number;
    partnerTimeSavings: number;
}

export function EmailTemplate({
    fullName,
    lawFirm,
    totalOpportunity,
    utilizationGap,
    collectionImprovement,
    cashFlowImpact,
    partnerTimeSavings
}: EmailTemplateProps) {
    return (
        <div
            style={{
                fontFamily: "'Inter', -apple-system, BlinkMacSystemFont, sans-serif",
                lineHeight: '1.5',
                color: '#222222',
                background: '#ffffff',
                fontSize: '14px',
                maxWidth: '600px',
                margin: '0 auto',
                padding: '20px'
            }}>
            {/* Header */}
            <div
                style={{
                    paddingBottom: '1.5rem',
                    marginBottom: '2rem',
                    borderBottom: '1px solid #e5e7eb'
                }}>
                <h1
                    style={{
                        fontSize: '2rem',
                        fontWeight: '600',
                        color: '#222222',
                        marginBottom: '0.5rem',
                        textAlign: 'center'
                    }}>
                    Hi {fullName},
                </h1>
                <p
                    style={{
                        fontSize: '1rem',
                        color: '#6b7280',
                        fontWeight: '400',
                        textAlign: 'center'
                    }}>
                    Here's the billing efficiency analysis for {lawFirm}
                </p>
            </div>

            {/* Summary Box */}
            <div
                style={{
                    background: '#ffffff',
                    border: '1px solid #e5e7eb',
                    padding: '2rem',
                    margin: '2rem 0',
                    textAlign: 'center'
                }}>
                <div
                    style={{
                        fontSize: '3rem',
                        fontWeight: '700',
                        color: '#FF6F20',
                        marginBottom: '0.5rem'
                    }}>
                    ${totalOpportunity.toLocaleString()}
                </div>
                <div
                    style={{
                        fontSize: '1rem',
                        color: '#6b7280',
                        fontWeight: '500'
                    }}>
                    Total Annual Revenue Opportunity
                </div>
            </div>

            {/* Opportunity Breakdown */}
            <div style={{ marginBottom: '2rem' }}>
                <h2
                    style={{
                        fontSize: '1.5rem',
                        fontWeight: '600',
                        color: '#222222',
                        marginBottom: '1rem'
                    }}>
                    Opportunity Breakdown
                </h2>

                <div
                    style={{
                        display: 'grid',
                        gridTemplateColumns: 'repeat(2, 1fr)',
                        gap: '1rem',
                        margin: '1.5rem 0'
                    }}>
                    <div
                        style={{
                            background: '#ffffff',
                            padding: '1.25rem',
                            border: '1px solid #e5e7eb',
                            position: 'relative'
                        }}>
                        <div
                            style={{
                                fontSize: '0.75rem',
                                fontWeight: '500',
                                color: '#6b7280',
                                textTransform: 'uppercase',
                                letterSpacing: '0.05em',
                                marginBottom: '0.5rem',
                                background: '#f9fafb',
                                padding: '0.25rem 0.5rem',
                                display: 'inline-block'
                            }}>
                            UTILIZATION
                        </div>
                        <div
                            style={{
                                fontSize: '1.75rem',
                                fontWeight: '600',
                                color: '#222222',
                                marginBottom: '0.25rem'
                            }}>
                            ${utilizationGap.toLocaleString()}
                        </div>
                        <div
                            style={{
                                fontSize: '0.875rem',
                                color: '#6b7280',
                                fontWeight: '400'
                            }}>
                            Revenue Gap
                        </div>
                    </div>

                    <div
                        style={{
                            background: '#ffffff',
                            padding: '1.25rem',
                            border: '1px solid #e5e7eb',
                            position: 'relative'
                        }}>
                        <div
                            style={{
                                fontSize: '0.75rem',
                                fontWeight: '500',
                                color: '#6b7280',
                                textTransform: 'uppercase',
                                letterSpacing: '0.05em',
                                marginBottom: '0.5rem',
                                background: '#f9fafb',
                                padding: '0.25rem 0.5rem',
                                display: 'inline-block'
                            }}>
                            COLLECTIONS
                        </div>
                        <div
                            style={{
                                fontSize: '1.75rem',
                                fontWeight: '600',
                                color: '#222222',
                                marginBottom: '0.25rem'
                            }}>
                            ${collectionImprovement.toLocaleString()}
                        </div>
                        <div
                            style={{
                                fontSize: '0.875rem',
                                color: '#6b7280',
                                fontWeight: '400'
                            }}>
                            Improvement Potential
                        </div>
                    </div>

                    <div
                        style={{
                            background: '#ffffff',
                            padding: '1.25rem',
                            border: '1px solid #e5e7eb',
                            position: 'relative'
                        }}>
                        <div
                            style={{
                                fontSize: '0.75rem',
                                fontWeight: '500',
                                color: '#6b7280',
                                textTransform: 'uppercase',
                                letterSpacing: '0.05em',
                                marginBottom: '0.5rem',
                                background: '#f9fafb',
                                padding: '0.25rem 0.5rem',
                                display: 'inline-block'
                            }}>
                            CASH FLOW
                        </div>
                        <div
                            style={{
                                fontSize: '1.75rem',
                                fontWeight: '600',
                                color: '#222222',
                                marginBottom: '0.25rem'
                            }}>
                            ${cashFlowImpact.toLocaleString()}
                        </div>
                        <div
                            style={{
                                fontSize: '0.875rem',
                                color: '#6b7280',
                                fontWeight: '400'
                            }}>
                            Annual Impact
                        </div>
                    </div>

                    <div
                        style={{
                            background: '#ffffff',
                            padding: '1.25rem',
                            border: '1px solid #e5e7eb',
                            position: 'relative'
                        }}>
                        <div
                            style={{
                                fontSize: '0.75rem',
                                fontWeight: '500',
                                color: '#6b7280',
                                textTransform: 'uppercase',
                                letterSpacing: '0.05em',
                                marginBottom: '0.5rem',
                                background: '#f9fafb',
                                padding: '0.25rem 0.5rem',
                                display: 'inline-block'
                            }}>
                            PARTNER TIME
                        </div>
                        <div
                            style={{
                                fontSize: '1.75rem',
                                fontWeight: '600',
                                color: '#222222',
                                marginBottom: '0.25rem'
                            }}>
                            ${partnerTimeSavings.toLocaleString()}
                        </div>
                        <div
                            style={{
                                fontSize: '0.875rem',
                                color: '#6b7280',
                                fontWeight: '400'
                            }}>
                            Time Recovery Value
                        </div>
                    </div>
                </div>
            </div>

            <p
                style={{
                    fontSize: '16px',
                    color: '#6b7280',
                    lineHeight: '1.6',
                    margin: '20px 0'
                }}>
                Your detailed analysis is attached as a PDF. It includes benchmarks from the Clio Legal Trends Report
                and specific recommendations for your firm.
            </p>

            {/* CTA Section */}
            <div
                style={{
                    background: '#222222',
                    color: 'white',
                    padding: '2rem',
                    textAlign: 'center',
                    margin: '2rem 0'
                }}>
                <h3
                    style={{
                        fontSize: '1.5rem',
                        marginBottom: '1rem',
                        color: 'white'
                    }}>
                    Ready to Start Your Transformation?
                </h3>
                <p style={{ marginBottom: '1rem' }}>
                    See how firms like yours are achieving these results with HourSense
                </p>
                <a
                    href='https://cal.com/hoursense/intro'
                    style={{
                        display: 'inline-block',
                        background: '#FF6F20',
                        color: 'white',
                        padding: '0.75rem 2rem',
                        textDecoration: 'none',
                        fontWeight: '600',
                        fontSize: '1rem',
                        marginTop: '1rem'
                    }}>
                    Book a 15-Minute Demo
                </a>
            </div>

            {/* Footer */}
            <div
                style={{
                    borderTop: '1px solid #e5e7eb',
                    paddingTop: '1rem',
                    marginTop: '2rem',
                    fontSize: '0.75rem',
                    color: '#6b7280'
                }}>
                <p style={{ margin: '0 0 0.5rem 0' }}>
                    <strong>Methodology:</strong> All benchmarks sourced from{' '}
                    <a
                        href='https://www.clio.com/resources/legal-trends/benchmarks/'
                        style={{ color: '#FF6F20', textDecoration: 'none' }}>
                        Clio Legal Trends Report 2024
                    </a>
                </p>
                <p style={{ margin: '0', fontStyle: 'italic' }}>
                    P.S. - The report includes 3 quick wins you can implement this week, even without new software.
                </p>
            </div>
        </div>
    );
}
