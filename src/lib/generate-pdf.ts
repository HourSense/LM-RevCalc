import { readFileSync } from 'fs';
import { join } from 'path';
import { PDFDocument } from 'pdf-lib';
import puppeteer from 'puppeteer';

interface CalculatorResults {
    feeEarners: number;
    avgRate: number;
    totalOpportunity: number;
    utilizationGap: number;
    collectionImprovement: number;
    cashFlowImpact: number;
    partnerTimeSavings: number;
}

function generateHTMLTemplate(results: CalculatorResults): string {
    return `
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Billing Efficiency Analysis</title>
    <style>
        @import url('https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&display=swap');

        * {
            margin: 0;
            padding: 0;
            box-sizing: border-box;
        }

        body {
            font-family: 'Inter', -apple-system, BlinkMacSystemFont, sans-serif;
            line-height: 1.5;
            color: #222222;
            background: #ffffff;
            font-size: 14px;
        }

        .page {
            width: 8.5in;
            min-height: 11in;
            padding: 0.75in;
            margin: 0 auto;
            background: white;
            page-break-after: always;
        }

        .page:last-child {
            page-break-after: avoid;
        }

        /* Clean header design like HourSense */
        .header {
            padding-bottom: 1.5rem;
            margin-bottom: 2rem;
            border-bottom: 1px solid #e5e7eb;
        }

        .header h1 {
            font-size: 2rem;
            font-weight: 600;
            color: #222222;
            margin-bottom: 0.5rem;
        }

        .header .subtitle {
            font-size: 1rem;
            color: #6b7280;
            font-weight: 400;
        }

        .section {
            margin-bottom: 2rem;
        }

        .section h2 {
            font-size: 1.5rem;
            font-weight: 600;
            color: #222222;
            margin-bottom: 1rem;
        }

        .section h3 {
            font-size: 1.25rem;
            font-weight: 600;
            color: #222222;
            margin-bottom: 0.75rem;
            margin-top: 1.5rem;
        }

        /* Clean card grid like HourSense dashboard */
        .metrics-grid {
            display: grid;
            grid-template-columns: repeat(4, 1fr);
            gap: 1rem;
            margin: 1.5rem 0;
        }

        .metric-card {
            background: #ffffff;
            padding: 1.25rem;
            border: 1px solid #e5e7eb;
            position: relative;
            display: flex;
            flex-direction: column;
        }

        .metric-card .label {
            font-size: 0.75rem;
            font-weight: 500;
            color: #6b7280;
            text-transform: uppercase;
            letter-spacing: 0.05em;
            margin-bottom: 0.5rem;
            background: #f9fafb;
            padding: 0.25rem 0.5rem;
            display: inline-block;
            align-self: flex-start;
        }

        .metric-card .value {
            font-size: 1.75rem;
            font-weight: 600;
            color: #222222;
            margin-bottom: 0.25rem;
            line-height: 1.1;
        }

        .metric-card .description {
            font-size: 0.875rem;
            color: #6b7280;
            font-weight: 400;
            line-height: 1.3;
            margin-top: auto;
        }

        /* Summary box */
        .summary-box {
            background: #ffffff;
            border: 1px solid #e5e7eb;
            padding: 2rem;
            margin: 2rem 0;
            text-align: center;
        }

        .summary-box .amount {
            font-size: 3rem;
            font-weight: 700;
            color: #FF6F20;
            margin-bottom: 0.5rem;
        }

        .summary-box .label {
            font-size: 1rem;
            color: #6b7280;
            font-weight: 500;
        }

        /* Data tables */
        .data-table {
            width: 100%;
            border-collapse: collapse;
            margin: 1.5rem 0;
            font-size: 0.875rem;
        }

        .data-table th {
            background: #f9fafb;
            padding: 0.75rem;
            text-align: left;
            font-weight: 600;
            color: #374151;
            border-bottom: 1px solid #e5e7eb;
        }

        .data-table th:nth-child(1) {
            text-align: left;
        }

        .data-table th:nth-child(2),
        .data-table th:nth-child(3),
        .data-table th:nth-child(4) {
            text-align: center;
        }

        .data-table th:nth-child(5) {
            text-align: right;
        }

        .data-table td {
            padding: 0.75rem;
            border-bottom: 1px solid #f3f4f6;
        }

        .data-table td:nth-child(1) {
            text-align: left;
        }

        .data-table td:nth-child(2),
        .data-table td:nth-child(3),
        .data-table td:nth-child(4) {
            text-align: center;
        }

        .data-table td:nth-child(5) {
            text-align: right;
        }

        .data-table tr:hover {
            background: #f9fafb;
        }

        /* Benchmark cards */
        .benchmark-card {
            background: #ffffff;
            border: 1px solid #e5e7eb;
            padding: 1.5rem;
            margin: 0;
            height: 100%;
            display: flex;
            flex-direction: column;
        }

        .benchmark-card .title {
            font-weight: 600;
            color: #222222;
            margin-bottom: 0.5rem;
        }

        .benchmark-card .stats {
            display: flex;
            justify-content: space-between;
            margin: 1rem 0;
            align-items: flex-start;
        }

        .benchmark-card .stat {
            text-align: center;
            flex: 1;
            display: flex;
            flex-direction: column;
            align-items: center;
        }

        .benchmark-card .stat-value {
            font-size: 1.5rem;
            font-weight: 700;
            color: #FF6F20;
            margin-bottom: 0.25rem;
            line-height: 1;
        }

        .benchmark-card .stat-label {
            font-size: 0.75rem;
            color: #6b7280;
            text-transform: uppercase;
            letter-spacing: 0.05em;
            text-align: center;
            line-height: 1.2;
            max-width: 100%;
            word-wrap: break-word;
        }

        .benchmark-card p {
            margin-top: 1rem;
            font-size: 0.875rem;
            color: #6b7280;
            line-height: 1.4;
            margin-bottom: 0;
        }

        /* CTA section */
        .cta-section {
            background: #222222;
            color: white;
            padding: 2rem;
            text-align: center;
            margin: 2rem 0;
        }

        .cta-section h3 {
            font-size: 1.5rem;
            margin-bottom: 1rem;
            color: white;
        }

        .cta-button {
            display: inline-block;
            background: #FF6F20;
            color: white;
            padding: 0.75rem 2rem;
            text-decoration: none;
            font-weight: 600;
            font-size: 1rem;
            margin-top: 1rem;
        }

        .footer {
            border-top: 1px solid #e5e7eb;
            padding-top: 1rem;
            margin-top: 2rem;
            font-size: 0.75rem;
            color: #6b7280;
        }

        .footer a {
            color: #FF6F20;
            text-decoration: none;
        }

        .two-column {
            display: grid;
            grid-template-columns: 1fr 1fr;
            gap: 2rem;
            margin: 1.5rem 0;
            align-items: start;
        }

        .two-column > div {
            display: flex;
            flex-direction: column;
            gap: 1rem;
        }

        @media print {
            body { -webkit-print-color-adjust: exact; }
            .page { box-shadow: none; }
        }
    </style>
</head>
<body>

    <!-- Executive Summary Page -->
    <div class="page">
        <div class="header">
            <h1>Executive Summary</h1>
            <p class="subtitle">Revenue optimization analysis for your ${results.feeEarners}-attorney firm</p>
        </div>

        <div class="summary-box">
            <div class="amount">$${results.totalOpportunity.toLocaleString()}</div>
            <div class="label">Total Annual Revenue Opportunity</div>
        </div>

        <div class="section">
            <h2>Opportunity Breakdown</h2>
            <div class="metrics-grid">
                <div class="metric-card">
                    <div class="label">UTILIZATION</div>
                    <div class="value">$${results.utilizationGap.toLocaleString()}</div>
                    <div class="description">Revenue Gap</div>
                </div>
                <div class="metric-card">
                    <div class="label">COLLECTIONS</div>
                    <div class="value">$${results.collectionImprovement.toLocaleString()}</div>
                    <div class="description">Improvement Potential</div>
                </div>
                <div class="metric-card">
                    <div class="label">CASH FLOW</div>
                    <div class="value">$${results.cashFlowImpact.toLocaleString()}</div>
                    <div class="description">Annual Impact</div>
                </div>
                <div class="metric-card">
                    <div class="label">PARTNER TIME</div>
                    <div class="value">$${results.partnerTimeSavings.toLocaleString()}</div>
                    <div class="description">Time Recovery Value</div>
                </div>
            </div>
        </div>

        <div class="section">
            <h2>Key Findings</h2>
            <table class="data-table">
                <thead>
                    <tr>
                        <th>Metric</th>
                        <th>Your Firm (Estimated)</th>
                        <th>Industry Average</th>
                        <th>Top Quartile</th>
                        <th>Opportunity</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td>Billable Utilization</td>
                        <td>~33%</td>
                        <td>33%</td>
                        <td>50%+</td>
                        <td>$${results.utilizationGap.toLocaleString()}</td>
                    </tr>
                    <tr>
                        <td>Collection Rate</td>
                        <td>~84%</td>
                        <td>84%</td>
                        <td>90%+</td>
                        <td>$${results.collectionImprovement.toLocaleString()}</td>
                    </tr>
                    <tr>
                        <td>Invoice Cycle</td>
                        <td>60+ days</td>
                        <td>45 days</td>
                        <td>7 days</td>
                        <td>$${results.cashFlowImpact.toLocaleString()}</td>
                    </tr>
                    <tr>
                        <td>Admin Efficiency</td>
                        <td>Manual processes</td>
                        <td>Semi-automated</td>
                        <td>Fully automated</td>
                        <td>$${results.partnerTimeSavings.toLocaleString()}</td>
                    </tr>
                </tbody>
            </table>
        </div>
    </div>

    <!-- Detailed Analysis Page -->
    <div class="page">
        <div class="header">
            <h1>Detailed Analysis & Benchmarks</h1>
            <p class="subtitle">Industry data and improvement opportunities</p>
        </div>

        <div class="two-column">
            <div>
                <div class="benchmark-card">
                    <div class="title">1. Billable Time Utilization</div>
                    <div class="stats">
                        <div class="stat">
                            <div class="stat-value">33%</div>
                            <div class="stat-label">Industry Avg</div>
                        </div>
                        <div class="stat">
                            <div class="stat-value">50%</div>
                            <div class="stat-label">Top Quartile</div>
                        </div>
                        <div class="stat">
                            <div class="stat-value">17%</div>
                            <div class="stat-label">Gap</div>
                        </div>
                    </div>
                    <p>Your ${results.feeEarners} fee earners likely work 40+ hours/week but only capture ~13 billable hours. Top firms capture 20+ hours through better tracking and processes.</p>
                </div>

                <div class="benchmark-card">
                    <div class="title">2. Collection Realization</div>
                    <div class="stats">
                        <div class="stat">
                            <div class="stat-value">84%</div>
                            <div class="stat-label">Industry Avg</div>
                        </div>
                        <div class="stat">
                            <div class="stat-value">90%</div>
                            <div class="stat-label">Top Quartile</div>
                        </div>
                        <div class="stat">
                            <div class="stat-value">6%</div>
                            <div class="stat-label">Gap</div>
                        </div>
                    </div>
                    <p>For every $100 billed, you likely collect $84. Top firms collect $90+ through faster invoicing and better documentation.</p>
                </div>
            </div>

            <div>
                <div class="benchmark-card">
                    <div class="title">3. Cash Conversion Cycle</div>
                    <div class="stats">
                        <div class="stat">
                            <div class="stat-value">45</div>
                            <div class="stat-label">Industry Avg Days</div>
                        </div>
                        <div class="stat">
                            <div class="stat-value">7</div>
                            <div class="stat-label">Top Quartile Days</div>
                        </div>
                        <div class="stat">
                            <div class="stat-value">20%</div>
                            <div class="stat-label">Collection Boost</div>
                        </div>
                    </div>
                    <p>Invoices sent within 7 days have 15-20% better collection rates than those sent after 60 days.</p>
                </div>

                <div class="benchmark-card">
                    <div class="title">4. Partner Time Efficiency</div>
                    <div class="stats">
                        <div class="stat">
                            <div class="stat-value">5-8</div>
                            <div class="stat-label">Hours/Week Lost</div>
                        </div>
                        <div class="stat">
                            <div class="stat-value">$${results.avgRate}</div>
                            <div class="stat-label">Per Hour Cost</div>
                        </div>
                        <div class="stat">
                            <div class="stat-value">80%</div>
                            <div class="stat-label">Automation Potential</div>
                        </div>
                    </div>
                    <p>Partners spend expensive time on invoice review and administrative tasks that can be automated.</p>
                </div>
            </div>
        </div>

        <div class="section">
            <h2>Implementation Priority Matrix</h2>
            <table class="data-table">
                <thead>
                    <tr>
                        <th>Initiative</th>
                        <th>Impact</th>
                        <th>Effort</th>
                        <th>Timeline</th>
                        <th>ROI</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td>Automated time tracking</td>
                        <td>High</td>
                        <td>Low</td>
                        <td>2-4 weeks</td>
                        <td>$${Math.round(results.utilizationGap * 0.4).toLocaleString()}</td>
                    </tr>
                    <tr>
                        <td>Faster invoice processing</td>
                        <td>High</td>
                        <td>Medium</td>
                        <td>4-6 weeks</td>
                        <td>$${results.collectionImprovement.toLocaleString()}</td>
                    </tr>
                    <tr>
                        <td>Billing automation</td>
                        <td>Medium</td>
                        <td>Low</td>
                        <td>2-3 weeks</td>
                        <td>$${results.partnerTimeSavings.toLocaleString()}</td>
                    </tr>
                    <tr>
                        <td>Collection workflows</td>
                        <td>Medium</td>
                        <td>Medium</td>
                        <td>6-8 weeks</td>
                        <td>$${results.cashFlowImpact.toLocaleString()}</td>
                    </tr>
                </tbody>
            </table>
        </div>
    </div>

    <!-- Action Plan Page -->
    <div class="page">
        <div class="header">
            <h1>Your Action Plan</h1>
            <p class="subtitle">Concrete steps to capture this $${results.totalOpportunity.toLocaleString()} opportunity</p>
        </div>

        <div class="section">
            <h2>Quick Wins (Week 1-2)</h2>
            <table class="data-table">
                <thead>
                    <tr>
                        <th>Action</th>
                        <th>Expected Impact</th>
                        <th>Implementation</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td>Implement daily time tracking reminders</td>
                        <td>+15% time capture</td>
                        <td>Calendar automation + team training</td>
                    </tr>
                    <tr>
                        <td>Standardize billing descriptions</td>
                        <td>+5% collection rate</td>
                        <td>Template library + guidelines</td>
                    </tr>
                    <tr>
                        <td>Weekly invoice review process</td>
                        <td>-20 day invoice cycle</td>
                        <td>Process documentation + accountability</td>
                    </tr>
                </tbody>
            </table>
        </div>

        <div class="section">
            <h2>Medium-term Improvements (Month 1-3)</h2>
            <table class="data-table">
                <thead>
                    <tr>
                        <th>Initiative</th>
                        <th>Technology Solution</th>
                        <th>Expected ROI</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td>Automated time capture</td>
                        <td>HourSense + integrations</td>
                        <td>$${Math.round(results.utilizationGap * 0.6).toLocaleString()}/year</td>
                    </tr>
                    <tr>
                        <td>Pre-billing automation</td>
                        <td>AI-powered invoice generation</td>
                        <td>$${results.partnerTimeSavings.toLocaleString()}/year</td>
                    </tr>
                    <tr>
                        <td>Client payment automation</td>
                        <td>Integrated payment processing</td>
                        <td>$${Math.round(results.cashFlowImpact * 0.7).toLocaleString()}/year</td>
                    </tr>
                </tbody>
            </table>
        </div>
    </div>
    <div class="page">
        <div class="section">
            <h2>Long-term Optimization (Month 3-6)</h2>
            <p>Full process automation, advanced analytics, and performance monitoring to achieve top-quartile performance across all metrics.</p>

            <div class="metrics-grid" style="grid-template-columns: repeat(2, 1fr); margin-top: 1.5rem;">
                <div class="metric-card">
                    <div class="label">TARGET UTILIZATION</div>
                    <div class="value">50%</div>
                    <div class="description">Top quartile performance</div>
                </div>
                <div class="metric-card">
                    <div class="label">TARGET COLLECTIONS</div>
                    <div class="value">90%</div>
                    <div class="description">Best-in-class realization</div>
                </div>
            </div>
        </div>

        <div class="cta-section">
            <h3>Ready to Start Your Transformation?</h3>
            <p>See how firms like yours are achieving these results with HourSense</p>
            <a href="#" class="cta-button">Book a 15-Minute Demo</a>
        </div>

        <div class="footer">
            <p><strong>Methodology:</strong> All benchmarks sourced from <a href="https://www.clio.com/resources/legal-trends/benchmarks/">Clio Legal Trends Report 2024</a><br>
            Based on analysis of 100,000+ legal professionals | Report generated by HourSense</p>
        </div>
    </div>
</body>
</html>
  `;
}

