# Revenue Calculator API Implementation - Complete Documentation

## Overview
This document contains all the code and instructions needed to implement a revenue calculator API that:
1. Accepts email and calculator results
2. Generates a PDF report
3. Sends email via Resend
4. Creates a lead in Attio CRM

## Prerequisites

### Environment Variables
Create/update `.env.local`:
```bash
RESEND_API_KEY=re_SEHmLtzq_GkVj7NtpHhVznvhMBXf9LckV
ATTIO_API_KEY=your_attio_key_here
```

### Dependencies
```bash
npm install resend pdfkit
npm install @types/pdfkit --save-dev
```

### Attio Setup
- List: "Leads" (already created)
- Attribute name: "Fee-Earners" (Text type)
- API Endpoint: `https://api.attio.com/v2/objects/people/records`

### Resend Setup
- Verified domain: `onboarding.hoursense.com`
- Sender email: `onboarding@hoursense.com`

---

## File Structure
```
/app/api/send-report/route.ts      # Main API route
/lib/attio.ts                      # Attio API helper
/lib/generate-pdf.ts               # PDF generation
/components/email-template.tsx     # Email component
```

---

## Code Files

### FILE 1: `/lib/attio.ts`

```typescript
interface CreateLeadParams {
  email: string;
  feeEarners: number;
}

export async function createAttioLead({ email, feeEarners }: CreateLeadParams) {
  const attioApiKey = process.env.ATTIO_API_KEY;
  
  if (!attioApiKey) {
    throw new Error('ATTIO_API_KEY is not configured');
  }

  try {
    const response = await fetch('https://api.attio.com/v2/objects/people/records', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${attioApiKey}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        data: {
          values: {
            email_addresses: [{ 
              email_address: email 
            }],
            'fee-earners': feeEarners,
          }
        }
      })
    });

    const data = await response.json();

    if (!response.ok) {
      console.error('Attio API error:', data);
      throw new Error(`Attio API error: ${response.status}`);
    }

    console.log('Successfully created Attio lead:', data);
    return { success: true, data };
  } catch (error) {
    console.error('Error creating Attio lead:', error);
    return { success: false, error };
  }
}
```

---

### FILE 2: `/lib/generate-pdf.ts`

