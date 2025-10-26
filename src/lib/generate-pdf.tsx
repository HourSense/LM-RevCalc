
import React from 'react';
import { Document, Page, Text, View, StyleSheet, pdf } from '@react-pdf/renderer';
import { PDFDocument as PDFLib } from 'pdf-lib';
import fs from 'fs';
import path from 'path';

interface CalculatorResults {
    feeEarners: number;
    avgRate: number;
    totalOpportunity: number;
    utilizationGap: number;
    collectionImprovement: number;
    cashFlowImpact: number;
    partnerTimeSavings: number;
}

// React-PDF Styles
const styles = StyleSheet.create({
    page: {
        backgroundColor: '#ffffff',
        padding: 40,
        fontFamily: 'Helvetica',
        fontSize: 12,
        lineHeight: 1.5,
        color: '#222222'
    },
    header: {
        marginBottom: 20,
        borderBottomWidth: 1,
        borderBottomColor: '#e5e7eb',
        borderBottomStyle: 'solid',
        paddingBottom: 20
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        color: '#222222',
        marginBottom: 8,
    },
    subtitle: {
        fontSize: 14,
        color: '#6b7280'
    },
    summaryBox: {
        backgroundColor: '#ffffff',
        borderWidth: 1,
        borderColor: '#e5e7eb',
        borderStyle: 'solid',
        padding: 30,
        marginVertical: 20,
        textAlign: 'center',
        minHeight: 120
    },
    summaryAmount: {
        fontSize: 32,
        fontWeight: 'bold',
        color: '#FF6F20',
        marginBottom: 15,
        lineHeight: 1.2
    },
    summaryLabel: {
        fontSize: 16,
        color: '#6b7280',
        fontWeight: 'normal'
    },
    section: {
        marginBottom: 30
    },
    sectionTitle: {
        fontSize: 18,
        fontWeight: 'bold',
        color: '#222222',
        marginBottom: 15
    },
    metricsGrid: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginVertical: 20
    },
    metricCard: {
        backgroundColor: '#ffffff',
        borderWidth: 1,
        borderColor: '#e5e7eb',
        borderStyle: 'solid',
        padding: 15,
        width: '23%',
        minHeight: 120
    },
    metricLabel: {
        fontSize: 9,
        fontWeight: 'bold',
        color: '#6b7280',
        marginBottom: 8,
        backgroundColor: '#f9fafb',
        padding: 4
    },
    metricValue: {
        fontSize: 20,
        fontWeight: 'bold',
        color: '#222222',
        marginBottom: 4
    },
    metricDescription: {
        fontSize: 10,
        color: '#6b7280'
    },
    table: {
        marginVertical: 20
    },
    tableRow: {
        flexDirection: 'row',
        borderBottomWidth: 1,
        borderBottomColor: '#f3f4f6',
        borderBottomStyle: 'solid',
        paddingVertical: 8
    },
    tableHeader: {
        backgroundColor: '#f9fafb',
        fontWeight: 'bold',
        color: '#374151',
        paddingVertical: 12
    },
    tableCell: {
        width: '20%',
        paddingHorizontal: 8,
        fontSize: 10
    },
    benchmark: {
        backgroundColor: '#ffffff',
        borderWidth: 1,
        borderColor: '#e5e7eb',
        borderStyle: 'solid',
        padding: 20,
        marginBottom: 20
    },
    benchmarkTitle: {
        fontSize: 14,
        fontWeight: 'bold',
        color: '#222222',
        marginBottom: 10
    },
    benchmarkStats: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginVertical: 15
    },
    stat: {
        textAlign: 'center',
        width: '33%'
    },
    statValue: {
        fontSize: 16,
        fontWeight: 'bold',
        color: '#FF6F20',
        marginBottom: 4
    },
    statLabel: {
        fontSize: 8,
        color: '#6b7280'
    },
    benchmarkText: {
        fontSize: 10,
        color: '#6b7280',
        lineHeight: 1.4
    },
    cta: {
        backgroundColor: '#222222',
        color: 'white',
        padding: 30,
        textAlign: 'center',
        marginVertical: 20
    },
    ctaTitle: {
        fontSize: 18,
        fontWeight: 'bold',
        color: 'white',
        marginBottom: 10
    },
    ctaButton: {
        backgroundColor: '#FF6F20',
        color: 'white',
        padding: 12,
        fontSize: 12,
        fontWeight: 'bold',
        marginTop: 15
    },
    footer: {
        borderTopWidth: 1,
        borderTopColor: '#e5e7eb',
        borderTopStyle: 'solid',
        paddingTop: 15,
        marginTop: 30,
        fontSize: 9,
        color: '#6b7280'
    }
});