export async function generatePDF(results: CalculatorResults): Promise<Buffer> {
    // Generate the content pages using puppeteer
    const browser = await puppeteer.launch({
        headless: true,
        args: ['--no-sandbox', '--disable-setuid-sandbox']
    });

    try {
        const page = await browser.newPage();
        const html = generateHTMLTemplate(results);

        await page.setContent(html, { waitUntil: 'networkidle0' });

        const contentPdfBuffer = await page.pdf({
            format: 'A4',
            printBackground: true,
            margin: {
                top: '0.5in',
                right: '0.5in',
                bottom: '0.5in',
                left: '0.5in'
            }
        });

        // Load the first page PDF
        const firstPagePath = join(process.cwd(), 'public', 'first-page.pdf');
        const firstPageBytes = readFileSync(firstPagePath);

        // Create PDFs from the buffers
        const firstPagePdf = await PDFDocument.load(firstPageBytes);
        const contentPdf = await PDFDocument.load(contentPdfBuffer);

        // Create a new PDF document
        const finalPdf = await PDFDocument.create();

        // Copy the first page
        const [firstPage] = await finalPdf.copyPages(firstPagePdf, [0]);
        finalPdf.addPage(firstPage);

        // Copy all content pages
        const contentPageIndices = contentPdf.getPageIndices();
        const contentPages = await finalPdf.copyPages(contentPdf, contentPageIndices);

        contentPages.forEach((page) => finalPdf.addPage(page));

        // Serialize the final PDF
        const finalPdfBytes = await finalPdf.save();

        return Buffer.from(finalPdfBytes);
    } finally {
        await browser.close();
    }
}
