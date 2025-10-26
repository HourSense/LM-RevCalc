'use client';

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
  return (
    <div className="space-y-6">
      <div className="grid gap-4 md:grid-cols-2">
        <div className="space-y-2">
          <Label htmlFor="feeEarners">How many fee-earners do you have?</Label>
          <Input
            id="feeEarners"
            type="number"
            min="1"
            placeholder="e.g., 15"
            value={data.feeEarners || ''}
            onChange={(e) => onChange({ feeEarners: parseInt(e.target.value) || undefined })}
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
              onChange={(e) => onChange({ avgRate: parseInt(e.target.value) || undefined })}
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
            onChange={(e) => onChange({ timesheetTime: parseFloat(e.target.value) || undefined })}
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