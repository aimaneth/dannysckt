import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Check } from "lucide-react";

interface Package {
  id: string;
  name: string;
  description: string;
  price: number;
  features: string[];
  is_active: boolean;
  recommended?: boolean;
}

interface DistributorPackagesProps {
  packages: Package[];
}

export function DistributorPackages({ packages }: DistributorPackagesProps) {
  return (
    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
      {packages.map((pkg) => (
        <Card key={pkg.id} className={`p-6 ${pkg.recommended ? 'ring-2 ring-orange-500' : ''}`}>
          {pkg.recommended && (
            <div className="absolute -top-3 left-1/2 -translate-x-1/2 bg-orange-500 text-white px-4 py-1 rounded-full text-sm font-medium">
              Recommended
            </div>
          )}
          
          <div className="text-center mb-6">
            <h3 className="text-2xl font-bold mb-2">{pkg.name}</h3>
            <p className="text-muted-foreground">{pkg.description}</p>
          </div>

          <div className="text-center mb-6">
            <span className="text-4xl font-bold">RM {pkg.price.toLocaleString()}</span>
            <span className="text-muted-foreground">/package</span>
          </div>

          <ul className="space-y-3 mb-8">
            {pkg.features.map((feature, index) => (
              <li key={index} className="flex items-start gap-3">
                <Check className="h-5 w-5 text-green-500 flex-shrink-0 mt-0.5" />
                <span>{feature}</span>
              </li>
            ))}
          </ul>

          <Button className="w-full" size="lg">
            Get Started
          </Button>
        </Card>
      ))}
    </div>
  );
} 