```typescript
import PDFDocument from 'pdfkit';

interface CalculatorResults {
  feeEarners: number;
  avgRate: number;
  totalOpportunity: number;
  utilizationGap: number;
  collectionImprovement: number;
  cashFlowImpact: number;
  partnerTimeSavings: number;
}

export async function generatePDF(results: CalculatorResults): Promise<Buffer> {
  return new Promise((resolve, reject) => {
    try {
      const doc = new PDFDocument({ 
        margin: 50,
        size: 'LETTER'
      });
      
      const chunks: Buffer[] = [];
      
      doc.on('data', (chunk) => chunks.push(chunk));
      doc.on('end', () => resolve(Buffer.concat(chunks)));
      doc.on('error', reject);
      
      // Header
      doc.fontSize(28)
         .font('Helvetica-Bold')
         .text('Billing Efficiency Analysis', { align: 'center' });
      
      doc.moveDown(0.5);
      doc.fontSize(10)
         .font('Helvetica')
         .fillColor('#666666')
         .text(`Generated on ${new Date().toLocaleDateString('en-US', { 
           year: 'numeric', 
           month: 'long', 
           day: 'numeric' 
         })}`, { align: 'center' });
      
      doc.moveDown(2);
      
      // Executive Summary Box
      doc.fontSize(16)
         .font('Helvetica-Bold')
         .fillColor('#000000')
         .text('Executive Summary');
      
      doc.moveDown(0.5);
      
      // Big number
      doc.fontSize(36)
         .fillColor('#0066cc')
         .text(`$${results.totalOpportunity.toLocaleString()}`, { align: 'center' });
      
      doc.fontSize(12)
         .fillColor('#333333')
         .font('Helvetica')
         .text('Total Annual Opportunity', { align: 'center' });
      
      doc.moveDown(2);
      
      // Breakdown
      doc.fontSize(14)
         .font('Helvetica-Bold')
         .fillColor('#000000')
         .text('Opportunity Breakdown:');
      
      doc.moveDown(0.5);
      doc.fontSize(11).font('Helvetica');
      
      const breakdown = [
        { label: 'Utilization Gap', value: results.utilizationGap },
        { label: 'Collection Improvement', value: results.collectionImprovement },
        { label: 'Cash Flow Optimization', value: results.cashFlowImpact },
        { label: 'Partner Time Recovery', value: results.partnerTimeSavings },
      ];
      
      breakdown.forEach(item => {
        doc.fillColor('#333333')
           .text(`→ ${item.label}: `, { continued: true })
           .fillColor('#0066cc')
           .text(`$${item.value.toLocaleString()}`);
        doc.moveDown(0.3);
      });
      
      doc.moveDown(2);
      
      // What This Means
      doc.addPage();
      doc.fontSize(20)
         .font('Helvetica-Bold')
         .fillColor('#000000')
         .text('What This Means For Your Firm');
      
      doc.moveDown(1);
      
      doc.fontSize(11)
         .font('Helvetica')
         .fillColor('#333333')
         .text(`Based on your firm with ${results.feeEarners} fee earners at an average rate of $${results.avgRate}/hour, you have significant opportunity to increase revenue without adding headcount or changing your rates.`);
      
      doc.moveDown(1.5);
      
      // Section 1: Utilization
      doc.fontSize(14)
         .font('Helvetica-Bold')
         .fillColor('#000000')
         .text('1. Billable Time Utilization');
      
      doc.moveDown(0.5);
      doc.fontSize(11).font('Helvetica').fillColor('#333333');
      doc.text('Industry average utilization: 33%');
      doc.text('Top quartile firms: 50%+');
      doc.moveDown(0.5);
      doc.text(`Your fee earners are likely working 40 hours per week but only capturing ~13 billable hours on average. Top quartile firms capture 20 billable hours from the same work week.`);
      doc.moveDown(0.5);
      doc.fillColor('#0066cc').text(`Revenue opportunity: $${results.utilizationGap.toLocaleString()}/year`);
      
      doc.moveDown(1.5);
      
      // Section 2: Collections
      doc.fontSize(14)
         .font('Helvetica-Bold')
         .fillColor('#000000')
         .text('2. Collection Realization');
      
      doc.moveDown(0.5);
      doc.fontSize(11).font('Helvetica').fillColor('#333333');
      doc.text('Industry average collection rate: 84%');
      doc.text('Top quartile firms: 90%+');
      doc.moveDown(0.5);
      doc.text('For every $100 you bill, you likely collect $84. Top quartile firms collect $90. The difference comes from faster invoicing, better documentation, and clearer fee agreements.');
      doc.moveDown(0.5);
      doc.fillColor('#0066cc').text(`Collection improvement: $${results.collectionImprovement.toLocaleString()}/year`);
      
      doc.moveDown(1.5);
      
      // Section 3: Cash Flow
      doc.fontSize(14)
         .font('Helvetica-Bold')
         .fillColor('#000000')
         .text('3. Cash Conversion Cycle');
      
      doc.moveDown(0.5);
      doc.fontSize(11).font('Helvetica').fillColor('#333333');
      doc.text('Faster invoicing improves both cash flow and collection rates. Invoices sent within 7 days of work completion have 15-20% better collection rates than those sent after 60 days.');
      doc.moveDown(0.5);
      doc.fillColor('#0066cc').text(`Cash flow impact: $${results.cashFlowImpact.toLocaleString()}/year`);
      
      doc.moveDown(1.5);
      
      // Section 4: Partner Time
      doc.fontSize(14)
         .font('Helvetica-Bold')
         .fillColor('#000000')
         .text('4. Partner Time Efficiency');
      
      doc.moveDown(0.5);
      doc.fontSize(11).font('Helvetica').fillColor('#333333');
      doc.text(`At $${results.avgRate}/hour, partner time spent on invoice review and pre-billing is expensive. Automating this process can free up hundreds of hours annually.`);
      doc.moveDown(0.5);
      doc.fillColor('#0066cc').text(`Partner time value: $${results.partnerTimeSavings.toLocaleString()}/year`);
      
      // Footer
      doc.addPage();
      doc.fontSize(18)
         .font('Helvetica-Bold')
         .fillColor('#000000')
         .text('Next Steps', { align: 'center' });
      
      doc.moveDown(1);
      doc.fontSize(11)
         .font('Helvetica')
         .fillColor('#333333')
         .text('Want to see how firms are achieving these results?', { align: 'center' });
      
      doc.moveDown(0.5);
      doc.fontSize(10)
         .fillColor('#0066cc')
         .text('Book a 15-minute demo to learn more', { align: 'center' });
      
      doc.moveDown(3);
      
      doc.fontSize(9)
         .fillColor('#999999')
         .text('All benchmarks sourced from Clio Legal Trends Report 2024', { align: 'center' });
      doc.text('Based on analysis of 100,000+ legal professionals', { align: 'center' });
      
      doc.end();
    } catch (error) {
      reject(error);
    }
  });
}
```

