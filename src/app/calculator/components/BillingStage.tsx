'use client';

import { useState } from 'react';
import { Label } from '@/registry/new-york-v4/ui/label';
import { Input } from '@/registry/new-york-v4/ui/input';

interface BillingStageProps {
  data: {
    monthlyInvoices?: number;
    peopleInvolved?: number;
    partnerRate?: number;
  };
  onChange: (data: any) => void;
}

export default function BillingStage({ data, onChange }: BillingStageProps) {
  const [toast, setToast] = useState<string | null>(null);

  const showToast = (message: string) => {
    setToast(message);
    setTimeout(() => setToast(null), 3000);
  };

  const validateNumberInput = (value: string, fieldName: string) => {
    const hasLetters = /[a-zA-Z]/.test(value);
    if (hasLetters) {
      showToast(`Please enter numbers only for ${fieldName}`);
      return false;
    }
    return true;
  };

  return (
    <div className="space-y-6">
      {/* Toast Notification */}
      {toast && (
        <div className="fixed top-4 right-4 bg-red-500 text-white px-4 py-2 rounded-lg shadow-lg z-50 animate-in slide-in-from-top-2">
          {toast}
        </div>
      )}
      <div className="space-y-2">
        <Label htmlFor="monthlyInvoices">
          What is the average number of invoices you generate in a month?
        </Label>
        <Input
          id="monthlyInvoices"
          type="number"
          min="1"
          placeholder="e.g., 50"
          value={data.monthlyInvoices || ''}
          onChange={(e) => {
            e.stopPropagation();
            const value = e.target.value;
            if (value !== '' && !validateNumberInput(value, 'monthly invoices')) {
              return;
            }
            onChange({ monthlyInvoices: value === '' ? undefined : parseInt(value) || value });
          }}
        />
        <p className="text-sm text-muted-foreground">
          Include all client invoices sent per month
        </p>
      </div>

      <div className="space-y-2">
        <Label htmlFor="peopleInvolved">
          How many people are involved in the typical generation of invoices?
        </Label>
        <Input
          id="peopleInvolved"
          type="number"
          min="1"
          placeholder="e.g., 3"
          value={data.peopleInvolved || ''}
          onChange={(e) => {
            e.stopPropagation();
            const value = e.target.value;
            if (value !== '' && !validateNumberInput(value, 'people involved')) {
              return;
            }
            onChange({ peopleInvolved: value === '' ? undefined : parseInt(value) || value });
          }}
        />
        <p className="text-sm text-muted-foreground">
          Include finance staff, partners, associates - anyone who reviews or approves invoices
        </p>
      </div>

      <div className="space-y-2">
        <Label htmlFor="partnerRate">What is the average billing rate of a partner?</Label>
        <div className="relative">
          <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground">$</span>
          <Input
            id="partnerRate"
            type="number"
            min="100"
            placeholder="400"
            className="pl-8"
            value={data.partnerRate || ''}
            onChange={(e) => {
              e.stopPropagation();
              const value = e.target.value;
              if (value !== '' && !validateNumberInput(value, 'partner rate')) {
                return;
              }
              onChange({ partnerRate: value === '' ? undefined : parseInt(value) || value });
            }}
          />
        </div>
        <p className="text-sm text-muted-foreground">
          Partner hourly rate (used to calculate time savings value)
        </p>
      </div>

      <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
        <h4 className="font-medium text-blue-900 mb-2">
          Why this matters
        </h4>
        <p className="text-sm text-blue-800">
          The more people involved in invoice generation, the more time (and money) spent on
          back-and-forth reviews. Top-performing firms streamline this process to just 15-30
          minutes per invoice.
        </p>
      </div>
    </div>
  );
}