'use client';

import { Label } from '@/registry/new-york-v4/ui/label';
import { Input } from '@/registry/new-york-v4/ui/input';
import { Button } from '@/registry/new-york-v4/ui/button';

interface ContactFormProps {
  data: {
    firstName?: string;
    fullName?: string;
    company?: string;
    email?: string;
  };
  onChange: (data: any) => void;
  onSubmit?: () => void;
  isSubmitting?: boolean;
}

export default function ContactForm({ data, onChange, onSubmit, isSubmitting }: ContactFormProps) {
  return (
    <div className="space-y-6">
      <div className="text-center mb-6">
        <h3 className="text-lg font-semibold mb-2">Get Your Personalized Report</h3>
        <p className="text-muted-foreground">
          We'll send a detailed analysis of your firm's billing efficiency opportunities
        </p>
      </div>

      <div className="grid gap-6 lg:grid-cols-2">
        {/* Form Fields */}
        <div className="space-y-4">
          <div className="grid gap-4 md:grid-cols-2">
            <div className="space-y-2">
              <Label htmlFor="firstName">First Name</Label>
              <Input
                id="firstName"
                type="text"
                placeholder="John"
                value={data.firstName || ''}
                onChange={(e) => onChange({ firstName: e.target.value })}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="fullName">Full Name</Label>
              <Input
                id="fullName"
                type="text"
                placeholder="John Smith"
                value={data.fullName || ''}
                onChange={(e) => onChange({ fullName: e.target.value })}
              />
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="company">Law Firm / Company</Label>
            <Input
              id="company"
              type="text"
              placeholder="Smith & Associates Law Firm"
              value={data.company || ''}
              onChange={(e) => onChange({ company: e.target.value })}
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="email">Email Address</Label>
            <Input
              id="email"
              type="email"
              placeholder="john@smithlaw.com"
              value={data.email || ''}
              onChange={(e) => onChange({ email: e.target.value })}
            />
            <p className="text-sm text-muted-foreground">
              Your personalized report will be sent to this email address
            </p>
          </div>
        </div>

        {/* What you'll receive */}
        <div className="bg-gray-50 border border-gray-200 rounded-lg p-4 h-fit">
          <h4 className="font-medium text-gray-900 mb-2">
            What you'll receive:
          </h4>
          <ul className="text-sm text-gray-700 space-y-1">
            <li>• Detailed breakdown of your billing efficiency opportunities</li>
            <li>• Benchmarking against top-performing law firms</li>
            <li>• Specific recommendations for improvement</li>
            <li>• ROI calculations for potential technology investments</li>
          </ul>
        </div>
      </div>

      {onSubmit && (
        <Button
          onClick={onSubmit}
          disabled={!data.firstName || !data.fullName || !data.company || !data.email || isSubmitting}
          className="w-full text-white border-0"
          style={{backgroundColor: '#FF6F20'}}
        >
          {isSubmitting ? 'Sending Report...' : 'Get My Report'}
        </Button>
      )}
    </div>
  );
}