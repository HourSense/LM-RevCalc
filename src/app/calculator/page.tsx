'use client';

import { useState } from 'react';
import Image from 'next/image';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/registry/new-york-v4/ui/card';
import { Progress } from '@/registry/new-york-v4/ui/progress';
import { Button } from '@/registry/new-york-v4/ui/button';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { CalculatorInputs, calculateResults } from '@/lib/calculator';
import TimekeepingStage from './components/TimekeepingStage';
import BillingStage from './components/BillingStage';
import ClientDetailsStage from './components/ClientDetailsStage';
import ContactForm from './components/ContactForm';
import ResultsDisplay from './components/ResultsDisplay';

const stages = [
  { id: 1, title: 'Timekeeping', description: 'Tell us about your time tracking practices' },
  { id: 2, title: 'Billing', description: 'Share your invoicing process details' },
  { id: 3, title: 'Client Details', description: 'Information about your client management' },
  { id: 4, title: 'Results', description: 'Your billing efficiency analysis' },
];

interface FormData extends Partial<CalculatorInputs> {
  firstName?: string;
  fullName?: string;
  company?: string;
  email?: string;
}

export default function CalculatorPage() {
  const [currentStage, setCurrentStage] = useState(1);
  const [formData, setFormData] = useState<FormData>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isComplete, setIsComplete] = useState(false);

  const updateFormData = (data: Partial<FormData>) => {
    setFormData(prev => ({ ...prev, ...data }));
  };

  const nextStage = () => {
    if (currentStage < stages.length) {
      setCurrentStage(currentStage + 1);
    }
  };

  const prevStage = () => {
    if (currentStage > 1) {
      setCurrentStage(currentStage - 1);
    }
  };

  const handleSubmit = async () => {
    setIsSubmitting(true);

    try {
      // Calculate results
      const calculatorInputs = formData as CalculatorInputs;
      const results = calculateResults(calculatorInputs);

      // Submit to API
      const response = await fetch('/api/send-report', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email: formData.email,
          fullName: formData.fullName,
          lawFirm: formData.company,
          results: results,
        }),
      });

      if (response.ok) {
        setIsComplete(true);
      } else {
        throw new Error('Failed to send report');
      }
    } catch (error) {
      console.error('Error submitting form:', error);
      // Handle error - could show toast notification
    } finally {
      setIsSubmitting(false);
    }
  };

  const canProceed = () => {
    switch (currentStage) {
      case 1:
        return formData.feeEarners && formData.avgRate && formData.timesheetTime && formData.timesheetFrequency;
      case 2:
        return formData.monthlyInvoices && formData.peopleInvolved && formData.partnerRate;
      case 3:
        return formData.timeToInvoice;
      case 4:
        return formData.firstName && formData.fullName && formData.company && formData.email;
      default:
        return false;
    }
  };

  if (isComplete) {
    return (
      <div className="min-h-screen" style={{backgroundColor: '#ffffff'}}>
        <div className="container mx-auto px-4 py-8">
          <div className="max-w-2xl mx-auto text-center">
            <Card className="border-0 shadow-sm">
              <CardHeader>
                <div className="flex justify-center mb-4">
                  <Image
                    src="/logo.png"
                    alt="HourSense"
                    width={100}
                    height={200}
                  />
                </div>
                <CardTitle className="text-2xl" style={{color: '#FF6F20'}}>Report Sent Successfully!</CardTitle>
                <CardDescription style={{color: '#6b7280'}}>
                  Thank you for completing the billing efficiency analysis. Check your email for your personalized report.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <p style={{color: '#6b7280'}}>
                  We've sent a comprehensive analysis to <strong>{formData.email}</strong> with insights specific to {formData.company}.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen" style={{backgroundColor: '#ffffff'}}>
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto">
          {/* Header */}
          <div className="text-center mb-8">
            <div className="flex justify-center mb-6">
              <Image
                src="/logo.png"
                alt="HourSense"
                width={250}
                height={250}
              />
            </div>
            <h1 className="text-3xl font-bold tracking-tight mb-2" style={{color: '#222222'}}>
              Law Firm Billing Efficiency Calculator
            </h1>
            <p style={{color: '#6b7280'}}>
              Discover hidden opportunities in your firm's billing and time management
            </p>
          </div>

          {/* Progress Bar */}
          <div className="mb-8">
            <div className="flex justify-between items-center mb-2">
              <span className="text-sm font-medium" style={{color: '#222222'}}>
                Part {currentStage} of {stages.length}
              </span>
              <span className="text-sm" style={{color: '#6b7280'}}>
                {Math.round((currentStage / stages.length) * 100)}% Complete
              </span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-2">
              <div
                className="h-2 rounded-full transition-all duration-300"
                style={{
                  backgroundColor: '#FF6F20',
                  width: `${(currentStage / stages.length) * 100}%`
                }}
              />
            </div>
          </div>

          {/* Stage Content */}
          <Card className="mb-8 border-0 shadow-sm" style={{backgroundColor: '#ffffff', borderColor: '#e5e7eb'}}>
            <CardHeader>
              <CardTitle style={{color: '#222222'}}>{stages[currentStage - 1].title}</CardTitle>
              <CardDescription style={{color: '#6b7280'}}>{stages[currentStage - 1].description}</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              {currentStage === 1 && (
                <TimekeepingStage data={formData} onChange={updateFormData} />
              )}
              {currentStage === 2 && (
                <BillingStage data={formData} onChange={updateFormData} />
              )}
              {currentStage === 3 && (
                <ClientDetailsStage data={formData} onChange={updateFormData} />
              )}
              {currentStage === 4 && (
                <ResultsDisplay
                  data={formData as CalculatorInputs}
                  isPreview={true}
                  onFormChange={updateFormData}
                  onSubmit={handleSubmit}
                  isSubmitting={isSubmitting}
                />
              )}
            </CardContent>
          </Card>


          {/* Navigation */}
          <div className="flex justify-between">
            <Button
              variant="outline"
              onClick={prevStage}
              disabled={currentStage === 1}
              className="border"
              style={{borderColor: '#e5e7eb', color: '#374151'}}
            >
              <ChevronLeft className="h-4 w-4 mr-2" />
              Previous
            </Button>

            {currentStage < 4 ? (
              <Button
                onClick={nextStage}
                disabled={!canProceed()}
                className="text-white border-0"
                style={{backgroundColor: '#FF6F20'}}
              >
                Next
                <ChevronRight className="h-4 w-4 ml-2" />
              </Button>
            ) : (
              <div></div>
            )}
          </div>

          {/* Footer */}
          <div className="text-center text-xs text-muted-foreground mt-24 pt-4 ">
            Powered by <a href="https://hoursense.com" target="_blank" rel="noopener noreferrer" className="font-medium hover:underline" style={{color: '#FF6F20'}}>HourSense</a> © 2025
          </div>
        </div>
      </div>
    </div>
  );
}