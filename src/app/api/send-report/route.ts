import { NextResponse } from 'next/server';

import { EmailTemplate } from '@/components/email-template';
import { createAttioLead } from '@/lib/attio';
import { generatePDF } from '@/lib/generate-pdf';

import { Resend } from 'resend';

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
    fullName: string;
    lawFirm: string;
    results: CalculatorResults;
}

export async function POST(request: Request) {
    try {
        // Parse request body
        const body: RequestBody = await request.json();
        const { email, fullName, lawFirm, results } = body;

        // Validate input
        if (!email || !email.includes('@')) {
            return NextResponse.json({ success: false, error: 'Invalid email address' }, { status: 400 });
        }

        if (!fullName || !lawFirm) {
            return NextResponse.json(
                { success: false, error: 'Missing required name or law firm information' },
                { status: 400 }
            );
        }

        if (!results || !results.feeEarners || !results.totalOpportunity) {
            return NextResponse.json({ success: false, error: 'Missing required calculator results' }, { status: 400 });
        }

        console.log('Generating PDF for:', email);

        // Generate PDF
        const pdfBuffer = await generatePDF(results);

        console.log('PDF generated successfully, sending email...');

        // Initialize Resend client
        const resendApiKey = process.env.RESEND_API_KEY;
        if (!resendApiKey) {
            throw new Error('RESEND_API_KEY environment variable is not set');
        }
        const resend = new Resend(resendApiKey);

        // Send email with Resend
        const { data: emailData, error: emailError } = await resend.emails.send({
            from: 'HourSense <sarah@onboarding.hoursense.com>',
            to: email,
            subject: `Hi ${fullName}, here's your billing analysis for ${lawFirm} - $${results.totalOpportunity.toLocaleString()} Opportunity`,
            react: EmailTemplate({
                fullName,
                lawFirm,
                totalOpportunity: results.totalOpportunity,
                utilizationGap: results.utilizationGap,
                collectionImprovement: results.collectionImprovement,
                cashFlowImpact: results.cashFlowImpact,
                partnerTimeSavings: results.partnerTimeSavings
            }),
            attachments: [
                {
                    filename: `${lawFirm} - HourSense Billing Audit.pdf`,
                    content: pdfBuffer
                }
            ]
        });

        if (emailError) {
            console.error('Resend error:', emailError);

            return NextResponse.json({ success: false, error: 'Failed to send email' }, { status: 500 });
        }

        console.log('Email sent successfully:', emailData);

        // Create Attio lead (don't fail the request if this fails)
        const attioResult = await createAttioLead({
            email,
            feeEarners: results.feeEarners
        });

        if (!attioResult.success) {
            console.error('Attio creation failed, but email was sent successfully');
        }

        return NextResponse.json({
            success: true,
            message: 'Report sent successfully',
            emailId: emailData?.id
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