---

### FILE 3: `/components/email-template.tsx`

```tsx
import * as React from 'react';

interface EmailTemplateProps {
  totalOpportunity: number;
  utilizationGap: number;
  collectionImprovement: number;
  cashFlowImpact: number;
  partnerTimeSavings: number;
}

export function EmailTemplate({
  totalOpportunity,
  utilizationGap,
  collectionImprovement,
  cashFlowImpact,
  partnerTimeSavings,
}: EmailTemplateProps) {
  return (
    <div style={{ fontFamily: 'Arial, sans-serif', maxWidth: '600px', margin: '0 auto' }}>
      <h1 style={{ color: '#333', textAlign: 'center', marginBottom: '20px' }}>
        Your Billing Efficiency Analysis
      </h1>
      
      <p style={{ fontSize: '16px', color: '#666', lineHeight: '1.6' }}>
        Thanks for using our Revenue Leakage Calculator.
      </p>
      
      <div style={{ 
        backgroundColor: '#f0f7ff', 
        padding: '30px', 
        borderRadius: '8px', 
        textAlign: 'center',
        margin: '30px 0'
      }}>
        <h2 style={{ color: '#333', margin: '0 0 10px 0', fontSize: '18px' }}>
          Total Annual Opportunity
        </h2>
        <p style={{ 
          fontSize: '42px', 
          color: '#0066cc', 
          fontWeight: 'bold',
          margin: '10px 0'
        }}>
          ${totalOpportunity.toLocaleString()}
        </p>
      </div>
      
      <div style={{ margin: '30px 0' }}>
        <h3 style={{ color: '#333', fontSize: '16px', marginBottom: '15px' }}>
          Opportunity Breakdown:
        </h3>
        <div style={{ backgroundColor: '#f9f9f9', padding: '20px', borderRadius: '6px' }}>
          <p style={{ margin: '8px 0', fontSize: '15px', color: '#333' }}>
            → Utilization Gap: <strong style={{ color: '#0066cc' }}>${utilizationGap.toLocaleString()}</strong>
          </p>
          <p style={{ margin: '8px 0', fontSize: '15px', color: '#333' }}>
            → Collection Improvement: <strong style={{ color: '#0066cc' }}>${collectionImprovement.toLocaleString()}</strong>
          </p>
          <p style={{ margin: '8px 0', fontSize: '15px', color: '#333' }}>
            → Cash Flow Optimization: <strong style={{ color: '#0066cc' }}>${cashFlowImpact.toLocaleString()}</strong>
          </p>
          <p style={{ margin: '8px 0', fontSize: '15px', color: '#333' }}>
            → Partner Time Recovery: <strong style={{ color: '#0066cc' }}>${partnerTimeSavings.toLocaleString()}</strong>
          </p>
        </div>
      </div>
      
      <p style={{ fontSize: '16px', color: '#666', lineHeight: '1.6', margin: '20px 0' }}>
        Your detailed analysis is attached as a PDF. It includes benchmarks from the Clio Legal Trends Report and specific recommendations for your firm.
      </p>
      
      <div style={{ textAlign: 'center', margin: '40px 0' }}>
        <a 
          href="https://calendar.app.google/your-calendar-link" 
          style={{
            backgroundColor: '#0066cc',
            color: '#ffffff',
            padding: '14px 28px',
            textDecoration: 'none',
            borderRadius: '6px',
            fontSize: '16px',
            fontWeight: 'bold',
            display: 'inline-block'
          }}
        >
          Book a 15-Minute Demo
        </a>
      </div>
      
      <p style={{ 
        fontSize: '14px', 
        color: '#999', 
        fontStyle: 'italic',
        marginTop: '40px',
        paddingTop: '20px',
        borderTop: '1px solid #eee'
      }}>
        P.S. - The report includes 3 quick wins you can implement this week, even without new software.
      </p>
    </div>
  );
}
```

---

### FILE 4: `/app/api/send-report/route.ts`

