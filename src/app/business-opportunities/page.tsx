'use client';

import { Metadata } from 'next';
import { DistributorPackages } from '@/components/products/distributor-packages/DistributorPackages';
import { 
  ArrowRight, 
  MapPin, 
  Phone, 
  Mail,
  Store,
  GraduationCap,
  Utensils,
  TrendingUp,
  Map,
  HeadphonesIcon
} from 'lucide-react';
import { useLanguage } from '@/contexts/LanguageContext';
import { ConsultationDialog } from '@/components/business/ConsultationDialog';
import { InfoPackDownload } from '@/components/business/InfoPackDownload';
import { motion } from 'framer-motion';

// Note: metadata export is not needed in client components
// export const metadata: Metadata = {
//   title: 'Business Opportunities | Danny\'s CKT',
//   description: 'Start your own successful Char Kway Teow business with our comprehensive investment packages and support system.',
// };

export default function BusinessOpportunitiesPage() {
  const { t } = useLanguage();

  const distributorPackages = [
    {
      id: "starter",
      name: t('business.packages.starter.name') as string,
      description: t('business.packages.starter.description') as string,
      price: 15000,
      features: t('business.packages.starter.features') as string[],
      is_active: true
    },
    {
      id: "premium",
      name: t('business.packages.premium.name') as string,
      description: t('business.packages.premium.description') as string,
      price: 35000,
      features: t('business.packages.premium.features') as string[],
      is_active: true,
      recommended: true
    },
    {
      id: "enterprise",
      name: t('business.packages.enterprise.name') as string,
      description: t('business.packages.enterprise.description') as string,
      price: 75000,
      features: t('business.packages.enterprise.features') as string[],
      is_active: true
    }
  ];

  const whyJoinItems = [
    {
      title: t('business.why.model.title'),
      description: t('business.why.model.description'),
      icon: Store,
      color: 'from-orange-500/10 to-orange-500/30'
    },
    {
      title: t('business.why.training.title'),
      description: t('business.why.training.description'),
      icon: GraduationCap,
      color: 'from-amber-500/10 to-amber-500/30'
    },
    {
      title: t('business.why.ingredients.title'),
      description: t('business.why.ingredients.description'),
      icon: Utensils,
      color: 'from-red-500/10 to-red-500/30'
    },
    {
      title: t('business.why.marketing.title'),
      description: t('business.why.marketing.description'),
      icon: TrendingUp,
      color: 'from-orange-500/10 to-orange-500/30'
    },
    {
      title: t('business.why.territory.title'),
      description: t('business.why.territory.description'),
      icon: Map,
      color: 'from-amber-500/10 to-amber-500/30'
    },
    {
      title: t('business.why.support.title'),
      description: t('business.why.support.description'),
      icon: HeadphonesIcon,
      color: 'from-red-500/10 to-red-500/30'
    }
  ];

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
    <div className="space-y-12 sm:space-y-16">
      {/* Hero Section */}
      <section className="relative">
        <div className="absolute inset-0 bg-orange-600/10" />
        <div className="relative py-12 sm:py-16">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl">
              <h1 className="text-4xl sm:text-5xl font-bold tracking-tight mb-4 sm:mb-6">
              {t('business.hero.title')}
            </h1>
              <p className="text-lg sm:text-xl text-muted-foreground mb-6 sm:mb-8">
              {t('business.hero.subtitle')}
            </p>
              <div className="flex flex-col sm:flex-row gap-3 sm:gap-4">
                <ConsultationDialog />
                <InfoPackDownload />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Why Join Us Section */}
      <section className="container mx-auto py-12 sm:py-16 px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-12 sm:mb-16">
          <h2 className="text-3xl sm:text-4xl font-bold mb-4 sm:mb-6 bg-clip-text text-transparent bg-gradient-to-r from-orange-500 via-amber-500 to-red-500">
            {t('business.why.title')}
          </h2>
          <p className="text-lg sm:text-xl text-muted-foreground">
            {t('business.why.subtitle')}
          </p>
        </div>
        <motion.div 
          className="grid grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 lg:gap-8"
          variants={containerVariants}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true }}
        >
          {whyJoinItems.map((item, index) => {
            const Icon = item.icon;
            return (
              <motion.div
                key={index}
                variants={itemVariants}
                className={`group relative p-4 sm:p-6 lg:p-8 rounded-xl bg-gradient-to-br ${item.color} border border-orange-500/20 hover:border-orange-500/40 transition-all duration-300`}
              >
                <div className="absolute inset-0 rounded-xl bg-gradient-to-br from-transparent to-background/50 backdrop-blur-[1px]" />
                <div className="relative">
                  <div className="flex flex-col sm:flex-row items-start sm:items-center gap-2 sm:gap-4 mb-3 sm:mb-4">
                    <div className="p-2 sm:p-3 rounded-lg bg-orange-500/10 text-orange-500">
                      <Icon className="h-5 w-5 sm:h-6 sm:w-6" />
                    </div>
                    <h3 className="text-base sm:text-lg lg:text-xl font-semibold group-hover:text-orange-500 transition-colors">
                      {item.title}
                    </h3>
                  </div>
                  <p className="text-sm sm:text-base text-muted-foreground group-hover:text-foreground transition-colors">
                    {item.description}
                  </p>
                </div>
              </motion.div>
            );
          })}
        </motion.div>
      </section>

      {/* Packages Section */}
      <section id="packages" className="container mx-auto scroll-mt-20 px-4 sm:px-6 lg:px-8 pb-16 sm:pb-24">
        <div className="text-center mb-8 sm:mb-12">
          <h2 className="text-3xl sm:text-4xl font-bold mb-3 sm:mb-4 bg-clip-text text-transparent bg-gradient-to-r from-orange-500 via-amber-500 to-red-500">
            {t('business.packages.title')}
          </h2>
          <p className="text-base sm:text-lg text-muted-foreground max-w-2xl mx-auto">
            {t('business.packages.description')}
          </p>
        </div>
        <DistributorPackages packages={distributorPackages} />
        <div className="mt-16 sm:mt-24">
          <div className="bg-gradient-to-br from-orange-500/10 via-amber-500/10 to-red-500/10 p-8 sm:p-12 rounded-2xl border border-orange-500/20">
            <h3 className="text-2xl sm:text-3xl font-bold mb-4 text-center">
              {t('business.contact.title')}
            </h3>
            <p className="text-muted-foreground mb-6 max-w-xl mx-auto text-center">
            {t('business.contact.description')}
          </p>
            <div className="flex flex-col sm:flex-row justify-center gap-3 sm:gap-4">
              <ConsultationDialog />
              <InfoPackDownload />
            </div>
          </div>
        </div>
      </section>
    </div>
  );
} 