'use client';

import { useState } from 'react';
import { Label } from '@/registry/new-york-v4/ui/label';
import { Input } from '@/registry/new-york-v4/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/registry/new-york-v4/ui/select';

interface TimekeepingStageProps {
  data: {
    feeEarners?: number;
    avgRate?: number;
    timesheetTime?: number;
    timesheetFrequency?: 'Daily' | 'Weekly' | 'Monthly';
    fillTime?: '<30min' | '30-60min' | '60min+';
  };
  onChange: (data: any) => void;
}

export default function TimekeepingStage({ data, onChange }: TimekeepingStageProps) {
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
      <div className="grid gap-4 md:grid-cols-2">
        <div className="space-y-2">
          <Label htmlFor="feeEarners">How many fee-earners do you have?</Label>
          <Input
            id="feeEarners"
            type="number"
            min="1"
            placeholder="e.g., 15"
            value={data.feeEarners || ''}
            onChange={(e) => {
              e.stopPropagation();
              const value = e.target.value;
              if (value !== '' && !validateNumberInput(value, 'fee-earners')) {
                return;
              }
              onChange({ feeEarners: value === '' ? undefined : parseInt(value) || value });
            }}
          />
          <p className="text-sm text-muted-foreground">
            Include partners, associates, and other billable staff
          </p>
        </div>

        <div className="space-y-2">
          <Label htmlFor="avgRate">What is the blended average billing rate?</Label>
          <div className="relative">
            <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground">$</span>
            <Input
              id="avgRate"
              type="number"
              min="50"
              placeholder="250"
              className="pl-8"
              value={data.avgRate || ''}
              onChange={(e) => {
                e.stopPropagation();
                const value = e.target.value;
                if (value !== '' && !validateNumberInput(value, 'billing rate')) {
                  return;
                }
                onChange({ avgRate: value === '' ? undefined : parseInt(value) || value });
              }}
            />
          </div>
          <p className="text-sm text-muted-foreground">
            Average hourly rate across all fee-earners
          </p>
        </div>
      </div>

      <div className="space-y-2">
        <Label htmlFor="timesheetTime">
          How much time do they spend on time sheets on a weekly basis?
        </Label>
        <div className="relative">
          <Input
            id="timesheetTime"
            type="number"
            min="0"
            step="0.5"
            placeholder="2"
            value={data.timesheetTime || ''}
            onChange={(e) => {
              e.stopPropagation();
              const value = e.target.value;
              if (value !== '' && !validateNumberInput(value, 'timesheet hours')) {
                return;
              }
              onChange({ timesheetTime: value === '' ? undefined : parseFloat(value) || value });
            }}
          />
          <span className="absolute right-3 top-1/2 transform -translate-y-1/2 text-muted-foreground">
            hours/week
          </span>
        </div>
        <p className="text-sm text-muted-foreground">
          Time spent entering, reviewing, and correcting timesheet entries
        </p>
      </div>

      <div className="space-y-2">
        <Label htmlFor="timesheetFrequency">How often do they fill in their timesheets?</Label>
        <Select
          value={data.timesheetFrequency || ''}
          onValueChange={(value: 'Daily' | 'Weekly' | 'Monthly') => onChange({ timesheetFrequency: value })}
        >
          <SelectTrigger>
            <SelectValue placeholder="Select frequency" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="Daily">Daily</SelectItem>
            <SelectItem value="Weekly">Weekly</SelectItem>
            <SelectItem value="Monthly">Monthly</SelectItem>
          </SelectContent>
        </Select>
        <p className="text-sm text-muted-foreground">
          More frequent entry typically means better time capture
        </p>
      </div>

    </div>
  );
}