// React-PDF Document Component
const PDFDocument = ({ results }: { results: CalculatorResults }) => {
    const formatCurrency = (amount: number) => {
        return new Intl.NumberFormat('en-US', {
            style: 'currency',
            currency: 'USD',
            minimumFractionDigits: 0,
            maximumFractionDigits: 0,
        }).format(amount);
    };

    return (
        <Document>
            {/* Executive Summary Page */}
            <Page size="A4" style={styles.page}>
                <View style={styles.header}>
                    <Text style={styles.title}>Executive Summary</Text>
                    <Text style={styles.subtitle}>
                        Revenue optimization analysis for your {results.feeEarners}-attorney firm
                    </Text>
                </View>

                <View style={styles.summaryBox}>
                    <Text style={styles.summaryAmount}>{formatCurrency(results.totalOpportunity)}</Text>
                    <Text style={styles.summaryLabel}>Total Annual Revenue Opportunity</Text>
                </View>

                <View style={styles.section}>
                    <Text style={styles.sectionTitle}>Opportunity Breakdown</Text>
                    <View style={styles.metricsGrid}>
                        <View style={styles.metricCard}>
                            <Text style={styles.metricLabel}>UTILIZATION</Text>
                            <Text style={styles.metricValue}>{formatCurrency(results.utilizationGap)}</Text>
                            <Text style={styles.metricDescription}>Revenue Gap</Text>
                        </View>
                        <View style={styles.metricCard}>
                            <Text style={styles.metricLabel}>COLLECTIONS</Text>
                            <Text style={styles.metricValue}>{formatCurrency(results.collectionImprovement)}</Text>
                            <Text style={styles.metricDescription}>Improvement Potential</Text>
                        </View>
                        <View style={styles.metricCard}>
                            <Text style={styles.metricLabel}>CASH FLOW</Text>
                            <Text style={styles.metricValue}>{formatCurrency(results.cashFlowImpact)}</Text>
                            <Text style={styles.metricDescription}>Annual Impact</Text>
                        </View>
                        <View style={styles.metricCard}>
                            <Text style={styles.metricLabel}>PARTNER TIME</Text>
                            <Text style={styles.metricValue}>{formatCurrency(results.partnerTimeSavings)}</Text>
                            <Text style={styles.metricDescription}>Time Recovery Value</Text>
                        </View>
                    </View>
                </View>

                <View style={styles.section}>
                    <Text style={styles.sectionTitle}>Key Findings</Text>
                    <View style={styles.table}>
                        <View style={[styles.tableRow, styles.tableHeader]}>
                            <Text style={styles.tableCell}>Metric</Text>
                            <Text style={styles.tableCell}>Your Firm</Text>
                            <Text style={styles.tableCell}>Industry Avg</Text>
                            <Text style={styles.tableCell}>Top Quartile</Text>
                            <Text style={styles.tableCell}>Opportunity</Text>
                        </View>
                        <View style={styles.tableRow}>
                            <Text style={styles.tableCell}>Billable Utilization</Text>
                            <Text style={styles.tableCell}>~33%</Text>
                            <Text style={styles.tableCell}>33%</Text>
                            <Text style={styles.tableCell}>50%+</Text>
                            <Text style={styles.tableCell}>{formatCurrency(results.utilizationGap)}</Text>
                        </View>
                        <View style={styles.tableRow}>
                            <Text style={styles.tableCell}>Collection Rate</Text>
                            <Text style={styles.tableCell}>~84%</Text>
                            <Text style={styles.tableCell}>84%</Text>
                            <Text style={styles.tableCell}>90%+</Text>
                            <Text style={styles.tableCell}>{formatCurrency(results.collectionImprovement)}</Text>
                        </View>
                        <View style={styles.tableRow}>
                            <Text style={styles.tableCell}>Invoice Cycle</Text>
                            <Text style={styles.tableCell}>60+ days</Text>
                            <Text style={styles.tableCell}>45 days</Text>
                            <Text style={styles.tableCell}>7 days</Text>
                            <Text style={styles.tableCell}>{formatCurrency(results.cashFlowImpact)}</Text>
                        </View>
                        <View style={styles.tableRow}>
                            <Text style={styles.tableCell}>Admin Efficiency</Text>
                            <Text style={styles.tableCell}>Manual</Text>
                            <Text style={styles.tableCell}>Semi-auto</Text>
                            <Text style={styles.tableCell}>Automated</Text>
                            <Text style={styles.tableCell}>{formatCurrency(results.partnerTimeSavings)}</Text>
                        </View>
                    </View>
                </View>
            </Page>

            {/* Action Plan Page */}
            <Page size="A4" style={styles.page}>
                <View style={styles.header}>
                    <Text style={styles.title}>Your Action Plan</Text>
                    <Text style={styles.subtitle}>
                        Concrete steps to capture this {formatCurrency(results.totalOpportunity)} opportunity
                    </Text>
                </View>

                <View style={styles.benchmark}>
                    <Text style={styles.benchmarkTitle}>1. Billable Time Utilization</Text>
                    <View style={styles.benchmarkStats}>
                        <View style={styles.stat}>
                            <Text style={styles.statValue}>33%</Text>
                            <Text style={styles.statLabel}>Industry Avg</Text>
                        </View>
                        <View style={styles.stat}>
                            <Text style={styles.statValue}>50%</Text>
                            <Text style={styles.statLabel}>Top Quartile</Text>
                        </View>
                        <View style={styles.stat}>
                            <Text style={styles.statValue}>17%</Text>
                            <Text style={styles.statLabel}>Gap</Text>
                        </View>
                    </View>
                    <Text style={styles.benchmarkText}>
                        Your {results.feeEarners} fee earners likely work 40+ hours/week but only capture ~13 billable hours.
                        Top firms capture 20+ hours through better tracking and processes.
                    </Text>
                </View>

                <View style={styles.benchmark}>
                    <Text style={styles.benchmarkTitle}>2. Collection Realization</Text>
                    <View style={styles.benchmarkStats}>
                        <View style={styles.stat}>
                            <Text style={styles.statValue}>84%</Text>
                            <Text style={styles.statLabel}>Industry Avg</Text>
                        </View>
                        <View style={styles.stat}>
                            <Text style={styles.statValue}>90%</Text>
                            <Text style={styles.statLabel}>Top Quartile</Text>
                        </View>
                        <View style={styles.stat}>
                            <Text style={styles.statValue}>6%</Text>
                            <Text style={styles.statLabel}>Gap</Text>
                        </View>
                    </View>
                    <Text style={styles.benchmarkText}>
                        For every $100 billed, you likely collect $84. Top firms collect $90+ through
                        faster invoicing and better documentation.
                    </Text>
                </View>

                <View style={styles.cta}>
                    <Text style={styles.ctaTitle}>Ready to Start Your Transformation?</Text>
                    <Text style={{ color: 'white', marginBottom: 10 }}>
                        See how firms like yours are achieving these results with HourSense
                    </Text>
                    <Text style={styles.ctaButton}>Book a 15-Minute Demo</Text>
                </View>

                <View style={[styles.footer, { position: 'absolute', bottom: 20, left: 40, right: 40 }]}>
                    <Text>
                        Methodology: All benchmarks sourced from Clio Legal Trends Report 2024{'\n'}
                        Based on analysis of 100,000+ legal professionals | Report generated by HourSense
                    </Text>
                </View>
            </Page>
        </Document>
    );
};