```typescript
import { Resend } from 'resend';
import { NextResponse } from 'next/server';
import { generatePDF } from '@/lib/generate-pdf';
import { createAttioLead } from '@/lib/attio';
import { EmailTemplate } from '@/components/email-template';

const resend = new Resend(process.env.RESEND_API_KEY);

interface CalculatorResults {
  feeEarners: number;
  avgRate: number;
  totalOpportunity: number;
  utilizationGap: number;
  collectionImprovement: number;
  cashFlowImpact: number;
  partnerTimeSavings: number;
}

interface RequestBody {
  email: string;
  results: CalculatorResults;
}

export async function POST(request: Request) {
  try {
    // Parse request body
    const body: RequestBody = await request.json();
    const { email, results } = body;

    // Validate input
    if (!email || !email.includes('@')) {
      return NextResponse.json(
        { success: false, error: 'Invalid email address' },
        { status: 400 }
      );
    }

    if (!results || !results.feeEarners || !results.totalOpportunity) {
      return NextResponse.json(
        { success: false, error: 'Missing required calculator results' },
        { status: 400 }
      );
    }

    console.log('Generating PDF for:', email);
    
    // Generate PDF
    const pdfBuffer = await generatePDF(results);
    
    console.log('PDF generated successfully, sending email...');

    // Send email with Resend
    const { data: emailData, error: emailError } = await resend.emails.send({
      from: 'HourSense <onboarding@hoursense.com>',
      to: email,
      subject: `Your Billing Analysis - $${results.totalOpportunity.toLocaleString()} Opportunity`,
      react: EmailTemplate({
        totalOpportunity: results.totalOpportunity,
        utilizationGap: results.utilizationGap,
        collectionImprovement: results.collectionImprovement,
        cashFlowImpact: results.cashFlowImpact,
        partnerTimeSavings: results.partnerTimeSavings,
      }),
      attachments: [
        {
          filename: 'billing-efficiency-report.pdf',
          content: pdfBuffer,
        },
      ],
    });

    if (emailError) {
      console.error('Resend error:', emailError);
      return NextResponse.json(
        { success: false, error: 'Failed to send email' },
        { status: 500 }
      );
    }

    console.log('Email sent successfully:', emailData);

    // Create Attio lead (don't fail the request if this fails)
    const attioResult = await createAttioLead({
      email,
      feeEarners: results.feeEarners,
    });

    if (!attioResult.success) {
      console.error('Attio creation failed, but email was sent successfully');
    }

    return NextResponse.json({
      success: true,
      message: 'Report sent successfully',
      emailId: emailData?.id,
    });

  } catch (error) {
    console.error('Unexpected error in send-report:', error);
    return NextResponse.json(
      { 
        success: false, 
        error: error instanceof Error ? error.message : 'Internal server error' 
      },
      { status: 500 }
    );
  }
}
```

---

## Testing

### Test with curl

```bash
curl -X POST http://localhost:3000/api/send-report \
  -H "Content-Type: application/json" \
  -d '{
    "email": "yajatgulati01@gmail.com",
    "results": {
      "feeEarners": 10,
      "avgRate": 250,
      "totalOpportunity": 815000,
      "utilizationGap": 675000,
      "collectionImprovement": 95000,
      "cashFlowImpact": 79000,
      "partnerTimeSavings": 300000
    }
  }'
```

### Expected Success Response

```json
{
  "success": true,
  "message": "Report sent successfully",
  "emailId": "some-resend-id"
}
```

### Validation Checklist

- [ ] API responds with 200 status
- [ ] Email arrives in inbox (check spam folder)
- [ ] PDF is attached to email
- [ ] PDF opens and displays correctly
- [ ] PDF contains correct data from the request
- [ ] Person is created in Attio "Leads" list
- [ ] Fee-Earners field is populated in Attio
- [ ] Email address is correct in Attio
- [ ] Console logs show no errors

---

## Troubleshooting

### Email not sending
- Check `RESEND_API_KEY` is correct in `.env.local`
- Verify domain is verified in Resend dashboard
- Check Resend logs at resend.com/emails

### PDF not generating
- Make sure `pdfkit` is installed
- Check console for PDF generation errors
- Verify all required fields are in `results` object

### Attio not creating lead
- Check `ATTIO_API_KEY` is correct
- Verify the attribute name is exactly `fee-earners` (with hyphen)
- Check Attio API response in console logs
- Verify workspace has "Leads" list

### TypeScript errors
- Make sure `@types/pdfkit` is installed
- Run `npm install` to ensure all dependencies are present
- Check that all interfaces match the actual data structure

---

## Next Steps

Once the API is working:
1. Build frontend calculator form
2. Add input validation on frontend
3. Add loading states and success/error messages
4. Style the email template further if needed
5. Add more fields to Attio as needed