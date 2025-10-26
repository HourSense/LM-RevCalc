'use client';

import { Label } from '@/registry/new-york-v4/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/registry/new-york-v4/ui/select';

interface ClientDetailsStageProps {
  data: {
    timeToInvoice?: 'Within 1 week' | '2-4 weeks' | '1-2 months' | '2+ months';
  };
  onChange: (data: any) => void;
}

export default function ClientDetailsStage({ data, onChange }: ClientDetailsStageProps) {
  return (
    <div className="space-y-6">
      <div className="space-y-2">
        <Label htmlFor="timeToInvoice">How long is your time-to-invoice?</Label>
        <Select
          value={data.timeToInvoice || ''}
          onValueChange={(value: 'Within 1 week' | '2-4 weeks' | '1-2 months' | '2+ months') =>
            onChange({ timeToInvoice: value })
          }
        >
          <SelectTrigger>
            <SelectValue placeholder="Select your typical time-to-invoice" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="Within 1 week">Within 1 week</SelectItem>
            <SelectItem value="2-4 weeks">2-4 weeks</SelectItem>
            <SelectItem value="1-2 months">1-2 months</SelectItem>
            <SelectItem value="2+ months">2+ months</SelectItem>
          </SelectContent>
        </Select>
        <p className="text-sm text-muted-foreground">
          Time from work completion to invoice being sent to client
        </p>
      </div>

      <div className="grid gap-4 md:grid-cols-2">
        <div className="bg-green-50 border border-green-200 rounded-lg p-4">
          <h4 className="font-medium text-green-900 mb-2 flex items-center">
            <span className="w-2 h-2 bg-green-500 rounded-full mr-2"></span>
            Best Practice
          </h4>
          <p className="text-sm text-green-800">
            Top-performing firms invoice within 1 week, achieving 90%+ collection rates
          </p>
        </div>

        <div className="bg-amber-50 border border-amber-200 rounded-lg p-4">
          <h4 className="font-medium text-amber-900 mb-2 flex items-center">
            <span className="w-2 h-2 bg-amber-500 rounded-full mr-2"></span>
            Industry Average
          </h4>
          <p className="text-sm text-amber-800">
            Most firms take 1-2 months, with collection rates around 84%
          </p>
        </div>
      </div>

      <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
        <h4 className="font-medium text-blue-900 mb-2">
          The Impact of Delayed Invoicing
        </h4>
        <div className="text-sm text-blue-800 space-y-2">
          <p>
            <strong>Collection Rate:</strong> Each month of delay typically reduces collection rates by 3-5%
          </p>
          <p>
            <strong>Cash Flow:</strong> Longer time-to-invoice means more working capital tied up
          </p>
          <p>
            <strong>Client Relationships:</strong> Timely invoicing demonstrates professionalism and efficiency
          </p>
        </div>
      </div>
    </div>
  );
}