export async function generatePDF(results: CalculatorResults): Promise<Buffer> {
    // Generate PDF using React-PDF (no browser needed!)
    const doc = <PDFDocument results={results} />;
    const asPdf = pdf(doc);
    const blob = await asPdf.toBlob();
    const arrayBuffer = await blob.arrayBuffer();
    const generatedPdfBytes = Buffer.from(arrayBuffer);

    // Load the first page PDF
    const firstPagePath = path.join(process.cwd(), 'public', 'first-page.pdf');
    const firstPageBytes = fs.readFileSync(firstPagePath);

    // Create a new PDF document to merge both PDFs
    const mergedPdf = await PDFLib.create();

    // Import pages from the first page PDF
    const firstPagePdf = await PDFLib.load(firstPageBytes);
    const firstPageIndices = firstPagePdf.getPageIndices();
    const firstPages = await mergedPdf.copyPages(firstPagePdf, firstPageIndices);

    // Add all pages from the first PDF
    firstPages.forEach((page: any) => mergedPdf.addPage(page));

    // Import pages from the generated PDF
    const generatedPdf = await PDFLib.load(generatedPdfBytes);
    const generatedPageIndices = generatedPdf.getPageIndices();
    const generatedPages = await mergedPdf.copyPages(generatedPdf, generatedPageIndices);

    // Add all pages from the generated PDF
    generatedPages.forEach((page: any) => mergedPdf.addPage(page));

    // Save the merged PDF
    const mergedPdfBytes = await mergedPdf.save();

    return Buffer.from(mergedPdfBytes);
}
