import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Check, ArrowRight } from "lucide-react";
import { motion } from "framer-motion";
import { useLanguage } from "@/contexts/LanguageContext";

interface DistributorPackage {
  id: string;
  name: string;
  description: string;
  price: number;
  features: string[];
  is_active: boolean;
  recommended?: boolean;
}

interface DistributorPackagesProps {
  packages: DistributorPackage[];
}

export function DistributorPackages({ packages }: DistributorPackagesProps) {
  const { t } = useLanguage();
  
  const containerVariants = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0 }
  };

  return (
    <motion.div 
      className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8"
      variants={containerVariants}
      initial="hidden"
      whileInView="show"
      viewport={{ once: true }}
    >
      {packages.map((pkg) => (
        <motion.div key={pkg.id} variants={itemVariants}>
          <Card className={`p-4 sm:p-6 flex flex-col relative h-full transition-all duration-300 hover:shadow-lg ${pkg.recommended ? 'ring-2 ring-orange-500' : 'hover:ring-1 hover:ring-orange-500/50'}`}>
            {pkg.recommended && (
              <div className="absolute -top-3 left-1/2 -translate-x-1/2 bg-gradient-to-r from-orange-500 to-amber-500 text-white px-4 py-1 rounded-full text-sm font-medium z-10">
                {t('business.packages.recommended')}
              </div>
            )}
            <div className="mb-4">
              <h3 className="text-xl sm:text-2xl font-bold mb-2">{pkg.name}</h3>
              <p className="text-sm sm:text-base text-muted-foreground">{pkg.description}</p>
            </div>
            <div className="mb-6 flex-grow">
              <div className="text-2xl sm:text-3xl font-bold mb-4">
                RM {pkg.price.toLocaleString()}
              </div>
              <ul className="space-y-3">
                {pkg.features.map((feature, index) => (
                  <li key={index} className="flex items-start gap-2 text-sm sm:text-base">
                    <Check className="h-5 w-5 text-green-500 flex-shrink-0 mt-0.5" />
                    <span>{feature}</span>
                  </li>
                ))}
              </ul>
            </div>
            <Button className="w-full group" size="lg">
              Get Started
              <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
            </Button>
          </Card>
        </motion.div>
      ))}
    </motion.div>
  );
} 